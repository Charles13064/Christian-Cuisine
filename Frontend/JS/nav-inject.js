/**
 * nav-inject.js
 * ------------------------------------------------------------
 * PURPOSE: Single source of truth for the sidebar + bottom-bar
 * markup (previously duplicated into every page). Each app page
 * includes an empty `<div id="nav-root"></div>` plus this script
 * (loaded as a normal, non-deferred <script> tag immediately
 * after it) — the script runs synchronously during HTML parsing
 * and injects the nav before DOMContentLoaded fires, so nav.js's
 * DOMContentLoaded handler (active-link marking, expand/collapse)
 * still finds fully-formed markup to work with. No fetch() is
 * used, so this works identically over file:// and http://.
 *
 * SCALABILITY: adding a nav item means editing this one file
 * instead of 30 HTML files.
 */
(function () {
  const NAV_HTML = `
  <nav class="nav-sidebar" aria-label="Main" data-expanded="false">
    <a href="index.html" class="nav-sidebar__brand">
      <span class="nav-sidebar__brand-mark"></span>
      <span class="nav-sidebar__brand-name">Christian Cuisine</span>
    </a>

    <div class="nav-sidebar__section">
      <span class="nav-sidebar__label">Main</span>
      <a class="nav-link" href="dashboard.html" data-page="dashboard" data-label="Dashboard">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>
        <span class="nav-sidebar__text">Dashboard</span>
      </a>
      <a class="nav-link" href="bible.html" data-page="bible" data-label="Bible">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>
        <span class="nav-sidebar__text">Bible</span>
      </a>
      <a class="nav-link" href="devotion.html" data-page="devotion" data-label="Devotion">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.35-9.5-8.5C.7 8.9 2.4 5 6 5c2 0 3.5 1.2 4 2.4C10.5 6.2 12 5 14 5c3.6 0 5.3 3.9 3.5 7.5C19 16.65 12 21 12 21Z"/></svg>
        <span class="nav-sidebar__text">Devotion</span>
      </a>
      <a class="nav-link" href="goals.html" data-page="goals" data-label="Spiritual Goals">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>
        <span class="nav-sidebar__text">Spiritual Goals</span>
      </a>
      <a class="nav-link" href="prayer.html" data-page="prayer" data-label="Prayer Center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6v12M8 9l4-3 4 3M6 21h12l-1.2-6.5a2 2 0 0 0-2-1.5h-5.6a2 2 0 0 0-2 1.5L6 21Z"/></svg>
        <span class="nav-sidebar__text">Prayer Center</span>
      </a>
      <a class="nav-link" href="ai-coach.html" data-page="ai-coach" data-label="AI Spiritual Coach">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 9.5 8.5 3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5L12 2Z"/></svg>
        <span class="nav-sidebar__text">AI Spiritual Coach</span>
      </a>
    </div>

    <div class="nav-sidebar__section">
      <span class="nav-sidebar__label">Discover</span>
      <a class="nav-link" href="adversity-library.html" data-page="adversity" data-label="Adversity Library">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/><path d="M9 7h7M9 11h5"/></svg>
        <span class="nav-sidebar__text">Adversity Library</span>
      </a>
      <a class="nav-link" href="memory-verses.html" data-page="memory" data-label="Memory Verses">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3h11l3 3v15H5V3Z"/><path d="M16 3v3h3"/><path d="M9 12h6M9 16h6"/></svg>
        <span class="nav-sidebar__text">Memory Verses</span>
      </a>
      <a class="nav-link" href="community.html" data-page="community" data-label="Community">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6"/><circle cx="18" cy="9" r="2.5"/><path d="M15.5 14c2.8.3 5 2.2 5 4.5"/></svg>
        <span class="nav-sidebar__text">Community</span>
      </a>
      <a class="nav-link" href="church.html" data-page="church" data-label="Church Directory">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v5M9.5 4.5h5"/><path d="M4 21V10l8-5 8 5v11"/><path d="M10 21v-6h4v6"/></svg>
        <span class="nav-sidebar__text">Church Directory</span>
      </a>
    </div>

    <div class="nav-sidebar__footer">
      <a class="nav-link" href="achievements.html" data-page="achievements" data-label="Achievements">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5"/></svg>
        <span class="nav-sidebar__text">Achievements</span>
      </a>
      <a class="nav-link" href="notifications.html" data-page="notifications" data-label="Notifications">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>
        <span class="nav-sidebar__text">Notifications</span>
      </a>
      <a class="nav-link" href="settings.html" data-page="settings" data-label="Settings">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>
        <span class="nav-sidebar__text">Settings</span>
      </a>

      <div class="theme-switch" role="group" aria-label="Theme">
        <button type="button" data-theme-toggle="light" aria-pressed="false" title="Light theme">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <span class="nav-sidebar__text">Light</span>
        </button>
        <button type="button" data-theme-toggle="dark" aria-pressed="false" title="Dark theme">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>
          <span class="nav-sidebar__text">Dark</span>
        </button>
      </div>

      <button type="button" class="nav-sidebar__toggle-expand" id="sidebarExpandToggle" aria-label="Toggle sidebar width">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
      </button>
    </div>
  </nav>

  <nav class="nav-bottombar" aria-label="Main">
    <a class="nav-link" href="dashboard.html" data-page="dashboard">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>
      Home
    </a>
    <a class="nav-link" href="bible.html" data-page="bible">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      Search
    </a>
    <a class="nav-link" href="prayer.html" data-page="prayer">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.35-9.5-8.5C.7 8.9 2.4 5 6 5c2 0 3.5 1.2 4 2.4C10.5 6.2 12 5 14 5c3.6 0 5.3 3.9 3.5 7.5C19 16.65 12 21 12 21Z"/></svg>
      Prayer
    </a>
    <a class="nav-link" href="notifications.html" data-page="notifications">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>
      Alerts
    </a>
    <a class="nav-link" href="profile.html" data-page="profile">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>
      Profile
    </a>
  </nav>`;

  const root = document.getElementById('nav-root');
  if (root) root.outerHTML = NAV_HTML;
})();
