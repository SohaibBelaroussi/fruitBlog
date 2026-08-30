# Plan — Issue #40: Add a recipes page

## Goal
Add `recipes.html` with three simple fruit recipes (smoothie, fruit salad,
baked dish), each with a title, short ingredient list, and 3-5 numbered
steps. Link the new page from the nav on every existing page, styled
consistently with the rest of the site.

## Approach
- Model `recipes.html` on the existing static pages (`fruits.html`,
  `glossary.html`, `mission.html`): same `<head>` boilerplate, same
  header/nav markup, `<main>` content, footer with the copyright script,
  and `script.js` include.
- Reuse existing CSS classes (`intro-section`, `fruit-grid`, `fruit-card`,
  `highlight`) so the page doesn't need much new styling. Add a small
  amount of new CSS scoped to recipe cards for the ingredient list and
  numbered steps (an `<ol>` needs list styling since none currently
  exists in `styles.css`).
- Three recipes, each as a `fruit-card`-style block containing:
  - `<h3>` title (with an emoji, matching the site's voice)
  - a short "Ingredients" `<ul>`
  - a numbered "Steps" `<ol>` with 3-5 steps
  1. Berry Banana Smoothie
  2. Simple Mixed Fruit Salad
  3. Baked Cinnamon Apples
- Add `<li><a href="recipes.html">Recipes</a></li>` to the nav `<ul>` on
  every existing HTML page (`index.html`, `fruits.html`, `glossary.html`,
  `mission.html`, `contact.html`, `news.html`, `404.html`), placed after
  "Fruits" as a natural fit alongside food content. Each page's nav
  already has some inconsistency (some pages have the `brand`/`tagline`
  wrapper and a "News" link, others don't — e.g. `glossary.html`,
  `news.html`, `404.html` predate those additions). I will not fix that
  pre-existing inconsistency (out of scope for this issue) — I'll only
  add the Recipes link into each page's nav `<ul>` as it already exists,
  so the diff stays minimal and focused on the brief.
- Give `recipes.html`'s own nav link `class="active"`, matching the
  pattern used on other pages (the active class is also set at runtime
  by `script.js` based on `location.pathname`, so this is just belt and
  suspenders / non-JS fallback).
- Add a meta description consistent with pages that have one
  (`fruits.html`, `mission.html`, `contact.html`, `index.html`).
- Update `sitemap.xml` to include the new page, consistent with how
  other top-level pages are listed there (note the sitemap is already
  missing `glossary.html` and `news.html`; I will only add `recipes.html`
  and not fix the pre-existing gaps, to keep the change scoped).

## Files to touch
- `recipes.html` (new)
- `index.html`, `fruits.html`, `glossary.html`, `mission.html`,
  `contact.html`, `news.html`, `404.html` (nav link addition)
- `styles.css` (small addition: styles for ingredient/step lists inside
  recipe cards)
- `sitemap.xml` (add recipes.html entry)

## Test strategy
This is a static HTML/CSS/JS site with no test suite or build step
(confirmed via `README.md` / repo listing — no `package.json`). Validation:
- Manually review each modified page's nav markup for well-formed HTML
  and correct relative links.
- Grep across all `*.html` files to confirm every page now contains a
  link to `recipes.html` and that `recipes.html` links back correctly.
- Use `python3 -m http.server` (or similar) to spot check the page
  renders and nav highlighting works via `script.js`.

## Risks
- Nav markup already differs slightly between pages; inserting the new
  link in the wrong spot on one page could look inconsistent. Mitigated
  by inserting right after the "Fruits" link everywhere.
- Low risk overall — purely additive content change with no logic.
