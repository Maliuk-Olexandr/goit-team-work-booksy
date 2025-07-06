//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import { renderBookModal } from './render-function';
import { getBookByID } from './products-api';
import { addToCart, getFromCartByID } from './storage';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// --- Constants for default text ---
const DEFAULT_BOOK_DETAILS = {
  details: `I Will Find You is a gripping thriller by the master of suspense, Harlan Coben. The story follows David Burroughs, a former prisoner wrongfully convicted of murdering his own son. When he discovers a clue suggesting his son might still be alive, David escapes from prison to uncover the truth. Fast-paced, emotional, and full of unexpected twists — this novel will keep you hooked until the very last page.`,
  shipping: `We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.`,
  returns: `You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free.`,
};

// initialise modal-books accordeon
new Accordion(document.querySelector('.accordion-container'), {
  showMultiple: true,
  duration: 400,
  collapse: true,
});

class Modal {
  constructor(modalElement) {
    if (!modalElement) throw new Error('Modal Element not found');
    this.modalElement = modalElement;
    this.escapeHandler = this.handleEscape.bind(this);
    this.closeClickHandler = this.handleCloseClick.bind(this);
  }

  open() {
    this.modalElement.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.escapeHandler);
    this.modalElement.addEventListener('click', this.closeClickHandler);
  }

  close() {
    this.modalElement.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.escapeHandler);
    this.modalElement.removeEventListener('click', this.closeClickHandler);
  }

  handleEscape(event) {
    if (event.key === 'Escape') this.close();
  }

  handleCloseClick(event) {
    const closeBtn = this.modalElement.querySelector('.modal_close-btn');
    const isCloseButtonClick = closeBtn && closeBtn.contains(event.target);
    const isOverlayClick = event.target === this.modalElement;
    if (isCloseButtonClick || isOverlayClick) this.close();
  }
}

class ContactModal extends Modal {
  constructor(modalElement) {
    super(modalElement);
    this.form = this.modalElement.querySelector('#contactForm');
    this.nameInput = this.form.querySelector('#user_name');
    this.emailInput = this.form.querySelector('#user_email');
    this.messageInput = this.form.querySelector('#user_message');
    this.nameErrorContainer = this.form.querySelector(
      '.contact-form-name .validation-error'
    );
    this.emailErrorContainer = this.form.querySelector(
      '.contact-form-email .validation-error'
    );
    this.messageErrorContainer = this.form.querySelector(
      '.contact-form-message .validation-error'
    );

    if (!this.form) throw new Error('Contact form not found in the modal');
    this.submitHandler = this.handleSubmit.bind(this);
    this.handleNameInput = this.clearErrorContainer.bind(
      this,
      this.nameInput,
      this.nameErrorContainer
    );
    this.handleEmailInput = this.clearErrorContainer.bind(
      this,
      this.emailInput,
      this.emailErrorContainer
    );
    this.handleMessageInput = this.clearErrorContainer.bind(
      this,
      this.messageInput,
      this.messageErrorContainer
    );
  }

  clearErrorContainer(inputElement, errorContainer) {
    inputElement.classList.remove('invalid');
    errorContainer.innerText = '';
  }

  open() {
    super.open();
    this.form.addEventListener('submit', this.submitHandler);
    this.nameInput.addEventListener('focus', this.handleNameInput);
    this.emailInput.addEventListener('focus', this.handleEmailInput);
    this.messageInput.addEventListener('focus', this.handleMessageInput);
  }

  close() {
    super.close();
    this.form.removeEventListener('submit', this.submitHandler);
    this.nameInput.removeEventListener('focus', this.handleNameInput);
    this.emailInput.removeEventListener('focus', this.handleEmailInput);
    this.messageInput.removeEventListener('focus', this.handleMessageInput);
    this.form.reset();
  }

  validate() {
    const errorsArr = [];
    const errorMessage = {
      name: '❌ Please enter valid Name',
      email: {
        valid: '❌ Please enter valid Email',
        required: '❌ Email is a required field',
      },
      message: '❌ Message can not be empty',
    };
    // Reset previous validation states
    this.nameInput.classList.remove('invalid');
    this.emailInput.classList.remove('invalid');
    this.messageInput.classList.remove('invalid');

    // Name validation
    if (this.nameInput.value.trim() === '') {
      errorsArr.push(errorMessage.name);
      this.nameInput.classList.add('invalid');
      this.nameErrorContainer.innerText = errorMessage.name;
    }

    // simple Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.emailInput.value.trim() === '') {
      // if empty
      errorsArr.push(errorMessage.email.required);
      this.emailInput.classList.add('invalid');
      this.emailErrorContainer.innerText = errorMessage.email.required;
    } else if (!emailPattern.test(this.emailInput.value)) {
      // if invalid
      errorsArr.push(errorMessage.email.valid);
      this.emailInput.classList.add('invalid');
      this.emailErrorContainer.innerText = errorMessage.email.valid;
    }

    // Message validation
    if (this.messageInput.value.trim() === '') {
      errorsArr.push(errorMessage.message);
      this.messageInput.classList.add('invalid');
      this.messageErrorContainer.innerText = errorMessage.message;
    }

    return errorsArr;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    // Call the validate method
    const validationErrors = this.validate();
    if (validationErrors.length > 0) {
      return; // Stop the submission
    }

    try {
      await this.submitForm(data);
      iziToast.show({
        position: 'center',
        theme: 'light',
        message: `❤︎ Your registration has been submitted.`,
      });
      this.close();
    } catch (error) {
      console.error('Form submission error:', error);
      iziToast.show({
        position: 'center',
        theme: 'light',
        message: `✖ 'There was an error submitting your registration. Please try again.'`,
      });
    }
  }

  async submitForm(data) {
    console.log('Submitting form data:', data);
  }
}

// --- Books Modal Class ---
class BooksModal extends Modal {
  constructor(modalElement) {
    super(modalElement);
    this.eventHandler = this.handleEvents.bind(this);
  }

  async open(bookId) {
    try {
      const bookData = await getBookByID(bookId);
      const dataObj = this.prepareData(bookData);
      renderBookModal(dataObj);

      super.open(); // Call open from the base class after content is ready

      this.form = this.modalElement.querySelector('#bookModalActionForm');
      if (this.form) {
        this.form.addEventListener('click', this.eventHandler);
        this.form.addEventListener('submit', this.eventHandler);
      }
    } catch (error) {
      console.error(`Error loading book with ID ${bookId}:`, error);
      iziToast.show({
        position: 'center',
        theme: 'light',
        message: `✖ 'Sorry, couldn't load the book details. Please try again later.'`,
      });
    }
  }

  close() {
    super.close();
    if (this.form) {
      this.form.removeEventListener('click', this.eventHandler);
      this.form.removeEventListener('submit', this.eventHandler);
    }
  }

  prepareData(response) {
    return {
      bookId: response._id,
      bookPicture: response.book_image,
      bookTitle: response.title,
      bookAuthor: response.author,
      bookPrice: response.price,
      bookQuantity: 1,
      details: response.details || DEFAULT_BOOK_DETAILS.details,
      shipping: response.shipping || DEFAULT_BOOK_DETAILS.shipping,
      returns: response.returns || DEFAULT_BOOK_DETAILS.returns,
    };
  }

  handleEvents(event) {
    event.preventDefault();
    const target = event.target;
    const action = target.dataset.action;

    switch (action) {
      case 'decrease':
        this.updateQuantity(-1);
        break;
      case 'increase':
        this.updateQuantity(1);
        break;
      case 'add-to-cart':
        this.handleAddToCart(target);
        break;
      case 'buy-now':
        this.handleBuyNow();
        break;
    }

    if (event.type === 'submit') this.handleBuyNow();
  }

  updateQuantity(change) {
    const quantityInput = this.form.querySelector('.quantity-input');
    let currentValue = parseInt(quantityInput.value);
    const newValue = currentValue + change;

    if (newValue >= 1) quantityInput.value = newValue;
  }

  handleAddToCart(button) {
    const modalData = button.closest('[data-book-id]');
    const bookId = modalData.dataset.bookId;
    const quantity = parseInt(this.form.querySelector('.quantity-input').value);

    iziToast.show({
      iconUrl: '/img/shopping_basket.svg',
      iconColor: 'white',
      balloon: false,
      theme: 'light',
      progressBar: true,
      message: `Book (qty: ${quantity}) added`,
      transitionIn: 'flipInX',
      transitionInMobile: 'flipInX',
      target: '.modal-books_message-container',
      targetFirst: false,
      timeout: 3000,
      animateInside: true,
    });
    console.log(`Book with ID '${bookId}' (qty: ${quantity}) added to Cart.`);
    console.log(`Total ID '${bookId}' in Cart: ${getFromCartByID(bookId)}`);

    addToCart(bookId, quantity);
  }

  handleBuyNow() {
    console.log('"Buy Now" clicked.');
    iziToast.show({
      iconUrl: '/img/shopping_basket.svg',
      iconColor: 'white',
      position: 'center',
      balloon: false,
      theme: 'light',
      progressBar: true,
      message: `Thanks for buying!`,
      transitionIn: 'flipInX',
      transitionInMobile: 'flipInX',
      targetFirst: false,
      timeout: 5000,
      animateInside: true,
    });

    this.close();
  }
}

// --- Initialization ---
const contactModalElement = document.querySelector('.modal-contacts');
const booksModalElement = document.querySelector('.modal-books');

let contactModal, booksModal;

if (contactModalElement) {
  contactModal = new ContactModal(contactModalElement);
}

if (booksModalElement) {
  booksModal = new BooksModal(booksModalElement);
}

// functions to interact with the modals from other scripts.
export function openContactsModal() {
  if (contactModal) {
    contactModal.open();
  } else {
    console.error('Contact modal is not initialized.');
  }
}

export function openBooksModal(bookId = '660df41ba957e5c1ae0f519e') {
  if (booksModal) {
    booksModal.open(bookId);
  } else {
    console.error('Books modal is not initialized.');
  }
}

//#region @TODO delete before deployment
window.openBooksModal = openBooksModal;
// openBooksModal();
// openContactsModal();
window.openContactsModal = openContactsModal;
//#endregion @TODO delete before deployment
