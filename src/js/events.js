import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

let eventsSwiper = null;

function initEventsSwiper() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 1440 && !eventsSwiper) {
    eventsSwiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.events-swiper-btn-next',
        prevEl: '.events-swiper-btn-prev',
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

initEventsSwiper();
window.addEventListener('resize', initEventsSwiper);
