# Plan: Add tagline under site title (issue #15)

## Goal
Add the tagline "fresh takes, daily" directly under/next to the site title
("The Fruit Blog") in the header, on every page, styled subtly so it doesn't
compete visually with the title or nav.

## Context
- Static multi-page site: index.html, fruits.html, mission.html, contact.html.
- Each page has an identical header structure:
  `<header><nav><div class="logo">🍎 The Fruit Blog</div><ul>...</ul></nav></header>`
- Site title was just renamed to "The Fruit Blog" (issue #14, commit 02c3e68).
- Styling lives in styles.css: `.logo` is `font-size: 1.5rem; font-weight: bold;`
  inside a flex `nav` with `justify-content: space-between`.

## Approach
1. Wrap the existing `.logo` div and a new tagline element in a `.brand`
   container so they stack vertically under each other in the header, on
   all four HTML pages (index, fruits, mission, contact):
   ```html
   <div class="brand">
       <div class="logo">🍎 The Fruit Blog</div>
       <p class="tagline">fresh takes, daily</p>
   </div>
   ```
2. Update styles.css:
   - `.brand`: `display: flex; flex-direction: column;` (replaces bare `.logo`
     as the flex child of `nav`).
   - `.tagline`: small font size (e.g. `0.75rem`), reduced opacity / lighter
     shade of the header's white text, no bold, slight margin so it reads as
     a subtle subtitle rather than a second heading.
3. Keep markup and copy identical across all four pages (same pattern as the
   prior title-rename change), so the header stays visually consistent
   site-wide.

## Files to touch
- index.html
- fruits.html
- mission.html
- contact.html
- styles.css

## Test strategy
- No JS/build tooling in this repo (plain static HTML/CSS, script.js only
  handles unrelated behavior). Verify by:
  - Grepping all four pages to confirm the tagline markup was added
    consistently.
  - Visual sanity check by reasoning about the CSS (flex column under logo,
    small subtle text, consistent header height).
  - Confirm no existing test suite is broken (repo has no test suite/build
    scripts currently).

## Risks
- Inconsistent markup across the four pages if not applied uniformly —
  mitigated by editing all four identically.
- Tagline visually overpowering the title — mitigated by small font size and
  reduced opacity, consistent with the "styled subtly" requirement.
