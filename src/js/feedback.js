const slider = document.querySelector('.slider-feedbacks');
const desktopOnlyItems = slider.querySelectorAll('.feedbacks-desktop-only');

function updateDesktopOnlySlides() {
  const isDesktop = window.innerWidth >= 1440;
  desktopOnlyItems.forEach(item => {
    item.style.display = isDesktop ? 'block' : 'none';
  });
}

updateDesktopOnlySlides();

const feedbacksSwiper = new Swiper('.slider-feedbacks', {
  slidesPerView: 1,
  loop: false,

  pagination: {
    el: '.swiper-pagination-feedbacks',
    clickable: true,
    renderBullet: (index, className) =>
      index > 3 ? '' : `<span class="${className}" tabindex="0"></span>`,
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
    768: { slidesPerView: 2 },
    1440: { slidesPerView: 3 },
  },
});

let wasDesktop = window.innerWidth >= 1440;
window.addEventListener('resize', () => {
  const isDesktop = window.innerWidth >= 1440;
  if (isDesktop !== wasDesktop) {
    updateDesktopOnlySlides();
    feedbacksSwiper.update();
    wasDesktop = isDesktop;
  }
});

document
  .querySelectorAll('.swiper-button-prev-feedbacks, .swiper-button-next-feedbacks')
  .forEach(btn => btn.addEventListener('mouseup', () => btn.blur()));
