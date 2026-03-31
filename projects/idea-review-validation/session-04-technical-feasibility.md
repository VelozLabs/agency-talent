# Session 04 — Technical Feasibility & MVP Scoping
**Project**: Idea Review & Validation
**Idea**: Smart Receivables & Cash-Flow Assistant
**Date**: 2026-03-31
**Agents**: Engineering Software Architect, Engineering Rapid Prototyper

---

## Software Architect Analysis

### Recommended Architecture

```
┌─────────────────────────────────────────────────┐
│                   CLIENT LAYER                   │
│        Web App (React) + Mobile (PWA/RN)         │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│                   API GATEWAY                    │
│             (REST API — Node.js/Express          │
│              or Python/FastAPI)                   │
└───┬──────────┬──────────┬──────────┬────────────┘
    │          │          │          │
┌───▼───┐ ┌───▼───┐ ┌───▼───┐ ┌───▼───────────┐
│ SYNC  │ │SEQUENCE│ │ CASH  │ │   MESSAGING   │
│ENGINE │ │ ENGINE │ │ FLOW  │ │   SERVICE     │
│       │ │        │ │ENGINE │ │               │
│QB/Xero│ │Schedule│ │Projec-│ │ Email: SES /  │
│OAuth +│ │& state │ │tion & │ │  SendGrid     │
│webhook│ │machine │ │alerts │ │ SMS: Twilio   │
└───┬───┘ └───┬───┘ └───┬───┘ └───────────────┘
    │          │          │
┌───▼──────────▼──────────▼───────────────────────┐
│              DATA LAYER                          │
│    PostgreSQL (invoices, customers, sequences)   │
│    Redis (job queue, rate limiting, caching)      │
└─────────────────────────────────────────────────┘
```

### Core Components

**1. Sync Engine (QuickBooks/Xero Integration)**
- OAuth 2.0 connection flow per accounting platform
- Webhook-based real-time sync (QB supports webhooks for invoice events) with polling fallback (every 15-30 min)
- Data normalization layer: QB and Xero use different schemas — normalize into internal invoice model (invoice ID, amount, due date, status, customer, contact info, partial payments)
- Token refresh handling with retry logic
- Scope: read invoices, read payments, read customers. No write-back required for MVP.

**2. Sequence Engine (Follow-Up Automation)**
- State machine per invoice: `new → due_soon → overdue_step1 → overdue_step2 → overdue_final → paid → written_off`
- Configurable timing rules: "Send Step 1 at Day +3, Step 2 at Day +10, Step 3 at Day +21"
- Per-customer overrides: tone level, channel preference, pause/skip
- Template rendering with merge fields: `{{customer_name}}`, `{{invoice_number}}`, `{{amount_due}}`, `{{days_overdue}}`, `{{payment_link}}`
- Job queue (BullMQ on Redis or similar) for scheduled sends with retry and dead-letter handling

**3. Cash-Flow Engine**
- Input: open invoices + due dates + historical payment patterns per customer
- Model: weighted probability of payment by due date based on each customer's historical behavior (simple: average days-to-pay per customer)
- Output: 30/60/90-day projected inflow timeline, flagged shortfall dates
- MVP can use simple heuristics; ML-based prediction is a v2 enhancement

**4. Messaging Service**
- Email: SendGrid or AWS SES (both reliable, affordable, good deliverability)
- SMS: Twilio (10DLC registration required; built-in compliance tooling)
- Abstraction layer so channels can be added (WhatsApp, voice) later
- Delivery tracking: open rates, bounce handling, opt-out processing

### Integration Risk Assessment

| Integration | Risk Level | Details |
|---|---|---|
| **QuickBooks Online API** | LOW | Well-documented, stable, sandbox available. Webhook support. App marketplace review takes 4-8 weeks but is well-understood. |
| **Xero API** | LOW | Similar quality to QB. OAuth 2.0, webhooks, good docs. Marketplace review slightly faster. |
| **SendGrid / SES** | VERY LOW | Commodity service. Battle-tested at all scales. |
| **Twilio SMS** | MEDIUM | 10DLC registration adds 2-4 week lead time. Per-message cost is low but opt-in compliance adds UX complexity. Campaign registration may be rejected for "debt collection" category — must position as "business communication." |
| **FreshBooks API** | MEDIUM | Less mature API. Limited webhook support. Worth deferring to v1.1. |

### Security & Compliance Requirements

| Requirement | Approach |
|---|---|
| **Financial data handling** | Encrypt at rest (AES-256) and in transit (TLS 1.3). Never store bank account numbers — only invoice metadata. |
| **OAuth token storage** | Encrypted in database with per-tenant encryption keys. Token rotation on refresh. |
| **TCPA / SMS compliance** | Opt-in must be captured and logged. Opt-out honored within 24 hours. Quiet hours enforcement (no SMS before 8am or after 9pm local). |
| **Data residency** | US-based hosting for v1 (AWS us-east-1 or us-west-2). GDPR considerations if serving UK/EU Xero users — defer to v1.1. |
| **SOC 2** | Not required for launch but should architect with SOC 2 Type I in mind (logging, access controls, audit trail). |
| **Multi-tenancy** | Logical isolation via tenant ID on all queries. Row-level security in PostgreSQL. |

### Data Model (Core Entities)

```
Tenant (id, name, plan, created_at)
Connection (id, tenant_id, platform [qb|xero], oauth_tokens, sync_status)
Customer (id, tenant_id, external_id, name, email, phone, avg_days_to_pay)
Invoice (id, tenant_id, customer_id, external_id, amount, due_date, status, paid_date, synced_at)
Sequence (id, tenant_id, name, steps[])
SequenceStep (id, sequence_id, delay_days, channel, template_id, tone)
InvoiceSequenceRun (id, invoice_id, sequence_id, current_step, status, next_send_at)
Message (id, run_id, channel, content, sent_at, delivered, opened, replied)
Template (id, tenant_id, name, channel, tone, body, merge_fields[])
```

---

## Rapid Prototyper Analysis

### MVP Scope: What's In v1

| Feature | Priority | Effort | Notes |
|---|---|---|---|
| QuickBooks Online integration (read invoices + payments) | P0 | 2 weeks | Core integration; gates everything |
| "Who Owes You" dashboard | P0 | 1 week | Single-screen view of overdue invoices |
| Follow-up sequence builder (3-step default) | P0 | 1.5 weeks | Set once, runs automatically |
| Email follow-up delivery (SendGrid) | P0 | 1 week | Template rendering + scheduling |
| Template library (6 defaults: 3 tones x 2 channels) | P0 | 0.5 weeks | Pre-written; user can edit |
| Impact dashboard ("recovered $X, DSO improved by Y") | P0 | 1 week | Key retention and conversion driver |
| User auth + onboarding flow | P0 | 1 week | OAuth signup, QB connection, first sequence setup |
| Basic cash-flow view (30-day projected inflows) | P1 | 1 week | Simple: sum of invoices by expected pay date |
| SMS follow-ups (Twilio) | P1 | 1.5 weeks | 10DLC registration runs in parallel with build |
| Xero integration | P1 | 1 week | After QB is proven; similar architecture |
| Per-customer tone/channel preferences | P1 | 0.5 weeks | Simple settings per customer |

### What's NOT in v1

- FreshBooks / Wave integrations (v1.1)
- ML-based payment prediction (v2 — simple heuristics first)
- Multi-user / team accounts (v1.1)
- White-label or API access (v2)
- Template marketplace (v2)
- Mobile native app (PWA is sufficient for v1)
- 60/90-day cash-flow forecasting with what-if scenarios (v1.1)
- Payment link generation (defer — let QB/Xero handle payment collection)
- Reporting / export (v1.1)

### Tech Stack Recommendation

| Layer | Choice | Rationale |
|---|---|---|
| **Backend** | Node.js (Express or Fastify) | Fast development, strong ecosystem for API integrations, TypeScript for safety |
| **Database** | PostgreSQL (via Supabase or AWS RDS) | Robust, row-level security, JSON columns for flexible config |
| **Job Queue** | BullMQ (Redis) | Reliable scheduled jobs for follow-up timing; built-in retry/dead-letter |
| **Frontend** | React + Tailwind (or Next.js) | Standard, fast to build, easy to hire for |
| **Email** | SendGrid (free tier: 100/day) | Scales well, good deliverability, webhooks for tracking |
| **SMS** | Twilio | Industry standard, 10DLC support, compliance tooling |
| **Hosting** | Vercel (frontend) + Railway or Render (backend) | Fast deploys, cheap at low scale, no DevOps overhead |
| **Auth** | Clerk or Auth0 | Quick setup, OAuth flows handled, JWT tokens |

### MVP Timeline

```
Week 1-2:   Project setup, auth, data model, QuickBooks OAuth + sync
Week 3-4:   Sequence engine, template system, email delivery
Week 5:     Dashboard (Who Owes You + Impact metrics)
Week 6:     Onboarding flow, testing, polish
Week 7:     SMS integration, cash-flow view (P1 features)
Week 8:     Beta launch prep, QuickBooks app review submission

Total: 8 weeks to beta with a solo full-stack developer
       6 weeks with two developers
```

### Cost to MVP

| Item | Cost |
|---|---|
| Hosting (first 3 months) | $50-150/mo |
| SendGrid (up to 100 emails/day free, then $20/mo) | $0-20/mo |
| Twilio SMS (after 10DLC approval) | $0.0079/msg + $2/mo per number |
| Supabase or Railway (database + backend) | $25-50/mo |
| Domain + SSL | $15/year |
| QuickBooks Developer Account | Free |
| **Total monthly run cost at launch** | **$75-220/mo** |

Break-even: 3-5 paying customers at $49/mo covers infrastructure.

### Quick Wins for Demo / Investor Pitch

1. **"Who Owes You" screen with live QB data** — Visually compelling, immediately demonstrates value
2. **Send first reminder in 60 seconds** — Connect QB → see overdue invoices → tap "Send Reminder" → done
3. **Impact counter** — Even in demo: "If these 5 overdue invoices paid today, you'd have $12,400 more cash on hand"

---

## Combined Technical Feasibility Score

| Dimension | Score (1–5) | Rationale |
|---|---|---|
| **Integration complexity** | 4 | QB/Xero APIs are well-documented; no novel integration challenges |
| **Architecture risk** | 5 | Standard SaaS architecture; no exotic components |
| **MVP timeline** | 4 | 6-8 weeks is realistic for experienced full-stack dev; no moonshot features |
| **Infrastructure cost** | 5 | Sub-$200/mo at launch; break-even at 3-5 customers |
| **Scalability path** | 4 | Architecture supports growth without redesign; job queue handles async at scale |

**Technical Feasibility Composite: 4.4 / 5** — No technical blockers. Standard SaaS build with proven integrations.

---

## Risks Surfaced for Register

| ID | Risk | Severity | Source |
|---|---|---|---|
| R07 | QuickBooks app review rejection or delay (4-8 weeks) could slip launch timeline | MEDIUM | Software Architect |
| R08 | Twilio 10DLC registration may be rejected under "debt collection" category | MEDIUM | Software Architect |
| R09 | Solo-developer MVP risk — no redundancy if developer is blocked or leaves | MEDIUM | Rapid Prototyper |

---

## Next Session

**Session 05**: Business model & competitive positioning — led by **Sales Deal Strategist** and **Marketing Growth Hacker**.
