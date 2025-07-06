import{a as D,A as H,i as k}from"./assets/vendor-C50cUb4q.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const d={mobMenu:document.querySelector(".mobile-menu"),body:document.body};let b=!1;const w=e=>{if(b)return;b=!0,d.mobMenu.classList.toggle("is-open",e),d.body.classList.toggle("no-scroll",e);const t=o=>{o.target===d.mobMenu&&(b=!1,d.mobMenu.removeEventListener("transitionend",t))};d.mobMenu.addEventListener("transitionend",t)};document.addEventListener("click",e=>{e.target.closest("[data-menu-open]")?w(!0):e.target.closest("[data-menu-close], .mobile-link")&&w(!1)});const P="https://books-backend.p.goit.global/books",F=D.create({baseURL:P});async function h(e=""){try{const{data:t}=await F.get(e);return t}catch(t){throw console.error("Error fetching data:",t.message),t}}async function L(){return(await h("/category-list")).map(t=>t.list_name)}async function y(){return await h("/top-books")}async function B(e){if(!e){const t=new Error("Valid category must be provided.");throw console.error(t),t}return await h(`/category?category=${e}`)}async function M(e){if(!e){const t=new Error("Valid book ID must be provided.");throw console.error(t),t}return await h(`/${e}`)}async function N(){try{const e=await L(),t=await y(),o=await B(e[0]),n=o[0]._id;console.log("\x1B[32mtestAPI() start ------------\x1B[0m"),console.log("\x1B[32m1. getCategoryList():\x1B[0m",e),console.log("\x1B[32m2. getTopBooks():\x1B[0m",t),console.log(`\x1B[32m3. getBooksByCategory('${e[0]}'):\x1B[0m`,o),console.log(`\x1B[32m4. getBookByID("${n}"):`,await M(n)),console.log("\x1B[32mtestAPI() end ------------\x1B[\x1B[0m")}catch(e){console.error("API test failed:",e)}}const O=document.querySelector(".gallery"),u=document.querySelector("#category-select"),c=document.querySelector(".btn-show-more"),U=document.querySelector(".visible-books"),Q=document.querySelector(".total-books"),m=document.querySelector(".categories-list");let r=[],i=0;const R=await L();W(R);const V=await y();r=V.flatMap(({books:e})=>e);v();function W(e){u.innerHTML='<option selected value="All categories">All categories</option>',m.innerHTML='<li><button class="category-btn active-category" value="All categories">All categories</button></li>',e.forEach(t=>{const o=document.createElement("option");o.value=t,o.textContent=t,u.appendChild(o);const n=document.createElement("li");n.classList.add("category-item");const s=document.createElement("button");s.value=t,s.textContent=t,s.classList.add("category-btn"),n.appendChild(s),m.appendChild(n)})}async function S(e){u.value=e,m.querySelectorAll(".category-btn").forEach(t=>t.classList.toggle("active-category",t.value===e)),e==="All categories"?r=(await y()).flatMap(({books:o})=>o):r=await B(e),v()}u.addEventListener("change",e=>{const t=e.target.value;S(t)});m.addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return;const t=e.target.value;S(t)});c.addEventListener("click",()=>{i+=4,I(),c.blur()});function v(){c.classList.remove("btn-show-more-hidden"),i=j(),I(),i>=r.length&&c.classList.add("btn-show-more-hidden"),Q.textContent=r.length}function I(){const e=r.slice(0,i);O.innerHTML=z(e),U.textContent=Math.min(i,r.length),c.disabled=!1,i>=r.length&&c.classList.add("btn-show-more-hidden")}function j(){return window.innerWidth<768?10:24}window.addEventListener("resize",()=>{v()});function z(e){return e.map(({title:t,author:o,book_image:n,price:s})=>`
    <li class="book-card">
      <img class="book-cover" src="${n}" alt="${t}" width="150" />
      <div class="book-card-info">
        <div class="book-card-descriptions">
          <h3 class="book-card-title">${t.toLowerCase()}</h3>
          <h4 class="book-card-author">${o}</h4>
        </div>
        <p class="book-price">$${s}</p>
      </div>
      <button class="btn-secondary btn-book">Learn more</button>
    </li>
  `).join("")}function X(e,t){const o=Y(t);e.querySelector(".modal-content").innerHTML=o}function Y(e){const{bookId:t,bookPicture:o,bookTitle:n,bookAuthor:s,bookPrice:a,bookQuantity:l,details:A,shipping:T,returns:_}=e;return`      
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
      <div class="modal-books_data"
        data-book-id="${t}"
        data-book-price="${a}"
        data-book-title="${n}"
      >
        <h2 class="modal-books_title">${n}</h2>
        <p class="modal-books_author">${s}</p>
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
          <div class="modal-books_message-container"></div>
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
              <p class="ac-text">${A}</p>
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
              <p class="ac-text">${T}</p>
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
              <p class="ac-text">${_}</p>
            </div>
          </div>
        </div>
      </div>`}const q="shopping_cart";function K(e,t){if(!e||t<=0)return console.warn("Wrong parameters, can't add to cart"),!1;const o=$(),n=o[e]||0;return o[e]=Number(n)+Number(t),G(o)}function J(e){if(!e)return 0;const t=$();return Number(t[e])||0}function $(){try{const e=localStorage.getItem(q);return e?JSON.parse(e):{}}catch(e){return console.error("Cart data getting error:",e),{}}}function G(e){try{return localStorage.setItem(q,JSON.stringify(e)),!0}catch(t){return console.error("Cart saving error:",t),!1}}const p={details:"I Will Find You is a gripping thriller by the master of suspense, Harlan Coben. The story follows David Burroughs, a former prisoner wrongfully convicted of murdering his own son. When he discovers a clue suggesting his son might still be alive, David escapes from prison to uncover the truth. Fast-paced, emotional, and full of unexpected twists — this novel will keep you hooked until the very last page.",shipping:"We ship across the United States within 2–5 business days. All orders are processed through USPS or a reliable courier service. Enjoy free standard shipping on orders over $50.",returns:"You can return an item within 14 days of receiving your order, provided it hasn’t been used and is in its original condition. To start a return, please contact our support team — we’ll guide you through the process quickly and hassle-free."};class x{constructor(t){if(!t)throw new Error("Modal Element not found");this.modalElement=t,this.escapeHandler=this.handleEscape.bind(this),this.closeClickHandler=this.handleCloseClick.bind(this)}open(){this.modalElement.classList.add("is-open"),document.body.style.overflow="hidden",document.addEventListener("keydown",this.escapeHandler),this.modalElement.addEventListener("click",this.closeClickHandler)}close(){this.modalElement.classList.remove("is-open"),document.body.style.overflow="",document.removeEventListener("keydown",this.escapeHandler),this.modalElement.removeEventListener("click",this.closeClickHandler)}handleEscape(t){t.key==="Escape"&&this.close()}handleCloseClick(t){const o=this.modalElement.querySelector(".modal_close-btn"),n=o&&o.contains(t.target),s=t.target===this.modalElement;(n||s)&&this.close()}}class Z extends x{constructor(t){if(super(t),this.form=this.modalElement.querySelector("#contactForm"),!this.form)throw new Error("Contact form not found in the modal");this.submitHandler=this.handleSubmit.bind(this)}open(){super.open(),this.form.addEventListener("submit",this.submitHandler)}close(){super.close(),this.form.removeEventListener("submit",this.submitHandler),this.form.reset()}async handleSubmit(t){t.preventDefault();const o=new FormData(this.form),n=Object.fromEntries(o.entries());try{await this.submitForm(n),alert("Your registration has been submitted."),this.close()}catch(s){console.error("Form submission error:",s),alert("There was an error submitting your registration. Please try again.")}}async submitForm(t){console.log("Submitting form data:",t)}}class tt extends x{constructor(t){super(t),this.eventHandler=this.handleEvents.bind(this)}async open(t){try{const o=await M(t),n=this.prepareData(o);X(this.modalElement,n),super.open(),this.form=this.modalElement.querySelector("#bookModalActionForm"),this.form&&(this.form.addEventListener("click",this.eventHandler),this.form.addEventListener("submit",this.eventHandler)),new H(this.modalElement.querySelector(".accordion-container"),{showMultiple:!0,duration:400,collapse:!0})}catch(o){console.error(`Error loading book with ID ${t}:`,o),this.modalElement.innerHTML=`<div class="modal-content"><p>Sorry, we couldn't load the book details. Please try again later.</p></div>`,super.open()}}close(){super.close(),this.form&&(this.form.removeEventListener("click",this.eventHandler),this.form.removeEventListener("submit",this.eventHandler))}prepareData(t){return{bookId:t._id,bookPicture:t.book_image,bookTitle:t.title,bookAuthor:t.author,bookPrice:t.price,bookQuantity:1,details:t.details||p.details,shipping:t.shipping||p.shipping,returns:t.returns||p.returns}}handleEvents(t){t.preventDefault();const o=t.target;switch(o.dataset.action){case"decrease":this.updateQuantity(-1);break;case"increase":this.updateQuantity(1);break;case"add-to-cart":this.handleAddToCart(o);break;case"buy-now":this.handleBuyNow();break}t.type==="submit"&&this.handleBuyNow()}updateQuantity(t){const o=this.form.querySelector(".quantity-input"),s=parseInt(o.value)+t;s>=1&&(o.value=s)}handleAddToCart(t){const n=t.closest("[data-book-id]").dataset.bookId,s=parseInt(this.form.querySelector(".quantity-input").value);k.show({iconUrl:"/img/shopping_basket.svg",iconColor:"white",balloon:!1,theme:"light",progressBar:!0,message:`Book (qty: ${s}) added`,transitionIn:"flipInX",transitionInMobile:"flipInX",target:".modal-books_message-container",targetFirst:!1,timeout:3e3,animateInside:!0}),console.log(`Book with ID '${n}' (qty: ${s}) added to Cart.`),console.log(`Total ID '${n}' in Cart: ${J(n)}`),K(n,s)}handleBuyNow(){console.log('"Buy Now" clicked.'),k.show({iconUrl:"/img/shopping_basket.svg",iconColor:"white",position:"center",balloon:!1,theme:"light",progressBar:!0,message:"Thanks for buying!",transitionIn:"flipInX",transitionInMobile:"flipInX",targetFirst:!1,timeout:5e3,animateInside:!0}),this.close()}}const E=document.querySelector(".modal-contacts"),C=document.querySelector(".modal-books");let g,f;E&&(g=new Z(E));C&&(f=new tt(C));function et(){g?g.open():console.error("Contact modal is not initialized.")}function ot(e="660df41ba957e5c1ae0f519e"){f?f.open(e):console.error("Books modal is not initialized.")}window.openBooksModal=ot;window.openContactsModal=et;N();
//# sourceMappingURL=index.js.map
