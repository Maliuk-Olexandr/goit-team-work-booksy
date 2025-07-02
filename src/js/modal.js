//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
const modalAccordion = document.querySelector('.accordion-container');
new Accordion(modalAccordion);
document.body.style.overflow = 'hidden';
const modalBooks = document.querySelector('.modal-books');
const modalBooksCloseBtn = document.querySelector('.modal-books_close-btn');
modalBooks.classList.toggle('is-open');

modalBooksCloseBtn.addEventListener('click', event => {
  modalBooks.classList.toggle('is-open');
  document.body.style.overflow = '';
});
