# Risk Register — TruckPulse AI
**Project**: TruckPulse AI
**Last Updated**: 2026-04-05
**Owner**: Harold (Orchestrator oversight)
**Status**: Active — update after each session and gate decision

---

## Risk Matrix Legend

| Severity | Description |
|---|---|
| Critical | Could kill the project or create irreversible legal/financial harm |
| High | Significant impact on timeline, revenue, or trust — requires active mitigation |
| Medium | Manageable impact with planned mitigation; monitor closely |
| Low | Minor impact; accept or monitor |

| Likelihood | Description |
|---|---|
| Very Likely | Expect this to happen if unaddressed |
| Likely | More than 50% probability without mitigation |
| Possible | 20–50% probability |
| Unlikely | <20% probability; possible but not expected |

---

## Active Risks

### RISK-001 — Ford C&D (Cease & Desist)
**Category**: Legal
**Severity**: High | **Likelihood**: Possible
**Description**: Ford sends a cease-and-desist claiming trademark infringement, unfair competition, or unauthorized use of Ford's diagnostic infrastructure — even if legally unfounded.
**Impact**: Legal fees ($10K–50K to respond), product pause during response period, reputational disruption
**Mitigation**:
- [ ] Retain automotive IP attorney before launch — obtain clean-room architecture opinion letter
- [ ] Ensure all "Ford" and "F-150" usage is clearly nominative fair use (descriptive, not affiliated)
- [ ] No implied Ford endorsement in any marketing materials
- [ ] Document clean-room development process throughout build phase
**Owner**: Harold
**Status**: Open — legal engagement required before launch

---

### RISK-002 — OBD-II Platform Lockout (Ford FNV Architecture)
**Category**: Product / Market
**Severity**: Critical (long-term) | **Likelihood**: Possible (12–36 month window)
**Description**: Ford's new FNV (Ford Next Generation Vehicle) architecture restricts third-party OBD-II access on future models, narrowing the addressable fleet over time.
**Impact**: Limits TruckPulse to pre-FNV vehicles; TAM ceiling begins declining from ~2027–2028 on new vehicles
**Mitigation**:
- [ ] Build and launch MVP now — establish user base before lockout narrows new-vehicle access
- [ ] Monitor REPAIR Act federal legislation progress — passage would mandate open access and reset this risk
- [ ] Track Ford FNV rollout timeline — which model years and trims are affected first
- [ ] Evaluate Super Duty expansion (commercial fleet OBD-II access may be protected longer)
**Owner**: Harold
**Status**: Open — monitor quarterly; escalate if REPAIR Act stalls in Congress

---

### RISK-003 — LLM Diagnostic Accuracy
**Category**: Product / Liability
**Severity**: Critical | **Likelihood**: Likely (without mitigation)
**Description**: LLM interprets a DTC incorrectly with high confidence, leading an owner to take a damaging action (delay serious repair, make incorrect parts purchase, or worse).
**Impact**: Trust destruction, product liability exposure, negative viral content, potential legal action
**Mitigation**:
- [ ] Implement confidence scoring on all LLM outputs before public beta
- [ ] All diagnostic interpretations include professional verification language: "Verify serious findings with a certified mechanic"
- [ ] High-severity DTCs (safety-critical) always trigger elevated disclaimer language
- [ ] Terms of Service clearly disclaim product liability for diagnostic interpretations
- [ ] Red-team LLM with adversarial DTC inputs before launch
**Owner**: Product/Engineering
**Status**: REQUIRED BEFORE LAUNCH — gates both public beta and App Store submission

---

### RISK-004 — Standard OBD-II Data Depth Gap
**Category**: Product / Market
**Severity**: Medium | **Likelihood**: Very Likely (this is a structural limitation)
**Description**: Standard OBD-II covers Mode 01 PIDs and Mode 03 DTCs well but misses the deeper Ford-specific module data that FORScan accesses via proprietary protocols. Power users may discover this gap and post negatively.
**Impact**: Trust erosion in community, negative reviews, FORScan community pushback
**Mitigation**:
- [ ] Publish explicit "What TruckPulse Can and Cannot Detect" page before any marketing
- [ ] Lead with the legal safety and AI interpretation value — not data depth
- [ ] In AMA and community conversations, be proactively honest about coverage limits
- [ ] Frame as a deliberate design choice: "We traded depth for legal safety and warranty protection"
**Owner**: Harold (messaging) + Product (documentation)
**Status**: Open — address in all community and marketing messaging

---

### RISK-005 — Founder Time Bandwidth
**Category**: Execution
**Severity**: High | **Likelihood**: Likely
**Description**: Harold is simultaneously building the product, managing Reddit community (45 min/day), creating TikTok content, and running business operations. Bandwidth collapse will deprioritize community-building, which has the longest lead time.
**Impact**: Reddit karma-building falls behind schedule; TikTok content cadence drops; 90-day community runway becomes 6-month runway
**Mitigation**:
- [ ] Hire part-time video editor ($500–800/month) for TikTok production — Harold provides raw footage and direction
- [ ] Reddit: block 30-minute daily calendar appointment — non-negotiable time for first 90 days
- [ ] Deprioritize: do not start Warranty Shield product development until Pre-Purchase Scan is in App Store
- [ ] Consider hiring community manager for Reddit comments in Month 2 (with strict brand voice training)
**Owner**: Harold
**Status**: Open — resource planning required in first 30 days

---

### RISK-006 — Competitive Pivot by OBDAI/ARIA
**Category**: Competitive
**Severity**: Medium | **Likelihood**: Possible
**Description**: OBDAI, ARIA, or a well-funded competitor observes TruckPulse's traction and pivots to Ford-specific optimization, neutralizing the differentiation.
**Impact**: Competitive pressure on the Ford-optimized positioning within 12–18 months
**Mitigation**:
- [ ] Move fast on community building — Reddit karma, TikTok audience, and DTC library SEO are moats that take 6–12 months to build and cannot be bought
- [ ] Establish "TruckPulse" brand ownership in truck communities before any competitor can
- [ ] Defensibility is in the community flywheel, not the technology — prioritize community speed
**Owner**: Harold
**Status**: Open — monitor competitor activity quarterly

---

### RISK-007 — BLE Adapter Compatibility & Support Load
**Category**: Product / Operations
**Severity**: Medium | **Likelihood**: Very Likely
**Description**: BLE pairing with OBD-II adapters on iOS is notoriously inconsistent. Different adapters behave differently. Support load from pairing issues could overwhelm founder-level support capacity.
**Impact**: Negative reviews, high support volume, user drop-off before first scan
**Mitigation**:
- [ ] Test minimum 3 adapter models before launch: OBDLink MX+, Vgate vLinker FD, OBD11 Express
- [ ] Publish a supported/tested adapter list in app and on website
- [ ] Build in-app adapter troubleshooting guide before launch
- [ ] Phase 1: Recommend only OBDLink MX+ (best-in-class BLE support, well-documented iOS SDK)
**Owner**: Product/Engineering
**Status**: Open — testing required before beta

---

### RISK-008 — Reddit Community Backlash
**Category**: Community / Marketing
**Severity**: Medium | **Likelihood**: Possible
**Description**: Harold's product promotion on Reddit is perceived as spam or self-promotion, triggering downvotes, bans, or a hostile community reaction that permanently poisons the channel.
**Impact**: Elimination of Reddit as a distribution channel; reputational damage in the most valuable organic community
**Mitigation**:
- [ ] Strict 90/10 rule enforced — no product mentions for first 90 days
- [ ] Review subreddit rules before any post — r/f150, r/FordTrucks, r/MechanicAdvice all have specific self-promotion rules
- [ ] Contact r/f150 mod team proactively at Day 30 to introduce Harold and confirm community guidelines
- [ ] AMA first, product announcement second — never the reverse
- [ ] If a post goes negative, engage authentically and immediately — never delete or argue
**Owner**: Harold
**Status**: Open — monitor community sentiment weekly

---

## Closed Risks

*(None yet — project is at ideation stage. This section populated as risks are mitigated.)*

---

## Gate Decision Log

| Date | Gate | Decision | Decision-Maker | Notes |
|---|---|---|---|---|
| 2026-04-05 | Gate 07 (Reality Check) | **PENDING** | Harold | Awaiting sign-off on 4 required mitigations |
| — | Gate 05 (Paid Budget) | PENDING | Harold | Not yet reached |
| — | Gate 03 (TikTok) | PENDING | Harold | Not yet reached |
| — | Gate 02 (Reddit) | PENDING | Harold | Not yet reached |

---

## Next Review

**Schedule**: Risk register reviewed at each gate decision and at monthly strategy review.
**Escalation**: Any risk moving from Medium → High requires immediate notification to Harold.
**New risks**: Any team member can add a risk to this register at any time. Log the date, source, and initial severity assessment.
