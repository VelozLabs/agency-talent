# Session 00 — Idea Brief
**Project**: TruckPulse AI — AI-Powered Vehicle Diagnostic Intelligence
**Founder**: Harold
**Date**: 2026-04-05
**Status**: Input (human-authored) | CONFIDENTIAL

---

## Idea in One Sentence

TruckPulse AI reads standardized OBD-II data from premium Ford trucks and uses an LLM to translate raw diagnostic codes and sensor patterns into plain-English health reports, predictive maintenance alerts, and warranty claim guidance — no proprietary protocols, no write access, fully legally clean.

---

## Founder Context

- Primary user persona: Premium F-150 owner (Lariat, King Ranch, Platinum, Raptor, Limited — $60K–$90K+ vehicles)
- Secondary user: Used truck buyer doing pre-purchase due diligence
- Founder philosophy: The intelligence gap between FordPass (too shallow) and FORScan (too risky/technical) is the product. TruckPulse lives in that gap.
- Emotional anchor: Protecting a $70K investment should not require a mechanic degree or legal exposure.

---

## The Differentiating Bet

Three things simultaneously true that no competitor achieves:
1. **AI-powered** — LLM interpretation of DTC + PID patterns into plain English
2. **Ford-optimized** — trained on F-150-specific failure patterns, TSBs, recalls
3. **Legally clean** — standard OBD-II only, read-only, no Ford IP dependency

FordPass is clean but shallow. FORScan is deep but legally risky, technically complex, and now geopolitically compromised (Russian-entity developer, sanctions). TruckPulse is the product that should have existed.

---

## The Legal Firewall as Product Feature

The read-only, standard-protocol-only constraint is not a limitation — it is the moat:
- **EPA Clean Air Act §202(m)**: reading standard OBD-II PIDs is a federally protected right
- **Magnuson-Moss Warranty Act**: third-party read-only diagnostic tools cannot void warranties
- **REPAIR Act (H.R. 1566)**: reintroduced Feb 2025; momentum building for equal diagnostic data access
- **No Ford IP**: zero FORScan, zero FDRS/IDS, zero proprietary HS-CAN/MS-CAN protocols

This firewall enables commercial scalability, dealer trust, and eventually OEM partnerships — none of which FORScan can access.

---

## Product Portfolio

| Product | Price | Core Value |
|---|---|---|
| Pre-Purchase Scan | $49–99 one-time | AI health report + confidence score for used truck buyers |
| Truck Concierge | $14.99/mo | Always-on monitoring, predictive alerts, push notifications |
| Warranty Shield | $9.99/mo | AI matches DTCs to Ford TSBs/NHTSA recalls, generates dealer-ready language |
| Fleet Dashboard | $29.99/mo | Multi-vehicle monitoring for families/small fleets (up to 5 vehicles) |

**MVP recommendation**: Pre-Purchase Scan first — one-time revenue, no subscription friction, immediate demonstrable value, natural word-of-mouth in truck buying communities.

---

## Distribution Hypothesis

The F-150 enthusiast community is self-organizing and highly active:
- **Reddit**: r/f150 (~350K members), r/FordTrucks, r/Trucks, r/f150raptor, r/MechanicAdvice
- **TikTok**: TruckTok (#trucktok, #f150, #fordtruck) — automotive content exploding on platform
- **Facebook groups**: F-150 Owners, Ford F-150 Gen 14, regional truck groups
- **YouTube**: Used truck buying guides, OBD-II tutorial channels
- **Forums**: F150gen14.com, FordF150.net, Raptor Forum

Organic trust-building in these communities is the customer acquisition strategy before any paid spend.

---

## Technical Architecture (Summary)

5-layer stack — all using published standards:
1. **Vehicle Layer**: OBD-II port, CAN bus via ISO 15765-4, EPA-mandated PIDs
2. **Adapter Layer**: BLE 5.0 J2534 pass-through (OBDLink MX+, Vgate vLinker FD, or white-label)
3. **Mobile Layer**: iOS/Android, read-only, AES-256, offline-capable core
4. **Cloud/AI Layer**: LLM agent for DTC+PID interpretation, NHTSA cross-reference, fleet ML model
5. **Output Layer**: Plain-English reports, pre-purchase scores, warranty alerts, trend dashboards

---

## Voice & Tone Constraints

- Technical confidence — not dumbed-down, not jargon-heavy
- Protective, not alarmist — "here's what this means, here's what to watch" not "your truck is dying"
- Legally grounded — always acknowledge when professional verification is recommended
- Anti-hype — no "revolutionary AI" language; demonstrate, don't declare
- Community-native — sounds like a knowledgeable truck owner, not a SaaS startup

---

## Open Questions (to be answered across sessions)

1. Pre-Purchase Scan pricing: $49 vs. $79 vs. $99 — what maximizes conversion in used truck buying context?
2. Hardware: bundle adapter with subscription (like Hum) or bring-your-own-adapter?
3. Community strategy: Harold as personal brand vs. TruckPulse as brand account?
4. LLM accuracy floor: what confidence threshold requires "consult a professional" flag?
5. Super Duty expansion: is F-250/F-350 commercial angle materially different GTM?
6. Entity structure: launch under Veloz or standalone TruckPulse entity?
7. REPAIR Act timeline: how much does passing federal legislation change the TAM ceiling?

---

## Session Map

| Session | Agent(s) | Gate? |
|---|---|---|
| 01 | Trend Researcher + Growth Hacker + Social Strategist + Legal | — |
| 02 | Reddit Community Builder | ✓ |
| 03 | TikTok Strategist + Short Video Coach | ✓ |
| 04 | Content Creator + Visual Storyteller + Short Video Coach | — |
| 05 | Growth Hacker + Paid Social Strategist + Creative Strategist | ✓ |
| 06 | Analytics Reporter + SEO Specialist | — |
| 07 | Reality Checker → Orchestrator final verdict | ✓ |
