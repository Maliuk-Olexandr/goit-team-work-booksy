//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import { renderBookModal } from './render-function';
import { getBookByID } from './products-api';
import { addToCart, getFromCartByID } from './storage';

const refs = {
  modalBooks: document.querySelector('.modal-books'),
  modalContacts: document.querySelector('.modal-contacts'),
};

function openModal(reference) {
  if (!reference) {
    console.error('Modal reference is not found');
    return;
  }

  if (reference.escapeHandler) {
    document.removeEventListener('keydown', reference.escapeHandler);
    reference.removeEventListener('click', handleModalCloseClick);
  }

  // Створюю функцію з замиканням і зберігаю в DOM елементі який отримую як параметр
  reference.escapeHandler = event => {
    if (event.key === 'Escape') closeModal(reference);
  };

  // Додаю обробники подій
  document.addEventListener('keydown', reference.escapeHandler);
  reference.addEventListener('click', handleModalCloseClick);

  // Відкриваю модальне вікно
  reference.classList.add('is-open');

  // Виключаю скрол під модалкою
  document.body.style.overflow = 'hidden';
}

function closeModal(reference) {
  if (!reference) {
    console.error('Modal reference is not found');
    return;
  }

  // Видаляю обробники подій
  reference.removeEventListener('click', handleModalCloseClick);
  document.removeEventListener('keydown', reference.escapeHandler);

  const form = document.getElementById('bookModalActionForm');
  if (form) {
    form.removeEventListener('submit', handleFormSubmit);
    form.removeEventListener('click', handleBooksModalButtons);
  }

  // Закриваю модальне вікно
  reference.classList.remove('is-open');

  // Включаю скрол під модалкою
  document.body.style.overflow = '';
}

function handleModalCloseClick(event) {
  const currentModal = event.currentTarget;
  const closeBtn = currentModal.querySelector('.modal_close-btn');
  const closeBtnClick = closeBtn.contains(event.target);
  const overlayClick = event.target === currentModal;

  if (closeBtnClick || overlayClick) closeModal(currentModal);
}

class ContactForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.submitBtn = this.form.querySelector('#submitBtn');
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  getFormData() {
    const formData = new FormData(this.form);
    const data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value.trim();
    }

    return data;
  }

  showSuccess(message) {
    console.log(message);
  }

  resetForm() {
    this.form.reset();
  }

  async handleSubmit() {
    const formData = this.getFormData();

    try {
      await this.submitForm(formData);
      this.showSuccess('Your registration has been submitted.');
      this.resetForm();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  }

  async submitForm(data) {
    console.log('Form data:', data);
  }
}

export function openContactsModal(obj) {
  openModal(refs.modalContacts);
  const contactForm = new ContactForm('contactForm');
}

/**
 * Opens a modal displaying book information.
 * @param {string} bookId - book id.
 */
export async function openBooksModal(bookId = '660df41ba957e5c1ae0f519e') {
  try {
    const responce = await getBookByID(bookId);
    const dataObj = {
      bookId: responce._id,
      bookPicture: responce.book_image,
      bookTitle: responce.title,
      bookAuthor: responce.author,
      bookPrice: responce.price,
      bookQuantity: 1,
      details:
        responce.details ||
        `I Will Find You is a gripping thriller by the master of
                suspense, Harlan Coben. The story follows David Burroughs, a
                former prisoner wrongfully convicted of murdering his own son.
                When he discovers a clue suggesting his son might still be
                alive, David escapes from prison to uncover the truth.
                Fast-paced, emotional, and full of unexpected twists — this
                novel will keep you hooked until the very last page.`, //@TODO teamlid/mentor ansver
      shipping:
        responce.shipping ||
        `We ship across the United States within 2–5 business days. All
                orders are processed through USPS or a reliable courier service.
                Enjoy free standard shipping on orders over $50.`, //@TODO teamlid/mentor ansver
      returns:
        responce.returns ||
        `You can return an item within 14 days of receiving your order,
                provided it hasn’t been used and is in its original condition.
                To start a return, please contact our support team — we’ll guide
                you through the process quickly and hassle-free.`, //@TODO teamlid/mentor ansver
    };

    openModal(refs.modalBooks);
    renderBookModal(refs.modalBooks, dataObj);
    new Accordion(
      refs.modalBooks.querySelector('.modal-books .accordion-container'),
      {
        showMultiple: true,
        duration: 400,
        collapse: true,
      }
    );

    const form = document.getElementById('bookModalActionForm');
    if (!form) {
      console.error('Form bookModalActionForm not found');
      return;
    }

    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('click', handleBooksModalButtons);
  } catch (error) {
    console.error('Error loading  with getBookByID:', error);
  }
}

//#region books modal logic
function handleFormSubmit(event) {
  event.preventDefault();
  handleBuyNow();
}

function handleBooksModalButtons(event) {
  const action = event.target.dataset.action;

  switch (action) {
    case 'decrease':
      handleQuantityDecrease(event.target);
      break;
    case 'increase':
      handleQuantityIncrease(event.target);
      break;
    case 'add-to-cart':
      handleAddToCart(event.target);
      break;
  }
}

function handleQuantityDecrease(button) {
  const container = button.closest('[data-min-quantity]');
  const input = container.querySelector('.quantity-input');
  const minQuantity = parseInt(container.dataset.minQuantity);
  const currentValue = parseInt(input.value);

  if (currentValue > minQuantity) input.value = currentValue - 1;
}

function handleQuantityIncrease(button) {
  const container = button.closest('[data-max-quantity]');
  const input = container.querySelector('.quantity-input');
  const maxQuantity = parseInt(container.dataset.maxQuantity);
  const currentValue = parseInt(input.value);

  if (currentValue < maxQuantity) input.value = currentValue + 1;
}

function handleAddToCart(button) {
  const modalData = button.closest('[data-book-id]');
  const bookId = modalData.dataset.bookId;
  const quantity = parseInt(modalData.querySelector('.quantity-input').value);

  addToCart(bookId, quantity);

  console.log(`Book with ID'${bookId}' in q-ty '${quantity}' added to Cart`);
  console.log(`Total ID'${bookId}' in Cart ${getFromCartByID(bookId)}`);
}

function handleBuyNow() {
  console.log('Thanks for bying');
}
//#endregion books modal logic

//#region @TODO delete before deployment
window.openBooksModal = openBooksModal;
// openBooksModal();
window.openContactsModal = openContactsModal;
//#endregion @TODO delete before deployment
