# Session C-00 — Concepting Brief
**Project**: Clay — Personal Fitness App
**Phase**: 2 — Concepting
**Input from**: clay-fitness-planning/ (Phase 1, sessions 00–09)
**Date**: 2026-03-27

---

## Phase 1 Summary

**Product**: Clay is a personal fitness app for self-coached intermediate lifters — one continuous moldable canvas, programming intelligence that whispers like a knowing coach, zero gamification.

**Phase 1 verdict**: GO with three pre-conditions
**Pre-conditions (all must be addressed in this Concepting phase)**:
1. Whisper library plan revised to 500+ target, named editorial owner assigned
2. No-HealthKit cold-start experience designed (resolved in session-09 Loop 4: smaller-but-honest canvas)
3. Canvas UX prototype tested with Harold-persona users before Sprint 2 engineering begins

## V1 MVP Feature Set (from session-07)

**Must-Have (ship in v1.0)**:
- Continuous canvas dashboard (no tab navigation)
- Pre-filled workout from last session
- Set logging with +/– buttons + feel slider (1–5)
- Dashboard stretches into active session
- HealthKit read (sleep, HR, HRV, body weight, prior workouts)
- HealthKit write-back after session completion
- "Why" capture + persistent pin at top of canvas
- 4-week volume trend visualization
- Programming methodology classifier (on-device, Core ML)
- Whisper library (500+ curated insights: ladder + linear minimum)
- Smart default hardening (3x swap = new default, with disclosure line)
- Data export (JSON/CSV)
- Privacy Policy + Terms of Service
- Medical disclaimer integrated in onboarding (in Clay voice — session-09 Loop 2 resolution)

**Cut from v1.0**:
- Watch app (deferred to v1.1)
- Pinch-to-compress gesture (deferred to v1.1)
- Long-press to soften / variation suggestions (deferred to v1.1)
- Voice notes on set (deferred to v1.1)
- Oura / WHOOP integration (deferred to v1.1)

## Active Risks the Design Must Address

| Risk | Session Raised | Status |
|---|---|---|
| Canvas feel must be viscerally right before engineering | S04, S07, S08 | **DESIGN MUST RESOLVE** |
| No-HealthKit cold-start experience | S04, S08 → S09 Loop 4 | Defined in S09 L4 — design must implement |
| Accidental "one-tap finish" activation | S04 | **DESIGN MUST RESOLVE** — hold-to-finish guard |
| Dashboard "biggest element" logic learnable, not black-box | S04 | **DESIGN MUST RESOLVE** — per S09 L4 priority rules |
| Medical disclaimer in Clay voice | S06 → S09 Loop 2 | Resolved in S09 L2 — design must implement exact copy |
| Voice discipline: single editorial filter | S01, S04, S06 → S09 Loop 5 | Editorial Filter exists — design must apply it |

## Design Constraints (non-negotiable)

- **No gamification**: no streaks, no progress bars for "goals," no badges, no celebration animations
- **No tab navigation**: one continuous canvas — the biggest architectural constraint
- **No hype language**: no "crush it," no "beast mode," no motivational poster copy
- **Anti-color rule**: no neon, no bright celebration colors (no green checkmarks for completions, no confetti)
- **Adult tone in every string**: pass the Editorial Filter from session-09 Loop 5 before any copy ships
- **On-device first**: the design must work 100% offline — no loading states for core features

## The Core UX Bet

The canvas must feel like clay on first contact. If a first-time user opens Clay and thinks "this is just another fitness app with a weird layout," the bet is lost. The transition from dashboard to active session — the stretch — must be the moment where the metaphor becomes visceral, not abstract.

## Target Users

**Harold (primary)**: 34–44, follows ladder programming, Apple hardware owner, trained for years, uses an existing app with friction, values data over motivation, would delete an app that sends him a streak notification.

**Maya (secondary)**: 38, returning athlete, less HealthKit data, needs the cold-start to work even without months of history, more emotional connection to the "Why" framing than the intelligence layer.

## What This Phase Must Produce

By C-08 (Design QA), these artifacts must exist and be handoff-ready:
- [ ] Brand identity (color, type, metaphor in pixels, anti-rules)
- [ ] Canvas state machine (all states, transitions, anchor points, "biggest element" logic)
- [ ] Design system (tokens, components, three screen wireframes)
- [ ] Voice + copy system (whisper architecture, onboarding copy, UI strings, Editorial Filter applied)
- [ ] Visual mockup direction (5-moment storyboard, App Store narrative)
- [ ] AI image generation prompts (8 assets, ready to run)
- [ ] Prototype specification (animations, gestures, engineer handoff checklist)
- [ ] Design QA sign-off (all three pre-conditions resolved, no new critical risks)
