# Plan

## Goal
Change the site's page background color to #FFB6C1 (light pink), per issue #1.

## Approach
This is a static HTML/CSS site (index.html, fruits.html, mission.html, styles.css,
script.js) with no build step. The page background is controlled by a single rule:
`body { background-color: white; }` in styles.css (line 11), shared across all pages.
Update that single declaration to `#FFB6C1`. No other rule represents "the page
background" — header, footer, mission-box, etc. are distinct components and are
out of scope for this issue.

## Files to touch
- styles.css — change `body { background-color: white; }` to `background-color: #FFB6C1;`

## Test strategy
- No automated test suite exists in this repo (static site, no package.json/test
  runner found). Verify by inspecting the rendered CSS and confirming the hex value
  is present and the file is otherwise unchanged.
- Manually sanity-check the HTML files still reference styles.css correctly (no
  changes needed there).

## Risks
- Low risk: single-property, single-file change. No JS or markup impacted.
