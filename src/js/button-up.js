const scrollBtn = document.querySelector('.scroll-top');

if (scrollBtn) {
  const toggleButtonVisibility = () => {
    const isMobile = window.innerWidth < 768;
    scrollBtn.style.display =
      !isMobile && window.scrollY > 300 ? 'flex' : 'none';
  };

  window.addEventListener('scroll', toggleButtonVisibility, { passive: true });
  // Скрол до верху по кліку
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
    });
  });
  // Ініціалізація видимості кнопки при завантаженні сторінки
  toggleButtonVisibility();
  // Ініціалізація видимості кнопки при зміні розміру вікна
  window.addEventListener('resize', toggleButtonVisibility, { passive: true });
  // Ініціалізація видимості кнопки при зміні орієнтації пристрою
  window.addEventListener('orientationchange', toggleButtonVisibility, {passive: true,});
}
