# Session 06 — Legal & Compliance
**Agent**: support-legal-compliance-checker
**Status**: [ ] Complete
**Inputs**: session-00 through session-05 · risk-register.md
**Next**: session-07-mvp-scope.md

---

## Handoff Brief (Orchestrator → Agent)

*Filled by product-venture-orchestrator before dispatching this session.*

**Idea summary**: [One sentence]

**Business model**: [How money is made — lead gen, marketplace, SaaS, etc.]

**Key surfaces with legal exposure** (from prior sessions):
- [e.g., "SMS outreach to supply-side contacts at scale — session-05"]
- [e.g., "Scraping public data sources — session-03"]
- [e.g., "Handling user payment data — session-03"]

**Open legal risks from register**:
- [List relevant open risks]

**Specific questions**:
1.
2.
3.

**Default posture**: Assume the aggressive version of the product — the one that
moves fastest and collects the most data. Flag what that version cannot do legally,
and what a compliant version would look like.

---

## Regulatory Exposure Assessment

### Communications & Outreach

| Risk | Regulation | Applies? | Severity | Compliant Path |
|---|---|---|---|---|
| SMS marketing without consent | TCPA (US) | [ ] Yes  [ ] No | | |
| Email marketing without opt-in | CAN-SPAM / GDPR | [ ] Yes  [ ] No | | |
| Automated calls / robocalls | TCPA | [ ] Yes  [ ] No | | |
| Cold outreach to businesses | State-specific rules | [ ] Yes  [ ] No | | |

### Data & Privacy

| Risk | Regulation | Applies? | Severity | Compliant Path |
|---|---|---|---|---|
| Collecting personal data without disclosure | GDPR / CCPA / CPRA | [ ] Yes  [ ] No | | |
| Selling or sharing user data | CCPA opt-out rights | [ ] Yes  [ ] No | | |
| Storing payment data | PCI-DSS | [ ] Yes  [ ] No | | |
| Scraping data from third-party sites | ToS / CFAA risk | [ ] Yes  [ ] No | | |
| Children's data (COPPA) | Under-13 users | [ ] Yes  [ ] No | | |

### Industry-Specific Regulations

| Risk | Regulation | Applies? | Severity | Compliant Path |
|---|---|---|---|---|
| [Industry-specific — e.g., contractor licensing liability] | | [ ] Yes  [ ] No | | |
| [e.g., lead gen disclosure requirements (FTC)] | FTC rules | [ ] Yes  [ ] No | | |
| [e.g., financial services, healthcare, legal advice] | | [ ] Yes  [ ] No | | |

### Marketplace & Platform Liability

| Risk | Framework | Applies? | Severity | Compliant Path |
|---|---|---|---|---|
| Platform liability for contractor/vendor actions | Section 230 / state law | [ ] Yes  [ ] No | | |
| Lead quality guarantees creating implied warranty | Contract law | [ ] Yes  [ ] No | | |
| Contractor vetting creating liability if contractor causes harm | Negligent referral | [ ] Yes  [ ] No | | |

---

## Jurisdiction Analysis

**Primary jurisdiction**: [State / Country]

**Key jurisdiction-specific risks**:
- [e.g., "California CCPA applies if any CA users"]
- [e.g., "Florida contractor licensing law — must display license numbers"]

**Jurisdiction blockers** (risks that only apply in specific jurisdictions and could
be avoided by launching elsewhere first):

| Risk | Jurisdiction | Avoidable? | Alternative |
|---|---|---|---|
| | | [ ] Yes  [ ] No | |

---

## Compliance Requirements for MVP

*Minimum legal requirements that must be in place before first paying customer.*

| Requirement | Complexity | Notes |
|---|---|---|
| Privacy policy | Low | Boilerplate + specific data disclosures |
| Terms of service | Low-Med | Especially important for marketplace liability clauses |
| TCPA consent collection | Med | Before any SMS outreach |
| [Other] | | |

**Estimated legal setup cost**: [$X — attorney fees, incorporation, etc.]

---

## Risk Register Update

| # | Risk | Category | Severity | Status | Notes |
|---|---|---|---|---|---|
| | legal | | | | |
| | legal | | | | |

---

## Session Close — Orchestrator Notes

**Any HIGH legal risks that require a product change?**
[ ] Yes — describe: _______________
[ ] No

**Any jurisdiction-specific risks that suggest an alternative launch market?**
[ ] Yes — describe: _______________
[ ] No

**Key questions for session-07**:
1.
2.
