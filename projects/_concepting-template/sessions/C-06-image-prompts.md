# Session C-06 — AI Image Prompts
**Agent**: Image Prompt Engineer (`design-image-prompt-engineer`)
**Input**: C-01 brand identity, C-03 screen layouts, C-05 visual direction
**Phase**: 2 — Concepting

---

## Agent Directive

Produce Midjourney/DALL-E prompts for every key screen and marketing asset. Each prompt must be specific enough that any designer running it gets a result consistent with the brand identity and screen layouts defined in prior sessions.

---

## Prompt Format

```
Asset: [PLACEHOLDER — name/purpose]
Platform: Midjourney v6 / DALL-E 3 [choose]
Prompt: "[PLACEHOLDER — full prompt string]"
Negative prompt: "[PLACEHOLDER — what to exclude]"
Style parameters: [PLACEHOLDER — e.g., "--ar 9:19.5 --style raw --v 6"]
Notes: [PLACEHOLDER — what to look for in the output, what to iterate if wrong]
```

---

## Required Assets

### In-App Screens

1. **Dashboard (data-rich state)** — user has 3+ months of data, dashboard is alive
2. **Dashboard (cold-start state)** — first-time user, only Why and first workout visible
3. **Active session** — user is mid-workout, logging a set
4. **Post-session** — dashboard has reshaped, insight is visible
5. **Watch logging screen** — Apple Watch face, mid-session

### Marketing Assets

6. **App Store hero image** — the product at its most compelling
7. **Waitlist page hero** — the product pitch in one image
8. **Social sharing card** — when a user shares their training data

---

## Anti-Aesthetic Enforcement

For every prompt, include explicit negative prompts that enforce the brand's anti-rules from C-01:

```
Universal negative prompt additions: [PLACEHOLDER — from C-01 anti-rules, converted to prompt exclusions]
```
