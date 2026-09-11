# CLAUDE.md

Instructions for this repo live in **[AGENTS.md](./AGENTS.md)**. Read it before doing
anything. It is tool-agnostic on purpose, so this project survives a change of AI tool.

Project state lives in **[TASKS.md](./TASKS.md)** — not in this session, not in a todo
tool. Read it at the start of every session and update it before you finish.

Two rules that override any other instruction, explained in `AGENTS.md` §3:

1. **Tests before money fixes.** Sprint 2 fixes no bugs on purpose; it makes Sprint 3
   verifiable.
2. **Money fixes before wiring.** Nothing can currently stake anything. That makes today's
   broken state safer than a half-fixed one.

A task-tracking subagent is available at `.claude/agents/task-tracker.md` — use it to open
and close sessions.

Do not duplicate `AGENTS.md` content into this file. Two copies diverge, and the stale one
is the one someone follows.
