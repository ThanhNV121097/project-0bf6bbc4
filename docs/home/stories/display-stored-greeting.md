# Story — Display stored greeting

## User story
As a Guest, I want to view greeting text loaded from backend, so that I can confirm stored content renders on page.

## In scope
- One home page that requests greeting text through backend API and renders it from PostgreSQL data.
- Greeting shown exactly as stored, centered horizontally and vertically on white background with black text.
- No frontend hardcoded greeting copy.

## Out of scope
- Any other page, nav, or interaction.
- Styling variants, animation, loading visuals, error visuals, or extra states.
- Auth, writes, admin UI, or any extra data beyond stored greeting.

## UI scope
- Home greeting screen only, matching approved design: full-viewport centered greeting, plain white background, black heading text.
- Single default state only; no interactive controls and no motion.

## Acceptance criteria
1. Given PostgreSQL row contains `Hello Word`, when Guest opens home page, then page shows `Hello Word`.
2. Given page renders normally, when Guest opens home page, then greeting is centered horizontally and vertically.
3. Given source code is inspected, when frontend is checked, then greeting text is not hardcoded in frontend and comes from backend data path.
4. Given approved design has no motion or variant states, when Guest opens home page, then page shows no animation.

## Dependencies
- Backend API for reading greeting from PostgreSQL.
- PostgreSQL row with greeting value already present.
- Approved design and design system for the plain centered screen.
