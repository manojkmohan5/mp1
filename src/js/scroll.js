/**
 * Smooth scrolling for in-page anchors.
 *
 * The browser's own `scroll-behavior: smooth` scales its duration with
 * distance, so a jump from the hero to the last stripe took about a
 * second and a half and felt sluggish. This runs the same easing over a
 * duration that is clamped, so a short hop still feels deliberate and a
 * long one never drags.
 *
 * The CSS rule stays in place as the no-JS fallback; every scroll
 * started here passes `behavior: 'instant'` explicitly, which overrides
 * it frame by frame.
 */

const MIN_MS = 380;
const MAX_MS = 700;
const MS_PER_PX = 0.28;

/** Decelerating curve: quick to leave, gentle to arrive. */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function initScroll() {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Cancels an animation in flight when a new one starts, or when the
  // visitor grabs the page themselves mid-flight.
  let animation = 0;

  function stop() {
    animation += 1;
  }

  /**
   * Put the target under the navbar and hand it keyboard focus.
   * Following a link normally moves focus; preventing the default
   * means doing that by hand, or keyboard users stay where they were.
   * @param {HTMLElement} target
   */
  function land(target) {
    window.history.replaceState(null, '', `#${target.id}`);

    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
  }

  /** @param {HTMLElement} target */
  function scrollToTarget(target) {
    // scroll-padding-top resolves to the compact navbar height in px,
    // so the same offset drives both the JS and the CSS fallback.
    const offset = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    const start = window.scrollY;
    const maxScroll = root.scrollHeight - window.innerHeight;
    const end = Math.max(
      0,
      Math.min(target.getBoundingClientRect().top + start - offset, maxScroll)
    );
    const distance = end - start;

    stop();

    if (reduceMotion.matches || Math.abs(distance) < 4) {
      window.scrollTo({ top: end, left: 0, behavior: 'instant' });
      land(target);
      return;
    }

    const duration = Math.min(
      MAX_MS,
      Math.max(MIN_MS, Math.abs(distance) * MS_PER_PX)
    );
    const token = animation;
    const startedAt = performance.now();

    function step(now) {
      if (token !== animation) return;

      const progress = Math.min(1, (now - startedAt) / duration);
      window.scrollTo({
        top: start + distance * easeOutCubic(progress),
        left: 0,
        behavior: 'instant',
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        land(target);
      }
    }

    window.requestAnimationFrame(step);
  }

  // One delegated listener covers the navbar, the hero buttons, the
  // scroll cue and the footer sitemap.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href').slice(1);
    if (id === '') return;

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    scrollToTarget(target);
  });

  // A wheel, touch or key nudge during the animation hands control back.
  ['wheel', 'touchstart', 'keydown'].forEach((type) => {
    window.addEventListener(type, stop, { passive: true });
  });
}
