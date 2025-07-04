import {getTopBooks, getBooksByCategory, GetCategoryList} from "./products-api"

const gallery = document.querySelector(".gallery");
const select = document.querySelector("#category-select");
const showMore = document.querySelector(".btn-show-more")
const visibleBooks = document.querySelector(".visible-books")
const totalBooks = document.querySelector(".total-books")

const categoryList = await GetCategoryList();

const topBooks = await getTopBooks();
("Trade Fiction Paperback")

function renderCategoriesList(categories) {
  select.innerHTML = '<option disabled selected>Choose category</option>';

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option)
  })
}

renderCategoriesList(categoryList)

select.addEventListener("change", handleChange);

let allBooksByCategory = [];
let visibleCount = 0;
const initialCount = window.innerWidth < 768 ? 10 : 24;
const step = 4;

async function handleChange(event) {
  event.preventDefault();

  const selected = event.target.value;
  const booksbyCategories = await getBooksByCategory(selected);
  
  allBooksByCategory = booksbyCategories;
  console.log(allBooksByCategory.length);
  
  visibleCount = initialCount;
  visibleBooks.textContent = visibleCount;
  totalBooks.textContent = allBooksByCategory.length;

  renderVisibleBooks();
}

function renderVisibleBooks() {
  const visibleBooks = allBooksByCategory.slice(0, visibleCount);
  gallery.innerHTML = createMarkupByCategory(visibleBooks);
}

showMore.addEventListener("click", handleClick)

function handleClick() {
  visibleCount += step
  visibleBooks.textContent = visibleCount;
  if (visibleCount >= allBooksByCategory.length) {
    visibleBooks.textContent = allBooksByCategory.length;
  }
  gallery.insertAdjacentHTML("beforeend", renderVisibleBooks(visibleBooks))
}

function createMarkupByCategory(data) {
  const markup = data.map(({ title, author, book_image, price }) => `
        <li class="book-card">
          <img class="book-cover" src="${book_image}" alt="${title}" width="150" />
          <h3>${title}</h3>
          <p>${author}</p>
          <p>${price}</p>
          <button class="btn-secondary btn-book">Learn more</button>
        </li>
      `
  ).join('');

  return markup;
}


// createMarkup(topBooks);

// function createMarkup(data) {
//   const markup = data.flatMap(({ books }) =>
//     books.map(book => {
//       return `
//         <li>
//           <img class="book-cover" src="${book.book_image}" alt="${book.title}" width="150" />
//           <h3>${book.title}</h3>
//           <p>by ${book.author}</p>
//           <a href="${book.amazon_product_url}" target="_blank">Buy on Amazon</a>
//         </li>
//       `;
//     })
//   ).join('');

//   return markup;
// }