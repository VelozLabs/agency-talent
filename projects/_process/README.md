# Product Development Pipeline

This folder defines the reusable phase framework for taking an idea from raw concept to built product using the agency-talent roster.

## How It Works

Each phase has a corresponding template folder in `projects/`. Copy the template, fill in the brief (session 00), and run the sessions in order. Each session is executed by the named agent(s). The final session of every phase is always a **Feedback Loops** session — it routes gate-level findings back to the agents they implicate before the next phase begins.

## The Phases

See `phases.md` for the full pipeline table.

```
Phase 1: Ideation       → template: _idea-review-template/
Phase 2: Concepting     → template: _concepting-template/
Phase 3: Specification  → template: _specification-template/ (stub)
Phase 4: Build          → template: _build-template/ (stub)
```

## Why Loops Are Mandatory

Early versions of this framework ran sessions in sequence and relied on a single Orchestrator (final session) to catch all cross-agent conflicts. This created two problems:

1. **No cross-pollination**: Legal never talked to Growth. UX never talked to Architecture. Conflicts sat unresolved until the end.
2. **One-way street**: When the final session found a problem (e.g., scale assumption wrong), there was no mechanism to route the finding back to the agent who needed to revise their work.

The Feedback Loops session at the end of each phase solves both. It is not optional. If you skip the Loops session, you carry unresolved conflicts into the next phase where they compound.

## Running a Phase

1. Copy the relevant `_template/` folder into a new project folder (e.g., `my-idea-fitness-planning/`)
2. Fill in `session-00-brief.md` with your idea-specific input
3. Run each session in order, replacing `[PLACEHOLDER]` tokens with real content
4. Complete the Loops session — do not skip it
5. The gate at the end of the Loops session determines whether the phase is complete

## File Naming

- Ideation sessions: `session-00-brief.md` through `session-09-feedback-loops.md`
- Concepting sessions: `C-00-brief.md` through `C-09-feedback-loops.md`
- Specification sessions: `S-00-brief.md` through `S-NN-feedback-loops.md`
- Build sessions: `B-00-brief.md` through `B-NN-feedback-loops.md`
