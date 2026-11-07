<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:arti-project-notes -->

## ARTI project notes

ARTI is a private AI workspace for two owners. It is built in individually
verified steps; **Step 01 (project foundation) is complete** and no AI feature
is implemented yet. Do not start Step 02 unless explicitly asked.

### Layout

- `src/app/` — App Router routes. Module routes (`chats`, `images`, …) render
  `ModulePlaceholder` and are navigation placeholders only.
- `src/components/{layout,providers,three,ui}/` — shell, client providers,
  React Three Fiber scene, UI primitives.
- `src/lib/{config,hooks,supabase,utils}/` — site/navigation/env config,
  Supabase clients, helpers.
- `src/proxy.ts` — Next.js 16 **Proxy** (replaces `middleware`): security
  headers plus Supabase session refresh. `/api/events` is excluded from the
  matcher so the SSE stream is never buffered.
- `backend/` — FastAPI service foundation (`/api/v1/health`, `/api/v1/events`).

### Verify before claiming anything works

```bash
npm run lint && npm run typecheck && npm run build
python3 tools/verify_responsive.py http://localhost:3100   # needs a running server
cd backend && ./.venv/bin/pytest -q && ./.venv/bin/ruff check .
```

`tools/verify_responsive.py` drives the system Chromium (`/usr/bin/chromium`)
through Playwright across 9 viewports, asserting no horizontal overflow, working
navigation and no console errors.

### Next.js 16 conventions that differ from older training data

- Read `node_modules/next/dist/docs/` before writing Next-specific code.
- `middleware.ts` is deprecated in favour of `proxy.ts` (`export function proxy`).
- `cacheComponents: true` is on: segment config like `export const dynamic` is
  rejected. Opt a route into request-time rendering with `await connection()`.
- Route params are typed via generated `LayoutProps<"/">` / `PageProps<...>`;
  run `next typegen` (wired into `npm run typecheck`) before `tsc`.
- Tailwind v4 is compiled through the Turbopack `*.css` rule in `next.config.ts`,
  not PostCSS.

### Environment

Supabase and Vercel credentials are **not** provisioned for this repository.
The app builds and runs without them and reports an honest "not configured"
state (`getSupabaseConfigIssue`). Never fabricate credentials, and never claim a
Supabase connection or a Vercel deployment that has not actually been verified.

### GitHub access limitation

The injected `GITHUB_TOKEN` is a **read-only GitHub App installation token** for
`Ramakanth-projects/ARTI`. `git push` and write API calls return `403`
("Resource not accessible by integration") even though the repo API reports
`push: true`. Commits can be created locally but must be pushed by a user (or a
token with write access). Do not report a push as successful unless the remote
confirms the new ref.

<!-- END:arti-project-notes -->
