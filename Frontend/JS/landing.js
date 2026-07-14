/**
 * landing.js
 * PURPOSE: Small page-local interactions for the marketing site
 * that don't belong in the shared theme/nav scripts.
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const links = document.querySelector('.site-header__links');
    if (menuToggle && links) {
      menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        links.classList.toggle('is-open', !isOpen);
      });
    }
  });
})();
