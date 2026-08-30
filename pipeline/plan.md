# Plan — Issue #34: Make the homepage hero more inviting

## Goal
Rework the homepage hero section (`index.html`) to feel warmer and more
alive: friendlier welcome copy, a short playful subtitle, and a clear CTA
link inviting visitors to browse the fruits page — while keeping the
existing color palette (green `#228B22` / crimson `#DC143C` / pink page
background `#FFB6C1` / light card background `#f8f8f8`) and the overall
page structure (nav, intro section, fruit grids, seasonal section, footer
all stay put).

## Approach
1. Wrap the current bare `<h1>Welcome to the World of Fruits</h1>` in a new
   `<section class="hero">` block containing:
   - A warmer `<h1>` greeting (e.g. "Hello, Fruit Lover! 🍓").
   - A short playful `<p class="hero-subtitle">` line reinforcing the
     blog's personality.
   - A CTA `<a class="button">` pointing to `fruits.html`, reusing the
     existing `.button` style already defined in `styles.css` (currently
     only used on `404.html`) so the crimson/green hover treatment stays
     consistent site-wide.
2. Add hero-specific CSS (`.hero`, `.hero-subtitle`) to `styles.css` near
   the existing `h1` rule, using the same palette — no new colors
   introduced. Keep the centered layout already used for `h1`.
3. Add a small mobile tweak inside the existing `@media (max-width: 768px)`
   block if the hero needs padding/font adjustments at narrow widths.
4. Leave `.intro-section`, `.fruit-grid`, `.fruit-card`, footer, nav, and
   all other pages untouched — this is scoped to the homepage hero only.

## Files to touch
- `index.html` — restructure the top of `<main>` into a `.hero` section.
- `styles.css` — add `.hero` / `.hero-subtitle` rules (+ minor responsive
  tweak).

## Test strategy
This is a static site with no build step and no test suite (confirmed via
`README.md` and repo listing — no `package.json`, no CI config). Verification:
- Manually read the resulting HTML for valid structure (hero section closes
  properly, CTA link targets `fruits.html` which exists).
- Confirm no other page references the old hero markup/classes that would
  break (`grep` for `.hero` usage elsewhere — none expected).
- Visual sanity-check of the CSS rules for consistency with existing
  spacing/typography conventions in `styles.css`.

## Risks
- Low risk: single static page + CSS change, no shared components, no JS
  behavior touched, no build pipeline to break.
- Care taken to not change the page's overall structure per the issue's
  explicit request ("keep the existing color palette and overall
  structure").
