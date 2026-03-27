# Session C-05 — Visual Mockup Direction
**Agent**: Visual Storyteller (`design-visual-storyteller`)
**Input**: C-01 brand identity, C-02 IA, C-03 design system, C-04 voice system
**Date**: 2026-03-27

---

## The Story Before the Screens

Most fitness apps tell a story of transformation. Big before-and-after. Visible progress. Dramatic change. Clay tells a different story: **the story of showing up, consistently, for years, for your own reasons**. There's no climax. There's just the accumulation of shape.

That's the story the visuals need to tell. Not dramatic. Not aspirational in the celebrity-endorsement sense. Quietly serious. Like the difference between a gym that smells like rubber and chalk versus a boutique fitness studio with neon signs.

---

## Key Moment Storyboard

### Moment 1: First Launch (The Empty Canvas Becomes Real)

```
Context:     Harold opens Clay for the first time. He has Apple Watch, Oura.
             He grants HealthKit in 2 taps.

Screen state: State 0 → the dashboard fills with his data.

Visual:       Before: The canvas is small — just the Why prompt in Canela against Warm White.
              The prompt reads: "What do you want to be able to do?"
              Harold types: "Play pickup ball with my kids without getting winded."

              After: The Why pin clicks into place (Clay Ochre, Canela Regular).
              Below it — live data emerges. Sleep: 7h 14m. HRV: 58. Resting HR: 54.
              A first workout appears, pre-filled. Conservative. Real.
              The line: "Let's get your first session in so Clay can start learning your shape."

Emotional beat: Surprise that it already knows things. Relief that it doesn't ask 20 questions.
               The product keeps its promise — live dashboard before the first set.
```

### Moment 2: Mid-Session (The Canvas Is Working)

```
Context:     Harold is 3 weeks in. Third squat session of the week. Lunch break.
             He has 35 minutes. He opens Clay standing in the gym.

Screen state: State 2 (Active Session)

Visual:       The set row fills the screen. 245 lbs. 5 reps. The feel slider rests at 3.
              Below: the ghost of his last set — 245 / 5 / feel 3. Same.
              The canvas is dense but not cluttered. Everything is in the right place.
              The Hold to Finish bar sits at the bottom, dormant.
              His phone screen does not glow with color. It looks like a well-made tool.

Emotional beat: No friction. The app does exactly what he needs and nothing else.
               He doesn't think about the app. He thinks about the lift.
```

### Moment 3: The First Whisper (The App Earns Trust)

```
Context:     Harold has been logging for 6 weeks. Ladder cycle. Week 12 approaching.

Screen state: State 1 (Dashboard, post-session from yesterday)

Visual:       The dashboard has settled. Trend sparkline shows 4 weeks of data,
              a slight plateau in the last 2 dots.
              A whisper card appears — understated, 1px chalk border, 2px fired left accent:

              "Your top-set weight has been flat for three weeks.
               This is a common inflection point in ladder models."

              That's it. No call to action. No "learn more" button. Just the observation.

Emotional beat: Harold reads it twice. It's the thing he suspected but couldn't name.
               The app knows his program. It understands the cycle.
               This is the moment he decides he's not switching apps.
```

### Moment 4: The Canvas Reshapes (Session Complete)

```
Context:     Harold finishes a session. He presses and holds the finish bar.
             The fill animation completes. One haptic pattern. Done.

Screen state: State 2 → State 3 (Post-Session)

Visual:       The set controls fade. The Why pin descends from above back into view.
              The updated sparkline appears — today's dot joins the line.
              The insight surfaces: "Volume up 8% this week. Your why just got closer."
              The session summary below — three lifts, checkmarks in ash. Quiet. Earned.
              No confetti. No "Great work!" overlay. Just the canvas, in a new shape.

Emotional beat: Quiet satisfaction. The kind that doesn't need to be celebrated loudly
               because it was real. The canvas holds the shape of what just happened.
```

### Moment 5: The Rest Day (The App Doesn't Guilt You)

```
Context:     Harold missed yesterday's session. Life happened. He opens Clay.

Screen state: State 4 (Rest Day)

Visual:       The canvas is lighter than usual. The Why pin at top.
              Readiness score: 71. Sleep: 7h 58m. Resting HR: 52. Good numbers.
              No notification badge. No "You missed your workout!" banner.
              Just: "Next session: Squat, Bench, Romanian DL. When you're ready."
              The momentum indicator (if present after 4 weeks): "Back to it."
              Not "back on track" (implies falling off). Just: "Back to it."

Emotional beat: Harold exhales. The app didn't punish him. It just waited.
               This is when he recommends it to someone.
```

---

## Visual Mood Direction

```
Light quality:    Late afternoon, indirect. The kind of light that makes a gym look
                  like a workshop instead of a stage. Not dramatic. Not clinical.
                  Warm. Functional.

Weight:           Substantial. The app feels like it has mass. Typography sits on the
                  canvas, not floating above it. Data doesn't dance — it stays put.

Motion character: Deliberate and unhurried. Nothing snaps. The stretch from dashboard
                  to session takes 280ms because it should feel considered, not instant.
                  The flow-back takes 400ms because settling is slower than reaching.

Texture:          Matte. No reflections, no gradients, no blur effects. The canvas is
                  a surface you press into, not a window you look through.

Atmosphere:       A gym locker room where serious people train, not a boutique studio.
                  A good notebook, not a productivity app. A professional's tool.
```

---

## App Store Narrative (Screenshot Sequence)

```
Screenshot 1 — The Hook:
  The post-session screen. Sparkline, whisper card, Why pin.
  Overlay text: "Your training, understood."
  Anti-text: NOT "Track smarter." NOT "Level up." NOT "Crush your goals."

Screenshot 2 — The Differentiator:
  Dashboard pre-workout state. Clean, warm, alive with real data.
  Overlay text: "No streaks. No badges. No noise."
  Note: show the absence as the feature. This is what makes Harold stop scrolling.

Screenshot 3 — The Intelligence:
  Close-up on a whisper card. The exact text visible.
  Overlay text: "A coach who knows your program."

Screenshot 4 — The Canvas:
  The stretch animation mid-transition (captured at the midpoint, dashboard
  and session coexisting in one fluid moment).
  Overlay text: "One canvas. Your whole session."

Screenshot 5 — The Why:
  The Why pin in Clay Ochre, Canela text, Harold's actual Why.
  Overlay text: "Start with why you're here."
```

---

## What Clay Is NOT (Negative Visual References)

```
NOT Fitbod:        Blue gradients, grid of exercise cards, tab navigation.
                   Clay is warm earth tones, one canvas, no tabs.

NOT Strong app:    White-dominant, data-heavy grid, table structure.
                   Clay is warm, canvas-based, sparing with data density.

NOT Apple Fitness+: Large hero images, fitness model photography, bright video thumbnails.
                    Clay is typography and data, no photography in the UI.

NOT MyFitnessPal:  Green progress bars, calorie rings, gamified streaks.
                   Clay has no rings, no bars filling up, no color for achievement.

NOT Nike Training: Motivational copy, large type, "YOU'VE GOT THIS" energy.
                   Clay's copy is text-sm, specific, evidential, never motivational.
```
