# Clay — Live Risk Register
**Project**: Clay Fitness App
**Last Updated**: Session 08 (2026-03-27)

---

## Active Risks

| ID | Risk | Severity | First Raised | Status | Owner Required | Notes |
|---|---|---|---|---|---|---|
| R01 | Whisper library volume insufficient (200 is too few; need 500+ at launch) | CRITICAL | Sessions 01, 05, 07, 08 | **UNRESOLVED** | Editorial lead | Assigned before Sprint 2. Repeating whispers in first 4–6 weeks destroys "this app understands me" effect. |
| R02 | Canvas gestural feel fails under real gym conditions | HIGH | Sessions 04, 07, 08 | **UNRESOLVED** | UX lead | Prototype + test with 5–8 Harold-personas in gym context before Sprint 2 engineering begins |
| R03 | No-HealthKit cold-start experience undefined | HIGH | Sessions 04, 07, 08 | **UNRESOLVED** | Design + Engineering | What does Clay show a user who denies health permissions? Must be designed and scoped in Sprint 1 |
| R04 | Accidental "one-tap finish" activation | HIGH | Session 04 | Accepted / Scoped | Engineering (Sprint 4) | Hold-to-finish gesture or equivalent guard required |
| R05 | Programming classifier accuracy <80% or timeline slips | MEDIUM | Sessions 03, 07 | Accepted / Monitored | Data + Engineering (Sprint 3) | Synthetic data bootstrap + expert annotation; monitor weekly in Sprint 3 |
| R06 | Conversion rate optimism (25% assumed vs. 5–15% realistic) | MEDIUM | Session 08 | Accepted | Monitor at launch | No pre-launch fix; monitor Day 30 conversion and adjust pricing/paywall |
| R07 | Voice discipline drift as whisper library scales | MEDIUM | Session 08 | **Structural** | Named editorial owner | Every app string must be reviewed by single voice owner. Not an engineering problem. |
| R08 | Maya persona underserved in cold-start | MEDIUM | Sessions 05, 07 | Accepted | Design (Sprint 1) | No-HealthKit path doubles as Maya path; design both simultaneously |
| R09 | Watch app absent at v1 launch creates gym-floor UX friction | LOW | Sessions 00, 07, 08 | Accepted + Communicated | — | Communicated to beta users; watch in v1.1 (week 20) |
| R10 | GLP-1 partnership creates HIPAA obligations if pursued without counsel | LOW | Session 06 | Mitigated | Legal counsel (pre-partnership) | Do not advance GLP-1 partnership without dedicated HIPAA analysis |

---

## Resolved Risks

| ID | Risk | Resolution | Session |
|---|---|---|---|
| R11 | HIPAA directly applies to Clay | Not a covered entity; on-device architecture limits scope | 06 |
| R12 | Market whitespace doesn't exist | Competitive analysis confirms unclaimed position | 02 |
| R13 | Architecture can't support the canvas metaphor | Event sourcing + GRDB is the right foundation | 03 |

---

## Pre-Condition Checklist (Required Before Sprint 2)

- [ ] Whisper library plan: 500+ target, named editorial owner assigned, credible delivery timeline
- [ ] No-HealthKit cold-start: designed, scoped into Sprint 1, signed off by product
- [ ] Canvas UX prototype: built, tested with 5–8 Harold-persona users, findings incorporated

---

## Risk Trend

Sessions 02 and 05 both returned **GO** at their gates.
Session 08 returned **GO** with three pre-conditions.

No **NO-GO** signals in the session record.
No **PIVOT** recommendation reached consensus.

The idea is sound. The execution risks are in the data assets and first impression — both solvable with the right resource allocation.
