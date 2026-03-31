# Idea Review & Validation — Risk Register
**Project**: Idea Review & Validation
**Last Updated**: Session 08 (2026-03-31)
**Focus**: Smart Receivables & Cash-Flow Assistant (pivot from 3-idea review)

---

## Active Risks

| ID | Risk | Severity | First Raised | Status | Notes |
|---|---|---|---|---|---|
| R01 | QuickBooks/Xero native reminder improvements could erode differentiation | MEDIUM | Session 02 | Monitor | Track quarterly product updates from Intuit and Xero |
| R02 | SMS compliance (TCPA, 10DLC) adds regulatory complexity and cost | MEDIUM | Session 02 | Open | Must be designed into product architecture; EXP-07 addresses this |
| R03 | Churn risk after initial "recovery spike" flattens at month 3–6 | MEDIUM | Sessions 02, 05, 07 | Open | Cash-flow forecasting must provide ongoing value; EXP-06 tests retention |
| R04 | Tone miscalibration in automated follow-ups damages customer relationships | HIGH | Sessions 02, 03, 07 | **GATING** | EXP-04 must clear 70% comfort rating before build proceeds |
| R05 | Landing page test may attract early-adopter bias, overstating general demand | LOW | Session 06 | Accepted | Note bias in EXP-01 analysis |
| R06 | QuickBooks app review process may impose restrictions on messaging/automation features | MEDIUM | Sessions 04, 06 | Open | Research QB review requirements during EXP-03 API spike |
| R07 | Opt-in requirement for SMS to SMB's end-customers adds friction that may kill SMS channel | MEDIUM | Session 06 | Open | EXP-07 must confirm viable opt-in flow |
| R08 | Twilio 10DLC registration may be rejected under "debt collection" category | MEDIUM | Session 04 | Open | Position as "business communication," not collections |
| R09 | Solo-developer MVP — no redundancy if developer is blocked or leaves | MEDIUM | Sessions 04, 07 | **PRE-CONDITION** | Must identify second developer before full build |
| R10 | "I can just send emails myself" objection undermines conversion | MEDIUM | Session 05 | Accepted | Messaging must emphasize consistency + timing, not just convenience |
| R11 | Accountant channel requires relationship-building that doesn't scale with solo founder | LOW | Session 05 | Deferred | Defer to post-PMF |
| R12 | Month 3-6 churn could be higher than modeled if forecasting doesn't deliver ongoing value | MEDIUM | Sessions 05, 07 | Open | EXP-06 tests this; track month 3 retention as leading indicator |
| R13 | Attribution problem — users may not believe the tool caused faster payment | MEDIUM | Session 07 | Open | Impact dashboard must track "reminder sent → payment within 48h" correlation |
| R14 | Onboarding completion rate may be 30-40%, not 60% as modeled | HIGH | Session 07 | **PRE-CONDITION** | Design for 40% completion; show value before QB connection |
| R15 | $29 tier has thin margins; may attract high-churn, low-value customers | MEDIUM | Session 07 | Open | Test $39/$59 pricing in EXP-05 and EXP-02 |
| R16 | True addressable market is ~800K-1.5M businesses, not 2-3M | LOW | Session 07 | Accepted | Still large enough; does not change GO decision |

---

## Resolved Risks

_None yet — all risks are pre-build and will be addressed through validation experiments._

---

## Gating Pre-Conditions (Must Pass Before Full Build)

| # | Condition | Experiment | Threshold |
|---|---|---|---|
| 1 | Demand validated | EXP-01 (Landing Page) | ≥6% email signup rate |
| 2 | API feasibility confirmed | EXP-03 (QuickBooks API Spike) | No showstoppers; partial payments, contacts accessible |
| 3 | Template tone trusted | EXP-04 (Tone Test) | ≥70% "comfortable" rating on standard tone |
| 4 | Second developer identified | Founder action | Contractor or co-founder committed before Sprint 1 |

---

## Risk Trend

- Session 02: 4 risks identified (market and channel risks)
- Session 03: 2 risks added (UX trust and template voice)
- Session 04: 3 risks added (timeline, compliance, solo-dev)
- Session 05: 3 risks added (conversion objection, channel scaling, churn)
- Session 06: 3 risks added (bias, platform review, SMS opt-in)
- Session 07: 4 risks added (attribution, onboarding, pricing, TAM)
- **Session 08 verdict: GO WITH CONDITIONS** — 16 active risks, 2 HIGH severity, 4 gating pre-conditions

No NO-GO signal. No PIVOT recommendation. The idea is validated at 4.03/5 composite score with clear next steps.
