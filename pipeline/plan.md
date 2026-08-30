# Plan — Highlight matching text in fruit search results (issue #35)

## Goal
When the live search added in #33 filters the fruit cards on `fruits.html`,
also highlight the substring of each visible card's **name** (`<h3>`) that
matched the query, using a subtle `<mark>`-style background — no other
behavior of the existing search changes.

## Context
- #33 (already merged) added `#fruit-search`, wired up in `script.js`'s
  `filterFruits()`, which shows/hides `.fruit-card` elements and
  `.fruit-category` sections based on whether the query is a substring of
  the card's `<h3>` name or `<p>` description (case-insensitive).
- Card markup is static HTML, e.g. `<h3>🍊 Oranges</h3>` — emoji + space +
  name, no nested markup today.
- There's already a `.highlight` class (crimson, bold, used for static
  callouts like "Vitamin C" in intro paragraphs, with a hover font-size
  effect wired in `script.js`). Search-match highlighting needs its own
  class so it doesn't inherit that unrelated hover behavior or styling.
- Brief scopes this to the fruit **name**, not the description, so only
  `<h3>` content is modified.

## Approach
1. **`script.js`**
   - When caching cards for search (inside the existing
     `if (fruitSearchInput) { ... }` block), record each card's original
     name text once via `nameEl.dataset.originalName = nameEl.textContent`
     so repeated keystrokes always highlight against the pristine name
     rather than a previously-mutated `innerHTML`.
   - Add two small helpers: `escapeHtml(text)` (escape `&`, `<`, `>`, `"`
     for safe `innerHTML` use) and `highlightMatch(text, query)` which
     finds the first case-insensitive occurrence of `query` in `text` and
     returns the escaped text with that slice wrapped in
     `<mark class="search-match">…</mark>`, preserving the original
     casing of the matched slice; returns the plain escaped text
     unchanged if there's no match or the query is empty.
   - In `filterFruits()`, after computing whether a card matches, set the
     `<h3>`'s `innerHTML` via `highlightMatch(originalName, query)` when
     there's a non-empty query, otherwise reset it to the plain original
     name (covers clearing the search box and cards that match only via
     the description, which get no highlight since the name itself has no
     match).
2. **`styles.css`**
   - Add a `.search-match` rule near the existing `.search-*` rules: a
     subtle background (light warm yellow, e.g. `#fff3b0`), small
     `border-radius`, `color: inherit`, no font-weight change — deliberately
     lighter/less intrusive than the existing bold-crimson `.highlight`
     class so the two aren't visually confused.
3. No changes to `fruits.html` markup are needed — the `<h3>` contents are
   generated/restored by script at runtime.

## Files touched
- `script.js` — name caching + highlight-wrapping logic in the search filter
- `styles.css` — `.search-match` style

## Test strategy
No test runner in this repo (static HTML/CSS/JS, no `package.json`). Plan:
- `node --check script.js` to catch syntax errors.
- Manually trace `highlightMatch`/`escapeHtml` against known card names for
  a few queries: partial match ("ora" → `<mark>` around "Ora" in "Oranges"),
  case-insensitive match ("MANGO" matches "Mangoes" preserving original
  casing in the mark), a card that matches only via description (no
  highlight applied to its name), empty query (name renders plain, no
  `<mark>`), and query cleared after a match (name resets cleanly, no
  leftover `<mark>`).
- Serve the site locally (`python3 -m http.server`) and spot check the
  fruits page in a browser-like fetch, verifying the emoji prefix in each
  `<h3>` is left untouched by highlighting.

## Risks
- Must not touch the emoji in `<h3>` — since we highlight against
  `textContent` (which includes the emoji + space), a query that happens to
  match part of the emoji's rendered text is extremely unlikely (emoji are
  not queried as text) but the match is purely substring-based on the
  stored original text, so behavior is well-defined either way.
- Must avoid HTML injection: matched substrings come only from trusted
  static card names (never from the raw user query), and `escapeHtml` is
  applied before inserting into `innerHTML`, so this stays safe even if
  content changes later.
- Keep `.search-match` visually distinct from the pre-existing `.highlight`
  class so the two don't look like the same feature.
