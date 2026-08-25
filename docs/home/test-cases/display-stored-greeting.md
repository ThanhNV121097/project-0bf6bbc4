# Test cases — Display stored greeting

Risk level: low. Single read-only public page, no roles, no writes. Cover one case per acceptance criterion plus contract success shape.

## Case 1
**Scenario**: Show stored greeting text
**Given**: PostgreSQL row `greetings.id = 1` contains `Hello Word` and backend API is available
**When**: Guest opens home page
**Then**: Page shows visible text `Hello Word` and no other greeting copy
**Check**: render_url
**Trace**: HOME-001 / AC-1

## Case 2
**Scenario**: Center greeting horizontally and vertically
**Given**: Page renders normally with stored greeting available
**When**: Guest opens home page
**Then**: Main greeting sits centered horizontally and vertically on page
**Check**: measure_styles
**Trace**: HOME-001 / AC-2

## Case 3
**Scenario**: Read greeting from backend path, not hardcoded frontend text
**Given**: Frontend source has no literal greeting copy and backend returns greeting text
**When**: Guest opens home page
**Then**: Displayed text matches backend response body and not inline frontend copy
**Check**: render_url
**Trace**: HOME-001 / AC-3

## Case 4
**Scenario**: No animation on home page
**Given**: Approved design has no motion states
**When**: Guest opens home page and watches initial render
**Then**: Page shows no animation or transition on greeting or page background
**Check**: measure_styles
**Trace**: HOME-001 / AC-4

## Case 5
**Scenario**: Greeting API success shape
**Given**: Backend has stored greeting row
**When**: Client requests `GET /v1/greeting`
**Then**: Response status is 200 and body is JSON `{ "text": "Hello Word" }` with `Content-Type: application/json`
**Check**: fetch_url
**Trace**: services.md / GET /v1/greeting success contract

## Case 6
**Scenario**: Greeting API missing row returns not_found
**Given**: `greetings.id = 1` is missing
**When**: Client requests `GET /v1/greeting`
**Then**: Response status is 404 and body is `{ "error": { "code": "not_found", "message": "Greeting not found" } }`
**Check**: fetch_url
**Trace**: services.md / GET /v1/greeting error contract

## Case 7
**Scenario**: Greeting API unexpected failure returns internal_error
**Given**: Backend or database fails unexpectedly while serving greeting
**When**: Client requests `GET /v1/greeting`
**Then**: Response status is 500 and body is `{ "error": { "code": "internal_error", "message": "Internal server error" } }`
**Check**: fetch_url
**Trace**: services.md / GET /v1/greeting error contract
