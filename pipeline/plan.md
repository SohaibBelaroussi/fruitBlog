# Plan — Issue #15: Add tagline under site title

## Goal
Add the tagline "fresh takes, daily" directly under the site title/logo in the
header, on every page, styled subtly (not competing visually with the logo or
nav).

## Context
This is a small static site (`index.html`, `fruits.html`, `mission.html`,
`contact.html`) sharing one `styles.css` and one `header > nav` markup
structure:

```html
<header>
    <nav>
        <div class="logo">🍎 Fruit Blog</div>
        <ul>...</ul>
    </nav>
</header>
```

All four pages have byte-identical header/nav markup (only the active nav
link and `<title>` differ), so the same change applies uniformly.

## Approach
- Wrap the existing `.logo` div and a new tagline element in a `.brand`
  container so the tagline stacks directly under the title while the brand
  block as a whole stays side-by-side with the nav links (preserves current
  `justify-content: space-between` layout).
- Markup addition (applied identically to all 4 HTML files):
  ```html
  <div class="brand">
      <div class="logo">🍎 Fruit Blog</div>
      <p class="tagline">fresh takes, daily</p>
  </div>
  ```
- CSS additions in `styles.css`:
  - `.brand { display: flex; flex-direction: column; }` — stacks logo and
    tagline vertically.
  - `.tagline { font-size: 0.85rem; font-weight: normal; color: rgba(255,
    255, 255, 0.75); letter-spacing: 0.02em; }` — subtle: smaller, lighter
    weight, reduced opacity against the green header background, no
    competition with `.logo`'s bold 1.5rem text.
  - No changes needed to the mobile `@media (max-width: 768px)` nav rule;
    `.brand` stacking is independent of the nav's flex-direction and will
    continue to render correctly when `nav` switches to column layout.

## Files to touch
- `index.html`
- `fruits.html`
- `mission.html`
- `contact.html`
- `styles.css`

## Test strategy
No test framework exists in this static-site repo (no package.json/build).
Verification will be manual/visual:
- Grep all 4 HTML files to confirm the `.brand`/`.tagline` markup is present
  and identical.
- Open the diff for `styles.css` and sanity-check no existing selectors are
  broken (`.logo` rule untouched, only additive `.brand`/`.tagline` rules).
- Use the `run` skill (or a quick static-file check) to eyeball the header
  in a browser if available; otherwise rely on careful review of the CSS
  values (small font size + reduced opacity = subtle by construction).

## Risks
- Low risk: purely additive HTML wrapper + CSS, no existing classes renamed
  or removed, so no risk of breaking current nav/logo styling.
- Must keep all 4 pages in sync — mitigated by applying the identical
  snippet to each and grepping afterward to confirm.
