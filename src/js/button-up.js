
  const scrollBtn = document.querySelector('.scroll-top');

  // Показуємо кнопку при скролі вниз
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  // Скрол до верху по кліку
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
    });
  });

