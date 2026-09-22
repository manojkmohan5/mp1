/**
 * Field-note modal dialog.
 *
 * One dialog element is reused for every card. Content is cloned
 * out of the matching <template>, and the image and headings are
 * copied from the card that was clicked, so the markup stays the
 * single source of truth.
 *
 * Accessibility: focus moves into the dialog on open, is trapped
 * while it is open, and returns to the triggering card on close.
 * Escape and the backdrop both close it.
 */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export default function initModal() {
  const modal = document.getElementById('note-modal');
  if (!modal) return;

  const panel = modal.querySelector('.modal__panel');
  const img = document.getElementById('modal-img');
  const kind = document.getElementById('modal-kind');
  const title = document.getElementById('modal-title');
  const content = document.getElementById('modal-content');
  const cards = Array.from(document.querySelectorAll('[data-note]'));

  let lastTrigger = null;

  /** @returns {HTMLElement[]} focusable children, in DOM order */
  function focusables() {
    return Array.from(panel.querySelectorAll(FOCUSABLE));
  }

  /**
   * Fill the dialog from a card and show it.
   * @param {HTMLElement} card
   */
  function open(card) {
    const key = card.dataset.note;
    const template = document.querySelector(`[data-note-content="${key}"]`);
    const cardImg = card.querySelector('.notes__img');
    const cardKind = card.querySelector('.notes__kind');
    const cardTitle = card.querySelector('.notes__title');

    if (cardImg) {
      img.src = cardImg.src;
      // The dialog repeats the card's own image; the heading below
      // already names it, so the picture is decorative here.
      img.alt = '';
    }

    kind.textContent = cardKind ? cardKind.textContent.trim() : '';
    title.textContent = cardTitle ? cardTitle.textContent.trim() : '';

    content.replaceChildren();
    if (template) content.appendChild(template.content.cloneNode(true));

    lastTrigger = card;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');

    // The panel is still visibility:hidden on this tick, and a
    // hidden element cannot take focus. Wait for the style change
    // to land before moving the caret into the dialog.
    window.requestAnimationFrame(() => {
      const first = focusables()[0];
      if (first) first.focus();
    });
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');

    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  /**
   * Keep Tab inside the panel by wrapping at either end.
   * @param {KeyboardEvent} event
   */
  function trapFocus(event) {
    const items = focusables();
    if (items.length === 0) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  cards.forEach((card) => card.addEventListener('click', () => open(card)));

  modal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      close();
    } else if (event.key === 'Tab') {
      trapFocus(event);
    }
  });
}
