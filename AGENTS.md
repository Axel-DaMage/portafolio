# AGENTS.md — Portafolio Terminal TUI

Fresh project, **not yet scaffolded**. No `package.json`, no build config exists. See `plan.md` for full spec.

## Stack (planned)

- Vite + React 18+ + TypeScript
- pnpm (not npm/yarn)
- CSS Modules + CSS custom properties
- Fira Code (variable, self-hosted or Google Fonts)
- ESLint + Prettier

## Golden rules

- **No emojis anywhere**
- **No commits or pushes until explicitly asked**
- Palette is closed: only `#090909` (bg), `#ffffff` (text/borders), `#ff0066` (primary), `#00fff2` (secondary)
- `plan.md` is the single source of truth for design, architecture, components, animations, integrations (GitHub + WakaTime APIs)

## First-time setup

```sh
pnpm create vite . --template react-ts
pnpm install
```

Then implement phases per `plan.md` §9.

## Architecture

```
src/
├── components/{ui,layout,sections,widgets,animations}/
├── hooks/
├── services/
├── styles/{variables,reset,animations,terminal}.css
├── types/
└── utils/
```

Monorepo root `src/components/` is the main entrypoint. No generated code. No frameworks beyond React.

## Design constraints

- Terminal/TUI aesthetic: box-drawing chars (`─│┌┐└┘├┤┬┴┼`), scanlines, CRT glow, typewriter, prompt-style (`user@host:~$`)
- Timestamps in ISO 24h format; live timers updating every second
- ASCII art assets go in `public/ascii-art/`
- Respect `prefers-reduced-motion`
- Prioritize fullscreen monitor layout (e.g. desktop full height) over mobile responsiveness, ensuring retro console elements align perfectly at standard fullscreen resolutions.

## Integrations

- **GitHub**: `GET /users/{user}/events` — last 3 events with live timer. Auth via `VITE_GITHUB_TOKEN` env var (scope: repo, read:user).
- **WakaTime**: `GET /api/v1/users/current/stats/last_7_days` — total hours, languages, editors, projects. Auth via `VITE_WAKATIME_API_KEY`.
- Cache with React Query or SWR (5min TTL).
