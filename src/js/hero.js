import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

initHeroSlider();
function initHeroSlider() {
  const root = document.querySelector('.swiper');
  if (!root) {
    console.warn('Swiper-контейнер не знайдено');
    return;
  }

  const prevBtn = document.querySelector('.hero-swiper-btn-prev');
  const nextBtn = document.querySelector('.hero-swiper-btn-next');

  // ініціалізація Swiper
  const swiper = new Swiper(root, {
    loop: false,
    effect: 'slide',
    parallax: true,
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    autoplay: {
      delay: 10000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    on: {
      init(sw) {
        updateArrows(sw);
      },
      slideChange(sw) {
        updateArrows(sw);
      },
    },
  });

  // Функція оновлення стану стрілок
  function updateArrows(sw) {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = sw.isBeginning;
    nextBtn.disabled = sw.isEnd;
    prevBtn.classList.toggle('disabled', sw.isBeginning);
    nextBtn.classList.toggle('disabled', sw.isEnd);
  }

  // Зняття фокусу з кнопки після кліка
  [prevBtn, nextBtn].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      btn.blur();
    });
  });

  // Плавний скрол по кліку на "Shop now!"
  document.querySelectorAll('.slide-btn[href="#books"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('#books')?.scrollIntoView();
    });
  });
}
