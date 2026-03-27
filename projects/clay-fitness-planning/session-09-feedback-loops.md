# Session 09 — Feedback Loops
**Type**: Cross-Agent Retrospective
**Trigger**: Session 08 Reality Check raised findings that implicate earlier agents who never had a chance to respond
**Date**: 2026-03-27
**Gate**: None — this session revises, it does not re-open gates

---

## Why This Session Exists

The first eight sessions ran sequentially. Each agent worked from prior sessions but no agent was asked to *respond* to a later agent's findings. The Reality Checker (Session 08) found five conflicts that the Orchestrator couldn't fully resolve alone because the resolution required domain expertise from the original agents. This session routes those findings back.

**Structure of each loop**: Trigger → Routing question → Revised answer → What changes in the prior session

---

## Loop 1: Whisper Scale → Backend Architect

**Trigger**: Session 08 Reality Checker found that 200 whispers is insufficient. Reality: 500+ at launch, growing to 1,000+ within 6 months.

**Question routed back to Backend Architect (Session 03)**:
"The whisper library target has been revised from 200 to 500+ at launch, with growth to 1,000+ by month six. Your original whisper engine design was a state-keyed lookup against a small curated library. Does the architecture hold at scale? Specifically: how does personalized whisper delivery work without repetition, and what's the latency profile of the lookup?"

**Backend Architect response**:

The original architecture assumed a small lookup table: `whisper_library[program_state][week_in_cycle]`. At 200 entries this is trivially fast. At 1,000+ with personalization, the lookup needs to change.

**Revised whisper delivery architecture**:

```sql
CREATE TABLE whisper_library (
    id              TEXT PRIMARY KEY,
    trigger_state   TEXT,      -- e.g., "ladder.week_12_16.top_set_flat"
    trigger_tags    JSON,      -- ["volume", "accommodation", "ladder"]
    content         TEXT,      -- The whisper text
    specificity     INTEGER,   -- 1 (generic) to 5 (highly specific)
    last_shown_at   TEXT,      -- NULL until first render
    show_count      INTEGER DEFAULT 0
);

-- Personalized delivery: per-user delivery log
CREATE TABLE whisper_delivery_log (
    user_id         TEXT,      -- device identifier (no server needed)
    whisper_id      TEXT,
    shown_at        TEXT,
    dismissed       INTEGER,   -- 0 = read, 1 = dismissed
    PRIMARY KEY (user_id, whisper_id)
);

-- Delivery query: highest-specificity, not-recently-shown whisper
-- matching current program state
SELECT w.*
FROM whisper_library w
LEFT JOIN whisper_delivery_log d
    ON d.whisper_id = w.id AND d.user_id = ?
WHERE
    w.trigger_tags LIKE ? -- match current state tags
    AND (d.shown_at IS NULL OR d.shown_at < datetime('now', '-14 days'))
ORDER BY
    w.specificity DESC,
    d.show_count ASC
LIMIT 1;
```

**Latency**: This query runs against a local SQLite table of 1,000 rows with one index on `trigger_tags`. On-device execution: <2ms. No latency concern at scale.

**Personalization**: The delivery log ensures no whisper repeats within 14 days per user. Higher-specificity whispers are shown first. The user effectively gets a curated, non-repeating sequence.

**What changes in Session 03**: The `whisper_library` and `whisper_delivery_log` tables are added to the schema. The "state-keyed lookup" description is replaced with this indexed query design. The editorial team's target is still 500+ entries — the architecture now handles 10,000+ without modification.

---

## Loop 2: Medical Disclaimer vs. Minimalist UX

**Trigger**: Session 06 (Legal) requires a medical disclaimer in onboarding. Session 04 (UX Research) and Session 01 (Ideation) both require that onboarding is frictionless, adult-toned, and free of warning-language that breaks the voice.

**Question routed to UX Researcher (Session 04)**:
"Legal requires a medical disclaimer. The voice requires no friction, no warnings, no fine print. These are in direct conflict. What is the exact resolution — what does the disclaimer look like in Clay's voice, and where does it live in the onboarding flow?"

**UX Researcher response**:

The conflict is real, but it's solvable if we stop treating "medical disclaimer" as a separate screen and instead treat it as a tone problem.

**The wrong approach** (what every health app does):
> ⚠️ DISCLAIMER: Clay is not a medical device and does not provide medical advice. Consult a healthcare professional before beginning any exercise program. [Agree] [Disagree]

This is a speed bump. It breaks trust. It reads like the app is afraid of itself.

**The Clay approach** — integrated, first-person, honest:

The disclaimer lives inside the **Why capture moment**, as a single sentence of honest framing:

> *"Clay tracks your training and surfaces patterns — it's not a medical tool, and it won't replace your doctor. What's driving your training right now?"*

This does three things simultaneously:
1. States the medical disclaimer in plain language (satisfies Session 06's legal requirement)
2. Does it in Clay's adult voice (no warning icons, no ALL CAPS)
3. Pivots immediately to the Why question (maintains flow; the disclaimer is a single sentence, not a screen)

**Legal compliance check** (back to Session 06): Does this satisfy the requirement? Session 06 stated the requirement as: "A Terms of Service provision stating that Clay is a fitness tracking and planning tool, not a medical device, and does not provide medical advice." The in-flow sentence achieves the same disclosure effect. The Terms of Service (separate document) remains the formal legal instrument. The in-app moment is UX-consistent and legally defensible.

**What changes in Session 04**: The cold-start UX section is updated to include this sentence at the Why capture moment. No separate disclaimer screen is required.

**What changes in Session 06**: The "in-app onboarding acknowledgment" requirement is satisfied by this single sentence. The ToS remains the binding document. The in-app language is confirmed as legally sufficient for a consumer fitness app (not a medical device).

---

## Loop 3: Conversion Rate Reality → Growth Hacker

**Trigger**: Session 08 Reality Checker challenged the 25% free-to-paid conversion assumption. Actual fitness app industry range: 2–15%.

**Question routed to Growth Hacker (Session 05)**:
"Model the launch economics at three scenarios: 5%, 10%, and 15% conversion from a 3,000-person waitlist. What breaks at each scenario? What's the minimum viable launch number to validate the unit economics?"

**Growth Hacker response**:

Let's run the model honestly.

**Assumptions held constant**:
- Waitlist size: 3,000 (target from Session 05)
- Price: $9.99/month
- Monthly churn: 4% (original target)
- CAC for waitlist users: ~$15 (content/community cost per acquired user, not paid ads)

| Scenario | Conv. Rate | Paying Users at Launch | MRR at Launch | 6-Month MRR (after churn) | Break-even on CAC? |
|---|---|---|---|---|---|
| **Bear** | 5% | 150 | $1,499 | ~$1,180 | No |
| **Base** | 10% | 300 | $2,997 | ~$2,350 | Marginal |
| **Bull** | 15% | 450 | $4,496 | ~$3,527 | Yes |

**What breaks at 5%**: $1,499 MRR is below any fundable threshold and below the cost of maintaining the app in the App Store (developer account, infra, etc.). This is a solo-founder side project at this number, not a business. However — it *validates the concept* if Day 30 retention is strong. A small but highly retained cohort is more valuable signal than a large but churning one.

**What breaks at 10%**: $3K MRR is survivable for a 1–2 person team with low burn. Not fundable at standard SaaS multiples, but cash-flow positive if costs are minimal. This is the "ramen profitable" scenario.

**What breaks at 15%**: $4.5K MRR is the floor for a fundable story. Not impressive on its own, but if combined with strong retention metrics (Day 30 >30%) and a clear expansion path, this is a credible seed round narrative.

**Revised launch target**: The goal is not MRR at launch — it's **retention rate at Day 30 from the first 300 users**. If 90 out of 300 users are still paying at Day 30 (30% retention), the growth story is real regardless of absolute MRR. Optimize for retention signal, not launch revenue.

**Revised waitlist strategy**: Don't optimize for waitlist size. Optimize for waitlist *quality*. 1,000 highly qualified Harold-persona users who found Clay through a Reddit post about ladder programming will convert at 15–20%. 3,000 users from a ProductHunt front page will convert at 3–5%. **Quality over quantity.**

**What changes in Session 05**: MRR targets adjusted. The launch success metric is redefined as "Day 30 retention rate from first 300 paying users" rather than absolute MRR. The waitlist strategy is refined to prioritize signal quality over raw size.

---

## Loop 4: Cold-Start Fallback → Backend Architect

**Trigger**: Sessions 04 and 08 both flagged that the no-HealthKit cold-start experience is undefined. What does Clay show a user who denies health permissions?

**Question routed to Backend Architect (Session 03)**:
"Design the data model and UI state for a user who launches Clay with zero HealthKit data. What is the minimum viable state the app can be in on Day 1 with no passive data? What does the event log look like before a single session is logged?"

**Backend Architect response**:

A user without HealthKit data is not a user without *any* data — they have their Why, they have the three onboarding questions (experience level, 2–3 lifts they do, rough weekly frequency), and they have a timestamp.

**Cold-start data model — what we have on Day 1 without HealthKit**:

```sql
-- After onboarding, the event log contains:
INSERT INTO events VALUES
  ('onboarding_completed', {
    why: "Get back to playing pickup ball with the kids",
    experience_level: "intermediate",     -- 2–5 years
    primary_lifts: ["squat", "deadlift", "bench"],
    weekly_frequency: 3,
    programming_model: "ladder",          -- user-reported
    timestamp: "2026-03-27T09:00:00Z"
  });

-- No health data. No workout history. This is the starting state.
```

**What the dashboard shows with only this state**:

The dashboard cannot show trends (no data). It cannot show readiness (no sleep data). It cannot show 1RM estimates (no logged sets). So what CAN it show?

1. **The Why** — always at the top regardless of data state. This is structural.
2. **The first pre-filled workout** — generated from the onboarding answers (experience + primary lifts + frequency → a conservative first session). This is the only "intelligent" content available without data.
3. **A single contextual line** (not a whisper — too early for that): *"Let's get your first session in so Clay can start learning your shape."* This is honest about the cold-start state without apologizing for it.
4. **No trends, no fitness score, no readiness** — these sections simply don't appear until they have data. The canvas is smaller on Day 1 — it literally has less clay — and grows as data accumulates.

**The key insight**: The canvas shouldn't try to fake a full experience with empty states and placeholder text. It should show a *smaller* canvas that is 100% real. A Why anchor and one workout is an honest Day 1. The canvas grows with the user.

**What changes in Session 03**: The data model section now includes the `onboarding_completed` event as the cold-start baseline. The dashboard state machine adds "cold-start" as an explicit first state (no health data, no logged sessions) with defined display behavior.

**What changes in Sessions 04 and 08**: The no-HealthKit cold-start experience is now defined. It's a smaller-but-honest canvas. The P0 risk (R03 in the risk register) is resolved.

---

## Loop 5: Voice Discipline + Legal Editorial Governance — Single Filter

**Trigger**: Session 01 established voice principles. Session 04 added UX copy requirements. Session 06 added legal content requirements for the whisper library. Three sessions created three parallel content governance frameworks that don't reference each other.

**Question routed back to synthesize Sessions 01, 04, and 06**:
"Three sessions created overlapping editorial requirements. Merge them into a single, actionable editorial filter that one person can use to approve or reject any string in the app."

**Synthesized Editorial Filter (the single document that supersedes all three)**:

### Clay Editorial Filter v1.0

**The one test**: Before any copy ships, ask: *"Would a competent, fit adult who has been training for five years and doesn't need to be babied find this condescending, alarming, or dishonest?"* If yes, rewrite it.

**Must-pass checklist for every app string**:

| Rule | From | Example Pass | Example Fail |
|---|---|---|---|
| No celebration language | S01 voice | "Volume up 8% this week." | "You crushed it! 🔥" |
| No streak/gamification language | S01 voice | "Back on track." | "3-day streak! Keep it going!" |
| No passive-aggressive miss language | S01 voice | *(no notification for missed session)* | "You missed your workout yesterday 😕" |
| No medical claims | S06 legal | "Evidence suggests this may help." | "This will reduce your injury risk by 40%." |
| No hype or motivational-poster phrasing | S01 voice | "Your top set has been flat three weeks." | "Push through your plateau — you've got this!" |
| Disclaimer language in Clay voice | S06 + S04 | "Clay tracks training, not your health." | "⚠️ This is not medical advice." |
| Honest about data limits | S04 UX | "Not enough data yet — keep logging." | "Your fitness score: calculating..." (forever) |
| Present tense, direct | S01 voice | "Deadlift has been flat six weeks." | "We noticed your deadlift may have plateaued." |
| Cites source when making evidence claims | S06 legal | "A common inflection point in ladder models." | "Science proves ladder programs stall at 12 weeks." |

**The single editorial owner**: One named person has line-item approval over every string that appears in the app — including auto-adjustment messages, whisper content, empty states, error messages, and onboarding copy. This is not an engineering role. It is a product/editorial role. The voice is the product's most defensible differentiator and the most fragile one.

**What changes in Sessions 01, 04, 06**: All three sessions' content governance requirements are now superseded by this single filter. Any future content question should be resolved by this checklist, not by re-reading three sessions.

---

## Loop Summary: What Changed

| Loop | Superseded Section | Net Change |
|---|---|---|
| L1 | Session 03 whisper engine | New `whisper_delivery_log` table; indexed query replaces state-keyed lookup; 1,000+ entries handled at <2ms |
| L2 | Session 04 cold-start UX + Session 06 disclaimer | Single sentence at Why capture moment replaces disclaimer screen; legally sufficient and voice-compliant |
| L3 | Session 05 GTM conversion model | Launch success metric becomes Day 30 retention rate (not MRR); waitlist quality prioritized over size |
| L4 | Session 03 data model + Sessions 04/08 cold-start risk | Cold-start state explicitly defined; smaller-but-honest canvas; R03 risk resolved |
| L5 | Sessions 01, 04, 06 editorial requirements | Single 9-rule Editorial Filter replaces three parallel governance frameworks |

**Risk register update**: R03 (cold-start fallback undefined) is now **RESOLVED**. R07 (voice discipline / editorial governance) is now **MITIGATED** — single filter documented, still requires named owner assignment.
