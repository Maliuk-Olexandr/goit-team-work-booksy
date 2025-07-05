//Функцію для створення, рендеру або видалення розмітки

//#region Book Modal Render
export function renderBookModal(reference, dataObj) {
  const markup = bookModalMarkup(dataObj);
  reference.querySelector('.modal-content').innerHTML = markup;
}

function bookModalMarkup(obj) {
  const {
    bookId,
    bookPicture,
    bookTitle,
    bookAuthor,
    bookPrice,
    bookQuantity,
    details,
    shipping,
    returns,
  } = obj;

  return `      
      <button class="modal_close-btn">
        <svg>
          <use xlink:href="/img/icons.svg#icon-close"></use>
        </svg>
      </button>
        <picture class="modal-books_picture" id="bookPicture">
        <img
          class="modal-books_img"
          src="${bookPicture}"
          alt=""
        />
      </picture>
      <div class="modal-books_data"
        data-book-id="${bookId}"
        data-book-price="${bookPrice}"
        data-book-title="${bookTitle}"
      >
        <h2 class="modal-books_title">${bookTitle}</h2>
        <p class="modal-books_author">${bookAuthor}</p>
        <p class="modal-books_price">$${bookPrice}</p>

        <form class="book-action-form" id="bookModalActionForm">
          <div class="modal-books_quantity-container"
            data-min-quantity="1" 
            data-max-quantity="999" 
            data-step="1"
          >
            <button class="btn btn-secondary"
              type="button"
              class="btn btn-secondary"
              data-action="decrease"
            >-</button>
            <input
              class="quantity-input"
              id="bookQuantity"
              value="${bookQuantity}"
              min="1"
            />
            <button class="btn btn-secondary"
              type="button"
              class="btn btn-secondary"
              data-action="increase"
            >+</button>
          </div>
          <div class="modal-books_buttons-container">
            <button 
              class="btn"
              type="button"
              data-action="add-to-cart"
            >Add To Cart</button>
            <button
              type="submit"
              class="btn btn-secondary"
              data-action="buy-now"
            >Buy Now</button>
          </div>
        </form>

        <div class="accordion-container">
          <div class="ac">
            <h2 class="ac-header">
              <button type="button" class="ac-trigger">
                Details
                <svg class="chevron-icon">
                  <use xlink:href="/img/icons.svg#icon-chevron-up"></use>
                </svg>
              </button>
            </h2>
            <div class="ac-panel">
              <p class="ac-text">${details}</p>
            </div>
          </div>

          <div class="ac">
            <h2 class="ac-header">
              <button type="button" class="ac-trigger">
                Shipping<svg class="chevron-icon">
                  <use xlink:href="/img/icons.svg#icon-chevron-up"></use>
                </svg>
              </button>
            </h2>
            <div class="ac-panel">
              <p class="ac-text">${shipping}</p>
            </div>
          </div>

          <div class="ac">
            <h2 class="ac-header">
              <button type="button" class="ac-trigger">
                Returns<svg class="chevron-icon">
                  <use xlink:href="/img/icons.svg#icon-chevron-up"></use>
                </svg>
              </button>
            </h2>
            <div class="ac-panel">
              <p class="ac-text">${returns}</p>
            </div>
          </div>
        </div>
      </div>`;
}
//#endregion Book Modal Render
