# Plan — Add unique meta description tags (issue #17)

## Goal
Add a unique, sensible `<meta name="description" content="...">` tag to the
`<head>` of every page in the site so each page has appropriate SEO/social
metadata. Head-section changes only — no body/content/nav changes.

## Approach
The site is a small static 4-page HTML site (no build system, no
templating): `index.html`, `fruits.html`, `mission.html`, `contact.html`.
Each already has a `<head>` with `charset`, `viewport`, `title`, and a
stylesheet link, but no meta description.

For each page, add one `<meta name="description" content="...">` line
directly after the existing `<title>` tag (consistent placement across all
four files), with wording tailored to that page's actual content so each
description is unique and accurately summarizes the page:

- `index.html` (Home): welcoming overview of the Fruit Blog and what
  visitors will find.
- `fruits.html` (Fruits): describes the page as a guide to citrus/tropical
  and other fruit varieties.
- `mission.html` (Our Mission): describes the blog's mission/values around
  fruit education, health, and sustainability.
- `contact.html` (Contact): describes the page as where to reach out with
  questions/suggestions.

Keep each description roughly 120–160 characters, one sentence or two,
matching the site's friendly tone. No changes to `<body>`, CSS, or JS.

## Files to touch
- index.html
- fruits.html
- mission.html
- contact.html

## Test strategy
No test suite/build exists in this repo (static HTML/CSS/JS site, no
package.json). Verification will be manual:
- Confirm each file has exactly one `<meta name="description">` in `<head>`.
- Confirm all four descriptions are distinct strings.
- Confirm no other part of each file changed (diff review limited to the
  `<head>` block).

## Risks
- Low risk: purely additive head-only change, no behavior/layout impact.
- Must ensure descriptions stay unique per page and don't duplicate the
  `<title>` verbatim.
