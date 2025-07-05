import refs from './refs';

let isAnimationInProgress = false;

const toggleMobMenu = open => {
  if (isAnimationInProgress) return;

  isAnimationInProgress = true;
  refs.mobMenu.classList.toggle('is-open', open);
  refs.body.classList.toggle('no-scroll', open);

  // Додаємо слухача на завершення transition тільки один раз
  const onTransitionEnd = event => {
    if (event.target === refs.mobMenu) {
      isAnimationInProgress = false;
      refs.mobMenu.removeEventListener('transitionend', onTransitionEnd);
    }
  };

  refs.mobMenu.addEventListener('transitionend', onTransitionEnd);
};

document.addEventListener('click', e => {
  if (e.target.closest('[data-menu-open]')) {
    toggleMobMenu(true);
  } else if (e.target.closest('[data-menu-close], .mobile-link')) {
    toggleMobMenu(false);
  }
});