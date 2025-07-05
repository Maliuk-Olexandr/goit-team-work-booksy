import{a as T,A as D}from"./assets/vendor-ByBLavyA.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=e(n);fetch(n.href,a)}})();const d={mobMenu:document.querySelector(".mobile-menu"),body:document.body};let p=!1;const v=t=>{if(p)return;p=!0,d.mobMenu.classList.toggle("is-open",t),d.body.classList.toggle("no-scroll",t);const o=e=>{e.target===d.mobMenu&&(p=!1,d.mobMenu.removeEventListener("transitionend",o))};d.mobMenu.addEventListener("transitionend",o)};document.addEventListener("click",t=>{t.target.closest("[data-menu-open]")?v(!0):t.target.closest("[data-menu-close], .mobile-link")&&v(!1)});const _="https://books-backend.p.goit.global/books",P=T.create({baseURL:_});async function g(t=""){try{const{data:o}=await P.get(t);return o}catch(o){throw console.error("Error fetching data:",o.message),o}}async function k(){return(await g("/category-list")).map(o=>o.list_name)}async function h(){return await g("/top-books")}async function w(t){if(!t){const o=new Error("Valid category must be provided.");throw console.error(o),o}return await g(`/category?category=${t}`)}async function L(t){if(!t){const o=new Error("Valid book ID must be provided.");throw console.error(o),o}return await g(`/${t}`)}async function N(){try{const t=await k(),o=await h(),e=await w(t[0]),s=e[0]._id;console.log("\x1B[32mtestAPI() start ------------\x1B[0m"),console.log("\x1B[32m1. getCategoryList():\x1B[0m",t),console.log("\x1B[32m2. getTopBooks():\x1B[0m",o),console.log(`\x1B[32m3. getBooksByCategory('${t[0]}'):\x1B[0m`,e),console.log(`\x1B[32m4. getBookByID("${s}"):`,await L(s)),console.log("\x1B[32mtestAPI() end ------------\x1B[\x1B[0m")}catch(t){console.error("API test failed:",t)}}const O=document.querySelector(".gallery"),m=document.querySelector("#category-select"),i=document.querySelector(".btn-show-more"),H=document.querySelector(".visible-books"),Q=document.querySelector(".total-books"),b=document.querySelector(".categories-list");let r=[],c=0;const R=await k();W(R);const U=await h();r=U.flatMap(({books:t})=>t);f();function W(t){m.innerHTML='<option selected value="All categories">All categories</option>',b.innerHTML='<li><button class="category-btn active-category" value="All categories">All categories</button></li>',t.forEach(o=>{const e=document.createElement("option");e.value=o,e.textContent=o,m.appendChild(e);const s=document.createElement("li");s.classList.add("category-item");const n=document.createElement("button");n.value=o,n.textContent=o,n.classList.add("category-btn"),s.appendChild(n),b.appendChild(s)})}async function B(t){m.value=t,b.querySelectorAll(".category-btn").forEach(o=>o.classList.toggle("active-category",o.value===t)),t==="All categories"?r=(await h()).flatMap(({books:e})=>e):r=await w(t),f()}m.addEventListener("change",t=>{const o=t.target.value;B(o)});b.addEventListener("click",t=>{if(t.target.tagName!=="BUTTON")return;const o=t.target.value;B(o)});i.addEventListener("click",()=>{c+=4,C(),i.blur()});function f(){i.classList.remove("btn-show-more-hidden"),c=j(),C(),c>=r.length&&i.classList.add("btn-show-more-hidden"),Q.textContent=r.length}function C(){const t=r.slice(0,c);O.innerHTML=V(t),H.textContent=Math.min(c,r.length),i.disabled=!1,c>=r.length&&i.classList.add("btn-show-more-hidden")}function j(){return window.innerWidth<768?10:24}window.addEventListener("resize",()=>{f()});function V(t){return t.map(({title:o,author:e,book_image:s,price:n})=>`
    <li class="book-card">
      <img class="book-cover" src="${s}" alt="${o}" width="150" />
      <div class="book-card-info">
        <div class="book-card-descriptions">
          <h3 class="book-card-title">${o.toLowerCase()}</h3>
          <h4 class="book-card-author">${e}</h4>
        </div>
        <p class="book-price">$${n}</p>
      </div>
      <button class="btn-secondary btn-book">Learn more</button>
    </li>
  `).join("")}function Y(t,o){const e=J(o);t.querySelector(".modal-content").innerHTML=e}function J(t){const{bookId:o,bookPicture:e,bookTitle:s,bookAuthor:n,bookPrice:a,bookQuantity:l,details:I,shipping:A,returns:F}=t;return`      
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
              value="${l}"
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
              <p class="ac-text">${I}</p>
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
              <p class="ac-text">${A}</p>
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
              <p class="ac-text">${F}</p>
            </div>
          </div>
        </div>
      </div>`}const E="shopping_cart";function K(t,o){if(!t||o<=0)return console.warn("Wrong parameters, can't add to cart"),!1;const e=M(),s=e[t]||0;return e[t]=Number(s)+Number(o),G(e)}function z(t){if(!t)return 0;const o=M();return Number(o[t])||0}function M(){try{const t=localStorage.getItem(E);return t?JSON.parse(t):{}}catch(t){return console.error("Cart data getting error:",t),{}}}function G(t){try{return localStorage.setItem(E,JSON.stringify(t)),!0}catch(o){return console.error("Cart saving error:",o),!1}}const u={modalBooks:document.querySelector(".modal-books"),modalContacts:document.querySelector(".modal-contacts")};function S(t){if(!t){console.error("Modal reference is not found");return}t.escapeHandler&&(document.removeEventListener("keydown",t.escapeHandler),t.removeEventListener("click",y)),t.escapeHandler=o=>{o.key==="Escape"&&q(t)},document.addEventListener("keydown",t.escapeHandler),t.addEventListener("click",y),t.classList.add("is-open"),document.body.style.overflow="hidden"}function q(t){if(!t){console.error("Modal reference is not found");return}t.removeEventListener("click",y),document.removeEventListener("keydown",t.escapeHandler);const o=document.getElementById("bookModalActionForm");o&&(o.removeEventListener("submit",x),o.removeEventListener("click",$)),t.classList.remove("is-open"),document.body.style.overflow=""}function y(t){const o=t.currentTarget,s=o.querySelector(".modal_close-btn").contains(t.target),n=t.target===o;(s||n)&&q(o)}class X{constructor(o){this.form=document.getElementById(o),this.submitBtn=this.form.querySelector("#submitBtn"),this.form.addEventListener("submit",e=>{e.preventDefault(),this.handleSubmit()})}getFormData(){const o=new FormData(this.form),e={};for(let[s,n]of o.entries())e[s]=n.trim();return e}showSuccess(o){console.log(o)}resetForm(){this.form.reset()}async handleSubmit(){const o=this.getFormData();try{await this.submitForm(o),this.showSuccess("Your registration has been submitted."),this.resetForm()}catch(e){console.error("Form submission error:",e)}}async submitForm(o){console.log("Form data:",o)}}function Z(t){S(u.modalContacts),new X("contactForm")}async function tt(t="660df41ba957e5c1ae0f519e"){try{const o=await L(t),e={bookId:o._id,bookPicture:o.book_image,bookTitle:o.title,bookAuthor:o.author,bookPrice:o.price,bookQuantity:1,details:o.details||`I Will Find You is a gripping thriller by the master of
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
                you through the process quickly and hassle-free.`};S(u.modalBooks),Y(u.modalBooks,e),new D(u.modalBooks.querySelector(".modal-books .accordion-container"),{showMultiple:!0,duration:400,collapse:!0});const s=document.getElementById("bookModalActionForm");if(!s){console.error("Form bookModalActionForm not found");return}s.addEventListener("submit",x),s.addEventListener("click",$)}catch(o){console.error("Error loading  with getBookByID:",o)}}function x(t){t.preventDefault(),st()}function $(t){switch(t.target.dataset.action){case"decrease":ot(t.target);break;case"increase":et(t.target);break;case"add-to-cart":nt(t.target);break}}function ot(t){const o=t.closest("[data-min-quantity]"),e=o.querySelector(".quantity-input"),s=parseInt(o.dataset.minQuantity),n=parseInt(e.value);n>s&&(e.value=n-1)}function et(t){const o=t.closest("[data-max-quantity]"),e=o.querySelector(".quantity-input"),s=parseInt(o.dataset.maxQuantity),n=parseInt(e.value);n<s&&(e.value=n+1)}function nt(t){const o=t.closest("[data-book-id]"),e=o.dataset.bookId,s=parseInt(o.querySelector(".quantity-input").value);K(e,s),console.log(`Book with ID'${e}' in q-ty '${s}' added to Cart`),console.log(`Total ID'${e}' in Cart ${z(e)}`)}function st(){console.log("Thanks for bying")}window.openBooksModal=tt;window.openContactsModal=Z;N();
//# sourceMappingURL=index.js.map
