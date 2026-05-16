# Claude Frontend Masterclass Brief

Read this before touching frontend code.

## Scope

You are the frontend-agent for IronLog.

You own:

- `app/`
- `components/`
- `store/`
- `api/`
- `hooks/`
- `assets/`
- `app.json` only when required for mobile UX/config

You do not own:

- `server/`
- MongoDB schemas
- backend route logic
- `.env` files

Before coding, read:

1. `CLAUDE.md`
2. `TASKS.md`
3. `IRONLOG_END_TO_END_LAUNCH_PLAN.md`
4. This file

## Product Positioning

IronLog is not a generic fitness app.

The product is:

> Adaptive strength training for lifters whose schedule, fatigue and pain do not follow the spreadsheet.

The UI must make the app feel like a serious training cockpit:

- fast
- dense but readable
- calm under pressure
- precise
- premium enough for Play Store screenshots
- not cartoonish
- not a generic wellness dashboard

## Visual Direction

Use a dark performance theme with strong information hierarchy.

Recommended palette:

- Background: near black `#07080A`
- Surface: graphite `#111318`
- Elevated surface: `#171A21`
- Border: `#252A33`
- Primary action: iron orange `#FF6A1A`
- Positive: `#22C55E`
- Warning: `#F59E0B`
- Danger: `#EF4444`
- Primary text: `#F8FAFC`
- Secondary text: `#A8B0BD`
- Muted text: `#69717F`

Rules:

- Use orange sparingly for action and live status, not everywhere.
- No gradient-heavy hero screens.
- No decorative blobs/orbs.
- No marketing copy inside the app after onboarding.
- Cards should be 12-16px radius, not bubbly.
- Dense workout data must remain scannable on small Android screens.
- Every screen needs loading, empty, error and offline states.

## App Architecture Requirements

Update `store/appStore.ts` to match the backend contract:

```ts
type ProgramState = {
  currentDayIndex: number;
  currentMicrocycle: number;
  startDate?: string;
  programName?: string;
  missedSessionCount?: number;
  flags: Record<string, boolean | number | string | null | undefined>;
};
```

Update `api/index.ts`:

- Keep token handling.
- Add typed wrappers for:
  - `getState()`
  - `getTodayPlan()`
  - `getProgress(lift)`
  - `requestReplan(reason, missedPlanIds?)`
  - `confirmReplan(diffToken)`
  - `getSubscriptionStatus()`
- Handle `PRO_REQUIRED` consistently.
- Implement offline message queue for chat per `TASKS.md` P5-002.
- Use Expo SecureStore for auth tokens if possible. If not, leave a TODO and document why.

## Required Screens

### Auth

Screens: `app/(auth)/login.tsx`, `app/(auth)/signup.tsx`

Goal: trustworthy, fast entry.

Required:

- Strong visual identity.
- Clear value prop: "AI strength coach that adapts your week."
- Password errors must be readable.
- No vague "something went wrong".
- Disable submit while loading.

### Onboarding

File: `app/onboarding.tsx`

Goal: collect enough data to build a good program without feeling like paperwork.

Required:

- Stepper with clear progress.
- Goal, experience, equipment, days/week.
- Optional current lifts and limitations/injuries.
- Explain optional fields in short helper text.
- Preserve partially entered data while moving between steps.
- Final CTA: "Build my program".

### Setup

File: `app/setup.tsx`

Required:

- Remove all Smolov Jr language.
- Title: "Build your first program".
- Explain that the backend generates a 4-week plan from profile, equipment and schedule.
- Show start-date picker.
- Show progress state while `/api/setup` runs.
- If Groq/backend fails, show a clear retry state.

### Today

File: `app/(tabs)/today.tsx`

This is the product's main screen.

Required hierarchy:

1. Program name and week/day context.
2. Today's session or rest day.
3. Exercise list with sets, reps, load, RPE/rest.
4. Active flags.
5. Missed-session banner when `missedSessionCount > 0`.
6. Entry point to Fix My Week.

Must remove:

- `MC 1/3 Day 1/8` hardcoding.
- Smolov Jr button text.
- Headache-specific language unless returned as a generic flag.
- Bench-only assumptions.

### Fix My Week

Files:

- `app/(tabs)/today.tsx`
- `components/ReplanDiffCard.tsx`

Required flow:

1. Banner: "You missed {n} session(s). Fix your week?"
2. Modal reason input: "What got in the way?"
3. Call `POST /api/replan`.
4. If 403 `PRO_REQUIRED`, open Upgrade modal.
5. Show diff card:
   - Summary
   - Rescheduled sessions
   - Removed sessions
   - Added sessions
6. Confirm calls `POST /api/replan/confirm`.
7. Decline dismisses without mutation.
8. Token-expired state tells user to generate a fresh plan.

### Chat

File: `app/(tabs)/index.tsx`

Required:

- Keep streaming.
- Make session confirmation card look premium and trustworthy.
- Remove raw `LOG_DATA` artifacts from the UI.
- Generalize confirm rows beyond bench/squat/deadlift where possible.
- Add rest timer after saving a session.
- Show offline queued message state.
- Show AI unavailable / rate limit / auth expired distinctly.

### History

File: `app/(tabs)/history.tsx`

Required:

- Lift selector: Bench, Squat, Deadlift, Overhead Press.
- Use `GET /api/progress?lift=...`.
- If Pro-gated response returns `PRO_REQUIRED`, show upgrade modal or basic free state.
- Chart must have readable axes/labels on Android.
- Show sessions list below chart.
- Empty state: "No sessions logged yet."

### Flags

File: `app/(tabs)/flags.tsx`

Required:

- General active flags list.
- No headache-only framing.
- Severity states: info, warning, stop.
- Explain what the app will do next: hold, reduce, replan, or advise medical evaluation.

### Upgrade

Files:

- `components/UpgradeModal.tsx`
- `store/subscriptionStore.ts`

Required:

- Explain Pro around outcomes:
  - Fix My Week
  - advanced progress analytics
  - future adaptive tools
- Do not oversell medical or guaranteed results.
- RevenueCat integration will be blocked until human creates product/key.
- Handle restore purchases.

## Play Store Screenshot Scenes

Build UI with these screenshots in mind:

1. Onboarding goal selection.
2. Today workout with clear exercise prescription.
3. Chat logging a completed session.
4. Save Session confirmation card.
5. Missed-session banner.
6. Fix My Week diff card.
7. Progress chart.
8. Upgrade modal.

Every screenshot should communicate the product without needing a caption.

## Acceptance Checklist

Before handing back:

- `npx expo-doctor` passes.
- No broken encoding characters appear in visible app text.
- Search for and remove stale strings:
  - `Smolov`
  - `headache`
  - `bench specialization`
  - `microcycle 1/2/3` if hardcoded
- App can run against deployed backend.
- Screens work on small Android viewport.
- Form buttons cannot be double-submitted.
- All API failures show useful states.

