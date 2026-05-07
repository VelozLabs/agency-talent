# Mid Tier Legends — Build Spec

## Concept

A short-form video account celebrating forgotten role players from the late 90s / 2000s NBA (and eventually MLB, NFL) by pairing their highlights with era-perfect hip-hop tracks that feel disproportionately glorious for the subject. The comedy and nostalgia live in the gap between the song's grandeur and the player's actual stature.

**Format template:**

- Caption: `[Player Name] / He was him.`
- Visual: 15–30 second highlight clip
- Audio: era-matched hip-hop track, hook-aligned to the play's peak moment
- Brand voice: reverent, never mocking. The player is a legend in this universe.

**Why this works:** affectionate irony hits harder than earnest celebration, and the target demo (men 35–50, NBA-on-NBC nostalgia, current disposable income) is underserved on TikTok.

## Target audience

- Primary: US men, age 35–50, grew up on late-90s/early-2000s NBA
- Secondary: hip-hop heads of the same era who appreciate the audio curation
- Platform priority: TikTok first, Reels second, Shorts third

## Tooling stack

- **Footage sourcing:** YouTube highlight reels of full games, archived broadcasts. Use `yt-dlp` to pull, `ffmpeg` to clip.
- **Clip identification:** manual scrubbing for Phase 1 (taste matters more than volume). Add Whisper + Claude moment detection in Phase 2 once format is validated.
- **Editing:** CapCut (free, mobile + desktop, native TikTok integration)
- **Audio:** TikTok's licensed library first; fall back to original-audio uploads for tracks not cleared
- **Thumbnail/cover frame:** ffmpeg frame extraction; light retouching in Photopea (free)
- **Scheduling:** Metricool or Later free tier; manual posting acceptable at low volume
- **Analytics tracking:** Google Sheet, manually logged after each post for first 30 days

## Posting cadence

- **Phase 1 (weeks 1–2):** 1 clip every other day. Goal: validate format, not chase volume.
- **Phase 2 (weeks 3–6):** 1 clip per day. Goal: establish posting rhythm, build content backlog.
- **Phase 3 (weeks 7–12):** 1–2 clips per day across TikTok + Reels + Shorts. Goal: compound.

## Starting clip library (first 20 candidates, NBA)

| # | Player | Track | Notes |
|---|---|---|---|
| 1 | Pat Garrity | Area Codes — Ludacris | Lead post. Strongest gut pick. |
| 2 | Wally Szczerbiak | Hot Boyz — Missy Elliott | |
| 3 | Eric Snow | Get Ur Freak On — Missy Elliott | |
| 4 | Voshon Lenard | Ms. Jackson — OutKast | |
| 5 | Bobby Sura | Big Pimpin' — Jay-Z | |
| 6 | Mark Madsen | In Da Club — 50 Cent | Madsen dancing footage is gold. |
| 7 | Brian Cardinal | Still D.R.E. — Dr. Dre | |
| 8 | Adam Morrison | Mo Money Mo Problems — Biggie | |
| 9 | Matt Bonner | Ridin' — Chamillionaire | |
| 10 | Jake Voskuhl | X Gon' Give It To Ya — DMX | |
| 11 | Scot Pollard | Ante Up — M.O.P. | |
| 12 | Eric Piatkowski | Regulate — Warren G | |
| 13 | Calbert Cheaney | Country Grammar — Nelly | |
| 14 | Walter McCarty | Shimmy Shimmy Ya — ODB | |
| 15 | Anthony Peeler | California Love — 2Pac | |
| 16 | Bryon Russell | Forgot About Dre — Dr. Dre | "Presence of a god" drop is the joke. |
| 17 | Othella Harrington | Big Poppa — Biggie | |
| 18 | Jumaine Jones | Get Low — Lil Jon | |
| 19 | Damon Jones | Ice Cream Paint Job — Dorrough | |
| 20 | Jerome Williams | Who Let The Dogs Out | Save for later — too on-the-nose. |

## Account setup

- **Handle priority:** `@midtierlegends`, fallback `@midtierlegendsNBA`, `@certifiedmidtier`, `@midtierhq`
- **Profile pic:** faded action shot of an early-2000s role player in original jersey
- **Bio:** `Forgotten role players. Era-correct soundtracks. He was him.`
- **Link:** none for Phase 1. Add Beacons or direct sponsor link only after 25K followers.

## Phase 1 success criteria (first 30 days)

- 15 posts published
- At least 1 post above 50K views (format validation signal)
- At least 1 post above 200K views (viral capability signal)
- Follower count above 2,500
- 3+ comments per post on average (engagement signal stronger than views)

If 0 posts clear 50K views in 30 days, the format isn't landing — pivot the audio era, the caption, or the player tier before continuing.

## Phase 2 success criteria (days 31–90)

- 10K+ followers
- Consistent 20K+ avg views per post
- 1+ post above 500K views
- First inbound brand inquiry (sports betting, throwback apparel, or sports memorabilia brands)

## Risk register

- **Music licensing on Reels/Shorts:** older hip-hop has spottier coverage than TikTok. Plan TikTok-primary, treat other platforms as bonus.
- **DMCA on footage:** old NBA clips are low-risk but not zero. Don't use full-game footage. 15–30 second clips only, ideally from already-public highlight compilations.
- **Format fatigue:** if every post follows the same template, the algorithm may deprioritize. Plan format variations by month 3 (e.g., "Mid Tier Legends: The Playoff Cameo," "Mid Tier Legends: Garbage Time Heroes").
- **Saturation risk:** if the format works, copycats appear within weeks. Defense is voice and curation taste, not exclusivity.

## Monetization path

1. **Months 1–3:** zero monetization. Build audience, validate format.
2. **Months 4–6:** TikTok Creator Rewards (low yield), affiliate links for throwback jerseys / Fanatics, possible Whatnot partnership for sports card/jersey auctions.
3. **Months 7–12:** direct brand sponsorship. Best-fit partners: NOVIG (sports betting prediction market), Homage (throwback apparel), DraftKings/FanDuel (if compliant), throwback card brands like Topps/Panini.
4. **Year 2:** spinoff accounts (`@midtierlegendsMLB`, `@midtierlegendsNFL`). Same template, different sport.

## Open questions for Claude Code to help with

- Build a Python script using `yt-dlp` + `ffmpeg` that takes a YouTube URL + start/end timestamps and outputs a TikTok-ready 9:16 clip with safe-area cropping.
- Build a simple SQLite + CLI tool to track the clip library: player, track, source URL, timestamps, post date, platform, view counts. Daily refresh of view counts via TikTok scraping or manual entry.
- Build a Whisper + Claude pipeline (Phase 2) that ingests broadcast audio and surfaces moments where a target role-player makes a notable play, with timestamps.

---

**One-line pitch:** Mid Tier Legends turns forgotten role players into accidental icons by pairing their highlights with era-correct hip-hop, targeting the underserved 35–50 male demo with affectionate irony as the engine.
