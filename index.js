import{a as v,A as k}from"./assets/vendor-B1C9__Ow.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();const i={mobMenu:document.querySelector(".mobile-menu"),body:document.body};let u=!1;const m=o=>{if(u)return;u=!0,i.mobMenu.classList.toggle("is-open",o),i.body.classList.toggle("no-scroll",o);const t=s=>{s.target===i.mobMenu&&(u=!1,i.mobMenu.removeEventListener("transitionend",t))};i.mobMenu.addEventListener("transitionend",t)};document.addEventListener("click",o=>{o.target.closest("[data-menu-open]")?m(!0):o.target.closest("[data-menu-close], .mobile-link")&&m(!1)});function w(o,t){const s=B(t);o.querySelector(".modal-content").innerHTML=s}function B(o){const{bookPicture:t,bookTitle:s,bookAuthor:a,bookPrice:e,bookQuantity:n,details:r,shipping:y,returns:f}=o;return`      
      <button class="modal_close-btn">
        <svg>
          <use xlink:href="/img/icons.svg#icon-close"></use>
        </svg>
      </button>
        <picture class="modal-books_picture" id="bookPicture">
        <img
          class="modal-books_img"
          src="${t}"
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
              <p class="ac-text">${y}</p>
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
              <p class="ac-text">${f}</p>
            </div>
          </div>
        </div>
      </div>`}const L="https://books-backend.p.goit.global/books";async function l(o=""){try{const{data:t}=await v.get(L+o);return t}catch(t){throw console.error("Error fetching data:",t.message),t}}async function M(){return(await l("/category-list")).map(t=>t.list_name)}async function S(){return await l("/top-books")}async function C(o){return await l(`/category?category=${o}`)}async function b(o){return await l(`/${o}`)}async function E(){try{const o=await M(),t=await S(),s=await C(o[0]),a=s[0]._id;console.log("\x1B[32mtestAPI() start ------------\x1B[0m"),console.log("GetCategoryList():",o),console.log("getTopBooks():",t),console.log(`getBooksByCategory('${o[0]}'):`,s),console.log(`getBookByID("${a}"):`,await b(a)),console.log("\x1B[32mtestAPI() end ------------\x1B[0m")}catch(o){console.error("API test failed:",o)}}const c={modalBooks:document.querySelector(".modal-books"),modalContacts:document.querySelector(".modal-contacts")};function g(o){o.escapeHandler=t=>{t.key==="Escape"&&p(o)},document.addEventListener("keydown",o.escapeHandler),o.addEventListener("click",h),o.classList.add("is-open"),document.body.style.overflow="hidden"}function p(o){o.removeEventListener("click",h),document.removeEventListener("keydown",o.escapeHandler),o.classList.remove("is-open"),document.body.style.overflow=""}function h(o){const t=o.currentTarget,a=t.querySelector(".modal_close-btn").contains(o.target),e=o.target===t;(a||e)&&p(t)}class P{constructor(t){this.form=document.getElementById(t),this.submitBtn=this.form.querySelector("#submitBtn"),this.form.addEventListener("submit",s=>{s.preventDefault(),this.handleSubmit()})}getFormData(){const t=new FormData(this.form),s={};for(let[a,e]of t.entries())s[a]=e.trim();return s}showSuccess(t){console.log(t)}resetForm(){this.form.reset()}async handleSubmit(){const t=this.getFormData();try{await this.submitForm(t),this.showSuccess("Your registration has been submitted."),this.resetForm()}catch(s){console.error("Form submission error:",s)}}async submitForm(t){console.log("Form data:",t)}}function $(o){g(c.modalContacts),new P("contactForm")}async function x(o="660df41ba957e5c1ae0f519e"){const t=await b(o),s={bookPicture:t.book_image,bookTitle:t.title,bookAuthor:t.author,bookPrice:t.price,bookQuantity:1,details:d.details,shipping:d.shipping,returns:d.returns};g(c.modalBooks),w(c.modalBooks,s),new k(c.modalBooks.querySelector(".modal-books .accordion-container"))}const d={details:`I Will Find You is a gripping thriller by the master of
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
                you through the process quickly and hassle-free.`};window.openBooksModal=x;window.openContactsModal=$;E();
//# sourceMappingURL=index.js.map
