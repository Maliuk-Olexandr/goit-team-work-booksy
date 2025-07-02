import axios from "axios"

const gallery = document.querySelector(".gallery");
import {getTopBooks, getBooksByCategory} from "./products-api"

const topBooks = await getTopBooks();
const booksByCategory = await getBooksByCategory("Trade Fiction Paperback")

console.log(booksByCategory);


console.log("test", topBooks);

createMarkup(topBooks);

function createMarkup(data) {
  const markup = data.flatMap(({ books }) =>
    books.map(book => {
        console.log(book);
        
      return `
        <li>
          <img class="book-cover" src="${book.book_image}" alt="${book.title}" width="150" />
          <h3>${book.title}</h3>
          <p>by ${book.author}</p>
          <a href="${book.amazon_product_url}" target="_blank">Buy on Amazon</a>
        </li>
      `;
    })
  ).join('');

  return markup;
}

gallery.insertAdjacentHTML("beforeend", createMarkup(topBooks))
