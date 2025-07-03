//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
// import refs from './refs';

const refs = {
  modalBooks: document.querySelector('.modal-books'),
  modalBooksCloseBtn: document.querySelector('.modal-books_close-btn'),
  modalAccordion: document.querySelector('.accordion-container'),
};
new Accordion(refs.modalAccordion);

function openBooksModal() {
  document.body.style.overflow = 'hidden';
  refs.modalBooks.classList.add('is-open');
}
window.openBooksModal = openBooksModal;

function closeBooksModal() {
  refs.modalBooks.classList.remove('is-open');
  document.body.style.overflow = '';
}

refs.modalBooks.addEventListener('click', event => {
  if (event.target === event.currentTarget) closeBooksModal();
  if (refs.modalBooksCloseBtn.contains(event.target)) {
    closeBooksModal();
  }
  // console.log('modalBooks click event');
});
