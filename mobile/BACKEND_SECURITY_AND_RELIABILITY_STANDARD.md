# Backend Security and Reliability Standard

This is the backend bar before real Play Store testers use IronLog.

## Baseline Already Applied

- `helmet` security headers.
- API request-size limit.
- Mongo query sanitization.
- Global API rate limiting.
- Stricter auth rate limiting.
- AI-heavy route rate limiting for setup/chat/replan.
- Server no longer falls back to a hardcoded JWT secret.
- `server/.env.example` includes `JWT_SECRET`.
- `npm audit --omit=dev` passes in both root and server.

## Immediate Required Environment Fixes

Set these in Render:

```bash
MONGO_URI=
GROQ_API_KEY=
JWT_SECRET=
PORT=3001
CLIENT_URL=*
```

`JWT_SECRET` must be at least 32 random bytes. Generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The current task board notes that Groq calls failed with `invalid_api_key`. That must be fixed before user testing.

## P0 Backend Work Before Closed Testing

### 1. Add Input Validation

Add schema validation to every write endpoint:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `PATCH /api/auth/me`
- `POST /api/setup`
- `POST /api/chat`
- `POST /api/log`
- `POST /api/replan`
- `POST /api/replan/confirm`

Use Zod or a small local validator. Reject unknown fields where practical.

### 2. Add Integration Smoke Tests

Create a backend test runner or script that checks:

- signup
- login
- `/api/auth/me`
- onboarding patch
- setup failure handling when Groq is unavailable
- plan today
- log session
- state missed count
- free user gets `PRO_REQUIRED`
- Pro user can access replan/progress

Do not rely only on manual curl.

### 3. Production Error Shape

All production errors should be stable codes:

```json
{ "error": "SOME_CODE" }
```

Never return raw `err.message` for database, auth, JWT, Groq or validation internals in production.

### 4. Observability

Add:

- request IDs
- structured logs
- Sentry or equivalent error tracking
- uptime monitoring for `/ping`
- alert when Groq failures exceed threshold
- alert when Mongo connection fails

### 5. Account and Data Deletion

Google Play expects a clear data-deletion path when user data is collected.

Add one of:

- in-app delete account endpoint, or
- documented support email/process in privacy policy and app settings.

Recommended endpoint:

```http
DELETE /api/auth/me
```

It should delete or anonymize:

- user
- conversations
- plans
- logs
- adaptations

### 6. Subscription Verification

Before charging users:

- Do not trust client-side `isPro`.
- Add RevenueCat webhook or verified receipt sync.
- Store entitlement ID, expiry, last verification timestamp.
- Gate backend features from server-side subscription state only.

## Mobile Security Alignment

Use OWASP MASVS as the verification model:

- MASVS-STORAGE: tokens and sensitive data should not be stored insecurely.
- MASVS-AUTH: server validates authorization on every protected route.
- MASVS-NETWORK: production API uses HTTPS only.
- MASVS-PLATFORM: no unnecessary native permissions.
- MASVS-CODE: no secrets in client bundle.
- MASVS-PRIVACY: disclose data collection clearly.

Frontend should migrate auth token storage from AsyncStorage to Expo SecureStore before public launch if feasible.

## API Abuse Protections

Current rate limits are conservative v1 defaults:

- `/api/auth`: 20 requests / 15 minutes
- `/api`: 300 requests / 15 minutes
- AI-heavy routes: 12 requests / minute

After first tester data, tune these based on real traffic.

## Deployment Checklist

- Render paid instance enabled.
- `NODE_ENV=production`.
- `JWT_SECRET` set.
- valid `GROQ_API_KEY`.
- MongoDB Atlas backup enabled.
- MongoDB Atlas network access reviewed.
- CORS policy reviewed.
- no `.env` committed.
- health check returns 200.
- API logs do not contain tokens, passwords or raw LLM prompts with excessive personal data.

## Verification Commands

Run from repo root:

```bash
npm audit --omit=dev
npx expo-doctor
```

Run from `server/`:

```bash
npm audit --omit=dev
node --check server.js
node --check middleware/auth.js
node --check middleware/security.js
```

## Current Verification Result

As of 2026-05-15:

- root `npm audit --omit=dev`: pass
- server `npm audit --omit=dev`: pass
- `npx expo-doctor`: pass
- server syntax checks: pass

