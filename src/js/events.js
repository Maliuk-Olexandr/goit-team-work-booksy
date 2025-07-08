import { openContactsModal } from './modal.js';
import { initSlider } from './helpers.js';

let eventsSwiper = null;
const registerBtns = document.querySelectorAll('.event-register-btn');

function initEventsSwiper() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 1440 && !eventsSwiper) {
    eventsSwiper = initSlider({
      containerSelector: '.events-swiper',
      prevSelector: '.events-swiper-btn-prev',
      nextSelector: '.events-swiper-btn-next',
      paginationSelector: '.events-pagination',
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
      },
      options: {
        spaceBetween: 24,
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        watchOverflow: true,
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