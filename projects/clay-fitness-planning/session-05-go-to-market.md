# Session 05 — Go-to-Market
**Agents**: Sales Outbound Strategist + Sales Account Strategist + Marketing Growth Hacker
**Input**: Sessions 00–04
**Date**: 2026-03-27
**Gate**: YES — Go / No-Go / Pivot required at end of session

---

## Part A: Outbound Strategist — Acquisition Strategy

### ICP Definition (Refined from Sessions 01–04)

**Primary ICP — The Self-Coached Intermediate**
- 30–45, male skew (75%), household income $80K+
- Follows a named program (ladder, GZCLP, 5/3/1, PHUL, PHUL, nSuns, etc.)
- Owns Apple hardware (iPhone + Watch minimum; Oura/WHOOP is a strong signal)
- Active in evidence-based fitness communities online
- Currently uses a "good enough" app with documented friction
- Pays for apps: currently spending $0–$15/month on fitness apps
- **Where to find them**: r/weightroom, r/fitness, r/powerlifting, Alan Thrall's YouTube comments, Jeff Nippard's Discord, evidence-based fitness podcasts (Stronger by Science, Iron Culture)

**Secondary ICP — The Returning Athlete**
- 32–45, female skew (60%), family or career life transition
- Looking to restart structured training without rebuilding from scratch
- More likely to respond to the "Why" framing than the programming intelligence angle
- **Where to find them**: r/xxfitness, women's strength community on Instagram, physical therapy referral networks

### Pre-Launch Acquisition: The Waitlist Strategy

Clay should not launch cold. The right approach is a high-signal waitlist with a framing that self-selects for the ICP.

**Waitlist positioning**: Not "a new fitness app." Specifically: "A fitness app for people who already know what they're doing."

This framing does three things:
1. Tells Harold it's for him specifically
2. Implicitly says "we're not going to condescend to you with basic tips"
3. Creates scarcity/exclusivity without manufactured urgency

**Waitlist page must-haves**:
- One sentence of product positioning
- The anti-gamification promise stated plainly: "No streaks. No confetti. No 'crush it.' Just your training, understood."
- A single whisper example (e.g., "Your top-set weight has been flat for three weeks. This is a common inflection point in ladder models.")
- One email field. No other fields. No questionnaire.

**Target waitlist before launch**: 2,000–3,000 qualified signups. At the Harold ICP's conversion-to-paid rate for apps (~25%), this produces 500–750 paying users at launch — enough to establish social proof and App Store positioning.

### Community-Led Acquisition

Reddit is the primary channel. Evidence-based fitness subreddits have a culture that is aggressively anti-promotional — which is an opportunity for Clay because Clay's entire product philosophy is the opposite of what they hate.

**Strategy: Don't market, participate.**
- The founder should be present in these communities as a legitimate member, not as a marketer
- Post genuine content: "I've been analyzing 200 Reddit posts about what people hate in fitness apps. Here's what I built." — this framing is authentic and community-appropriate
- Share the whisper examples as standalone insight posts — the community will engage with them as content even without knowing they're seeing the product
- The programming taxonomy work (the moat identified in Sessions 01–02) is also publishable content: "A taxonomy of strength training methodologies" posted to r/weightroom gets organic engagement and seeds trust

**The Jeff Nippard / Alan Thrall / RP Strength opportunity**:
Evidence-based fitness influencers are looking for products that are authentic to their audience's values. Clay's voice and philosophy are aligned. A single authentic mention from one of these creators is worth more than any paid campaign. The strategy: build the product, use it publicly, document the experience, and let the content speak.

### App Store Acquisition

From Session 02: "strength programming app," "periodization tracker," "evidence-based workout app" are all low-competition, high-intent keyword clusters Clay should own from day one.

**Launch strategy**: Submit for App Store featuring in the "New Apps We Love" and Health & Fitness category. Apple tends to feature apps that use HealthKit write-back well (a genuine differentiator for Clay). The continuous canvas UX is also visually distinctive enough to stand out in the App Store.

---

## Part B: Account Strategist — Retention and Expansion

### The First 30 Days Are Everything

From UX research (Session 04): the longitudinal retention study will tell us what actually works. But based on analogous product data, here's the retention model for Clay:

**Day 1**: HealthKit sync + Why capture = first value moment. Goal: user sees a live dashboard before they've logged a single set. **If this doesn't happen, Day 30 retention drops by ~40%.**

**Day 3–7**: First logged session. The pre-filled workout from last session (or HealthKit import of prior app data) is the hook. The feel of zero data-entry friction in that first session is what makes users come back.

**Day 14**: First whisper that lands. The programming intelligence layer needs to surface something genuinely useful within the first two weeks. If Harold's first whisper is "You're building momentum" (generic), he'll discount every future whisper. If it's "Your squat volume is up 12% over last month — and your sleep has been better this week, which may explain the improved feel scores," that's a moment.

**Day 30**: The clay has taken shape. Harold's routine has been modified twice (natural for the first month), the smart defaults have started to harden, and he's received 2–3 whispers that felt intelligent. If this happens, he's retained for 6 months.

**Retention KPIs**:
- Day 7: 45%+ (industry avg for fitness apps: 25%)
- Day 30: 30%+ (industry avg: 12%)
- Day 90: 20%+ (industry avg: 5–8%)

Clay's on-device-first architecture means no server-side push notifications to juice engagement artificially. Retention must be earned through product quality. This is a feature, not a limitation — it means the retention metrics are honest signals.

### Monetization Model Recommendation

**Structure**: Free tier + Clay Pro

**Free tier** (forever free):
- Unlimited workout logging
- HealthKit read (passive data)
- Basic trend visualization (4-week)
- Pre-filled workouts from last session
- 5 whispers per month

**Clay Pro** (~$9.99/month or $79.99/year):
- Full programming intelligence layer (methodology classification, arc position detection)
- Unlimited whispers
- HealthKit write-back (positions the user in the health ecosystem)
- Watch app
- Year-over-year history
- Oura/WHOOP integration
- Export (full data export, CSV/JSON)
- Offline-first (though this should arguably be free...)

**Rationale for this structure**:
- Free tier lets Harold try the core logging experience without commitment
- Pro tier is gated on the features that justify the premium price (intelligence layer, integrations, history)
- $9.99/month is at parity with Strong's premium but justified by the intelligence differentiation
- Annual pricing ($79.99) offers 33% discount vs monthly — drives LTV

**What NOT to gate**: The "Why" feature, the continuous canvas UX, and the anti-gamification voice are product identity. They should never be behind a paywall.

### Expansion Opportunities (Year 2+)

- **Clay for Coaches**: A companion tool for personal trainers to see client clay data and annotate it. The data model is already structured for this.
- **Program Import**: Users pay a one-time fee ($4.99) to import and classify a program they already own (e.g., a purchased PDF program). Clay reads and programs it in.
- **GLP-1 Partnership**: As this market grows, Clay partners with telehealth providers to offer Clay Pro bundled with muscle preservation guidance.

---

## Part C: Growth Hacker — Growth Model

### North Star Metric

**Weekly Active Loggers (WAL)**: Users who complete at least one logged session per week.

This is the right North Star because:
- Logging is the core behavior Clay is built around
- Weekly frequency correlates with training consistency (the thing Clay is trying to support)
- It's not inflatable by push notifications (no push = no manufactured opens)
- It distinguishes active users from passive dashboarders

### Growth Loop Design

**Primary loop**: Log → Whisper → Log again (intelligence-reinforced habit)
1. User logs a session
2. Clay surfaces an intelligent whisper within 24 hours
3. Whisper creates curiosity or validation → user opens Clay outside of logging
4. User feels understood → tells someone (word of mouth) or returns next session
5. Repeat

**Secondary loop**: Import program → See it understood → Share with community
1. User imports their current program (screenshot or text)
2. Clay classifies and understands it better than they expected
3. User shares the experience: "Clay actually understood my ladder program and called the stall point I'd been hitting" → Reddit post, Twitter/X thread
4. Viral acquisition from community

### Launch Sequencing

**Phase 1 (Pre-launch, 8–12 weeks out)**:
- Waitlist page live
- Founder posting in evidence-based fitness communities (authentic content, not ads)
- Whisper examples as standalone content (Reddit, X)
- Build in public: share the programming taxonomy work, the voice guidelines, the "why this, not that" decisions

**Phase 2 (Launch)**:
- ProductHunt (target Top 5 of the day — the anti-gamification angle is PH-catnip)
- App Store submission with strong keyword positioning
- Email waitlist: personal, direct, Harold-voiced launch note
- Reddit post: "I built the fitness app I couldn't find" — authentic, specific, links to App Store
- No press release. No TechCrunch pitch. The community is the launch channel.

**Phase 3 (30 days post-launch)**:
- First whisper library refinement based on real usage data
- App Store response to every review (builds trust, improves App Store signals)
- Identify the first 50 power users (highest WAL) and personally reach out — these are the community ambassadors

### Growth Risk Assessment

**Risk 1: The market is too niche at ICP definition**
The self-coached intermediate is a real but small segment. If the first version only appeals to r/weightroom-level sophistication, Clay may be too specialized to grow.
Mitigation: The Maya persona (returning athlete) must also be served by v1. Don't let the Harold focus exclude her.

**Risk 2: Word-of-mouth is slow**
The community-led strategy requires patience. Clay won't grow 10x in month one.
Mitigation: Set realistic growth targets. $10K MRR in 6 months is achievable and fundable. $100K MRR in year one is the aspiration, not the baseline.

**Risk 3: Apple featuring dependency**
If launch growth depends on App Store featuring and doesn't get it, the launch may underperform.
Mitigation: The waitlist strategy ensures minimum viable launch regardless of featuring.

---

## Gate Assessment: Go / No-Go / Pivot

### Scoring

| Dimension | Score (1–5) | Rationale |
|---|---|---|
| Acquisition clarity | 4 | Clear ICP, clear channels. Community-led is low-cost but slow. |
| Retention model | 4 | First-30-days model is coherent. Depends on intelligence layer quality. |
| Monetization viability | 4 | $9.99/mo is right-priced. Unit economics work at 2,000 Pro subscribers. |
| Growth loop quality | 4 | Intelligence-reinforced habit loop is strong. Secondary viral loop has potential. |
| Launch risk | 3 | Community-led launch has upside but no paid acquisition fallback. |
| Year-2 expansion | 4 | Coach + import + GLP-1 are credible expansion vectors. |

**Composite: 3.8 / 5.0**

### Gate Decision: **GO** ✓ (with conditions)

**Conditions**:
1. The intelligence layer must be functional and impressive at launch — not a placeholder. The first whisper Harold receives must be substantively better than anything he's seen before. If the whisper library ships thin, the retention model fails.
2. The Maya persona (returning athlete) must have a satisfactory onboarding path by launch. If the cold-start experience only works well for people who already have 6 months of HealthKit strength data, the addressable market is too small.
3. Monthly churn target: <4%. At $9.99/month and a 3x LTV:CAC target, CAC must stay below ~$75. Community-led acquisition is the only channel that achieves this.

---

*Passing to Session 06: Legal & Compliance*
