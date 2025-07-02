import refs from './refs';
const toggleMobMenu = open => {
  refs.mobMenu.classList.toggle('is-open', open);
  refs.body.classList.toggle('no-scroll', open);
};

document.addEventListener('click', e => {
  if (e.target.closest('[data-menu-open]')) toggleMobMenu(true);
  if (e.target.closest('[data-menu-close], .mobile-link')) toggleMobMenu(false);
});
