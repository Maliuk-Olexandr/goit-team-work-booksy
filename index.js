import{a as L,A as M}from"./assets/vendor-B1C9__Ow.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();const i={mobMenu:document.querySelector(".mobile-menu"),body:document.body};let u=!1;const m=t=>{if(u)return;u=!0,i.mobMenu.classList.toggle("is-open",t),i.body.classList.toggle("no-scroll",t);const o=e=>{e.target===i.mobMenu&&(u=!1,i.mobMenu.removeEventListener("transitionend",o))};i.mobMenu.addEventListener("transitionend",o)};document.addEventListener("click",t=>{t.target.closest("[data-menu-open]")?m(!0):t.target.closest("[data-menu-close], .mobile-link")&&m(!1)});function C(t,o){const e=E(o);t.querySelector(".modal-content").innerHTML=e}function E(t){const{bookId:o,bookPicture:e,bookTitle:s,bookAuthor:n,bookPrice:a,bookQuantity:r,details:k,shipping:w,returns:B}=t;return`      
      <button class="modal_close-btn">
        <svg>
          <use xlink:href="/img/icons.svg#icon-close"></use>
        </svg>
      </button>
        <picture class="modal-books_picture" id="bookPicture">
        <img
          class="modal-books_img"
          src="${e}"
          alt=""
        />
      </picture>
      <div class="modal-books_data"
        data-book-id="${o}"
        data-book-price="${a}"
        data-book-title="${s}"
      >
        <h2 class="modal-books_title">${s}</h2>
        <p class="modal-books_author">${n}</p>
        <p class="modal-books_price">$${a}</p>

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
              value="${r}"
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
              <p class="ac-text">${k}</p>
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
              <p class="ac-text">${w}</p>
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
              <p class="ac-text">${B}</p>
            </div>
          </div>
        </div>
      </div>`}const S="https://books-backend.p.goit.global/books";async function l(t=""){try{const{data:o}=await L.get(S+t);return o}catch(o){throw console.error("Error fetching data:",o.message),o}}async function I(){return(await l("/category-list")).map(o=>o.list_name)}async function q(){return await l("/top-books")}async function F(t){return await l(`/category?category=${t}`)}async function b(t){return await l(`/${t}`)}async function $(){try{const t=await I(),o=await q(),e=await F(t[0]),s=e[0]._id;console.log("\x1B[32mtestAPI() start ------------\x1B[0m"),console.log("GetCategoryList():",t),console.log("getTopBooks():",o),console.log(`getBooksByCategory('${t[0]}'):`,e),console.log(`getBookByID("${s}"):`,await b(s)),console.log("\x1B[32mtestAPI() end ------------\x1B[0m")}catch(t){console.error("API test failed:",t)}}const g="shopping_cart";function A(t,o){if(!t||o<=0)return console.warn("Wrong parameters, can't add to cart"),!1;const e=p(),s=e[t]||0;return e[t]=Number(s)+Number(o),x(e)}function _(t){if(!t)return 0;const o=p();return Number(o[t])||0}function p(){try{const t=localStorage.getItem(g);return t?JSON.parse(t):{}}catch(t){return console.error("Cart data getting error:",t),{}}}function x(t){try{return localStorage.setItem(g,JSON.stringify(t)),!0}catch(o){return console.error("Cart saving error:",o),!1}}const c={modalBooks:document.querySelector(".modal-books"),modalContacts:document.querySelector(".modal-contacts")};function y(t){if(!t){console.error("Modal reference is not found");return}t.escapeHandler&&(document.removeEventListener("keydown",t.escapeHandler),t.removeEventListener("click",d)),t.escapeHandler=o=>{o.key==="Escape"&&f(t)},document.addEventListener("keydown",t.escapeHandler),t.addEventListener("click",d),t.classList.add("is-open"),document.body.style.overflow="hidden"}function f(t){if(!t){console.error("Modal reference is not found");return}t.removeEventListener("click",d),document.removeEventListener("keydown",t.escapeHandler);const o=document.getElementById("bookModalActionForm");o&&(o.removeEventListener("submit",h),o.removeEventListener("click",v)),t.classList.remove("is-open"),document.body.style.overflow=""}function d(t){const o=t.currentTarget,s=o.querySelector(".modal_close-btn").contains(t.target),n=t.target===o;(s||n)&&f(o)}class D{constructor(o){this.form=document.getElementById(o),this.submitBtn=this.form.querySelector("#submitBtn"),this.form.addEventListener("submit",e=>{e.preventDefault(),this.handleSubmit()})}getFormData(){const o=new FormData(this.form),e={};for(let[s,n]of o.entries())e[s]=n.trim();return e}showSuccess(o){console.log(o)}resetForm(){this.form.reset()}async handleSubmit(){const o=this.getFormData();try{await this.submitForm(o),this.showSuccess("Your registration has been submitted."),this.resetForm()}catch(e){console.error("Form submission error:",e)}}async submitForm(o){console.log("Form data:",o)}}function T(t){y(c.modalContacts),new D("contactForm")}async function P(t="660df41ba957e5c1ae0f519e"){try{const o=await b(t),e={bookId:o._id,bookPicture:o.book_image,bookTitle:o.title,bookAuthor:o.author,bookPrice:o.price,bookQuantity:1,details:o.details||`I Will Find You is a gripping thriller by the master of
                suspense, Harlan Coben. The story follows David Burroughs, a
                former prisoner wrongfully convicted of murdering his own son.
                When he discovers a clue suggesting his son might still be
                alive, David escapes from prison to uncover the truth.
                Fast-paced, emotional, and full of unexpected twists — this
                novel will keep you hooked until the very last page.`,shipping:o.shipping||`We ship across the United States within 2–5 business days. All
                orders are processed through USPS or a reliable courier service.
                Enjoy free standard shipping on orders over $50.`,returns:o.returns||`You can return an item within 14 days of receiving your order,
                provided it hasn’t been used and is in its original condition.
                To start a return, please contact our support team — we’ll guide
                you through the process quickly and hassle-free.`};y(c.modalBooks),C(c.modalBooks,e),new M(c.modalBooks.querySelector(".modal-books .accordion-container"),{showMultiple:!0,duration:400,collapse:!0});const s=document.getElementById("bookModalActionForm");if(!s){console.error("Form bookModalActionForm not found");return}s.addEventListener("submit",h),s.addEventListener("click",v)}catch(o){console.error("Error loading  with getBookByID:",o)}}function h(t){t.preventDefault(),H()}function v(t){switch(t.target.dataset.action){case"decrease":N(t.target);break;case"increase":O(t.target);break;case"add-to-cart":Q(t.target);break}}function N(t){const o=t.closest("[data-min-quantity]"),e=o.querySelector(".quantity-input"),s=parseInt(o.dataset.minQuantity),n=parseInt(e.value);n>s&&(e.value=n-1)}function O(t){const o=t.closest("[data-max-quantity]"),e=o.querySelector(".quantity-input"),s=parseInt(o.dataset.maxQuantity),n=parseInt(e.value);n<s&&(e.value=n+1)}function Q(t){const o=t.closest("[data-book-id]"),e=o.dataset.bookId,s=parseInt(o.querySelector(".quantity-input").value);A(e,s),console.log(`Book with ID'${e}' in q-ty '${s}' added to Cart`),console.log(`Total ID'${e}' in Cart ${_(e)}`)}function H(){console.log("Thanks for bying")}window.openBooksModal=P;window.openContactsModal=T;$();
//# sourceMappingURL=index.js.map
