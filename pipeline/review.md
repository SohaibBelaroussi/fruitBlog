# Review — Dark mode toggle (issue #49), attempt 2

## Verdict: done

This is a re-review after the prior rejection ("Fix dark-mode contrast on
accent backgrounds", commit `bfb53cd`). The fix directly and correctly
addresses the sole must-fix item from the previous review, and I independently
recomputed the WCAG contrast ratios rather than trusting the commit message's
numbers — they check out.

## Verification of the fix

- `styles.css` now defines `--color-on-accent: white` in `:root` and
  `--color-on-accent: var(--color-bg)` in `[data-theme="dark"]`, and both
  flagged spots (`nav a:hover`/`nav a.active` at ~line 100-103, `.button` at
  ~line 237-243) use `color: var(--color-on-accent)` instead of a hardcoded
  `white`. `.button:hover` (line ~250) inherits it since only
  `background-color` changes there.
- Recomputed contrast (WCAG relative-luminance formula) independently of the
  commit message's claims:
  - Dark mode `nav a.active`/`:hover`: `#ff6f59` bg vs `#241a16` text ≈
    **6.21:1** (was ~2.36:1) — passes AA and AAA for normal text.
  - Dark mode `.button:hover`: `#e8a96a` bg vs `#241a16` text ≈ **8.35:1**
    (was ~2.04:1) — passes AA/AAA.
  - Light mode `.button`/`nav a.active`: `#DC143C` bg vs `white` text ≈
    **4.99:1** — unchanged from before the fix, confirms no light-mode
    regression.
- `grep -n "color: white" styles.css` now returns nothing — the two hardcoded
  instances the previous review flagged are gone, and no new hardcoded
  light-only text color was introduced elsewhere.
- Scope of the fix is minimal and correct: `--color-accent` itself (used as
  text/border color for `h3`, `.highlight`, focus border, card left-border)
  was deliberately left untouched, since those weren't part of the finding
  and were already high-contrast.

## Completeness against brief / plan.md

- Toggle in the header on every page: `grep -l theme-toggle *.html` and
  `grep -l localStorage *.html` both return 8/8
  (`index/fruits/recipes/glossary/mission/contact/news/404.html`), including
  both nav variants (`.brand` wrapper and bare `.logo`, e.g. `404.html`,
  `glossary.html`) — verified via diff, identical pattern in each.
- `nav` still has exactly two flex children per page (brand/logo vs. the new
  `.nav-right` wrapping `<ul>` + toggle button), so the existing
  `justify-content: space-between` layout is preserved — no visual regression
  to the nav structure.
- Persistence: `script.js`'s click handler calls
  `localStorage.setItem('theme', nextTheme)`; each page's inline head script
  reads `localStorage.getItem('theme')` first, falling back to
  `prefers-color-scheme: dark`, then `document.documentElement`.
- No-flash: the inline script is a synchronous IIFE placed before the
  `styles.css` `<link>` in every page's `<head>`, setting `data-theme` before
  first paint — correct approach, verified present and correctly positioned
  in `index.html` and `404.html` (checked directly; pattern identical across
  all 8 via diff stats).
- Plain CSS + vanilla JS only: no new dependencies; `script.js` adds one
  self-contained block (~19 lines) that mirrors the existing style in the
  file (`DOMContentLoaded`, `getElementById`, plain event listeners).
- Warm, readable dark palette: near-black warm `#241a16` bg, warm off-white
  `#f1e4da`/`#f6ede1` text, warm dark green header `#1d3320`, warm coral
  accent `#ff6f59`, warm brown-orange heading `#e8a96a` — no cold
  blue-grays, no pure black/white. Base text/bg/header/footer contrast is
  strong (double digits), and the two previously-failing accent-background
  cases now pass AA as shown above.
- Toggle button: `type="button"`, `aria-label`, `aria-pressed`, icon
  (🌙/☀️) kept in sync by `script.js`'s `syncToggle`, called once on load and
  again on every click.

## Minor / optional (not blocking, carried over from prior review, still true)

These were correctly judged non-blocking last time and remain so — the brief
asks for "a few lines of JS," and none of these affect correctness or the
"warm and readable" requirement:

- Toggle icon can lag one frame behind the (flash-free) color theme on slow
  loads, since `script.js` runs at `DOMContentLoaded` while the color is set
  synchronously in `<head>`. Cosmetic only.
- No try/catch around `localStorage` calls; would silently fall back to
  default light theme in environments where storage throws (private/sandboxed
  contexts) rather than crash. Optional hardening.
- `.search-input:focus` box-shadow (`styles.css` ~line 209) still hardcodes
  `rgba(220, 20, 60, 0.15)` (the light-mode crimson) rather than deriving
  from `var(--color-accent)`, so the focus-ring tint doesn't shift with the
  brighter dark-mode accent. Purely cosmetic, not a contrast/readability
  issue since it's a low-opacity outer glow, not text-on-background.

## What looks good (unchanged from before, reconfirmed)

- CSS variable refactor is thorough and consistent; light-mode palette is
  pixel-identical to before the change.
- Dark palette is genuinely warm and the base contrast is strong.
- All 8 pages updated uniformly; no unintended changes outside the dark-mode
  feature scope (diff is limited to the 8 HTML files, `styles.css`,
  `script.js`, and pipeline artifacts).

No further changes required before merge.
