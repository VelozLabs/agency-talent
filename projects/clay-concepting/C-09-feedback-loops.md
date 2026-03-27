# Session C-09 — Feedback Loops
**Type**: Cross-Agent Retrospective (mandatory)
**Trigger**: C-08 Design QA findings (4 unresolved items)
**Date**: 2026-03-27

---

## Why This Session Exists

C-08 (UX Researcher) identified four items that require a revised answer from specific agents before the Concepting phase closes. Running these as explicit loops — with a question, a revised answer, and a named impact — prevents the Specification phase from inheriting unresolved design ambiguity.

---

## Loop C1: Canela Typeface — Licensing Decision

```
Trigger:
  C-08 flagged that Canela is a commercial typeface requiring a paid license.
  The design in C-01 and C-03 depends on Canela for the Why pin and post-session
  display text. If licensing is not obtained, the visual identity is partially broken.

Routing:
  From: UX Researcher (C-08)
  To:   Brand Guardian (C-01)

Question:
  If Canela cannot be licensed (cost or logistics), what is the approved fallback?
  Does the fallback maintain the brand identity, or does it require changes to
  C-03's component specs?
```

**Brand Guardian revised answer**:

The fallback is **Cormorant Garamond** (free, available via Google Fonts, bundled in app). It is in the same editorial serif tradition as Canela — slightly more elegant, slightly less editorial — but it holds the brand direction.

Specific adjustment needed in C-03: Canela at 34px renders slightly wider than Cormorant Garamond at the same size. The Why pin height may need to increase by 4–8px with Cormorant to prevent text truncation on 2-line Whys. This is a minor adjustment.

**Decision matrix**:
- If Canela license costs <$500/year: license Canela. The visual identity is worth it.
- If Canela license costs $500–$2,000/year: use Cormorant Garamond, adjust Why pin height.
- If Canela license costs >$2,000/year: use Cormorant Garamond, consider it the intentional choice.

**Impact on prior sessions**:
- C-01: No change to color, type weights, or anti-rules. Cormorant Garamond is an approved alternative, not a compromise.
- C-03: Add a note to the Why pin spec: "Use Canela Regular if licensed; Cormorant Garamond Regular as fallback. Adjust Why pin height +6px with fallback to accommodate width difference."
- C-07: No change to prototype spec. Engineer should implement font as a swappable constant.

---

## Loop C2: Sparkline Rendering with <4 Weeks of Data

```
Trigger:
  C-08 flagged that the sparkline component spec in C-03 doesn't define behavior
  for users with 1, 2, or 3 weeks of session data (i.e., most users in their
  first month).

Routing:
  From: UX Researcher (C-08)
  To:   UI Designer (C-03)

Question:
  How does the sparkline render with 1, 2, or 3 data points? Does it show
  a partial line, a full frame with empty space, or hide until complete?
```

**UI Designer revised answer**:

Show only available weeks. The line starts where the data starts.

**Visual behavior by data state**:

```
Week 1 (1 data point):
  A single dot in color-clay, centered horizontally.
  No line (you can't draw a line with one point).
  Label: current week's volume in text-xs/SF Mono/color-stone.
  A subtle text-xs/color-ash line below: "2 weeks until your first trend."

Week 2 (2 data points):
  Two dots connected by a line segment.
  The line anchors to the right edge of the chart area (most recent = right).
  Label: current week's volume.
  No supplemental text (a trend is emerging — let it breathe).

Week 3 (3 data points):
  Three dots, full line.
  No supplemental text.

Week 4+ (4+ data points):
  Full sparkline behavior as specified in C-03.
  "2 weeks until your first trend" text is hidden permanently after week 3.
```

**Design principle**: The chart grows with the user. It starts small, like the canvas in State 0. It doesn't apologize for being new. "2 weeks until your first trend" is an honest acknowledgment, not a loading state.

**Impact on prior sessions**:
- C-03: Add the week-1, week-2, week-3 states to the sparkline component spec above the existing spec.
- C-07: Add sparkline data-state behavior to the prototype spec — engineer needs to handle these states in the SwiftUI view.

---

## Loop C3: Feel Slider 1–5 Label Copy

```
Trigger:
  C-08 flagged that the feel slider has no definition of what 1 and 5 mean.
  Different interpretations produce incompatible data for the intelligence layer.

Routing:
  From: UX Researcher (C-08)
  To:   Narrative Designer (C-04)

Question:
  What does the 1–5 scale mean? What are the micro-labels at each end?
  Do they pass the Editorial Filter?
```

**Narrative Designer revised answer**:

The scale should read effort *feel*, not difficulty or performance. The framing:

```
1 = "Smooth"   (the weight moved easily, you had more in the tank)
5 = "Hard"     (maximal effort, near failure, or substantial fatigue)
```

Why "Smooth" and "Hard" rather than "Easy" and "Hard":
- "Easy" implies the weight was too light (judgment). "Smooth" is descriptive — the rep flowed.
- "Hard" is honest and direct. No euphemism.
- Both pass the Editorial Filter: present tense, no hype, no shame, descriptive not evaluative.

**UI implementation**:
- Below "1": "Smooth" in text-xs/color-ash
- Below "5": "Hard" in text-xs/color-ash
- These labels appear only in the active session (State 2), not in the session summary
- They do not appear on the feel value displayed in the prior-set ghost (there, just the number)

**Impact on prior sessions**:
- C-03: Add micro-labels to the feel slider component spec.
- C-04: Add "Smooth / Hard" to the UI String Library under "Feel slider labels."
- C-07: No change to prototype spec — the labels are visual elements, not interaction elements.

---

## Loop C4: Hold-to-Finish Scroll Conflict

```
Trigger:
  C-08 flagged that a scroll gesture ending near the Hold-to-Finish bar could
  accidentally trigger the long-press detection if the user's finger slows
  at the bottom of the scroll.

Routing:
  From: UX Researcher (C-08)
  To:   Rapid Prototyper (C-07)

Question:
  How does the Hold-to-Finish gesture distinguish itself from a scroll gesture
  that terminates near the bottom of the screen? Add a scroll-stillness
  requirement to the gesture spec.
```

**Rapid Prototyper revised answer**:

The standard iOS gesture recognizer system handles this naturally through gesture competition, but it needs to be explicitly designed:

```
Hold-to-Finish gesture activation requirements:
  1. Touch down inside the Hold-to-Finish component (44px+ touch target)
  2. No vertical translation >8px during the hold period (stillness requirement)
  3. Minimum touch duration 100ms before fill animation begins (prevents fast taps)

If ANY condition fails:
  - The fill animation does not begin
  - If it had begun, it resets with 200ms ease-out
  - No haptic fires (the absence of haptic is the cancellation signal)

SwiftUI implementation:
  Use simultaneousGesture to coordinate with scroll detection.
  The hold gesture should have higher priority than the scroll gesture
  ONLY within the Hold-to-Finish component bounds.
  Outside that component, scroll takes full priority.

Additional safeguard:
  The Hold-to-Finish component is positioned BELOW the last set row,
  separated by spacing-16. The user must intentionally reach the bottom
  of the canvas to encounter it. Accidental activation during content
  scrolling is geometrically unlikely given this spacing.
```

**Impact on prior sessions**:
- C-07: Add the 3-condition activation requirement and the simultaneousGesture note to the Hold-to-Finish gesture spec.

---

## Phase Closure Checklist

- [x] All C-08 Design QA unresolved items looped and resolved (4 loops completed above)
- [x] Phase 1 pre-conditions confirmed addressed:
      - Pre-condition 1: Partially resolved — whisper architecture done, owner assignment is a project mgmt task
      - Pre-condition 2: RESOLVED — State 0 fully designed
      - Pre-condition 3: Cannot close in Concepting — prototype testing requires a prototype
- [x] Engineer Handoff Checklist from C-07 complete (NSHealthShareUsageDescription is the one outstanding string)
- [x] No CRITICAL new risks without mitigation (Canela licensing is MEDIUM, mitigated with approved fallback)
- [x] Editorial Filter confirmed applied to all copy in C-04
- [x] AI image prompts in C-06 ready to run

**Concepting phase: COMPLETE**

**Passing to Phase 3: Specification** — with two carry-forward items:
1. Whisper library editorial owner must be named before Specification begins
2. Canvas UX prototype must be tested with 5–8 Harold-persona users before Sprint 2 engineering begins (Specification phase produces the test plan)
