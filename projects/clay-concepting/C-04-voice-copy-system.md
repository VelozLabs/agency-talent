# Session C-04 — Voice & Copy System
**Agent**: Narrative Designer (`narrative-designer`)
**Input**: C-00 brief, C-01 brand identity, clay-fitness-planning/session-09-feedback-loops.md (Loop 2, Loop 5)
**Date**: 2026-03-27

---

## Starting Position

The Editorial Filter from Session 09 Loop 5 already exists and has 9 rules. My job is not to restate it — it's to build the architecture that makes it operational. The filter tells you what to reject; this session tells you how to construct what passes.

---

## Voice Pillars (The Three Non-Negotiables)

### Pillar 1: Informed Without Being Instructional

Clay knows things. It surfaces them. It doesn't tell you what to do.

**Structural pattern**: Observation first, implication implied.
- Not: "You should consider changing your rep scheme."
- Yes: "Your top-set weight has been flat for three weeks."

The user draws the conclusion. Clay provides the evidence.

### Pillar 2: Adult Trust, Not Adult Formality

Adult doesn't mean stiff. It means the app treats you like a competent person who doesn't need managing.

**Structural pattern**: Short sentences. Active voice. No hedging, no excessive qualification.
- Not: "It appears that there may be a potential accommodation effect occurring in your training."
- Yes: "This is a common stall point in ladder models."

### Pillar 3: Specific, Not General

Vague encouragement is worthless. Specific observation has value.

**Structural pattern**: Include a number, a timeframe, or a named pattern whenever possible.
- Not: "You're making progress."
- Yes: "Volume up 8% this week. Your why just got closer."

---

## Whisper Architecture

Whispers are the intelligence layer's primary output. They are short, specific, evidence-adjacent observations that appear after sessions or in the dashboard.

### Whisper Types and Trigger Conditions

```
Type 1: OBSERVATION
Definition: States what the data shows, no implication
Trigger:    Any pattern that diverges >10% from recent baseline
Length:     1 sentence, max 20 words
Example:    "Your squat volume is up 12% this month."
            "Top-set weight flat for three weeks."
            "Feel scores have been trending down since Monday."

Type 2: CONTEXT
Definition: Adds meaning to an observation by naming the pattern
Trigger:    Observation has a known programming context (e.g., accommodation)
Length:     2 sentences, max 35 words total
Example:    "Your top-set weight has been flat for three weeks.
             This is a common inflection point in ladder models."

Type 3: EVIDENCE POINTER
Definition: Points toward published research or known practice — never makes claims
Trigger:    Context is well-documented in fitness literature; user would benefit
            from knowing options exist
Length:     2–3 sentences, max 50 words
Example:    "Your top-set weight has been flat for three weeks. This is a common
             inflection point in ladder models. Here's what the evidence suggests
             about what comes next." [tap to expand — v1.1]
Constraint: Must use "suggests," "indicates," or "points toward" — never "proves" or "shows"

Type 4: VALIDATION
Definition: Confirms that something the user did was reasonable
Trigger:    User made a consistent choice 3+ times (smart default hardening)
Length:     1 sentence, max 15 words
Example:    "Looks like this is your go-to. Keeping it."
            "Romanian DL has replaced RDL in your rotation. Noted."

Type 5: GENTLE NUDGE
Definition: Surfaces a gap or opportunity without judgment
Trigger:    Pattern that may benefit from attention, no urgency
Length:     1 sentence, max 20 words
Example:    "Pulling movements are light in your rotation this month."
            "Deadlift has been flat for six weeks. Time to pull in a different direction?"
```

### Whisper Constraints

```
Max length per whisper:     50 words (Types 1–4), 75 words (Type 3 with pointer)
Tense:                      Present tense for observations, past tense for history
First person:               NEVER ("I've noticed" — Clay doesn't have an ego)
Second person:              Sparingly — the data speaks, not the app
                            "Your squat" ✓   "You need to" ✗
Citation rule:              Reference methodology names ("ladder models") not papers
                            Never: "A 2019 study in NSCA found..."
                            Yes:   "A common pattern in ladder progression"
Forbidden words:            crush, beast, grind, slay, epic, amazing, incredible,
                            proud, champion, warrior, level up, milestone
Forbidden punctuation:      Exclamation marks (anywhere in the app)
Negative framing:           Never. Observations are neutral. "Flat for 3 weeks" not
                            "failed to improve for 3 weeks"
```

---

## Onboarding Copy

### Why Capture Moment (Screen 0 — Cold Start)

```
Prompt line (Canela / display):
  "What do you want to be able to do?"

Subtext (text-sm / color-ash):
  [Three example anchors shown faintly — not selectable, just priming:]
  "Run after my kids without losing breath."
  "Get back to where I was before the injury."
  "Just feel strong in my own body."

Input placeholder: [nothing — the field is blank and inviting]

Below input (text-sm / color-ash — the disclaimer, Loop 2 resolution):
  "Clay tracks your training, not your health.
   It's not a doctor. What's driving you?"

Submit button: "This is my why →"
  (Note: arrow, not checkmark. Forward, not complete.)
```

### HealthKit Permission Framing

```
Context line (text-md / color-stone):
  "Your sleep and recovery are already in your phone."

Explanation (text-sm / color-ash):
  "Clay can read them to show you how your body is
   responding to your training."

Permission button: "Show me my data →"
  (Apple's HealthKit system modal follows immediately)

After grant — first dashboard moment (text-sm / color-ash):
  "This is what Clay knows so far. Start logging
   and it'll get sharper."

After deny — cold start path (text-sm / color-ash):
  "No problem. Let's start from your first session."
```

### First Session Generated (no prior data)

```
Context line (text-sm / color-ash):
  "Let's get your first session in so Clay
   can start learning your shape."

Note: This line is from Session 09 Loop 4 — the Backend Architect's resolution.
It is honest about the cold-start state without apologizing for it.
```

---

## UI String Library

### Button Labels

```
Start session:        "Start session →"        (arrow, not chevron — directional, not navigational)
Add set:              "Add set"                (plain, no icon in v1)
Log set:              [no label — the +/– action is self-evident]
Hold to finish:       "Hold to finish"         (instructional, not decorated)
Export data:          "Export my data"         (possessive — it's the user's data)
Edit why:             "Edit"                   (plain)
```

### Empty States

```
No trend data:        [not shown — the sparkline simply doesn't appear; no empty state copy]
No whisper:           [not shown — no "checking your data..." placeholder]
No recovery data:     [recovery row simply doesn't appear; no "connect a device" prompt in v1]
No workout history:   "Let's get your first session in so Clay can start learning your shape."
```

### Auto-Adjustment Confirmations (Smart Default Hardening)

```
After 3rd swap to same exercise:
  "Looks like this is your go-to. Keeping it."

After 3rd swap away from an exercise:
  "[Exercise] has been swapped out three times. Removing it from your rotation."

After a session gap >7 days (rest-day auto-adjust):
  "You've been away a bit. Easing back in — next week's volume is lighter."
  (Note: no "!" No "Welcome back!" No streak reset language)
```

### Error States

```
HealthKit sync failed:  "Couldn't reach your health data. Trying again later."
Export failed:          "Export didn't complete. Try again?"
Data load failed:       "Something went sideways loading your history.
                         Your data is safe — pull down to retry."
```

---

## Editorial Filter Application

Every string above has been checked against the 9-rule Editorial Filter from Session 09 Loop 5:

| String | Rule checked | Result |
|---|---|---|
| "What do you want to be able to do?" | No hype ✓, honest ✓, present tense ✓ | Pass |
| "Clay tracks your training, not your health." | Medical disclaimer ✓, Clay voice ✓ | Pass — Loop 2 resolution |
| "Let's get your first session in so Clay can start learning your shape." | No celebration ✓, honest about data limits ✓ | Pass |
| "Looks like this is your go-to. Keeping it." | No gamification ✓, direct ✓, transparent ✓ | Pass |
| "You've been away a bit. Easing back in..." | No passive-aggressive ✓, no streaks ✓, guilt-free ✓ | Pass |
| "Hold to finish" | No hype ✓, instructional ✓ | Pass |

**Flagged for revision**: The C-03 empty state "Tap to add your why" does not pass — it's functional but slightly imperative. Replace with the Why prompt framing above ("What do you want to be able to do?").

---

## Cross-Pollination Check

- **Loop 2 (medical disclaimer)**: Integrated as the two-line copy below the Why input. Legal requirement met, Clay voice maintained.
- **Loop 5 (single editorial filter)**: This session is the implementation layer of that filter. Every string above passed the 9-rule checklist.
- **C-03 completion checkmarks**: confirmed — color-ash checkmark with no copy adjacent. Silent acknowledgment. Passes the no-celebration rule.
- **C-01 anti-rule "no exclamation marks"**: confirmed — zero exclamation marks in this entire string library.
