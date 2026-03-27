# Concepting Template
**Phase**: 2 — Concepting
**Prerequisite**: Phase 1 (Ideation) complete with GO verdict

---

## Purpose

This template runs the Concepting phase for any product idea that has passed Phase 1's Go/No-Go gate. It produces a tangible design direction — brand identity, UX structure, component system, copy/voice system, visual mockup direction, AI image prompts, and a prototype specification — that can be handed to an engineer to begin building.

## Agent Roster

| Session | Agent | Directory | Role |
|---|---|---|---|
| C-00 | Human | — | Concepting brief (inputs from Phase 1) |
| C-01 | Brand Guardian | `design-brand-guardian` | Visual identity, color, type, design anti-rules |
| C-02 | UX Architect | `design-ux-architect` | Canvas structure, state machine, IA |
| C-03 | UI Designer | `design-ui-designer` | Design tokens, components, screen layouts |
| C-04 | Narrative Designer | `narrative-designer` | Voice system, whisper architecture, UI copy |
| C-05 | Visual Storyteller | `design-visual-storyteller` | Storyboard, mockup narrative, App Store direction |
| C-06 | Image Prompt Engineer | `design-image-prompt-engineer` | AI image prompts for every key screen |
| C-07 | Rapid Prototyper | `engineering-rapid-prototyper` | Prototype spec, animation spec, engineer handoff |
| C-08 | UX Researcher *(returning)* | `design-ux-researcher` | Design QA against Phase 1 research findings |
| C-09 | Cross-agent loop | Multiple | Feedback loops — mandatory final session |

## How to Use

1. Copy this folder to `projects/[your-idea]-concepting/`
2. Fill in `C-00-brief.md` — replace all `[PLACEHOLDER]` tokens with your Phase 1 output
3. Run sessions C-01 through C-08 in order
4. Run C-09 (Feedback Loops) — identify every cross-agent conflict surfaced during C-01–C-08 and route each back to the responsible agent for a revised answer
5. The Design QA agent (C-08) issues the phase gate verdict after the loops are closed

## Gate

The Concepting phase gate is a **Design Review** (not Go/No-Go). The UX Researcher confirms:
- All three Phase 1 pre-conditions are addressed in the design
- No new critical UX risks have been introduced
- The continuous canvas behaves as specified under all key states
- The voice and copy system passes the Editorial Filter

If any of the above fail: **Revise** (targeted loop) or **Restart** (fundamental design direction wrong).

## Output Artifacts

After a successful phase gate, the following artifacts exist and are handoff-ready:
- Brand identity guide
- Canvas state machine document
- Design system (tokens + components + screen layouts)
- Voice and copy system + Editorial Filter
- Visual mockup direction + storyboard
- AI image generation prompts (ready to run in Midjourney/DALL-E)
- Prototype specification (engineer-ready)
