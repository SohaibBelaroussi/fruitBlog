# Plan — Add robots.txt and sitemap.xml (issue #19)

## Goal
Add a `robots.txt` that allows all crawlers, and a `sitemap.xml` that lists
every page currently on the site, at the repo root (this is a static site
with no build step, so files served as-is).

## Context
- Static site: `index.html`, `fruits.html`, `mission.html`, `contact.html`
  at the repo root, no build tooling, no server-side routing.
- No custom domain configured (`homepage` is unset, GitHub Pages not
  currently enabled on the repo). The standard GitHub Pages URL for this
  repo (`https://sohaibtaqat.github.io/fruitBlog/`) is the most sensible
  base URL to use in the sitemap's `<loc>` entries — it's deterministic
  from the actual repo owner/name rather than an arbitrary placeholder,
  and works unchanged if/when Pages is enabled.
- Issue #19 has no further acceptance criteria beyond "allow all" robots
  and "simple sitemap listing all site pages."

## Approach
1. `robots.txt`:
   - `User-agent: *`
   - `Disallow:` (empty = allow everything)
   - `Sitemap:` line pointing at the sitemap's absolute URL.
2. `sitemap.xml`:
   - Standard `urlset` XML (sitemaps.org schema).
   - One `<url>` entry per HTML page: index, fruits, mission, contact.
   - Use absolute URLs under the GitHub Pages base.
   - Give `index.html` (site root `/`) priority 1.0, others 0.8.

## Files to touch
- `robots.txt` (new)
- `sitemap.xml` (new)

## Test strategy
- No test framework in this repo (static HTML/CSS/JS site, no package.json).
- Validate `sitemap.xml` is well-formed XML (parse check).
- Manually sanity-check `robots.txt` content is minimal/correct.

## Risks
- The exact deployment domain is unknown (no custom domain, Pages not
  enabled yet). Mitigated by using the deterministic default GitHub Pages
  URL for this repo; trivial to update if the project adopts a custom
  domain later.
