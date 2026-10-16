# AGENTS.md — Portafolio Terminal TUI

Single-window Terminal TUI portfolio inspired by LazyVim / Neovim, built with React, TypeScript, and Catppuccin Mocha.

## Stack & Tooling

- **Runtime / Framework**: Vite + React 19 + TypeScript
- **Package Manager**: pnpm (`pnpm dev`, `pnpm run build`, `pnpm run lint`)
- **State & Data Fetching**: SWR (5 min TTL) with graceful offline/mock fallback
- **Styling**: Vanilla CSS custom properties (Catppuccin Mocha) + utility classes in `src/styles/`
- **Linter / Formatter**: ESLint + TypeScript ESLint

## Golden Rules

- **No emojis anywhere**: Strictly forbidden across all code, components, UI text, styles, comments, git messages, and documentation.
- **No commits or pushes until explicitly asked**: Work in local workspace only until the user gives explicit command to commit/push.
- **Neutral box borders**: Container box borders must use neutral Catppuccin surface colors (`--ctp-surface0`, `--ctp-surface1`), never colored borders.
- **Language**: User-facing copy in Spanish, preserving authentic Unix/developer terms (`whoami`, `cat`, `ls`, file names, `git:(main)`).
- **Architecture integrity**: Maintain modular folder structure with barrel exports (`index.ts`) in each module.

## Color Palette (Catppuccin Mocha)

| Variable | Hex | Role |
|---|---|---|
| `--ctp-crust` | `#11111b` | Background más oscuro (commandline, vignette) |
| `--ctp-mantle` | `#181825` | Background de barras (bufferline, statusline, sidebar) |
| `--ctp-base` | `#1e1e2e` | Background principal del editor |
| `--ctp-surface0` | `#313244` | Bordes neutrales, cards y tabs activas |
| `--ctp-surface1` | `#45475a` | Bordes de acento neutral y divisores |
| `--ctp-surface2` | `#585b70` | Resaltado de hover neutral |
| `--ctp-text` | `#cdd6f4` | Texto principal de alto contraste |
| `--ctp-subtext0` | `#a6adc8` | Texto secundario y etiquetas |
| `--ctp-overlay1` | `#7f849c` | Texto atenuado, números de línea |
| `--ctp-mauve` | `#cba6f7` | **Acento primario**: modo vim, tags de comando, badges |
| `--ctp-teal` | `#94e2d5` | **Acento secundario**: prompts, modo normal, métricas |
| `--ctp-peach` | `#fab387` | Puntos de lista, detalles clave |
| `--ctp-blue` | `#89b4fa` | Enlaces y tags de sistemas |

## TUI Architecture & Layout

Single-page continuous document structured into vim blocks inside a LazyVim editor interface:

```
src/
├── components/
│   ├── layout/        # TerminalLayout, SectionBlock, VimBlock, sidebar.css (index.ts)
│   ├── sections/      # Hero, Dashboard, Projects, About, Telemetry, Contact (index.ts)
│   ├── ui/            # ModeModal, CommandLine, ProgressBar (index.ts)
│   └── widgets/       # GitHubWidget, WakaTimeWidget (index.ts)
├── hooks/             # useLiveTimer, hooks reactivos (index.ts)
├── services/          # github.ts, wakatime.ts (index.ts)
├── styles/            # variables.css, reset.css, animations.css, terminal.css, a11y.css
├── test/              # setup.ts (matchers jest-dom de Vitest)
├── types/             # navigation.ts, github.ts, wakatime.ts, index.ts
└── utils/             # formatters.ts (cálculo tiempo transcurrido), index.ts

scripts/               # check-classes.mjs — auditoría className/CSS usada en CI
```

### Layout Elements
1. **Top Bufferline (`.tui-bufferline`, 38px)**:
   - Badge `LAZYVIM` + pestañas numeradas (`1 01_dashboard.lua`, `2 02_projects.tsx`, etc.).
   - Información de git (`git:(main)`), selector de modo y usuario.
2. **Left Sidebar (Neo-tree, 240px)**:
   - Lista de archivos estructurada en la parte superior.
   - Atajo `b` para alternar visibilidad.
3. **Editor Buffer Central**:
   - Desplazamiento continuo con canaleta de números de línea (`SectionBlock`).
   - Bloques navegables con borde de bloque activo (`VimBlock`).
4. **Bottom Statusline (`.tui-statusline`, 32px, Lualine)**:
   - Indicador de modo (`MODO-VIM` / `MODO-NORMAL`).
   - Ruta del archivo y componente activo (`portfolio.tsx [RO] › sección » bloque`).
   - Codificación `utf-8`, tema `Catppuccin Mocha`, posición Ln/Col y porcentaje de scroll.
5. **Bottom Commandline (`.tui-commandline`, 28px)**:
   - Guía de atajos `:ayuda`, botón interactivo `[m] cambiar modo` y prompt `axel@portafolio:~$`.

## Navigation Modes

- **Modo Vim** (`navMode: 'vim'`):
  - `j` / `k` (o flechas): Avanzar / retroceder entre bloques de componentes.
  - `1`..`5`: Salto inmediato a la sección correspondiente.
  - `g` / `G`: Ir al inicio / final del búfer.
  - `h`: Enfocar árbol Neo-tree.
  - `b`: Ocultar / mostrar barra lateral.
  - `m` / `M`: Abrir selector modal de modos.
- **Modo Normal** (`navMode: 'normal'`):
  - `ArrowDown` / `ArrowUp`: Navegar bloques.
  - `Enter`: Enfocar bloque actual.
  - `1`..`5`: Salto directo a secciones.
  - `b`: Alternar barra lateral.
  - `m` / `M`: Abrir selector modal de modos.

## Integrations

- **GitHub Activity**:
  - `fetchGitHubActivity(username)` en `src/services/github.ts`.
  - Endpoint: `https://api.github.com/users/{user}/events`.
  - Muestra los últimos 3 eventos con temporizador en vivo calculado en `src/utils/formatters.ts` (`useLiveTimer`).
  - Auth opcional vía `VITE_GITHUB_TOKEN` con fallback a datos mock locales.
- **WakaTime Metrics**:
  - `fetchWakaTimeStats()` en `src/services/wakatime.ts`.
  - Endpoint: `https://wakatime.com/api/v1/users/current/stats/last_7_days`.
  - Métricas de horas (últimos 7 días, hoy), lenguajes y editores más usados.
  - Auth opcional vía `VITE_WAKATIME_API_KEY` con fallback a datos mock locales.

## Development Workflow

```sh
# Servidor de desarrollo
pnpm dev

# Verificación de compilación TypeScript y bundle Vite
pnpm run build

# Verificación de linting
pnpm run lint

# Suite de tests (Vitest + Testing Library, jsdom)
pnpm test

# Auditoría: falla si hay tokens de className sin definición CSS
node scripts/check-classes.mjs
```

## CI / Deploy

- `.github/workflows/ci.yml`: install (pnpm, versión vía `packageManager` en `package.json`), lint, auditoría de clases, tests y build — en pushes a `main` y en PRs.
- `.github/workflows/deploy.yml`: build con `VITE_BASE_PATH=/portafolio/`, copia `dist/index.html` a `dist/404.html` (fallback SPA) y publica en GitHub Pages.
- `.github/dependabot.yml`: updates npm semanales agrupados.
