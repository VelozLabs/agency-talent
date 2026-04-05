# Session 04 — Cross-Platform Content Calendar & Brand Voice
**Project**: TruckPulse AI
**Date**: 2026-04-05
**Agents**: Content Creator (`marketing-content-creator`) + Visual Storyteller (`design-visual-storyteller`) + Short Video Coach (`marketing-short-video-editing-coach`)
**Status**: Output (agent-authored)
**Prerequisite**: Gates 02 and 03 cleared

---

## Brand Voice Definition

### Voice Pillars
- **Technically confident**: Knows OBD-II deeply; never talks down to the audience but never shows off jargon
- **Protective, not alarmist**: "Here's what this means and what to watch" — not "your truck is dying"
- **Honest about limits**: Proactively acknowledges what standard OBD-II can't see vs. what a dealer scan tool sees
- **Community-native**: Sounds like a knowledgeable F-150 owner who happens to build software — not a startup

### Voice Anti-Patterns (never use)
- "Revolutionary AI" — demonstrate intelligence, don't declare it
- "Your truck is at risk" — protective framing without alarmism
- Implying Ford endorsement or affiliation
- Overpromising on diagnostic depth ("we see everything") — standard PIDs have real coverage limits
- Gamification language (streaks, scores framed as competition, achievement badges)

### Sample Voice in Practice
| Context | Wrong | Right |
|---|---|---|
| DTC P0420 | "CRITICAL: Your catalytic converter is failing!" | "P0420 is flagging catalyst efficiency. Here's what that usually means on the 3.5L EcoBoost and when it needs attention." |
| Product value | "Revolutionary AI that knows your truck better than your dealer" | "8-minute scan. Plain English results. Know what you own." |
| Pre-purchase | "Never buy a used truck without this" | "Before you sign on a $65K F-150, here's what a scan can tell you — and what it can't." |
| Warranty | "We'll get Ford to cover it" | "TruckPulse matched your DTC to TSB 22-2337. Here's the language to bring to your dealer." |

---

## Content Architecture

### The Three Streams

```
Reddit (Trust)          TikTok (Reach)         Email/Web (Convert)
     |                       |                        |
Long-form value         Scan reveals             DTC Library
Expert commentary       DTC education            Warranty guides
AMA + discussion        Creator collabs          Pre-purchase guides
Community answers       Quick tips               Product updates
     |                       |                        |
     +----------→ Repurpose across ←-----------+
```

All content starts from one of three source types:
1. **Real scan data** (anonymized) → Educational post + TikTok reveal + Reddit DTC explanation
2. **TSB/Recall match** → Warranty Shield post + Reddit thread + TikTok "Ford didn't tell you" hook
3. **Community question** (from Reddit/email) → Answer on Reddit + Short explainer TikTok + DTC library page

---

## 12-Week Cross-Platform Content Calendar

### Week 1 — Launch Foundation
| Day | Platform | Content | Format | Agent/Owner |
|---|---|---|---|---|
| Mon | Reddit | Comment campaign: answer 5 DTC questions in r/f150 | Comments | Harold |
| Tue | TikTok | "What OBD-II actually tells you about your F-150 (and what it doesn't)" | Education, 60s | Video team |
| Wed | Reddit | Comment campaign: r/MechanicAdvice | Comments | Harold |
| Thu | TikTok | "The 3 most common DTCs on the F-150 3.5L EcoBoost" | Education, 45s | Video team |
| Fri | Reddit | Comment campaign: r/FordTrucks TSB thread | Comments | Harold |
| Sat | TikTok | Quick tip: "What a pending DTC means vs. a confirmed one" | Quick tip, 20s | Video team |
| Sun | — | Rest / review analytics | — | — |

### Week 2 — First Original Content
| Day | Platform | Content | Format | Notes |
|---|---|---|---|---|
| Mon | Reddit | Post: "Complete guide to F-150 OBD-II without dealership rates" | Long-form guide | Harold's account |
| Tue | TikTok | "I scanned 3 used F-150s this month — here's what I found" | Scan reveal, 75s | Anonymized |
| Wed | Reddit + Reels | Reddit comment campaign + repurpose Tue TikTok to Reels | Multi-platform | — |
| Thu | TikTok | "DTC P0171 on an F-150 — what it means and what to do" | DTC education, 45s | — |
| Fri | Reddit | Engage TSB/recall questions in r/FordTrucks | Comments | Harold |
| Sat | TikTok + Shorts | Quick tip repurposed to YouTube Shorts | Quick tip, 20s | — |

### Weeks 3–12 — Rhythm Established

**Monday**: Reddit long-form post or guide (r/f150 or r/FordTrucks)
**Tuesday**: TikTok scan reveal or high-stakes education
**Wednesday**: Cross-platform repurpose (TikTok → Reels, Reddit → Web DTC library)
**Thursday**: TikTok DTC education series ("DTC of the Week")
**Friday**: Reddit community engagement + responding to week's questions
**Saturday**: TikTok quick tip (15–30s)
**Sunday**: Analytics review; plan next week's content

**Month 2 additions** (once cadence is stable):
- YouTube Shorts channel activated
- Email newsletter: "TruckPulse Weekly" — curated DTC insights + TSB alerts for subscribers
- Web DTC library: SEO-optimized pages for top 50 F-150 DTCs

---

## Visual Identity (Design Storyteller Input)

### Color System
- **Primary**: Deep Midnight Navy (#1A2540) — premium, trustworthy, automotive
- **Accent**: Signal Orange (#FF6B35) — alert states, CTAs, DTC severity indicators
- **Neutral**: Slate (#8B9AB2) and Warm White (#F8F7F4)
- **Data Green**: (#22C55E) — healthy/normal readings

### Visual Language
- **Data-first aesthetics**: Real OBD-II data visualizations on screen (not stock imagery)
- **Premium truck photography**: Lariat, King Ranch, Raptor — never base/XL trims
- **Clean UI screenshots**: App interface must look premium — no cluttered dashboards
- **No stock "mechanic" imagery**: No wrenches, no garage stereotypes — TruckPulse is a software product

### TikTok Visual Standards
- Text overlays: Bold, high-contrast, 36pt minimum for key data points
- DTC codes always displayed in monospace font (code aesthetic)
- Severity indicators: Red (critical), Orange (warning), Green (normal)
- Always include TruckPulse watermark (bottom-right, semi-transparent)

### Report Design
- Pre-Purchase Scan report: A4/Letter PDF, branded cover, confidence score hero element
- Designed to be screenshotted and shared — the 87/100 confidence score is the shareable image
- Color-coded severity: Green/Yellow/Red for each finding

---

## Content Repurposing Workflow

```
Source Content Created
        |
    TikTok Video
    (vertical, 45–75s)
        |
    +---+---+
    |       |
Instagram  YouTube
Reels      Shorts
(same)     (same)
    |
Reddit Post
(link or embed if
sub allows video)
    |
DTC Library Page
(text + embedded video
for SEO)
    |
Email Newsletter
(curated weekly digest)
```

**Time investment per original piece**: 1 video = 5 distribution touchpoints with ~30 min additional work

---

## Content Quality Standards

All content must pass this checklist before posting:

**Accuracy**
- [ ] DTC explanation verified against NHTSA/OEM documentation
- [ ] TSB reference is current and accurate
- [ ] No claims beyond what standard OBD-II PIDs actually support

**Legal**
- [ ] Disclaimer present on all diagnostic interpretations
- [ ] No Ford trademark misuse (no implied affiliation)
- [ ] No "guarantee" language on warranty coverage

**Brand Voice**
- [ ] No alarmist framing of DTC severity
- [ ] No jargon without plain-English explanation
- [ ] Honest about coverage limitations when relevant

**Platform**
- [ ] Vertical format for TikTok/Reels/Shorts
- [ ] Captions/subtitles present
- [ ] Hook text on screen in first 3 seconds (TikTok)
- [ ] Community rules reviewed before Reddit posting

---

## Session 04 Deliverables

- [x] Brand voice pillars defined and anti-patterns documented
- [x] Three-stream content architecture mapped
- [x] 12-week cross-platform calendar structured
- [x] Visual identity system defined
- [x] Repurposing workflow documented
- [x] Content quality checklist established

**Cleared for Session 05 (Paid Amplification)**
