# Plan — Issue #8: Add fruits data file

## Goal
Add a `data/fruits.json` file listing 10 fruits, each with `name`, `season`,
and a one-line `description`. No page/HTML/JS/CSS changes in this issue.

## Approach
- This is a static site (plain HTML/CSS/JS, no build system, no package.json,
  no test runner).
- Create a `data/` directory at the repo root with a `fruits.json` file.
- Reuse fruit names already referenced in `fruits.html` (oranges, lemons,
  limes, mangoes, pineapples, strawberries, blueberries, grapes, cherries,
  peaches) to keep the data consistent with existing content, but write new
  concise one-line descriptions and add a `season` field for each, since the
  page doesn't currently track season.
- Keep JSON as a top-level array of 10 objects with exactly the fields
  `name`, `season`, `description` (strings), valid JSON, no trailing commas.
- No changes to fruits.html, script.js, styles.css, or any other page per
  the brief ("No page changes in this issue").

## Files to touch
- `data/fruits.json` (new file)

## Test strategy
- No existing test suite in this repo (static HTML/CSS/JS site, no
  package.json/build tooling).
- Validate the JSON is well-formed with `python3 -m json.tool` and confirm
  it contains exactly 10 entries each with the three required string fields.

## Risks
- Low risk: single new data file, no code paths consume it yet, so no
  runtime behavior changes.
