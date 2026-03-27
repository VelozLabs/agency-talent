# Session C-06 — AI Image Prompts
**Agent**: Image Prompt Engineer (`design-image-prompt-engineer`)
**Input**: C-01 brand identity, C-03 screen layouts, C-05 visual direction
**Date**: 2026-03-27

---

## Prompt Philosophy

Clay's visual direction is specific: warm, matte, typographic, tool-like. Generic "fitness app UI" prompts will produce exactly the wrong result — bright colors, gradient backgrounds, people celebrating. Every prompt below includes aggressive negative parameters to enforce the brand anti-rules from C-01.

---

## Universal Negative Prompt (applied to ALL assets)

```
--no neon colors, electric blue, bright green, confetti, trophy, badge, streak,
fire flame, lightning bolt, celebration, gradient background, glassmorphism,
dark mode (unless specified), motivational text overlay, split-screen before/after,
fitness model, sports clothing advertising, gym action photography, bokeh background,
drop shadows, floating elements, iOS tab bar, navigation bar
```

---

## In-App Screen Mockups

### Asset 1: Dashboard — Data-Rich State (Pre-Workout, State 1)

```
Asset:    Dashboard, data-rich state, iPhone mockup
Platform: Midjourney v6

Prompt:
"Flat lay close-up photograph of an iPhone 15 Pro displaying a minimalist fitness
tracking app dashboard. Warm off-white background (#F7F4EE). At top: a warm terracotta
(#C2865A) pinned banner with serif font text reading 'Play pickup ball with my kids
without getting winded.' Below: a subtle sparkline chart in muted sage green showing
4 weeks of volume data. Below that: a clean workout list in dark warm brown (#2C2A27)
sans-serif — 'Squat 3×5 @ 245 lbs', 'Bench Press 3×5 @ 175 lbs'. A muted arrow-style
start prompt at bottom. Warm ambient lighting, matte screen surface, no reflections.
Shot on a warm stone or unfinished wood surface. Editorial photography style."

Negative: --no (universal negative prompt above)
Style:    --ar 9:19.5 --style raw --v 6.1 --stylize 200
Notes:    If result shows gradient background — re-run. If type is too small to read —
          upscale with Midjourney /upscale. Target: the dashboard feels like a tool,
          not a product shot.
```

### Asset 2: Dashboard — Cold-Start State (No Session Data)

```
Asset:    Dashboard, cold-start state, iPhone mockup
Platform: Midjourney v6

Prompt:
"Flat lay close-up photograph of an iPhone 15 Pro displaying a minimalist app screen.
Warm off-white background (#F7F4EE). Center of screen: a large serif font text prompt
in warm terracotta reading 'What do you want to be able to do?' with a text input field
below it in a quiet ash color. Below the input: small body text in muted gray reading
'Clay tracks your training, not your health.' Further below: a minimal workout list
with simple exercises listed. Canvas feels sparse but intentional — like a notebook
waiting for its first entry. Warm ambient lighting, matte surface, no reflections.
Stone or linen surface background."

Negative: --no (universal negative prompt above)
Style:    --ar 9:19.5 --style raw --v 6.1 --stylize 150
Notes:    The empty state should feel intentional, not broken. If it reads as broken/
          unfinished, adjust prompt to emphasize "intentionally minimal, like first
          page of a journal."
```

### Asset 3: Active Session (Mid-Workout, State 2)

```
Asset:    Active session screen, iPhone mockup
Platform: Midjourney v6

Prompt:
"Close-up photograph of a hand holding an iPhone 15 Pro, screen visible, displaying
a weight training logging interface. Large monospace numerals '245 lbs' and '5 reps'
in dark warm brown (#2C2A27) dominate the center. Minimalist plus and minus controls
flanking each number. Below: a horizontal slider track in warm off-white with a small
muted orange-brown thumb. Bottom of screen: a subtle text prompt 'Hold to finish' in
quiet gray. The phone is held by a strong, slightly calloused hand — no nail polish,
no jewelry — suggesting real training use, not a stock photo. Gym concrete floor or
rubber mat blurred in background. Natural gym lighting, not studio lighting."

Negative: --no (universal negative prompt above), --no studio lighting, bright background,
          colorful gym equipment, motivational posters
Style:    --ar 9:19.5 --style raw --v 6.1 --stylize 250
Notes:    The hand is important — it should look like someone who actually lifts.
          If the hand looks like a stock photo hand, re-run with "weathered hand,
          training calluses, natural."
```

### Asset 4: Post-Session Reshape (State 3)

```
Asset:    Post-session dashboard, iPhone mockup
Platform: Midjourney v6

Prompt:
"Flat lay photograph of an iPhone 15 Pro displaying a quiet post-workout screen.
Top: warm terracotta Why pin with serif text. Below: a sparkline chart in muted
sage green with today's data point slightly larger and brighter than the rest.
Center: a whisper card — subtle 1px gray border, small vertical terracotta accent
on left edge — containing 2 lines of small body text. Below: a compact session
summary list with muted ash checkmarks (no color, no emphasis). The overall feeling
is quiet completion — like closing a journal. Warm directional light from left,
matte surface, no reflections, warm stone surface below phone."

Negative: --no (universal negative prompt above), --no celebration, fireworks,
          bright colors on completion screen
Style:    --ar 9:19.5 --style raw --v 6.1 --stylize 200
Notes:    The whisper card text can be placeholder/blurred — the composition matters
          more than readable text at this distance.
```

### Asset 5: Apple Watch Logging Screen

```
Asset:    Apple Watch Series 9 / Ultra 2 face showing active session
Platform: Midjourney v6

Prompt:
"Close-up photograph of an Apple Watch on a wrist, screen showing a minimal
strength training logging interface. Large monospace weight value '245' dominates
the watch face in warm brown on off-white background. Small rep counter below.
Simple plus/minus haptic buttons. The wrist is mid-lift — hand gripping something
off-frame. Watch face is matte, functional, tool-like. Natural gym lighting.
No text on screen other than the weight value and rep count."

Negative: --no (universal negative prompt above), --no colorful watch face,
          rings, activity circles, heart rate animation
Style:    --ar 1:1 --style raw --v 6.1 --stylize 150
Notes:    The watch UI won't be precisely accurate to Clay's design — that's fine.
          The mood and color language is what matters.
```

---

## Marketing Assets

### Asset 6: App Store Hero Image

```
Asset:    App Store hero / feature graphic
Platform: DALL-E 3 (better for text integration)

Prompt:
"App Store feature graphic for a minimalist iOS fitness app called Clay. Warm
off-white (#F7F4EE) background. Left side: iPhone 15 Pro showing the Clay dashboard
— terracotta Why pin at top with serif text, muted sage sparkline below, clean
workout list. Right side: large Canela serif typography reading 'Your training,
understood.' in warm near-black (#2C2A27). Overall feel: editorial, like a quality
magazine spread. Not a tech advertisement. Warm, matte, no gradients."

Negative: bright colors, gradients, neon, gamification icons, fitness model photography,
          motivational slogans, blue color scheme
Style:    Landscape 16:9 ratio, editorial photography aesthetic
Notes:    DALL-E 3 handles text better than Midjourney. Verify the headline text
          renders correctly. If "Clay" appears somewhere unexpected, use image editor
          to clean.
```

### Asset 7: Waitlist Page Hero

```
Asset:    Waitlist/marketing landing page hero section
Platform: Midjourney v6

Prompt:
"Wide editorial photograph for a fitness app landing page. A man in his late 30s,
casually dressed (no athletic wear — regular clothes), sitting in a gym on a bench
between sets, looking at his phone with quiet focus. Not flexing, not posing,
not celebrating. Just a person who trains, looking at their data. The phone screen
is softly visible but not the focus. Warm gymnasium light. Matte concrete walls.
Old rubber flooring. The feeling: a serious person's tool, not a consumer product.
Cinematic, warm color grade, natural grain."

Negative: --no athletic wear branding, celebration, bright colors, studio lighting,
          stock photo aesthetics, visible six-pack, fitness poster, motivational text
Style:    --ar 16:9 --style raw --v 6.1 --stylize 400
Notes:    This is the hardest prompt to get right. The person should look like Harold —
          a real person who trains consistently, not a fitness model. Run 4 variations
          and select the most authentic. "Between sets" is the right moment.
```

### Asset 8: Social Sharing Card

```
Asset:    Social sharing card (when user shares training data from Clay)
Platform: Midjourney v6

Prompt:
"Square graphic representing a personal training data share card. Warm off-white
background. Dominant element: a sparkline graph in muted sage green showing 4 weeks
of ascending volume data — simple, no axes, no labels. Below: two lines of monospace
data: 'Volume: 21,400 lbs this week.' and 'Week 12.' Bottom right: the word 'Clay'
in small serif type in terracotta. No other text. The feeling: personal data, quietly
shared. Like showing someone your notebook, not posting a transformation photo."

Negative: --no before/after, transformation, body photo, bright colors, gradient,
          fitness motivation text
Style:    --ar 1:1 --style raw --v 6.1 --stylize 100
Notes:    Simplicity is the goal. If the output is too elaborate, reduce --stylize
          to 50 and re-run.
```

---

## Anti-Aesthetic Enforcement Summary

Every prompt above encodes the C-01 anti-rules as explicit negative parameters:
- No neon, electric blue, bright green → in every universal negative
- No gamification imagery (trophies, badges, streaks, flames) → in every negative
- No gradient backgrounds → in every negative
- No celebration visual language → in every negative
- No fitness model / aspirational body imagery → in marketing assets specifically

The Image Prompt Engineer's job is to enforce the brand's voice visually. These prompts should be run with fresh eyes — if a result produces something that "looks like a fitness app," it's wrong and should be re-run.
