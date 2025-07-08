import { initSlider } from "./helpers";

initSlider({
  containerSelector: '.swiper-hero',
  prevSelector: '.hero-swiper-btn-prev',
  nextSelector: '.hero-swiper-btn-next',
});




  // Плавний скрол по кліку на "Shop now!"
  document.querySelectorAll('.slide-btn[href="#books"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('#books')?.scrollIntoView();
    });
  });

