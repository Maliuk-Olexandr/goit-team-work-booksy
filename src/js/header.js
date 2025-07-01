const mobMenuOpenBtn = document.querySelector('#mobile-menu-open');
const mobMenu = document.querySelector('.mobile-menu');
const mobMenuCloseBtn = document.querySelector('#mobile-menu-close');
const mobLink = document.querySelector('.mobile-list');

mobMenuOpenBtn.addEventListener('click', () => {
  mobMenu.classList.add('is-open');
  document.body.classList.add('no-scroll');
});

mobMenuCloseBtn.addEventListener('click', () => {
  mobMenu.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
});

mobLink.addEventListener('click', event => {
  if (event.target.classList.contains('mobile-link')) {
    mobMenu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }
});
