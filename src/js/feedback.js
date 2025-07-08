import { initSlider } from './helpers';




const feedbacksSwiper = initSlider({
  containerSelector: '.slider-feedbacks',
  prevSelector: '.swiper-button-prev-feedbacks',
  nextSelector: '.swiper-button-next-feedbacks',
  paginationSelector: '.swiper-pagination-feedbacks',
  customBullet: (index, className) => {
    if (index > 3) return '';
    return `<span class="${className}" tabindex="0"></span>`;
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1440: { slidesPerView: 3 },
  },
  options: {
    a11y: {
      enabled: true,
      prevSlideMessage: 'Попередній слайд',
      nextSlideMessage: 'Наступний слайд',
      slideLabelMessage: '{{index}} з {{slidesLength}}',
      paginationBulletMessage: 'Перейти до слайда {{index}}',
    },
  },
});

const slider = document.querySelector('.slider-feedbacks');
const desktopOnlyItems = slider?.querySelectorAll('.feedbacks-desktop-only')?? [];

function updateDesktopOnlySlides() {
  const isDesktop = window.innerWidth >= 1440;
  desktopOnlyItems.forEach(item => {
    item.style.display = isDesktop ? 'block' : 'none';
  });
}
updateDesktopOnlySlides();


let wasDesktop = window.innerWidth >= 1440;

window.addEventListener('resize', () => {
  const isDesktop = window.innerWidth >= 1440;
  if (isDesktop !== wasDesktop) {
    updateDesktopOnlySlides();
    feedbacksSwiper?.update();
    wasDesktop = isDesktop;
  }
});
