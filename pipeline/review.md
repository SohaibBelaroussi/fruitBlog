# Review — Issue #18: Add a news page

## Verdict: done

The implementation matches the brief and plan closely, with no scope creep.

## Findings

None blocking. Notes only:

1. (nit, no action needed) `script.js`'s `DOMContentLoaded` handler recomputes
   `active` on every nav link based on `location.pathname`, overriding the
   hardcoded `class="active"` in the HTML at runtime. This means the
   hand-set `active` classes are cosmetically redundant (matches the
   existing pattern on all other pages already, e.g. `contact.html`,
   `mission.html`), so it's consistent with prior art and not a new issue
   introduced by this change.
2. (nit) `news.html`'s footer copy reads "Spreading the love of fruits, one
   bite at a time." while `index.html`/`fruits.html`/`mission.html`/
   `contact.html` mostly use "fruit" (singular) in that phrase — pre-existing
   inconsistency already present across the site (`index.html` vs
   `mission.html` differ too), not something this change needs to fix.

## Verification performed

- Diffed `issue-18` against `origin/main`: only `contact.html`,
  `fruits.html`, `index.html`, `mission.html` (nav `<li>` addition only),
  new `news.html`, plus `pipeline/brief.md` and `pipeline/plan.md`. No
  changes to `styles.css`, `script.js`, or any unrelated file — satisfies
  the brief's "Nav and new-file changes only" constraint.
- Confirmed all 4 pre-existing HTML pages in the repo (`index.html`,
  `fruits.html`, `mission.html`, `contact.html`) received the
  `<li><a href="news.html">News</a></li>` entry, positioned after
  "Contact" as planned — satisfies "add a News link to the nav on ALL
  pages."
- Confirmed each page's nav has the same 5 links in the same order, and
  exactly one `class="active"` marking the current page (News marked
  active only in `news.html`).
- `news.html` reuses the exact `<head>`/`header>nav`/footer/`script.js`
  boilerplate from sibling pages, and its body reuses existing CSS
  classes only (`.intro-section`, `.fruit-grid`, `.fruit-card`,
  `.highlight`) — no new CSS/JS required, none added.
- Content is framed explicitly as a coming-soon/placeholder page ("Fresh
  Updates, Coming Soon", "Check back soon") without looking like an
  unfinished stub (no TODO/lorem-ipsum text), matching the plan's intent.
- Title `The Fruit Blog - News` matches the site's `The Fruit Blog - X`
  title convention used by other pages.
