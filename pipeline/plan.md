# Plan — Recipe of the week teaser on homepage (#43)

## Goal
Add a "Recipe of the week" teaser section to `index.html` that shows one
recipe's title and its first ingredient line, with a link to `recipes.html`.
The recipes page (`recipes.html`) already exists (added in a prior branch),
so the dependency is satisfied.

## Approach
- Pick one recipe from `recipes.html` to feature — "Berry Banana Smoothie"
  (🥤), since it's the first recipe listed there. Title + first ingredient
  line ("1 ripe banana") are hardcoded to match the source of truth in
  `recipes.html`, consistent with how the rest of this static site embeds
  content directly in HTML (no data-driven templating for recipes).
- Insert a new section on `index.html`, after "Seasonal Now" and before the
  footer, titled "Recipe of the Week" containing:
  - The recipe's emoji + title as a heading.
  - The first ingredient line as a short teaser line.
  - A "View all recipes" link/button (`.button` class, already used
    elsewhere in the codebase) pointing to `recipes.html`.
- Style it as a distinct callout box reusing existing visual language —
  a new `.recipe-of-week` CSS rule modeled on the existing `.mission-box`
  (colored background, rounded corners, centered) so it doesn't just look
  like another plain `.fruit-card`, since the brief calls it out as a
  "teaser section" that should stand apart and drive traffic to the
  recipes page.
- No JS changes needed — this is static markup, consistent with how
  `index.html`'s other sections work (no dynamic behavior beyond the
  existing nav-highlight/copyright script, which already applies site-wide).

## Files to touch
- `index.html` — add the new "Recipe of the Week" section.
- `styles.css` — add `.recipe-of-week` (and related) styles.

## Test strategy
This is a static HTML/CSS/JS site with no build step and no existing test
suite or CI config (verified: no `package.json`, no test files, no
`.yml`/`.yaml` workflow files). Verification will be manual:
- Open `index.html` in a browser (or via the `run` skill) and confirm the
  new section renders, shows the correct title/ingredient, and the link
  navigates to `recipes.html`.
- Visually sanity-check responsiveness at the existing `768px` breakpoint.
- Double check the featured recipe's title/ingredient text matches
  `recipes.html` exactly, so the teaser never contradicts the full page.

## Verification performed
- Plan approved by human operator via `ask_human` before implementation.
- Served the site locally with a small Node static file server and fetched
  `index.html` — confirmed the new `.recipe-of-week` section renders with
  the correct title, ingredient line, and a link to `recipes.html`.
- Fetched `recipes.html` and confirmed it returns 200 (link target exists).
- Fetched `styles.css` and confirmed the new `.recipe-of-week` rules are
  present.
- No headless browser (chromium) was available in this sandbox, so a
  rendered screenshot could not be captured; verification relied on served
  HTML/CSS content plus manual review of markup and existing CSS patterns
  (`.mission-box` was used as the styling template).
- No automated test suite or CI exists in this repo (static site, no
  `package.json`/test files/workflow configs), consistent with the plan.

## Risks
- Low risk, isolated change to one page + stylesheet addition.
- Content drift risk: if `recipes.html`'s recipes change later, the
  hardcoded teaser on the homepage won't auto-update. Acceptable given the
  site has no shared data source for recipes today (unlike fruits, which
  use `data/fruits.json`); noted here for future awareness.
