# Plan — Add live search to the fruits page (issue #33)

## Goal
Let visitors filter the fruit cards on `fruits.html` in real time by typing
in a search box — no page reload, matches update as you type.

## Context
- The site is a plain static HTML/CSS/JS site (no build step, no framework,
  no test runner, no `package.json`).
- `fruits.html` currently renders four hardcoded category sections (Citrus,
  Tropical, Berries, Stone Fruits), each an `<h2>` + intro `<p>` + a
  `.fruit-grid` of `.fruit-card` elements (`<h3>` name + `<p>` description).
- `data/fruits.json` exists but isn't wired into any page yet (confirmed via
  grep — nothing references it). Rewiring `fruits.html` to render from JSON
  is a bigger change than "add live search" calls for and would touch
  content/markup unrelated to the issue, so this plan keeps the existing
  hardcoded cards and filters the live DOM instead. (Left a note in case a
  future issue wants to move fruits.html to data-driven rendering.)
- `script.js` already has a DOMContentLoaded handler with small per-page
  behaviors (nav active-link, card hover, etc.) — the new search logic goes
  in there, guarded so it only runs on pages that have the search input.

## Approach
1. **Markup (`fruits.html`)**
   - Add a search landmark right after `.intro-section`: a text `<input
     type="search" id="fruit-search">` with a visible `<label>`, plus an
     `aria-live="polite"` results-count element for a11y feedback.
   - Wrap each existing category (`<h2>` + `<p>` + `.fruit-grid`) in a
     `<section class="fruit-category">` so a whole category can be hidden
     when none of its cards match.
   - Add a `<p id="no-results-message" hidden>` shown only when a query
     matches nothing.
2. **Behavior (`script.js`)**
   - On `input` on `#fruit-search`: lowercase/trim the query, then for every
     `.fruit-card` check whether the card's `<h3>` (name) or `<p>`
     (description) text includes the query; toggle the card's `hidden`
     attribute accordingly.
   - Hide a `.fruit-category` section entirely (including its heading/intro
     text) when it has zero visible cards, so search doesn't leave orphaned
     headings.
   - Track total visible-card count to toggle `#no-results-message` and
     update the `aria-live` results-count text (e.g. "3 fruits found"),
     clearing it when the query is empty.
   - No fetch/AJAX needed — everything filters already-rendered DOM, so
     results are instant with no debounce required for this data size.
3. **Styling (`styles.css`)**
   - Style the new search input/label/results-count and the no-results
     message to match the existing card/section look (same color palette,
     radius, spacing conventions already used by `.fruit-card` /
     `.intro-section`).

## Files touched
- `fruits.html` — search markup + category wrapper sections
- `script.js` — live filter logic
- `styles.css` — search box / no-results styling

## Test strategy
No test runner exists in this repo (static HTML/CSS/JS, no `package.json`).
Verification plan:
- `node --check script.js` (or equivalent) to catch JS syntax errors.
- Manually trace the filter logic against the known fruit names/descriptions
  in `fruits.html` for a few queries (e.g. "citrus" text isn't in any card
  so it should show zero results except via description text; "mango" matches
  one card; empty query shows everything).
- Serve the site locally (`python3 -m http.server`) and spot-check in a
  headless fetch/curl or note manual browser steps, since no headless
  browser test tool is set up in this repo.

## Risks
- Hiding whole categories via `hidden` attribute relies on no existing CSS
  rule overriding `display` on `.fruit-category`/`.fruit-card` — confirmed
  `styles.css` doesn't set `display` on either, so the UA default
  `[hidden] { display: none }` applies cleanly.
- Keep the change scoped to `fruits.html`; don't touch other pages that
  reuse `.fruit-card`/`.fruit-grid` (glossary.html, news.html, index.html).
