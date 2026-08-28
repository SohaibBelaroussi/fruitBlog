# Plan: Rename site title to "The Fruit Blog" (issue #14)

## Goal
Update the visible site title everywhere it appears: the header/brand logo on
every page, and each page's `<title>` tag. New text: "The Fruit Blog".

## Findings
The site is a static 4-page HTML site (no build step, no templating):
- `index.html`
- `fruits.html`
- `mission.html`
- `contact.html`

Each page has:
- `<title>Fruit Blog - <Page></title>` in `<head>`
- `<div class="logo">🍎 Fruit Blog</div>` in the shared `<header><nav>` markup

No other files (`script.js`, `styles.css`, `data/*`) reference "Fruit Blog".

## Approach
For each of the 4 HTML files:
1. Change `<title>Fruit Blog - X</title>` to `<title>The Fruit Blog - X</title>`.
2. Change `<div class="logo">🍎 Fruit Blog</div>` to
   `<div class="logo">🍎 The Fruit Blog</div>`.

No structural/CSS changes needed since it's the same text length category
(existing layout already handles the brand text).

## Files to touch
- index.html
- fruits.html
- mission.html
- contact.html

## Test strategy
No automated test suite exists for this static site. Verify by:
- `grep -rn "Fruit Blog" *.html` to confirm every occurrence is now
  "The Fruit Blog" and there are no stray "Fruit Blog" without "The".
- Visually confirm each page's header/brand and title tag via a quick diff.

## Risks
- Missing an occurrence in one of the 4 pages (mitigated by grepping all
  matches before and after).
- Unrelated changes to unrelated text (e.g. "World of Fruits" headings) —
  out of scope, left untouched.
- Each page's `<footer>` also has a "© 2024 Fruit Blog. Spreading the
  love..." copyright line. The brief scopes the change to the
  header/brand and `<title>` tags only, so this footer text was
  intentionally left as "Fruit Blog" (not "The Fruit Blog").
