const gallery = document.querySelector(".gallery");
import {getTopBooks, getBooksByCategory} from "./products-api"

const topBooks = await getTopBooks();
const booksByCategory = await getBooksByCategory("Trade Fiction Paperback")

console.log(booksByCategory);

createMarkupByCategory(booksByCategory)
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

function createMarkupByCategory(data) {
  const markup = data.map(({ title, author, book_image, price }) => `
        <li>
          <img class="book-cover" src="${book_image}" alt="${title}" width="150" />
          <h3>${title}</h3>
          <p>${author}</p>
          <p>${price}</p>
          <button>Learn more</button>
        </li>
      `
  ).join('');

  return markup;
}


gallery.insertAdjacentHTML("beforeend", createMarkupByCategory(booksByCategory))
