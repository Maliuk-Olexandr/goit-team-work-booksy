// Імпортуємо Swiper і модулі Navigation, Pagination
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

// Імпортуємо стилі Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

let eventsSwiper = null;

function initEventsSwiper() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 1440 && !eventsSwiper) {
    eventsSwiper = new Swiper('.events-swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
        nextEl: '.events-next',
        prevEl: '.events-prev',
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
