// INFO: This file is a refactored version of modal.js, with improvements in structure, encapsulation, and error handling.

import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import { renderBookModal } from './render-function';
import { getBookByID } from './products-api';
import { addToCart, getFromCartByID } from './storage';

// --- Constants for default text ---
const DEFAULT_BOOK_DETAILS = {
  details: `I Will Find You is a gripping thriller by the master of suspense, Harlan Coben. The story follows David Burroughs, a former prisoner wrongfully convicted of murdering his own son. When he discovers a clue suggesting his son might still be alive, David escapes from prison to uncover the truth. Fast-paced, emotional, and full of unexpected twists — this novel will keep you hooked until the very last page.`,
  shipping: `We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.`,
  returns: `You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free.`,
};

// --- Base Modal Class ---
class Modal {
  constructor(modalElement) {
    if (!modalElement) {
      throw new Error('Modal element not found');
    }
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
    if (event.key === 'Escape') {
      this.close();
    }
  }

  handleCloseClick(event) {
    const closeBtn = this.modalElement.querySelector('.modal_close-btn');
    const isCloseButtonClick = closeBtn && closeBtn.contains(event.target);
    const isOverlayClick = event.target === this.modalElement;

    if (isCloseButtonClick || isOverlayClick) {
      this.close();
    }
  }
}

// --- Contact Modal Class ---
class ContactModal extends Modal {
  constructor(modalElement) {
    super(modalElement);
    this.form = this.modalElement.querySelector('#contactForm');
    if (!this.form) {
      throw new Error('Contact form not found in the modal.');
    }
    this.submitHandler = this.handleSubmit.bind(this);
  }

  open() {
    super.open();
    this.form.addEventListener('submit', this.submitHandler);
  }

  close() {
    super.close();
    this.form.removeEventListener('submit', this.submitHandler);
    this.form.reset();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Mock submission
      await this.submitForm(data);
      // SUGGESTION: Replace with a user-friendly notification (e.g., a toast)
      alert('Your registration has been submitted.');
      this.close();
    } catch (error) {
      // SUGGESTION: Display an error message within the form
      console.error('Form submission error:', error);
      alert('There was an error submitting your registration. Please try again.');
    }
  }

  async submitForm(data) {
    // This is a mock function. In a real application, this would
    // make an API call to a backend service.
    console.log('Submitting form data:', data);
    return new Promise(resolve => setTimeout(resolve, 500));
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
      renderBookModal(this.modalElement, dataObj);

      super.open(); // Call open from the base class after content is ready

      this.form = this.modalElement.querySelector('#bookModalActionForm');
      if (this.form) {
        this.form.addEventListener('click', this.eventHandler);
        this.form.addEventListener('submit', this.eventHandler);
      }

      new Accordion(this.modalElement.querySelector('.accordion-container'), {
        showMultiple: true,
        duration: 400,
        collapse: true,
      });
    } catch (error) {
      console.error(`Error loading book with ID ${bookId}:`, error);
      // SUGGESTION: Display a user-friendly error message in the modal
      this.modalElement.innerHTML = `<div class="modal-content"><p>Sorry, we couldn't load the book details. Please try again later.</p></div>`;
      super.open();
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

    if (event.type === 'submit') {
        this.handleBuyNow();
    }
  }

  updateQuantity(change) {
    const quantityInput = this.form.querySelector('.quantity-input');
    let currentValue = parseInt(quantityInput.value);
    const newValue = currentValue + change;

    if (newValue >= 1) { // Assuming min quantity is 1
      quantityInput.value = newValue;
    }
  }

  handleAddToCart(button) {
    const bookId = this.form.dataset.bookId;
    const quantity = parseInt(this.form.querySelector('.quantity-input').value);
    addToCart(bookId, quantity);

    // SUGGESTION: Provide visual feedback to the user
    button.textContent = 'Added!';
    setTimeout(() => {
      button.textContent = 'Add To Cart';
    }, 2000);

    console.log(`Book with ID '${bookId}' (qty: ${quantity}) added to Cart.`);
    console.log(`Total for book ID '${bookId}' in Cart: ${getFromCartByID(bookId)}`);
  }

  handleBuyNow() {
    // SUGGESTION: This should likely redirect to a checkout page or another modal
    console.log('"Buy Now" clicked. Implement checkout logic here.');
    alert('Thank you for your purchase!');
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

// --- Public API ---
// These functions are the intended way to interact with the modals from other scripts.
export function openContactsModal() {
    if (contactModal) {
        contactModal.open();
    } else {
        console.error('Contact modal is not initialized.');
    }
}

export function openBooksModal(bookId) {
    if (booksModal) {
        booksModal.open(bookId);
    } else {
        console.error('Books modal is not initialized.');
    }
}
