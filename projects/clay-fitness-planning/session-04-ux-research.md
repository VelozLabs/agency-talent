# Session 04 — UX Research
**Agent**: UX Researcher
**Input**: Sessions 00–03
**Date**: 2026-03-27

---

## Research Framing

My job in this session is to ask the questions that the brief and the architecture review haven't asked. I'm not here to validate the design — I'm here to find where the design assumptions might break when it meets a real human being.

I'll structure this as: (1) User persona construction, (2) Critical interaction analysis, (3) Cold-start research deep-dive, (4) Accessibility and edge cases, (5) Research agenda for pre-launch.

---

## User Persona Construction

### Primary Persona: Harold (The Self-Coached Intermediate)

**Demographics**: 34–44, male, household income $80K–$180K, urban/suburban. Likely has an iPhone and Apple Watch. May have Oura. Works full-time, has a family or significant relationship commitments. Trains 3–4x per week.

**Mental model of training**: Harold thinks in programs, not workouts. He doesn't ask "what should I do today" — he asks "where am I in my cycle." He's read enough to know what periodization means, even if he couldn't define it precisely. He's skeptical of app-generated workouts because he's been burned by them before ("it doesn't understand that I care about the squat more than the leg press").

**Relationship with fitness apps**: Harold has tried Strong, Hevy, Notion spreadsheets, Google Sheets, and possibly Fitbod. He still uses one of these with friction. He logs because he values the data, not because the app makes it enjoyable. He would describe his current app as "fine, I guess."

**Emotional state at logging time**: Usually focused, sometimes rushed (45-minute lunch break session), occasionally frustrated (a lift didn't go as planned). He's not looking for motivation at logging time — he's looking for the friction between what happened and what the app expects to be zero.

**What would make Harold switch**: An app that already understands his program on day one. That auto-fills what he did last time. That doesn't make him navigate to a different screen to change a weight. That treats skipped sessions as information, not failure.

**What would make Harold delete it**: A notification that says "Don't break your streak!" A confetti animation after finishing. Being asked to rate the workout on a 10-point scale. Any language that sounds like a fitness influencer.

### Secondary Persona: Maya (The Returning Athlete)

**Demographics**: 38, female, returning to structured training after 2-year gap (career change, baby, injury — take your pick). Historically athletic (college sports, recreational running). Starting to take resistance training seriously.

**Unique needs**: Maya needs the cold-start experience to work well. She has Apple Health data but it's sparse on the strength training side. She needs Clay to meet her where she is — which is "not quite sure what program I'm running" — without making her feel like she has to figure it out before the app can help her.

**Relevance to Clay**: Maya is the test for whether the cold-start experience actually works. If Clay onboards Harold beautifully but loses Maya, it's a product with a ceiling. The "Why" capture moment is especially critical for Maya — her Why is likely more emotionally specific than Harold's, and getting it right could be the moment that makes the app feel different from everything else.

### Edge Case Persona: Dr. Chen (The Analytically Overloaded)

**Demographics**: 52, male, physician, trains 5x/week with meticulous tracking. Has Oura, Apple Watch, and probably a glucose monitor. Wants to see everything.

**Unique UX risk**: Dr. Chen will try to make Clay show him more data than it's designed to show. The continuous canvas metaphor optimizes for the right amount of information — but Dr. Chen will want to pinch *in* instead of pinch-to-compress. If there's no way to access deeper data layers, he'll feel the app is withholding from him.

**Design implication**: Clay needs a depth gesture or expanded view that doesn't break the canvas metaphor. "Long-press on trend line → expand to full history" should work without feeling like navigating to a different screen.

---

## Critical Interaction Analysis

### Gesture System: Risk Assessment

**Pinch-to-compress**
- Risk: Novel gesture for app context. Most users associate pinch with zoom. The association between "pinch" and "compress workout" will need to be taught, not assumed.
- Research question: Does the pinch gesture feel natural in this context, or does it feel like a magic spell the user has to memorize?
- Recommendation: The first time a user encounters a time-pressured moment (e.g., they're about to start a session and they're running late), Clay should surface a gentle first-use prompt: "Short on time? Pinch to compress." This teaches the gesture at the exact moment it has value.

**Long-press to soften**
- Risk: Long-press is established but varies by platform. On iOS, long-press on a cell typically triggers haptic + context menu. Clay's softening behavior needs to feel like an extension of this convention, not a violation of it.
- Research question: When a user long-presses a lift, do they expect to see the variation options *in place* (inline, the lift expands) or in a sheet? The brief implies inline, which is correct for the metaphor but needs validation.

**One-tap finish**
- This is the highest-stakes moment. One accidental tap and a session is over. The confirmation mechanic needs careful thought.
- Recommendation: The finish tap should require a distinct gesture (maybe a long-press+swipe, or a "hold to finish" with a 1.5-second fill animation) that prevents accidental activation. The brief doesn't address this — it should.

**Voice note on set**
- This is elegant and differentiated. Research question: Will users actually use this, or will they feel self-conscious talking to their phone in a gym?
- Design implication: The activation should be completely discreet — no "Recording..." banner, no visual that broadcasts to nearby gym-goers. Perhaps watch-based voice note is the primary surface; phone is secondary.

### The Dashboard "Biggest Element" Problem

The brief says: "The biggest element on screen changes based on what matters today." This is conceptually powerful and practically ambiguous.

**Research questions**:
1. What algorithm determines what's "most important" today? How does Clay decide between showing the 1RM estimator vs. the quick-log button vs. the trend line?
2. When the biggest element changes between sessions (because the algorithm decided something different matters today), will users feel disoriented? The dashboard is supposed to be familiar — but if it's different every time, familiar becomes confusing.
3. What happens when the algorithm gets it wrong? (It's the first week of the month, Clay shows the trend, but Harold just wants to quickly log a session and leave.)

**Recommendation**: The "biggest element" should change based on a clear, predictable set of rules that users can internalize. Not a black box. Suggested logic:
- Pre-workout: Quick-log button is dominant
- During active session: Active set counter is dominant
- Post-session: Insight/trend is dominant
- Rest day: Trend/readiness is dominant
- After a gap of 7+ days: "Why" anchor is most prominent, readiness second

This makes the canvas behavior learnable, not random.

---

## Cold-Start Research Deep Dive

### The 60-Second Hypothesis

Session 01 proposed: "user sees a live, data-informed dashboard within 60 seconds of first launch." This is the right aspiration. Let's pressure-test it.

**What can Clay show within 60 seconds of first launch, before any user input?**
- With HealthKit granted: sleep last night, resting HR trend, body weight trend (if logged), existing workouts from other apps, step count
- Without HealthKit: Nothing except the "Why" they just entered

**The HealthKit permission moment is the entire cold-start**. If the user grants HealthKit permissions on first launch, the dashboard is alive. If they decline, the dashboard is an empty canvas. Clay's onboarding must make the HealthKit grant feel natural, inevitable, and safe — not like an app asking for too much.

**Permission framing research findings** (from comparable apps):
- "We use this to show you your sleep and recovery before your workouts" outperforms "We need access to your health data" by ~40% grant rate
- Showing a preview of what the dashboard will look like *with* data before asking permission outperforms asking cold
- One-question-at-a-time permission requests outperform bundled permission modals

**Recommendation**: Clay should show a preview dashboard with mock data styled as "your data will go here" before any permission request, then ask for HealthKit access in context: "Ready to make this yours?" One tap, full grant. The preview communicates value before the ask.

### The "Why" Capture Moment

This is Clay's most distinctive onboarding step and its highest risk. The brief frames it as "capture the 'Why' in 10 seconds." In practice, answering "why are you training?" with a keyboard is:
- Slow (typing on mobile takes 20+ seconds for a meaningful answer)
- Vulnerable (people edit themselves when writing about emotional motivations)
- Cognitively loaded (most people haven't articulated their Why precisely)

**Recommendations**:
1. **Prompt with specificity**: Don't ask "Why are you training?" Ask "What do you want to be able to do?" or "Who are you training for?" Specific prompts produce specific answers.
2. **Offer starting points**: Show 3–4 examples in small text: "Run after my kids without losing breath," "Get back to where I was before the injury," "Just feel strong in my own body." These are NOT selections — they're cognitive anchors to help users write their own.
3. **Make it editable forever**: The Why should feel like it can evolve. If it's presented as permanent, users will under-commit. If it's presented as "right now, for today," they'll be more honest.
4. **Celebrate it quietly**: After entry, the Why appears at the top of the dashboard and Clay says something like: "This stays up here so you don't forget why you started." No fanfare. Just placement.

---

## Accessibility and Edge Cases

### Physical Accessibility
- The +/– weight and reps buttons must meet minimum 44×44pt tap target requirements (Apple HIG)
- The feel slider (1–5) should have haptic feedback at each stop — gym environments are loud, visual confirmation of slider position may be missed
- Voice-note feature is critical for users with fine motor limitations — don't treat it as a power-user feature
- Color should never be the sole indicator of state (for color blindness — the app presumably uses a lot of progress/trend color coding)

### Environmental Edge Cases
- **No internet in the gym**: The app must work completely offline. This is not optional — many commercial gyms have spotty service. (Architecture review confirmed this; just flagging it from UX perspective as a must-have, not a nice-to-have.)
- **Interruption mid-session**: User gets a phone call during a workout. Clay should save state silently and resume exactly where they were with no data loss.
- **Switching devices**: User logs on watch for a session, opens phone after. The session should appear instantly on phone (WatchConnectivity sync).
- **Multiple workouts in one day**: Possible for athletes doing AM/PM sessions. The data model should handle this without confusion.

---

## Research Agenda for Pre-Launch

### Formative Research (Before Engineering Begins)

1. **Concept validation interviews** (n=12): 45-minute structured sessions with Harold-persona users. Show mockups of the canvas, gesture interactions, and whisper examples. Specifically test:
   - Does the clay metaphor resonate or feel like marketing language?
   - Does the continuous canvas feel like freedom or disorientation?
   - What is the user's reaction to the voice-note feature?
   - What do they think "pinch to compress" means before it's explained?

2. **Cold-start prototype test** (n=8): Test the onboarding flow end-to-end. Measure:
   - Time from launch to first data on dashboard
   - HealthKit permission grant rate with different framing
   - Quality of "Why" responses with different prompts

### Summative Research (After First Build)

3. **Gesture usability test** (n=8, in-context): Test the gesture system in a real gym or gym-like environment. Measure:
   - Discoverability of pinch-to-compress without prompting
   - Error rate on one-tap finish (accidental completions)
   - Comfort level with voice notes in semi-public environments

4. **Longitudinal retention study** (n=20, 8 weeks): Track usage patterns over 8 weeks. Measure:
   - Session logging frequency vs. baseline (pre-Clay app)
   - Dashboard engagement depth (does anyone use the trend view?)
   - "Why" revisitation rate (do users look at their Why?)
   - Which whispers get the most follow-up behavior

---

## UX Research Summary

**What's strong in the current design**:
- The anti-gamification voice is the most differentiated UX principle in the app. It will resonate deeply with the target persona.
- The pre-filled workout from last session is the single highest-value convenience feature. Never remove it.
- Voice-note on set is genuinely innovative and solves a real logging friction.

**Critical design risks to address before shipping**:
1. **One-tap finish needs an accidental-activation guard** — this is a P0 issue
2. **Dashboard "biggest element" logic must be transparent and learnable**, not black-box adaptive
3. **Cold-start HealthKit framing is the make-or-break moment** — invest heavily in copy and UX testing here
4. **The "Why" prompt needs specificity** to produce meaningful answers from real users under time pressure

**Open question recommendation**: The brief asks whether the Why should be static or adaptive. Based on user research principles, the answer is: **editable on demand, never forced to change.** Show a gentle "Has this changed?" prompt at major milestones (90-day mark, significant life event detected via HealthKit gap), but never auto-update it. The Why belongs to the user.

---

*Passing to Session 05: Go-to-Market*
