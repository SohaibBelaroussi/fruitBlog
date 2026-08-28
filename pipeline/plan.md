# Plan — Issue #16: Add a 404 page

## Goal
Add a `404.html` page to the static Fruit Blog site that matches the
existing site style (same header/nav/footer chrome, same color palette),
shows a friendly not-found message, and includes a clear link back home.

## Approach
- Reuse the exact header/nav/footer markup pattern from the other pages
  (`index.html`, `contact.html`, `mission.html`) so the 404 page is visually
  consistent (logo, nav links, footer with copyright year script).
- No nav link is "active" on this page since it's not a real destination in
  the nav (matches how a 404 wouldn't correspond to a nav item); `script.js`'s
  active-link logic will simply find no match, which is safe (it only adds
  the class if `href` matches the current filename).
- Body content: a big friendly heading/emoji, a short reassuring message
  using the existing `.intro-section` card style for consistency, and a
  prominent "Back to Home" link.
- Add a small new `.button` style to `styles.css` (crimson background,
  white text, rounded) so the home link reads as a clear call-to-action
  rather than a plain text link — consistent with the site's crimson/green
  palette already used for `nav a.active` and `.highlight`.
- Link `styles.css` and `script.js` exactly as other pages do, so the
  copyright year and nav-active-highlighting behavior keep working.

## Files to touch
- `404.html` (new)
- `styles.css` (add a small `.button` / `.not-found-section` style, additive
  only — no changes to existing rules)

## Test strategy
- This is a static site with no build/test tooling in the repo (verified:
  no package.json/test scripts). Verify manually:
  - Open `404.html` directly and confirm it renders with header, message,
    and home link, matching the visual style of other pages.
  - Confirm the "Back to Home" link points to `index.html`.
  - Confirm no console errors from `script.js` (it defensively checks for
    elements before using them).

## Risks
- Low risk: purely additive change (new file + additive CSS rule), no
  existing markup or behavior modified.
