# Plan — Collapse nav into hamburger menu on small screens (issue #50)

## Goal
On viewports narrower than ~640px, replace the always-visible nav link list
with a hamburger button that toggles the links open/closed. Behavior must be
identical across every page, accessible (real `<button>`, `aria-expanded`,
`aria-controls`), and implemented with no libraries (vanilla CSS/JS, matching
the rest of this static site).

## Current state
- 8 pages share the same `<header><nav>...</nav></header>` structure:
  `index.html`, `fruits.html`, `recipes.html`, `mission.html`, `contact.html`
  use a `.brand` wrapper (`.logo` + `.tagline`); `glossary.html`, `news.html`,
  `404.html` use a bare `.logo` div (pre-existing inconsistency, out of scope
  for this issue). All 8 have `<nav><brand-or-logo><ul>...links...</ul></nav>`.
- `styles.css` already has a `@media (max-width: 768px)` block that stacks
  nav into a column but still shows all links — no collapsing behavior today.
- `script.js` has a single `DOMContentLoaded` handler that currently sets the
  active nav link, copyright year, card hover, search filter, etc. Nav
  toggle logic will live here as one more self-contained block, guarded so
  it no-ops on pages/structures without the new elements (defensive, though
  all pages will have them).

## Approach
1. **Markup** (all 8 HTML files): add a `<button class="nav-toggle" ...>`
   right before the `<ul>` inside `<nav>`, and give the `<ul>` `id="primary-nav"`.
   - `type="button"` (no accidental form submit)
   - `aria-expanded="false"` initially
   - `aria-controls="primary-nav"`
   - `aria-label="Toggle navigation menu"`
   - Three `<span class="nav-toggle-bar">` inside for the hamburger icon
     (pure CSS bars, no image/icon library).
2. **CSS** (`styles.css`):
   - `.nav-toggle` hidden by default (desktop/tablet), `display:none`.
   - New `@media (max-width: 640px)` block (after the existing 768px block
     so it wins on overlapping properties):
     - `nav` back to a row (brand + toggle button side by side).
     - `.nav-toggle` becomes visible (`display:flex`).
     - `nav ul` hidden by default (`display:none`), full-width column layout.
     - `nav ul.nav-open` shown (`display:flex`, column).
     - Bars get a simple open/close visual via
       `.nav-toggle[aria-expanded="true"] .nav-toggle-bar` transforms (pure
       CSS, driven off the same `aria-expanded` attribute JS already sets —
       no extra class needed for the icon state).
3. **JS** (`script.js`): inside the existing `DOMContentLoaded` handler, add
   a block that:
   - Selects `.nav-toggle` and `nav ul`.
   - On click: toggles a `nav-open` class on the `<ul>` and flips
     `aria-expanded` on the button to match.
   - Closes the menu (removes class, resets `aria-expanded`) when a nav link
     is clicked, when `Escape` is pressed, or when a click happens outside
     the nav — standard disclosure-menu behavior, cheap to add.
   - Guarded with `if (navToggle && navMenu)` so it's a no-op if markup is
     ever missing.
4. Apply the same markup change to all 8 pages identically (button + `ul`
   id), so behavior is consistent site-wide as required by the brief.

## Files touched
- `index.html`, `fruits.html`, `recipes.html`, `glossary.html`,
  `mission.html`, `contact.html`, `news.html`, `404.html`
- `styles.css`
- `script.js`

## Test strategy
No test framework exists in this repo (static HTML/CSS/JS, no build step,
no package.json). Verification will be:
- Grep/diff across all 8 pages to confirm the toggle button + `ul` id markup
  is byte-identical in structure.
- Serve the site locally (`python3 -m http.server`) and manually check with
  a headless-browser-less approach: curl the rendered HTML to confirm
  attributes are present; visually reason through the CSS cascade (768px
  vs 640px breakpoints) to confirm no conflicting rules.
- If a browser tool is available in this environment, do a quick resize
  check on `index.html` and one other page to confirm the toggle
  opens/closes and `aria-expanded` flips.

## Implementation notes / testing performed
- Plan approved by human via `ask_human` before implementation began.
- Implemented as three commits: nav-toggle CSS (`styles.css`), toggle
  behavior JS (`script.js`), and the `<button class="nav-toggle">` +
  `id="primary-nav"` markup applied identically across all 8 HTML pages.
- No test framework exists in this repo, so verification was manual:
  - `node -c script.js` — syntax check passes.
  - Grepped all 8 pages to confirm the toggle button and `id="primary-nav"`
    are present with identical attributes/structure.
  - Counted `<button>`/`</button>` and `<ul>`/`</ul>` per file to confirm
    tags stay balanced (recipes.html's extra `<ul>` pairs are pre-existing
    ingredient lists, unrelated to the nav).
  - Read through the final `styles.css` to confirm the new
    `@media (max-width: 640px)` block is ordered after the existing
    `@media (max-width: 768px)` block, so at widths ≤640px the newer rules
    win on `nav`/`nav ul` (row layout + toggle visible + collapsible list).
  - No headless browser / `jsdom` / `playwright` was available in this
    sandbox (no network access to install them), so an actual rendered
    click-through could not be executed here; the CSS/JS were reasoned
    through directly instead. Recommend a quick manual resize check in a
    real browser during review.

## Risks
- Breakpoint interaction between the existing 768px block and the new 640px
  block — mitigated by ordering the 640px block after it so its rules win.
- Markup drift between pages (brand vs bare-logo variants) — mitigated by
  inserting the button in the same relative position (immediately before
  `<ul>`) in both variants, so CSS/JS selectors (`nav .nav-toggle`, `nav ul`)
  work regardless of which variant a page uses.
- Not fixing the pre-existing `.brand`/bare-`.logo` inconsistency — explicitly
  out of scope for this issue; noted so it isn't mistaken for an oversight.
