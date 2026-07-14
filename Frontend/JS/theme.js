/**
 * theme.js
 * ------------------------------------------------------------
 * PURPOSE: Light/dark theme switching for Christian Cuisine.
 *
 * LOGIC:
 *   1. On load, resolve theme in priority order:
 *      explicit user choice (localStorage) > OS preference > light.
 *   2. Apply it BEFORE first paint is not fully possible from an
 *      external deferred script, so this file is loaded with a
 *      blocking <script> in <head> (see inline snippet in each
 *      HTML page) to avoid a flash of the wrong theme (FOUC).
 *   3. Expose `window.ChristianCuisineTheme` so any page/component
 *      (e.g. a settings toggle) can read or change the theme
 *      without re-implementing this logic.
 *
 * SECURITY: localStorage access is wrapped in try/catch — some
 * browsers throw in private-browsing/third-party-iframe contexts.
 * We degrade gracefully to "light" rather than crashing the page.
 *
 * SCALABILITY: Additional themes (e.g. a future high-contrast
 * mode) can be added by extending VALID_THEMES and the toggle
 * logic below — nothing else in the app needs to change since
 * every color reference goes through CSS custom properties.
 */
(function () {
  const STORAGE_KEY = 'cc-theme';
  const VALID_THEMES = ['light', 'dark'];

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return VALID_THEMES.includes(stored) ? stored : null;
    } catch (e) {
      return null;
    }
  }

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function resolveInitialTheme() {
    return getStoredTheme() || getSystemTheme();
  }

  function applyTheme(theme) {
    if (!VALID_THEMES.includes(theme)) theme = 'light';
    document.documentElement.setAttribute('data-theme', theme);
    // Keep any <meta name="theme-color"> in sync for mobile browser chrome.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#1B1108' : '#FFE3B3');
    }
    // Update all theme-toggle buttons on the page (there may be a
    // single flip-button in the header AND an explicit Light/Dark
    // pair in the sidebar — each button reports whether IT reflects
    // the currently active theme).
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const explicitValue = btn.getAttribute('data-theme-toggle');
      const isActive = (explicitValue === 'light' || explicitValue === 'dark')
        ? explicitValue === theme
        : theme === 'dark';
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  function setTheme(theme) {
    applyTheme(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      /* non-fatal: theme just won't persist across sessions */
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Apply immediately (this script must be loaded synchronously,
  // before body render, to prevent a flash of unstyled theme).
  applyTheme(resolveInitialTheme());

  // Wire up toggle buttons once DOM is ready.
  // Two button patterns are supported:
  //   1. A single icon button [data-theme-toggle] with no value → flips
  //      between light/dark (used in the marketing header pill).
  //   2. Explicit [data-theme-toggle="light"|"dark"] buttons → set that
  //      specific theme regardless of current state (used in the
  //      sidebar's Light/Dark pair, so clicking "Light" while already
  //      light is a safe no-op rather than flipping to dark).
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      const explicitValue = btn.getAttribute('data-theme-toggle');
      btn.addEventListener('click', () => {
        if (explicitValue === 'light' || explicitValue === 'dark') {
          setTheme(explicitValue);
        } else {
          toggleTheme();
        }
      });
    });
  });

  // Public API for other scripts/components.
  window.ChristianCuisineTheme = { setTheme, toggleTheme, getTheme: () => document.documentElement.getAttribute('data-theme') };
})();
