/**
 * Scroll-triggered reveals.
 *
 * Adds .is-revealed once an element scrolls into view, which starts
 * the CSS transition declared in _animations.scss. Elements are
 * unobserved after firing so nothing animates twice.
 */

export default function initReveal() {
  const items = Array.from(document.querySelectorAll('.reveal'));
  if (items.length === 0) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // No observer support, or the visitor asked for less motion:
  // show everything immediately rather than leaving it invisible.
  if (reduced || typeof IntersectionObserver === 'undefined') {
    items.forEach((item) => item.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    },
    // Fire a little before the element is fully on screen.
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );

  items.forEach((item) => observer.observe(item));
}
