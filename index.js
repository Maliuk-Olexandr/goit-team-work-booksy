import{a as v,A as k}from"./assets/vendor-B1C9__Ow.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();const i={mobMenu:document.querySelector(".mobile-menu"),body:document.body};let u=!1;const m=t=>{if(u)return;u=!0,i.mobMenu.classList.toggle("is-open",t),i.body.classList.toggle("no-scroll",t);const o=s=>{s.target===i.mobMenu&&(u=!1,i.mobMenu.removeEventListener("transitionend",o))};i.mobMenu.addEventListener("transitionend",o)};document.addEventListener("click",t=>{t.target.closest("[data-menu-open]")?m(!0):t.target.closest("[data-menu-close], .mobile-link")&&m(!1)});function w(t,o){const s=B(o);t.querySelector(".modal-content").innerHTML=s}function B(t){const{bookPicture:o,bookTitle:s,bookAuthor:a,bookPrice:e,bookQuantity:n,details:r,shipping:f,returns:y}=t;return`      
      <button class="modal_close-btn">
        <svg>
          <use xlink:href="/img/icons.svg#icon-close"></use>
        </svg>
      </button>
        <picture class="modal-books_picture" id="bookPicture">
        <img
          class="modal-books_img"
          src="${o}"
          alt=""
        />
      </picture>
      <div class="modal-books_data">
        <h2 class="modal-books_title">${s}</h2>
        <p class="modal-books_author">${a}</p>
        <p class="modal-books_price">$${e}</p>
        <div class="modal-books_quantity-container">
          <button class="btn btn-secondary">-</button>
          <input
            class="quantity-input"
            id="bookQuantity"
            value="${n}"
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
              <p class="ac-text">${r}</p>
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
              <p class="ac-text">${f}</p>
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
              <p class="ac-text">${y}</p>
            </div>
          </div>
        </div>
      </div>`}const L="https://books-backend.p.goit.global/books";async function l(t=""){try{const{data:o}=await v.get(L+t);return o}catch(o){throw console.error("Error fetching data:",o.message),o}}async function M(){return(await l("/category-list")).map(o=>o.list_name)}async function S(){return await l("/top-books")}async function A(t){return await l(`/category?category=${t}`)}async function b(t){return await l(`/${t}`)}async function C(){try{console.log("\x1B[32mtestAPI() start ------------\x1B[0m"),console.log("GetCategoryList():",await M()),console.log("getTopBooks():",await S()),console.log('getBooksByCategory("Audio Nonfiction"):',await A("Audio Nonfiction")),console.log('getBookByID("643282b1e85766588626a0b4"):',await b("643282b1e85766588626a0b4")),console.log("\x1B[32mtestAPI() end ------------\x1B[0m")}catch(t){console.error("API test failed:",t)}}const c={modalBooks:document.querySelector(".modal-books"),modalContacts:document.querySelector(".modal-contacts")};function g(t){t.escapeHandler=o=>{o.key==="Escape"&&p(t)},document.addEventListener("keydown",t.escapeHandler),t.addEventListener("click",h),t.classList.add("is-open"),document.body.style.overflow="hidden"}function p(t){t.removeEventListener("click",h),document.removeEventListener("keydown",t.escapeHandler),t.classList.remove("is-open"),document.body.style.overflow=""}function h(t){const o=t.currentTarget,a=o.querySelector(".modal_close-btn").contains(t.target),e=t.target===o;(a||e)&&p(o)}class E{constructor(o){this.form=document.getElementById(o),this.submitBtn=this.form.querySelector("#submitBtn"),this.form.addEventListener("submit",s=>{s.preventDefault(),this.handleSubmit()})}getFormData(){const o=new FormData(this.form),s={};for(let[a,e]of o.entries())s[a]=e.trim();return s}showSuccess(o){console.log(o)}resetForm(){this.form.reset()}async handleSubmit(){const o=this.getFormData();try{await this.submitForm(o),this.showSuccess("Your registration has been submitted."),this.resetForm()}catch(s){console.error("Form submission error:",s)}}async submitForm(o){console.log("Form data:",o)}}function P(t){g(c.modalContacts),new E("contactForm")}async function x(t="660df41ba957e5c1ae0f519e"){const o=await b(t),s={bookPicture:o.book_image,bookTitle:o.title,bookAuthor:o.author,bookPrice:o.price,bookQuantity:1,details:d.details,shipping:d.shipping,returns:d.returns};g(c.modalBooks),w(c.modalBooks,s),new k(c.modalBooks.querySelector(".modal-books .accordion-container"))}const d={details:`I Will Find You is a gripping thriller by the master of
                suspense, Harlan Coben. The story follows David Burroughs, a
                former prisoner wrongfully convicted of murdering his own son.
                When he discovers a clue suggesting his son might still be
                alive, David escapes from prison to uncover the truth.
                Fast-paced, emotional, and full of unexpected twists — this
                novel will keep you hooked until the very last page.`,shipping:`We ship across the United States within 2–5 business days. All
                orders are processed through USPS or a reliable courier service.
                Enjoy free standard shipping on orders over $50.`,returns:`You can return an item within 14 days of receiving your order,
                provided it hasn’t been used and is in its original condition.
                To start a return, please contact our support team — we’ll guide
                you through the process quickly and hassle-free.`};window.openBooksModal=x;window.openContactsModal=P;C();
//# sourceMappingURL=index.js.map
