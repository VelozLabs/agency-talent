# Session C-07 — Prototype Specification
**Agent**: Rapid Prototyper (`engineering-rapid-prototyper`)
**Input**: C-02 IA, C-03 design system, C-05 visual direction
**Phase**: 2 — Concepting

---

## Agent Directive

Produce the engineer-ready specification for the prototype. This is not functional code — it is a precise description of what to build, detailed enough that an iOS/mobile engineer can begin Sprint 2 without asking design questions.

---

## Deliverables

### 1. Canvas Animation Spec

```
Transition: [PLACEHOLDER — name]
Trigger:    [PLACEHOLDER — user action]
Duration:   [PLACEHOLDER — ms]
Easing:     [PLACEHOLDER — curve name or cubic-bezier values]
Elements:   [PLACEHOLDER — what moves, what stays, what fades]
iOS API:    [PLACEHOLDER — UIKit/SwiftUI animation approach]
```

### 2. Gesture Spec

```
Gesture:    [PLACEHOLDER — name, e.g., "pinch-to-compress"]
Input:      [PLACEHOLDER — gesture type, finger count, direction]
Threshold:  [PLACEHOLDER — minimum input to trigger]
Feedback:   [PLACEHOLDER — haptic, visual, or both]
Result:     [PLACEHOLDER — what changes in the app state]
Cancel:     [PLACEHOLDER — how to undo/dismiss]
```

### 3. Component Interaction Specs

For each interactive component from C-03:

```
Component:    [PLACEHOLDER]
Default state: [PLACEHOLDER]
Tap behavior: [PLACEHOLDER]
Long-press:   [PLACEHOLDER]
Haptic:       [PLACEHOLDER — UIImpactFeedbackGenerator style]
Animation:    [PLACEHOLDER]
```

### 4. Engineer Handoff Checklist

Before an engineer begins Sprint 2, confirm:
- [ ] All design tokens defined (from C-03)
- [ ] All canvas states defined (from C-02)
- [ ] All transitions specified (above)
- [ ] All gesture specs defined (above)
- [ ] Whisper delivery logic specified (from Phase 1 Session 09 Loop 1)
- [ ] Cold-start data model defined (from Phase 1 Session 09 Loop 4)
- [ ] Editorial filter documented (from Phase 1 Session 09 Loop 5)
- [ ] Legal disclaimer copy finalized (from Phase 1 Session 09 Loop 2)
- [ ] HealthKit permission flow designed (from C-03/C-04)

Any unchecked item is a blocker for Sprint 2 start.
