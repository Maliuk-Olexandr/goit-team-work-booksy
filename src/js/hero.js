import { initSlider } from "./helpers";

const heroSlider = {
  containerSelector: '.swiper',
  prevSelector: '.hero-swiper-btn-prev',
  nextSelector: '.hero-swiper-btn-next',
}


initSlider(heroSlider);

  // Плавний скрол по кліку на "Shop now!"
  document.querySelectorAll('.slide-btn[href="#books"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector('#books')?.scrollIntoView();
    });
  });

