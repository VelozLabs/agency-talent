# Mid Tier Legends — Video Splicing Pipeline

**Recommendation in one sentence:** Use Path B (a single `yt-dlp | ffmpeg` bash command with manual crop offset) for Phase 1, finishing every clip in CapCut mobile — it costs nothing, takes ~5 minutes per clip, and defers the OpenCV rabbit hole until you actually have volume.

---

## 1. Recommended pipeline

| Path | Setup time | Per-clip time | Quality | Cost | Verdict |
|---|---|---|---|---|---|
| (A) All-manual CapCut | 0 min | 8–12 min | Good | $0 | Fine, but you re-do the same crop math every clip and waste time scrubbing in a touch UI |
| **(B) Bash + ffmpeg, finish in CapCut** | **20 min** | **4–6 min** | **Good** | **$0** | **Pick this** |
| (C) Python + OpenCV tracker | 1–2 days + tuning | 3 min + babysit | Variable (trackers drift on cuts) | $0 | Premature for 1 clip / 2 days |
| (D) Klap / Opus / Submagic | 5 min signup | ~2 min | Mediocre auto-crop, watermarks on free tier | $20–70/mo | Skip until you've validated the format |

Path B gives you a deterministic, repeatable trim+crop in 30 seconds of compute, then you do the *creative* work (caption, music, hook frame) in CapCut where touch UI actually helps. (C) is the right answer at scale; it's the wrong answer at 3 clips/week.

## 2. The command

See [`clip.sh`](./clip.sh). Usage: `bash clip.sh <URL> <START> <END> <CROP_X>`.

Key points:
- `--force-keyframes-at-cuts` makes the trim frame-accurate
- `crf 18 + preset slow` keeps quality high so CapCut's re-encode doesn't compound mush
- `608:1080` is the exact 9:16 window from a 1080p frame; for 720p source swap to `crop=405:720` (the scale step still lands you at 1080×1920)
- `-an` drops audio (you're replacing it anyway)

## 3. Dual-master export

**One ffmpeg pass, two CapCut projects.** The bash script outputs a single clean 9:16 master with no captions and no audio. From there:

- **TikTok master**: import to CapCut, add caption (auto-caption + manual fix), add music from TikTok's in-app library *after upload*, not in CapCut — this keeps the licensed-music flag clean. Export 1080×1920, "Recommended" quality.
- **Reels master**: duplicate the CapCut project, *remove* the burned caption (use Reels' native caption sticker so you can edit later, and to avoid the "this looks like reposted TikTok" downranking), export. Add music inside Reels using IG's audio library.

Do **not** add captions in the bash/ffmpeg layer — captions are platform-specific and you'll re-edit them often. Bake nothing you can't easily change.

## 4. Crop control

Go with **(a) per-clip manual `CROP_X` offset, eyeballed from a thumbnail**. Workflow:

1. After yt-dlp grabs `src.mp4`, run `ffmpeg -ss 00:00:02 -i src.mp4 -frames:v 1 preview.jpg` to dump a frame.
2. Open preview.jpg, eyeball where the player is horizontally (left/center/right).
3. For 1080p source: left = `CROP_X=0`, center = `236`, right = `472`. Three presets cover 90% of cases.
4. For tricky clips (corner three, off-ball cut), pick a number between.

This is 15 seconds of decision per clip and zero engineering. Preset crops (b) is what you'll naturally evolve into after 20 clips. OpenCV tracking (c) is overkill until you're cutting multi-action sequences where the camera follows the ball across the floor — and even then, broadcast cameras already do that work for you, so the dominant-motion tracker often just adds jitter.

## 5. Phase upgrade path

- **v1 (this week, Phase 1, ~3 clips/week)**: the bash script + CapCut mobile. Total tooling: yt-dlp, ffmpeg, CapCut. Don't touch Python.
- **v2 trigger**: when you cross **~7 clips/week** *and* you've found 2+ recurring crop patterns (e.g. "baseline corner three" always needs `CROP_X=550`, "top-of-key handoff" always needs `300`). Then add a `--preset baseline-corner` flag to the script. Still no Python.
- **v3 trigger (probably never for this account)**: when you're producing 3+ clips/day and a single clip needs *intra-clip* pan (camera follows a fast break across the floor), then write the OpenCV CSRT tracker. Budget two days. Until then, cut around camera moves at the editing layer.

## 6. Gotchas

1. **Age-restricted / member-only videos** break yt-dlp without cookies. Fix: `yt-dlp --cookies-from-browser chrome` once it happens, don't pre-solve it.
2. **`-c copy` for trimming is faster but not frame-accurate** — you'll get clips that start 1.5s late on the wrong keyframe. Always re-encode for the trim, as the script does.
3. **CapCut's "Auto" export downrezzes to 720p** silently on mobile. Always pick 1080p, 30fps, "Recommended" or higher in export settings.
4. **TikTok adds black bars if your aspect isn't *exactly* 1080×1920**. Don't trust ffmpeg's `scale` to land integers — the explicit `1080:1920` in the script is load-bearing. Don't change it.
5. **YouTube source frame rate varies** (24, 30, 60). Mixing 60fps source into a 30fps timeline in CapCut can cause judder. Add `-r 30` to the ffmpeg line if you notice motion stutter.
6. **`yt-dlp` itself rots monthly.** Run `yt-dlp -U` weekly or you'll lose an hour to a "Sign in to confirm you're not a bot" error that's actually just a stale binary.
