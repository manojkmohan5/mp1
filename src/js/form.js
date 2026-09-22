/**
 * Sign-up form.
 *
 * A demonstration form for this coursework: it validates in the
 * browser and never leaves the page. Errors name the field and say
 * how to fix it, which is what WCAG 3.3.1 and 3.3.3 ask for.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function initForm() {
  const form = document.getElementById('join-form');
  if (!form) return;

  const input = document.getElementById('join-email');
  const error = document.getElementById('join-error');
  const status = document.getElementById('join-status');

  /** @param {string} message - empty string clears the error */
  function setError(message) {
    error.textContent = message;
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const value = input.value.trim();

    if (value === '') {
      setError('Email address is required. Enter the address to sign up with.');
      input.focus();
      return;
    }

    if (!EMAIL.test(value)) {
      setError(
        'Email address is not valid. Use the form name@example.com.'
      );
      input.focus();
      return;
    }

    setError('');
    status.textContent = `Thank you. ${value} would be on the list, if this form sent anything anywhere.`;
    form.reset();
  });

  // Clear a stale error as soon as the visitor starts fixing it.
  input.addEventListener('input', () => {
    if (error.textContent !== '') setError('');
  });
}
