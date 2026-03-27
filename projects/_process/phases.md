# Pipeline Phase Map

The full product development pipeline. Each phase is a structured, agent-driven review that produces a specific artifact and ends with a Feedback Loops session before handing off to the next phase.

---

## Phase Table

| Phase | Name | Trigger | Agent Archetypes | Sessions | Loop Session | Gate Type | Primary Output | Template |
|---|---|---|---|---|---|---|---|---|
| 1 | **Ideation** | Raw idea brief (human-authored) | Idea Generator, Trend Researcher, SEO Specialist, Backend Architect, Data Engineer, UX Researcher, Sprint Prioritizer, Reality Checker, Outbound Strategist, Account Strategist, Growth Hacker, Legal Compliance | 8 linear sessions (00–08) | Session 09: Feedback Loops | Go / No-Go / Pivot | Venture review + risk register + editorial filter | `_idea-review-template/` |
| 2 | **Concepting** | Phase 1 GO verdict + risk register | Brand Guardian, UX Architect, UI Designer, Narrative Designer, Visual Storyteller, Image Prompt Engineer, Rapid Prototyper, UX Researcher (returning) | 8 linear sessions (C-00–C-08) | Session C-09: Feedback Loops | Design review: proceed / revise / restart | Design brief + image prompts + prototype spec + voice system | `_concepting-template/` |
| 3 | **Specification** *(stub)* | Phase 2 design review approval | Backend Architect, Data Engineer, Mobile App Builder, Security Engineer, DevOps, Technical Writer | TBD | TBD: Feedback Loops | Engineering sign-off | Full technical specification + data model + API contracts | `_specification-template/` *(not yet built)* |
| 4 | **Build** *(stub)* | Phase 3 engineering sign-off | Senior Developer, Frontend Developer, Mobile App Builder, QA/Testing, DevOps, Reality Checker | TBD | TBD: Feedback Loops | Ship / hold | Working software + test results + deployment checklist | `_build-template/` *(not yet built)* |

---

## Phase Descriptions

### Phase 1: Ideation

**What it does**: Takes a raw idea and pressure-tests it from every angle — market opportunity, technical feasibility, UX viability, go-to-market strategy, legal risk, and financial reality. Ends with a Go/No-Go/Pivot verdict.

**Inputs**: A one-page idea brief (the founder's vision)
**Outputs**:
- Venture review (8 session files)
- Risk register (live document updated through the phase)
- Editorial filter (from the Feedback Loops session)
- Go/No-Go/Pivot verdict with named pre-conditions

**Gate**: The Orchestrator in Session 08 issues the verdict. The Feedback Loops session in Session 09 resolves any conflicts the Orchestrator couldn't handle alone. Phase 2 does not begin until Session 09 loops are closed.

**Cross-pollination requirement**: Session 09 must include at least one loop connecting Legal findings to a non-legal agent, and at least one loop routing a Reality Check finding back to an earlier technical or GTM agent.

---

### Phase 2: Concepting

**What it does**: Takes the Phase 1 output and translates it into a tangible design direction — brand identity, UX structure, component system, voice/copy system, visual mockup direction, AI image prompts, and a prototype specification. The Concepting phase ends with a design that can be handed to an iOS/Android engineer to begin Sprint 1.

**Inputs**: Phase 1 session files (by reference), risk register, three pre-conditions from Session 08
**Outputs**:
- Brand identity guide (colors, typography, design anti-rules)
- Canvas state machine and information architecture
- Design system (tokens, components, screen layouts)
- Voice and copy system (whisper architecture, UI string library, editorial filter integration)
- Visual mockup direction (storyboard, App Store narrative)
- AI image generation prompts (Midjourney/DALL-E ready)
- Prototype specification (HTML/CSS skeleton, animation spec, handoff checklist)
- Design QA report (P0 issues resolved or escalated)
- Feedback loops (cross-agent design conflicts resolved)

**Gate**: The UX Researcher's Design QA (C-08) issues the design review verdict. The Feedback Loops session (C-09) closes any conflicts before Phase 3 begins.

**Returning agent**: The UX Researcher from Phase 1 returns in C-08 as the continuity bridge — they know what the research found, and they check whether the design decisions honored it.

---

### Phase 3: Specification *(stub)*

**What it does**: Translates the Concepting output into a full technical specification — data models, API contracts, infrastructure plan, security requirements, performance targets, and a sprint-ready engineering backlog.

**Inputs**: Phase 2 concepting output, prototype spec, design system
**Outputs**: Technical specification, data model, API contracts, engineering backlog
**Gate**: Engineering sign-off from Backend Architect + Senior Developer
**Status**: Template not yet built. Add when Phase 2 is complete.

---

### Phase 4: Build *(stub)*

**What it does**: Executes the specification. The agent team here shifts from planning to doing — writing code, running tests, resolving integration issues, and shipping.

**Inputs**: Phase 3 specification, engineering backlog
**Outputs**: Working software, test results, deployment checklist
**Gate**: Reality Checker (returning) signs off on actual vs. specified behavior
**Status**: Template not yet built. Add when Phase 3 is complete.

---

## Loops Architecture

Every phase ends with a mandatory Feedback Loops session. The structure is always the same:

```
Loop N:
  Trigger:         [Finding from gate or final session]
  Routing:         [Which prior agent is being asked to respond]
  Question:        [The specific question that needs a revised answer]
  Revised Answer:  [The responding agent's updated position]
  Impact:          [What changes in which prior session]
```

**Minimum loops per phase**: 3
**Maximum loops per phase**: No limit — run as many as needed to close all conflicts
**Who decides when loops are done**: The Orchestrator (Ideation) or Design QA agent (Concepting). When they confirm all unresolved conflicts are closed, the Loops session is complete.

---

## Live Projects

| Project | Phase | Status | Folder |
|---|---|---|---|
| Clay — Fitness App | Phase 1: Ideation | Complete (GO verdict, 3 pre-conditions, loops closed) | `clay-fitness-planning/` |
| Clay — Fitness App | Phase 2: Concepting | In progress | `clay-concepting/` |
