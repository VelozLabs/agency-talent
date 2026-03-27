# Session C-07 — Prototype Specification
**Agent**: Rapid Prototyper (`engineering-rapid-prototyper`)
**Input**: C-02 IA (state machine), C-03 design system (tokens + components), C-05 visual direction
**Date**: 2026-03-27

---

## Engineering Handoff Philosophy

This spec is written for a Swift/SwiftUI engineer beginning Sprint 2. It is not a Figma file — it is a precise written description of what to build. Every interaction, every animation, every component state is defined here. No design questions should remain after reading this document.

---

## Canvas Animation Specs

### Transition 1: Dashboard → Active Session (State 1 → State 2)

```
Name:         session-launch
Trigger:      Tap "Start session →" in pre-filled workout card
Duration:     280ms
Easing:       cubic-bezier(0.4, 0.0, 0.2, 1.0)  (Material standard ease-in-out)
SwiftUI API:  .animation(.spring(response: 0.28, dampingFraction: 0.85), value: sessionState)

Elements and behavior:
  Why pin:               slides UP and out of frame (translateY: -100%)
                         Starts: 0ms  Duration: 180ms  Easing: ease-in
  Trend sparkline:       fades OUT
                         Starts: 0ms  Duration: 140ms  Easing: ease-in
  Pre-filled workout:    fades OUT
                         Starts: 0ms  Duration: 140ms  Easing: ease-in
  Set row:               fades IN and translates UP to center position
                         Starts: 80ms  Duration: 200ms  Easing: ease-out
  Set counter:           fades IN at top
                         Starts: 100ms  Duration: 160ms  Easing: ease-out
  Hold-to-Finish bar:    fades IN at bottom (sticky, already positioned)
                         Starts: 120ms  Duration: 160ms  Easing: ease-out

Haptic:       UIImpactFeedbackGenerator(style: .medium).impactOccurred()
              Fire on tap, before animation begins
```

### Transition 2: Active Session → Post-Session (State 2 → State 3)

```
Name:         session-complete
Trigger:      Hold-to-Finish completes (1.5s hold fills)
Duration:     400ms
Easing:       cubic-bezier(0.0, 0.0, 0.2, 1.0)  (ease-out — settling, not snapping)
SwiftUI API:  .animation(.spring(response: 0.4, dampingFraction: 0.9), value: sessionState)

Elements and behavior:
  Set row:               fades OUT, translates DOWN slightly (4px)
                         Starts: 0ms  Duration: 200ms  Easing: ease-in
  Set counter:           fades OUT
                         Starts: 0ms  Duration: 150ms  Easing: ease-in
  Hold-to-Finish bar:    slides DOWN and out of frame
                         Starts: 0ms  Duration: 200ms  Easing: ease-in
  Why pin:               slides DOWN from top, fades IN
                         Starts: 100ms  Duration: 240ms  Easing: ease-out
  Session insight:       fades IN at center
                         Starts: 160ms  Duration: 240ms  Easing: ease-out
  Updated sparkline:     fades IN, today's dot animates from previous position
                         Starts: 200ms  Duration: 200ms  Easing: ease-out
  Session summary:       fades IN below insight
                         Starts: 240ms  Duration: 160ms  Easing: ease-out

Haptic sequence:
  At hold start (0ms):       UIImpactFeedbackGenerator(style: .light).impactOccurred()
  At 0.5s:                   UIImpactFeedbackGenerator(style: .light).impactOccurred()
  At 1.0s:                   UIImpactFeedbackGenerator(style: .medium).impactOccurred()
  At 1.5s (complete):        UINotificationFeedbackGenerator().notificationOccurred(.success)
  Note: This haptic sequence is the ONLY "celebration" in Clay. It is tactile, not visual.
```

---

## Gesture Specs

### Hold-to-Finish Gesture

```
Gesture type:     Long press (UILongPressGestureRecognizer / SwiftUI .onLongPressGesture)
Duration:         1.5 seconds to complete
Minimum press:    0.0 seconds (begins tracking immediately)
Cancel behavior:  Release before 1.5s → fill resets with ease-out over 300ms
                  No action is taken, no state changes

Visual feedback:
  Fill color:    color-clay (#C2865A)
  Fill direction: left-to-right
  Fill timing:   linear (the fill represents time elapsed — must be linear)
  Height:        56px total component height
  Text:          "Hold to finish" fades from color-ash to color-stone as fill progresses

SwiftUI implementation hint:
  Use a custom ViewModifier with a timer that updates a @State progress: CGFloat (0.0–1.0)
  Animate the fill using GeometryReader on a Rectangle overlay with width = progress * totalWidth
  On completion (progress == 1.0): trigger state transition with haptic
```

### Feel Slider

```
Gesture type:     Drag (SwiftUI Slider or custom drag gesture)
Track length:     Full available width minus 32px (16px each side)
Stops:            5 discrete stops (1, 2, 3, 4, 5)
Snap behavior:    Snaps to nearest stop on release
Haptic:           UISelectionFeedbackGenerator().selectionChanged() on each stop change
                  — fires on snap, not on continuous drag

Visual:
  Track:         color-chalk, 4px height, radius-full
  Thumb:         16px diameter circle, color-clay fill, no border, no shadow
  Active track:  color-fired, same height — fills from left to thumb position
  Labels:        "1" and "5" in text-xs/color-ash at track ends

Accessibility:
  VoiceOver:     "Feel rating. 1 to 5. Currently [value]."
  Increment:     Accessible increment/decrement actions (+1, –1)
```

### Weight and Rep Steppers (+/– Buttons)

```
Interaction:  Tap for single increment/decrement
              Long-press + hold for continuous change (fires every 0.15s)
              Double-tap for custom entry (keyboard input) — v1.1 only

Tap target:   44×44pt minimum — critical for gym use with gloves
Visual:       No button border, no background fill
              "–" icon in color-ash (inactive feel)
              "+" icon in color-clay (active feel)
              The value between them in text-data (SF Mono Semibold 28px)

Haptic:       UIImpactFeedbackGenerator(style: .light).impactOccurred() on each tap
              UISelectionFeedbackGenerator().selectionChanged() on continuous hold

Weight increments:
  Standard:     2.5 lb per tap
  Fine:         1.25 lb (accessible via double-tap on stepper — v1.1)
  Kg mode:      1.25 kg per tap (user preference — v1.1)

Rep increments:
  Standard:     1 rep per tap
  No minimum:   Can go to 0 reps (failed/no-rep logging)
```

---

## Component Interaction Specs

### Why Pin

```
Default state:  Shows Why text in Canela Regular, text-display, color-canvas on color-clay
Tap:            No action in v1.0 (non-interactive)
Long-press:     No action in v1.0 (edit Why is v1.1)
Accessibility:  VoiceOver reads text as: "Your why: [why text]"
Empty state:    If Why is not set: "What do you want to be able to do?" in text-md/color-canvas/60%
                Tap on empty state → opens Why entry flow
```

### Whisper Card

```
Default state:  1px color-chalk top border, 2px color-fired left accent, no background fill
Tap:            No action in v1.0 (tap-to-expand is v1.1)
Animation:      Fades in from 0% opacity over 300ms (ease-out) on first appearance
                No subsequent animation (it's not a notification — it's information)
Dismissal:      Not dismissible in v1.0. It stays until the next whisper replaces it.
Accessibility:  VoiceOver: "Training insight: [whisper text]"
```

### Sparkline (4-Week Trend)

```
Interaction:   Non-interactive in v1.0
               (Tap-to-expand full history is v1.1)
Animation:     On post-session reshape: today's dot animates from its y=0 position to
               its actual y position over 400ms (ease-out spring)
               This is the only element in the post-session transition that has its own
               internal animation beyond the fade

Data handling: If a week has 0 sessions, dot is rendered at y=0 (bottom of chart area)
               Line to zero-week dot is dashed (color-chalk, 1px)
               This is honest about gaps rather than hiding them
```

---

## Engineer Handoff Checklist

Before Sprint 2 begins, confirm all items are provided to the iOS engineer:

**From C-03 Design System**:
- [x] All design tokens (spacing, type, color, radius) — defined in C-03
- [x] Core component visual specs (Why pin, set row, hold-to-finish, whisper card, sparkline) — C-03

**From C-02 Information Architecture**:
- [x] All canvas states defined (States 0–4) — C-02
- [x] "Biggest element" priority rules (7 rules) — C-02
- [x] All anchor points — C-02

**From this session (C-07)**:
- [x] All transition animations (duration, easing, element behavior) — above
- [x] All gesture specs (hold-to-finish, feel slider, steppers) — above
- [x] All component interaction specs — above

**From Phase 1 Session 09 (Feedback Loops)**:
- [x] Whisper delivery architecture (delivery log, query, personalization) — S09 Loop 1
- [x] Cold-start data model (State 0 event log baseline) — S09 Loop 4
- [x] Editorial Filter (9 rules) — S09 Loop 5

**From C-04 Voice System**:
- [x] All onboarding copy strings — C-04
- [x] All UI string labels — C-04
- [x] All empty state copy — C-04
- [x] Auto-adjustment confirmation copy — C-04

**From C-06 Image Prompts**:
- [ ] AI-generated mockup images (to be run and selected before Sprint 2 handoff)
      Assets 1–5 (in-app screens) must be finalized for reference

**Legal/Compliance**:
- [x] Medical disclaimer copy (one sentence, in Clay voice) — S09 Loop 2, implemented in C-04
- [x] Privacy Policy and ToS — to be drafted by legal counsel before App Store submission

**Outstanding item**: The HealthKit permission flow screen is designed (C-03/C-04) but the exact system prompt description text (`NSHealthShareUsageDescription`) has not been finalized. This string must be drafted, pass the Editorial Filter, and be included in the Info.plist before submission.

---

## What This Spec Does NOT Cover (Phase 3: Specification)

- The programming classifier implementation (Core ML model, training data pipeline)
- The whisper library content (500+ editorial strings)
- The lift taxonomy database
- CloudKit sync architecture
- HealthKit write-back implementation details
- In-app purchase StoreKit integration

These are Phase 3 (Specification) items. The engineer should not wait for them to begin Sprint 2 — the canvas UX, set logging, and HealthKit read can be built against this spec immediately.
