# Plan — Issue #20: Add a fruit glossary page

## Goal
Add `glossary.html` defining 15 fruit-related terms, styled consistently with
the rest of the site, and link it from the nav on every page.

## Approach
- Reuse existing layout conventions from `index.html` / `fruits.html` /
  `mission.html` / `contact.html`: same `<head>`, header/nav markup, footer,
  and `script.js` include.
- Content structure: `<h1>`, an `.intro-section` paragraph explaining the
  glossary's purpose, then an `<h2>` followed by a `.fruit-grid` of
  `.fruit-card` elements — one card per term (`<h3>Term</h3><p>Definition</p>`).
  This reuses existing CSS classes (`.fruit-grid`, `.fruit-card`,
  `.intro-section`) so no new styles are needed, keeping the page visually
  consistent with `fruits.html`.
- 15 terms chosen to tie back into vocabulary already used elsewhere on the
  site (Vitamin C, bromelain, antioxidants, superfruit, peak season, stone
  fruit, citrus, tropical fruit, resveratrol, etc.), listed alphabetically:
  Antioxidant, Bromelain, Citrus Fruit, Fiber, Flavonoid, Peak Season,
  Phytonutrient, Pome, Resveratrol, Ripening, Rind, Stone Fruit, Superfruit,
  Tropical Fruit, Vitamin C.
- Add a "Glossary" nav link (`glossary.html`) to the `<nav><ul>` in
  `index.html`, `fruits.html`, `mission.html`, and `contact.html`, placed
  between "Fruits" and "Our Mission". `glossary.html`'s own nav marks
  "Glossary" as `class="active"`, matching the pattern used on every other
  page (`script.js` also re-derives the active link from the current
  pathname, so this stays correct even if pages are renamed/moved).
- Footer/copyright markup and `script.js` include copied verbatim from the
  other pages for consistency (copyright year is filled in by `script.js`).

## Files to touch
- `glossary.html` (new)
- `index.html` (nav link)
- `fruits.html` (nav link)
- `mission.html` (nav link)
- `contact.html` (nav link)

## Test strategy
- No test suite/build exists in this static-site repo (verified: no
  package.json/test scripts). Verify by:
  - Checking every page's nav contains identical link sets in identical
    order, with exactly one `class="active"` matching the current page.
  - Opening `glossary.html` structure by eye against `fruits.html` to confirm
    consistent markup/classes.
  - Grep-checking all internal hrefs resolve to existing files.

## Risks
- Low risk: purely additive static HTML changes, no shared JS/CSS behavior
  changes required since `.fruit-grid`/`.fruit-card` are already generic.
