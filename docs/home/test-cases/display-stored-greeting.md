# Test cases — Display stored greeting

Risk level: low. One read-only home screen, no writes, no roles, no user input. Focus on contract, rendering, and failure path from backing data.

## TC-1 — Home shows stored greeting text
**Scenario**: Render stored Hello Word
**Given**: PostgreSQL row `greetings.id = 1` contains text `Hello Word`, backend API is reachable, and home page is loaded.
**When**: Guest opens home page.
**Then**: Page displays `Hello Word` as visible main text.
**Check**: render_url
**Trace**: HOME-001, AC-1

## TC-2 — Home text centered on page
**Scenario**: Center greeting horizontally and vertically
**Given**: Page renders normally with stored greeting available.
**When**: Guest opens home page.
**Then**: Main greeting sits centered horizontally and vertically in viewport.
**Check**: measure_styles
**Trace**: HOME-001, AC-2

## TC-3 — Frontend does not hardcode greeting copy
**Scenario**: Load greeting from backend data path
**Given**: Frontend source has no inline greeting string, backend API returns greeting text from stored row.
**When**: Guest opens home page.
**Then**: Displayed text matches backend response value and not hardcoded frontend copy.
**Check**: render_url
**Trace**: HOME-001, AC-3

## TC-4 — Home has no animation
**Scenario**: No motion on greeting screen
**Given**: Approved design for home page.
**When**: Guest opens home page.
**Then**: No animated motion or transition is visible on the page.
**Check**: measure_styles
**Trace**: HOME-001, AC-4

## TC-5 — API returns greeting success shape
**Scenario**: GET /v1/greeting success body
**Given**: `greetings.id = 1` exists in PostgreSQL.
**When**: Client sends `GET /v1/greeting`.
**Then**: Response is `200` and JSON body is exactly `{ "text": "Hello Word" }` with no extra fields required by contract.
**Check**: fetch_url
**Trace**: services.md `GET /v1/greeting` success response

## TC-6 — API returns not_found when greeting row missing
**Scenario**: GET /v1/greeting missing row
**Given**: `greetings.id = 1` is absent from PostgreSQL.
**When**: Client sends `GET /v1/greeting`.
**Then**: Response is `404` and body is `{ "error": { "code": "not_found", "message": "Greeting not found" } }`.
**Check**: fetch_url
**Trace**: services.md `GET /v1/greeting` error contract

## TC-7 — API returns internal_error on unexpected failure
**Scenario**: GET /v1/greeting database or server failure
**Given**: Backend hits unexpected server or database failure while reading greeting.
**When**: Client sends `GET /v1/greeting`.
**Then**: Response is `500` and body is `{ "error": { "code": "internal_error", "message": "Internal server error" } }`.
**Check**: fetch_url
**Trace**: services.md `GET /v1/greeting` error contract
