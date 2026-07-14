/**
 * nav.js
 * ------------------------------------------------------------
 * PURPOSE: Behavior shared by both nav surfaces (sidebar + bottom
 * bar). Two responsibilities:
 *   1. Sidebar expand/collapse, persisted so it doesn't reset
 *      every navigation (a small UX/performance win — avoids a
 *      layout jump on every page load for users who expanded it).
 *   2. Active-link marking via [aria-current="page"], driven by
 *      a `data-page` attribute each <body> declares — this keeps
 *      "which page am I on" logic in one place instead of every
 *      HTML file hand-marking its own active class.
 *
 * SECURITY/ROBUSTNESS: all localStorage access wrapped in
 * try/catch, matching theme.js's defensive pattern.
 */
(function () {
  const SIDEBAR_STATE_KEY = 'cc-sidebar-expanded';

  function getStoredExpanded() {
    try {
      return localStorage.getItem(SIDEBAR_STATE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  }

  function setStoredExpanded(value) {
    try {
      localStorage.setItem(SIDEBAR_STATE_KEY, String(value));
    } catch (e) {
      /* non-fatal */
    }
  }

  function initSidebarToggle() {
    const sidebar = document.querySelector('.nav-sidebar');
    if (!sidebar) return;

    if (getStoredExpanded()) sidebar.setAttribute('data-expanded', 'true');

    const toggleBtn = sidebar.querySelector('.nav-sidebar__toggle-expand');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isExpanded = sidebar.getAttribute('data-expanded') === 'true';
        sidebar.setAttribute('data-expanded', String(!isExpanded));
        setStoredExpanded(!isExpanded);
      });
    }
  }

  function markActiveLinks() {
    const currentPage = document.body.getAttribute('data-page');
    if (!currentPage) return;
    document.querySelectorAll('.nav-link[data-page]').forEach((link) => {
      if (link.getAttribute('data-page') === currentPage) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSidebarToggle();
    markActiveLinks();
  });
})();
