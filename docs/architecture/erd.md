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
