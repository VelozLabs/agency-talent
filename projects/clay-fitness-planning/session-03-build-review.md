# Session 03 — Build Review
**Agents**: Backend Architect + Data Engineer
**Input**: Sessions 00–02
**Date**: 2026-03-27

---

## Part A: Backend Architect — System Architecture Review

### Core Architectural Principle: The "Invisible Bones" Requirement

The brief correctly identifies this: the visual fluidity only works if the underlying data model is relentlessly structured. I'll expand on what "relentlessly structured" actually means in practice.

The clay metaphor creates a specific architectural demand: **every action is reversible, nothing is destructive, and the system always has a valid prior state to fall back to.** This is not typical app behavior. Most apps write final state. Clay must write event streams.

### Recommended Architecture: Event-Sourced, On-Device First

**Primary persistence pattern: Event Sourcing + CQRS (local)**

Instead of storing current state, Clay stores the stream of events that *produced* the state:
```
WorkoutStarted { session_id, timestamp, planned_sets }
SetLogged       { session_id, lift_id, weight, reps, feel_1_5, timestamp }
LiftSoftened    { session_id, lift_id, variation_selected, prior_lift_id }
WorkoutCompressed { session_id, removed_accessory_ids, reason: "pinch" }
WorkoutFinished { session_id, timestamp, notes }
```

This gives us for free:
- Complete audit trail of every shape the clay has taken
- Undo/redo with no extra work
- The "shape history" feature from Session 01 becomes a query against the event log
- Year-over-year whispers are event aggregations
- No destructive write = no data loss ever

**Local-first database: SQLite via GRDB (Swift)**
- Every device holds the complete event log for that user
- Sync is additive: events from watch/phone merge cleanly because events have UUIDs and timestamps
- CloudKit sync for backup (Apple's privacy-respecting infrastructure)
- No proprietary server required for core functionality

### Data Model: The Lift Taxonomy

This is the architectural moat. Every lift needs to be tagged with enough metadata to make the intelligence layer work:

```sql
CREATE TABLE lifts (
    id              TEXT PRIMARY KEY,   -- UUID
    canonical_name  TEXT NOT NULL,      -- "Barbell Back Squat"
    aliases         JSON,               -- ["Squat", "Back Squat", "BB Squat"]

    -- Movement pattern taxonomy
    pattern         TEXT,               -- hinge | squat | push_horizontal | push_vertical
                                        -- pull_horizontal | pull_vertical | carry | rotation | core

    -- Muscle group taxonomy
    primary_muscle  TEXT[],             -- ["quadriceps", "glutes"]
    secondary_muscle TEXT[],            -- ["hamstrings", "erector_spinae"]

    -- Session role
    priority_tier   TEXT,               -- compound_primary | compound_secondary | accessory | corrective

    -- Progression model compatibility
    progression_models TEXT[],          -- ["ladder", "linear", "undulating", "block"]

    -- Variation relationships
    parent_lift_id  TEXT,               -- NULL for primary lifts
    carry_over_pct  REAL,               -- 0.85 means "90% of squat PR carries to safety bar squat"

    -- Intelligence signals
    fatigue_weight  REAL,               -- how much CNS fatigue this lift generates (0.0–2.0)
    skill_component REAL                -- how much technique degrades under fatigue (0.0–1.0)
);
```

**This taxonomy is what makes pinch-to-compress non-magic**: when the user compresses, the system sorts by `priority_tier` (compounds first), then applies fatigue-weighted volume reduction to accessories. It's deterministic. It's inspectable. The user can always see why a lift was trimmed.

### Programming Intelligence Layer Architecture

```
┌─────────────────────────────────┐
│         CLAY INTELLIGENCE       │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Program Classifier     │    │  ← Classifies methodology from history
│  │  (Core ML, on-device)   │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Arc Position Detector  │    │  ← "You're at week 13 of a ladder cycle"
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Whisper Generator      │    │  ← Selects from curated insight library
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │  Adjustment Engine      │    │  ← Proposes volume/intensity changes
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

**Critical architecture decision: No LLM at runtime.**
The whisper library should be a curated, human-edited set of ~500 plain-language insights keyed to specific program states. LLM generation at runtime introduces latency, cost, liability, and inconsistency. The intelligence is in the *classification* (which is ML on-device), not the *prose* (which is editorial). This aligns with the curation-over-synthesis voice principle from Session 01.

### HealthKit Architecture

```swift
// Write-back architecture (critical for trust)
func sessionDidFinish(_ session: WorkoutSession) {
    let hkWorkout = HKWorkout(
        activityType: .traditionalStrengthTraining,
        start: session.startTime,
        end: session.endTime,
        duration: session.duration,
        totalEnergyBurned: session.estimatedCalories,
        totalDistance: nil,
        device: .local(),
        metadata: [
            "clay_session_id": session.id,
            "volume_total": session.totalVolume,
            "top_lift": session.primaryLift?.canonicalName ?? ""
        ]
    )
    healthStore.save(hkWorkout) { success, error in
        // Clay is now a first-class HealthKit citizen
        // User's data exports cleanly to any health app
    }
}
```

**Permission request strategy**: Request exactly what you need, when you need it. Don't request HRV permission until the user enables the readiness module. Don't request sleep until they ask for the sleep integration. Progressive permission requests dramatically improve grant rates and trust.

### Watch Architecture

The watch is an input device, not a display. Architecture follows:

- WatchConnectivity framework for phone↔watch sync
- Watch maintains a lightweight session cache (current workout plan only)
- All writes go to watch-local SQLite, sync to phone via WatchConnectivity
- Phone holds the canonical event log; watch holds the working set
- Voice notes via watch microphone → transcribed on-device via Speech framework → stored as text events

### Infrastructure Requirements (minimal for v1)

**What Clay does NOT need on day one**:
- A server (truly — HealthKit + CloudKit + on-device covers everything)
- A database backend
- An LLM API call
- User authentication (Apple Sign In as optional sync enabler only)

**What Clay DOES need**:
- A curated lift taxonomy database (~2,000 exercises with full metadata)
- A whisper content library (~500 insight strings, editorially reviewed)
- A programming methodology classification model (trained on historical workout patterns)
- A Core Data/SQLite schema for the event log

**Build order implication**: The data assets (taxonomy, whisper library, classification model) take longer to produce than the app itself. These should be started in parallel with engineering.

---

## Part B: Data Engineer — Data Architecture Review

### The Lift Taxonomy as the Hardest Engineering Problem

The taxonomy is not a database problem — it's a curation problem dressed as a database problem. Here's why:

1. Users call exercises by 50 different names ("squat," "barbell squat," "BB back squat," "high bar squat")
2. The same movement can be classified differently depending on intent (Romanian deadlift as hamstring accessory vs. posterior chain primary)
3. Carry-over percentages between lifts are not well-studied and will need to be approximated from community data

**Recommendation**: Seed the taxonomy with ~500 highest-frequency exercises (80% of all logged sets industry-wide cluster around these 500), then build a disambiguation pipeline:
- Fuzzy matching on exercise name → canonical form
- User confirmation for ambiguous matches
- Corrections fed back into the taxonomy (user-contributed refinement over time)

### Programming Classification Model: Training Data Strategy

**The bootstrap problem**: To classify Harold's ladder program, we need training examples of labeled workout histories. Where do these come from?

**Strategy**:
1. **Synthetic data generation**: Generate ~10,000 synthetic workout histories representing each programming methodology, with known labels. Use these to bootstrap the classifier.
2. **Expert annotation**: Partner with 3–5 evidence-based coaches (online, YouTube, Reddit-famous) to label real program examples. These become gold-standard training data.
3. **User-confirmed labeling**: On first launch, ask users "What programming model do you currently follow?" — this becomes a labeled data point (with consent) that improves future classification.
4. **Iterative refinement**: As Clay accumulates usage data (on-device, privacy-preserving), the classification improves without shipping user data anywhere.

### Volume Tracking Data Model

Volume is the primary progression signal. The data model must support:

```sql
-- Weekly volume by movement pattern (the core progression metric)
CREATE VIEW weekly_volume AS
SELECT
    strftime('%Y-W%W', e.timestamp) as week,
    l.pattern,
    l.priority_tier,
    SUM(s.sets * s.reps * s.weight) as volume_load,
    MAX(s.weight) as top_weight,
    AVG(s.feel) as avg_feel
FROM set_logged_events s
JOIN lifts l ON s.lift_id = l.id
JOIN workout_events e ON s.session_id = e.session_id
GROUP BY week, l.pattern, l.priority_tier;
```

This view is what powers:
- The 4-week rolling trend on the dashboard
- The year-over-year whispers ("Your squat volume this month matches your personal best from last April")
- The accommodation detection ("Top-set weight flat for 3 consecutive weeks")

### Health Data Integration Schema

```sql
CREATE TABLE health_samples (
    id          TEXT PRIMARY KEY,
    source      TEXT,           -- 'healthkit' | 'oura' | 'whoop'
    type        TEXT,           -- 'sleep_duration' | 'hrv_sdnn' | 'resting_hr' | 'body_mass'
    value       REAL,
    unit        TEXT,
    timestamp   TEXT,           -- ISO 8601
    metadata    JSON,
    synced_at   TEXT
);

-- Readiness score computed from health samples
CREATE VIEW daily_readiness AS
SELECT
    date(timestamp) as day,
    -- Weighted composite: HRV 40%, sleep 35%, resting HR 25%
    (
        (hrv_score * 0.40) +
        (sleep_score * 0.35) +
        (hr_score * 0.25)
    ) as readiness_score
FROM (
    -- Sub-query computing normalized scores per metric
    ...
);
```

### Key Build Risks Identified

| Risk | Severity | Mitigation |
|---|---|---|
| Taxonomy curation scope | HIGH | Start with 500 exercises, ship, expand |
| Whisper library editorial quality | HIGH | Define style guide before writing first whisper |
| Watch↔phone sync edge cases | MEDIUM | Use CloudKit CKRecord merge strategy from day one |
| HealthKit permission grant rates | MEDIUM | Progressive permission requests, explained in-context |
| Classification model cold start | MEDIUM | Synthetic data bootstrap + user-confirmed labeling |
| SQLite performance at scale | LOW | Event log grows large over years; archive events >2 years old |

### Architecture Verdict

**The architecture is sound.** Event sourcing + on-device first + curated intelligence library is the right stack for Clay's requirements. The hardest work is not engineering — it's the data assets: taxonomy, whisper library, classification model. These should be treated as content/editorial projects running in parallel with engineering, not as engineering tasks.

**Estimated build complexity (relative, not time-boxed)**:
- Core event log + SQLite schema: Low
- Dashboard canvas UX: High (gesture system)
- HealthKit integration: Medium
- Watch app: Medium
- Programming classifier: High (data assets + ML)
- Whisper library: High (editorial, not engineering)
- Taxonomy: Medium-High (data curation)

---

*Passing to Session 04: UX Research*
