import './js/header.js';
import './js/hero.js';
import './js/books.js';
import './js/feedback.js';
import './js/events.js';
import './js/footer.js';
import './js/modal.js';

// @TODO remove before production deployment
import { testAPI } from './js/products-api.js';
testAPI();
// @TODO remove before production deployment

import { initHeroSlider } from './js/hero.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
});
