// import {getTopBooks, getBooksByCategory, GetCategoryList} from "./products-api"

// const gallery = document.querySelector(".gallery");
// const select = document.querySelector("#category-select");
// const showMore = document.querySelector(".btn-show-more")
// const visibleBooks = document.querySelector(".visible-books")
// const totalBooks = document.querySelector(".total-books")

// const categoryList = await GetCategoryList();

// const topBooks = await getTopBooks();
// ("Trade Fiction Paperback")

// function renderCategoriesList(categories) {
//   select.innerHTML = '<option disabled selected>Choose category</option>';

//   categories.forEach(cat => {
//     const option = document.createElement("option");
//     option.value = cat;
//     option.textContent = cat;
//     select.appendChild(option)
//   })
// }

// renderCategoriesList(categoryList)

// select.addEventListener("change", handleChange);

// let allBooksByCategory = [];
// let visibleCount = 0;
// const initialCount = window.innerWidth < 768 ? 10 : 24;
// const step = 4;

// async function handleChange(event) {
//   event.preventDefault();
//   showMore.classList.remove("btn-show-more-hidden")
//   const selected = event.target.value;
//   const booksbyCategories = await getBooksByCategory(selected);
  
//   allBooksByCategory = booksbyCategories;
  
//   visibleCount = initialCount;
//   visibleBooks.textContent = visibleCount;
//   totalBooks.textContent = allBooksByCategory.length;

//   gallery.innerHTML = renderVisibleBooksByCategory();
// }

// function renderVisibleBooksByCategory() {
//   const visibleBooks = allBooksByCategory.slice(0, visibleCount);
//   return createMarkupByCategory(visibleBooks);
// }

// showMore.addEventListener("click", handleClick)

// function handleClick() {
//   const nextBooks = allBooksByCategory.slice(visibleCount, visibleCount + step);
//   gallery.insertAdjacentHTML("beforeend", createMarkupByCategory(nextBooks));

//   visibleCount += nextBooks.length;
//   visibleBooks.textContent = visibleCount;

//   const nextTopBooks = allTopBooks.slice(visibleCount, visibleCount + step)
//   gallery.insertAdjacentHTML("beforeend", createMarkup(nextTopBooks))

//   if (visibleCount >= allBooksByCategory.length) {
//     visibleBooks.textContent = allBooksByCategory.length;
//     showMore.classList.add("btn-show-more-hidden")
//   }
// }

// function createMarkupByCategory(data) {
//   const markup = data.map(({ title, author, book_image, price }) => `
//         <li class="book-card">
//           <img class="book-cover" src="${book_image}" alt="${title}" width="150" />
//           <h3>${title}</h3>
//           <p>${author}</p>
//           <p>$${price}</p>
//           <button class="btn-secondary btn-book">Learn more</button>
//         </li>
//       `
//   ).join('');

//   return markup;
// }

// function createMarkup(books) {
//   const markup = books.map(book => `
//         <li>
//           <img class="book-cover" src="${book.book_image}" alt="${book.title}" width="150" />
//           <h3>${book.title}</h3>
//           <p>by ${book.author}</p>
//           <a href="${book.amazon_product_url}" target="_blank">Buy on Amazon</a>
//         </li>
//       `)
//   .join('');

//   return markup;
// }

// let allTopBooks = [];

// function createTopBooks() {
//   const topBooksData = topBooks.flatMap(({ books }) => books)
//   allTopBooks = topBooksData;
//   visibleCount = initialCount;

//   visibleBooks.textContent = visibleCount;
//   totalBooks.textContent = allTopBooks.length;

//   gallery.innerHTML = renderVisibleTopBooks()
// }

// function renderVisibleTopBooks() {
//   const visibleBooks = allTopBooks.slice(0, visibleCount);
//   return createMarkup(visibleBooks);
// }

// createTopBooks();


import { document } from "postcss";
import { getTopBooks, getBooksByCategory, GetCategoryList } from "./products-api";

const gallery = document.querySelector(".gallery");
const select = document.querySelector("#category-select");
const showMore = document.querySelector(".btn-show-more");
const visibleCounter = document.querySelector(".visible-books");
const totalCounter = document.querySelector(".total-books");

const initialCount = window.innerWidth < 768 ? 10 : 24;
const step = 4;

let allBooks = [];
let visibleCount = 0;
let isCategorySelected = false;

const categoryList = await GetCategoryList();
renderCategoriesList(categoryList)

function renderCategoriesList(categories) {
  categories.forEach(cat => {
    const option = document.createElement("option")
    option.textContent = cat;
    option.value = cat;
    select.appendChild(option)
    }
  )
}

console.log(typeof document.querySelector);
