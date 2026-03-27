# Session C-02 — Information Architecture + Canvas Structure
**Agent**: UX Architect (`design-ux-architect`)
**Input**: C-00 brief, C-01 brand identity
**Phase**: 2 — Concepting

---

## Agent Directive

Your job is to make the product's UX structure explicit and unambiguous before any pixel is designed. You are building the skeleton — the state machine, the anchor points, the transition logic — that prevents the canvas from becoming a "puddle" (no structure) or a "grid" (too rigid).

---

## Deliverables

### 1. Canvas State Machine

Define every state the interface can be in and what triggers transitions between them.

```
State:          [PLACEHOLDER — e.g., "Pre-workout (dashboard)"]
Trigger in:     [PLACEHOLDER — what causes entry to this state]
Trigger out:    [PLACEHOLDER — what causes exit to this state]
Dominant element: [PLACEHOLDER — what is largest/most prominent]
Secondary elements: [PLACEHOLDER — what is visible but secondary]
Hidden elements: [PLACEHOLDER — what is not shown in this state]
```

Repeat for all states.

### 2. Anchor Points

List every fixed element — things that never move regardless of canvas state.

```
Anchor 1: [PLACEHOLDER — name, position, purpose]
Anchor 2: [PLACEHOLDER]
...
```

### 3. Transition Specifications

For each state transition, define the visual behavior.

```
Transition:     [PLACEHOLDER — e.g., "dashboard → active session"]
Metaphor:       [PLACEHOLDER — e.g., "stretch forward"]
Duration:       [PLACEHOLDER — e.g., "300ms"]
Easing:         [PLACEHOLDER — e.g., "ease-in-out"]
What moves:     [PLACEHOLDER]
What stays:     [PLACEHOLDER]
```

### 4. "Biggest Element" Logic

Define the algorithm that determines which component is dominant in any given state. Be explicit — no black boxes.

```
Priority rules:
  [PLACEHOLDER — ordered list of conditions and resulting dominant element]
```

### 5. Component Hierarchy

List every component the UI needs, grouped by layer (structural vs. content vs. interactive).

---

## Cross-Pollination Flag

Check: does the state machine contradict any Phase 1 UX findings (Phase 1 session-04)? Flag here.
