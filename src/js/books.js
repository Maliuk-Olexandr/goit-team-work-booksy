import { getTopBooks, getBooksByCategory, GetCategoryList } from "./products-api";
import { openBooksModal } from "./modal";

const gallery = document.querySelector(".gallery");
const select = document.querySelector("#category-select");
const showMore = document.querySelector(".btn-show-more");
const visibleCounter = document.querySelector(".visible-books");
const totalCounter = document.querySelector(".total-books");
const list = document.querySelector(".categories-list");
const arrow = document.querySelector(".categories-arrow");

let allBooks = [];
let visibleCount = 0;
let currentBreakpoint = window.innerWidth < 768 ? "mobile" : "desktop";

// Завантаження категорій
const categoryList = await GetCategoryList();
renderCategoriesList(categoryList);

// Завантаження топ-книг
const topBooksData = await getTopBooks();
allBooks = topBooksData.flatMap(({ books }) => books);
renderBooks();

function renderCategoriesList(categories) {
  select.innerHTML = '<option selected value="All categories">All categories</option>';
  list.innerHTML = '<li><button class="category-btn active-category" value="All categories">All categories</button></li>';

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);

    const item = document.createElement("li");
    item.classList.add("category-item");
    const button = document.createElement("button");
    button.value = cat;
    button.textContent = cat;
    button.classList.add("category-btn");
    item.appendChild(button);
    list.appendChild(item);
  });
}

async function selectCategory(category) {
  select.value = category;
  list.querySelectorAll(".category-btn").forEach(btn =>
    btn.classList.toggle("active-category", btn.value === category)
  );

  if (category === "All categories") {
    const topBooksData = await getTopBooks();
    allBooks = topBooksData.flatMap(({ books }) => books);
  } else {
    allBooks = await getBooksByCategory(category);
  }

  renderBooks();
}

select.addEventListener("change", e => {
  const category = e.target.value;
  selectCategory(category);
});

list.addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;
  const category = e.target.value;
  selectCategory(category);
});

showMore.addEventListener("click", () => {
  visibleCount += 4;
  updateBooksList();
  showMore.blur();
});

function renderBooks() {
  visibleCount = getInitialCount();
  updateBooksList();
  totalCounter.textContent = allBooks.length;

  if (visibleCount >= allBooks.length) {
    showMore.classList.add("btn-show-more-hidden");
  }

  if (visibleCount < allBooks.length) {
    showMore.classList.remove("btn-show-more-hidden");
  }
}

function updateBooksList() {
  const currentSlice = allBooks.slice(0, visibleCount);

  if (currentSlice.length === 0) {
    gallery.innerHTML = '<li class="no-books">No books found</li>';
    visibleCounter.textContent = 0;
    showMore.classList.add("btn-show-more-hidden");
    return;
  }

  gallery.innerHTML = createMarkup(currentSlice);
  visibleCounter.textContent = Math.min(visibleCount, allBooks.length);
  showMore.disabled = false;

  if (visibleCount >= allBooks.length) {
    showMore.classList.add("btn-show-more-hidden");
  }

  if (visibleCount < allBooks.length) {
    showMore.classList.remove("btn-show-more-hidden");
  }
}

function getInitialCount() {
  return window.innerWidth < 768 ? 10 : 24;
}

window.addEventListener("resize", debounce(() => {
  const newBreakpoint = window.innerWidth < 768 ? "mobile" : "desktop";
  if (newBreakpoint !== currentBreakpoint) {
    currentBreakpoint = newBreakpoint;
    renderBooks();
  }
}, 300));

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

gallery.addEventListener("click", event => {
  const btn = event.target.closest(".btn-book");
  if (!btn) return;
  const bookId = btn.dataset.id;
  openBooksModal(bookId);
});

// SVG стрілка обертання при фокусі
select.addEventListener("focus", () => {
  arrow.style.transform = "translateY(-50%) rotate(180deg)";
});

select.addEventListener("blur", () => {
  arrow.style.transform = "translateY(-50%)";
});

select.addEventListener("change", () => {
  arrow.style.transform = "translateY(-50%)";
});

function createMarkup(data) {
  return data.map(({ title, author, book_image, price, _id }) => {
    let displayPrice;

    if (typeof price === 'string' && price.trim() !== '0.00') {
      displayPrice = price.trim();
    } else if (typeof price === 'number') {
      displayPrice = price.toFixed(2);
    } else {
      displayPrice = '9.99';
    }

    return `
    <li class="book-card">
      <img class="book-cover" src="${book_image}" alt="${title}" width="150" />
      <div class="book-card-info">
        <div class="book-card-descriptions">
          <h3 class="book-card-title">${title.toLowerCase()}</h3>
          <h4 class="book-card-author">${author}</h4>
        </div>
        <p class="book-price">$${displayPrice}</p>
      </div>
      <button type="button" class="btn-secondary btn-book" data-id="${_id}">Learn more</button>
    </li>
  `}).join('');
}