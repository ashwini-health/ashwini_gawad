# Codex Task — IronLog Phase 1: General Program Engine

> **How to run:** From `C:\Users\theof\ironlog-mobile\` run:
> `codex --approval-mode full-auto "$(Get-Content CODEX_TASK.md -Raw)"`

---

## Your job

You are the **backend-agent** for IronLog. Read `CLAUDE.md` and `TASKS.md` fully before touching anything.

You own everything inside `server/`. Do NOT touch `app/`, `store/`, `api/`, or `components/`.

Work through the tasks below **in order** — each one depends on the previous.
Commit after each task. Test manually using curl or a REST client.

The backend runs on Node.js (ESM). Start it: `cd server && node server.js`
MongoDB connection string is in `server/.env` (do not modify it).

---

## Task 1 — P1-001: Import exercise database

**Read:** `TASKS.md → P1-001` for full spec.

**What to build:**

1. Create `server/models/Exercise.js` with this Mongoose schema:
```js
import mongoose from 'mongoose';
const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aliases: [String],
  primaryMuscle: String,
  secondaryMuscles: [String],
  equipment: { type: String, enum: ['barbell','dumbbell','bodyweight','cable','machine','kettlebell','band','other'] },
  category: { type: String, enum: ['compound','isolation','cardio','flexibility'] },
  instructions: String,
  difficulty: { type: String, enum: ['beginner','intermediate','advanced'] },
});
export default mongoose.model('Exercise', ExerciseSchema);
```

2. Create `server/data/import-exercises.js` — fetches the public exercise JSON from
   `https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises.json`
   and inserts into MongoDB. Run once with: `node server/data/import-exercises.js`

3. Create `server/routes/exercises.js`:
   - `GET /api/exercises?muscle=chest&equipment=barbell&limit=20` → Exercise[]
   - `GET /api/exercises/search?q=squat` → Exercise[]

4. Register in `server/server.js`:
   ```js
   import exerciseRoutes from './routes/exercises.js';
   app.use('/api/exercises', requireAuth, exerciseRoutes);
   ```

**Acceptance:** `GET /api/exercises?equipment=bodyweight` returns bodyweight exercises.
`GET /api/exercises/search?q=press` returns bench press, overhead press, etc.

---

## Task 2 — P1-002: AI-based program generator

**Read:** `TASKS.md → P1-002` for full spec and the JSON schema for LLM output.

**What to change:** `server/routes/setup.js`

Replace the Smolov Jr hardcoded logic with:
1. Read the authenticated user's full profile from MongoDB
2. Call Groq `llama-3.3-70b-versatile` with `response_format: { type: 'json_object' }` using the system prompt in TASKS.md
3. Parse the JSON response and insert all sessions as `Plan` documents
4. Update `ProgramState.phase` to the generated `programName`
5. Do NOT delete `server/data/program.js` — just stop importing it in setup.js

**Update** `server/models/ProgramState.js`:
- Remove hardcoded `phase: 'smolov_jr_bench'` default
- Add `programName: String`
- Remove `benchTrainingMax`, `squatTrainingMax`, `deadliftTrainingMax` defaults

**Acceptance:**
- User with `goal=hypertrophy, equipment=dumbbells_only, daysPerWeek=3` gets a 3-day dumbbell program
- `ProgramState.phase` shows generated program name, not 'smolov_jr_bench'

---

## Task 3 — P1-003: Generalize the AI system prompt

**Read:** `TASKS.md → P1-003` for full spec.

**File:** `server/routes/chat.js` — the `buildSystemPrompt()` function.

**What to change:**
- Remove ALL references to "Smolov Jr", "microcycle 1/2/3", "bench specialization", headache grading
- Replace hardcoded bench flags with generic flags display
- Use `programState.programName` in the program context block
- Show today's actual exercises from the Plan document (whatever the AI generated)
- Keep the LOG_DATA schema output unchanged — same format, just different exercise names

**Acceptance:** A hypertrophy user's system prompt contains no mention of bench specialization.

---

## Task 4 — P2-001: Missed session detection

**Read:** `TASKS.md → P2-001` for full spec.

**File:** `server/routes/state.js`

When `GET /api/state` is called:
1. Query Plan documents where `status: 'planned'` AND `plannedDate < now - 12 hours`
2. Update those to `status: 'missed'`
3. Add `missedSessionCount: number` to the state response

**Acceptance:** If a planned session date passed 12+ hours ago, state returns `missedSessionCount > 0`.

---

## Task 5 — P2-002: Replan endpoint

**Read:** `TASKS.md → P2-002` for the full API contract and logic.

**Create:** `server/routes/replan.js`

Two endpoints:
- `POST /api/replan` — calls Groq with user profile + missed sessions → returns a diff (does NOT apply yet)
- `POST /api/replan/confirm` — looks up diffToken → applies changes to Plan docs → consumes token

Store diffTokens in a module-level `Map` (simple, fine for v1). TTL 10 minutes — check on confirm.

**Register in** `server/server.js`.

**Acceptance:**
- `POST /api/replan` with reason "knee pain" returns a diff
- `POST /api/replan/confirm` with the token updates Plan documents
- Using the same token twice returns an error (token consumed after first use)

---

## Task 6 — P3-001: e1RM progress endpoint

**Read:** `TASKS.md → P3-001` for full spec.

**Create:** `server/routes/progress.js`

`GET /api/progress?lift=bench&from=2026-01-01&to=2026-12-31` → `{ lift, points: [{date, e1rm, loadLb, reps}] }`

e1RM formula: `load × (1 + reps / 30)` (Epley)

Query Log documents for exercises matching the lift name. Return sorted by date asc.

**Register in** `server/server.js`.

**Acceptance:**
- Returns time-series sorted by date
- e1RM calculated correctly: 225lb × 5 reps = 262.5lb e1RM
- Returns empty array for new users (not an error)

---

## Task 7 — P4-001: Pro gate middleware

**Read:** `TASKS.md → P4-001` for full spec.

**Create:** `server/middleware/proGate.js`:
```js
export function requirePro(req, res, next) {
  if (!req.user?.isPro) {
    return res.status(403).json({ error: 'PRO_REQUIRED', upgradeUrl: 'ironlog://upgrade' });
  }
  next();
}
```

**Add** `isPro: { type: Boolean, default: false }` to `server/models/User.js`.

**Gate** these endpoints with `requirePro`:
- `POST /api/replan` → Pro only
- `GET /api/progress` → Pro only (basic chart stays free — you can add a free tier in P6)

**Add** `GET /api/subscription/status` → `{ isPro: bool, expiresAt: date | null }`

**Acceptance:**
- Free user calling `POST /api/replan` gets 403 with `PRO_REQUIRED`
- Setting `user.isPro = true` in MongoDB unlocks it

---

## Rules

- **Do NOT touch** `app/`, `store/`, `api/index.ts`, `components/` — those are frontend-agent territory
- **Do NOT modify** `.env` files
- **Do NOT delete** `server/data/program.js` — keep for rollback reference
- Commit after each task with message format: `feat(backend): P1-001 exercise database`
- If a task is blocked or you can't complete it, stop and explain exactly what's missing

## When you finish

Update `TASKS.md` — change `Status` column for each task you completed from `ready` → `done`.
Write a one-paragraph summary of what was built, what failed, and what the frontend-agent needs to know.
