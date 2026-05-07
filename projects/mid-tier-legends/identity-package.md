# Mid Tier Legends — Brand Identity Package

*Synthesized from a 6-talent ideation room: Brand Guardian, Visual Storyteller, UI Designer, Image Prompt Engineer, Whimsy Injector, Content Creator. Brand Guardian signed off. Ship-ready.*

---

## 1. Brand position — the feeling

The viewer should feel like they've stumbled into a **wood-paneled Hall of Fame in a parallel universe where Eric Snow has a bronze bust and the gift shop sells his replica jersey.** Reverence, not irony. The visual identity sells the bit by refusing to wink. This is a real institution for players the official one forgot — and the institution has been here since 1998, you just never got the membership card.

Tonal anchor for every later decision: **museum-grade ceremony for guys who averaged 6.4 a game.** If a choice doesn't reinforce that, kill it.

---

## 2. Logo system

### Three directions

**Direction A — The Chyron**
Stacked wordmark in the exact treatment of the NBA on NBC '94–'02 lower-third name plates: condensed sans, slight italic lean, white-on-navy with a thin gold rule beneath. "MID TIER" stacked over "LEGENDS" with the gold rule between. Reads instantly as broadcast artifact.

**Direction B — The Shield**
Roc-A-Fella / Ruff Ryders shield logic: a heraldic crest with "MTL" monogrammed center, a basketball where the family seal would go, "EST. NONE OF YOUR BUSINESS" on the banner. Maximalist, hip-hop album art codes.

**Direction C — The Banner in the Rafters**
A literal rafters banner — the kind retired-jersey banner you see in the United Center catwalk — with "MID TIER LEGENDS" embroidered, hanging at a slight 3D angle, dust and arena-light haze on it.

### Recommendation: **Direction A (The Chyron) as primary, Direction C as a recurring world-building mark.**

*Why:* The Chyron does the heaviest brand work because it's the era signature most viewers can't name but instantly recognize — it's the unconscious nostalgia trigger. The Banner becomes the recurring "ceremony" device inside videos (see Whimsy section). Direction B was tempting but UI Designer flagged it: a shield reads as merch, not as broadcast. Brand Guardian killed it for primary; we'll borrow its texture vocabulary for the inductee badge.

### Primary wordmark — spec

- Two lines, stacked, flush-left to a single optical axis.
- Line 1: **MID TIER** — condensed sans, ~92% horizontal scale, 4-degree italic lean, tracking +20.
- Line 2: **LEGENDS** — same face, set ~115% the cap height of Line 1 so it reads as the dominant word.
- 1.5pt gold rule between the lines, full width of LEGENDS.
- Color: off-white (#EDE6D3) on broadcast navy (#0E1B3A). Gold rule (#B4894A).
- Subtle 1-pixel chromatic offset on the wordmark (cyan/red split, ~1px each direction) to mimic CRT broadcast bleed. Dial it down to 30% so it reads as texture, not effect.

### Secondary mark — the 40×40 monogram

**MTL** in the same condensed face, set as a tight ligature inside a navy rounded square (8px corner radius at 40×40). Gold underline rule sits beneath the monogram. At 40×40 the underline is a single pixel; at 1080×1080 it's 14px. That's the recognition hook at thumbnail scale.

### Inductee badge system

A vertical badge, 4:5 aspect at full size, that anchors every post. **Grid: 1080×1350, 60px outer margin.**

Content slots, top to bottom:
1. **Header bar** (90px tall): "HALL OF MID TIER LEGENDS" in 22pt condensed caps, gold on navy, centered.
2. **Inductee number** (200px tall): "INDUCTEE #001" — number set huge in a slab numeral face, gold, with a thin rule beneath.
3. **Player portrait window** (700px tall): the faded action still, treated (see color/treatment specs).
4. **Name plate** (140px tall): the player name in the wordmark face, off-white on navy, italic lean matching the logo.
5. **Closer rule** (60px tall): "HE WAS HIM." in 28pt caps, gold, letter-spaced +80.

When the badge collapses to corner-mark scale (used in Reels overlays), it reduces to **just the inductee number block** — "INDUCTEE #001" with the gold rule — sized at ~280×120px, bottom-left, 80px from edge. That number is the lore moat. By Inductee #047 it's a flex.

---

## 3. Color palette

Built from a freeze-frame of a 1998 TNT broadcast, not a Figma swatch library.

| Role | Name | Hex | Used for |
|---|---|---|---|
| Primary | Broadcast Navy | **#0E1B3A** | Badge background, lower-third bed, profile pic field |
| Primary | Bone | **#EDE6D3** | All primary type, wordmark, name plates |
| Accent | Trophy Gold | **#B4894A** | Rules, inductee numbers, "He was him." closer, banner embroidery |
| Secondary | Sepia Wash | **#7A5A3C** | Hardwood Classics photo treatment overlay |
| Secondary | Hardwood Brown | **#3A2418** | Deep shadows, Hall interior establishing shots |
| Neutral | CRT Black | **#0A0A0F** | True black (almost) for broadcast cuts |
| Neutral | Court Cream | **#D9C9A3** | Tertiary surfaces, banner field highlights |

**Note from the room:** Visual Storyteller pushed for a brighter NBC-peacock red accent. Brand Guardian killed it — the era anchor is *desaturated late-game broadcast*, not opening-graphics-package saturation. The gold does all the punch work. Red shows up exactly once, in the lower-third sweep animation (see §5), and never as a fill.

---

## 4. Typography

**Display: Druk Wide Bold** ($50 budget goes here — Commercial Type, single license). The condensed-but-muscular caps face that does broadcast-chyron work better than anything free. If client won't spend the $50, fallback is **Bebas Neue** (free, Google Fonts) at heavier tracking — acceptable, slightly more generic.

**Body / numerals: Anton** (free, Google Fonts) for inductee numbers and supporting captions. Anton's slab-adjacent presence at large sizes does the "trophy plaque" job for free.

**Web/system fallback stack:** `Druk Wide, Bebas Neue, Anton, Impact, sans-serif`

### Why this pairing

Druk Wide is what the NBA on NBC name plates *would have been* if they were redrawn today by someone who actually watched the broadcasts. It's wider than Bebas, denser than Impact, and reads as institutional rather than YouTube-thumbnail. Anton fills the inductee-number slot because slab numerals on a plaque are a museum cue; pairing two condensed sans faces would feel monotone.

**Disagreement resolved:** UI Designer wanted a serif (Tiempos / Caslon) for the name plate to reinforce "Hall of Fame plaque" energy. Brand Guardian killed it: every era-anchor reference is sans, and a serif drifts the brand toward stuffy-museum instead of broadcast-museum. The plaque feeling comes from the gold rule and the layout, not the type.

---

## 5. Lower-third / video chyron

**The single most-seen asset. This is the centerpiece.**

- **Position:** bottom-left, 80px from left edge, 140px from bottom (Reels-safe above the UI).
- **Bed dimensions:** 720×180px, broadcast navy fill at 92% opacity, 1.5px gold top rule extending 40px past the bed on the right (the era detail — chyrons of the period had a rule that overshot the bed).
- **Content layout, left to right:**
  - Inductee number in gold, 64pt Anton: "#001"
  - Vertical gold hairline divider
  - Stacked: player name in 38pt Druk Wide bone (top), team + years in 18pt Anton at 70% opacity (bottom)
- **Animation cue:** wipes in from left in 8 frames (a sharp horizontal sweep, not a slide), with a 1-frame red flash on entry — the only red in the whole brand, era-correct as a broadcast graphics tell. Holds for 2.4 seconds. Wipes out right in 6 frames.
- **Texture pass:** 4% film grain + the same 1px chromatic offset as the wordmark, baked in.
- **CapCut producibility:** built once as a transparent .mov with alpha channel. Operator drops it on the timeline, retypes the name field via a text layer aligned to the grid. Five-minute job per video after template setup.

---

## 6. Caption / microcopy template

The caption is part of the visual system, not separate from it. It has architecture.

**Template:**

```
Inductee #[NUM]: [PLAYER NAME]
[ONE-LINE EVOCATIVE STAT OR ROLE — reverent, specific, never a joke]
[ONE-LINE CULTURAL/SONIC ANCHOR — what era this lived in]

Banner raised in the rafters of the universe.

He was him.

🔊 [TRACK — ARTIST, YEAR]
```

Recurring lore phrases (use sparingly, build a vocabulary):
- "Banner raised in the rafters of the universe." (closer before "He was him.")
- "Inducted into the Hall." (anniversary reposts)
- "The tape doesn't lie." (when stat-driven)
- "From the broadcast." (when leaning on the era pull)

**Hashtag set (minimal — three only):** `#midtierlegends #hewashim #nbaclassics`

### Worked examples

**Eric Snow / Inductee #001**
```
Inductee #001: Eric Snow
The lockdown point guard who brought the Sixers to the Finals and never asked for a poster.
Philadelphia, 2001. The arena chanted his name like he'd dropped 40.

Banner raised in the rafters of the universe.

He was him.

🔊 Get Ur Freak On — Missy Elliott, 2001
```

**Pat Garrity / Inductee #014**
```
Inductee #014: Pat Garrity
A 6'9" Notre Dame jumper who stretched the floor when stretching the floor wasn't a thing yet.
Orlando, 2003. Came off the bench. Hit the shot. Sat back down.

Banner raised in the rafters of the universe.

He was him.

🔊 In Da Club — 50 Cent, 2003
```

**Mark Madsen / Inductee #022**
```
Inductee #022: Mark Madsen
Stanford diploma, two championship rings, and a parade dance that never should have happened but did.
Los Angeles, 2001. He earned every minute he didn't play.

Banner raised in the rafters of the universe.

He was him.

🔊 Izzo (H.O.V.A.) — Jay-Z, 2001
```

Note: Madsen's caption was the room's pressure test. Whimsy Injector wanted to lean on the parade dance harder — Brand Guardian pulled it back to one line. **Reverent, never mocking** is the rule, and one line of dance reference reads as legend; two reads as bit.

---

## 7. Profile + bio package

- **Handle:** `@midtierlegends` (locked pending availability check)
- **Profile picture (40×40 production):** the MTL monogram on broadcast navy, gold underline rule. Renders as a recognizable shape at 40px because the monogram is letter-spaced tight and the underline reads as a single hard pixel. **Do not use the full wordmark — it disappears at 40px.**
- **Bio:** Affirming the draft with one sharpening pass:

> *Forgotten role players. Era-correct soundtracks.*
> *Inductee #001: Eric Snow. The Hall is open.*
> *He was him.*

Adding the rolling "Inductee #" line means the bio updates every post and rewards repeat visits — it's free lore accumulation in the most-viewed copy slot. Content Creator's call, Brand Guardian agreed.

- **IG / YouTube banner:** see prompt (d). The Hall interior — wood-paneled, banner rafters visible upper-third, the "MID TIER LEGENDS" wordmark embroidered on the central banner. 1500×500 for IG, 2560×1440 for YouTube.
- **Pinned post:** Inductee #001 (Eric Snow) — the canonical opener. Pin it permanently. New visitors see the founding induction first. Build the museum from the front door.

---

## 8. Whimsy details — three that earn the brand

**1. The rolling roster pin.**
Every fifth video, a 0.4-second cut to a "Hall registry" — a yellowed, slightly-crooked typed list of all inductees to date, scrolling past the current name highlighted in gold. By Inductee #050 this becomes the most-screenshotted asset in the account. It's the lore moat made literal. A copycat can steal the format; they cannot steal 50 weeks of accumulated names.

**2. The audio sting.**
A two-second custom sting at the open: a single descending Roundball-Rock-adjacent piano figure (legally distinct, commissioned on Fiverr for $40) into a vinyl crackle, into the track drop. Same sting every video. After ten videos, viewers hear it in their sleep. After fifty, a competitor opening with anything else feels wrong.

**3. The banner ceremony beat.**
At the moment the track hits, a 0.3-second insert of a banner unfurling in arena rafters — same banner art every time, with the inductee number rendered in embroidered gold thread on the navy banner field. It's the same shot, every video, with only the number changing. It is the *ceremony*. It's also un-fakeable in CapCut without the original asset, which is the point.

---

## 9. Image-generation prompts

Five complete, runnable prompts. Both Midjourney v6 and Nano Banana (Gemini 2.5 Flash Image) versions where applicable.

> **Tool note:** Nano Banana is free in Google AI Studio and strong at photorealism + scene composition. Midjourney is slightly better at clean letterform rendering. Use AI for backdrop and mood; have an illustrator vectorize final type-locked assets in Photopea or Figma.

### (a) Primary logo concept render

**Midjourney v6:**
```
Logo design, "MID TIER LEGENDS" stacked wordmark, condensed wide
sans-serif caps in the style of a 1998 NBA on NBC broadcast lower-third
chyron, off-white type on deep broadcast navy, thin gold horizontal rule
between the two stacked words, slight italic lean, subtle CRT chromatic
aberration, faint scanlines, type-only no illustration, plaque-like,
institutional broadcast graphics, museum nameplate energy, era-correct
1990s television sports identity, flat 2D vector treatment with light
analog texture, centered, generous negative space --ar 1:1 --style raw --v 6 --q 2
```

**Nano Banana (Gemini 2.5 Flash Image):**
```
Generate a square logo design. The text "MID TIER LEGENDS" is stacked
on two lines in condensed wide sans-serif capital letters, in the visual
style of a 1998 NBA on NBC broadcast lower-third chyron. Off-white
letters (#EDE6D3) on a deep broadcast navy background (#0E1B3A). A thin
gold horizontal rule (#B4894A) separates the two stacked words. Slight
italic lean on the type. Subtle CRT chromatic aberration on the edges
of the letters and faint horizontal scanlines across the whole image.
Type-only, no illustration. Plaque-like, institutional broadcast graphic
energy, era-correct 1990s television sports identity. Centered with
generous negative space. Square 1:1 composition.
```

### (b) Inductee badge mockup (Eric Snow sample)

**Midjourney v6:**
```
Vertical hall of fame inductee plaque, 4:5 aspect, header bar reading
"HALL OF MID TIER LEGENDS" in small gold caps on navy, large gold slab
numeral "INDUCTEE #001" beneath, central window showing a desaturated
sepia-toned action photograph of a generic late-1990s NBA point guard in
a white jersey from the bench, broadcast camera angle, name plate at
bottom in off-white condensed caps reading "ERIC SNOW", thin gold
divider rules, navy and bone color palette with trophy gold accents,
museum plaque texture, faint film grain, broadcast artifact aesthetic,
no real person likeness --ar 4:5 --style raw --v 6 --q 2
```

**Nano Banana:**
```
Generate a vertical 4:5 hall of fame inductee plaque. At the top, a
header bar reads "HALL OF MID TIER LEGENDS" in small gold capital
letters on a navy background. Beneath that, large gold slab-numeral
text reads "INDUCTEE #001". Below the number is a central rectangular
window containing a desaturated sepia-toned action photograph of a
generic late-1990s NBA point guard in a plain white jersey on the bench,
broadcast camera angle, no identifiable team or number. At the bottom,
a name plate shows "ERIC SNOW" in off-white condensed capital letters.
Thin gold divider rules separate each section. Navy (#0E1B3A) and bone
(#EDE6D3) color palette with trophy gold (#B4894A) accents. Museum
plaque texture, faint film grain, broadcast artifact aesthetic. Do not
generate any real person's likeness. Vertical 4:5 composition.
```

### (c) Profile picture base — Flux 1.1 Pro / Nano Banana

**Flux 1.1 Pro:**
```
Tightly cropped square portrait, an early-2000s NBA role player on the
bench during a broadcast, white home jersey with no identifiable number
or team logo, towel over shoulder, face partially obscured or in soft
focus, generic anonymous athlete, desaturated sepia and navy color grade
in the style of TNT Hardwood Classics, slight CRT scanline texture,
broadcast camera grain, vignette, reverent ceremonial mood, no celebrity
likeness, fictional player, photorealistic but era-degraded, 1080x1080
```
Aspect 1:1, guidance 3.5, steps 30. Tool: Flux 1.1 Pro on Replicate or fal.ai.

**Nano Banana** (this is where it shines):
```
Generate a tightly cropped square photograph: an early-2000s NBA role
player sitting on the bench during a televised broadcast. White home
jersey with no identifiable number, team logo, or sponsor patches.
A towel draped over one shoulder. The face is partially obscured or in
soft focus — a generic, anonymous athlete, not any real person.
Desaturated sepia and navy color grade in the style of TNT Hardwood
Classics broadcasts. Subtle CRT scanline texture, broadcast camera
grain, vignette darkening at the corners. Reverent, ceremonial mood.
Photorealistic but era-degraded as if recorded on 1999 broadcast tape.
Square 1:1 composition.
```

### (d) IG / YouTube banner — Hall establishing shot

**Midjourney v6:**
```
Wide cinematic establishing shot of an empty wood-paneled basketball
hall of fame interior at night, dim warm spotlights, the upper third of
frame filled with championship-style banners hanging from the rafters,
the central banner embroidered with "MID TIER LEGENDS" in gold
condensed caps on navy, polished hardwood floor reflecting amber light,
glass display cases blurred in foreground, museum reverence, late
1990s broadcast color grade, slight haze and dust motes in the
spotlights, no people, ceremonial atmosphere, rich navy gold and
hardwood brown palette --ar 16:9 --style raw --v 6 --q 2
```

**Nano Banana:**
```
Generate a wide cinematic establishing shot of an empty wood-paneled
basketball hall of fame interior at night. Dim, warm spotlights pool
across the space. The upper third of the frame is filled with
championship-style banners hanging from the rafters. The central
banner is embroidered with "MID TIER LEGENDS" in gold condensed capital
letters on a navy field. The polished hardwood floor reflects amber
light. Blurred glass display cases sit in the foreground. The mood is
museum reverence. Color grade is late-1990s broadcast — desaturated
navy, gold, and hardwood brown. Slight haze and visible dust motes in
the spotlight beams. No people in frame. Ceremonial, hushed atmosphere.
Wide 16:9 composition.
```

### (e) Lower-third still frame mockup

**Midjourney v6:**
```
Mockup still frame from a basketball broadcast, lower-third graphic
overlay in the bottom-left corner, navy bed with thin gold top rule
that overshoots the bed slightly to the right, large gold "#001" on the
left, vertical gold hairline divider, stacked off-white type to the
right reading "ERIC SNOW" above smaller "PHILADELPHIA 76ERS — 1998-2004",
condensed wide sans-serif caps, behind it a soft-focus desaturated
arena interior at game time, broadcast camera framing, faint CRT
chromatic aberration and film grain, era-correct late 1990s NBA on NBC
chyron treatment --ar 9:16 --style raw --v 6 --q 2
```

**Nano Banana:**
```
Generate a mockup still frame from a basketball television broadcast,
in vertical 9:16 composition. In the bottom-left corner, a lower-third
graphic overlay: a navy bed with a thin gold top rule that overshoots
the bed slightly to the right. On the left side of the bed, a large
gold "#001" in slab-numeral type. A vertical gold hairline divider
separates it from stacked off-white type on the right that reads
"ERIC SNOW" on top in larger condensed wide sans-serif capitals, and
"PHILADELPHIA 76ERS — 1998-2004" beneath in smaller type. Behind the
graphic, a soft-focus desaturated arena interior during a game, shot
from a broadcast camera angle. Faint CRT chromatic aberration on the
edges and visible film grain throughout. The whole image should feel
like an era-correct late-1990s NBA on NBC chyron treatment. Vertical
9:16 composition.
```

---

## 10. Don't-ship list

1. **Any flat-vector 2020s basketball illustration** — the rounded-corner, two-tone, dribbble-bait basketball with a smile gradient. Kills the artifact illusion in one frame.
2. **Comic Sans, Bangers, Lobster, or any "fun" display font.** Also: Montserrat. Especially Montserrat. The era was Helvetica Inserat and custom broadcast cuts — modern geometric humanist sans drifts the brand into podcast-cover territory.
3. **Millennial pink, vaporwave purple-teal gradients, Y2K chrome-blob aesthetic.** Y2K-adjacent is a trap — the brand is *late-90s broadcast*, which is its own visual register and is not the same as Y2K club-flyer revival. One drift into chrome bubbles and we're a Tumblr account.
4. **Real player faces in the logo, badge, or banner.** Likeness rights, but also: the moment a recognizable face anchors the brand identity, the brand becomes about that face instead of the institution. The Hall has busts; the brand has the architecture.
5. **Any caption that punches down at the player.** "He averaged 4 points lol" energy. The whole moat is reverence — one ironic caption and the universe collapses. Content Creator owns this; Brand Guardian enforces it.

---

*End of package. Hand to illustrator and prompt operator. Inductee #001 ships first — Eric Snow, Get Ur Freak On, banner in the rafters.*
