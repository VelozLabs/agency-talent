# Session 02 — Home Services Lead Gen: Deep Dive
**Project**: Orlando Local Ideation
**Agents**: SEO Specialist · Backend Architect · Data Engineer · Idea Generator
**Focus**: Orlando home services lead gen — AC repair, pool service, roofing, hurricane prep

---

## SEO Specialist Perspective

### The Opportunity
Orlando's home services search market is dominated by national aggregators (Angi, HomeAdvisor, Thumbtack) that rank on broad terms but fail on local depth. Google's local algorithm rewards domain authority + geographic relevance + review signals. A Florida-specific platform can outrank nationals on long-tail and hyper-local queries within 6-12 months.

### Primary Keyword Clusters

#### Cluster 1: HVAC / AC (Highest volume, highest CPCs — most valuable)
| Keyword | Intent | Monetization |
|---|---|---|
| ac repair orlando | Emergency / transactional | Lead sale $25-50 |
| air conditioning repair orlando fl | Transactional | Lead sale $25-50 |
| hvac repair near me orlando | High-intent local | Lead sale $25-50 |
| ac not cooling orlando | Problem-aware | Lead sale $20-40 |
| emergency ac repair orlando | Urgent, highest value | Lead sale $40-75 |
| ac tune up orlando | Seasonal / maintenance | Lead sale $15-25 |
| hvac companies orlando fl | Comparison | Featured listing $99-199/mo |
| best ac repair orlando | Comparison | Featured listing $99-199/mo |

#### Cluster 2: Pool Service (High frequency, year-round in FL)
| Keyword | Intent | Monetization |
|---|---|---|
| pool cleaning service orlando | Recurring need | Lead sale $10-20 |
| pool repair orlando | Transactional | Lead sale $20-35 |
| pool resurfacing orlando | High-ticket | Lead sale $30-60 |
| pool leak detection orlando | Emergency | Lead sale $25-45 |
| weekly pool service orlando | Subscription need | Lead sale $10-15 |
| pool companies near me orlando | Comparison | Featured listing |

#### Cluster 3: Roofing (Highest ticket, highest CPC)
| Keyword | Intent | Monetization |
|---|---|---|
| roof repair orlando | Transactional | Lead sale $40-80 |
| roofing companies orlando fl | Comparison | Lead sale $40-80 |
| roof replacement orlando | High-ticket | Lead sale $60-100 |
| storm damage roof repair orlando | Post-storm surge | Lead sale $50-90 |
| roof inspection orlando | Entry-funnel | Lead sale $20-40 |
| metal roofing orlando | Specific product | Lead sale $50-80 |

#### Cluster 4: Hurricane Prep (Seasonal spike — June–November)
| Keyword | Intent | Monetization |
|---|---|---|
| hurricane shutters orlando | Seasonal / urgent | Lead sale $30-60 |
| impact windows orlando | High-ticket | Lead sale $50-100 |
| generator installation orlando | Pre-storm | Lead sale $40-75 |
| tree trimming before hurricane orlando | Pre-storm | Lead sale $20-35 |
| hurricane prep contractors orlando | Broad | Lead sale $30-50 |

### Content Strategy
- **City + service landing pages**: One page per service per neighborhood (Winter Park, Lake Nona, Windermere, Dr. Phillips, Kissimmee, Sanford). Example: `/ac-repair/winter-park/`, `/pool-service/lake-nona/`
- **Problem-aware content**: "Why is my AC not cooling in Florida heat?", "How to tell if your roof has hurricane damage"
- **Seasonal content calendar**: Hurricane prep guides (May), AC maintenance (March, September), pool opening/closing (doesn't apply in FL — year-round angle instead)
- **Schema markup**: LocalBusiness, Service, Review — structured data gives an immediate edge over competitors that don't implement it
- **Google Business Profile**: Create/claim profiles for the platform itself as a local aggregator

### Competitive Gap
Angi and HomeAdvisor rank on head terms but have thin location pages. Their DR is high but their content is generic. A Florida-native site with deep local content (permitting info, FL contractor license lookup, local review data) can outrank them on the long tail within 90 days with consistent publishing.

### 90-Day SEO Action Plan
1. **Days 1-30**: Build and publish 20 core service+location pages. Submit sitemap. Claim Google Business Profile. Target zero-competition long-tail terms first.
2. **Days 31-60**: Publish 10 problem-aware blog posts. Build citations on FL-specific directories (Florida Contractors Association, local chambers). Begin outreach for local backlinks (Orlando Sentinel home section, neighborhood blogs).
3. **Days 61-90**: Expand to 15 additional neighborhood pages. Launch review collection for early contractor partners. Monitor ranking movement and double down on what's climbing.

---

## Backend Architect Perspective

### System Overview
The platform has two user types — **homeowners** (demand) and **contractors** (supply) — and one core transaction: a qualified lead passing from homeowner to contractor. Everything else is in service of that flow.

### Core Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Public Web (SSR)                   │
│  Service pages · Location pages · Blog · Search      │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│                   Lead Capture API                   │
│  POST /leads — validate, score, route                │
└───────┬───────────────────────────┬─────────────────┘
        │                           │
┌───────▼──────────┐     ┌──────────▼──────────────┐
│   Lead Router    │     │   Contractor Portal      │
│  Match by:       │     │  Dashboard · Billing     │
│  - Service type  │     │  Lead history · Reviews  │
│  - ZIP code      │     │  Profile management      │
│  - Availability  │     └─────────────────────────┘
│  - Bid price     │
└───────┬──────────┘
        │ SMS + Email
┌───────▼──────────┐
│   Contractor(s)  │
│   Notification   │
└──────────────────┘
```

### Lead Flow (Critical Path)
1. Homeowner lands on `/ac-repair/orlando/`
2. Fills short form: service needed, ZIP, urgency, brief description
3. System scores lead (urgency signal, ZIP coverage, completeness)
4. Lead routed to 2-3 matched contractors simultaneously (creates competition, improves response time)
5. Contractors notified via SMS + email with lead details
6. Contractor claims lead (first-click or auction model)
7. Homeowner notified with contractor contact info
8. Follow-up SMS to homeowner 48hrs later: "Did [Contractor] help?" → feeds review system

### Data Models

```
Lead {
  id, service_type, zip_code, urgency,
  description, contact_info,
  status: [new | claimed | contacted | closed | disputed],
  created_at, claimed_at, claimed_by
}

Contractor {
  id, name, license_number, license_verified,
  services[], coverage_zips[],
  subscription_tier, lead_credits,
  avg_response_time, review_score
}

LeadMatch {
  lead_id, contractor_id,
  notified_at, claimed_at, outcome
}
```

### Monetization Models to Support (build for both, launch with one)
- **Pay-per-lead**: Contractor pre-buys credits ($200-500/month), each lead claim deducts credits. Simplest to launch.
- **Subscription + featured**: Monthly fee for lead access + premium placement. Easier to forecast revenue.
- **Hybrid**: Base subscription covers X leads/month; overage at per-lead price.

### Tech Stack Recommendation (fast to launch)
- **Frontend**: Next.js (SSR for SEO — critical for this business)
- **Backend**: Node.js + PostgreSQL
- **Auth**: Clerk or Auth0 for contractor portal
- **SMS**: Twilio (lead notifications + homeowner follow-ups)
- **Email**: Resend or Postmark
- **Payments**: Stripe (subscriptions + credit purchases)
- **Hosting**: Vercel (frontend) + Railway or Render (API)

### MVP Scope (30-day build)
Must-haves: Lead capture form · ZIP-based contractor matching · SMS/email notification · Contractor claim flow · Stripe payment for lead credits
Skip for now: Contractor portal UI · Review system · Auction/bidding · Analytics dashboard

### 90-Day Scaling Concerns
- **Lead quality disputes**: Contractors will dispute leads. Build a simple dispute flow from day one — it protects revenue and trust.
- **ZIP coverage gaps**: If no contractor covers a ZIP, the lead dies. Start dense in Orange County before expanding.
- **Response time**: Homeowners abandon if not contacted within 2 hours. Build urgency into contractor notifications.

---

## Data Engineer Perspective

### The Core Data Problem
Contractor data in Florida is fragmented across:
- **DBPR** (FL Dept of Business & Professional Regulation) — official license database, public
- **Google Maps / Google Business Profiles** — reviews, hours, contact info
- **BBB** (Better Business Bureau) — complaints and accreditation
- **Angi / HomeAdvisor / Thumbtack** — existing reviews and profiles (scrapeable)
- **County permit databases** — Orange, Seminole, Osceola, Osceola counties all have permit records
- **FL Dept of Agriculture** — pest control licenses

### Data Pipeline Architecture

```
Sources                    Ingestion              Storage            Serving
──────                     ─────────              ───────            ───────
DBPR License API  ────────► License ETL ─────────► contractors       ► Contractor
Google Places API ────────► Places ETL ──────────► raw_reviews         Portal API
County Permits    ────────► Permit ETL ──────────► permits
BBB RSS/scrape    ────────► Review ETL ──────────► quality_signals   ► Lead Router
Existing listings ────────► Profile ETL ─────────► enriched_profiles   (ZIP + service
                                                                         matching)
```

### DBPR License Data (Free, Public, High-Value)
Florida's DBPR publishes a bulk license export at `myfloridalicense.com`. Fields available:
- License number, type (CFC = HVAC, CCC = roofing, CPO = pool), status (active/inactive/suspended)
- Licensee name, DBA name, county, phone, address
- Issue date, expiration date, complaint history

**ETL approach**: Download weekly bulk export (CSV) → parse and upsert into `contractors` table → flag expired/suspended licenses automatically → surface "verified license" badge only for active licenses.

This is the trust moat. No competitor surfaces FL license status in real time. Parents — homeowners — care deeply about whether a contractor is actually licensed.

### Google Places Enrichment
For each contractor in the DBPR data:
1. Search Google Places API by name + city
2. Pull rating, review count, hours, website, phone
3. Match and merge on name + address similarity (fuzzy match)
4. Store raw reviews for sentiment analysis

**Cost**: Google Places API costs ~$17 per 1,000 lookups. For 10,000 Orlando contractors, first enrichment = ~$170. Incremental updates are cheap.

### County Permit Data
Orange County permits are available via their open data portal. Useful signals:
- How many permits has this contractor pulled? (proxy for experience and volume)
- Any open/failed inspections? (quality signal)
- What neighborhoods do they work in? (helps ZIP coverage mapping)

**ETL approach**: Scheduled weekly pull from county open data API → join to `contractors` on license number or business name → update `permit_count` and `last_permit_date` fields.

### Data Quality Scoring
Each contractor gets an automated quality score (0-100) based on:

| Signal | Weight | Source |
|---|---|---|
| License active | 30 pts | DBPR |
| License age (>3 yrs) | 10 pts | DBPR |
| Google rating ≥ 4.0 | 20 pts | Google Places |
| Review count ≥ 10 | 10 pts | Google Places |
| Permit history (>5 permits) | 15 pts | County data |
| No BBB complaints | 10 pts | BBB |
| Profile completeness | 5 pts | Internal |

Contractors scoring below 40 are flagged for manual review before being shown to homeowners.

### Bootstrapping the Dataset
Before any scraping or APIs, fastest path to first 500 contractors:
1. Download DBPR bulk export for Orange, Seminole, Osceola counties — filtered by CFC (HVAC), CCC (roofing), CPO (pool), CGC (general contractor)
2. Cross-reference against Google Maps for phone + reviews
3. Import top 500 by review count as seed data
4. Manual outreach to top 50 to claim their profiles

**Timeline**: 2 engineers, 3 days to seed dataset. Automated enrichment pipeline in week 2.

### Off-Peak Data Expansion
The same pipeline extends to after-school programs, rental listings, or any other local vertical — the ETL framework is reusable. Build it right for home services and the second vertical is 80% cheaper.

---

## Idea Generator Synthesis

### What the Three Agents Tell Us

The SEO Specialist confirms **demand is real and capturable** — high-intent, high-CPC terms with weak local competition. The Backend Architect shows the platform is **simple enough to MVP in 30 days**. The Data Engineer reveals the actual moat: **Florida's public DBPR license data is free, structured, and nobody's using it** as a trust layer.

### The Differentiated Angle Nobody Has Built
Every competitor shows you reviews. Nobody shows you:
- Whether the contractor's Florida license is currently active
- How many permits they've pulled in your county
- Whether they've had complaints filed with the state

That's the "verified contractor" brand. It's not just a badge — it's a data pipeline that refreshes weekly from public sources. Homeowners pay a premium (in trust → conversion) for it. Contractors pay a premium (in featured placement) to display it.

### The 90-Day Monetization Path

| Week | Action | Revenue Trigger |
|---|---|---|
| 1-2 | Seed 500 contractors from DBPR + Google data | — |
| 2-4 | Build lead capture + SMS routing MVP | — |
| 3-4 | Launch 20 SEO landing pages | — |
| 4-6 | Cold outreach to 50 top-rated contractors | First paying contractors |
| 5-8 | Google Ads on "emergency AC repair Orlando" to seed leads | First leads sold |
| 6-10 | Organic rankings start moving on long-tail terms | Organic leads begin |
| 10-12 | Expand to roofing and pool service verticals | Revenue diversification |

**Conservative 90-day revenue estimate**: 10 contractors × $199/month = $2K MRR from subscriptions. 50 leads/month × $30 avg = $1.5K from pay-per-lead. Total: ~$3.5K MRR by day 90 with 2 people working part-time.

### Biggest Risks
1. **Contractor acquisition** — homeowner side is easy to seed with ads; contractor side requires direct sales. Budget 40% of early effort here.
2. **Lead quality disputes** — one bad contractor tanks trust. The DBPR scoring system is the defense.
3. **Seasonality** — AC leads spike May-September, roofing spikes after storms. Pool is year-round. Start with pool to smooth revenue.
