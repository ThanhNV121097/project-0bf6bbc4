# Design System — hello-word-15

> Source of truth: approved `index.html`.
> Every value below is extracted from it. Changing a value here without changing approved design is a defect.

Last updated: 2025-02-14

## 1. Foundations

### 1.1 Color

Semantic tokens. Name by job, never by hue.

| Token | Value | Used for |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background |
| `--color-text` | `#000000` | Body text |

#### Contrast audit

| Foreground | Background | Ratio | Passes |
|---|---|---|---|
| `--color-text` | `--color-bg` | `21:1` | AA / AA Large |

### 1.2 Spacing

Base unit: `24px` for page inset. Only spacing used in approved design.

| Token | Value |
|---|---|
| `--space-6` | `24px` |

### 1.3 Typography

Font families:

- Body: `Arial, Helvetica, sans-serif`
- Headings: `Arial, Helvetica, sans-serif`
- Mono: not used

| Token | Size | Line height | Weight | Used for |
|---|---|---|---|---|
| `--text-3xl` | `clamp(2.5rem, 8vw, 5rem)` | `1` | `400` | Page heading / greeting |

### 1.4 Radius, border, shadow, motion

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | not used | — |
| `--radius-md` | not used | — |
| `--radius-lg` | not used | — |
| `--radius-full` | not used | — |
| `--border-width` | not used | — |
| `--shadow-sm` | not used | — |
| `--shadow-md` | not used | — |
| `--shadow-lg` | not used | — |
| `--duration-fast` | not used | — |
| `--duration-base` | not used | — |
| `--easing` | not used | — |

Motion: none. No transitions or animation.

### 1.5 Layout and breakpoints

| Name | Min width | Container | Columns | Gutter |
|---|---|---|---|---|
| default | 0 | full viewport | 1 | 24px |

Z-index scale:

| Layer | Value |
|---|---|
| Base | `0` |

## 2. Components

### 2.1 Greeting screen

**Purpose** — Static full-screen page that centers one greeting message. Use for this proof-of-pipeline screen only.

**Anatomy** — `[main.screen] [section.card] [h1.message]`

**Variants**

| Variant | Tokens | When to use |
|---|---|---|
| default | `--color-bg`, `--color-text`, `--space-6`, `--text-3xl` | Single centered greeting |

**Sizes**

| Size | Height | Padding | Text token |
|---|---|---|---|
| default | `100vh` min-height | `24px` | `--text-3xl` |

**States**

| State | Visual change | Tokens |
|---|---|---|
| Default | White page, black centered greeting | `--color-bg`, `--color-text` |
| Hover | No hover behavior | — |
| Focus (keyboard) | No interactive focus target in approved design | — |
| Active / pressed | No active behavior | — |
| Disabled | Not applicable | — |
| Loading | Not shown | — |
| Error | Not shown | — |
| Empty | Not shown | — |

**Accessibility** — Semantic landmark via `main`, heading via `h1`, centered text remains readable at all viewport sizes.

## 3. Content and formatting

- Voice and tone: plain, minimal, no decoration.
- Date/time/number/currency formats: not used.
- Capitalization: title case only for product title; greeting text keeps exact casing.
- Empty-state and error-message wording pattern: not used in approved design.

## 4. Known deviations

| Where | Deviation | Why it stands | Follow-up |
|---|---|---|---|
| Entire page | No loading, error, or empty states | Single static proof screen only | Add states if future data flow needs them |
| Entire page | No border, shadow, radius, or motion tokens used | Approved design is plain text on white | None |
| Entire page | No breakpoints beyond full viewport centering | Layout never changes across widths | None |
| Entire page | No interactive components | Screen is read-only display | None |

## 5. Change log

| Date | Change | Design PR |
|---|---|---|
| 2025-02-14 | Initial design system extracted from approved mockup | pending |
