# Session 03 — Contractor Sales Playbook
**Project**: Orlando Local Ideation
**Agents**: Outbound Strategist · Account Strategist
**Focus**: Acquiring and retaining Orlando home service contractors as paying platform vendors

---

## Outbound Strategist: Contractor Acquisition

### ICP Definition (Ideal Contractor Profile)

Not all contractors are worth pursuing. Prioritize based on signal strength:

**Tier 1 — Primary ICP** (highest conversion likelihood)
- Active FL license for 3+ years (established, not fly-by-night)
- Google rating ≥ 4.2 with 15+ reviews (they care about reputation)
- No dedicated website or a low-quality one (they feel the lead gen gap)
- Serving Orange, Seminole, or Osceola county
- Service: HVAC, pool, or roofing (highest lead value)

**Tier 2 — Secondary ICP**
- Active license < 3 years but strong review velocity (growing business, acquisition-hungry)
- Has a website but no visible paid ads presence (not already over-invested in marketing)
- Operates in adjacent counties: Lake, Volusia, Brevard (expansion targets later)

**Disqualify if**:
- Already active on Angi/HomeAdvisor with 50+ reviews (entrenched, price-sensitive)
- License expired, suspended, or under investigation
- Fewer than 5 Google reviews (too early-stage, lead quality expectations will mismatch)

### Signal-Based Prospecting Sources

The DBPR export gives name + license + phone. Layer on these signals to prioritize outreach order:

| Signal | What It Means | Where to Get It |
|---|---|---|
| Google reviews mentioning "quick response" | Values speed — will appreciate fast lead routing | Google Places API |
| Recent permit activity (last 90 days) | Actively working, capacity exists | County permit data |
| No website or site built pre-2020 | Underinvested in digital, motivated | Whois + visual check |
| Responds to Google reviews personally | Owner-operated, decision-maker is reachable | Google Business Profile |
| Active in local FB contractor groups | Social, open to new tools | Facebook search |

### Outreach Sequence — Cold Contractor (No Prior Relationship)

**Channel mix**: SMS-first, then email, then voicemail. Contractors don't sit at computers.

---

**Day 1 — SMS (from local 407 number)**
```
Hey [First Name], this is [Name] with [Platform]. We're building a lead
platform specifically for Orlando [HVAC/pool/roofing] contractors — verified
licenses, no Angi middleman markup. Sending you 2-3 free leads this month
to show you what we're working with. Worth a quick call? — [Name]
```
*Keep it under 160 chars. Local area code matters — contractors ignore out-of-state numbers.*

---

**Day 3 — Email (if no SMS reply)**
Subject: `Free leads for [Business Name] this month`

```
Hi [First Name],

Quick context: I'm building a lead gen platform for Orlando home service
contractors. Unlike Angi or HomeAdvisor, we're local-only, and we surface
your FL license status as a trust signal — which converts better with
homeowners who've been burned by unlicensed work.

I pulled your license from DBPR — it's active and clean. That puts you in
our Tier 1 contractor pool.

I'd like to send you 2-3 free leads this month, no strings. If they convert,
we talk about a paid arrangement. If they don't, you've lost nothing.

15 minutes this week?

[Name]
[Phone]
```

---

**Day 7 — SMS Follow-up**
```
[First Name] — following up on the free leads offer for [Business Name].
Spots are limited (keeping it to 3 contractors per service per ZIP). Still
interested? Just reply YES and I'll set you up.
```

---

**Day 12 — Voicemail (if still no response)**
```
"Hey [First Name], this is [Name]. I've been trying to reach you about a
free lead offer for [Business Name] — we're an Orlando-only platform, not
Angi, and I wanted to get you set up before we fill the [ZIP code] pool
slot. Call me back at [number] or just shoot me a text."
```

---

**Day 18 — Final email**
Subject: `Closing out your spot`

```
Hi [First Name],

I've been holding a [ZIP code] slot for [Business Name] but haven't heard
back. Closing it out this Friday and moving to the next contractor on the list.

If timing was bad, happy to revisit next month.

[Name]
```

*Scarcity is real — you are actually limiting contractors per ZIP to protect lead quality.*

---

### Objection Handling

| Objection | Response |
|---|---|
| "I already use Angi/HomeAdvisor" | "We're not replacing them — most contractors use 2-3 sources. We're Orlando-only and show your FL license status, which they don't. Try the free leads alongside what you're already doing." |
| "I have enough work right now" | "Perfect — then our pay-per-lead model means you only pay when you want leads. No monthly fee until you're ready to scale." |
| "How do I know the leads are quality?" | "We verify every homeowner's ZIP and contact info before routing. And your first 3 are free — judge for yourself." |
| "What's the cost?" | "Free to start. After the trial, $30-50 per lead depending on service type, or a flat $199/month subscription for unlimited access in your ZIP codes." |
| "I don't trust new platforms" | "Completely fair. That's why we start free. We're also using public DBPR data to verify every contractor on the platform — same standard applies to you, which is why we reached out." |

### First 30 Days: Contractor Acquisition Targets

| Week | Target | Goal |
|---|---|---|
| 1 | 50 HVAC contractors identified from DBPR + enriched | ICP list built |
| 1-2 | 30 contacted via SMS | 6-8 responses (20% reply rate) |
| 2 | 20 pool contractors added to sequence | Pipeline diversified |
| 2-3 | 5 free-trial contractors activated | First leads flowing |
| 3-4 | 3 contractors convert to paid ($199/mo or pay-per-lead) | First revenue |
| 4 | 20 roofing contractors added | Third vertical seeded |

**Target at Day 30**: 5-8 paying contractors, $1K-1.6K MRR from subscriptions alone.

---

## Account Strategist: Contractor Retention & Expansion

### The Contractor Lifecycle

```
Free Trial (2-3 leads) → Paid Starter → Expansion → Anchor Account
     Week 1-2              Month 1-3      Month 3-6      Month 6+
```

Each stage has different risks and expansion levers.

### Stage 1: Free Trial → Paid Conversion (Week 1-2)

**Goal**: Convert at least 1 of the 3 free leads into a closed job so the contractor sees ROI before the sales conversation.

**Actions**:
- Check in 48hrs after first lead delivery: "Did [Homeowner name] reach out? Any questions about the lead?"
- At Day 7: "How'd it go with the leads? Happy to walk you through our paid tiers — it's a 5-minute conversation."
- Frame the conversion around cost-per-acquisition, not monthly fee: "If one AC job is worth $800 to you, and you're paying $199/month for unlimited leads in your ZIP — you break even on the first job."

**Conversion rate target**: 40% of free trials → paid (industry benchmark for marketplace supply-side is 30-50%)

### Stage 2: Paid Starter — Preventing Early Churn (Month 1-3)

**The danger zone**: Contractors cancel in month 2 if leads don't convert or response time is slow.

**Retention playbook**:

*Week 2 check-in call (15 min)*
- How many leads received? How many contacted? How many closed?
- Are they responding within the 2-hour window? (Show them data — contractors who respond in <2hrs close 3x more)
- Any lead quality complaints? Handle immediately — dispute credits same day.

*Monthly performance summary (automated email)*
```
[Business Name] — Your October Performance

Leads received: 12
Leads contacted: 9 (75% contact rate)
Estimated jobs closed: 3 (based on your feedback)
Estimated revenue generated: $2,400
Platform cost: $199
ROI: 12x

Top ZIP codes for your leads: 32801, 32803, 32836
Suggested: Add 32819 to your coverage for 4 more leads/month
```

**Churn warning signals** (trigger immediate outreach):
- No lead claims in 7 days
- Contact rate drops below 50%
- Contractor stops responding to platform messages
- 2+ lead disputes in a month

### Stage 3: Expansion (Month 3-6)

Once a contractor is profitable on the platform, expand in three directions:

**1. ZIP code expansion**
"You're closing well in 32801 and 32803. Your two nearest uncovered ZIPs — 32819 and 32836 — have 15 active homeowner searches this month with no contractor assigned. Want to add them? It's $49/month per additional ZIP."

**2. Service category expansion**
"You're licensed for both HVAC and electrical. We just launched the electrical vertical in Orlando — you'd be one of the first 5 contractors in the pool. Early-access pricing is $149/month."

**3. Featured placement upsell**
"We're launching featured listings on our top service pages next month. You'd be the first result for 'AC repair Winter Park' — 300+ monthly searches. $99/month add-on. Want first right of refusal before we open it up?"

### Stage 4: Anchor Accounts (Month 6+)

Anchor accounts are contractors spending $400+/month across subscriptions, ZIP expansions, and featured placements. Treat them differently:

- **Quarterly business review (QBR)**: 30-min call reviewing leads, conversion rates, market conditions, upcoming seasonal surges
- **Early access to new features**: They get new verticals, new ZIP codes, and new ad products before general release
- **Named account ownership**: They have one contact at the platform — no support ticket queue
- **Referral program**: "Send us one contractor in a service we don't cover yet, get a $200 credit."

**Target anchor account profile**: HVAC contractor, 3 ZIPs, featured placement, 2 service categories = $199 + $98 + $99 + $149 = **$545/month**

### Revenue Expansion Model

| Contractor Stage | Monthly Revenue | Path to Next Stage |
|---|---|---|
| Free trial | $0 | 1 closed lead from trial |
| Paid Starter (1 ZIP) | $199 | Prove 5:1 ROI in 60 days |
| Expanded (3 ZIPs) | $297 | Consistent close rate >25% |
| + Featured placement | $396 | High search volume ZIP |
| + Second service category | $545 | Has dual license |
| Anchor (QBR relationship) | $545+ | Referral program active |

### Net Revenue Retention Target

At 12 months with healthy expansion:
- 20 contractors at $199 avg = $3,980 base MRR
- 30% expand to $300+ avg = additional $900
- 5 anchor accounts at $545 = $2,725
- **Target 12-month MRR: $7,600-9,000**

NRR goal: **120%** — meaning expansion revenue from existing contractors outpaces churn.

### Churn Prevention Benchmarks

| Metric | Target | Action if Below |
|---|---|---|
| Trial → paid conversion | 40% | Improve lead quality or ICP targeting |
| Month 1 retention | 85% | Faster check-in cadence, same-day dispute resolution |
| Month 3 retention | 75% | Monthly performance summaries, expansion offer |
| Avg leads per contractor/month | 10+ | Add more homeowner demand (SEO, ads) |
| Contractor contact rate | >60% | SMS reminders, 2-hour response coaching |

---

## Combined Synthesis: The 90-Day Contractor Funnel

```
DBPR Export (500 Orlando contractors)
        │
        ▼ ICP filter
Top 150 Tier 1 contractors
        │
        ▼ Outbound sequence (SMS → email → voicemail)
~30 responses (20% reply rate)
        │
        ▼ Free trial offer
~15 free trial activations (50% of responses)
        │
        ▼ Trial → paid conversion (40%)
~6 paying contractors by Day 30
        │
        ▼ Retention + expansion (Month 2-3)
~10 paying contractors by Day 60, avg $250/mo
        │
        ▼ ZIP expansion + featured placement upsell
~15 contractors by Day 90, avg $300/mo
        │
        ▼
~$4,500 MRR at Day 90 (contractor side alone)
```

### The One Thing That Determines Everything
Contractor acquisition lives and dies on **lead quality in the first 72 hours**. A contractor who receives a bad lead in week one churns before the account strategy has a chance to work. This means:
- The Data Engineer's quality scoring (session-02) must be live before the first lead is sent
- The Backend Architect's 2-hour response window SLA must be enforced from day one
- The SEO Specialist's landing pages must pre-qualify intent (emergency vs. routine vs. price shopping) so contractors know what they're getting

The sales motion is easy. The product has to earn it first.
