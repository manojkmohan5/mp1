/**
 * Gallery carousel.
 *
 * Crossfades between slides. Driven by the side arrows, the dot
 * tablist, the left/right arrow keys and horizontal swipes.
 * Dots are generated here so the markup never falls out of step
 * with the number of slides.
 */

const SWIPE_THRESHOLD = 40;

class Carousel {
  /** @param {HTMLElement} root */
  constructor(root) {
    this.root = root;
    this.slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
    this.dotsHost = root.querySelector('[data-carousel-dots]');
    this.counter = root.querySelector('[data-carousel-counter]');
    this.prevBtn = root.querySelector('[data-carousel-prev]');
    this.nextBtn = root.querySelector('[data-carousel-next]');
    this.index = 0;
    this.touchStartX = 0;
    this.dots = [];
  }

  init() {
    if (this.slides.length < 2) return;

    this.buildDots();
    this.bind();
    this.render();
  }

  /** One dot per slide, exposed as a tablist. */
  buildDots() {
    if (!this.dotsHost) return;

    this.dots = this.slides.map((slide, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsHost.appendChild(dot);
      return dot;
    });
  }

  bind() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.step(-1));
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.step(1));

    // Arrow keys work whenever focus is anywhere inside the carousel.
    this.root.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.step(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.step(1);
      }
    });

    this.root.addEventListener(
      'touchstart',
      (event) => {
        this.touchStartX = event.changedTouches[0].clientX;
      },
      { passive: true }
    );

    this.root.addEventListener(
      'touchend',
      (event) => {
        const delta = event.changedTouches[0].clientX - this.touchStartX;
        if (Math.abs(delta) > SWIPE_THRESHOLD) this.step(delta < 0 ? 1 : -1);
      },
      { passive: true }
    );
  }

  /**
   * Move by an offset, wrapping at both ends.
   * @param {number} offset
   */
  step(offset) {
    const count = this.slides.length;
    this.goTo((this.index + offset + count) % count);
  }

  /** @param {number} index */
  goTo(index) {
    this.index = index;
    this.render();
  }

  render() {
    this.slides.forEach((slide, i) => {
      const isCurrent = i === this.index;
      slide.classList.toggle('is-current', isCurrent);
      // Hidden slides are removed from the accessibility tree so a
      // screen reader announces one caption, not six.
      slide.setAttribute('aria-hidden', String(!isCurrent));
    });

    this.dots.forEach((dot, i) => {
      dot.setAttribute('aria-selected', String(i === this.index));
    });

    if (this.counter) {
      this.counter.textContent = `${this.index + 1} / ${this.slides.length}`;
    }
  }
}

export default function initCarousel() {
  document.querySelectorAll('.carousel').forEach((root) => {
    new Carousel(root).init();
  });
}
