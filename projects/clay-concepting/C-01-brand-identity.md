# Session C-01 — Brand Identity
**Agent**: Brand Guardian (`design-brand-guardian`)
**Input**: C-00 brief, clay-fitness-planning/session-01-ideation.md (voice principles)
**Date**: 2026-03-27

---

## Starting Point: The Metaphor as Material

The product is named Clay. Clay is not a metaphor for softness or flexibility alone — it's a metaphor for **material with memory**. Clay holds the shape you give it. Press it and it remembers. Heat it and it hardens permanently. Work it and it becomes something.

That's the visual language we're building from. Not smooth, not glossy, not neon. Not the blue-and-white sterile palette of a medical device. Not the electric gradients of a fitness app trying to feel fast. Something with **weight**, **warmth**, and **permanence**.

---

## Metaphor Translation

**Material properties of clay that translate to screen**:

| Property | Material Reality | Screen Translation |
|---|---|---|
| Temperature | Warm — clay is body temperature when worked | Warm neutrals in the palette; no cold blues |
| Texture | Matte — clay has no sheen until glazed | Flat surfaces, no gradients, no glass morphism |
| Weight | Substantial — clay has presence | Dense typography weight; UI components feel grounded |
| Memory | Clay holds impressions | Persistent elements (Why pin) feel literal, not decorative |
| Movement | Clay deforms slowly, settles deliberately | Animations ease-in, never snap |
| Color before firing | Earthen — ochre, terracotta, stone, raw umber | The palette draws from unglazed pottery |

---

## Color System

### Primary Palette

```
Clay Ochre       #C2865A    Warm amber-brown. The "clay" color. Used for primary actions,
                            the Why pin, key data points. Never used for celebration.

Stone            #2C2A27    Near-black with warmth. Primary text, icons, structural elements.
                            Not pure black — it has the warmth of fired clay.

Warm White       #F7F4EE    Off-white canvas. The background. Warm, not clinical.
                            The surface everything sits on.
```

### Neutral Palette

```
Ash              #8C8880    Medium neutral. Secondary text, borders, inactive states.
Chalk            #E3DFD8    Light neutral. Dividers, secondary surfaces, subtle backgrounds.
Fired            #6B5C4E    Deep warm brown. Used sparingly for emphasis, never for alerts.
```

### Semantic Colors

```
Progress         #7A9E7E    Muted sage green. Used ONLY for data — trend lines, volume bars.
                            Never for achievement or celebration.

Caution          #C49A3C    Warm amber-yellow. Used for flagged patterns (accommodation stall).
                            Not alarming — informational.

Error            #A85C4A    Muted terracotta red. For actual errors (sync failed, data missing).
                            Same family as Clay Ochre — feels like the same material.
```

### Anti-Colors (explicitly banned)

```
Electric blue (#0066FF and variants)  — Reads as "fitness app template"
Neon green (#00FF66)                  — Gamification signal
Bright red (#FF0000)                  — Alarm/danger; wrong emotional register
Pure white (#FFFFFF)                  — Clinical; wrong warmth
Pure black (#000000)                  — Too stark; loses the warmth
Gradient backgrounds                  — Decorative; incompatible with the material metaphor
```

---

## Typography

### Display Typeface: **Canela** (or System fallback: Georgia)

```
Use case: The "Why" pin, session complete moment, key insight display
Weight: Regular (400) — never bold for display; the weight comes from size, not weight
Character: Slightly editorial, slightly literary — reads like a handwritten note, not a headline
Anti-treatment: No all-caps. No letter-spacing. Never used for data.
```

### Body Typeface: **SF Pro** (system iOS) with custom weight distribution

```
Use case: All UI text, data labels, button labels, whisper content
Weights used: Regular (400) for body, Medium (500) for labels, Semibold (600) for primary data
Character: Functional, clear, invisible — the typeface never competes with the data
Anti-treatment: No light weights (300 or below) — loses legibility at gym distance
```

### Mono Typeface: **SF Mono** (system iOS)

```
Use case: Weight values (225 lbs), rep counts (8), set numbers (Set 3/5)
Character: Numbers should look like numbers — mono ensures alignment in columns
Anti-treatment: Never used for narrative text or whispers
```

### Type Anti-Rules

1. No all-caps text — anywhere in the app. Reads as aggression.
2. No text shadows or embossing.
3. No type on colored backgrounds except the Why pin (Clay Ochre + Warm White text).
4. Whisper text never exceeds text-sm in size — whispers should feel like they were almost missed.
5. Primary data (weight, reps) is always mono. Everything else is SF Pro.

---

## Design Anti-Rules

The voice is defined by what it refuses. These are non-negotiable:

1. **No achievement iconography**: no trophies, no medals, no fire flames, no lightning bolts, no stars. Zero. These symbols say "game," not "training tool."

2. **No streak indicators**: no calendar heatmaps, no "X days in a row," no chain graphics. These are explicitly excluded per the product brief.

3. **No celebration colors or animations**: completion of a session does not trigger confetti, color flash, or burst animation. The canvas reshapes — quietly, deliberately.

4. **No gradient backgrounds**: gradients read as decorative. Clay's surfaces are flat. Movement happens in the content, not the container.

5. **No card-based layouts**: everything lives on one continuous canvas. Cards imply navigation. If something looks like a tappable card that takes you somewhere else, it's wrong.

6. **No pill-shaped buttons with drop shadows**: reads as "app template." Primary actions sit directly on the canvas with sufficient tap area, not inside decorated containers.

7. **No loading animations shaped like progress**: spinners are fine. Progress bars that fill up (implying achievement) are not.

---

## Brand Voice Alignment

The Editorial Filter from session-09 Loop 5 has 9 rules. Every visual decision reinforces at least one:

| Editorial Rule | Visual Reinforcement |
|---|---|
| No celebration language | No celebration colors, no animation on completion |
| No streaks/gamification | No calendar heatmaps, no badge iconography |
| Honest about data limits | Empty states are minimal and plain, not illustrated with "no data yet" characters |
| Present tense, direct | UI labels are short, declarative, never cute |
| No hype | No gradient hero images, no bold exclamation marks in the layout |

---

## Cross-Pollination Check

- C-00 constraint "no tab navigation" → confirmed: no tab bar, no bottom navigation. The canvas IS the navigation.
- C-00 constraint "anti-color rule" → confirmed: the color system has an explicit anti-colors list.
- Session 01 voice principle "honest adult" → confirmed: the typography is functional, the palette is warm but not playful, nothing is decorative without purpose.

**One flag for C-09 Feedback Loops**: The Clay Ochre (#C2865A) used for the Why pin is also visually close to the Caution amber (#C49A3C). Under some lighting conditions on OLED screens these may read as the same color. The UI Designer (C-03) should verify these are sufficiently distinct in the component contexts where they're used.
