# ERD — hello-word-15

## Tables

### `schema_migrations`
Tracks applied SQL migration files so backend boot migration is repeatable.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `version` | `text` | primary key | Migration filename without path. |
| `applied_at` | `timestamptz` | not null default `now()` | Apply time. |

### `greetings`
Stores one public greeting row shown on home page.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `smallint` | primary key, `id = 1` | Single-row invariant. |
| `text` | `text` | not null, not empty | Rendered exactly as stored. |
| `updated_at` | `timestamptz` | not null default `now()` | Future audit marker. |

## Relationships
No foreign keys. `greetings` is standalone content.

## Seed data
Migration inserts exactly one row:

| `id` | `text` |
|---|---|
| `1` | `Hello Word` |

## Rules
- API reads `greetings` where `id = 1`.
- Database enforces one-row scope with primary key and `CHECK (id = 1)`.
- Frontend never stores or hardcodes greeting text.
- `greetings.text` must be returned exactly as stored in API field `text`; reviewed UI mock contract is `{ "text": string }`.

## Indexes
No secondary indexes. Primary key on `greetings.id` serves `GET /v1/greeting` lookup by `id = 1`.

## Migration plan

### Forward
1. Create `schema_migrations` table if missing.
2. Create `greetings` table with `id smallint primary key`, `CHECK (id = 1)`, `text text not null`, `CHECK (length(text) > 0)`, and `updated_at timestamptz not null default now()`.
3. Seed row `(1, 'Hello Word')` with an idempotent insert.

### Backward
1. Drop `greetings` table.
2. Keep or drop matching `schema_migrations` row according to migration runner convention; do not drop `schema_migrations` table because runner ownership is shared.

### Safety on populated tables
Safe for current empty or single-row project database. Forward migration creates new tables only and uses idempotent seed. Backward migration deletes stored greeting data, acceptable only before production content exists.
