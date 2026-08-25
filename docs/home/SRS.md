# SRS — home

Module: `home`
Last updated: 2025-02-14
Design: [View the approved design](http://localhost:8080/design/0bf6bbc4-f9d4-4803-a88e-71beadc8d3ca)
Design system: `design/design-system.md`

> One file per module, at `docs/home/SRS.md`. It covers only the functions that belong to this module. Never write `docs/SRS.md`.

## 1. Purpose

`home` module serves one public page for pipeline proof. Guest sees stored greeting centered on white screen, sourced from backend and PostgreSQL, so product proves frontend, backend, and DB all connect end to end. Without it, repo has no visible end-to-end proof.

## 2. Actors

| Actor | Who they are | What they may do in this module |
|---|---|---|
| Guest | Public visitor with no sign-in | View home page and read stored greeting |

## 3. Scope

**In scope** — the functions specified below, by their plan titles:

- Display stored greeting

**Out of scope** — name what a reader would reasonably expect here and say where it lives instead.

- Any other page, nav, or interaction — not built; project is one-screen proof only.
- Styling variants, animation, loading, or error visuals — not in approved design.

## 4. Functional requirements

### 4.1 Display stored greeting

**Requirement HOME-001 — Show stored greeting from API**

*As a* Guest, *I want to* view greeting text loaded from backend, *so that* I can confirm stored content renders on page.

Behaviour:

1. Guest opens home page.
2. System requests greeting text through backend API.
3. System reads greeting value from PostgreSQL row and renders it as main page text.
4. System keeps text centered horizontally and vertically on white background with black text.
5. Frontend does not hardcode greeting copy.

**Acceptance criteria** — each maps one-to-one onto a test case in `docs/home/test-cases/display-stored-greeting.md`.

| # | Given | When | Then |
|---|---|---|---|
| AC-1 | PostgreSQL row contains `Hello Word` | Guest opens home page | Page shows `Hello Word` |
| AC-2 | Page renders normally | Guest opens home page | Greeting is centered horizontally and vertically |
| AC-3 | Source code has no hardcoded greeting string in frontend | Guest opens home page | Displayed text comes from backend data path, not inline frontend copy |
| AC-4 | Approved design has no motion or variant states | Guest opens home page | Page shows no animation |

**Failure, boundary and permission behaviour**

| Case | Condition | Expected behaviour |
|---|---|---|
| — | — | Not applicable: this function is a single read with no roles, no writes and no failure state in approved design. |

**Data touched** — the fields this function reads and writes, in product terms.

| Field | Type | Required | Rule |
|---|---|---|---|
| greeting text | text | yes | Stored in one PostgreSQL row; rendered exactly as stored |

## 5. Screens

| Screen | Section in the design | Functions it serves | States that must exist |
|---|---|---|---|
| Home greeting screen | Default centered greeting on white page | HOME-001 | default |

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Home page renders centered greeting within 2s on typical connection after API response is available. |
| Accessibility | Greeting text remains readable with contrast at least 4.5:1 and is exposed as heading text. |
| Responsive | Layout stays centered on widths from 320px upward with no horizontal scroll. |
| Localisation | Copy is plain English exactly as stored. |

## 7. Dependencies and assumptions

- **Depends on:** backend API, for reading greeting from PostgreSQL.
- **Depends on:** PostgreSQL, for stored greeting row.
- **Assumption:** greeting row already exists with one value; if missing, API contract handles that as upstream data issue.

| Open question | Proposed default | Who decides |
|---|---|---|
| Should missing greeting row render fallback copy or fail request? | No fallback in UI; backend contract decides error behavior. | Stakeholder / TL |

## 8. Traceability

| Plan item | Requirement ids | Test cases |
|---|---|---|
| Display stored greeting | HOME-001 | `test-cases/display-stored-greeting.md` |
