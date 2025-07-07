//Допоміжні функції

export function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}


// Ініціалізація слайдера Swiper
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
/**
 * Ініціалізує слайдер Swiper з вказаними селекторами для контейнера, кнопок попереднього та наступного слайдів.
 * @param {Object} options - Налаштування слайдера.
 * @param {string} options.containerSelector - CSS-селектор для контейнера слайдера.
 * @param {string} options.prevSelector - CSS-селектор для кнопки "Попередній".
 * @param {string} options.nextSelector - CSS-селектор для кнопки "Наступний".
 * @returns {Swiper} Повертає екземпляр Swiper.
 */
export function initSlider({
  containerSelector,
  prevSelector,
  nextSelector,
}) {
  const root = document.querySelector(containerSelector);
  if (!root) {
    console.warn(`Swiper контейнер ${containerSelector} не знайдено`);
    return;
  }

  const prevBtn = document.querySelector(prevSelector);
  const nextBtn = document.querySelector(nextSelector);

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

  function updateArrows(sw) {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = sw.isBeginning;
    nextBtn.disabled = sw.isEnd;
    prevBtn.classList.toggle('disabled', sw.isBeginning);
    nextBtn.classList.toggle('disabled', sw.isEnd);
  }

  [prevBtn, nextBtn].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      btn.blur();
    });
  });

  return swiper;
}
