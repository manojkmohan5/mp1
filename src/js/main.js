/**
 * The Witcher IV product page - script entry point.
 *
 * Each feature lives in its own ES module and exports a single
 * initialiser. Nothing here touches the global scope.
 */

import initNav from './nav.js';
import initScroll from './scroll.js';
import initCarousel from './carousel.js';
import initModal from './modal.js';
import initReveal from './reveal.js';
import initForm from './form.js';

function boot() {
  // Tells the stylesheet that scripting is available, so the
  // reveal states may safely start hidden.
  document.documentElement.classList.remove('no-js');

  initNav();
  initScroll();
  initCarousel();
  initModal();
  initReveal();
  initForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
