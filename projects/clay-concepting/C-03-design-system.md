# Session C-03 — Design System + Screen Layouts
**Agent**: UI Designer (`design-ui-designer`)
**Input**: C-00 brief, C-01 brand identity, C-02 information architecture
**Date**: 2026-03-27

---

## Design Tokens

```
/* ── Spacing ──────────────────────────────────────── */
spacing-2:    2px    (hairline separators)
spacing-4:    4px    (tight internal padding)
spacing-8:    8px    (component internal padding)
spacing-12:   12px   (small gap between related items)
spacing-16:   16px   (standard component gap)
spacing-24:   24px   (section gap)
spacing-32:   32px   (major section gap)
spacing-48:   48px   (why-pin bottom clearance)
spacing-64:   64px   (canvas top padding, below status bar)

/* ── Type Scale ────────────────────────────────────── */
text-xs:      11px / 14px  SF Pro Regular  (metadata, set counter)
text-sm:      13px / 18px  SF Pro Regular  (whisper content, secondary labels)
text-md:      15px / 22px  SF Pro Medium   (standard body, lift names)
text-lg:      17px / 24px  SF Pro Semibold (primary labels, button text)
text-xl:      22px / 28px  SF Pro Semibold (session insight, dominant data)
text-display: 34px / 40px  Canela Regular  (Why pin text, post-session quote)
text-data:    28px / 32px  SF Mono Semibold (weight values, rep counts)

/* ── Color Tokens (from C-01) ──────────────────────── */
color-clay:       #C2865A   (primary actions, Why pin background)
color-stone:      #2C2A27   (primary text, icons)
color-canvas:     #F7F4EE   (background)
color-ash:        #8C8880   (secondary text, inactive)
color-chalk:      #E3DFD8   (dividers, secondary surfaces)
color-fired:      #6B5C4E   (emphasis, never for alerts)
color-progress:   #7A9E7E   (trend lines, volume bars — data only)
color-caution:    #C49A3C   (flagged patterns)
color-error:      #A85C4A   (errors)

/* ── Corner Radius ─────────────────────────────────── */
radius-2:    2px    (data chips, small tags)
radius-8:    8px    (set rows, input fields)
radius-12:   12px   (whisper card)
radius-full: 999px  (feel slider track)

/* ── Elevation ─────────────────────────────────────── */
/* Clay uses NO drop shadows. Depth is expressed through
   color contrast and spacing, not shadows. */
elevation-none: (default for all components)
```

---

## Core Component Specs

### Why Pin

```
Purpose:         Persistent emotional anchor — always visible (except mid-session)
Size:            Full canvas width, variable height (1–3 lines of display text)
Typography:      text-display / Canela Regular
Background:      color-clay (#C2865A)
Text color:      color-canvas (#F7F4EE)
Padding:         spacing-16 horizontal, spacing-12 vertical
Behavior:        Tapping it does nothing in v1. It is an anchor, not a button.
                 (Long-press to edit Why — v1.1 feature)
Empty state:     "Tap to add your why" in text-md / color-canvas / 60% opacity
Note:            The Clay Ochre (#C2865A) vs Caution (#C49A3C) color proximity
                 flagged in C-01 is NOT a risk here — Why pin uses full background fill,
                 caution uses text/icon only. Context makes them distinct.
```

### Set Row

```
Purpose:         Core logging interface during active session
Size:            Full canvas width, 72px height
Layout:          [Lift name — left] [Weight stepper — center-left] [Rep stepper — center-right] [Feel — right]
Weight stepper:  text-data (28px/32px SF Mono Semibold), color-stone
                 [–] button: 44×44pt tap target, color-ash icon, no border
                 [+] button: 44×44pt tap target, color-clay icon, no border
Rep stepper:     same as weight stepper
Feel slider:     Horizontal track, 5 stops, color-chalk track, color-clay thumb
                 44pt tall touch target (track is visually thinner)
                 Haptic feedback at each stop: UISelectionFeedbackGenerator
Prior set ghost: Previous set's values appear 4px below current row in text-xs/color-ash
                 This is the "shape of the previous session" from Session 01
Separator:       spacing-2 / color-chalk between set rows
```

### Hold-to-Finish Button

```
Purpose:         Prevent accidental session completion (Session 04 P0 issue)
Position:        STICKY BOTTOM — always visible during State 2 regardless of scroll position
                 This resolves the C-02 flag about off-screen finish affordance
Size:            Full canvas width, 56px height, spacing-16 bottom margin (above home indicator)
Appearance:      text-md / color-ash text: "Hold to finish"
                 Subtle fill animation: color-clay fills from left over 1.5s while held
                 Progress: visual fill shows 1.5s duration
                 Release before 1.5s: resets with ease-out, no action taken
                 Complete: canvas transitions to State 3 (Post-Session)
Haptic:          UIImpactFeedbackGenerator.style(.light) at 0.5s
                 UIImpactFeedbackGenerator.style(.medium) at 1.0s
                 UINotificationFeedbackGenerator.type(.success) at 1.5s (completion)
Accessibility:   VoiceOver: "Hold to finish workout. Press and hold for 1.5 seconds."
```

### Whisper Card

```
Purpose:         Deliver programming intelligence insight
Size:            Full canvas width, variable height (1–4 lines)
Typography:      text-sm / SF Pro Regular / color-stone — whispers should feel almost missed
Background:      color-canvas (same as background — card has no visible border or fill)
                 1px top border in color-chalk separates it from prior content
Left accent:     2px / color-fired vertical bar on left edge (subtle, not loud)
Behavior:        Tappable — expands to show source/rationale (v1.1)
                 In v1.0: non-interactive
Empty state:     Not shown if no whisper available — the canvas simply doesn't have this row
```

### 4-Week Trend Visualization

```
Purpose:         Rolling volume trend at a glance
Type:            Sparkline (not a full chart) — 4 weeks of weekly volume as connected dots
Size:            Full canvas width, 48px height
Line color:      color-progress (#7A9E7E)
Dot size:        4px diameter, filled color-progress
This week dot:   6px, filled color-clay
Background:      color-canvas (no chart background, no grid lines, no axes)
Labels:          Current week value in text-xs / SF Mono / color-stone — right-aligned
                 No other labels in v1.0 (hover/tap to see values is v1.1)
Data gaps:       If a week has zero sessions, the dot is present at zero — not missing
                 Gap line: dashed color-chalk
```

### Pre-Filled Workout Card

```
Purpose:         Show today's planned session, ready to start
Layout:          Lift list: [lift name] [planned sets × reps @ weight] — left/right
                 "Based on last session" in text-xs / color-ash — below lift list
                 Large tap area for starting session — full card width
Tap behavior:    Canvas stretches to active session (State 1 → State 2)
                 No navigation, no new screen
```

---

## Screen Layouts (ASCII Wireframes)

All widths are 390px (iPhone 15 viewport width).

### Screen 1: Dashboard — Pre-Workout State (State 1, data exists)

```
390px wide
──────────────────────────────────────────────────
  [status bar — system]

  ┌──────────────────────────────────────────────┐
  │  Get back to playing pickup ball              │  ← Why pin (Clay Ochre bg)
  │  with the kids.                               │     Canela Regular, 34px
  └──────────────────────────────────────────────┘

                                                     ← spacing-24

  Volume this month                                  ← text-sm / color-ash
  ·  ·  ·  ·——·  ◉                                  ← sparkline (4wk trend)
                  ↑ this week in Clay Ochre

                                                     ← spacing-16

  Today                                              ← text-sm / color-ash
  ─────────────────────────────────────────────────  ← 1px color-chalk
  Squat           3 × 5 @ 245 lbs                   ← text-md / color-stone
  Bench Press     3 × 5 @ 175 lbs                      pre-filled from last session
  Romanian DL     3 × 8 @ 185 lbs
  Based on last session, Mar 25.                     ← text-xs / color-ash
  ─────────────────────────────────────────────────

  [          Start session →          ]              ← text-lg / color-clay
                                                        no border, no button background

                                                     ← spacing-24

  Recovery                                           ← text-sm / color-ash
  Sleep 7h 12m  ·  HRV 52                            ← text-sm / color-stone (if HealthKit)
──────────────────────────────────────────────────
```

### Screen 2: Active Session (State 2, mid-workout)

```
390px wide
──────────────────────────────────────────────────
  [status bar — system]

  Squat  ·  Set 3 of 5                              ← text-xs / color-ash, top

                                                     ← spacing-32

  ┌──────────────────────────────────────────────┐
  │  [–]      245 lbs      [+]                    │  ← text-data (28px SF Mono)
  │  [–]        5 reps     [+]                    │     44×44pt tap targets
  └──────────────────────────────────────────────┘

                                                     ← spacing-16

  ──○──────────────────────────────               ← feel slider (1–5)
  1                             5                    text-xs / color-ash labels

                                                     ← spacing-8

  Set 2  ·  245 lbs  ·  5 reps  ·  feel 3           ← prior set ghost
                                                        text-xs / color-ash

  ─────────────────────────────────────────────────  ← spacing-16

  Bench Press     3 × 5 @ 175 lbs  (next)           ← upcoming lifts, dimmed
  Romanian DL     3 × 8 @ 185 lbs

──────────────────────────────────────────────────
  [        Hold to finish         ░░░░░░░░░ ]       ← sticky bottom, fill animation
──────────────────────────────────────────────────
```

### Screen 3: Post-Session Reshape (State 3)

```
390px wide
──────────────────────────────────────────────────
  [status bar — system]

  ┌──────────────────────────────────────────────┐
  │  Get back to playing pickup ball              │  ← Why pin returns
  │  with the kids.                               │
  └──────────────────────────────────────────────┘

                                                     ← spacing-24

  Volume this month                                  ← updated trend (includes today)
  ·  ·  ·  ·——·——◉
           ↑ today just added

                                                     ← spacing-16

  │  Your squat volume is up 12% this month.      │  ← whisper card
  │  Your sleep has been better this week —        │     text-sm / color-stone
  │  that may explain the stronger feel scores.   │     left accent: 2px color-fired

                                                     ← spacing-24

  Today                                              ← session summary
  ─────────────────────────────────────────────────
  Squat           3 × 5 @ 245 lbs  ✓               ← completed, no celebration
  Bench Press     3 × 5 @ 175 lbs  ✓                  just a checkmark in color-ash
  Romanian DL     3 × 8 @ 185 lbs  ✓
  ─────────────────────────────────────────────────
  Total: 12 sets  ·  21,400 lbs volume              ← text-xs / color-ash
──────────────────────────────────────────────────
```

### Screen 4: Cold-Start (State 0 — No Data)

```
390px wide
──────────────────────────────────────────────────
  [status bar — system]

  ┌──────────────────────────────────────────────┐
  │  What do you want to be able to do?           │  ← Why prompt, Canela Regular
  └──────────────────────────────────────────────┘

  [type your why here...]                            ← text input, text-md / color-ash

  Clay tracks your training, not your health.        ← disclaimer line (Loop 2 resolution)
  It's not a doctor. What's driving you?             ← text-sm / color-ash, below input


                                                     ← spacing-32

  ─────────────────────────────────────────────────
  First session                                      ← text-sm / color-ash
  Squat           3 × 5 @ bodyweight                ← conservative first session
  Bench Press     3 × 5 @ bodyweight                   from onboarding answers
  Deadlift        1 × 5 @ bodyweight
  Let's get your first session in so Clay           ← contextual line from S09 Loop 4
  can start learning your shape.                      text-sm / color-ash

  ─────────────────────────────────────────────────
  [          Start session →          ]
──────────────────────────────────────────────────
```

---

## P0 Issues from Phase 1 — Resolved

| P0 Issue | Resolution |
|---|---|
| Accidental "one-tap finish" | Hold-to-Finish with 1.5s visual fill + haptic progression — cannot be triggered accidentally |
| Dashboard "biggest element" must be learnable | 7-rule priority system from C-02; reflected in layout — pre-filled workout is default dominant, insight promotes when available |
| Cold-start fallback undefined | State 0 designed explicitly above — smaller canvas, Why prompt + first session |

---

## Cross-Pollination Flag (for C-09)

- **Hold-to-Finish sticky bottom**: confirmed sticky (resolves C-02 flag about off-screen risk)
- **Completion checkmarks**: used color-ash (not color-progress, not color-clay) to avoid any "achievement" visual connotation. One-character, no animation. Pass to Narrative Designer to confirm editorial alignment.
- **"Tap to add your why" empty state**: confirm with Narrative Designer (C-04) that this is the right copy — it's functional but needs voice-check.
