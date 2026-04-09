# Part 6 — Community Architecture
**Agent**: Soccer Dad Community Manager | **Wave**: 3 | **Status**: Locked

---

## THE COLLECTIVE — COMMUNITY ARCHITECTURE

---

## 1. THE COLLECTIVE — EMAIL COMMUNITY ARCHITECTURE

### What Is The Collective

The Collective is not a mailing list. It is the inner circle — the dads who said yes before there was anything to buy, who showed up before showing up was easy. The name is intentional: collective, not club. A club has a velvet rope. A collective has a shared purpose.

Every subscriber to The Collective receives a short orientation paragraph at the top of every email until they've been members for 60 days. After that, it disappears — because they already know where they are.

---

### Welcome Email

**Subject line:** Bienvenido al Colectivo. Welcome to The Collective. 🎽

**Preview text:** You're in. Here's what that actually means.

---

Oye,

You just joined something that doesn't quite exist anywhere else.

The Collective is the inner community of Sideline Papi — the dads, tíos, abuelos, and dad-figures who show up every Saturday no matter what. Early morning, folding chair, bad coffee, full heart. You know exactly what we're talking about.

This isn't a fan club. It's not a loyalty program. It's the group of people we talk to first — before a drop, before an event, before anything goes public. When something matters, you hear it here.

---

*El Colectivo no es una lista de correos. Es la comunidad de adentro — los papás que dijeron sí antes de que hubiera algo que comprar. Aquí es donde hablamos primero.*

---

Here's what being in The Collective means, for real:

**You get the drop before the drop.** Product launches open to Collective members 48 hours before the public. Not a teaser — the actual cart, the actual price, the actual units.

**You get the conversation, not just the content.** Every other Thursday, we send a question we're genuinely thinking about. No pitch. No product. Just a question worth chewing on over a Saturday morning. Reply and we actually read it.

**You're in the room for what we're building.** We're putting together local chapters — groups of dads who meet at real fields in real cities. Collective members are the first to know when a chapter forms near them and the first invited.

**Your preferences travel with you.** You told us how you like to talk — Spanglish, always, or English-primary. We remember. We write to you that way.

**You're part of the founding record.** Every Collective member who joins before the first public drop is logged. Permanently. If you're here now, you'll always have been here first.

---

One thing we ask: don't treat this like inbox noise. When we ask a question, answer it. When we announce something, tell a dad. The Collective only works if the people in it actually show up.

That's the whole thing.

— The Sideline Papi crew

*PD: Tu próximo correo llega el jueves. Es una pregunta, no un pitch. Nos vemos en la banda.*

---

**Footer:** You're receiving this because you joined The Collective at SidelinePapi.com. To update your language preference, click here. To leave, click here — but we'll miss you.

---

### Five Tangible Benefits of Collective Membership

**1. 48-Hour Founding Window on Every Drop.** Collective members receive cart access two days before public launch. Given limited units (Drop 1: 100 tees, 75 caps, 75 hoodies), this window is functionally the difference between getting a piece and not. This is not "early access" language — it is described plainly in every pre-drop email with exact open and close times.

**2. The Thursday Dispatch.** Every other Thursday, Collective members receive a short email — 150 words maximum — that contains one question or reflection. No product. No ask. Sample: "At what age did your dad stop hugging you in public? At what age did you decide you wouldn't do that?" This content does not appear on social media. It exists only for members and is the most replied-to content the brand produces.

**3. Chapter Invitation Access.** When a local chapter launches or a new chapter city is announced, Collective members in that city receive invitations 7 days before any public announcement. The email includes the chapter lead's name, the field address, and a direct RSVP link — not a form with 12 fields, a one-click yes.

**4. The Founding Member Designation.** Members who join before the Week 10 drop receive permanent Founding Member status in their account profile. This designation appears in future event check-ins, on a dedicated founding wall at SidelinePapi.com, and is referenced in the brand's origin story — including any future press or brand documentary content. It is not retroactively awarded.

**5. Direct Line for Product Feedback.** Once per drop cycle, Collective members receive a single product feedback request with a direct reply email address — not a SurveyMonkey link. Three questions, open-ended. Responses are read by the founding team and summarized internally. Participating members receive a follow-up acknowledging what was heard and what (if anything) changed because of it.

---

### Founding Member vs. General Member

**Founding Member:** Any subscriber who joins The Collective on or before the day Drop 1 (La Primera Bajada) goes live to the public — meaning the moment the cart opens to non-Collective audiences. The exact date is Week 10 of the GTM timeline. This is a hard cut-off. There is no appeals process and no exceptions. The reasoning: founding membership is a record of who believed before there was proof. That record has to be real to mean anything.

**General Member:** Any subscriber who joins after Drop 1 goes public. They receive all ongoing Collective benefits in full. They are never made to feel second-tier. But they do not carry the Founding Member designation, and past Thursday Dispatches are archived and not forwarded to new members — the dispatches exist only in the moment they're sent.

The transition language used in emails after Drop 1: *"The founding window has closed. The Collective is still open — and everything from here forward, we do together."*

---

### Segmentation Architecture

The Collective runs four primary segments:

**Segment 1: Spanglish-First Members**
Members who selected "Spanglish, always" at signup. All email copy is written in the brand's natural Spanglish register — English-dominant sentences with Spanish woven in at emotional and relational beats. Subject lines may be fully Spanish, fully English, or split.

**Segment 2: English-Primary Members**
Members who selected "English-primary." Copy is English throughout, with Spanish phrases retained only where they are culturally essential and always provided with natural (not parenthetical) context. Product names remain bilingual; ritual names remain bilingual.

**Segment 3: Engaged Core (Last 60 Days Active)**
Members who have opened at least 2 of the last 4 emails. These members receive the Thursday Dispatch, chapter invitations, and drop pre-access windows. They are the audience that receives the highest-trust, most direct communication — including occasional behind-the-scenes content not sent to the full list.

**Segment 4: Dormant (90+ Days Inactive)**
Members who have not opened any email in 90 days. They receive a reduced send frequency — maximum one email per month — and are entered into the re-engagement sequence below before being sunset at 180 days of inactivity.

**Segment 5: Purchasers**
Members who have completed at least one purchase. After purchase, they receive a dedicated post-purchase sequence (3 emails over 10 days: thank-you with real human language, a field guide for the product they bought, a soft invitation to share a photo). Purchasers who have not re-engaged after two drops receive a specific win-back offer before being moved to Dormant.

---

### 90-Day Dormant Re-Engagement

**Subject line:** Oye — still out there?

**First sentence:** We haven't heard from you in a while, and we're not going to pretend that's fine with a coupon code — we just want to know if you're still showing up on Saturdays.

*[The email continues: short, human, no discount, no urgency language. One ask: reply with a single word — "here" — if they want to stay. If no reply within 14 days, one final email with the option to stay or unsubscribe cleanly. If still no action, the subscriber is removed from active sends and archived at 180 days.]*

---

## 2. LOCAL CHAPTER MODEL

### Chapter Architecture

A local chapter is a group of dads who claim a field. That's the whole structure. There is no formal application, no dues, no hierarchy beyond a single chapter lead who serves as the primary contact with the brand.

**Minimum to be official:** 8 active dads. "Active" means they have shown up to at least one chapter gathering in the last 60 days. A chapter begins as "forming" at 3–7 dads and becomes "official" when it crosses 8 and is registered with the brand.

**Chapter lead role:** Not a manager. Not an influencer. A chapter lead is the person who texts the group when the field changes, who makes sure a new dad knows where to stand, who sends the photo to the brand after the Saturday game. The role requires approximately 30 minutes per week and zero budget. Chapter leads receive a Sideline Papi cap (El Casquete) when they register — not as a perk, as a visual identifier on the field.

---

### What a Chapter Gets from the Brand

**Assets:**
- A chapter identity kit: the chapter's city name worked into the Sideline Papi visual system (e.g., "Sideline Papi — Chicago Collective"), provided as print-ready files and phone wallpaper
- A private chapter WhatsApp group link facilitated by the brand, with welcome message pre-written in Spanglish
- A one-page physical welcome card for new dads joining the chapter — card stock, bilingual, brand-printed, shipped in batches of 25 when requested

**Access:**
- A direct email to a named person at Sideline Papi (not an info@ address) who responds within 48 hours
- First notification of any brand event, content shoot, or partnership happening in or near the chapter's city
- A monthly 15-minute call with the brand team for chapters in their first 90 days — optional, not mandatory, but genuinely offered

**Communication:**
- The chapter lead receives a separate chapter-lead version of the Thursday Dispatch — same questions, with an additional line: "This week's chapter conversation starter, if you want to use it."
- Quarterly summary sent to chapter leads showing chapter engagement across the network — not competitive rankings, just the honest picture of how the community is growing

**Physical materials:**
- Two sideline banners (36" x 12", grommeted, weatherproof) with the Sideline Papi mark and the chapter city name — provided at launch, replaced on request with demonstrated wear
- A small field kit shipped once per year: sunscreen, a pack of trash bags branded with the Sideline Papi mark, and a handwritten note from the founding team

---

### What the Brand Gets from a Chapter

This is a two-way relationship and the brand should say so plainly, including in chapter onboarding materials.

**Content.** Chapters are the primary source of real-field photography — the images that make Sideline Papi look like what it actually is rather than what a studio wants it to look like. Chapter members are asked (never required, always asked) to share photos. When they do, the brand asks for permission to use them and credits the city chapter by name.

**Market intelligence.** Chapter leads see what dads actually talk about, what they want, what they ignore. That signal — delivered through the monthly check-in call and through the natural replies to Thursday Dispatches — informs product decisions, drop timing, and content direction. This is not extractive. It is acknowledged in communications with chapter leads explicitly: "What you tell us shapes what we make."

**Proof of concept.** Every functioning chapter is evidence that the brand means what it says about community before commerce. That proof is what makes the brand credible to press, to potential retail partners, and to future members. Chapter leads are, in the most literal sense, the brand's credibility infrastructure.

**Word of mouth.** A dad who is part of a chapter doesn't just buy a product — he tells other dads where it came from. The brand's lowest-cost and highest-trust acquisition channel is a functioning local chapter. This is worth saying honestly.

---

### Week 6 Chapter Event: Run-of-Show

**Location decision:** The founding chapter lead selects the field. It should be a field where at least 3 of the founding dads already have kids playing — not a neutral facility, not a rented park pavilion. The brand asks one question to select the field: "Where would you already be on a Saturday morning?" The answer is the venue. Sideline Papi does not produce the location. The dads already know where to go.

The first event runs on a Saturday morning. Target start: 7:00 AM. Target end: 8:30 AM. Timing is designed to precede the first game of the morning — dads are already arriving, kids are already warming up, the event doesn't require anyone to go out of their way.

---

**90-Minute Run-of-Show:**

**7:00 AM — Arrive and Set the Line**
Chapter lead and two volunteer dads arrive 15 minutes early. They set up a folding table with a branded tablecloth (Sideline Papi mark, forest green), a thermos of coffee (provided by the chapter lead — the brand reimburses up to $30), and a stack of the physical welcome cards. No stage. No PA system. No banner unless the chapter lead wants it — and even then, it goes behind the table, not in front of the group. This is a field. It should look like a field.

**7:00–7:30 AM — Arrival and Informal Connection**
Dads arrive individually and in pairs. The chapter lead greets each one by name. No formal program yet. The brand rep (joining via the founding chapter only — future chapters run without a brand rep present) mingles but does not lead. The rule for the first 30 minutes: everyone drinks coffee and watches warmups. No pitches. No introductions. Just presence.

**7:30 AM — The Circle**
The chapter lead calls a loose circle — "Oigan, vengan un momento." Not a formal gathering. Dads stay standing, coffee in hand. The chapter lead says three things: who he is, how he found Sideline Papi, and why he said yes when asked to be here. Two minutes total. Then he introduces the brand rep with a single sentence.

**7:33 AM — The Brand Rep Speaks (5 Minutes Maximum)**
The brand rep says: what Sideline Papi is (one sentence), what The Collective is (one sentence), what this chapter is (one sentence), and why none of it works without the people standing in this circle right now. Then the brand rep says nothing else. No slides. No QR codes yet. The next person to speak is a dad from the group.

**7:38 AM — The Question**
The chapter lead asks one question. The specific question for the first-ever chapter event is: *"¿Cuándo fue la primera vez que fuiste el papá en la banda — y qué se sintió?" / "When was the first time you were the dad on the sideline — and what did it feel like?"*

Every dad who wants to answer gets 60 seconds. No one is required to speak. The brand rep does not answer — this question is for the dads.

**8:05 AM — The Walk**
The formal part is over. The chapter lead announces that the chapter WhatsApp group is going live this weekend and gives instructions (one sentence: "I'll send you the link before noon today"). The brand rep makes the one physical ask of the event: "Can we take one photo of the group — just for ourselves, nothing posted without your permission?" The photo is taken. Then everyone disperses to their kids' games.

**8:05–8:30 AM — Sideline Time**
The brand is present but invisible. Dads watch games. The chapter lead and brand rep float and talk to individuals. The brand rep's only job in this window is to learn three things about three dads: their kid's name, their kid's position, and where they're from. That's it.

**8:30 AM — The Close**
No formal close. Games are starting. Dads are on the sideline. That's the right ending.

---

### The One Unmistakable Sideline Papi Moment

At 7:38, when the question is asked and the first dad answers, there is a beat of silence before the next dad speaks. That silence — dads standing in a circle at a youth soccer field, coffee getting cold, kids in the background, no product in sight — is the moment that is unmistakably Sideline Papi and nothing else. A generic soccer parent meetup announces a spring league. A brand activation hands out samples. This event stops and asks a question that treats every dad in the circle like his experience matters. That's the moment. It should be protected at all costs.

---

### Documentation and Content

**Permission model:** Before the event, every invited dad receives a WhatsApp message: *"Vamos a tomar algunas fotos el sábado — solo para nosotros por ahora. Si quieres que tu cara aparezca en contenido público, te preguntamos antes de publicar cualquier cosa. Siempre."* No blanket consent. Individual ask every time.

**What gets documented:**
- The chapter lead sets up the group photo at 8:05. Landscape orientation, natural morning light, no posing instructions other than "stand where you're standing."
- The brand rep takes candid photos during the arrival window and the walk. Phone only — no professional camera at the first event. A professional camera changes how people stand.
- One audio clip is recorded (with individual permission): the answer to the circle question from one dad who agrees to be recorded. This becomes the voiceover for the Week 6 content.

**Content output from one event:**
- One Instagram portrait post (the group photo or a selected individual portrait): posted Sunday of that week
- One TikTok / Instagram Reel: 30–45 seconds, real audio from the field, no music track overlaid — the ambient sound of kids warming up, the dad's voice, that's it
- One Thursday Dispatch: the question asked at the event, retold to the full Collective with the chapter city named and the founding dads described (no last names without permission, first names and city are enough)
- One chapter announcement email to Collective members in the same metro area: "The [City] chapter just had its first morning. Here's what happened."

---

### Chapter Expansion Sequence — Month 3 to Month 12

**Trigger for second chapter city:** The second chapter city activates when three conditions are met simultaneously: (1) the founding chapter has held at least two events and has 8+ active members, (2) at least three dads in a different city have independently contacted the brand requesting a chapter, and (3) the brand has confirmed a chapter lead in that city through direct conversation — not a form submission, a phone call or voice message exchange. All three conditions must be met. Expansion driven by only one or two of these signals produces weak chapters.

Target timing for second city activation: Month 4–5 of the GTM calendar, assuming the founding chapter is functioning.

---

**First Five Chapter Expansion Cities:**

**1. Los Angeles (East LA / San Gabriel Valley focus)**
Demographic fit: highest concentration of Mexican-American families with youth soccer participation in the United States. The San Gabriel Valley alone has hundreds of weekend leagues. Cultural fit is native — this is the community the brand was built for. The chapter lead outreach begins in Month 3 using the founding network's existing connections.

**2. Houston (Harris County / Pasadena / South Houston focus)**
Demographic fit: second-largest Mexican-origin population in the U.S., with deep soccer culture across the city's southern and eastern neighborhoods. High density of club and recreational leagues. Houston is also a bellwether market — if the chapter model works in LA and Houston, it works everywhere the brand needs to go.

**3. Chicago (Pilsen / Little Village focus)**
Demographic fit: the most concentrated Mexican-American urban neighborhood cluster outside California, with strong soccer park infrastructure in both Pilsen and Little Village. Cultural fit: Chicago's Latino soccer culture is rooted in the park leagues that have run for decades — Sideline Papi slots into an existing tradition rather than importing one.

**4. Dallas–Fort Worth (Irving / Grand Prairie / Garland focus)**
Demographic fit: rapid growth market — one of the fastest-growing Latino populations in the country, skewing young, with corresponding explosion in youth sports enrollment. DFW also has high rates of dual-income Latino households with disposable income — the economic profile of the brand's purchaser. First chapter activation targets Irving, where multiple recreational league complexes cluster.

**5. Phoenix (West Phoenix / Maryvale focus)**
Demographic fit: Maryvale is one of the most densely Latino zip codes in the Southwest, with extremely high youth soccer participation — youth leagues here are oversubscribed every season. Phoenix is also a state with a complex and ongoing relationship with Latino identity and belonging, which makes a brand that says *you are seen* not just appealing but meaningful. The chapter in Phoenix will be the one that gets written about first by local media.

---

### How a Dad Starts a Chapter in His City

The brand does not use a form. The process:

**Step 1: The Dad Texts or DMs.**
He sends a message to the Sideline Papi Instagram DM or to the chapter email address (chapters@sidelinepapi.com) with one sentence: his city and his name. That's it. No pitch required.

**Step 2: The Brand Replies Within 48 Hours.**
A named person on the brand team — not a bot, not an automated sequence — replies with a voice message or a brief personal text. The message acknowledges the city, asks two questions: how many dads he already knows in the area who would show up, and whether he's a chapter lead type or someone who just wants to be part of a chapter when it forms.

**Step 3: If He's a Lead Candidate, a 20-Minute Call.**
The brand schedules a 20-minute call — phone or video. The call has one agenda item: figure out if this is the right person to be a chapter lead. Not a screening process. A conversation. The brand asks: Who are the dads you'd call first? What field would you use? What would make this feel worth doing?

**Step 4: If Yes, the Chapter Lead Welcome Package.**
Shipped within one week: the chapter lead cap (El Casquete, Forest Green), 25 welcome cards, and a one-page physical document called the Chapter Commitments — not a contract, a shared set of expectations written in the second person, in Spanglish, that the chapter lead can read and keep.

**Step 5: The Brand Builds the Assets.**
Within two weeks of confirming the chapter lead, the brand delivers the chapter identity kit (digital files), sets up the WhatsApp group structure, and schedules the first monthly check-in call.

**Step 6: The Chapter Sets Its First Date.**
The chapter lead picks the field and the date — no earlier than three weeks from the welcome package arriving. He invites the first dads personally, one by one, not through a mass message. The brand's job at this point is to stay available and stay out of the way.

**Step 7: The Chapter Holds Its First Morning.**
The brand does not attend in person unless the chapter is within 90 minutes of the founding city and the chapter lead invites them. The first morning runs on the chapter's own energy. The brand sends a follow-up message within 24 hours asking: "How'd it go?" That question is the only check-in required.

---

## 3. COMMUNITY RITUALS & RECURRING MOMENTS

### Ritual 1: El Sábado Snapshot / The Saturday Send

**Frequency:** Every Saturday during active soccer season (approximately September–November and February–May in most chapter markets). Off-season: monthly.

**Format:** A single Instagram Stories frame published between 7:00 and 9:00 AM on Saturdays. No caption over 10 words. No filter. The image is always taken at a real field by a real dad — submitted through a standing open call in the chapter WhatsApp groups: *"Mándanos tu campo este sábado / Send us your field this Saturday."* One field per week, selected by the brand team. The dad who submitted gets a DM with: "Este sábado es tuyo. / This Saturday is yours."

**Why it works:** It turns the most ordinary moment in the community's life — standing on the sideline — into a moment worth capturing. The ritual signals that any field, anywhere, is worth showing.

**First iteration copy:**

Story frame: a photo of a dewy artificial turf field at 7:12 AM, two folding chairs visible in the corner, mist coming off the grass.

Text overlay (white, lowercase): *"el campo no se ve igual sin nosotros."*

Story 2 (following immediately): the same photo, now with a small Sideline Papi mark in the corner. No additional text.

---

### Ritual 2: El Jueves / The Thursday Question

**Frequency:** Every other Thursday year-round, 52 weeks.

**Format:** A Collective email — 150 words maximum. One question. No product. No links except the unsubscribe footer. Subject line always formatted as: *Una pregunta / A question —* followed by the question itself. The email is signed with a first name only (the person on the team who wrote it that week). Reply address is a real inbox.

**Why it works:** It trains members to expect something from the brand that asks rather than tells — which over time makes every communication from Sideline Papi feel like a conversation rather than a broadcast.

**First iteration copy:**

**Subject:** Una pregunta / A question — ¿Cuándo fue la última vez que tu papá te vio jugar?

---

Oye,

¿Cuándo fue la última vez que tu papá te vio jugar?

No tiene que ser fútbol. Puede ser un partido de básquetbol en el parque. Una actuación en la escuela. Cualquier cosa donde él estaba en la banda y tú estabas en el campo.

When was the last time your dad watched you do something he was proud of?

If you remember the moment, we'd love to hear it. Just hit reply. We read every one.

— Marco

*The Collective · Sideline Papi*

---

### Ritual 3: El Papá de la Semana / Dad of the Week

**Frequency:** Every Sunday.

**Format:** An Instagram carousel or single portrait post. One dad, one field, three to five images. A caption that tells his story in the brand's Spanglish voice — 150–200 words. Always ends with his first name and his city. Never his last name unless he specifically requests it. The dad is nominated by a chapter member, by a Collective reply, or by a brand team member who saw something worth sharing. Nomination is always with the dad's knowledge and consent before the post is drafted.

**Why it works:** It creates a weekly proof point that the brand's promise — "you are seen" — is not a tagline but a practice. Every Sunday, one dad gets proof that showing up matters.

**First iteration copy:**

**Caption:**

Este es Roberto. Roberto lleva cuatro años en el mismo campo — campo 3, junto al árbol grande que da sombra a las 8 AM si te pones en el ángulo correcto.

Su hijo juega de portero. "El que menos corre," dice Roberto, "pero el que más aguanta."

Hace tres semanas, su hijo atajó un penal en tiempo extra. Roberto no gritó. Se paró, aplaudió, y se limpió los ojos cuando nadie estaba viendo.

This is what every Saturday is for.

Roberto. Los Angeles, CA.

*¿Conoces a un papá que merece su momento? Mándanos su historia. / Know a dad who deserves his moment? Send us his story.*

---

### Ritual 4: La Bajada Preview / The Drop Preview

**Frequency:** Once per drop cycle (three times per year).

**Format:** A Collective email sent exactly 72 hours before a product drop opens to the public. The email is formatted differently from every other Collective email — no Thursday Dispatch brevity, no Sunday warmth. It is longer, more deliberate, and contains: (1) the story behind the product being released, (2) a photo of the product being worn at a real field — never a flat lay, never a white background, (3) the exact time the Collective window opens, and (4) a specific instruction for one thing to do in the next 72 hours that is not "buy the product."

**Why it works:** It makes the drop feel like a moment in the community's life rather than a transaction — and the 72-hour window converts without pressure because scarcity is established by honest unit numbers, not artificial countdown clocks.

**First iteration copy:** (See Section 5 — Week 10 Drop Email, which is the first-ever La Bajada Preview.)

---

### Ritual 5: El Primer Partido / The First Game Thread

**Frequency:** Once at the start of every soccer season (typically late August and late January).

**Format:** An Instagram Stories interactive poll chain — four to five stories published on the Saturday of the first weekend of the new season. Each story asks one question, escalating from logistical to emotional: Story 1: "¿Qué nivel juega tu hijo este año? / What level is your kid playing this season?" (options: recreational / club / competitive travel). Story 2: "¿Primera temporada o lleva años? / First season or has it been years?" Story 3: "¿Cómo llegaste hoy? / How'd you get there today?" (options: coffee in hand / forgot coffee / nunca me falta el café). Story 4: "¿Qué esperas de esta temporada? / What are you hoping for this season?" (open text response). Story 5: a still image with the caption: *"Sea cual sea la respuesta — aquí estamos. / Whatever the answer — we're here."*

**Why it works:** It ritualizes the beginning of the season as a community moment, not just a calendar date — and it generates replies that become content for the Sunday portrait series throughout the season.

**First iteration copy:**

Story 1 image: a close-up of shin guards being pulled on. Overlay: *"¿Qué nivel juega tu hijo este año? / What level is your kid playing?"*
Poll options: "Recreativo / Rec" · "Club / Competitive"

Story 2 image: a dad tying his kid's cleats. Overlay: *"Primera temporada o lleva años — / First season or a veteran?"*
Poll options: "Debutando / First time" · "Ya somos pros / We've been doing this"

Story 3 image: a thermos on a folding chair. Overlay: *"¿Cómo llegaste hoy? / How'd you get here today?"*
Poll options: "Café en mano ☕" · "Olvidé el café / Forgot the coffee"

Story 4: Open question frame, text only, no image: *"¿Qué esperas de esta temporada? / What are you hoping for this season?"*

Story 5: Full bleed photo of an empty field just before sunrise. No poll. Text: *"Sea cual sea la respuesta — aquí estamos. / Whatever the answer — we're here."*

---

## 4. COMMUNITY HEALTH METRICS

### Metric 1: Collective Reply Rate

**Definition:** The percentage of Thursday Dispatch emails that receive a reply to the real inbox within 72 hours of send.

**Healthy threshold:** 8–15% reply rate. This is not an open rate — this is someone taking 90 seconds to write something back. At 8%, the community is engaged. At 15%, it is alive.

**Warning signal:** Below 4% for two consecutive dispatches.

**Lever to pull:** The question itself. A reply rate drop almost always traces to a question that was too abstract, too political, or too distant from the sideline experience. Return to hyper-specific, sensory questions: not "What does fatherhood mean to you?" but "What do you always bring to a Saturday game that has nothing to do with your kid's sport?"

---

### Metric 2: Chapter Attendance Rate

**Definition:** The percentage of registered chapter members (8+ per chapter) who attend at least one chapter event per 60-day period.

**Healthy threshold:** 60–75% of registered members attending in any given 60-day window. Chapters are organic, not mandatory — 100% is not the goal and would indicate coercion, not community.

**Warning signal:** Below 40% in a 60-day window for two consecutive periods.

**Lever to pull:** The chapter lead call. A drop below 40% is almost always a chapter lead issue — burnout, life change, or loss of personal investment. The brand's first response is a 20-minute call with the chapter lead, not a new event format or an incentive. If the chapter lead is struggling, the chapter is struggling.

---

### Metric 3: Content Permission Rate

**Definition:** Of all the photo and story submissions received from chapter members and Collective members, the percentage for which the brand has explicit, documented permission to use in public-facing content.

**Healthy threshold:** 100%. This metric has no sliding scale. If any content is published without documented permission, the metric is broken.

**Warning signal:** Any instance of undocumented use.

**Lever to pull:** Simplify the permission process. If the permission rate is dropping, it means the ask is too complicated or the turnaround is too slow. The solution is always to make it easier to say yes — a single WhatsApp reply of "sí" to a direct permission message is sufficient and should be the standard.

---

### Metric 4: Pre-Drop Collective Conversion Rate

**Definition:** Of all Collective members with active email status at the time a drop preview email is sent, the percentage who complete a purchase during the 48-hour Collective window (before public launch).

**Healthy threshold:** 12–20% conversion during the Collective window. Given small unit counts and the tight window, this range indicates that the community is functionally motivated — not just reading, but acting.

**Warning signal:** Below 7% on a drop. (Note: Drop 1 is exempt from this threshold as baseline — it establishes the reference point.)

**Lever to pull:** The pre-drop narrative. Low conversion on a drop almost always means the story of the product didn't land — not that the price was wrong or the product was wrong. The Thursday Dispatch in the two weeks before a drop should be seeding the product's emotional context without mentioning the product. If conversion drops, the pre-drop dispatches are reviewed for whether they did that work.

---

### Metric 5: First-Name Recognition Rate

**Definition:** The percentage of chapter event attendees whose first name is known by the chapter lead before the event — meaning the chapter lead invited them personally, not through a broadcast.

**Healthy threshold:** 100% at founding chapter events. 80%+ at established chapter events. A chapter event where the chapter lead doesn't know who is coming is a public event, not a community event.

**Warning signal:** Below 70% at any chapter event, or any event where more than 2 attendees showed up without prior personal contact from the chapter lead.

**Lever to pull:** Scale down. A chapter that is growing faster than the chapter lead can personally know people needs to slow growth or split — launching a second group at a second field rather than letting the first group become anonymous. The brand's job in this case is to identify and activate a second chapter lead in the same city.

---

### Metric 6: Collective List Health Rate

**Definition:** The ratio of Engaged Core members (opened at least 2 of the last 4 emails) to total list size. This measures whether the list is growing with people who are actually present versus accumulating dead weight.

**Healthy threshold:** 50–65% of total list is Engaged Core. A well-maintained list at 50% is more valuable than a bloated list at 20%.

**Warning signal:** Engaged Core drops below 35% of total list.

**Lever to pull:** Sunset the Dormant segment more aggressively. Run the 90-day re-engagement sequence, and at 150 days (not 180) begin moving non-openers off the active list. A smaller, more engaged list sends better signals to email deliverability infrastructure, generates higher reply rates on the Thursday Dispatch, and converts better on drops. The instinct to protect list size is the wrong instinct — protect engagement rate instead.

---

## 5. COMMUNITY LAUNCH SEQUENCE — First 90 Days

### Day-by-Day / Week-by-Week Calendar

---

**WEEK 1 — The Private Conversations (Days 1–7)**

No public presence. No Instagram. No website launch.

The founding team identifies 12–15 dads through direct personal network: coaches' networks, youth league Facebook groups (lurking, not posting), existing relationships, and two or three warm introductions from people who know the brand founder personally.

Each dad receives a personal outreach — not a mass message. Format: a voice note or a direct text that explains what Sideline Papi is in 3 sentences and asks one question: "Does this feel like something you'd want to be part of before it's a thing?"

Target: 12–15 conversations initiated. Goal is 8–10 who say yes.

**What the founding 12–15 experience:**
They receive a personal call or voice exchange with the brand founder within 48 hours of saying yes. In that call: what The Collective is, what the founding member designation means, and one ask: give us your honest reaction to the name "Sideline Papi" — what does it make you feel? Their answers shape the final brand voice calibration before anything goes public.

---

**WEEK 2 — The First Public Post (Days 8–14)**

Day 8: Instagram account goes live. Bio: "For the dads on the sideline. El primer drop viene. / The Collective is forming."

The first post is the founding dad portrait. One photo. One dad. The caption follows the El Papá de la Semana format established in Section 3 — his first name, his city, his story in 150 words, bilingual.

No promotional language. No "swipe up." No product mention. The post is published Sunday at 8:30 AM.

The 12–15 founding dads receive a WhatsApp message at 8:00 AM that morning: *"El primer post acaba de salir. Es tuyo también. / The first post just went live. It's yours too."*

Days 9–14: The founding dads are asked to share the first post — not with a script, in their own words. No incentive. The share is the trust.

Klaviyo email capture goes live on the landing page: the language preference question. Goal for Week 2: 50 Collective signups from founding dad networks.

---

**WEEK 3 — Content Cadence Launches (Days 15–21)**

The full weekly content cadence from the brand architecture activates:

- Monday Instagram: community reflection. First topic: *"¿Por qué seguimos volviendo al campo? / Why do we keep coming back to the field?"*
- Tuesday TikTok: first observational piece. Format: a 30-second monologue — no face needed, just a voice over a field background — about the specific experience of watching your kid miss a goal and not knowing what your face is doing.
- Thursday Instagram Stories: interactive prompt. First prompt: *"¿Qué traes SIEMPRE al partido? / What do you ALWAYS bring to a game?"* Sticker poll with custom options.
- Friday TikTok + Instagram cross-post: emotional weight. First piece: a photo montage of soccer field details — not players, not kids, the details dads see: the chain-link fence, the yellow goal post, the gravel parking lot — with a Spanglish voiceover about being the kind of dad who just shows up.
- Saturday Stories: real field, real morning.
- Sunday: El Papá de la Semana post 2 (the second founding dad).

Thursday Dispatch launches this week. First question: *"¿Cuándo fue la última vez que tu papá te vio jugar?"* (See Ritual 2, first iteration.)

---

**WEEKS 4–5 — Collective Growth and Relationship Deepening (Days 22–35)**

Content cadence continues. Thursday Dispatches send. No product mention anywhere.

The founding dads are individually asked to nominate one dad they know for an El Papá de la Semana feature — a person they genuinely think deserves to be seen. This produces the next two weeks of Sunday content and expands the brand's contact network.

By end of Week 5: Collective target is 150 members. Any founding dad who has not engaged with any brand communication receives a single personal outreach — a DM or voice note, not an email. The message is: *"Oye — how are things going? Wanted to make sure you got the first posts."*

The chapter lead for the Week 6 event confirms field, time, and attendance list. RSVP sent to 12–15 dads individually through WhatsApp. Final count confirmed by Thursday of Week 5.

---

**WEEK 6 — The First Chapter Event (Days 36–42)**

Saturday morning: the chapter event runs per the full run-of-show in Section 2. Every beat is followed. The brand rep attends.

Sunday: the group photo is published as the El Papá de la Semana post — not one dad this week, the whole chapter. Caption:

---

*Este sábado, doce papás se pararon en el mismo campo al mismo tiempo y hablaron de verdad.*

*No era un evento. No había merch. No había nada que vender.*

*Solo fue: ¿cuándo fue la primera vez que fuiste el papá en la banda?*

*Y uno por uno, todos respondieron.*

*This is what we're building. Estas doce personas son el principio.*

*Los Angeles, CA — Chapter 1.*

---

The Thursday Dispatch of Week 6 retells the circle question from the event and invites the full Collective to answer it in a reply.

The chapter WhatsApp group goes live. The chapter lead sends the link to all 12–15 founding chapter dads.

---

**WEEKS 7–9 — Deepening Before the Drop (Days 43–63)**

The brand does not mention a product drop at any point in this window. Content cadence continues. Thursday Dispatches send.

Week 7: a behind-the-scenes Thursday Dispatch — the brand team shares what they've learned in the first six weeks. Not metrics. Stories: the dad who replied to the first dispatch at 6 AM from a parking lot waiting for warmups to start. The founding dad in Phoenix who sent a photo of his kid's first goal and asked if the brand wanted to use it.

Week 8: the brand publishes a short TikTok — 45 seconds — that is the only explicit brand identity piece so far. It explains what Sideline Papi is in the brand's voice: *"We're not a brand for dads who have it figured out. We're a brand for dads who show up anyway."* This video is the brand's first piece of conversion-adjacent content — not selling a product, but selling belonging.

Week 9: the second Thursday Dispatch is the product tease. It says nothing about a product. It says this: *"Hay algo que hemos estado haciendo en silencio por meses. El jueves que viene, te contamos. / There's something we've been building quietly for months. Next Thursday, we tell you."* That's it. No reveal. No countdown. Just presence.

---

**WEEK 10 — The Drop (Days 64–70)**

Thursday of Week 10: the drop preview email goes to The Collective (see full email below). 48-hour Collective window opens.

Saturday of Week 10: the drop opens to the public. Collective window closes.

The Week 10 Saturday Story series documents the first-ever purchase — a founding chapter dad who bought El Papi Tee being photographed wearing it at his kid's game. The caption: *"El primero. / The first one."*

---

**WEEKS 11–13 — Post-Drop Community Integration (Days 71–90)**

The week after the drop, the Thursday Dispatch addresses the drop without making it about the drop: *"Gracias a los que compraron. Gracias a los que no pudieron. Esto no empezó como una tienda y no va a terminar como una. / Thank you to those who bought. Thank you to those who couldn't. This didn't start as a store and it's not going to end as one."*

Days 71–90: the brand begins chapter expansion conversations in Houston and Chicago (per the expansion sequence). At least two chapter lead candidates in each city have been identified by Week 12 — sourced from Collective members who, in reply to Thursday Dispatches, mentioned their city.

By Day 90: Collective list target is 400 members. Chapter 1 has held two events. Drop 1 has sold at minimum 60% of units. The brand team conducts an internal 90-day review — not public-facing — using the six health metrics defined in Section 4.

---

### The Moment the Community Is "Officially" Open

The community does not have a single launch day. It opens gradually, the way trust is built: first with 12–15 people who are personally known, then with their networks, then with the public.

The moment it is functionally "public" is the Week 2 first post — when the Instagram goes live and the landing page is active.

The moment it becomes a community rather than a list is Week 6, when the first chapter event happens and the circle question is asked.

The transition from private relationship-building to public brand is never announced because it was never a secret. The brand simply started talking to people before it had a platform, and by the time the platform existed, the people were already there.

---

### Week 10 Drop Announcement Email to The Collective

**Subject line:** Ya llegó. / It's here. La Primera Bajada — for you first.

**Preview text:** 48 hours before anyone else. Aquí va la historia.

---

Oye, Colectivo —

Llevamos diez semanas hablando sin vender nada.

Diez semanas de preguntas los jueves. De fotos del campo los sábados. De escuchar cómo les fue en el primer partido, en el segundo, en el que se empató en el último minuto y todos fingieron que no estaban nerviosos.

We've been building something this whole time. And now it's ready.

---

**La Primera Bajada — The Founding Drop.**

Tres piezas. Hecho para el campo. No para el gym, no para el mall. Para donde tú ya estás todos los sábados.

---

**El Papi Tee**
Next Level 6210. Warm Cream. Corte suave, no rígido — el tipo de playera que se pone el sábado y termina siendo la playera de todos los sábados.

100 unidades. Nada más.

**El Casquete / The Cap**
Richardson 112. Forest Green / Khaki. Structured front, unstructured feel. The cap that says you've been out here, not that you just started.

75 units.

**El Papá de Guardia Hoodie**
IND4000. Charcoal. Heavy enough for a February morning on the sideline. Soft enough that your kid borrows it after the game and you let them.

75 units.

**El Pack Fundador / The Founding Member Bundle**
Tee + Cap. $72. 50 bundles. If you've been with The Collective from the start, this one's yours.

---

Todo está bordado, serigrafíado, o impreso en los EE.UU. Nada de dropship. Nada genérico.

Cada pieza tiene el Sideline Papi mark y nada más — porque el papá que lo lleva puesto no necesita que la ropa grite.

---

**Tu ventana: 48 horas / Your window: 48 hours.**

Como miembro del Colectivo, tienes acceso ahora — hoy, jueves, a las 8 AM CT.

El viernes a las 8 AM CT, el carrito abre al público.

No hay garantía de que quede algo.

Las 100 playeras, las 75 gorras, las 75 hoodies — eso es todo lo que existe. No hay restock planificado.

Si algo se agota antes de que llegues, mándanos un DM. Tenemos una lista de espera que abrimos primero al Colectivo si hay cancelaciones. No es una promesa — es una práctica.

---

*To shop the drop: [LINK]*

*Ventana del Colectivo: jueves 8 AM CT — viernes 8 AM CT*
*Apertura pública: viernes 8 AM CT*

---

Una cosa más.

Si compras algo y lo llevas al campo el sábado: mándanos la foto. No la vamos a publicar sin pedirte permiso. Pero la queremos ver.

El primer papá en el campo con una pieza de La Primera Bajada aparece en el post del domingo.

Ese es el único marketing que necesitamos.

---

Gracias por estar aquí antes de que hubiera algo aquí.

— El equipo de Sideline Papi

*PD: Si no puedes comprar esta vez — we see you. El Colectivo no cambia. El jueves que viene, hay otra pregunta.*

---

*The Collective · Sideline Papi*
*Unsubscribe · Update language preference / Actualiza tu idioma preferido*