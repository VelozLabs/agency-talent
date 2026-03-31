# Session 06 — Experiment Design & Risk Mapping
**Project**: Idea Review & Validation
**Idea**: Smart Receivables & Cash-Flow Assistant
**Date**: 2026-03-31
**Agent**: Project Management Experiment Tracker

---

## Objective

Design concrete, low-cost validation experiments to de-risk the idea before committing to a full build. Each experiment targets a specific assumption that, if wrong, would kill the product or require a major pivot.

---

## Critical Assumptions to Test

| # | Assumption | Source | If Wrong... |
|---|---|---|---|
| A1 | Micro-business owners will pay $29-49/mo for AR automation | Sessions 01, 02 | No viable business |
| A2 | QuickBooks/Xero APIs provide sufficient invoice data for automated sequencing | Session 02 | Core feature is undeliverable or severely constrained |
| A3 | Automated tone/templates can match owner-operator communication standards | Session 02 (R04) | Product damages customer relationships; negative word of mouth |
| A4 | Users retain past month 3 once the initial "recovery spike" settles | Session 02 (R03) | Unit economics collapse; CAC never recovered |
| A5 | The "pays for itself" narrative converts browsers to trial users | Sessions 01, 02 | Acquisition costs too high for the price point |
| A6 | SMS follow-ups are deliverable and compliant without prohibitive cost | Session 02 (R02) | Must fall back to email-only, weakening the value prop |

---

## Experiment Portfolio

### EXP-01: Landing Page Demand Test

**Assumption tested**: A1, A5
**Hypothesis**: At least 8% of targeted visitors will submit their email for early access when presented with the "pays for itself with one recovered invoice" value proposition.
**Method**:
- Build a single-page site: headline, 3-benefit breakdown, ROI calculator ("Enter your average invoice amount"), email capture form
- Drive 2,000 targeted visitors over 2 weeks via: Reddit r/smallbusiness sponsored post ($300), Google Ads on "late invoice follow-up" and "QuickBooks payment reminder" keywords ($500), 2-3 organic posts in SMB Facebook groups (free)
- Track: unique visitors, time on page, calculator interactions, email signups, traffic source breakdown
- A/B test two headlines: (a) "Stop Chasing Invoices. Get Paid Faster." vs. (b) "Your Clients Owe You $X. Let's Collect It."

**Success criteria**: 8% email signup rate (160+ signups from 2,000 visitors). Secondary: calculator engagement > 25% of visitors.
**Failure threshold**: Below 4% signup rate signals weak demand or messaging misfire.
**Timeline**: 2 weeks (3 days build, 11 days traffic)
**Cost**: $800-1,000 (ads) + $0-200 (landing page tooling)
**Priority**: 1 (run immediately — gates all other experiments)

---

### EXP-02: Pre-Sale Willingness-to-Pay Test

**Assumption tested**: A1
**Hypothesis**: At least 15% of email signups from EXP-01 will put down a $10 refundable deposit to reserve a spot at $29/mo or $49/mo.
**Method**:
- Email EXP-01 signups with a "founding member" offer: $10 refundable deposit to lock in early pricing and get priority access
- Present two pricing options ($29/mo Solo, $49/mo Business) with clear feature breakdown
- Use Stripe checkout for deposit collection; make refund policy prominent
- Follow up non-responders once at 48 hours

**Success criteria**: 15% deposit conversion (24+ deposits from 160 signups). Track split between $29 and $49 tiers to inform pricing.
**Failure threshold**: Below 8% signals price resistance or insufficient perceived value.
**Timeline**: 1 week (starts after EXP-01 delivers signups)
**Cost**: $50 (Stripe fees, email tooling). Deposits are refundable.
**Priority**: 2 (depends on EXP-01 results)

---

### EXP-03: QuickBooks API Integration Spike

**Assumption tested**: A2
**Hypothesis**: A single developer can build a working read-only integration with QuickBooks Online (pull invoices, payment statuses, customer contacts) within 5 working days using the QuickBooks Online API.
**Method**:
- Scope: connect via OAuth 2.0, pull open invoices, read payment status, retrieve customer email/phone, handle token refresh
- Use Intuit's sandbox environment (free developer account)
- Document: API rate limits, data freshness lag, required scopes/permissions, app review requirements for marketplace listing
- Identify blockers: are invoice line items, partial payments, and custom fields accessible? What about multi-currency?
- Repeat a lighter check against Xero API (2 additional days) to validate cross-platform feasibility

**Success criteria**: Working prototype that pulls and normalizes invoice data from QB sandbox within 5 days. No showstopper API limitations discovered. Xero feasibility confirmed at high level.
**Failure threshold**: Cannot access required invoice/payment data, or rate limits make real-time sync impractical for accounts with 100+ open invoices.
**Timeline**: 7 working days
**Cost**: $0 (developer time only; assumes founder or co-founder can code). If contracting: $2,000-3,500.
**Priority**: 1 (run in parallel with EXP-01 — technical viability is independent of demand)

---

### EXP-04: Tone & Template A/B Test

**Assumption tested**: A3
**Hypothesis**: Follow-up message templates rated "appropriate and professional" by 80%+ of SMB owners, across three tone levels (gentle, standard, firm).
**Method**:
- Write 9 message templates: 3 tone levels (gentle, standard, firm) x 3 stages (first reminder, second reminder, final notice), for both email and SMS (18 total messages)
- Recruit 30-50 SMB owners via the EXP-01 email list + Respondent.io ($100 incentive each) for a survey
- Present templates as if received by their own customers; ask: "Would you be comfortable if this was sent on your behalf?" (Yes/No/Needs editing) and "How would your customer react?" (Positive/Neutral/Negative)
- Test specific failure modes: (a) first-name personalization, (b) invoice amount inclusion, (c) SMS length constraints, (d) cultural/industry sensitivity ("Hey [Name]" vs. "Dear [Name]")

**Success criteria**: 80%+ "comfortable" rating across all 9 email templates. 70%+ for SMS (lower bar due to format constraints). Fewer than 10% "negative customer reaction" ratings on gentle and standard tones.
**Failure threshold**: Below 60% comfort on standard tone signals the core product mechanic needs rethinking.
**Timeline**: 2 weeks (1 week to write templates and recruit, 1 week for survey and analysis)
**Cost**: $1,500-2,500 (participant incentives). Lower if using EXP-01 list (free recruitment).
**Priority**: 2 (can start during EXP-01 traffic phase; directly de-risks R04)

---

### EXP-05: Pricing Sensitivity Survey (Van Westendorp)

**Assumption tested**: A1
**Hypothesis**: The acceptable price range for the target user falls between $25-55/mo, confirming the planned $29-49/mo tiers.
**Method**:
- Van Westendorp price sensitivity survey sent to EXP-01 signups + recruited panel of 50-80 SMB owners who currently use QuickBooks/Xero
- Four questions: "At what price would this be so cheap you'd doubt quality?", "...a bargain?", "...getting expensive?", "...too expensive to consider?"
- Include a brief product description and the impact framing ("reduces DSO by 5-10 days, recovers $2,000-8,000/mo in late payments")
- Segment results by business size (solo vs. 5-20 employees) and current AR volume

**Success criteria**: Point of marginal cheapness above $20/mo. Point of marginal expensiveness below $65/mo. Optimal price point within $30-50/mo range.
**Failure threshold**: Optimal price below $20/mo makes the business model unviable at projected CAC. Above $60/mo signals a different market segment than intended.
**Timeline**: 1.5 weeks (overlaps with EXP-02)
**Cost**: $500-1,000 (panel recruitment if EXP-01 list is too small)
**Priority**: 3 (informative but not blocking; EXP-02 deposit test is the stronger signal)

---

### EXP-06: Retention Mechanic Prototype (Cash-Flow Forecast)

**Assumption tested**: A4
**Hypothesis**: SMB owners who see a simple 30/60/90-day cash-flow forecast based on their open invoices and historical payment patterns rate it "very useful" and would check it at least weekly.
**Method**:
- Build a clickable Figma prototype of the cash-flow dashboard: 30/60/90 day projected inflows, color-coded risk bands (green/yellow/red), "what-if" scenario ("If Invoice #1042 pays 15 days late, you'll have a $3,200 shortfall on April 18")
- Show prototype to 15-20 SMB owners in 20-minute remote sessions (recruited from EXP-01 list or Respondent.io)
- Ask: "How often would you check this?", "Does this change how you plan spending?", "Would this alone justify the subscription after your first month?"
- Probe for features that would make them open the app daily vs. weekly vs. never

**Success criteria**: 60%+ say they would check weekly or more. 40%+ say the forecast alone justifies continued subscription.
**Failure threshold**: Below 30% weekly check-in intent signals cash-flow forecasting is not a strong retention lever, and R03 (post-spike churn) remains unmitigated.
**Timeline**: 2 weeks (1 week prototype build, 1 week user sessions)
**Cost**: $500-1,500 (Figma is free; costs are participant incentives)
**Priority**: 3 (important for long-term viability; can run after EXP-01/EXP-03 confirm demand and feasibility)

---

### EXP-07: SMS Compliance & Cost Feasibility Check

**Assumption tested**: A6
**Hypothesis**: SMS follow-ups can be sent compliantly (10DLC registered, TCPA opt-in flow designed) at a per-message cost that keeps the unit economics viable at $29-49/mo.
**Method**:
- Research: 10DLC registration requirements and timeline (via Twilio/MessageBird documentation)
- Model SMS costs: estimate messages per user per month (assume 20-40 invoices tracked, 2-3 SMS per overdue invoice sequence = 15-40 SMS/mo per user)
- Calculate: at $0.0079/segment (Twilio US pricing), cost per user = $0.12-0.32/mo — check if this holds with longer messages requiring multiple segments
- Map the opt-in flow: who opts in? The SMB's customers must consent to receive SMS. Design the opt-in capture mechanism (invoice footer, initial email link, payment portal checkbox)
- Identify: timeline to 10DLC approval, rejection risk factors, A2P throughput limits for new brands

**Success criteria**: Per-user SMS cost below $2/mo (leaves healthy margin at $29/mo tier). 10DLC registration achievable within 4 weeks. Opt-in flow designable without requiring SMB's customers to take extra steps.
**Failure threshold**: Per-user SMS cost above $5/mo, or 10DLC registration timeline exceeds 8 weeks, or opt-in flow requires customer action that SMB owners say their clients won't take.
**Timeline**: 1 week (desk research + cost modeling; no build required)
**Cost**: $0 (research only)
**Priority**: 2 (quick and cheap; run in parallel with EXP-01 and EXP-03)

---

## Experiment Sequencing

```
Week 1-2:  [EXP-01 Landing Page] + [EXP-03 API Spike] + [EXP-07 SMS Research]
Week 2-3:  [EXP-04 Tone Test begins] + [EXP-01 continues collecting traffic]
Week 3-4:  [EXP-02 Pre-Sale Deposits] + [EXP-05 Pricing Survey] + [EXP-04 continues]
Week 4-5:  [EXP-06 Retention Prototype Test]
Week 5-6:  Analysis, synthesis, go/no-go inputs ready
```

**Total timeline**: 5-6 weeks
**Total budget**: $3,350-5,700 (excluding developer time for EXP-03)

---

## Decision Gates

| Gate | Condition | Triggered by | Decision |
|---|---|---|---|
| **GATE 1** (end of Week 2) | EXP-01 signup rate < 4% AND EXP-03 hits API showstopper | EXP-01, EXP-03 | STOP — revisit concept or pivot |
| **GATE 2** (end of Week 4) | EXP-02 deposit rate < 8% OR EXP-04 tone comfort < 60% | EXP-02, EXP-04 | PAUSE — redesign value prop or tone engine before proceeding |
| **GATE 3** (end of Week 6) | Composite results across all experiments | All | GO / NO-GO / PIVOT decision with data |

---

## Risks Surfaced for Register

| ID | Risk | Severity | Source |
|---|---|---|---|
| R05 | Landing page test may attract early-adopter bias, overstating general demand | LOW | Experiment Tracker |
| R06 | QuickBooks app review process may impose restrictions on messaging/automation features | MEDIUM | Experiment Tracker |
| R07 | Opt-in requirement for SMS to SMB's end-customers adds friction that may kill the SMS channel entirely | MEDIUM | Experiment Tracker |

---

## Next Session

**Session 07**: Reality check and stress test — led by **Testing Reality Checker**.
