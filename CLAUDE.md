# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Excel Sports amateur baseball scouting dashboard — a single-file React application (`index.html`) with no build step. The app connects to a Google Apps Script backend for player data (college and high school) and supports inline editing, evaluations, filtering, sorting, and agency analytics charts.

## Architecture

- **Single HTML file** (`index.html`, ~585 lines): Contains all UI code as inline JSX inside a `<script type="text/babel">` tag, transpiled at runtime by Babel Standalone.
- **CDN dependencies** (loaded as UMD globals via unpkg.com): React 18, ReactDOM 18, Babel Standalone, prop-types, Recharts 2.12.7, Lucide-React 0.383.0.
- **Backend**: Google Apps Script web app (URL in `APPS_SCRIPT_URL` constant). GET fetches all player data; POST handles `addPlayer`, `addEval`, and `updateField` actions.
- **Auth**: Client-side password gate (`APP_PASSWORD` constant) — not secure, just a simple access barrier.

### UMD Global Names

When referencing CDN libraries in the inline script, use the correct UMD globals:
- `React`, `ReactDOM` (standard)
- `Recharts` (requires `prop-types` loaded beforehand, and exposes `BarChart`, `Bar`, `XAxis`, etc.)
- `LucideReact` (PascalCase — **not** `lucideReact`; also requires `window.react = window.React` shim before loading because its UMD resolves React via lowercase `window.react`)

### Key Components (all in index.html)

- `ScoutDB` — Root component; manages auth state, tab switching (college/HS), data fetching, filters, sort config
- `LoginScreen` — Password entry gate
- `DataTable` — Paginated, sortable, filterable player table with inline-editable cells
- `PlayerModal` — Player detail view with evaluation history and add-evaluation form
- `AddPlayerModal` — New player creation form
- `AgencyChart` — Recharts horizontal bar chart of players by agency
- `Dropdown` — Multi-select filter dropdown
- `EditableCell` / `TierBadge` — Inline-edit primitives

## Development

No build step, no package manager, no tests, no linter. To work on this app:

1. Open `index.html` directly in a browser, or serve via `python3 -m http.server 8787`
2. All edits happen in `index.html`

### Important Constraint

All React hooks in `ScoutDB` must be called **before** any early returns (e.g., the `if (!authed)` login gate). Violating this causes React's "Rendered more hooks than during the previous render" error (#310).
