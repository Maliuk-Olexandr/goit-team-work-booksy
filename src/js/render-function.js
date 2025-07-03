//Функцію для створення, рендеру або видалення розмітки

//#region Book Modal Render
export function renderBookModal(reference, dataObj) {
  const markup = bookModalMarkup(dataObj);
  reference.querySelector('.modal-content').innerHTML = markup;
}

function bookModalMarkup(obj) {
  const {
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
      <div class="modal-books_data">
        <h2 class="modal-books_title">${bookTitle}</h2>
        <p class="modal-books_author">${bookAuthor}</p>
        <p class="modal-books_price">$${bookPrice}</p>
        <div class="modal-books_quantity-container">
          <button class="btn btn-secondary">-</button>
          <input
            class="quantity-input"
            id="bookQuantity"
            value="${bookQuantity}"
            min="1"
            max="10"
          />
          <button class="btn btn-secondary">+</button>
        </div>
        <div class="modal-books_buttons-container">
          <button class="btn">Add To Cart</button>
          <button class="btn btn-secondary">Buy Now</button>
        </div>

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
