# Mid Tier Legends — Agency Roundtable

13 talents from the bench. Highest-signal critiques only — agreeable nods removed.

---

**TikTok Strategist** — Two things wrong out of the gate. First, "He was him" is the *payoff*, not the *hook* — under the 3-second rule the hook is the audio drop landing on a freeze-frame of the player's face. Caption is reveal, not opener. Second, your platform priority is wrong for the 35–50 male demo. They live on Reels more than TikTok now. TikTok-first is correct for the *algorithm lab* (faster signal, looser music rights), but treat Reels as the wallet from day one, not "bonus."

**Short-Video Editing Coach** — 15–30s is a useless range; pick 18–22s for v1 and only deviate when the play demands it. Your spec says "hook-aligned to the play's peak moment" but that's two opposite edits: (a) audio drop = play peak (synchronous), or (b) audio builds across the play and drops on the freeze (delayed gratification). Pick one as the house style. I'd pick (b) — it earns rewatches, which is the metric that actually compounds.

**Cultural Intelligence Strategist** — The comedic engine is white role player + Black hip-hop track, and the opening 20 is heavily weighted that way (Garrity, Szczerbiak, Madsen, Cardinal, Bonner, Voskuhl, Pollard, Piatkowski, McCarty all white). That *is* the joke, but if your first 2 weeks are exclusively that pairing, the "reverent never mocking" frame slips into something readers will name in the comments. Salt the rotation: lead with **Eric Snow / "Get Ur Freak On"** (a genuinely respected role player on a contender), not Garrity. Earn the white-guy pairings by establishing the format is about *role-player reverence* first, racial juxtaposition second.

**Brand Guardian** — You don't have a visual identity. CapCut defaults are how copycats catch you in week 3. Lock these *before* post #1: lower-third treatment, induction-number badge, a one-color palette that says "2003 NBA on TNT," a single typeface (recommend something approximating the early-2000s NBC/TNT chyron). The risk register correctly says copycats appear within weeks; the defense isn't just "voice" — it's that they can't fake the chrome.

**Narrative Designer** — The spec treats every post as standalone. Mid Tier Legends should be a **universe**. Number every induction (`Inductee #017: Othella Harrington`). Reference past inductees in new captions ("first to enter the Hall since #013"). Build a recurring "ceremony" — a rafter, a banner, a hall. Copycats can copy the format; they can't copy 200 inductions of accumulated lore. This is your moat and you're not even pricing it in.

**Legal/Compliance Checker** — You're underweighting music risk. TikTok's licensed library is fine for organic posts on a personal account, but the moment you join Creator Rewards or run a single brand deal, you're "commercial use" and a chunk of your inventory goes dark. Pre-flight every track for commercial clearance status, not just availability. Specific watch-outs: **Big Pimpin'** has a long sample-clearance lawsuit history (Khosara Khosara), **California Love** uses Joe Cocker's "Woman to Woman" sample with messy clearance on UGC, **Forgot About Dre** is fine but the Eminem verse triggers Universal's stricter geo-rules. Build a `clearance_status` column into your tracker before post #1, not after a strike.

**Reality Checker** — Your 30-day success bar is too generous. A format with this much identifiable hook should get a *signal* in the first 3 posts. If posts 1–3 don't clear ~10K each on a fresh account, something is broken in the edit, not the format. Tighten the kill criteria: re-evaluate at day 6, not day 30. Also: "3+ comments per post on average" — meaningless without a comment-quality bar. 3 "lol" comments ≠ engagement. Track named-player drops in comments as the actual signal ("you have to do Felton Spencer next" = format is working).

**Growth Hacker** — 20 starting candidates is too thin to bench duds. Get to 40 before launch so you can drop the first 3 that don't land without panicking. Also: you're planning format variants for **month 3**. The TikTok algorithm wants format diversity inside the first 60 days or it pigeonholes the account. Plan and shoot the "Playoff Cameo" and "Garbage Time Heroes" variants in week 4, not week 12.

**Instagram Curator** — Co-signing the TikTok Strategist. For 35–50 men, IG Reels reach is materially higher per-post than TikTok right now. Cross-posting is not enough — Reels rewards *native* aspect-ratio uploads and penalizes the visible TikTok watermark. Build the export pipeline to produce two masters: TikTok-first (with caption baked in) and IG-first (caption as comment, no watermark).

**Paid Media Creative Strategist** — Not your problem yet, but: when the first NOVIG / Homage DM lands at week 6, you'll have nothing to send back. Mock up two "branded variant" examples now (one supered with a sportsbook line, one with a throwback jersey end-card). 30 minutes of work, removes a week of latency when the inbound hits.

**Sales Deal Strategist** — Two corrections to the monetization plan. (1) Don't wait until 25K to add a link — add Beacons at 10K. The first brand inbound is also the *test* of whether your audience clicks anywhere, and you need a destination that isn't your personal email. (2) Your monetization order is backwards. Whatnot card auctions in this exact niche run absurd CPAs ($8–15 per signup) and they *want* this audience. Lead with Whatnot affiliate at month 4, not "possible Whatnot partnership" at the bottom of the list. Creator Rewards is a rounding error; ignore it.

**Engineering Rapid Prototyper** — The yt-dlp + ffmpeg script is straightforward, but 9:16 cropping a broadcast 16:9 source kills 60%+ of the frame. Center-crop works for half of basketball footage and ruins the other half (anything happening in the corners — a Garrity bench reaction, an off-ball cut). Don't ship v1 with a fixed center crop. Either (a) per-clip manual `--crop-x` offset, or (b) cheap motion-tracking via OpenCV CSRT tracker bound to the dominant moving object. (b) is a half-day of work and pays for itself by clip #20.

**Recruitment Specialist** *(coloring outside the lines)* — Phase 3 has one human doing footage sourcing + clip ID + editing + posting + analytics across three platforms at 1–2 clips/day. That's a burnout glide path of ~6 weeks. Budget for a part-time editor (Upwork, $20–30/hr, 10 hrs/week) at month 2, not month 6. Founders who don't delegate the edit at the right moment are why 80% of accounts in this lane die at 40K followers.

---

## Synthesized punch list — concrete spec changes

1. **Reorder opening posts.** Lead with Eric Snow, not Pat Garrity. Salt the rotation racially across the first 14 posts so the format reads as "role-player reverence" before "racial juxtaposition."
2. **Lock visual identity before post #1.** Induction-number badge, era-correct chyron typeface, one-color palette. Watermark in the same corner every time.
3. **Adopt induction-number lore from day 1.** `Inductee #001: Eric Snow.` Reference past inductees in new captions by week 3.
4. **Pick one edit grammar:** audio builds across the play, drops on the freeze. 18–22 second target length.
5. **Reframe the hook.** First 3 seconds = freeze on player face + audio drop. Caption is the *reveal*, not the *opener*.
6. **Platform priority: TikTok and Reels equal-weighted from day 1.** Two export masters per clip. TikTok = lab, Reels = wallet.
7. **Tighten kill criteria.** Re-evaluate at day 6 (3 posts in), not day 30. <10K avg = something's broken in the edit.
8. **Track comment quality, not count.** Named-player drops are the validation signal.
9. **Ship format variants in week 4**, not month 3 ("Playoff Cameo," "Garbage Time Heroes").
10. **Add a `clearance_status` column to the tracker.** Pre-flight Big Pimpin', California Love, and Forgot About Dre for commercial-use status before they go in queue.
11. **Add Beacons at 10K, not 25K.** Lead monetization with Whatnot affiliate, not Creator Rewards.
12. **In the yt-dlp/ffmpeg script v1, build per-clip crop offset** (or OpenCV CSRT motion tracking). No fixed center crop.
13. **Pre-build two branded-variant mockups** (sportsbook super, jersey end-card) before week 6.
14. **Grow the candidate library to 40** before launch.
15. **Budget a part-time editor at month 2.**
16. **Lead audio strategy with the open-lane tracks.** First 7 posts pull from {Area Codes, Hot Boyz, Get Ur Freak On, Ante Up, Regulate, Shimmy Shimmy Ya, Country Grammar}. Bench *In Da Club* / *Big Pimpin'* / *California Love* until week 4+.
17. **Reels primary, TikTok as lab.** Confirmed by competitive landscape, not just demo intuition.
18. **Grow library to 40–60 before launch.** Co-signed by competitive scan (depth = pace defense vs clones).
19. **Lock handles across all 3 platforms today.** `@midtierlegends` on TikTok, IG, YouTube, X — even if you don't post on X, you don't want a clone account squatting.
20. **Consider a trademark filing** on "He was him" + "Mid Tier Legends" wordmarks. ~$250 USPTO filing, real moat against the clone wave when (not if) it comes.

The format is good. The biggest unaddressed risks in the spec are the racial-read of the opening rotation, the absence of a visual identity, and the lack of lore continuity — those three together are also the only defensible moat against the copycats the risk register correctly predicts.
