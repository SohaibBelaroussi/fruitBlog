# Plan — Dark mode toggle (issue #49)

## Goal
Add a small dark/light mode toggle to the header, present on every page of
the static site, that persists the user's choice in `localStorage` and
applies it before first paint (no flash of the wrong theme). Plain CSS +
vanilla JS only, no libraries or build step — this is a static HTML site
(`index.html`, `fruits.html`, `recipes.html`, `glossary.html`,
`mission.html`, `contact.html`, `news.html`, `404.html`) sharing one
`styles.css` and one `script.js`.

## Approach

1. **CSS: introduce theme variables (`styles.css`)**
   - Define the current color values as CSS custom properties on `:root`
     (background, header bg/text, headings, accent/crimson, card bg,
     footer bg/text, tagline, shadow colors).
   - Replace the hardcoded color values throughout the stylesheet with
     `var(--...)` references (no visual change for the default/light
     theme).
   - Add a `[data-theme="dark"]` override block with a warm, readable dark
     palette: warm near-black/charcoal background, warm off-white body
     text, a darker warm green for the header, a slightly brightened
     crimson accent for contrast, warm dark card backgrounds. Avoid pure
     black/white and avoid cold blue-grays to keep it "warm".
   - Add a short `transition` on `body`/`header`/`footer`/`.fruit-card`
     background-color/color so the switch isn't jarring.
   - Add styles for the new `.theme-toggle` button (small, circular-ish,
     icon-based, sits in the header) and a `.nav-right` wrapper (see
     below) plus a small responsive tweak in the existing mobile media
     query so it doesn't overflow on narrow screens.

2. **HTML: toggle button in the header, on every page**
   - Each page's `<nav>` currently has two flex children (either
     `.brand`/`.logo` and `<ul>`), spread with `justify-content:
     space-between`. To add a third element without disturbing that
     layout, wrap the existing `<ul>` and the new
     `<button id="theme-toggle" class="theme-toggle">` in a new
     `<div class="nav-right">` — so `nav` still has exactly two flex
     children (brand/logo vs. the nav-right group).
   - Button starts with `aria-label`, `aria-pressed="false"`, `type="button"`,
     and an icon (🌙/☀️) that JS updates; no inline styles.
   - Applied identically to all 8 HTML files (two nav variants: with
     `.brand` wrapper and with a bare `.logo`).

3. **No-flash theme application (inline script in `<head>`)**
   - Add a tiny inline `<script>` near the top of `<head>` (after the
     viewport meta, before the stylesheet link) on every page. It reads
     `localStorage.getItem('theme')`, falls back to
     `prefers-color-scheme: dark` if nothing stored, and sets
     `document.documentElement.setAttribute('data-theme', theme)`
     synchronously — this runs during head parsing, before the body/CSS
     paint, so there's no flash of the wrong theme.
   - Kept inline (not in `script.js`) because `script.js` is loaded at the
     end of `<body>` and would paint the wrong theme first.

4. **Toggle behavior (`script.js`)**
   - On `DOMContentLoaded`, sync the button's icon/`aria-pressed` with the
     theme already applied by the inline script.
   - On click: flip `data-theme` on `<html>` between `light`/`dark`, save
     the choice to `localStorage.setItem('theme', ...)`, update the
     button icon/`aria-pressed`.
   - A few lines, no new dependencies, consistent with the existing
     vanilla-JS style already in the file.

## Files touched
- `styles.css` — theme variables, dark palette override, `.theme-toggle`
  and `.nav-right` styles, minor responsive rule.
- `script.js` — toggle click handler + initial button sync.
- `index.html`, `fruits.html`, `recipes.html`, `glossary.html`,
  `mission.html`, `contact.html`, `news.html`, `404.html` — inline
  no-flash script in `<head>`, `.nav-right` wrapper + toggle button in
  `<nav>`.

## Test strategy
- No JS test runner in this repo (static site). Verify by:
  - `grep`/manual review that all 8 pages have the inline script and the
    toggle button.
  - Open `index.html` (and one bare-`.logo` page, e.g. `glossary.html`)
    in a browser via a local static server, toggle dark mode, reload to
    confirm persistence and no flash, and check contrast/readability of
    the dark palette.
  - Check `styles.css` for syntax validity (balanced braces) and confirm
    no leftover hardcoded colors that should have become variables.

## Risks
- Missing the toggle on one of the 8 pages — mitigated by applying the
  same edit pattern to every file and grepping for `theme-toggle` count
  == 8 at the end.
- Layout shift on mobile from the extra button — mitigated with a small
  flex-wrap rule in the existing mobile media query.
- Flash of wrong theme if the inline script is placed after something
  render-blocking runs first — mitigated by putting it early in `<head>`,
  before the stylesheet `<link>`.

## Revision 2 — addressing review rejection

The first attempt was rejected: `styles.css` used the dark-mode accent
`#ff6f59` as a *background* with hardcoded `color: white` (or the light
header-text variable) on top, in three places — `nav a:hover`/`nav
a.active` (styles.css:100), `.button` and `.button:hover`
(styles.css:237-250). Brightening the dark accent for legibility as
plain text had, as a side effect, dropped its contrast as a *background*
against light text to ~2.0-2.7:1, well under WCAG AA, contradicting the
brief's "warm and readable" requirement.

Fix: introduced a themed `--color-on-accent` custom property instead of
picking a less-vivid accent (which would have diluted the warm palette
everywhere `--color-accent` is used as text, e.g. `h3`, `.highlight`).
- `:root`: `--color-on-accent: white` — unchanged behavior in light mode
  (`#DC143C` bg / white text ≈ 4.99:1, same as before).
- `[data-theme="dark"]`: `--color-on-accent: var(--color-bg)` — reuses
  the warm near-black `#241a16` already defined for the dark background,
  so no new hardcoded hex value. Against `#ff6f59` this is ≈ 6.2:1;
  against `.button:hover`'s `var(--color-heading)` (`#e8a96a`) it's
  ≈ 8.35:1 — both comfortably pass WCAG AA (and are close to/over AAA)
  for normal-size text.
- Applied `color: var(--color-on-accent)` to `nav a:hover`/`nav
  a.active` and replaced `.button`'s hardcoded `color: white` with the
  same variable; `.button:hover` inherits it (only its background
  changes).
- Left `--color-accent` itself untouched (`h3`, `.highlight`, focus
  border, card left-border all use it as text/border color on the dark
  page/card background, which was already high-contrast and not part of
  the finding) — scoped the fix to exactly the flagged
  accent-as-background cases.
- Verified `styles.css` braces stay balanced (46/46) and no other
  `color: white`/hardcoded light-mode-only text color remains next to a
  `background-color: var(--color-accent)` rule.
