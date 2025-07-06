document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.slider-feedbacks');

  const list = slider.querySelector('.list-feedbacks');
  const items = list.querySelectorAll('.item-feedbacks');
  const desktopOnlyItems = slider.querySelectorAll('.feedbacks-desktop-only');

  // Добавляем базовые классы Swiper
  slider.classList.add('swiper');
  list.classList.add('swiper-wrapper');
  items.forEach(item => item.classList.add('swiper-slide'));

  // Функция обновления видимости desktop-only слайдов
  function updateDesktopOnlySlides() {
    if (window.innerWidth >= 1440) {
      desktopOnlyItems.forEach(item => {
        item.style.display = 'block';
        item.classList.add('swiper-slide');
      });
    } else {
      desktopOnlyItems.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('swiper-slide');
      });
    }
  }

  updateDesktopOnlySlides();

  // Инициализация Swiper
  const feedbacksSwiper = new Swiper('.slider-feedbacks.swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: false,

    pagination: {
      el: '.swiper-pagination-feedbacks',
      clickable: true,
      renderBullet: function (index, className) {
        if (index > 3) return '';
        return `<span class="${className}" tabindex="0"></span>`;
      }
    },

    navigation: {
      nextEl: '.slider-navigation-feedbacks .swiper-button-next-feedbacks',
      prevEl: '.slider-navigation-feedbacks .swiper-button-prev-feedbacks',
      disabledClass: 'slider-button-disabled',
    },

    touchRatio: 1,
    simulateTouch: true,

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    a11y: {
      enabled: true,
      prevSlideMessage: 'Попередній слайд',
      nextSlideMessage: 'Наступний слайд',
      slideLabelMessage: '{{index}} з {{slidesLength}}',
      paginationBulletMessage: 'Перейти до слайда {{index}}',
    },

    mousewheel: {
      invert: false,
      sensitivity: 1,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });

  // При изменении размера окна обновляем слайды и пересобираем Swiper
  window.addEventListener('resize', () => {
    updateDesktopOnlySlides();
    feedbacksSwiper.update();
  });

  // Убираем фокус с кнопок после клика
  const prevBtn = document.querySelector('.swiper-button-prev-feedbacks');
  const nextBtn = document.querySelector('.swiper-button-next-feedbacks');

  if (prevBtn) prevBtn.addEventListener('mouseup', () => prevBtn.blur());
  if (nextBtn) nextBtn.addEventListener('mouseup', () => nextBtn.blur());
});
