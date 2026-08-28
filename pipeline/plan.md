# Plan

## Goal
Satisfy issue #2 — "add a footer with copyright notice" (body: "Add a footer to
the page.\nBlocked-by: #1"). Issue #1 (background color) is already merged.

## Finding: the footer already exists
Before writing any code I checked the current state of the repo. All three pages
already contain an identical footer with a copyright notice, and it has been
present since the very first commit (`d0414b4`, "first commit") — i.e. it
predates this issue and was **not** introduced by issue #1's change:

```html
<footer>
    <p>&copy; 2024 Fruit Blog. Spreading the love of fruits, one bite at a time.</p>
</footer>
```

present in `index.html` (lines 68-70), `fruits.html` (116-118), and
`mission.html` (83-85), each linking the shared `styles.css`. The footer is
also styled consistently in `styles.css` (lines 131-137):

```css
footer {
    background-color: black;
    color: white;
    text-align: center;
    padding: 1rem;
    margin-top: 3rem;
}
```

`script.js` has no footer-related logic (checked — only nav highlighting,
card hover effects, mission-box click animation, and header scroll shadow).

So the literal ask in issue #2 — a footer element with a copyright notice,
present across the site — is already fully implemented and styled. There is
no missing markup, no missing CSS, and no page that lacks it.

## Approach
Two ways to proceed, depending on what the human wants:

- **Option A (no-op / close as already satisfied):** Make no code changes,
  since the feature already exists exactly as described. Verdict would be
  "done" with a note explaining nothing needed to change.
- **Option B (small correctness enhancement):** The hardcoded year in the
  existing notice ("2024") is stale (today is 2026-08-28). As a minor,
  in-scope improvement to the "copyright notice" itself, replace the
  hardcoded year with one computed at load time via `script.js`
  (e.g. `document.getElementById('copyright-year').textContent = new
  Date().getFullYear()`), wrapping the year in a `<span id="copyright-year">`
  on all three pages so it never goes stale again.

## Files to touch (if Option B is chosen)
- `index.html`, `fruits.html`, `mission.html` — wrap the year in a `<span
  id="copyright-year">2024</span>` inside the existing footer `<p>` (kept as
  static fallback text if JS is disabled).
- `script.js` — add a small block in the existing `DOMContentLoaded` handler
  to set that span's text to the current year.

## Test strategy
- No automated test suite exists in this repo (static site, no
  package.json/test runner). Verify by inspecting the rendered HTML/CSS and,
  for Option B, confirming the year element updates correctly (logically,
  since there's no browser test harness here).

## Risks
- Low risk either way. Option A is a pure no-op. Option B touches four files
  but is additive and narrowly scoped to the copyright year only.

## Decision
Human approved **Option B**: make the copyright year dynamic.

## Implementation (completed)
- `index.html`, `fruits.html`, `mission.html` — wrapped the year in the
  existing footer paragraph as `<span id="copyright-year">2024</span>`,
  keeping `2024` as static fallback markup/no-JS text, identical across all
  three pages.
- `script.js` — added, at the top of the existing `DOMContentLoaded`
  handler, a lookup of `#copyright-year` and, if present,
  `copyrightYear.textContent = new Date().getFullYear();` so the footer
  always shows the current year without further edits.
- No CSS changes needed — the `footer` rule already styles the `<p>` content
  regardless of the inner `<span>`.

## Verification
- No automated test suite exists in this repo (static site, no
  package.json/test runner). Verified by inspection:
  - All three pages have matching footer markup with the new span.
  - `script.js` sets `#copyright-year` text on `DOMContentLoaded`, guarded by
    an existence check so it's a no-op if the element is ever removed.
  - `git diff --stat` shows only the four intended files changed.
