# Review — Issue #16: Add a 404 page

## Verdict: done

The change is mergeable as-is. It's a small, purely additive diff (`404.html`
new file + one additive CSS rule in `styles.css`) that fully satisfies the
brief and closely follows the plan.

## Diff reviewed
`git diff origin/main...issue-16`:
- `404.html` (new, 43 lines)
- `styles.css` (+15 lines: `.button` / `.button:hover`)
- `pipeline/brief.md`, `pipeline/plan.md` (pipeline artifacts, not code)

## Findings

None blocking. A couple of very minor, optional observations (not worth
holding up the merge):

1. **Nit — no `<meta name="description">` tag.** `404.html:6` lacks a meta
   description, unlike `index.html`/`contact.html`/`mission.html` in some
   other in-flight branches (issue-17 adds these). However, that meta-tag
   work is not yet on `main` (verified: `893e7cd` "Add unique meta
   description tags to every page" is not an ancestor of `issue-16` or
   `main`), so `404.html` is consistent with the current baseline. No action
   needed here; if/when issue-17 merges first, a trivial follow-up could add
   a description to 404.html too, but that's out of scope for this issue.
2. **Nit — mission.html footer copy diverges slightly** ("fruit" vs
   "fruits") from the other three pages' footer text; `404.html` matches
   `index.html`/`contact.html`'s wording. Pre-existing inconsistency, not
   introduced by this change.

## Verification against brief & plan

- ✅ `404.html` created, matches site style: same header/nav/logo markup as
  `index.html`/`contact.html`/`mission.html` (`404.html:9-19` vs.
  `contact.html:9-19`), links `styles.css` and `script.js` identically.
- ✅ Friendly not-found message: "404 - Looks Like This Fruit Wandered Off"
  heading + reassuring copy inside `.intro-section` card, consistent with
  the fruit/orchard theme used across the site.
- ✅ Clear link home: `<a href="index.html" class="button">🏠 Back to
  Home</a>` (`404.html:34`), correctly targets `index.html`.
- ✅ New `.button` CSS (`styles.css:118-131`) reuses the existing
  crimson/green palette (`#DC143C` / `#228B22`) already used elsewhere in
  the stylesheet (e.g. `nav a.active`, `.mission-box`, `.highlight`) — no
  new colors introduced, additive only, no existing rules touched.
- ✅ Nav links present but none marked `active` (matches plan's reasoning:
  `script.js`'s active-link logic at `script.js:8-14` only adds the class on
  an href match against the current filename, so on `404.html` no link
  matches — safe, no errors).
- ✅ Footer with `#copyright-year` span present and wired to the same
  `script.js`, matching other pages exactly.
- ✅ No unintended changes: diff touches only the new file and one additive
  CSS block; no existing markup/behavior modified.
- ✅ Test strategy in the plan (manual verification, no build tooling in
  repo) is appropriate for this static site; the structure plausibly
  renders correctly given it mirrors `contact.html` almost exactly.
