# ARTI

**R**amakanth · **T**ejasree · **A**rtificial **I**ntelligence

ARTI is a private, premium AI workspace built exclusively for its two owners.
This repository currently contains **Step 01: Project Foundation** — the
architecture, design system and application shell that later AI features are
built on.

> No AI feature is implemented in this step. Every module in the navigation is
> an explicit placeholder. Nothing in the interface pretends otherwise.

---

## Status

| Area | Status |
| --- | --- |
| Application shell and responsive layout | Implemented |
| Brand design system (Wine Red / Light Sand) | Implemented |
| Supabase client scaffolding | Implemented (awaiting project credentials) |
| FastAPI backend foundation | Implemented (no AI services) |
| Three.js / React Three Fiber scene | Implemented |
| PWA manifest and service worker | Implemented |
| Authentication and authorization | Not implemented — planned |
| AI features (chat, media, search, agents) | Not implemented — planned |

---

## Technology stack

| Layer | Technology | Version |
| --- | --- | --- |
| Framework | Next.js (App Router, Turbopack) | 16.4.5 |
| UI | React / React DOM | 19.3.0 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| 3D | Three.js / @react-three/fiber | 0.187.0 / 9.8.2 |
| Data | Supabase (`@supabase/ssr`) | 0.12.7 |
| Backend | FastAPI + Uvicorn | 0.115+ |
| Hosting | Vercel | — |

---

## Project structure

```
ARTI/
├── src/
│   ├── app/                     # App Router routes
│   │   ├── api/
│   │   │   ├── health/          # GET /api/health  — liveness probe
│   │   │   └── events/          # GET /api/events  — SSE foundation
│   │   ├── chats/ pinned/ images/ videos/   # planned module placeholders
│   │   ├── search/ projects/ apps/ games/ magic/
│   │   ├── layout.tsx           # Root layout, fonts, metadata
│   │   ├── page.tsx             # Workspace home
│   │   ├── manifest.ts          # PWA manifest
│   │   ├── error.tsx loading.tsx not-found.tsx global-error.tsx
│   │   └── globals.css          # Design tokens
│   ├── components/
│   │   ├── layout/              # App shell, sidebar, topbar
│   │   ├── providers/           # Client provider boundary
│   │   ├── three/               # React Three Fiber scene
│   │   └── ui/                  # Primitives: button, card, input, badge…
│   ├── lib/
│   │   ├── config/              # site, navigation, env validation
│   │   ├── hooks/               # media query, focus trap
│   │   ├── supabase/            # Browser and server clients
│   │   └── utils/               # cn, formatting
│   ├── types/                   # Shared types (navigation, database)
│   └── proxy.ts                 # Security headers + session refresh
├── backend/                     # FastAPI service foundation
│   ├── app/
│   │   ├── api/                 # Versioned routers
│   │   ├── core/                # Settings, streaming helpers
│   │   └── main.py              # Application factory
│   ├── tests/
│   └── requirements.txt
├── public/                      # Icons, manifest assets, service worker
└── tools/generate_icons.py      # Regenerates PWA icons
```

---

## Getting started

### Prerequisites

- Node.js 20.9 or newer
- Python 3.11 or newer (only for the backend)

### Frontend

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

### Backend (optional in Step 01)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### Verification

```bash
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run build        # production build

cd backend && pytest # backend tests
```

---

## Environment variables

All values are documented in [`.env.example`](./.env.example). Public variables
are inlined into the browser bundle; server-only secrets never are.

| Variable | Scope | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | For Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | For Supabase |
| `NEXT_PUBLIC_SITE_URL` | Public | Recommended |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Only if required |
| `ARTI_API_BASE_URL` | Server only | For backend calls |

The application builds and runs without Supabase credentials. When they are
absent, the shell renders an explicit "not configured" state instead of
failing — and no credential is ever invented.

---

## Connecting Supabase

1. Create (or open) the project in the Supabase dashboard.
2. Copy the project URL and the publishable/anon key from **Settings → API**.
3. Add them to `.env.local` locally and to **Vercel → Settings → Environment
   Variables** for deployments.
4. Enable Row Level Security on every table that holds private data before it
   is queried from the browser.

No tables or schemas are created in Step 01.

---

## Deployment

The project deploys to Vercel with no extra build configuration:

```bash
vercel          # preview deployment
vercel --prod   # production deployment
```

Set the environment variables above in the Vercel project before the first
deployment. The `proxy.ts` file applies security headers on every document
route; the `/api/events` stream is excluded so it is never buffered.

---

## Development roadmap

Step 01 is complete. Later steps are planned but **not started**:

1. **Step 02** — Supabase project provisioning and schema
2. Later — authentication restricted to the two owners
3. Later — chat, image, video, search, project and agent modules
4. Later — Expo / React Native client

---

## License

Private and proprietary. Not for redistribution.
