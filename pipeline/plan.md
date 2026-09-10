# Plan — Fruit of the Month spotlight (issue #51)

## Goal
Add a "Fruit of the Month" spotlight section at the top of `news.html` that
deterministically picks a fruit from `data/fruits.json` based on the current
calendar month, and displays its name, season, and description with visual
flair matching the rest of the site (green/crimson palette, rounded cards,
emoji accents already used elsewhere).

## Approach
- The site is a static, no-build HTML/CSS/JS project — every other page
  either hardcodes content or is enhanced client-side via `script.js`
  (search on `fruits.html`, active-nav highlighting, etc). There's no
  existing pattern of fetching `data/fruits.json` at runtime, but the brief
  explicitly calls for reading it, so this introduces that pattern via
  `fetch()`, guarded with a `.catch()` fallback in case the page is opened
  without an HTTP server (fetch of local files can fail under `file://`).
- Markup: add a `<section class="spotlight" id="fruit-of-the-month">` right
  after the `<h1>` in `news.html`, before the existing "Fresh Updates" intro
  section. It ships with placeholder/loading text so the page isn't empty
  before JS runs or if JS fails.
- Data + determinism: in `script.js`, guard new logic behind
  `document.getElementById('fruit-of-the-month')` (matching the existing
  per-page-feature pattern used for the fruit search and mission box).
  Fetch `data/fruits.json`, pick `fruits[new Date().getMonth() % fruits.length]`
  — deterministic per calendar month, wraps safely regardless of list length.
- Visual flair: new `.spotlight` styles in `styles.css` reusing the site's
  existing green (#228B22) / crimson (#DC143C) palette — a gradient badge
  card with a large emoji, a season pill, name, and description. Emoji is
  looked up from a small name→emoji map in `script.js` (the JSON has no
  emoji field) with a generic fallback for any future fruit. Mobile layout
  handled in the existing bottom `@media (max-width: 768px)` block, matching
  how other responsive tweaks are grouped in this file.

## Files touched
- `news.html` — add the spotlight section markup.
- `styles.css` — add `.spotlight` and related styles + one mobile rule.
- `script.js` — add fetch/render logic for the spotlight, guarded so it's a
  no-op on other pages.

## Test strategy
No test runner or build step exists in this repo. Verification is manual:
- `node -c script.js` for a syntax check.
- Validate `data/fruits.json` is still valid JSON (unchanged).
- Reason through the month→fruit mapping for a few sample dates to confirm
  determinism and that it degrades gracefully (loading text / catch fallback)
  if `fetch` fails, e.g. under `file://`.

## Risks
- `fetch('data/fruits.json')` fails silently under `file://` due to CORS —
  mitigated with a `.catch()` that still shows a sensible fallback message
  instead of a broken/empty section.
- Only 10 fruits for 12 months means two pairs of months repeat the same
  fruit — acceptable since the brief only asks for deterministic selection,
  not a unique fruit per month.
