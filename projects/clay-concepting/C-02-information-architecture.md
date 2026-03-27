# Session C-02 — Information Architecture + Canvas Structure
**Agent**: UX Architect (`design-ux-architect`)
**Input**: C-00 brief, C-01 brand identity, clay-fitness-planning/session-04-ux-research.md
**Date**: 2026-03-27

---

## Framing: Structure as the Anti-Puddle

Session 01 of the ideation phase identified the key structural risk: "if the clay is too moldable, it becomes a puddle." My job is to define the invisible bones — the structural rules that make the canvas feel organic without being formless.

The canvas has four states. Each state has a dominant element, secondary elements, and hidden elements. Transitions between states are deliberate and defined. Nothing is random.

---

## Canvas State Machine

### State 0: Cold Start (Day 1, No Session Data)

**Entry trigger**: First app launch, HealthKit granted or denied, zero logged sessions
**Exit trigger**: User taps "Start Session" → State 2 (Active Session)

```
Dominant element:   Why pin (full-size, centered vertically in upper third)
Secondary elements: First workout suggestion (pre-filled from onboarding answers)
                    Single contextual line: "Let's get your first session in so
                    Clay can start learning your shape."
Hidden elements:    Trend visualization (no data)
                    Fitness score (no data)
                    Readiness (no data)
                    Momentum indicator (no data)
Canvas size:        Smaller than Day 30 canvas — this is intentional and honest
```

**Design principle**: The cold-start canvas does not apologize for being small. It is 100% real. The Why and one workout is an honest Day 1. The canvas grows with the user.

---

### State 1: Pre-Workout (Dashboard — data exists)

**Entry trigger**: App open, no active session, at least one prior session logged
**Exit trigger**: User taps "Start Session" → State 2 (Active Session)

```
Dominant element:    [Changes based on priority rules — see "Biggest Element Logic" below]
Secondary elements:  4-week volume trend (always visible when data exists)
                     Today's pre-filled workout (always visible)
                     Why pin (always at top — structural anchor)
                     Readiness/sleep score (if HealthKit data available)
Hidden elements:     Active session controls (+/–, feel slider)
                     Post-session insight
Canvas height:       Full — scrollable if content exceeds screen
```

---

### State 2: Active Session (Mid-Workout)

**Entry trigger**: User taps "Start Session" from State 1
**Exit trigger**: User triggers "Hold to Finish" → State 3 (Post-Session)
**Interruption handling**: Phone call, app backgrounded → state preserved silently, no data loss

```
Dominant element:    Current set row (weight + reps + feel slider) — large, center-heavy
Secondary elements:  Previous set (ghost below current, slightly dimmed)
                     Set counter (e.g., "Set 3 of 5" — small, top)
                     Workout name / current lift name — small, top
                     "Hold to Finish" affordance — bottom, understated
Hidden elements:     Why pin (temporarily invisible — not needed mid-session)
                     Trend visualization
                     Readiness score
Canvas behavior:     Dashboard did not navigate away — it stretched forward.
                     The URL is the same canvas. The visual weight shifted.
```

---

### State 3: Post-Session (Dashboard Reshapes)

**Entry trigger**: User completes "Hold to Finish" from State 2
**Exit trigger**: User opens app next time → returns to State 1
**Duration**: This state persists until the next app open

```
Dominant element:    Session insight (first whisper if intelligence fires, otherwise
                     volume delta: "Volume up 8% this week.")
Secondary elements:  Updated 4-week trend (now includes today's session)
                     Why pin (returns to top)
                     Summary line (total volume, top set weight, sets completed)
Hidden elements:     Active session controls
Canvas behavior:     The canvas flows back — the active session state contracts,
                     the dashboard elements settle into their new positions.
                     Duration: 400ms total, ease-out.
```

---

### State 4: Rest Day

**Entry trigger**: App opened on a day with no session logged and prior session was >18 hours ago
**Exit trigger**: User taps "Start Session" → State 2, or next calendar day

```
Dominant element:    Readiness/sleep score (if available) — or trend if no readiness data
Secondary elements:  Why pin (top, always)
                     Next session preview (what's planned based on the pattern)
                     Momentum indicator (only shown after 2+ weeks of data)
Hidden elements:     Active session controls
Canvas behavior:     Calm, reduced density — this is intentional. Rest days should
                     feel lighter than training days.
```

---

## Anchor Points (Never Move)

These elements are fixed in position regardless of canvas state:

```
Anchor 1: Why pin
  Position: Top of canvas, below system status bar
  Behavior: Always visible except during active session (State 2) where it
            temporarily recedes to make room for the logging interface
  Purpose:  Emotional anchor — the user always knows why they're here

Anchor 2: Canvas baseline
  Position: The visible bottom of the canvas
  Behavior: The canvas scrolls; the bottom is not a nav bar. No persistent
            footer. The canvas ends where the content ends.
  Purpose:  Prevents the UI from feeling like a "page" with fixed furniture
```

---

## "Biggest Element" Logic (Priority Rules)

This resolves the Session 04 P0 issue: the algorithm must be learnable, not black-box.

The dominant element is determined by this ordered priority list:

```
Priority 1: Active set row (if State 2 — always dominates during session)
Priority 2: Post-session insight (if State 3 and insight is available)
Priority 3: Volume delta (if today's trend diverges >10% from 4-week average)
Priority 4: Readiness score (if score is <60 — low readiness is high priority)
Priority 5: Today's pre-filled workout (default pre-workout dominant element)
Priority 6: 4-week trend visualization (fallback when nothing else triggers)
Priority 7: Why pin expansion (cold start State 0 only)
```

**Why this is learnable**: The rules follow a simple mental model — "the thing that needs my attention most right now is biggest." After 2–3 weeks of use, Harold will predict correctly which element is dominant before he opens the app. That's the goal.

---

## Transition Specifications

### Dashboard → Active Session (State 1 → State 2)

```
Trigger:         Tap "Start Session"
Metaphor:        Stretch forward — the canvas extends toward the user
Visual:          The pre-filled workout expands to fill the screen.
                 Why pin slides up and out of view.
                 Trend and readiness fade out.
                 Set row rises to center position.
Duration:        280ms
Easing:          ease-in-out (cubic-bezier 0.4, 0.0, 0.2, 1.0)
Haptic:          UIImpactFeedbackGenerator.style(.medium) on trigger
```

### Active Session → Post-Session (State 2 → State 3)

```
Trigger:         "Hold to Finish" completes (1.5s hold)
Metaphor:        Flow back — the canvas settles into its new shape
Visual:          Set controls fade out.
                 Why pin descends from top back into view.
                 Insight text fades in at center.
                 Updated trend slides up from below.
Duration:        400ms
Easing:          ease-out (cubic-bezier 0.0, 0.0, 0.2, 1.0)
Haptic:          UINotificationFeedbackGenerator.type(.success) on completion
                 — one distinct pattern, never repeated, not celebratory
```

### Post-Session → Dashboard (State 3 → State 1)

```
Trigger:         Next app open (no animation needed — state change between sessions)
Visual:          Dashboard loads directly in State 1. No transition required.
```

---

## Component Hierarchy

### Structural layer (always present)

- Canvas container (scrollable, no fixed nav)
- Why pin (anchor)
- System status bar accommodation

### Content layer (state-dependent)

- Trend visualization component (line chart, 4-week)
- Readiness score component (circular, single number)
- Momentum indicator (text-only)
- Whisper card (text, no icon)
- Session summary component (post-session)

### Interactive layer (state-dependent)

- Pre-filled workout card (tappable → launches session)
- Set row (weight stepper + rep stepper + feel slider)
- Set counter (non-interactive, informational)
- "Hold to Finish" affordance (long-press button)
- Lift row (shows lift name, prior session context)

---

## Cross-Pollination Check

- **C-01 anti-rule "no card-based layouts"**: The pre-filled workout is a "card" visually but it is not a navigation destination — tapping it launches the session in-place (the canvas stretches). Must ensure C-03 UI Designer does not implement this as a navigating card.
- **Session 04 P0 "biggest element logic must be learnable"**: Resolved above with the 7-rule priority system.
- **Session 09 Loop 4 (cold-start fallback)**: Cold-start state (State 0) is now defined and explicit.

**Flag for C-09 Feedback Loops**: The "Hold to Finish" affordance needs a visual design decision — does it live at the bottom of the canvas (scrollable) or is it always visible during State 2? If the session is long and the user has scrolled down through many sets, the finish affordance may be off-screen. This is a UX risk. Route to C-03 UI Designer.
