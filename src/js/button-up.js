
export function initScrollToTopBtn(selector = '.scroll-top') {
  const scrollBtn = document.querySelector(selector);

  if (!scrollBtn) return;

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const toggleButtonVisibility = () => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile && window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  };

  const debouncedToggle = debounce(toggleButtonVisibility, 100);

  window.addEventListener('scroll', debouncedToggle, { passive: true });
  window.addEventListener('resize', toggleButtonVisibility, { passive: true });
  window.addEventListener('orientationchange', toggleButtonVisibility, {
    passive: true,
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  toggleButtonVisibility(); // Ініціалізація після завантаження
}

initScrollToTopBtn() // Виклик функції для ініціалізації кнопки "Повернутися вгору"
