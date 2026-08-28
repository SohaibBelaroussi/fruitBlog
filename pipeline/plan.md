# Plan — Issue #18: Add a news page

## Goal
Add a placeholder `news.html` page in the existing site style, and add a
"News" link to the nav on every page (including the new one), matching the
brief's "nav and new-file changes only" constraint.

## Approach
- Reuse the existing page structure/style exactly as seen in
  `index.html` / `mission.html` / `contact.html` / `fruits.html`:
  same `<head>` boilerplate, `header > nav` markup, `.intro-section`,
  `.fruit-grid` / `.fruit-card` classes from `styles.css`, footer with
  `#copyright-year`, and `script.js` include. No new CSS classes needed.
- `news.html`: title "The Fruit Blog - News", nav with `News` marked
  `class="active"`, a simple placeholder body (intro section explaining
  updates/news will be posted here soon, plus a couple of placeholder
  "card" entries reusing `.fruit-card`) — content only, no TODOs/lorem
  placeholders that look unfinished, but explicitly framed as a
  coming-soon/placeholder page since no real news content exists yet.
- Add `<li><a href="news.html">News</a></li>` to the nav `<ul>` in
  `index.html`, `fruits.html`, `mission.html`, `contact.html`, and
  `news.html` itself (as the active entry), positioned after "Contact"
  to avoid disturbing existing entries/order.
- No changes to `styles.css` or `script.js` — nav styling and
  `#copyright-year` behavior already apply automatically to new markup.

## Files to touch
- `news.html` (new)
- `index.html` (nav only)
- `fruits.html` (nav only)
- `mission.html` (nav only)
- `contact.html` (nav only)

## Test strategy
- No test suite in this static-site repo (no package.json/build). Verify
  by inspection: each page's nav has identical 5 links in the same order,
  each page correctly marks its own link `active` and no other, and
  `news.html` follows the same head/footer/script boilerplate as the
  other pages.
- Manually check `news.html` renders sensibly by eyeballing the markup
  against `styles.css` classes used elsewhere (`.intro-section`,
  `.fruit-grid`, `.fruit-card`, `.highlight`).

## Risks
- Low risk: purely additive nav link + one new static file, matching an
  established pattern exactly. Main risk is inconsistency (wrong active
  class, mismatched href) across the 5 files — mitigated by copying the
  exact nav block from an existing page and editing only the News line
  and the active class per page.
