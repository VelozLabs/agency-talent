# Session C-08 — Design QA
**Agent**: UX Researcher (`design-ux-researcher`) — returning from Phase 1
**Input**: C-01 through C-07, clay-fitness-planning/session-04-ux-research.md, clay-fitness-planning/risk-register.md
**Date**: 2026-03-27

---

## Opening Position

I ran the UX research in Phase 1. I found three P0 issues and identified the cold-start and canvas feel as the make-or-break moments. My job now is to check whether the design team honored those findings — or whether they produced something that looks great in a doc and fails in a gym.

I will not be polite about failures. I will be specific.

---

## Phase 1 Pre-Conditions (from session-08)

### Pre-Condition 1: Whisper library plan revised to 500+ target, named editorial owner assigned

**Status: PARTIALLY RESOLVED**

C-04 (Narrative Designer) produced the whisper architecture — 5 types, trigger conditions, length constraints, forbidden words. This is the system for writing whispers, not the whispers themselves.

The content target (500+ strings) and the editorial owner assignment are a project management task, not a design task. The concepting phase cannot fully resolve this — but it has done its part. The architecture exists. The Editorial Filter exists. What remains is an execution commitment that must be made before Sprint 2 begins.

**Condition for proceeding**: The project owner must name a single editorial owner for the whisper library before Sprint 2. The Narrative Designer's architecture in C-04 is that person's starting document.

### Pre-Condition 2: No-HealthKit cold-start experience designed

**Status: RESOLVED ✓**

Session 09 Loop 4 defined the data model and conceptual approach (smaller-but-honest canvas). C-02 defined it as State 0 with explicit dominant/secondary/hidden elements. C-03 produced the wireframe layout (Screen 4). C-04 wrote the exact copy ("Clay tracks your training, not your health. It's not a doctor. What's driving you?"). C-07 specified the Why empty state tap behavior.

The no-HealthKit path is fully designed. Harold and Maya both have a clear first-launch experience whether or not they grant permissions.

### Pre-Condition 3: Canvas UX prototype tested with Harold-persona users before Sprint 2 engineering begins

**Status: CANNOT BE RESOLVED IN CONCEPTING — BY DESIGN**

This pre-condition requires prototype testing with real users. Concepting produces the spec for that prototype. C-07 is the handoff document for the engineer to build it. The test happens after the prototype is built, before Sprint 2 engineering begins.

**Condition for proceeding**: C-07's prototype spec is engineer-ready (confirmed below). The test cannot happen until the prototype exists. This pre-condition closes in the gap between Concepting and Specification, not within Concepting.

---

## Phase 1 P0 UX Issues (from session-04)

### P0-1: Accidental "one-tap finish" activation

**Status: RESOLVED ✓**

C-03 designed the Hold-to-Finish component with 1.5s fill animation and a haptic progression that confirms completion. C-07 specified the gesture in exact detail: linear fill, cancel behavior on release before 1.5s, three-stage haptic. This is the right solution and it is fully specified.

**One remaining concern**: What happens if the user long-presses the Hold-to-Finish area while scrolling? If the canvas is scrollable during State 2, a scroll gesture ending near the bottom might trigger the hold detection. C-07 should specify that the Hold-to-Finish gesture requires vertical stillness (no translation >5px during the hold period) to prevent accidental activation during scroll. Flag for C-09 Loop.

### P0-2: Dashboard "biggest element" logic must be transparent and learnable

**Status: RESOLVED ✓**

C-02 produced a 7-rule ordered priority system. The rules follow a clear mental model: "the thing that needs my attention most right now is biggest." The rules are explicit, deterministic, and after 2–3 weeks of use, learnable. Harold should be able to predict correctly which element is dominant before opening the app.

### P0-3: Cold-start HealthKit framing is make-or-break

**Status: RESOLVED ✓** (design, not testing)

C-04 produced the exact permission framing copy: "Your sleep and recovery are already in your phone. Clay can read them to show you how your body is responding to your training." with the permission button "Show me my data →". This is substantially better than the generic system modal approach. The UX testing recommendation from Phase 1 (test this copy with 8 users before launch) remains valid — it cannot be tested in Concepting, but the design for testing now exists.

---

## New Risks Introduced by Design Decisions

### New Risk 1: Canela typeface licensing and fallback

**Introduced by**: C-01 (Brand Guardian) and C-03 (UI Designer)
**Severity**: MEDIUM

Canela is a commercial typeface. iOS does not include it as a system font. Two implications:
1. Licensing cost (per-app or subscription) must be accounted for in the budget
2. The app bundle increases by ~200KB for each font weight (two weights = ~400KB)
3. If the license is not obtained, the fallback is Georgia — which is close but not identical, and C-03's wireframes were designed for Canela proportions

**Recommendation**: Confirm Canela licensing (Commercial App License from Commercial Type) before Sprint 2. If cost is prohibitive, evaluate Cormorant Garamond (free, Google Fonts) as alternative. The Brand Guardian (C-01) should review the alternative before it's decided.

### New Risk 2: Sparkline data at Day 1–3

**Introduced by**: C-03 (sparkline component spec)
**Severity**: LOW-MEDIUM

The sparkline shows 4 weeks of volume data. For a new user in weeks 1–3, fewer than 4 data points exist. How does the sparkline render with 1, 2, or 3 weeks of data?

C-03 does not address this. Options: (a) show only available weeks (shorter line), (b) show full 4-week frame with empty dots at the left, (c) hide the sparkline until 4 weeks of data exist.

**Recommendation**: Option (a) — show only available weeks. Option (b) misleads (implies missing data is zero). Option (c) hides too much too long. Route to C-09 for a decision.

### New Risk 3: Feel slider ambiguity at values 1 and 5

**Introduced by**: C-03 (feel slider spec), C-04 (no definition of what 1–5 means)
**Severity**: LOW

The feel slider has 5 stops labeled "1" and "5" at the ends. No definition of what these numbers mean is provided anywhere in the design. Harold might interpret: 1=hard, 5=easy OR 1=bad, 5=good OR 1=no effort, 5=max effort.

If users interpret this differently, the feel score data is meaningless for the intelligence layer.

**Recommendation**: C-04 should add a micro-label to the slider context: below "1" show "hard" and below "5" show "easy" in text-xs/color-ash. This is 4 words. It removes ambiguity. Confirm with Narrative Designer that this copy passes the Editorial Filter.

---

## Persona Validation

### Harold (primary)

**Cold-start path**: WORKS
State 0 → Why capture → HealthKit grant → live dashboard. If HealthKit denied, smaller-but-honest canvas with first workout pre-filled. Harold's path is fully designed.

**Core loop**: WORKS
Pre-filled workout → start session → set logging → hold-to-finish → post-session insight. Every step is specified. The canvas stretch and flow-back are defined.

**Flagged friction**: The stepper +/– buttons at 44×44pt may be tight when Harold is logging between sets with chalk on his hands. Consider specifying a minimum 48×48pt target for the weight stepper (the most frequently tapped control) to provide additional margin. Small but worth noting.

### Maya (secondary — returning athlete)

**Cold-start path**: WORKS (with one caveat)
Maya likely has less HealthKit strength history than Harold. The pre-filled workout will be generated from onboarding answers rather than history. This is fine — C-03 handles this in Screen 4. The caveat: if Maya's Why is emotionally specific and the onboarding prompt doesn't give her space to write it, she may under-commit. C-04's prompt ("What do you want to be able to do?") with the example anchors should help — but this is testable, not resolvable in design.

**Core loop**: WORKS
Maya's session logging path is identical to Harold's. The feel slider and pre-filled workout are both valid for her experience level.

**Flagged friction**: None identified in the design.

---

## Phase Gate Verdict

**Verdict: PROCEED — with four C-09 Feedback Loops**

The core design is sound. The canvas architecture is defined. The voice system is rigorous. The P0 issues from Phase 1 are resolved. The engineer handoff spec (C-07) is ready.

Four items require C-09 loops before the phase is fully closed:

1. **Canela typeface licensing** — Brand Guardian + project owner decision before Sprint 2
2. **Sparkline data rendering with <4 weeks of data** — UI Designer must define behavior
3. **Feel slider 1–5 label copy** — Narrative Designer must add micro-labels
4. **Hold-to-Finish scroll conflict** — Rapid Prototyper must add scroll-stillness requirement to C-07

Pre-Condition 1 (whisper library owner) and Pre-Condition 3 (user testing) cannot close in Concepting by design. They require project management commitments and a built prototype respectively. Document in the concepting risk register and track through Specification phase.

---

## Updated Concepting Risk Register

| Risk | Severity | Status |
|---|---|---|
| Canela licensing / fallback | MEDIUM | Unresolved → C-09 Loop |
| Sparkline at <4 weeks data | MEDIUM | Unresolved → C-09 Loop |
| Feel slider ambiguity (1–5 meaning) | LOW | Unresolved → C-09 Loop |
| Hold-to-Finish scroll conflict | LOW-MEDIUM | Unresolved → C-09 Loop |
| Whisper library owner not named | HIGH | Project management item — track in Specification |
| Canvas feel user testing not done | HIGH | Prototype-dependent — track in Specification |
| Canela fallback affects wireframe proportions | LOW | Dependent on licensing decision |
