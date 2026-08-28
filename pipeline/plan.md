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

## Cap gate test note
Per the "cap gate test" brief, followed the test procedure exactly:
1. Called ask_human: "Which color do you prefer, red or blue?" — human answered "blue".
2. Called ask_human again: "And which fruit do you prefer?" — this call did NOT pause;
   it returned immediately with a cap error instead of prompting the human:
   "ask_human cap reached for this step — no more questions allowed. Decide yourself and proceed (or finish with an honest verdict)."
3. Per instructions, did not retry and finished immediately with verdict status done.
