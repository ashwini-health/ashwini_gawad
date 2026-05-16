# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Current Priority

Ashwini Gawad's website and future Play Store app are the priority. IronLog is parked.

Before major frontend/product work, read:

- `docs/ASHWINI_APP_AND_WEBSITE_LAUNCH_PLAN.md`
- `docs/CLAUDE_ASHWINI_FRONTEND_BRIEF.md`
- `docs/PRODUCTION_REPO_CHECK.md`

## Commands

```bash
npm run dev        # local dev server (http://localhost:3000)
npm run build      # production build (runs type-check + Next.js compile)
npm run lint       # ESLint
```

## Deployment

**GitHub webhook is permanently broken** — the Vercel GitHub App is not installed on the `ashwini-health` org after the repo transfer from `siddgawad`. Deploy manually:

```bash
cd C:\Users\theof\ashwini_gawad
vercel deploy --prod
```

Vercel CLI is authenticated as `siddhantgawad4-4720`. Project linked via `.vercel/project.json` (gitignored).

**Branch protection** on `main` is intentional. Do not store GitHub tokens in this file,
do not bypass branch protection from local docs, and do not paste personal access tokens
into commands. Use a pull request or an authenticated GitHub CLI session with the minimum
permissions needed for the operation.

If an emergency production push is required, get explicit approval from the repository
owner and perform the action through GitHub's UI or `gh` CLI. Rotate any token that was
ever written into local files or shared chat logs.

## Architecture

**Next.js 16 App Router** with React 19, TypeScript, Tailwind CSS v3.

```
src/
├── app/                    ← App Router pages (RSC by default, "use client" where needed)
│   ├── layout.tsx          ← Root layout: Navbar + Footer wrapping all pages
│   ├── page.tsx            ← Homepage
│   ├── actions.ts          ← Server Actions (lead form submission → Supabase)
│   ├── book-consultation/  ← Lead capture page with LeadGatewayForm
│   ├── clinical-insights/  ← Blog index + [slug] detail (Notion CMS)
│   ├── about/, services/,
│   │   how-it-works/,
│   │   success-stories/,
│   │   contact/, npd/,
│   │   resources/          ← Static marketing pages
│   └── globals.css         ← Tailwind directives + custom component classes
├── components/
│   ├── Navbar.tsx / Footer.tsx
│   ├── lead-gateway/       ← Multi-field intake form (client component)
│   └── NotionRenderer.tsx  ← Maps Notion block types to JSX
└── lib/
    ├── notion.ts           ← @notionhq/client v2.2.15 (PINNED — v5 removed databases.query)
    ├── supabase/           ← admin.ts (service role) + server.ts (anon)
    └── lead-gateway/       ← schema (Zod), mappers, normalizers, constants
```

## Design System

Custom Tailwind theme in `tailwind.config.ts`:
- **Palette**: `midnight` (dark base, 950 = `#0c0c1a`), `gold` (accent, 300 = `#e8c865`), `teal` (medical), `danger`, `slate`
- **Fonts**: `font-display` (DM Serif Display), `font-heading` (Plus Jakarta Sans), `font-body` (Inter)
- **Animations**: `fade-in`, `slide-up`, `float`, `shimmer`, `glow`, `pulse-slow`

Custom utility classes in `globals.css` (use these, don't reinvent):
- `glass-card` / `glass-card-elevated` — frosted glass panels
- `text-gradient-gold` — gold gradient text fill
- `badge` / `badge-teal` / `badge-danger` — pill labels
- `section-padding`, `container-narrow`, `container-wide` — layout helpers
- `noise-bg` — applied to `<body>`, adds subtle noise texture via `::before`

## Integrations

**Notion** (`src/lib/notion.ts`): CMS for Clinical Insights blog. Uses lazy singleton factory (`getNotionClient()`). Required DB properties: `Name` (title), `Slug` (rich_text), `Date` (date), `Status` (status = "Published"), `Excerpt` (rich_text), `Category` (select).

**Supabase**: Lead capture pipeline. Tables: `users`, `lead_intakes`, `lead_consents`, `lead_events`. Server Action in `actions.ts` handles dedup (phone), consent capture, and event logging.

## Environment Variables

All set in Vercel production — do not commit `.env.local`:
- `NOTION_API_KEY`, `NOTION_DATABASE_ID`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`

WhatsApp booking number in codebase: `+919769761766`
