/**
 * dashboard.js
 * PURPOSE: Page-local behavior for the dashboard — connects the
 * sidebar's expand-toggle button (markup lives in dashboard.html,
 * shared logic lives in nav.js) and sets a time-aware greeting.
 * In production, "Charles" and the stats below would be populated
 * from GET /api/v1/users/me and GET /api/v1/users/me/stats.
 */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // Wire the sidebar expand/collapse button (behavior itself
    // lives in nav.js's initSidebarToggle; this just ensures the
    // button id used here matches the class nav.js queries for).
    const expandBtn = document.getElementById('sidebarExpandToggle');
    if (expandBtn) {
      expandBtn.setAttribute('aria-label', 'Toggle sidebar width');
    }

    // Time-aware greeting (front-end placeholder for real user data).
    const greetingEl = document.getElementById('greeting');
    const dateEl = document.getElementById('dateLabel');
    if (greetingEl) {
      const hour = new Date().getHours();
      const part = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening';
      
      // Font Awesome Icons mapped to times of day
      const icon = hour < 12 
        ? '<i class="fa fa-sun-o" aria-hidden="true"></i>' 
        : hour < 18 
          ? '<i class="fa fa-cloud" aria-hidden="true"></i>' 
          : '<i class="fa fa-moon-o" aria-hidden="true"></i>';
          
      const name = greetingEl.textContent.match(/,\s*(\w+)/);
      const userName = name ? name[1] : 'Friend';
      
      // Changed to .innerHTML so HTML elements render correctly
      greetingEl.innerHTML = `Good ${part}, ${userName} ${icon}`;
    }
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric',
      });
    }
  });
})();
