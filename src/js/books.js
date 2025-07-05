import { getTopBooks, getBooksByCategory, getCategoryList } from "./products-api";

const gallery = document.querySelector(".gallery");
const select = document.querySelector("#category-select");
const showMore = document.querySelector(".btn-show-more");
const visibleCounter = document.querySelector(".visible-books");
const totalCounter = document.querySelector(".total-books");
const list = document.querySelector(".categories-list");

let allBooks = [];
let visibleCount = 0;

// Завантажуємо категорії
const categoryList = await getCategoryList();
renderCategoriesList(categoryList);

// Завантажуємо топ-книги
const topBooksData = await getTopBooks();
allBooks = topBooksData.flatMap(({ books }) => books);
renderBooks();

// Рендер селекту та списку категорій
function renderCategoriesList(categories) {
  select.innerHTML = '<option selected value="All categories">All categories</option>';
  list.innerHTML = '<li><button class="category-btn active-category" value="All categories">All categories</button></li>';

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);

    const item = document.createElement("li");
    item.classList.add("category-item")
    const button = document.createElement("button");
    button.value = cat;
    button.textContent = cat;
    button.classList.add("category-btn");
    item.appendChild(button);
    list.appendChild(item);
  });
}

// Універсальний обробник вибору категорії
async function selectCategory(category) {
  select.value = category;

  // Активна кнопка
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

// Вибір через select
select.addEventListener("change", e => {
  const category = e.target.value;
  selectCategory(category);
});

// Вибір через список кнопок
list.addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;
  const category = e.target.value;
  selectCategory(category);
});

// Кнопка Show More
showMore.addEventListener("click", () => {
  visibleCount += 4;
  updateBooksList();
  showMore.blur();
});

// Рендер книг
function renderBooks() {
  showMore.classList.remove("btn-show-more-hidden");
  visibleCount = getInitialCount();
  updateBooksList();
  if (visibleCount >= allBooks.length) {
    showMore.classList.add("btn-show-more-hidden");
  }
  totalCounter.textContent = allBooks.length;
}

// Оновлення списку книг
function updateBooksList() {
  const currentSlice = allBooks.slice(0, visibleCount);
  gallery.innerHTML = createMarkup(currentSlice);
  visibleCounter.textContent = Math.min(visibleCount, allBooks.length);
  showMore.disabled = false;
  if (visibleCount >= allBooks.length) {
    showMore.classList.add("btn-show-more-hidden");
  }
}

// Стартова кількість книжок
function getInitialCount() {
  return window.innerWidth < 768 ? 10 : 24;
}

// Перерендер при зміні ширини екрана
window.addEventListener("resize", () => {
  renderBooks();
});

// HTML-розмітка однієї книги
function createMarkup(data) {
  return data.map(({ title, author, book_image, price }) => `
    <li class="book-card">
      <img class="book-cover" src="${book_image}" alt="${title}" width="150" />
      <div class="book-card-info">
        <div class="book-card-descriptions">
          <h3 class="book-card-title">${title.toLowerCase()}</h3>
          <h4 class="book-card-author">${author}</h4>
        </div>
        <p class="book-price">$${price}</p>
      </div>
      <button class="btn-secondary btn-book">Learn more</button>
    </li>
  `).join('');
}