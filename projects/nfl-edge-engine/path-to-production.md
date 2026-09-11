# NFL Edge Engine — $0 Path to Production

**Question answered:** What is the lowest-cost path to running NFL Edge in production —
ideally $0/month?

**Answer:** $0/month is achievable for the whole stack. But the constraint that decides
the architecture is **not hosting — it's odds data**. Compute, database, LLM inference,
weather, news and chat delivery are all genuinely free at this scale. The odds feed is
not, and its free tier is roughly **4× smaller than the snapshot cadence the README
asks for**. Everything below follows from that one fact.

---

## 1. The binding constraint, quantified

The Odds API free tier gives **500 credits/month**, and a credit is not a request:

```
live_odds_cost      = n_markets × n_regions
historical_odds_cost = 10 × n_markets × n_regions
```

The service is currently configured (per README) for regions `us,us2` and markets
`h2h, spreads, totals` → **2 × 3 = 6 credits per call** → **83 calls/month total.**

The README's suggested cadence (Tue–Thu 4h, Fri–Sat 2h, Sunday 30 min, 15 min in the
final hour before each kickoff) is roughly **86 calls/week ≈ 370/month ≈ 2,200 credits**
against a 500-credit budget. **~4.4× over.** As configured, the free tier funds about
five days of operation per month.

Also capped: **10 requests/minute**, **2,500 objects/month**, odds refresh every 10 min.

---

## 2. Lever one: cut the cost per call from 6 credits to 2

This is free budget, recovered by not paying for data the model doesn't use.

| Change | Rationale | Effect |
|---|---|---|
| Drop the `us2` region | `us` already covers DraftKings, FanDuel, BetMGM, Caesars — enough for a de-vig consensus and a sharp-vs-soft read | 2 regions → 1 |
| Drop the `totals` market | The README's own *Known gaps* says **"Totals are captured and stored but not yet modelled."** You are spending a third of your credits on a column nothing reads | 3 markets → 2 |

**6 credits/call → 2 credits/call → 250 calls/month.** A 3× budget increase for a
config edit. Make both env-driven (`ODDS_REGIONS`, `ODDS_MARKETS`) so you can dial them
back up the day you start paying, and re-enable `totals` the day the totals model lands.

---

## 3. Lever two: spend the 250 calls where CLV is actually made

The README is right that *"a snapshot taken inside the final hour is what you grade CLV
against."* So concentrate credits at T-minus-30 and T-minus-10 on each kickoff window,
and go sparse the rest of the week. Proposed allocation:

| Window | Cadence | Calls/wk |
|---|---|---|
| Tue–Wed | 1×/day | 2 |
| Thu daytime | 1× | 1 |
| Thu pre-TNF | T-60 / T-30 / T-10 | 3 |
| Fri, Sat | 2×/day | 4 |
| Sun 06:00–11:00 ET | every 90 min | 4 |
| Sun pre-1pm slate | T-60 / T-30 / T-10 | 3 |
| Sun pre-4pm slate | T-30 / T-10 | 2 |
| Sun pre-SNF | T-30 / T-10 | 2 |
| Mon pre-MNF | T-30 / T-10 | 2 |
| Post-game settlement pulls | 2× | 2 |
| **Total** | | **~25/wk** |

≈ **108 calls/month × 2 credits = ~216 credits.** Comfortably inside 500, leaving ~280
credits of headroom — which you will need, because **debugging burns credits**. Wire up
a hard reserve (§6) so a retry loop can't eat the month.

---

## 4. The real price of $0: you cannot buy history

At the reduced config, historical odds still cost `10 × 2 × 1 = 20 credits/call` → **25
historical pulls per month, total.** Backtesting a model against purchased line history
is simply off the table at $0.

This means **the append-only `OddsSnapshot` table is your only historical dataset** —
exactly as `prisma/schema.prisma` already claims in its comment. The implication is
strategic and worth stating plainly:

> **The $0 path is paid for in time, not money.** You must run the capture cron for a
> full season before you own a dataset you can backtest book-level line movement against.

**The free workaround for model development:** [nflverse/nfldata](https://github.com/nflverse/nfldata)
(Lee Sharpe's `games.csv`) is free, public, and carries `spread_line`, `total_line` and
moneylines back to 1999 alongside final scores. That is enough to build and validate
**power ratings, `projectMargin()`, key-number/push handling, and CLV methodology**
immediately — no odds credits spent. What it does *not* give you is per-book granularity
or intra-week line movement, so it cannot validate the sharp/steam logic in
`agent2-sharp.service.ts`. Use it for the model, use your own snapshots for the market
microstructure.

Concretely: add `scripts/backfill-nflverse.ts` to seed `Game` rows and closing lines
from that CSV. It's the highest-leverage thing you can build this week.

---

## 5. The $0 stack

| Layer | Choice | Free allowance | Watch out for |
|---|---|---|---|
| **Odds** | The Odds API free | 500 credits/mo, 10 req/min, 2,500 objects/mo | The binding constraint. Reconfigure to 2 credits/call |
| **Backtest data** | nflverse `games.csv` | unlimited, public | Closing lines only, no per-book detail |
| **Database** | Neon free Postgres | 0.5 GB, 100 compute-hr/mo, autosuspend at 5 min idle | A full season of snapshots is tens of MB — storage is a non-issue |
| **Compute** | Render free web service | 512 MB, 0.1 CPU | Spins down after 15 min idle; 30–60s cold start |
| **Cron** | cron-job.org | 1-minute granularity, unlimited jobs | Community-run, no SLA |
| **LLM** | Gemini free tier (AI Studio) | Flash 10 RPM / 250 RPD; Flash-Lite 15 RPM / 1,000 RPD | Free-tier inputs may be used for model training unless billing is enabled |
| **Weather** | Open-Meteo | No API key, no signup, <10k calls/day | **Non-commercial use only**; CC-BY attribution required |
| **News** | ESPN public endpoints | free | Unofficial — can break without notice |
| **Prediction market** | Polymarket public API | free | — |
| **Chat delivery** | Discord webhooks | free | See the cold-start problem below |
| **Repo/CI** | GitHub Actions | public: unlimited; private: 2,000 min/mo | See why it is *not* the cron, below |

**Total: $0/month.**

---

## 6. Four decisions that matter

### Do NOT use GitHub Actions as the snapshot cron
Two disqualifiers, either fatal on its own:
1. **Scheduled workflows do not fire on private repos on the GitHub Free plan.** And you
   do not want this repo public — it contains your edge.
2. **Cron drift of 10–30 minutes is common, and over an hour at peak.** The single
   snapshot that defines your CLV benchmark is the T-10-minutes-before-kickoff pull. A
   30-minute drift lands it *after kickoff* and destroys the exact number you grade
   against.

(Also: GitHub auto-disables scheduled workflows after 60 days without commit activity.)

Use **cron-job.org** for the kickoff-critical pulls — 1-minute granularity, free. Keep
GitHub Actions for CI only.

### The Discord cold-start problem
Render free spins down after 15 minutes idle with a 30–60s cold start. Discord requires
a response to an interaction within **3 seconds**. Slash commands will therefore fail
against a cold instance.

Two $0 fixes, in order of preference:
- **Webhook-only delivery.** Push briefs outbound to a channel via the existing
  `discord-webhook.service.ts`; defer the interactive `discord-slash.service.ts` path.
  Costs you nothing and removes the problem entirely.
- **Cloudflare Worker as ACK proxy.** The Worker verifies the nacl signature, returns a
  `DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE` (type 5) instantly, then relays to Render and
  edits the response when it answers. Preserves interactivity. Note the known Workers
  gotcha: post-response async work needs `ctx.waitUntil()` or it is cancelled.

The cold start is harmless for `POST /snapshots/capture` — cron-job.org just waits.

### Neon autosuspend + Prisma
Use Neon's **pooled** connection string with `?pgbouncer=true&connect_timeout=15` for the
app, and set `DIRECT_URL` to the unpooled string for migrations. Budget check: ~25
snapshot wakes/week × 5-minute minimum billing ≈ **7 compute-hours/month** against a
100-hour allowance. Fine.

### Open-Meteo is non-commercial only
Free tier is explicitly non-commercial and requires CC-BY attribution. Personal use is
fine. The moment this becomes a paid product, it's $29/mo — or swap the provider.

---

## 7. Code changes required in `nfl_edge`

| File | Change |
|---|---|
| `src/odds/odds.service.ts` | Make regions/markets env-driven; default to `us` + `h2h,spreads`. **Read the `x-requests-remaining` / `x-requests-used` response headers, log them, and hard-stop below a configured reserve.** This is the single most important $0 safety feature — it stops a retry loop from eating the month |
| `src/weather/weather.service.ts` | Swap to Open-Meteo; delete the weather API key env entirely |
| `src/lib/llm.ts` | Point the `openai` SDK `baseURL` at Gemini's OpenAI-compatible endpoint; default to a Flash-Lite model for the 1,000 RPD tier; add an RPM throttle to respect 10–15 RPM |
| `scripts/backfill-nflverse.ts` | **New.** Seed `Game` + historical closing lines from nflverse for backtesting |
| `src/app.controller.ts` | Surface remaining odds credits on the health check |
| `prisma` config | Pooled `DATABASE_URL` + unpooled `DIRECT_URL` |

**LLM budget check:** the swarm runs 4 agents × ~16 games = ~64 calls per full slate.
Against Flash-Lite's 1,000 requests/day that's ~15 full slate runs per day. Not a
constraint. The 15 RPM ceiling is the real limit — ~4.5 minutes per slate — and
`SwarmService` already iterates games sequentially, which naturally throttles.

---

## 8. Deploy runbook

1. **Neon** — create project, copy pooled + direct connection strings.
2. **The Odds API** — free key. Set `ODDS_REGIONS=us`, `ODDS_MARKETS=h2h,spreads`.
3. **Google AI Studio** — free Gemini key; point `lib/llm.ts` at the OpenAI-compatible endpoint.
4. **Discord** — create the channel webhook; skip bot/slash registration on day one.
5. **Render** — connect repo, deploy as a free web service, set env vars, generate a strong `SWARM_API_KEY`.
6. `npx prisma migrate deploy` against `DIRECT_URL`.
7. `scripts/backfill-nflverse.ts` — seed history, build and validate ratings offline.
8. **cron-job.org** — create jobs per §3 hitting `POST /snapshots/capture` with the `x-api-key` header. Start with the kickoff-critical ones only.
9. Watch `x-requests-remaining` for one full week before widening the cadence.

---

## 9. When to spend the first dollar

Spend it on **odds credits, not hosting.** Data is the constraint; compute is not. A
paid odds tier (~$30/mo for ~20k credits) buys back the full README cadence, the `us2`
region, totals, and enough historical pulls to backtest properly — all of which
materially improve the model. By contrast, $7 on Render buys you… no cold start on a
service that is idle 95% of the time.

**Priority order:** ① odds credits → ② Render paid or a $4–5 VPS (only once slash
commands matter) → ③ a bigger database (you will not need this for years).

---

## 10. One-line answer

Run it for **$0** on Neon + Render + cron-job.org + Gemini free + Open-Meteo — but first
cut the odds config from 6 credits/call to 2 and concentrate every snapshot on the final
hour before kickoff, because the free odds tier funds roughly a quarter of the cadence
the README assumes. The genuine cost of $0 isn't reliability — it's that **you must
collect a season of your own snapshots before you can backtest**, so seed the model from
free nflverse history in the meantime.

---

### Sources
- [The Odds API free tier: 500 credits is not 500 requests](https://oddspapi.io/blog/the-odds-api-free-tier-limits/) · [Odds API pricing comparison 2026](https://oddspapi.io/blog/odds-api-pricing-2026-comparison/)
- [Neon plans](https://neon.com/docs/introduction/plans) · [Neon free-tier limits](https://www.freetiers.com/directory/neon)
- [Render free tier 2026](https://agentdeals.dev/vendor/render) · [Platforms with a real free tier](https://render.com/articles/platforms-with-a-real-free-tier-for-developers-in-2026)
- [cron-job.org](https://cron-job.org/en/) · [FAQ](https://cron-job.org/en/faq/) · [External cron services compared 2026](https://dev.to/ronency/best-external-cron-job-services-compared-2026-8a3)
- [GitHub Actions cron on free private repos](https://devactivity.com/insights/github-actions-cron-schedules-a-hidden-free-tier-hurdle-impacting-developer-productivity/) · [scheduled workflow discussion](https://github.com/orgs/community/discussions/202602)
- [Gemini API free tier limits 2026](https://yingtu.ai/en/blog/gemini-api-free-tier) · [Google AI Studio free tier](https://turion.ai/blog/google-ai-studio-2026-features-guide/)
- [Open-Meteo terms](https://open-meteo.com/en/terms) · [Open-Meteo](https://open-meteo.com/)
- [nflverse/nfldata (Lee Sharpe)](https://github.com/nflverse/nfldata) · [DATASETS.md](https://github.com/nflverse/nfldata/blob/master/DATASETS.md)
- [Discord deferred interactions on Cloudflare Workers](https://github.com/discord/cloudflare-sample-app/issues/30) · [Hosting a Discord app on Workers](https://docs.discord.com/developers/tutorials/hosting-on-cloudflare-workers)
