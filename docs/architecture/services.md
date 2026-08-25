# Services — hello-word-15

## Shared conventions
- Backend routes do not include `/api`; deploy proxy strips that prefix before requests reach Go.
- Public API version prefix is `/v1`.
- Requests and responses are JSON unless endpoint says otherwise.
- Success response shape is endpoint-specific.
- Public endpoints require no auth unless stated.
- Error envelope is shared:

```json
{
  "error": {
    "code": "internal_error",
    "message": "Internal server error"
  }
}
```

| Code | HTTP | Meaning |
|---|---:|---|
| `not_found` | 404 | Required data row missing. |
| `internal_error` | 500 | Unexpected server or database failure. |

## Endpoints

### `GET /healthz`
Readiness check for container and runtime.

Auth: none.

Request body: none.

Response `200 text/plain`:

```text
ok
```

Rules:
- Return 200 only after migrations completed and `SELECT 1` against PostgreSQL succeeds.
- Return 503 before readiness or when database check fails.

### `GET /v1/greeting`
Returns stored greeting for home page.

Auth: none.

Request body: none.

Response `200 application/json`:

```json
{
  "text": "Hello Word"
}
```

Response fields match reviewed UI mock module `GreetingResponse`:

| Field | Type | Required | Source |
|---|---|---:|---|
| `text` | string | yes | `greetings.text` for `id = 1` |

Errors:
| HTTP | Body |
|---:|---|
| 404 | `{ "error": { "code": "not_found", "message": "Greeting not found" } }` |
| 500 | `{ "error": { "code": "internal_error", "message": "Internal server error" } }` |

Rules:
- Read `greetings.id = 1`.
- Return text exactly as stored.
- Do not cache in frontend as source of truth.
- Do not add loading, error, animation, or variant response states for this story; approved UI has one default state.
- No pagination. Endpoint returns one object.

## Migration plan for service dependency

### Forward
1. Run database migration that creates and seeds `greetings` before API readiness.
2. Expose `GET /v1/greeting` only after migration success.

### Backward
1. Remove `GET /v1/greeting` handler before dropping `greetings` table.
2. Drop `greetings` table with matching database rollback.

### Safety on populated tables
Safe before production content exists. Backward path removes only story-owned endpoint and story-owned data table.
