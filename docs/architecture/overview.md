# Architecture overview — hello-word-15

## Scope
Fullstack proof app: Next.js page calls Go API; Go API reads one PostgreSQL row; page renders stored greeting centered on plain white background. No auth, writes, admin UI, animation, variants, or extra data.

## Stack
| Layer | Choice | Notes |
|---|---|---|
| Frontend | Next.js 15 App Router, TypeScript, Tailwind v3 | `output: "standalone"`; `app/page.tsx` is composition root only. |
| Backend | Go 1.22+, `net/http`, `pgx/v5` | Single binary from `cmd/api`; applies SQL migrations on boot. |
| Database | PostgreSQL 16 | One table seeded by migration. |
| Local run | `docker compose --profile local up --build` | Boots PostgreSQL, backend, frontend together. |
| CI | `.github/workflows/ci.yml` | Runs Go build/vet/test, frontend lint/build/test, token checks. |

## Folder structure
| Path | Owner | Purpose |
|---|---|---|
| `docs/architecture/overview.md` | TL | Stack, layout, conventions. |
| `docs/architecture/erd.md` | TL | Tables and seed data contract. |
| `docs/architecture/services.md` | TL | Endpoint contracts. |
| `code/backend/cmd/api/main.go` | TL/Dev | HTTP entry point, migrations, health, API routes. |
| `code/backend/migrations/` | TL/Dev | Timestamped SQL migrations, applied in filename order. |
| `code/frontend/app/page.tsx` | TL/Dev | Server Component composition root; stories add imports and elements. |
| `code/frontend/app/globals.css` | TL | Shared design tokens and base styles; story authors do not edit. |
| `code/frontend/components/` | Dev | Story components, PascalCase default exports. |
| `code/frontend/lib/` | Dev | API clients and temporary mocks. |

## Data flow
1. Browser requests `/` from Next.js.
2. Home story component fetches backend `/v1/greeting` using `NEXT_PUBLIC_API_URL`.
3. Backend reads row from `greetings` and returns `{ "text": "Hello Word" }`.
4. Frontend renders returned text as heading. Frontend must not contain greeting copy.

## Backend conventions
- Read `DATABASE_URL` and `PORT`; if `PORT` empty, read `APP_PORT`; if both empty, listen on `8080`.
- Boot sequence: connect DB, apply all pending migrations, verify `SELECT 1`, then serve HTTP.
- `/healthz` returns 200 only after migrations succeeded and DB ping works.
- Use parameterized queries through `pgx`; no string-built SQL with user input.
- API error envelope is defined in `services.md`; keep external errors generic.
- Migrations are idempotent through `schema_migrations`; do not edit applied migration files after merge.

## Frontend conventions
- Every React component file uses `export default function ComponentName()`.
- `app/page.tsx` stays a Server Component and only composes children.
- Files using hooks, events, browser APIs, or function props start with first line `"use client"`.
- CSS modules use tokens from `app/globals.css`; no hardcoded colors or spacing values.
- No loading, error, hover, focus, active, disabled, empty, or animated visual state unless requirements change.

## Environment variables
| File | Key | Purpose |
|---|---|---|
| `.env.example` | `POSTGRES_USER` | Local compose DB user. |
| `.env.example` | `POSTGRES_PASSWORD` | Local compose DB password. |
| `.env.example` | `POSTGRES_DB` | Local compose DB name. |
| `.env.example` | `NEXT_PUBLIC_API_URL` | Browser-visible API base URL. |
| `code/backend/.env.example` | `DATABASE_URL` | PostgreSQL connection string injected by runtime. |
| `code/backend/.env.example` | `PORT` | HTTP port injected by runtime. |
| `code/backend/.env.example` | `APP_PORT` | Legacy fallback when `PORT` is not set. |
| `code/frontend/.env.example` | `NEXT_PUBLIC_API_URL` | API base URL for browser fetches. |

## Decisions
| Decision | Rejected alternative | Tradeoff |
|---|---|---|
| Fullstack scaffold | Static page with hardcoded text | More moving parts, but required by SRS data path through DB and API. |
| Self-migrating backend | External migration job | Simpler deployment; app boot fails fast if schema cannot apply. |
| SQL files embedded in binary | Read migrations from working directory | Slight rebuild for migration change; runtime independent of file layout. |
| `pgx/v5` | `database/sql` plus driver | One dependency, direct PostgreSQL support, fewer adapter layers. |
| Tokenized global CSS | Component hardcoded values | More initial setup; CI catches visual drift. |
| No frontend test framework yet | Add Jest/Playwright now | Less scaffold weight; add when non-trivial client logic exists. |

## Run and verify
```bash
cp .env.example .env
cp code/backend/.env.example code/backend/.env
cp code/frontend/.env.example code/frontend/.env.local
docker compose --profile local up --build
```

Local gates:
```bash
(cd code/backend && go build ./... && go vet ./... && go test ./...)
(cd code/frontend && npm ci && npm run lint && npm run build && npm test --if-present)
```

## Risks
- Frontend story must avoid hardcoding `Hello Word`; use API data only.
- Missing greeting row is data corruption for this app; migration seeds row and API returns error envelope if absent.
- Production proxy strips `/api`; backend routes mount under `/v1/...` only.
