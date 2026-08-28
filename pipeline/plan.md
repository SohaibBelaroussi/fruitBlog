# Plan — Issue #6: Add a contact page

## Goal
Add a `contact.html` page consistent with the site's existing pages
(`index.html`, `fruits.html`, `mission.html`), containing the standard
header/nav/footer, a short contact blurb, and a `mailto:` link to
`hello@fruitblog.example`. Add a "Contact" nav link to every page
(including the new one) so the nav is consistent site-wide.

## Approach
- Reuse the exact header/nav/footer markup pattern from the existing pages
  (same `<nav>` structure, `.logo`, `<ul><li><a>` list, footer copyright
  span with `id="copyright-year"`, and `<script src="script.js">`), so the
  existing `script.js` active-link-highlighting and copyright-year logic
  keep working unmodified.
- Add a new nav item `<li><a href="contact.html">Contact</a></li>` to the
  nav lists in `index.html`, `fruits.html`, and `mission.html`, placed
  after "Our Mission".
- Create `contact.html` with the same nav list plus `class="active"` on
  its own Contact link (matching the pattern already used by the other
  pages, where the current page's link carries `class="active"` in the
  markup in addition to the JS doing it at runtime).
- Contact page content: an `<h1>`, a short blurb paragraph reusing the
  `.intro-section` class already defined in `styles.css` (so no new CSS is
  required), and a mailto link: `<a href="mailto:hello@fruitblog.example">`.
- No CSS or JS changes are needed — existing classes (`.intro-section`,
  `header`, `nav`, `footer`) cover the new page's styling, and
  `script.js`'s nav-link/copyright logic is page-agnostic.

## Files to touch
- `contact.html` (new)
- `index.html` (add Contact nav link)
- `fruits.html` (add Contact nav link)
- `mission.html` (add Contact nav link)

## Test strategy
- No test suite exists in this static-site repo (no package.json/test
  runner found). Verify manually:
  - Every page's nav has 4 items: Home, Fruits, Our Mission, Contact.
  - `contact.html` has header/nav/footer identical in structure to the
    other pages, a blurb, and a working `mailto:hello@fruitblog.example`
    link.
  - Grep confirms `contact.html` is referenced consistently across all
    pages and that the mailto address is correct.

## Risks
- Low risk: purely additive static HTML change. Main risk is
  inconsistent nav markup across pages, mitigated by copying the exact
  existing structure.
