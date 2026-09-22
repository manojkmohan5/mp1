/**
 * Sticky navigation behaviour.
 *
 * Three jobs, two of them driven off the same throttled scroll
 * handler:
 *   1. shrink the bar once the page has moved away from the top,
 *   2. highlight the section currently under the bar,
 *   3. drive the collapsed disclosure menu on narrow viewports.
 *
 * Deliberately absent: writing the bar's measured height back into a
 * custom property. The hero sizes itself from the navbar height, so
 * mutating that value mid-scroll resized the hero, shortened the
 * document, and dragged every anchor below it up under the bar. Both
 * heights are static tokens in _tokens.scss instead.
 */

const SHRINK_AT = 80;

/**
 * Coalesce a handler onto animation frames so a burst of scroll
 * events costs one layout read instead of dozens.
 * @param {Function} fn
 * @returns {Function}
 */
function onFrame(fn) {
  let queued = false;

  return function scheduled() {
    if (queued) return;
    queued = true;

    window.requestAnimationFrame(() => {
      queued = false;
      fn();
    });
  };
}

export default function initNav() {
  const nav = document.getElementById('site-nav');
  const menu = document.getElementById('nav-menu');
  const toggle = document.getElementById('nav-toggle');

  if (!nav || !menu || !toggle) return;

  const links = Array.from(menu.querySelectorAll('.nav__link'));

  // Pair every link with the section it points at, dropping any
  // link whose target is missing rather than throwing later.
  const targets = links
    .map((link) => {
      const id = link.getAttribute('href').slice(1);
      return { link, section: document.getElementById(id) };
    })
    .filter((entry) => entry.section !== null);

  /** Mark one link active, clear the rest. */
  function setActive(activeLink) {
    targets.forEach(({ link }) => {
      const isActive = link === activeLink;
      link.classList.toggle('is-active', isActive);

      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Choose the active link: the last section whose top has passed
   * below the bottom edge of the navbar.
   */
  function updateIndicator() {
    if (targets.length === 0) return;

    const navBottom = nav.getBoundingClientRect().bottom;

    // At the very bottom of the document the final section may be
    // too short to ever reach the bar, so pin the last link there.
    // A couple of pixels of slack covers fractional zoom levels.
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    if (atBottom) {
      setActive(targets[targets.length - 1].link);
      return;
    }

    let current = null;

    targets.forEach(({ link, section }) => {
      if (section.getBoundingClientRect().top <= navBottom + 1) {
        current = link;
      }
    });

    setActive(current);
  }

  /** Collapse the disclosure menu and reset its ARIA state. */
  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  const onScroll = onFrame(() => {
    nav.classList.toggle('is-scrolled', window.scrollY > SHRINK_AT);
    updateIndicator();
  });

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Picking a destination should dismiss the menu; the browser
  // handles the smooth scroll itself via CSS scroll-behavior.
  links.forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onFrame(() => {
    closeMenu();
    updateIndicator();
  }));

  updateIndicator();
  nav.classList.toggle('is-scrolled', window.scrollY > SHRINK_AT);
}
