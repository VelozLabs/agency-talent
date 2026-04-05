# Session 06 — Analytics, KPIs & Attribution
**Project**: TruckPulse AI
**Date**: 2026-04-05
**Agents**: Analytics Reporter (`support-analytics-reporter`) + SEO Specialist (`marketing-seo-specialist`)
**Status**: Output (agent-authored)
**Prerequisite**: Session 05 completed

---

## KPI Framework

### North Star Metric
**Weekly Active Scans (WAS)** — the number of unique vehicle scans run in a 7-day period. This metric captures product value delivery, retention signal, and monetization potential simultaneously. All other metrics ladder up to this.

### Tier 1 — Business Metrics (weekly review)
| Metric | Target Month 1 | Target Month 3 | Target Month 6 |
|---|---|---|---|
| Weekly Active Scans | 50 | 300 | 1,000 |
| Pre-Purchase Scan revenue | $1,000 | $8,000 | $25,000 |
| Monthly Recurring Revenue (MRR) | $0 | $2,000 | $12,000 |
| Total app installs | 200 | 1,500 | 6,000 |
| Paid conversion rate (install → purchase) | — | 8% | 12% |

### Tier 2 — Community Metrics (weekly review)
| Metric | Target Month 1 | Target Month 3 | Target Month 6 |
|---|---|---|---|
| Reddit combined karma | 500 | 5,000 | 10,000+ |
| Reddit referral traffic (sessions) | 200 | 1,200 | 4,000 |
| TikTok followers | 1,000 | 15,000 | 50,000 |
| TikTok avg view completion rate | 55% | 65% | 70%+ |
| TikTok profile link clicks (bio) | 100 | 800 | 3,000 |

### Tier 3 — Content Performance (per-post tracking)
| Metric | Healthy | Investigate | Kill |
|---|---|---|---|
| TikTok engagement rate | 8%+ | 4–8% | <4% |
| TikTok view completion | 65%+ | 45–65% | <45% |
| Reddit upvote ratio | 90%+ | 75–90% | <75% |
| Reddit comment depth (avg) | 3+ | 1–3 | <1 |
| Landing page CVR | 8%+ | 4–8% | <4% |

### Tier 4 — Paid Media Metrics (per-campaign tracking)
| Metric | Target | Pause Threshold |
|---|---|---|
| TikTok Spark Ad CTR | 1.5%+ | <0.8% after $150 spend |
| Reddit Promoted Post CTR | 0.5%+ | <0.3% after $100 spend |
| Cost per app install (CPI) | <$5 | >$10 |
| Cost per scan purchase (CAC) | <$25 | >$40 |
| Return on ad spend (ROAS) | 2.5x+ | <1.5x |

---

## Dashboard Architecture

### Dashboard 1: Daily Operations (real-time)
**Owner**: Harold (daily 10-minute review)
**Data sources**: App analytics, Stripe, TikTok Analytics, Reddit notification
**Contents**:
- New scans run (today vs. 7-day avg)
- New installs (today)
- Revenue (today vs. 7-day avg)
- TikTok top video last 48h (views, completion rate)
- Reddit mentions (new)

**Tool**: Simple Notion or Airtable dashboard pulling from Stripe webhooks + app analytics API

### Dashboard 2: Weekly Growth Review (Monday morning)
**Owner**: Harold + any growth advisor
**Data sources**: All channels, aggregated
**Contents**:
- WAS trend (chart, 8-week rolling)
- MRR + churn snapshot
- Community metrics (Reddit karma, TikTok growth)
- Content performance table (top 5 + bottom 5 posts by engagement)
- Paid media spend vs. CAC (if paid is live)
- Funnel: install → scan → purchase rates

**Tool**: Google Looker Studio connected to Stripe, app analytics, and social APIs

### Dashboard 3: Monthly Strategy Dashboard
**Owner**: Harold (monthly board-level review)
**Contents**:
- Revenue vs. projection
- CAC by channel
- LTV estimates (early)
- Product funnel cohorts
- Community trust indicators (AMA engagement, Reddit reputation)
- Next 30-day priorities

---

## Analytics Stack Recommendation

| Layer | Tool | Purpose |
|---|---|---|
| App analytics | PostHog (self-hosted) or Amplitude | User behavior, funnel analysis, feature adoption |
| Revenue | Stripe Dashboard + Stripe Sigma | Payment data, MRR, churn |
| Attribution | Branch.io or AppsFlyer | Mobile attribution, UTM tracking |
| Social | TikTok Analytics (native) + Metricool | Social performance aggregation |
| Reddit | Reddit Insights (limited) + manual tracking | Community metrics |
| SEO | Google Search Console + Ahrefs | Search visibility, DTC library performance |
| Email | ConvertKit or Beehiiv | Newsletter analytics |

**Phase 1 stack** (launch): PostHog + Stripe + TikTok Analytics native + Google Search Console (low cost, high signal)
**Phase 2 stack** (Month 3+): Add Amplitude + Branch.io once paid attribution becomes important

---

## SEO Strategy (SEO Specialist Input)

### Opportunity: DTC Search Traffic

F-150 owners Google their DTC codes daily. This is high-intent, zero-competition SEO territory that TruckPulse can own.

**Keyword examples**:
| Keyword | Monthly Searches (est.) | Difficulty | TruckPulse Angle |
|---|---|---|---|
| "P0171 F-150" | 4,400 | Low | F-150 specific guide, app CTA |
| "P0420 Ford F-150" | 3,600 | Low | Catalyst efficiency guide |
| "F150 OBD2 codes" | 2,900 | Medium | Pillar page + DTC library |
| "FordPass alternative" | 1,200 | Low | Direct comparison content |
| "pre purchase inspection F-150" | 880 | Low | Pre-Purchase Scan CTA |
| "F-150 diagnostic app" | 720 | Low | Product landing page |
| "F-150 warranty coverage DTC" | 590 | Low | Warranty Shield content |
| "OBDLink MX+ F-150" | 480 | Low | Adapter guide + TruckPulse pairing |

**Strategy**: Build a public DTC Library at `/dtc/[code]` with F-150-specific context. 50 pages targeting top F-150 DTC searches. Each page:
- Plain English explanation of the code
- F-150 trim/year specific context
- Severity assessment
- TSB matches (if any)
- "Check this DTC in TruckPulse" CTA

**Target**: 10,000+ monthly organic search sessions by Month 6 from DTC library alone.

### SEO Content Priority Order
1. Top 10 F-150 DTC codes (P0171, P0420, P0300, P0301, P219A, U3003:12, B10D7, P0087, P0128, P144A)
2. F-150 trim-specific pages (Lariat diagnostic guide, Raptor common issues, Platinum module coverage)
3. Comparison pages ("FordPass vs TruckPulse", "FORScan vs TruckPulse", "OBD-II adapter comparison for F-150")
4. Pre-purchase guides ("How to inspect a used F-150")
5. Warranty coverage guides ("F-150 warranty DTCs that Ford should cover")

---

## Reporting Cadence

| Frequency | Report | Owner | Audience |
|---|---|---|---|
| Daily | Operations snapshot (5 lines) | Auto-generated | Harold |
| Weekly | Growth dashboard review | Analytics Reporter | Harold |
| Monthly | Full analytics report + narrative | Analytics Reporter | Harold + advisors |
| Quarterly | Cohort analysis + LTV estimates | Analytics Reporter + Harold | Strategic decision-making |

---

## Session 06 Deliverables

- [x] KPI framework with 4-tier structure defined
- [x] Three dashboards designed (daily/weekly/monthly)
- [x] Analytics stack recommended (Phase 1 and Phase 2)
- [x] SEO opportunity mapped (DTC library strategy)
- [x] Top 10 DTC keywords identified
- [x] Reporting cadence established

**Cleared for Session 07 (Reality Check)**
