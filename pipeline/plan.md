# Plan: Playful rewrite of mission.html copy

## Goal
Rewrite the visible text copy on `mission.html` to be more playful and fun,
per issue #9. No structural, layout, HTML-tag, class, or ID changes — only
text content changes.

## Approach
- Touch only `mission.html`.
- Keep every element, tag, class, and attribute exactly as-is (`<h1>`, `<h2>`,
  `<h3>`, `<p>`, `<div class="mission-box">`, `<div class="fruit-grid">`,
  `<div class="fruit-card">`, `<div class="intro-section">`,
  `<span class="highlight">`), so styling/layout is untouched.
- Do not touch nav, header, footer structure, or the `id="copyright-year"`
  script hook — only the surrounding footer sentence text may get a light
  tone pass while keeping the copyright/year mechanics intact.
- Rewrite each paragraph/heading to be punchier, warmer, and a bit cheeky,
  while preserving the same meaning/order of ideas (mission → why we
  started → what drives us [3 cards] → commitment → join community →
  closing).

## Proposed copy (before → after)

1. `<h1>Our Mission</h1>` → `<h1>Our Mission (Besides Eating All the Fruit)</h1>`

2. Mission box:
   - h2: "We Love Fruits & Want to Spread Knowledge" →
     "We're Fruit-Obsessed and Not Even Sorry"
   - p: → "Let's be honest: we could talk about fruit all day. It's nature's
     candy, edible confetti, and a tiny vitamin bomb all rolled into one.
     We're here to share that joy — juice dripping down your chin optional."

3. "Why We Started This Blog" section:
   - h2 stays "Why We Started This Blog"
   - p: → "Here's the thing: too many people are out there living
     bland, fruit-less lives, and it's a crime against snacking. We started
     this blog because <span class="highlight">everyone deserves to know
     just how amazing fruit can be</span>. Consider this our juicy public
     service announcement."

4. "What Drives Us" section (h2 stays), 3 cards:
   - Card 1 h3 stays "🌱 Health & Wellness"; p → "Fruit is basically a
     tiny superhero in a colorful cape. It powers you up, fights off the
     sniffles, and gives you the kind of energy coffee only wishes it had."
   - Card 2 h3 stays "🌍 Environmental Awareness"; p → "Good news: loving
     fruit means loving the planet too. It's a win-win so satisfying we
     want to shout it from the orchard rooftops."
   - Card 3 h3 stays "📚 Education"; p → "Ever wonder what a dragon fruit
     actually tastes like? Same. We're on a mission to turn fruit-curious
     folks into fruit-fluent ones, one fun fact at a time."

5. "Our Commitment" (h2 stays):
   - p → "We promise to keep things accurate, helpful, and just a little
     bit silly. Whether you're a die-hard health nut, a curious snacker, or
     someone whose fruit bowl is currently just a lonely banana, we've got
     you covered."

6. "Join Our Community" (h2 stays):
   - p → "Fair warning: our love of fruit is contagious. Once you discover
     how ridiculously good (and good for you) fruit can be, there's no
     going back to boring snacks."

7. `intro-section`:
   - h3: "Together, We Can Make a Difference" → "Together, We're Building
     a Fruit-Loving Revolution"
   - p1 → "Every smoothie shared, every weird new fruit tried, every friend
     converted from chip-lover to cherry-lover — it all adds up. You're not
     just snacking, you're part of the mission."
   - p2 (highlight span): "Thank you for being part of our fruit-loving
     community!" → "Thanks for being here — you're officially one of us
     now. 🍓"

8. Footer:
   - "Spreading the love of fruits, one bite at a time." → "Spreading the
     love of fruit, one delicious bite at a time." (keep `id="copyright-year"`
     span untouched; only the trailing tagline text may loosen slightly if
     it reads more natural, otherwise leave as-is)

## Files touched
- `mission.html` (copy only)

## Test strategy
- No automated tests exist for static copy; this repo appears to be a
  static HTML/CSS/JS site (index.html, fruits.html, mission.html,
  styles.css, script.js).
- Verify manually: diff shows only text-node changes, no tag/attribute/class
  changes; open the file to confirm structure renders the same (visual
  check via the `run` skill if useful).
- Check `script.js` still finds `#copyright-year` (untouched).

## Risks
- Tone is subjective — mitigated by human approval gate before writing.
- Risk of accidentally changing markup while editing prose — mitigated by
  using precise Edit calls per text node only.
