# Plan — Issue #7: Add a Seasonal Now section to the homepage

## Goal
Add a "Seasonal Now" section to `index.html` that highlights 4 fruits
currently in season, styled consistently with the rest of the site.

## Context
- The site (`index.html`, `fruits.html`, `mission.html`, `contact.html`) is
  fully static HTML/CSS/JS — no client-side data fetching or templating
  exists anywhere (`script.js` only handles nav highlighting, hover
  effects, and the footer year).
- `data/fruits.json` (added in issue #8) lists fruits with a `season`
  field (`Winter` / `Spring` / `Summer` / `Fall`) but nothing currently
  reads it — there's no existing fetch/render pattern to extend, and
  adding one would be a much bigger, riskier change than the brief calls
  for.
- Reusable, already-styled components exist: `.fruit-grid` /
  `.fruit-card` (grid of cards with a red left border, hover lift) and
  `.intro-section` (centered highlighted box). `fruits.html` is the best
  style reference — it hardcodes fruit cards with emoji-prefixed `<h3>`
  titles the same way I'll do here.
- Today's date (2026-08-28) falls in Summer. Cross-referencing
  `data/fruits.json`, the Summer-season fruits are: Lime, Mango,
  Pineapple, Blueberry, Cherry, Peach. I'll pick 4 with distinct
  colors/types and matching emoji already used in `fruits.html` for
  visual consistency: Mango 🥭, Pineapple 🍍, Blueberry 🫐, Peach 🍑.

## Approach
- Add a new `<h2>Seasonal Now</h2>` section to `index.html`, placed after
  the existing "What You'll Find Here" content and its `.fruit-grid`,
  before the closing `</main>`.
- Add a short intro paragraph explaining the section (in-season = fresher,
  more flavorful, better value), then a `.fruit-grid` of 4 `.fruit-card`s
  (Mango, Pineapple, Blueberry, Peach), each with an emoji + name `<h3>`
  and a one-line description, matching the tone/format of cards in
  `fruits.html`.
- No CSS changes needed — reuse `.fruit-grid` / `.fruit-card` /
  `.highlight` classes already defined in `styles.css`.
- No JS changes needed — `script.js`'s existing `.fruit-card` hover
  listeners and nav-highlighting already apply automatically to any new
  `.fruit-card` elements.

## Files touched
- `index.html` — add the Seasonal Now section.
- `pipeline/plan.md` — this file.

## Test strategy
- No test suite exists in this repo (static HTML/CSS/JS site, no
  package.json/build). Validate by:
  - Reviewing the resulting HTML structure by eye for well-formedness
    and consistency with existing sections.
  - Confirming class names used (`fruit-grid`, `fruit-card`, `highlight`)
    match the existing CSS selectors in `styles.css` exactly.

## Risks
- Low risk: purely additive static markup, no shared code paths changed.
- Season list is a point-in-time editorial choice (Northern-hemisphere
  Summer as of 2026-08-28) rather than dynamically computed — acceptable
  given the brief asks for 4 specific in-season fruits and the site has
  no dynamic data-rendering pattern to build on.
