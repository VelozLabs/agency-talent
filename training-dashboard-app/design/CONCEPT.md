# Training Dashboard — Visual Concept

**One spine, three reads.** A single Timeline is the persistent home; everything
else is a *read off it*, never a peer page. Dark, data-dense, terminal feel — a
tool Harold opens at 6am and trusts at a glance. Single user; no onboarding,
marketing, or settings sprawl.

---

## Color tokens

Phosphor-green spine on a near-black void, with one dedicated hue per source so
the three reads stay legible without labels.

| Token | Hex | Use |
|---|---|---|
| `--bg-0` | `#070809` | page void |
| `--bg-1` | `#0c0e10` | panel |
| `--bg-2` | `#121517` | raised panel / read tile |
| `--bg-3` | `#181c1f` | row hover |
| `--line` | `#222a2e` | hairline borders |
| `--ink-0` | `#e8efe9` | primary text |
| `--ink-1` | `#9fb0a7` | secondary |
| `--ink-2` | `#5f6e67` | muted / axis labels |
| `--ink-3` | `#3a4641` | ghost / planned |
| `--spine` | `#3ddc84` | **training / actual** (the green phosphor backbone) |
| `--ladder` | `#7aa2ff` | **lift detail** (blue) |
| `--health` | `#ff7a59` | **physiology / Apple Health** (warm) |
| `--oura` | `#c08bff` | **recovery / Oura** (violet) |
| `--warn` `--bad` `--good` | `#ffd24a` `#ff6b6b` `#3ddc84` | deltas, readiness flags |

Source-color discipline is the system's spine: the same blue means "Ladder"
everywhere (read tile bar, lift table, cold-start), so the eye learns the legend
once. Contrast: primary ink on void is ~13:1; muted axis labels clear 4.5:1.

## Typography

- **Mono** (`SFMono / JetBrains Mono`) is the default — it *is* the terminal
  voice and gives tabular number alignment for free across tables, sparks, KVs.
- **Sans** (system-ui) is used *only* for the few large display numbers (the date
  heading, the big per-read stat, trend headline values) so they read as
  "instruments," not code. This sans/mono split is the only typographic hierarchy
  needed.
- Scale: 9px (axis/source labels, all uppercase + letter-spaced) → 11/12/13px
  (body) → 17–22px (display). Weight 400/500/600/650.

## Layout grid

- 12px base rhythm; `--gap:14px` between panels; `--r:6px` radius; 1px hairlines.
- **Row 1 — Timeline spine**, full width: one horizontal time axis, a green
  `past-fill` up to a "NOW" marker, ghosted/dashed planned nodes after it.
- **Row 2 — two-up**, `1.55fr : 1fr`: **Today card** (left, the wide read) +
  **Trends strip** (right, the vertical scan). Collapses to one column < 980px.

## How the three reads cohere

1. **Timeline** holds *every* node as one green sessions-on-an-axis line; each
   node carries its Oura readiness pip above and label below — so the spine
   already fuses "did I train" + "was I recovered" before you click.
2. **Today card** is the deep fusion for one selected session: a three-tile
   *reads* strip (Health envelope · Oura recovery · Ladder load), each colored by
   source and topped with a left accent bar, then the parsed lift-detail table.
   A one-line **verdict** ("trained hard on a 62 readiness day") is the thesis of
   the whole product, stated in plain language. It is strictly **read-only**.
3. **Trends** stacks the same source hues vertically as sparklines — body comp
   (warm), recovery (violet) — so the across-time view uses the identical color
   grammar as the single-day view. Nothing new to learn between reads.

## Cold-start treatment (the important one)

Cold start is the *intended* v1 state, not an error. Body-comp and recovery
sparks are full from backfill and lead the Trends strip. The lift-progression
slot does **not** render an empty/zero chart — it renders a **"collecting"**
component: a labeled progress bar, `9 sessions logged · ~12 more for a trend
line`, an explicit unlock rule, and a single primary CTA *Upload a Ladder
screenshot*. The lift-table `est 1RM` column shows `—` for lifts without enough
history rather than a fake number. It reads as "this is filling," never "broken."

## Component inventory

- **TopBar** — brand glyph, source legend, clock, manual Sync button (live dot).
- **TimelineSpine** — axis, past-fill, NOW marker, session nodes (variants:
  `actual` / `both` / `planned` (dashed ghost) / `rest`), readiness pip, caption;
  click selects → drives the Today card. Footer summary stats.
- **TodayCard** — session head + verdict pill; **ReadTile** ×3 (source-colored
  envelope cards); **LiftTable** (exercise / top set / RPE / est 1RM + delta).
- **TrendsStrip** — **TrendBlock** (head + value + change + sparkline) reused per
  metric; **ColdStartPanel** (progress bar + message + CTA) for lift progression.
- **Sparkline** — inline SVG, area + line + endpoint dot, source-colored.

Everything is inline CSS variables + a little vanilla JS (node injection,
selection wiring, SVG sparks) — no frameworks, no external assets; opens by
double-click. Translates 1:1 to the planned Tailwind tokens + Recharts.
