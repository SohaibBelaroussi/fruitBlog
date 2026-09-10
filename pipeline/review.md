# Review — Dark mode toggle (issue #49)

## Verdict: reject

Implementation is complete and closely follows plan.md (CSS variables, warm dark
palette, `.theme-toggle` + `.nav-right` on all 8 pages, no-flash inline script
before the stylesheet link, localStorage persistence, plain JS in script.js —
no libraries). However, the dark-mode accent color creates WCAG-failing
contrast on several interactive elements that use white/near-white text on top
of it, which contradicts the brief's explicit "warm and readable" requirement.
Must-fix item below before merge.

## Findings (most severe first)

### 1. [Must fix] Dark-mode accent color fails contrast on interactive elements with white/near-white text
- `styles.css:8` (`--color-accent: #DC143C` light) vs `styles.css:23`
  (`--color-accent: #ff6f59` dark) — the dark accent was brightened, but it is
  also used as a *background* with light text on top in several places, and
  brightening it away from the light-mode value actually **reduced** contrast
  there:
  - `styles.css:100` `nav a:hover, nav a.active { background-color:
    var(--color-accent); }` combined with `nav a { color: var(--color-header-text); }`
    (`styles.css:91`) — in dark mode this is `#ff6f59` bg / `#f6ede1` text ≈
    **2.36:1** contrast (light mode was `#DC143C`/`white` ≈ 4.99:1). This is
    the *current page* nav link (`class="active"`, persistently visible on
    every page, not just a hover state), so this is a standing readability
    regression, not a transient one.
  - `styles.css:237-246` `.button { background-color: var(--color-accent);
    color: white; }` — dark mode ≈ **2.74:1**. Used e.g. on `404.html:44`
    ("🏠 Back to Home"), a primary CTA.
  - `styles.css:248-250` `.button:hover { background-color:
    var(--color-heading); }` (`#e8a96a` in dark) with the same hardcoded
    `color: white` ≈ **2.04:1**.
  - All three fall well below WCAG AA (needs ≥3:1 for large/bold text, ≥4.5:1
    for normal text) and are a clear regression from the light theme's
    passing ~5:1. The brief explicitly asks the dark palette to be
    "warm and readable" — these elements are the opposite for the theme's
    signature accent color.
  - Suggested direction (not prescriptive): either give `.button`/`nav
    a:hover,.active` a themed, darker text color in dark mode (e.g. reuse
    `--color-bg` or a dedicated `--color-on-accent` variable) instead of
    hardcoded `white`, or pick a less-bright dark-mode accent that still
    meets ≥4.5:1 against `--color-header-text`/white.

## Minor / optional (not blocking)

### 2. Toggle icon lags behind the (correctly flash-free) color theme on load
`script.js` (theme-toggle click handler / initial `syncToggle` call) only runs
on `DOMContentLoaded`, and `script.js` is loaded at the very end of `<body>`
(see e.g. `index.html:116`). The inline head script correctly prevents a
*color* flash, but on a slow load the toggle button will briefly show the
default 🌙 even when dark mode is already active, until `script.js` executes.
Very low impact, but could be avoided by also setting the initial icon
server-side... not worth blocking on given "a few lines of JS" scope.

### 3. No error handling around `localStorage` access
The inline no-flash script and the click handler (e.g. `index.html:8-14`,
`script.js` toggle handler) call `localStorage.getItem`/`setItem` directly. In
environments where storage access throws (privacy modes, sandboxed iframes),
the inline script would throw and the rest of that `<script>` block would
abort — theme would silently fall back to default light CSS rather than
crashing the page. Low risk, optional hardening, not required by the brief.

### 4. Focus-ring color not re-themed
`styles.css:195` `.search-input:focus { box-shadow: 0 0 0 3px rgba(220, 20,
60, 0.15); }` is hardcoded to the light-mode crimson rather than
`var(--color-accent)`, so in dark mode the focus ring tint doesn't match the
brighter `#ff6f59` accent used elsewhere. Purely cosmetic, very low severity.

## What looks good
- All 8 pages (`index.html`, `fruits.html`, `recipes.html`, `glossary.html`,
  `mission.html`, `contact.html`, `news.html`, `404.html`) have identical
  `.theme-toggle`/`.nav-right` markup and the inline no-flash script placed
  before the stylesheet `<link>`, matching plan.md exactly. Verified
  `grep -l theme-toggle *.html` and the localStorage read both count 8/8.
- `nav` still has exactly two flex children per page (brand/logo vs.
  `.nav-right`), so `justify-content: space-between` layout is preserved.
- CSS variable refactor is thorough — no leftover hardcoded theme colors
  found outside the `:root`/`[data-theme="dark"]` blocks and the two
  isolated cases above; `styles.css` braces are balanced (46/46).
- Light-mode palette is visually unchanged (only variable substitution, same
  hex values).
- Dark palette is genuinely warm (no cold blue-grays, no pure black/white)
  and base text/background/header/footer contrast ratios are strong
  (11.7–14.8:1).
- No-flash approach (synchronous inline script, before CSS load, falling
  back to `prefers-color-scheme`) is correct and matches the plan's rationale
  for why it can't live in the deferred `script.js`.
- Toggle button has proper `aria-label`, `aria-pressed`, `type="button"`, and
  JS keeps them in sync with the applied theme.
- No new dependencies; vanilla JS/CSS only, consistent with the existing code
  style in the file.
