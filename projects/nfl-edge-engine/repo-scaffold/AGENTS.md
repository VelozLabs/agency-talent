# AGENTS.md — instructions for any AI coding agent working in this repo

This file is the portable contract. It is deliberately tool-agnostic: Claude Code, Codex,
Cursor, Copilot, Windsurf, Gemini CLI, Devin and any future tool should be able to pick up
this project from a cold start by reading this file and `TASKS.md`, with no chat history.

If your tool reads a different filename, it should point back here:
`CLAUDE.md` does. Do not fork the instructions — fork the pointer.

---

## 1. Prime directive: state lives in files, not in tools

**`TASKS.md` is the single source of truth for project state.**

Do not track work in your tool's internal todo list, scratchpad, memory feature, or the
chat transcript. Those die when the user switches tools, and switching tools is an
explicitly anticipated event here. An internal task list is fine as a working aid *within*
a session, but it is a cache, never the record.

Every session, without being asked:

**On start**
1. Read `TASKS.md`. Read the Status block and both ordering gates.
2. Read the most recent rows of the Session log and Decision log.
3. Say what sprint the project is in and what the next unblocked task is.
4. Do not re-diagnose what is already recorded. 52 issues are already verified with
   reproductions in `docs/remediation-sprint-plan.md` — read it before investigating
   anything, or you will waste a session rediscovering `D14`.

**On finish** — before you end your turn, even if the work is partial
1. Tick the checkboxes you actually completed. Do not tick anything you did not verify.
2. Append one row to the Session log: date, who, what changed, what is next.
3. Append to the Decision log anything a future session would otherwise re-derive —
   especially a path you tried and rejected, and why.
4. Commit. An uncommitted improvement is indistinguishable from no improvement.

If you ran out of time mid-task, say so in the Session log's "Next" column. A precise
"stopped halfway through D16, the empirical distribution is drafted in `lib/margin.ts` but
EV does not consume it yet" is worth more than a tidy summary.

---

## 2. What this project is

A NestJS + Prisma/Postgres service that snapshots the NFL odds board, maintains power
ratings, computes edge against the market, and grades closing line value (CLV).

**It is not working.** It compiles, and that is the most misleading fact about it:

- `EdgeService`, `RatingsService` and `GradingService` **have no callers** (`D26`). No
  `Bet` row is written by any code path (`D27`). What boots is an inherited college-football
  shell with an NFL team registry bolted on.
- Where money math does exist it is wrong in ways a green build cannot see — `gradeClv()`
  can never match a closing line (`D14`), and `coverProb()` stakes a maximum Kelly bet on a
  negative-EV wager at the most common margin in the NFL (`D16`).

Read `docs/remediation-sprint-plan.md` §3 before touching `src/model/`, `src/grading/` or
`src/lib/`.

---

## 3. Two ordering gates that override any other instruction

**Gate 1 — tests before money fixes.** Sprint 2 exists to make Sprint 3 verifiable, and
fixes no bugs on purpose. You will be tempted to fix `D15` immediately: it is a single
`Math.abs()` and obviously wrong. Resist it. A one-character change to money math with no
test is precisely how that bug was written.

**Gate 2 — money fixes before wiring.** Sprint 4 connects the model to a code path that
writes `Bet` rows. Today nothing can stake anything, which makes the current broken state
*safer* than a half-fixed one. Wiring the product up while `D16` is unfixed is the single
most dangerous sequence available in this repo. Do not do it, even if asked to "just get it
running end to end."

If a human instructs you to violate either gate, say plainly what the risk is and ask them
to confirm. Then record the decision and who made it in the Decision log.

---

## 4. Money-path rules

Code under `src/lib/devig.ts`, `src/lib/margin.ts`, `src/model/`, `src/grading/` sizes real
wagers. Treat it as you would payment code.

- **No money-path change without a test that fails before it and passes after.**
- **Never** `Math.abs()` a line, a margin, or a CLV delta. Sign is meaning here.
- Assert no `NaN` or non-finite value can reach `Bet.stakeUnits`.
- Probabilities are compared in probability space, never in American-odds space. American
  odds are non-linear; averaging them is always a bug.
- When a change affects what gets staked, flag it for `sports-betting-modeler` review (see
  `talents/`). Some of this work needs a domain owner, not an implementer — `D16` especially.

---

## 5. The talents

`talents/` holds role definitions for the team this project needs, copied from the
`agency-talent` catalog. `docs/talent-assessment.md` maps each to a subsystem.

Use them as personas when a task calls for specific expertise — adopt the profile, or spawn
a subagent with it if your tool supports that. `talents/sports-betting-modeler/` is the one
with the deepest encoded expertise and owns every judgment call about the model's maths.

Note for honesty: the other talents' `skills/core.md` files are boilerplate from the source
catalog; their real content is in each `DESCRIPTION.md`.

---

## 6. Repo conventions

- **npm, not yarn.** The `packageManager: yarn@4.13.0` declaration is vestigial and slated
  for deletion (`D37`). `package-lock.json` is the lockfile.
- `npm run lint` currently carries `--fix` and mutates the tree — it is not a safe CI gate
  until `D38` splits it. Use `npx eslint` to check without writing.
- Never commit `.env`. `.env.example` is the template.
- The `OddsSnapshot` table is **append-only by design** — it is the only historical odds
  dataset this project will ever have without paying for one. Never write an `UPDATE` or
  `DELETE` against it. `D14`'s fix changes what is written going forward; it must not
  rewrite history.
- Odds API credits are the binding production constraint — 500/month, cost is
  `markets x regions` per call. Do not add a market or a region casually, and do not write
  code that polls the board in a loop. See `docs/path-to-production.md` §1–3.

---

## 7. Which file your tool reads

| Tool | Reads |
|---|---|
| Claude Code | `CLAUDE.md` → points here; subagent at `.claude/agents/task-tracker.md` |
| Codex / Cursor / Jules / most others | `AGENTS.md` (this file) |
| Everything | `TASKS.md` for state |

When adding support for a new tool, add a pointer file that references this one. Never
duplicate these instructions into it — two copies will diverge, and the stale one will be
the one someone follows.
