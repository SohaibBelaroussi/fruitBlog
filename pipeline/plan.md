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

## Human feedback (round 1) and how it was addressed

Human chose: "Approve but tone it down a bit (less jokey) - keep it playful
without going full comedian, and skip the emoji (drop the 🍓 in the
closing)."

Addressed by: rewriting every line below to drop the joke/gag-style lines
(e.g. "crime against snacking", "juice dripping down your chin", "dragon
fruit" bit, "lonely banana", "fair warning... boring snacks") in favor of
warm, lightly whimsical phrasing — playful word choice and a bit of energy,
but no punchlines or stand-up-style jokes. Removed the 🍓 emoji from the
closing line entirely (footer's existing 🍎 in the logo/nav is unrelated
and untouched).

## Final copy (before → after)

1. `<h1>Our Mission</h1>` → `<h1>Our Mission, Fruit First</h1>`

2. Mission box:
   - h2: "We Love Fruits & Want to Spread Knowledge" →
     "We Love Fruit, and We Love Sharing It"
   - p: → "Our passion for fruit goes beyond just how delicious it tastes.
     To us, fruit is one of nature's best ideas — a little burst of
     nutrition, color, and joy in every bite, and we can't wait to share
     that with you."

3. "Why We Started This Blog" section:
   - h2 stays "Why We Started This Blog"
   - p: → "We started this blog because we believe
     <span class=\"highlight\">fruit knowledge should be easy to find and
     fun for everyone</span>. Too often, people miss out on the good stuff
     fruit has to offer simply because nobody told them. Our mission is to
     change that."

4. "What Drives Us" section (h2 stays), 3 cards:
   - Card 1 h3 stays "🌱 Health & Wellness"; p → "Fruit is a natural energy
     boost with benefits built right in — better health, a stronger
     immune system, and the kind of everyday vitality that's hard to
     bottle."
   - Card 2 h3 stays "🌍 Environmental Awareness"; p → "Fruit is about as
     sustainable and eco-friendly as food gets, which means every piece
     you enjoy is good for you and good for the planet."
   - Card 3 h3 stays "📚 Education"; p → "There's a whole world of flavors
     out there waiting to be discovered. We love helping people make
     smarter, tastier choices — and maybe find a new favorite fruit along
     the way."

5. "Our Commitment" (h2 stays):
   - p → "We're committed to sharing information about fruit that's
     accurate, helpful, and genuinely enjoyable to read. Whether you're a
     longtime health enthusiast, a curious food lover, or just starting
     your journey toward healthier eating, we want to be your go-to source
     for all things fruit."

6. "Join Our Community" (h2 stays):
   - p → "Our love for fruit tends to rub off on people, and we like it
     that way. Once you see how much fruit has to offer — in flavor,
     variety, and everyday goodness — it's easy to want more of it in your
     life."

7. `intro-section`:
   - h3: "Together, We Can Make a Difference" → "Together, We Can Spread
     the Fruit Love"
   - p1 → "Sharing knowledge about fruit isn't just about facts and
     figures — it's about helping people live healthier, happier lives.
     Every person who learns something new about fruit, and passes it on,
     helps us get a little closer to our mission."
   - p2 (highlight span): "Thank you for being part of our fruit-loving
     community!" → "Thanks for being part of our fruit-loving community —
     we're glad you're here!" (no emoji)

8. Footer:
   - "Spreading the love of fruits, one bite at a time." → "Spreading the
     love of fruit, one bite at a time." (minor grammar tweak only; keep
     `id="copyright-year"` span untouched)

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
