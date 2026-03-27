# Session 07 — MVP Scope
**Agent**: Product Sprint Prioritizer
**Input**: Sessions 00–06
**Date**: 2026-03-27

---

## Prioritization Framework

I'm using a Value vs. Effort matrix informed by the sessions above. Value is measured against the North Star metric (Weekly Active Loggers) and against the retention model's first-30-day critical path. Effort is relative engineering complexity from Session 03.

**The core MVP question**: What is the minimum Clay can ship that validates the core bet?

The core bet is: *A fitness app with no gamification, a continuous canvas, and a programming intelligence layer will retain intermediate lifters better than anything else on the market.*

To test that bet, v1 must demonstrate:
1. The continuous canvas feels like clay (not like navigation)
2. The intelligence layer is genuinely smarter than any competitor
3. The voice is consistently adult, non-gamified, and honest

Everything else can come later.

---

## Feature Prioritization Matrix

### Must-Have (v1.0 — The Bet)

| Feature | Value | Effort | Rationale |
|---|---|---|---|
| Continuous canvas dashboard | CORE | HIGH | Without this, Clay is just another app |
| Pre-filled workout from last session | CORE | LOW | Single highest-value UX win (Session 04) |
| Set logging with +/– buttons + feel slider | CORE | LOW | Table stakes, but must feel excellent |
| Dashboard stretches into active session | CORE | MEDIUM | The metaphor in practice |
| HealthKit read (sleep, HR, body weight, HRV) | HIGH | MEDIUM | Cold-start requires live data |
| HealthKit write-back (session completion) | HIGH | LOW | Legal/ecosystem positioning, trust signal |
| "Why" capture + persistent pin | HIGH | LOW | Emotional anchor; differentiates immediately |
| 4-week volume trend visualization | HIGH | MEDIUM | The minimum intelligence display |
| Programming methodology classifier | HIGH | HIGH | The intelligence moat; must ship |
| Whisper library (200+ curated insights, ladder + linear minimum) | HIGH | HIGH | Intelligence layer is dead without content |
| Smart default hardening (swap 3x = new default) | HIGH | LOW | Subtle but important trust builder |
| Data export (JSON/CSV) | HIGH | LOW | Privacy promise; avoids lock-in concern |
| Privacy Policy + Terms of Service | REQUIRED | LOW | App Store submission requirement |
| Medical disclaimer in onboarding | REQUIRED | LOW | Legal requirement |

### Should-Have (v1.1 — Fills the Experience)

| Feature | Value | Effort | Rationale |
|---|---|---|---|
| Watch app (logging + feel input) | HIGH | MEDIUM | The gym-floor experience; important but not fatal if missing at launch |
| Pinch-to-compress gesture | MEDIUM | MEDIUM | Differentiating but teachable later |
| Long-press to soften (variation suggestions) | MEDIUM | MEDIUM | Same — powerful but not critical to first session |
| Voice notes on set | MEDIUM | MEDIUM | Innovative; can launch without |
| Oura / WHOOP integration | MEDIUM | MEDIUM | Premium signal; post-launch |
| Year-over-year whispers | MEDIUM | LOW | Add to whisper library |
| Readiness / sleep score surface on dashboard | MEDIUM | LOW | Requires HKit data (already collected in v1) |
| One-tap full history export | LOW-MEDIUM | LOW | Privacy feature; can add in 1.1 |
| Momentum indicator ("building momentum" / "let's nudge this") | MEDIUM | LOW | Requires calibration; add in 1.1 |

### Nice-to-Have (v2.0 — The Expansion Layer)

| Feature | Value | Effort | Rationale |
|---|---|---|---|
| Program import (photo/text → classified) | HIGH | HIGH | Revenue opportunity but complex |
| Clay for Coaches (multi-client view) | HIGH | HIGH | Year 2 product line |
| GLP-1 muscle preservation module | MEDIUM | HIGH | Market timing play; Year 2 |
| Social anonymous cohort intelligence | MEDIUM | HIGH | Requires user base to exist first |
| Shape history / shape replay animation | MEDIUM | MEDIUM | Beautiful, non-critical |
| Why-to-training-vector translation (Session 01) | MEDIUM | HIGH | Interesting but hard to validate |

### Cut (Don't Build)

| Feature | Reason |
|---|---|
| Streaks | Against product philosophy |
| Social leaderboards / comparisons | Against product philosophy |
| AI-generated workout plans (LLM at runtime) | Latency, cost, liability, inconsistency (Session 03) |
| Calorie tracking | Feature creep; not Clay's job |
| Cardio logging (running, cycling) | Out of scope for v1; dilutes positioning |
| Paid coaching layer | Year 2+ product; different build |

---

## Sprint Plan (Relative Sizing)

### Pre-Sprint: Data Assets (runs parallel to all sprints)

These are not engineering tasks — they're editorial/curation projects. They must start immediately and run in parallel with the engineering sprints. Shipping without them is shipping an empty shell.

- **Lift taxonomy**: Target 500 exercises at launch, ~2,000 by v1.1. Assign a dedicated curator.
- **Whisper library**: Target 200 whispers at launch, covering ladder + linear + general pattern signals. Each whisper reviewed for voice compliance and medical claim check.
- **Programming classifier training data**: Synthetic dataset generation + expert annotation. Minimum viable classifier must accurately distinguish ladder/linear/undulating/block from workout history with >80% confidence.

### Sprint 1: Foundation (Weeks 1–4)
- SQLite event log schema + GRDB setup
- Lift taxonomy database seeded (first 500 exercises)
- HealthKit integration (read permissions: sleep, HR, HRV, body weight, existing workouts)
- HealthKit write-back (session completion → HKWorkout)
- Basic workout session model (plan → active → finished state)

### Sprint 2: Core Canvas (Weeks 5–8)
- Dashboard continuous canvas implementation
- "Why" capture + persistent pin
- Pre-filled workout from last session
- Set logging interface (+/– buttons, feel slider, haptic feedback)
- Dashboard → active session stretch animation
- Session → dashboard flow-back animation
- 4-week volume trend visualization

### Sprint 3: Intelligence Layer v1 (Weeks 9–13)
- Programming methodology classifier (Core ML, on-device)
- Arc position detector (where in the cycle are you?)
- Whisper engine (state-keyed lookup against curated library)
- Dashboard smart elements (pre-workout vs. during-session vs. post-session states)
- Smart default hardening logic

### Sprint 4: Polish + Legal + Launch Prep (Weeks 14–16)
- Privacy Policy + Terms of Service
- Medical disclaimer onboarding
- Accidental-tap guard on "one-tap finish" (Session 04 P0 finding)
- Data export (JSON/CSV)
- App Store assets (screenshots, preview video, keyword-optimized description)
- TestFlight beta with waitlist cohort (target: 100 beta users, 4 weeks)

### Post-Launch Sprint: Watch + Gestures (Weeks 17–20)
- Watch app (logging surface, feel slider, voice note)
- Pinch-to-compress gesture
- Long-press to soften (variation suggestions)
- Readiness score surface
- Oura integration

---

## MVP Scope Decision: What "Done" Looks Like for v1.0

A user can:
1. Launch Clay for the first time and see a live dashboard within 60 seconds (HealthKit data)
2. Capture their "Why" in one tap
3. See their first pre-filled workout (from HealthKit history or from the Why-informed generated suggestion)
4. Log a complete session on their phone with zero friction
5. Finish the session and see the dashboard reshape with updated trends
6. Receive their first intelligent whisper within 24 hours
7. Understand where they are in their current programming arc (methodology classified)
8. Export their data whenever they want

**What v1.0 does NOT do**:
- Watch app
- Pinch-to-compress or long-press gestures
- Voice notes
- Oura/WHOOP integration
- Year-over-year comparisons (not enough data yet for new users)

**What v1.0 must absolutely nail**:
- The canvas *feeling* — every transition, every resize, must feel organic
- The whisper quality — 200 curated insights that read like a knowing coach
- The voice — not one word of hype, not one streak notification, not one "great job!"
- The HealthKit cold-start — live dashboard before the first set is logged

---

## Risk Register Update (from this session)

| Risk | Session Raised | Severity | Mitigation |
|---|---|---|---|
| Whisper library ships thin | 01, 05, 07 | CRITICAL | Editorial sprint starts week 1, parallel to engineering |
| Canvas feel is wrong | 04, 07 | HIGH | Prototype gestural UX before sprint 2 begins |
| HealthKit cold-start grant rate low | 04, 07 | HIGH | Copy + UX testing pre-launch |
| Accidental "finish" activation | 04, 07 | HIGH | Hold-to-finish gesture, Sprint 4 |
| Programming classifier accuracy <80% | 03, 07 | MEDIUM | Synthetic training data + expert labels |
| Maya persona underserved by v1 | 05, 07 | MEDIUM | Ensure no-HealthKit-data path works in cold start |

---

*Passing to Session 08: Reality Check + Final Verdict*
