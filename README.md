# portafolio

A single-window terminal TUI portfolio inspired by LazyVim / Neovim. The whole
site renders as one continuous editor buffer — bufferline on top, Neo-tree
sidebar on the left, a scrollable document with numbered lines in the center,
and a Lualine-style statusline plus commandline at the bottom — themed with
Catppuccin Mocha.

## Stack

- **React 19** + **TypeScript**
- **Vite** (dev server, bundler)
- **SWR** for data fetching (5-minute TTL) with graceful offline/mock fallback
- **Vanilla CSS** custom properties + utility classes (Catppuccin Mocha palette)
- **pnpm** as package manager
- **ESLint** + **typescript-eslint** for linting

## Commands

```sh
pnpm install        # install dependencies
pnpm dev            # start the dev server
pnpm run build      # type-check (tsc -b) and produce a production bundle
pnpm run lint       # run ESLint
pnpm run preview    # preview the production build locally
```

## Navigation modes

The UI emulates vim modal navigation. Press `m` (or `M`) to open the mode
selector, or click the mode indicator in the commandline.

### Vim mode (`navMode: 'vim'`)

| Key | Action |
|---|---|
| `j` / `k` (or arrow keys) | Move to next / previous component block |
| `1`..`5` | Jump directly to a section |
| `g` / `G` | Go to the top / bottom of the buffer |
| `h` | Focus the Neo-tree sidebar |
| `b` | Toggle the sidebar |
| `m` / `M` | Open the mode selector modal |
| `:` | Commandline help (`:ayuda`) |

### Normal mode (`navMode: 'normal'`)

| Key | Action |
|---|---|
| `ArrowDown` / `ArrowUp` | Move between blocks |
| `Enter` | Focus the current block |
| `1`..`5` | Jump directly to a section |
| `b` | Toggle the sidebar |
| `m` / `M` | Open the mode selector modal |

## Environment variables

All variables are optional. When absent (or when the network is unreachable),
the widgets degrade gracefully to bundled mock data. Copy `.env.example` to
`.env` to get started.

| Variable | Purpose |
|---|---|
| `VITE_GITHUB_USERNAME` | GitHub username queried by the activity widget (defaults to a mock profile). |
| `VITE_GITHUB_TOKEN` | Optional personal access token to raise the GitHub API rate limit for `users/{user}/events`. |
| `VITE_WAKATIME_API_KEY` | WakaTime API key used to fetch `stats/last_7_days` coding metrics. |

## Project structure

```
src/
├── components/
│   ├── animations/    # Typewriter and text effects
│   ├── layout/        # TerminalLayout, SectionBlock, VimBlock
│   ├── sections/      # Hero, Dashboard, Projects, About, Telemetry, Contact
│   ├── ui/            # ModeModal, ProgressBar, Cursor, Box, Button, ...
│   └── widgets/       # GitHubWidget, WakaTimeWidget
├── hooks/             # useLiveTimer and reactive hooks
├── services/          # github.ts, wakatime.ts data fetchers
├── styles/            # variables.css, reset.css, animations.css, terminal.css
├── types/             # navigation.ts, github.ts, wakatime.ts
└── utils/             # formatters.ts (elapsed-time helpers)
```

Each module exposes a barrel `index.ts`.

## Deployment

The site is deployed to **GitHub Pages** via `.github/workflows/deploy.yml` on
every push to `main` (or manually via `workflow_dispatch`). The workflow builds
with `VITE_BASE_PATH=/portafolio/`, which `vite.config.ts` picks up as the
`base` option; local development stays at `/`.

To enable it: **Settings -> Pages -> Source: GitHub Actions**.

CI (`.github/workflows/ci.yml`) runs lint + build on pushes to `main` and on
pull requests.
