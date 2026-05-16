# Ashwini Gawad — Nutrition Practice Platform

Clinical dietitian practice management: client-facing mobile app + Ashwini's private web assistant.

**Ashwini Gawad** · Clinical Dietitian · KEM Hospital trained · VLCC Area Head · 25+ years  
Specialises in: Diabetes & Metabolic Health · PCOS · Weight Management · Elderly Care

---

## Products

### `mobile/` — Client Mobile App (iOS + Android)
Expo (React Native) app that clients download from the Play Store / App Store.

- Onboarding: health goal, medical conditions, consultation preference  
- Dashboard: Ashwini's profile, WhatsApp booking CTAs, services  
- AI Chat: Ashwini's nutrition protocols, meal ideas, diet Q&A  
- Progress tracker: weight, energy, adherence check-ins  
- Diet plan viewer: today's meals, water target, Ashwini's notes  

**Tech:** Expo SDK 54 · React Native 0.81 · TypeScript · Expo Router v6 · Zustand · AsyncStorage  
**Backend:** Node.js/Express · MongoDB Atlas · Groq (llama-3.3-70b) · JWT auth · Render

### `web/` — Ashwini's Private Dashboard
Password-protected web assistant at [ashwini-gawad.vercel.app](https://ashwini-gawad.vercel.app/).

- AI chat assistant (Claude Haiku / Sonnet) for Ashwini's daily operations  
- Schedule management with status tracking  

**Tech:** Next.js 14 App Router · TypeScript · Tailwind CSS · Anthropic API · Vercel

---

## Getting Started

### Web app
```bash
cd web
npm install
npm run dev        # http://localhost:3000
```

Set `AGENT_PASSWORD` and `ANTHROPIC_API_KEY` in `web/.env.local`.

### Mobile app
```bash
cd mobile
npm install
npm start          # Expo dev server — press 'a' for Android, scan QR for Expo Go
```

Backend runs at `https://ironlog-jkuj.onrender.com` by default (`mobile/app.json`).

---

## Deployment

| Product | Platform | URL |
|---------|----------|-----|
| Web dashboard | Vercel | ashwini-gawad.vercel.app |
| Mobile (Android) | EAS → Play Store | `eas build --platform android --profile production` |
| Backend API | Render | ironlog-jkuj.onrender.com |

---

## Hard Rules

- Never commit `.env`, `.env.local`, or `server/.env`
- Never commit `ANTHROPIC_API_KEY`, `GROQ_API_KEY`, or `AGENT_PASSWORD`
- All consultation bookings route through WhatsApp — no in-app payment yet
