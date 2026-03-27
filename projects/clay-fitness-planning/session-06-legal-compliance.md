# Session 06 — Legal & Compliance
**Agent**: Legal Compliance Checker
**Input**: Sessions 00–05
**Date**: 2026-03-27

---

> **Standard Disclaimer**: This session represents a structured analysis for planning purposes. It is not legal advice. Consult qualified legal counsel before making decisions based on this analysis.

---

## Priority Risk Areas

### 1. HIPAA — The Most Misunderstood Risk

**The short answer: Clay is almost certainly NOT a covered entity under HIPAA, and HIPAA does not directly apply.**

HIPAA applies to covered entities (healthcare providers, health plans, healthcare clearinghouses) and their business associates. A consumer fitness app that the user downloads and uses independently — without any arrangement with a healthcare provider — is generally not subject to HIPAA.

**However, there is nuance**:
- If Clay pursues the GLP-1 partnership opportunity mentioned in Sessions 01 and 05 (telehealth providers referring users to Clay as part of treatment), that partnership arrangement may create a business associate relationship that triggers HIPAA obligations
- If Clay ever stores workout data on a server and that server holds data alongside any health provider context, the analysis changes
- The on-device-first architecture (Sessions 00, 03) is the single best legal decision in the entire product — it minimizes the applicability of health data regulations because Clay is not storing protected health information on behalf of healthcare providers

**Recommendation**: Build and launch as a consumer app with no healthcare provider partnerships initially. If the GLP-1 partnership opportunity is pursued in Year 2, engage HIPAA counsel before that conversation advances.

### 2. Apple HealthKit & App Store Guidelines

This is the most immediate compliance surface for Clay.

**App Store Guideline 5.1.1 (Data Collection and Storage)**:
- Apps must not use data collected via HealthKit for advertising or data brokering — ever. This is an App Store violation with immediate removal risk.
- Clay's on-device-first, no-advertising-model architecture is directly compliant. There is no monetization path in the brief that involves health data monetization. This should be explicit in the Privacy Policy.

**App Store Guideline 5.1.2 (Health and Usage Data)**:
- Apps requesting HealthKit permissions must use those permissions for the stated purpose only
- Clay must request *only* the permissions it actually uses, and the purpose must match the app's stated function
- The "progressive permission requests" strategy recommended in Sessions 03 and 04 is not only a UX best practice — it's better Apple compliance. Requesting permissions before they're needed triggers reviewer scrutiny.

**HealthKit Write-Back**:
- Writing workout sessions back to HealthKit requires `HKWorkoutActivityType.traditionalStrengthTraining` and energy/duration metadata
- Clay must accurately represent the workout data it writes. Fabricated calorie estimates or duration inflation creates liability.
- Best practice: surface estimated calorie calculation methodology transparently to users ("estimated based on body weight and session duration")

**WatchOS Extension**:
- If the Clay watch app accesses HealthKit from the watch, a separate HealthKit entitlement is required for the watch extension
- Watch apps have additional privacy review scrutiny — background data collection on watch requires additional justification

### 3. Privacy Policy Requirements

**Minimum required disclosures**:
- What data Clay collects (event log, workout history, Why text, voice note transcriptions)
- Where data is stored (on-device + CloudKit, if used)
- Whether data is shared with third parties (it shouldn't be — this is Clay's competitive advantage to state plainly)
- How users can delete their data (export + account deletion must be honored within 30 days per CCPA/GDPR)
- Oura/WHOOP integration: users must be informed that connecting these services means Clay reads data from those providers

**CCPA (California Consumer Privacy Act)**:
- If Clay has any California users (it will), CCPA applies
- Users must be able to request data deletion
- The on-device architecture simplifies this: "Delete app = delete all data" is a clean compliance story
- A "Delete my data" option in app settings is required

**GDPR (EU)**:
- Even if Clay initially targets US only, EU users can and will download it
- GDPR applies to EU users regardless of where the company is incorporated
- Required: data deletion mechanism, clear consent language, data processing disclosures
- On-device architecture again helps: if data never leaves the device except to the user's own CloudKit account, the GDPR footprint is minimal
- If Clay ever adds analytics (even privacy-respecting like TelemetryDeck), a proper GDPR-compliant analytics disclosure is needed

### 4. Medical Disclaimer Requirements

**The intelligence layer creates the primary liability surface.**

The whisper content — "Your top-set weight has been flat for three weeks. This is a common inflection point in ladder models." — is fitness guidance. It is NOT medical advice. The distinction matters legally.

**Required safeguards**:
1. **Standard disclaimer**: A Terms of Service provision stating that Clay is a fitness tracking and planning tool, not a medical device, and does not provide medical advice. Users should consult healthcare professionals for medical concerns.
2. **In-app onboarding acknowledgment**: Brief, non-intrusive acknowledgment during onboarding that Clay is not a medical device and doesn't diagnose or treat conditions.
3. **Injury flag protocol**: If a user voice-notes "shoulder pain" or logs feel scores of 1 repeatedly, Clay should NOT attempt to diagnose. The app should note the pattern and gently suggest: "Consistent discomfort signals are worth a conversation with a healthcare provider." It should not say "You may have rotator cuff tendinitis."
4. **Whisper editorial guidelines**: Every whisper in the library should be reviewed to ensure it makes no medical claims. "Evidence suggests" is fine. "Clinical studies show X reduces injury risk by Y%" without a citation is not.

**The curation-over-synthesis principle from Session 01 is the right legal position**: Clay curates information and points to evidence. It does not synthesize new claims. This limits liability while maintaining utility.

### 5. App Store In-App Purchase Compliance

**Apple's IAP requirements**:
- Clay Pro subscription must be implemented via Apple's StoreKit (required for in-app subscriptions on iOS)
- 30% Apple cut on monthly, 15% after year one (small developer rate may apply)
- Free trial period (if offered) must be clearly disclosed in App Store listing
- Subscription cancellation must be accessible via iOS Settings → Subscriptions (Apple manages this)
- Pricing must comply with App Store regional pricing tiers

**Pricing recommendation from a compliance standpoint**: $9.99/month and $79.99/year are standard App Store price tiers. No issues.

### 6. Voice Recording (Voice Notes Feature)

**iOS Privacy**:
- Microphone permission (`NSMicrophoneUsageDescription`) is required for voice notes
- The permission request description must accurately describe use: "Clay uses your microphone to attach voice notes to logged sets"
- If transcription is on-device (Speech framework), no additional data transmission disclosure is needed
- If transcription uses a cloud API (e.g., OpenAI Whisper API), that must be disclosed

**Recommendation**: Use Apple's `SFSpeechRecognizer` (on-device for short utterances) for voice note transcription. This keeps voice data on-device, avoids third-party disclosure requirements, and aligns with the privacy positioning. On-device Speech framework handles gym-quality audio well for short phrases.

### 7. Intellectual Property

**The programming taxonomy**:
- Naming programs ("ladder," "5/3/1," "GZCLP," etc.) is descriptive, not trademark infringement
- However, if Clay uses specific copyrighted program content (e.g., exact rep/set schemes from a purchased program), that may require licensing or transformative use analysis
- Recommendation: Clay's taxonomy should classify *methodologies* (ladder progressions, linear progressions, etc.) — it should not reproduce any specific author's copyrighted program content
- The whisper library should cite published research by journal/author name, not reproduce copyrighted text

**Program import feature (if built)**:
- If users upload PDFs of purchased programs for Clay to parse, this is user-initiated and generally protected
- Clay should not store the source document — only the structured data extracted from it

---

## Compliance Checklist (Pre-Launch)

| Item | Priority | Status |
|---|---|---|
| Privacy Policy (CCPA + GDPR compliant) | P0 | Needed |
| Terms of Service (medical disclaimer, IAP terms) | P0 | Needed |
| HealthKit entitlements (phone + watch) | P0 | Needed |
| Progressive HealthKit permission requests with clear descriptions | P0 | Design decision |
| In-app purchase via StoreKit | P0 | Engineering |
| Data deletion mechanism ("Delete my data") | P0 | Engineering |
| Medical disclaimer in onboarding | P1 | Design |
| Whisper library editorial review (no medical claims) | P1 | Editorial |
| Microphone permission description | P1 | Engineering |
| Analytics disclosure (if any) | P1 | Decision pending |
| CloudKit data handling disclosure | P2 | Privacy Policy |
| HIPAA analysis before any healthcare partnership | P2 | Pre-partnership |

---

## Session 06 Summary

The legal risk profile for Clay is **manageable and well below average for a health-adjacent app**. The on-device-first, no-advertising, no-data-brokering architecture eliminates the most common legal failure modes in consumer health apps. The two areas requiring attention before launch:

1. **Whisper library editorial review**: Every insight string must be reviewed through a "is this medical advice?" filter before shipping. One overreaching whisper about injury or health conditions creates liability and undermines trust simultaneously.
2. **Privacy Policy and Terms of Service**: Must be drafted before App Store submission. Not boilerplate — Clay's privacy architecture is a genuine differentiator and the privacy policy should say so plainly.

The GLP-1 partnership opportunity (Year 2) will require separate HIPAA analysis if pursued. Do not pursue it without dedicated legal counsel.

---

*Passing to Session 07: MVP Scope*
