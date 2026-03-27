# Session 03 — Build Review
**Agents**: engineering-backend-architect · engineering-data-engineer
**Status**: [ ] Complete
**Inputs**: session-00 · session-01 · session-02 · risk-register.md
**Next**: session-04-user-experience.md

---

## Handoff Brief (Orchestrator → Agents)

*Filled by product-venture-orchestrator before dispatching this session.*

**Idea summary**: [One sentence]

**Primary concept**: [From session-01]

**Open build/data risks from register**:
- [List relevant open risks]

**Specific questions for engineering-backend-architect**:
1.
2.

**Specific questions for engineering-data-engineer**:
1.
2.

**Default posture**: Be conservative on build timelines. Surface data dependencies
the idea brief underestimated. If a core technical dependency is unavailable or
cost-prohibitive, name it as a potential fatal flaw.

---

## Backend Architect Output

### System Overview

**Architecture type**:
[ ] Standard web app (CRUD + auth)
[ ] Marketplace / two-sided platform
[ ] Data pipeline + dashboard
[ ] API / integration layer
[ ] Other: _______________

**High-level architecture diagram** (text or ASCII):

```
[Component] ──► [Component] ──► [Component]
```

### Core Data Models

```
[Entity] {
  fields...
}
```

### Critical Path (MVP)

The minimum sequence of components that must exist before a single user can
complete the primary action:

1. [Step]
2. [Step]
3. [Step]

### Build Complexity Assessment

| Component | Complexity | Est. Build Time | Notes |
|---|---|---|---|
| | Low/Med/High | | |
| | | | |
| | | | |

**Total MVP estimate**: [X weeks with Y engineers]

**Biggest technical risk**: [The one component most likely to blow the timeline]

### Tech Stack Recommendation

| Layer | Recommendation | Rationale |
|---|---|---|
| Frontend | | |
| Backend / API | | |
| Database | | |
| Auth | | |
| Payments | | |
| Notifications | | |
| Hosting | | |

### Infrastructure Cost Estimate (Month 1)

| Service | Estimated Cost/Month | Notes |
|---|---|---|
| | | |
| **Total** | | |

---

## Data Engineer Output

### Data Sources Required

| Data Type | Source | Availability | Cost | Legal Risk |
|---|---|---|---|---|
| | | Public/Licensed/Scraped | Free/$X/mo | Low/Med/High |
| | | | | |

### Data Pipeline Architecture

```
Source → Ingestion → Storage → Serving
```

### Bootstrapping Strategy

**How to seed the first dataset** (before any automation):
[Fastest path to first N records — manual, bulk export, API, etc.]

**Timeline to seed**: [X days with Y people]

### Key Data Risks

| Risk | Severity | Mitigation |
|---|---|---|
| | | |

### Ongoing Pipeline Complexity

**Refresh frequency needed**: [ ] Real-time  [ ] Daily  [ ] Weekly  [ ] On-demand

**Estimated pipeline maintenance**: [Hours/week once built]

---

## Build Checkpoint (Orchestrator)

### Fatal Flaw Check

| Flaw Type | Present? | Notes |
|---|---|---|
| Core dependency unavailable or proprietary | [ ] Yes  [ ] No | |
| Data source legally/economically unavailable at required scale | [ ] Yes  [ ] No | |
| Build complexity exceeds 60-day / 3-person MVP constraint | [ ] Yes  [ ] No | |

**Early kill**: [ ] Yes — reason: _______________  [ ] No — continue

### Risk Register Update

| # | Risk | Category | Severity | Status |
|---|---|---|---|---|
| | | | | |

### Key Questions for Session-04

1.
2.

**Gate decision**: [ ] Early kill  [ ] Continue to session-04
