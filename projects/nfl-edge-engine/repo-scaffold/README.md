# NFL Edge Engine

NestJS service that snapshots the NFL odds board, maintains power ratings, computes edge
against the market, and grades closing line value (CLV).

> ## Start here
>
> **This service does not work yet, and it compiles — which is the most misleading fact
> about it.** 52 issues are verified with reproductions. The NFL-specific product (ratings,
> edge, staking, CLV) has no callers at all, and the money math that does exist is wrong in
> ways a green build cannot see.
>
> | Read this | For |
> |---|---|
> | **[TASKS.md](./TASKS.md)** | Current state and what to do next. **Source of truth** |
> | **[AGENTS.md](./AGENTS.md)** | How to work this repo — any AI tool, any human |
> | [docs/remediation-sprint-plan.md](./docs/remediation-sprint-plan.md) | All 52 issues, with reproductions |
> | [docs/path-to-production.md](./docs/path-to-production.md) | Deploying at $0/month, and the odds-credit constraint |
> | [docs/talent-assessment.md](./docs/talent-assessment.md) | Which roles own which subsystem |
> | [README.engine.md](./README.engine.md) | The original engine README — setup, env, cadence, weekly loop |
>
> **Do not connect this to real money.** See the two ordering gates in `TASKS.md`.

## Quick start

```bash
npm ci
cp .env.example .env        # fill it in
npx prisma migrate deploy
npm run start:dev
```

`npm run start:prod` is currently broken (`D1`, `D2`) — fixing it is Sprint 0.

## Layout

```
src/          service code — see README.engine.md for module detail
prisma/       schema + migrations
docs/         diagnosis, deployment plan, team assessment
talents/      role definitions for the team this project needs
TASKS.md      the board
AGENTS.md     the contract for AI agents
```
