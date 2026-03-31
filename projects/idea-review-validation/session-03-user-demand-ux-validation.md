# Session 03 — User Demand & UX Validation
**Project**: Idea Review & Validation
**Idea**: Smart Receivables & Cash-Flow Assistant
**Date**: 2026-03-31
**Agents**: Product Feedback Synthesizer, Design UX Researcher

---

## Feedback Synthesizer Analysis

### User Pain Signal Mapping

Synthesized from SMB community discussions (Reddit r/smallbusiness, r/accounting, QuickBooks Community, Xero Community, Alignable forums, Capterra/G2 reviews of AR tools):

**Top 5 Pain Themes (Ranked by Frequency)**

| Rank | Pain Theme | Frequency | Intensity | Representative Quote |
|---|---|---|---|---|
| 1 | **Awkwardness of chasing payments** | Very high | High | "I hate being the bad guy. These are my clients, not deadbeats — but I still need to get paid." |
| 2 | **Time drain of manual follow-up** | Very high | High | "I spend 3-4 hours a week just sending reminder emails and checking who's paid. That's half a workday gone." |
| 3 | **Cash-flow anxiety from unpredictability** | High | Very high | "My biggest client pays net-60 but my rent is due net-30. I can't plan if I don't know when money's coming." |
| 4 | **QuickBooks reminders are too basic** | High | Medium | "QB lets me send one reminder but it's the same generic email every time. No escalation, no SMS, no intelligence." |
| 5 | **Existing AR tools are too expensive or complex** | Medium | Medium | "I looked at [competitor] but it's $150/mo and wants me to set up workflows I don't understand. I have 30 invoices, not 3,000." |

### Language Users Actually Use

Understanding how the target user describes the problem is critical for messaging and UX copy:

- "Chasing invoices" (not "accounts receivable management")
- "Getting paid" (not "collections optimization")
- "Reminders" (not "dunning sequences")
- "Who owes me" (not "aging report")
- "When is money coming in" (not "cash-flow projection")
- "I hate asking for money" (emotional framing, not functional)

**Implication**: Product naming, onboarding copy, and dashboard labels must use the owner's language, not accounting jargon.

### Switching Triggers

What pushes an owner-operator from "I'll just handle it" to "I need a tool":

1. **A single large unpaid invoice** — One client owing $5K+ that's 60+ days overdue is often the trigger event
2. **Growth inflection** — Going from 5 active clients to 15-20 makes manual tracking unsustainable
3. **Cash-flow crisis** — Missing payroll or not being able to take on a project because cash is locked in receivables
4. **Relationship damage** — A client gets offended by a poorly timed or poorly worded reminder, causing the owner to seek a "professional" solution

### Demand Validation Signals

- **Strong signal**: Pain is frequent, emotional, and directly tied to revenue. Users already try to solve it with workarounds (spreadsheets, calendar reminders, CC'ing themselves on emails).
- **Strong signal**: Willingness to pay is anchored in concrete dollar recovery, not abstract value.
- **Moderate concern**: Some owners resist automation because they believe personal relationships require personal communication. The product must feel like "me, but faster" — not "a robot pretending to be me."

---

## UX Researcher Analysis

### Primary Persona: The Owner-Collector

**Name**: Sam
**Business**: B2B service provider (consulting, contracting, creative agency, trades)
**Team size**: 1-10 employees
**Invoice volume**: 15-60 invoices/month
**AR reality**: Does collections personally. No dedicated AR staff. Uses QuickBooks or Xero for invoicing but manages follow-up manually.

**Behavioral traits**:
- Checks QuickBooks 2-3x/week, often on mobile
- Sends reminder emails from personal email, not from QuickBooks
- Avoids phone calls for collections — feels too confrontational
- Has 2-3 "difficult" clients who are chronically late but too valuable to fire
- Makes financial decisions based on bank balance, not cash-flow projections

### Current Workflow (Pain-Point Map)

```
1. CREATE INVOICE → QuickBooks/Xero (works fine)
2. SEND INVOICE → QB/Xero email or PDF (works fine)
3. WAIT → No system; mental tracking only ❌
4. CHECK STATUS → Log into QB, scan aging report, cross-reference bank ❌
5. DECIDE TO FOLLOW UP → Gut feel; "it's been a while" ❌
6. COMPOSE REMINDER → Personal email; agonizes over wording ❌
7. SEND REMINDER → Email only; no SMS option ❌
8. REPEAT (maybe) → Often forgets or avoids second follow-up ❌
9. ESCALATE → Rarely; feels too aggressive ❌
10. GET PAID (eventually) → Or write it off ❌
```

**Steps 3-9 are the product's opportunity zone.** Steps 1-2 are handled adequately by existing tools and should NOT be replaced.

### UX Assumptions to Validate

| # | Assumption | Risk if Wrong | Validation Method |
|---|---|---|---|
| U1 | Users want to set rules once and let the system run autonomously | They might want to approve each message before it sends | Prototype test — offer "auto" vs. "approve each" modes and see which users choose |
| U2 | A single dashboard showing "who owes you" is more useful than the QB aging report | Users may already have a workflow they're attached to | A/B test dashboard vs. aging-report-style view |
| U3 | SMS follow-ups are acceptable to send to B2B customers | May be seen as too informal or aggressive for certain industries | Template tone test (EXP-04 in Session 06) |
| U4 | Impact metrics ("you recovered $X") drive retention | Users may not attribute recovered payments to the tool | Post-recovery survey: "Did this payment come in because of the reminder?" |
| U5 | Mobile-first is the right entry point | Owner-operators may prefer desktop for financial tools | Analytics on prototype: track device split during usability test |

### Information Architecture (Recommended)

```
HOME SCREEN: "Who Owes You Today"
├── Overdue invoices (sorted by amount × days overdue)
├── Upcoming due dates (next 7 days)
├── Quick stat: "$X recovered this month"
└── One-tap: "Send reminder" or "View sequence"

SEQUENCES TAB: Active Follow-Up Campaigns
├── Per-client sequence status (Step 1/3, Step 2/3...)
├── Pause / edit / escalate controls
└── Template preview with tone indicator

CASH FLOW TAB: 30/60/90-Day View
├── Projected inflows (based on invoice due dates + payment history)
├── Shortfall alerts
└── "What-if" scenarios

SETTINGS: Rules & Templates
├── Default sequence (e.g., Day 3 → Day 10 → Day 21)
├── Tone per customer (gentle / standard / firm)
├── Channel preferences (email only, email + SMS)
└── QuickBooks/Xero connection management
```

### Usability Research Plan

**Phase 1 — Concept Test (Week 2-3)**:
- 8-10 remote interviews with target persona (Sam)
- Show wireframes of Home Screen and Sequences Tab
- Task: "Show me how you'd handle an invoice that's 15 days overdue"
- Measure: comprehension, emotional response, trust signals

**Phase 2 — Prototype Test (Week 4-5)**:
- Clickable Figma prototype with 3 flows: setup, first reminder sent, reviewing impact
- 10-12 participants
- Task-based: "Set up a follow-up sequence for your biggest client"
- Measure: task completion rate, time-on-task, satisfaction (SUS score)

**Phase 3 — Tone Validation (parallel with Phase 1-2)**:
- Integrated with EXP-04 from Session 06
- Separate focus on whether the product voice feels like "me, upgraded" vs. "a robot"

---

## Combined User Demand & Fit Score

| Dimension | Score (1–5) | Rationale |
|---|---|---|
| **Pain intensity** | 5 | Emotional, frequent, directly revenue-impacting |
| **Current solution gap** | 4 | QB/Xero reminders are basic; manual email is the norm; no affordable automation |
| **Target user clarity** | 5 | Owner-collector persona is sharply defined and reachable |
| **Willingness to adopt** | 4 | Strong pull from pain; slight friction from "I want it to sound like me" concern |
| **Language-market fit** | 4 | Product can speak the user's language if jargon is avoided |

**User Demand & Fit Composite: 4.4 / 5** — Strong demand with clear persona alignment.

---

## Risks Surfaced for Register

| ID | Risk | Severity | Source |
|---|---|---|---|
| R05 | Users want per-message approval, not full automation — could undermine the "set and forget" value prop | MEDIUM | UX Researcher |
| R06 | "Sounds like me" bar is high — templated messages that feel generic will erode trust | HIGH | Feedback Synthesizer |

---

## Next Session

**Session 04**: Technical feasibility & MVP scoping — led by **Engineering Software Architect** and **Engineering Rapid Prototyper**.
