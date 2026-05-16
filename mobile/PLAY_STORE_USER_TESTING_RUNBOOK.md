# Play Store User Testing Runbook

Use this when preparing IronLog for Android testing and Play Store deployment.

## Official Requirements To Track

- Google Play target API level: new apps and updates must target Android 15 / API level 35 or higher for Google Play submission. Source: https://developer.android.com/google/play/requirements/target-sdk
- New personal Play developer accounts may need closed testing with at least 12 opted-in testers for 14 continuous days before production access. Source: https://support.google.com/googleplay/android-developer/answer/14151465
- Data Safety form is required and must accurately explain user data collection, sharing and protection. Source: https://support.google.com/googleplay/android-developer/answer/10787469
- Use OWASP MASVS as the mobile security verification standard. Source: https://mas.owasp.org/MASVS/

## Before First Internal Build

1. Confirm `npx expo-doctor` passes.
2. Confirm root and server audits return 0 vulnerabilities.
3. Confirm Render env vars are set.
4. Confirm Groq key works.
5. Confirm MongoDB Atlas is reachable from Render.
6. Confirm app uses production API URL in `app.json`.
7. Confirm no visible screen contains old Smolov Jr/headache copy.

## EAS Build Commands

Preview APK:

```bash
eas build --platform android --profile preview
```

Production AAB:

```bash
eas build --platform android --profile production
```

Submit to internal track:

```bash
eas submit --platform android --profile production
```

`eas.json` currently submits Android production builds to the internal track.

## Internal Test Track

Use this before closed testing.

Tester group:

- founder
- 2 technical testers
- 2 real lifters

Required tasks:

- install app
- signup
- complete onboarding
- generate program
- inspect Today tab
- chat with coach
- log a session
- miss/reschedule a session
- open History
- hit a Pro-gated feature
- logout/login again

Exit criteria:

- no crash
- no auth loop
- no blank screen
- no broken API error
- no visible stale copy
- no tester confusion on what to do next

## Closed Testing

If Play Console requires closed testing, recruit at least 12 testers and keep them opted in continuously for 14 days. Use 20 testers if possible.

Tester profile:

- 8 lifters who currently train 2-5 days/week
- 4 beginners or inconsistent gym users
- 4 Android devices from different brands
- 2 poor-network testers
- 2 testers outside the founder's direct circle if possible

Collect feedback daily:

- Did onboarding make sense?
- Did the program match your equipment?
- Did Today tell you exactly what to do?
- Was chat logging easier than forms?
- Did Fix My Week feel useful?
- Would you pay for Pro?
- What screen confused you?
- What made the app feel untrustworthy?

## Store Listing Assets

Minimum screenshot set:

1. Onboarding goal selection.
2. Today workout prescription.
3. Chat session logging.
4. Save Session confirmation.
5. Missed-session banner.
6. Fix My Week diff.
7. Progress chart.
8. Upgrade modal.

Feature graphic:

- 1024 x 500
- Copy should focus on adaptive training, not generic AI.

Short description draft:

> AI strength coach that adapts when life ruins your plan.

Full description angle:

- Personalized strength programs.
- Conversational workout logging.
- Fix My Week adaptive replanning.
- Progress tracking.
- Safety-aware pain/fatigue handling.

Avoid:

- guaranteed results
- medical claims
- "doctor-approved"
- nutrition claims
- claims that the AI replaces a human professional

## Data Safety Draft Inputs

IronLog currently collects:

- email
- name
- password hash on backend
- age/sex/body metrics if supplied
- training goals
- equipment access
- current lifts
- injury/limitations notes
- workout logs
- chat messages with AI coach
- subscription status when payments are integrated

Data is used for:

- account management
- program generation
- chat coaching
- workout logging
- adaptive replanning
- progress analytics
- subscription entitlement

Data is not currently used for:

- ads
- selling to third parties
- nutrition/medical diagnosis

The privacy policy must match this exactly.

## Production Access Request

Before requesting production access, prepare:

- test summary
- tester count and duration
- issues found and fixed
- screenshots of real app flows
- privacy policy URL
- support email
- data deletion instructions
- app category
- content rating questionnaire
- Data Safety form

