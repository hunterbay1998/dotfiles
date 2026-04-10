# CLAUDE.md

This file provides guidance to Claude Code when working with this AGS config.

> **WARNING**: This project uses AGS v2 (Astal/GTK4). NEVER use AGS v1 patterns, APIs, or syntax. All imports, widgets, and patterns must be AGS v2 only.

## Running

- `ags run .` - Start the shell

## Architecture Overview

### Technology Stack
- **Framework**: AGS v2 (Astal/GTK4)
- **Runtime**: GJS (GNOME JavaScript bindings) — not Node.js
- **Language**: TypeScript with TSX/JSX support
- **Styling**: SCSS

### Project Structure
- `/widget/` - All UI components
  - `/widget/Bar.tsx` - Main bar window, spawned per monitor
  - `/widget/center/` - Center bar widgets
  - `/widget/left/` - Left bar widgets
  - `/widget/right/` - Right bar widgets
- `app.ts` - Entry point, starts app and maps Bar to each monitor
- `style.scss` - Global styles

### Key Patterns

1. **Components**: TSX components using Astal's reactive framework with GTK4 widgets

2. **Windows**: Each window receives a `Gdk.Monitor` and is positioned with `Astal.WindowAnchor` via GTK Layer Shell

3. **State**: Use Astal's reactive variables (e.g. `Variable`, `bind()`) — no global state store

4. **Setup prop**: Use `$=` for setup callbacks on widgets (AGS v2 pattern)

### GJS / GTK4 Constraints
- GJS runtime — no native Node.js modules
- Limited to ES2022 features
- Must use GTK4 widgets and patterns
- CSS is GTK4 CSS (not standard web CSS)
