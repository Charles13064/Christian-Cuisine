# Christian Cuisine — Frontend (Phase 1)

**"Feeding Your Soul Daily"** — vanilla HTML/CSS/JS, no frameworks or libraries.

## What's in this drop

```
christian-cuisine/
├── index.html          Landing page (public)
├── dashboard.html       Logged-in dashboard (app shell)
├── css/
│   ├── tokens.css        Color/type/spacing variables + light & dark themes
│   ├── base.css           Reset, typography, buttons, cards, focus states
│   ├── nav.css            Sidebar (desktop) + bottom bar (mobile) nav
│   ├── landing.css        Landing-page-only styles
│   └── dashboard.css      Dashboard-only styles
└── js/
    ├── theme.js           Light/dark switching, persisted to localStorage
    ├── nav.js              Sidebar expand/collapse + active-link marking
    ├── landing.js          Mobile menu toggle
    └── dashboard.js        Time-aware greeting, sidebar wiring
```

## Navigation

Both nav components from your reference images are implemented and **always in the DOM** on app pages (dashboard.html and onward) — CSS media queries decide which one renders, so there's no JS-driven flash when resizing:

- **`.nav-sidebar`** — vertical rail, shown ≥1024px. Collapsible (icon-only ⇄ labeled), state persists across page loads.
- **`.nav-bottombar`** — floating pill bar, shown <1024px. Five items: Home, Search, Prayer, Alerts, Profile.

The **landing page** intentionally uses its own lightweight marketing header instead of the app nav — that nav is reserved for the logged-in product shell, matching how your reference images looked (an app dashboard, not a marketing site).

## Theming

Toggle via the sun/moon button (header on landing, sidebar footer on dashboard). Implemented with CSS custom properties on `[data-theme="light"|"dark"]` — every color in the product references a variable, so adding a future theme means only touching `tokens.css`.

Brand colors (fixed, per your spec):
- `#EA6113` ember — primary
- `#F88F22` flame — secondary
- `#FBB931` honey — accent
- `#FFE3B3` cream — light-mode background

## Design direction

The "Cuisine" brand is expressed literally but tastefully: the dashboard's daily content (verse, devotion, prayer) is framed as **"Today's Table"** — courses served fresh each day — rather than a generic card grid. Typography pairs Fraunces (warm variable serif) with Work Sans (body) to avoid the generic "cream + high-contrast serif" AI-design look while still honoring your exact palette.

## Not yet built

This is the foundation (design system + nav + 2 pages) out of ~30 pages in the SRS. Next logical batch, in rough priority order:
1. Auth flow — Login, Register, Forgot Password, Verify Email, OTP
2. Bible Reader + Search
3. Devotion + Spiritual Goals (goal plan detail, day-by-day view)
4. Prayer Center + Prayer Journal
5. Admin / Super Admin panels

Backend (Node/Express/PostgreSQL/Sequelize/Socket.IO) comes after enough frontend surface exists to define the real API contract.
