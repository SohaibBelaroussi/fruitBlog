# Plan

## Goal
Add a `CONTRIBUTING.md` to the repo root explaining that PRs in this repo
are opened by an AI software factory and merged by humans, and that new
work should be filed as GitHub issues.

## Approach
This repo (a static "Fruit Blog" site) has no existing README or
CONTRIBUTING file to match style against, so use a short, plain-language
Markdown note. Content:
- State that pull requests in this repository are opened by an AI
  software factory (automated pipeline), not by humans directly.
- State that humans review and merge those PRs.
- Instruct contributors to file new work (bugs, features, changes) as
  GitHub issues rather than opening PRs themselves, since the issue is
  what triggers the factory.

## Files to touch
- `CONTRIBUTING.md` (new file, repo root)

## Test strategy
No code/build changes; this is a documentation-only addition. Verify the
file renders as valid Markdown and reads clearly. No test suite exists
for this static site repo (no package.json/test runner), so no automated
tests apply.

## Risks
Minimal — a docs-only addition with no behavioral impact.
