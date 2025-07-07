import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { openContactsModal } from './modal.js';
let eventsSwiper = null;
const registerBtns = document.querySelectorAll('.event-register-btn');
function initEventsSwiper() {
  const screenWidth = window.innerWidth;
  if (screenWidth < 1440 && !eventsSwiper) {
    eventsSwiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: '.events-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.events-swiper-btn-next',
        prevEl: '.events-swiper-btn-prev',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      watchOverflow: true,
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
    });
  } else if (screenWidth >= 1440 && eventsSwiper) {
    eventsSwiper.destroy(true, true);
    eventsSwiper = null;
  }
}
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
const debouncedInitEventsSwiper = debounce(initEventsSwiper, 200);
initEventsSwiper();
window.addEventListener('resize', debouncedInitEventsSwiper);
registerBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const eventName = btn.dataset.event || 'book-registration';
    openContactsModal(eventName);
  });
});
