# Plan — Issue #42: Seasonal badges on fruit cards

## Goal
On `fruits.html`, show a small, subtly-colored badge on each fruit card
indicating its season, sourced from the `season` field in
`data/fruits.json`.

## Context / decisions
- The site is a pure static HTML/CSS/JS site with **no build step and no
  runtime data fetching anywhere** (confirmed by reading `script.js` and
  every page). The live-search feature added in #33 deliberately reads
  fruit name/description straight out of the DOM rather than fetching
  `data/fruits.json` — that's the established precedent for this codebase.
  To stay consistent with that precedent (and to avoid a `fetch()` of a
  local JSON file breaking when a page is opened via `file://`, which is
  how this static site is commonly viewed), badges are added as static
  markup in `fruits.html`, with the season value transcribed directly
  from `data/fruits.json` (the field the brief points at) rather than
  loaded at runtime.
- `data/fruits.json` has exactly 10 entries: Orange, Lemon, Lime, Mango,
  Pineapple, Strawberry, Blueberry, Grape, Cherry, Peach — all Winter/
  Spring/Summer/Fall. `fruits.html` has 12 cards; two (Coconut, Plum)
  have no matching entry in the JSON. Per the brief ("using the season
  field already present in data/fruits.json"), I only add a badge where
  the data actually exists — I'm not inventing season data for Coconut
  or Plum. Their cards are left as-is.
- Colors: four distinct, subtle (pastel-background / darker-text) badge
  styles, one per season, chosen to sit comfortably next to the site's
  existing palette (forest green header/links `#228B22`, crimson accent
  `#DC143C`, pink page background `#FFB6C1`, light-gray card background
  `#f8f8f8`) without clashing with the crimson `.fruit-card` accent
  border or the crimson `<h3>` titles:
  - Winter → cool blue (`#E3F2FD` bg / `#1565C0` text)
  - Spring → soft green (`#E8F5E9` bg / `#2E7D32` text)
  - Summer → warm gold/orange (`#FFF3E0` bg / `#E65100` text)
  - Fall → warm brown (`#EFEBE9` bg / `#6D4C41` text)

## Approach
1. `styles.css`: add a `.season-badge` base style (small pill: padding,
   border-radius, font-size, uppercase, letter-spacing) plus four
   season-specific modifier classes (`.season-winter`, `.season-spring`,
   `.season-summer`, `.season-fall`) with the colors above.
2. `fruits.html`: for each of the 10 cards whose fruit exists in
   `data/fruits.json`, add
   `<span class="season-badge season-<season>">﹤Season﹥</span>`
   right after the `<h3>`, before the description `<p>`.

## Files touched
- `styles.css` — new badge styles
- `fruits.html` — badge markup on matching cards

## Test strategy
- No test suite exists in this repo (pure static site, no package.json).
- Manually verify: badge text/colors match the season per fruit in
  `data/fruits.json`; CSS validates (no typos); visually sanity-check
  via the `run` skill / a quick local static server if available.

## Risks
- Two cards (Coconut, Plum) intentionally get no badge since they're
  absent from `data/fruits.json`; flagged above in case product wants
  those added to the data file in a follow-up.
