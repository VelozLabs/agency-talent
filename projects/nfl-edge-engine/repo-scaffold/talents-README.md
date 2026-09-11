# Talents

Role definitions for the team this project needs, copied from the
[agency-talent](https://github.com/VelozLabs/agency-talent) catalog so this repo is
self-contained. `docs/talent-assessment.md` maps each role to the subsystem it owns and
explains why it is here.

Each directory holds:

```
profile.yaml       identity, role, temperature, system prompt
DESCRIPTION.md     the substantive persona content
skills/core.md     skill file
tools/manifest.yaml
```

**A caveat worth knowing.** In the source catalog, all 145 `skills/core.md` files are
byte-identical boilerplate — the real content is in each `DESCRIPTION.md`. Read that one.
The exception is `sports-betting-modeler/`, which was authored for this project and whose
`skills/core.md` is the substantive file.

## Who owns what

| Talent | Owns |
|---|---|
| `sports-betting-modeler` | The maths: de-vig, push probability, Kelly, CLV. **Every judgment call about the model** |
| `engineering-backend-architect` | NestJS shell, module boundaries, API surface |
| `engineering-ai-engineer` | The agent layer and `lib/llm.ts` |
| `agents-orchestrator` | `SwarmService` fan-out and judgment resolution |
| `engineering-data-engineer` | Ingestion across the four external feeds |
| `engineering-database-optimizer` | The append-only snapshot table and its indexes |
| `specialized-model-qa` | Validating what the LLM agents emit into money decisions |
| `engineering-devops-automator` | Snapshot cron, secrets, deploy |
| `engineering-sre` | Uptime around kickoff windows; the closing snapshot is unmissable |
| `engineering-security-engineer` | Auth guards, secret handling, log redaction |
| `engineering-code-reviewer` | Second pair of eyes on every money-path change |
| `testing-api-tester` | Contract tests against four flaky third-party feeds |
| `testing-reality-checker` | Keeping the known gaps from shipping silently |
| `support-finance-tracker` | Bet P&L, CLV reporting, reconciliation |
| `support-legal-compliance-checker` | Jurisdictional and sportsbook-ToS exposure |
| `report-distribution-agent` | Discord delivery |
| `engineering-technical-writer` | Keeping model assumptions documented as they change |
| `project-management-project-shepherd` | Sprint flow and the task board |
