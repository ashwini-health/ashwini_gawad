# IronLog End-to-End Launch Plan

Date: 2026-05-15

## Decision

IronLog should proceed as an adaptive strength-training app, not a generic workout tracker.

The marketable promise is:

> A training coach that builds your program, logs sessions through chat, and fixes the week when life ruins the plan.

The first Play Store test should prove this core loop:

1. User signs up.
2. User completes onboarding.
3. AI builds a profile-matched program.
4. Today tab shows a clear workout.
5. User logs through chat.
6. Missed session becomes visible.
7. Fix My Week proposes a diff.
8. User confirms or declines.
9. History shows progress.
10. Pro gate appears at the right moment.

If this loop is not excellent, do not add more features.

## Current State

Backend P1-P4 is mostly implemented and committed:

- Exercise database routes exist.
- AI program generation exists.
- Chat prompt is generalized.
- Missed-session detection exists.
- Replan diff/confirm exists.
- e1RM progress endpoint exists.
- Pro gate middleware and subscription status exist.

Frontend is not ready:

- Several screens still contain Smolov Jr, headache, bench-specialization and broken text-encoding remnants.
- `store/appStore.ts` does not fully match the new backend response shape.
- Today tab does not expose Fix My Week.
- History tab still behaves like a bench-specific chart instead of a general progress surface.
- Upgrade/paywall flow is not built.
- Offline queue is not built.
- UI is functional but not marketable enough for Play Store screenshots.

Infrastructure is close but not launch-ready:

- Render free tier creates first-request cold starts.
- Groq key must be valid in production.
- `JWT_SECRET` must be set in Render before auth works with the hardened backend.
- Play Console assets, privacy policy and Data Safety are still missing.

## Non-Negotiable Launch Gates

Do not submit to Play internal testing until all of these are true:

- `npx expo-doctor` passes.
- Root `npm audit --omit=dev` returns 0 vulnerabilities.
- Server `npm audit --omit=dev` returns 0 vulnerabilities.
- Android preview build installs on a physical Android phone.
- Signup, login, logout, onboarding and setup work against the deployed backend.
- Chat can stream a response and save a completed session.
- Invalid Groq key, Mongo outage and API timeout show graceful user-facing errors.
- No screen contains Smolov Jr, headache grading, mojibake/broken encoding, or bench-only assumptions unless the user actually has a bench program.
- User can request account/data deletion through an in-app or web support path.
- Privacy policy URL is live.
- Play Data Safety matches actual data collection.

## Build Sequence

### Phase 0 - Stabilize Release Plumbing

Owner: Codex/backend + human

1. Set Render env vars:
   - `MONGO_URI`
   - `GROQ_API_KEY`
   - `JWT_SECRET`
   - `PORT=3001`
   - `CLIENT_URL=*` for mobile-only testing, then narrow when web surfaces exist.
2. Upgrade Render to a paid instance before public testing.
3. Confirm MongoDB Atlas IP/network access and backup settings.
4. Build a preview APK with EAS and install on two Android devices.

### Phase 1 - Claude Frontend Rebuild

Owner: Claude/frontend

Use `CLAUDE_FRONTEND_MASTERCLASS_BRIEF.md`.

Required output:

- App-wide design system.
- Rebuilt auth, onboarding, setup, Today, Chat, History, Flags and Upgrade UX.
- Fix My Week UI.
- Progress chart UI.
- Pro-required modal.
- Empty/loading/error/offline states.
- Screenshot-ready Play Store surfaces.

Claude must not modify `server/`.

### Phase 2 - Backend Hardening and Reliability

Owner: Codex/backend

Use `BACKEND_SECURITY_AND_RELIABILITY_STANDARD.md`.

Required before closed testing:

- Add schema validation to write endpoints.
- Add integration smoke tests for auth/setup/chat/log/replan/progress.
- Add structured error handling without leaking stack traces.
- Add monitoring and alerting.
- Add account deletion route or documented support deletion workflow.
- Add RevenueCat verification when subscription work begins.

### Phase 3 - Play Store Internal and Closed Testing

Owner: human + Claude/Codex support

Use `PLAY_STORE_USER_TESTING_RUNBOOK.md`.

Test group:

- 5 internal technical testers first.
- 12+ closed testers for 14 continuous days if the Play account requires it.
- Minimum target: 20 testers to avoid borderline compliance and get better feedback.

### Phase 4 - Public Launch

Only after testing shows:

- Day-1 onboarding completion above 70%.
- At least 70% of testers understand what to do on Today screen without explanation.
- Chat logging succeeds for 90%+ attempted logs.
- Fix My Week is understood and accepted by testers.
- No P0 crashes across the latest build.

## What Not To Build Before Testing

- Social feed.
- Nutrition tracking.
- Apple Health / Google Fit sync.
- Voice mode.
- Multi-program library.
- Wearables.
- iOS production.

These can wait until the core adaptive loop is proven.

