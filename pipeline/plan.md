# Plan — Newsletter signup on contact.html (issue #41)

## Goal
Add a small, client-side-only newsletter signup section to `contact.html`:
an email input + subscribe button. On submit, validate the email format;
if valid, replace the form with a friendly thank-you message. No backend,
no libraries — plain HTML/CSS/JS matching the existing site's style.

## Approach
- **Markup (`contact.html`)**: add a `.newsletter-section` block after the
  existing `.intro-section` inside `<main>`, containing:
  - a heading + short blurb
  - a `<form id="newsletter-form">` with a labeled `email` input
    (`type="email"`, reusing the existing `.search-input` look) and a
    `.button` submit button
  - an inline error message element (`hidden` by default, `role="alert"`)
    for invalid input
  - a success/thank-you message element (`hidden` by default,
    `role="status"`), shown in place of the form on success
- **Behavior (`script.js`)**: inside the existing `DOMContentLoaded`
  listener, add a guarded block (`if (newsletterForm) {...}`, consistent
  with the file's existing pattern for optional per-page elements):
  - listen for `submit`, call `preventDefault()`
  - validate the email with a simple regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
    trimmed of whitespace
  - if invalid: show the error message, keep the form visible, focus the
    input
  - if valid: hide the form (and error), reveal the thank-you message —
    this satisfies "replace the form with a friendly thank-you message"
    without risky innerHTML rebuilding
- **Styling (`styles.css`)**: add `.newsletter-section`, `.newsletter-fields`
  (flex row: input + button), `.newsletter-error`, `.newsletter-success`
  rules consistent with existing color palette (`#228B22` green,
  `#DC143C` crimson) and add a small-screen stacking rule in the existing
  `@media (max-width: 768px)` block.

## Files to touch
- `contact.html` — add the newsletter section markup
- `script.js` — add submit handler with validation + swap logic
- `styles.css` — add supporting styles

## Test strategy
This is a static site with no test runner/build step (verified: no
`package.json`, no test files). Verification will be manual/structural:
- Confirm HTML validity of the new markup (matching ids referenced by JS)
- Manually trace the JS logic for both the invalid-email and valid-email
  paths
- Use a quick headless check (e.g. a throwaway Node/JS snippet or browser
  load) to confirm: invalid email keeps form + shows error; valid email
  hides form and shows thank-you message
- Visually sanity-check responsiveness rule doesn't break existing layout

## Risks
- Regex email validation is intentionally simple (per "no libraries");
  it won't catch every RFC edge case, but matches the brief's ask for
  basic format validation.
- Keep everything scoped to contact.html/newsletter feature — no changes
  to unrelated pages or shared nav/footer markup beyond additive CSS.
