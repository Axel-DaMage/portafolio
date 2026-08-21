# Plan de Implementación — Portafolio Terminal TUI

---

## 1. Stack Tecnológico

| Herramienta | Versión/Opción |
|---|---|
| Framework | React 18+ (Vite) |
| Lenguaje | TypeScript |
| Estilos | CSS Modules + CSS custom properties |
| Fuente | Fira Code (variable weight) |
| Paquete | pnpm |
| Linter | ESLint + Prettier |
| Despliegue | GitHub Pages / Vercel / Netlify |
| Íconos | Lucide React (con estética terminal, sin emojis) |

---

## 2. Paleta de Colores

| Nombre | Hex | Rol |
|---|---|---|
| Black | `#090909` | Fondo principal |
| White | `#ffffff` | Texto base, bordes |
| Magenta Bloom | `#ff0066` | **Color primario** — acentos, highlights, cursor |
| Neon Ice | `#00fff2` | **Color secundario** — detalles, links, secondary accents |

Uso:
- **Fondo**: `#090909` (terminal black)
- **Texto**: `#ffffff`
- **Acento principal**: `#ff0066` (neon magenta)
- **Acento secundario**: `#00fff2` (neon cyan)
- **Bordes/delimitadores**: `#ffffff` con opacidad variable
- Errores/advertencias: matices sobre `#ff0066`
- Éxito/info: matices sobre `#00fff2`

---

## 3. Estética General (Terminal TUI)

### 3.1 Inspiración visual
- https://github.com/Nomadcxx/sysc-Go#fireworks — animaciones fuegos artificiales en terminal
- https://github.com/toolleeo/awesome-cli-apps-in-a-csv#animation — recopilación de animaciones CLI
- https://ascii.com — arte ASCII, conversión imagen/video a ASCII
- https://www.retroterm.com — terminal复古 aesthetic references
- https://cool-retro-term.com — emulador terminal retro

### 3.2 Principios de diseño
- NO usar emojis en ningún momento
- Tipografía: solo Fira Code en todas sus variantes (Regular, Medium, Bold)
- Bordes con caracteres de línea (`─`, `│`, `┌`, `┐`, `└`, `┘`, `├`, `┤`, `┬`, `┴`, `┼`)
- Separadores con repetición de caracteres `─` y `━`
- Efecto de "scanlines" (líneas horizontales sutiles sobre el fondo)
- Efecto CRT glow en los colores neon (`text-shadow` con blur)
- Animaciones tipo "typewriter" para texto que aparece letra por letra
- Animaciones de "loading spinner" estilo terminal (`⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏`)
- Efecto "glitch" sutil en hover de tarjetas
- Prompt-style (`user@host:~$`) como prefijo decorativo en secciones
- Timestamps en formato 24h ISO (`2026-05-30 14:32:01 UTC`)
- "Live timer" contando hacia atrás desde la última actividad
- Cursor parpadeante estilo bloque (`▊`) o línea (`▎`)

### 3.3 Componentes animados
- **Matrix rain** en hero background (caída de caracteres hexadecimales)
- **Fireworks** estilo terminal (partículas con caracteres `*` `・` `✧`)
- **Loading skeleton** con barras progresivas animadas estilo `[===>    ]`
- **Progress bars** con formato `[████████░░░░] 67%`
- **Scrollbar** personalizada con track de `░` y thumb de `▓`
- **Notificaciones toast** estilo terminal log: `[INFO] [2026-05-30 14:32:01] Mensaje`

---

## 4. Arquitectura del Proyecto

```
portafolio/
├── public/
│   └── ascii-art/          # Archivos de arte ASCII (.txt)
├── src/
│   ├── components/
│   │   ├── ui/             # Componentes atómicos reutilizables
│   │   │   ├── Box.tsx             # Contenedor con bordes de terminal
│   │   │   ├── Button.tsx          # Botón estilo terminal
│   │   │   ├── Input.tsx           # Input con cursor tipo terminal
│   │   │   ├── Spinner.tsx         # Spinner animado
│   │   │   ├── ProgressBar.tsx     # Barra de progreso [====>  ]
│   │   │   ├── Badge.tsx           # Etiqueta estilo tag
│   │   │   ├── Separator.tsx       # Línea separadora ─────────
│   │   │   ├── Toast.tsx           # Notificación log-style
│   │   │   ├── Tooltip.tsx         # Tooltip con borde de terminal
│   │   │   └── Cursor.tsx          # Cursor parpadeante
│   │   ├── layout/
│   │   │   ├── TerminalLayout.tsx  # Layout principal tipo terminal
│   │   │   ├── Header.tsx          # Barra superior tipo título de ventana
│   │   │   ├── Footer.tsx          # Footer con stats
│   │   │   └── Sidebar.tsx         # Sidebar con navigación tipo TUI
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Sección principal con ASCII art
│   │   │   ├── About.tsx           # Información personal
│   │   │   ├── Projects.tsx        # Grid de proyectos
│   │   │   ├── Achievements.tsx    # Logros/certificaciones
│   │   │   ├── Contact.tsx         # Formulario de contacto
│   │   │   └── GitHubActivity.tsx  # Actividad reciente de GitHub
│   │   ├── widgets/
│   │   │   ├── GitHubWidget.tsx    # Conexión API GitHub
│   │   │   ├── WakaTimeWidget.tsx  # Conexión API WakaTime
│   │   │   ├── ActivityFeed.tsx    # Feed últimas 3 interacciones
│   │   │   ├── CodingHours.tsx     # Horas codeando desde WakaTime
│   │   │   └── LiveTimer.tsx       # Contador "hace X tiempo"
│   │   └── animations/
│   │       ├── MatrixRain.tsx      # Lluvia de caracteres
│   │       ├── Typewriter.tsx      # Efecto máquina de escribir
│   │       ├── GlitchText.tsx      # Efecto glitch en hover
│   │       ├── Scanlines.tsx       # Superposición de scanlines
│   │       ├── Fireworks.tsx       # Fuegos artificiales ASCII
│   │       └── TerminalSpinner.tsx # Spinner de carga estilo terminal
│   ├── hooks/
│   │   ├── useTypewriter.ts        # Hook para efecto typewriter
│   │   ├── useGitHubActivity.ts    # Hook para fetch GitHub API
│   │   ├── useWakaTime.ts          # Hook para fetch WakaTime API
│   │   ├── useLiveTimer.ts         # Hook para contador en tiempo real
│   │   ├── useMatrixRain.ts        # Hook para animación matrix
│   │   ├── useTerminalCursor.ts    # Hook para cursor parpadeante
│   │   └── useLocalStorage.ts      # Hook para persistencia local
│   ├── services/
│   │   ├── github.ts               # Llamadas a API de GitHub
│   │   ├── wakatime.ts             # Llamadas a API de WakaTime
│   │   └── cache.ts                # Estrategia de caché (SWR/React Query)
│   ├── styles/
│   │   ├── variables.css           # CSS custom properties (colores, fonts)
│   │   ├── reset.css               # Reset / normalize
│   │   ├── animations.css          # Keyframes globales
│   │   └── terminal.css            # Estilos base de terminal
│   ├── types/
│   │   ├── github.ts               # Tipos para respuestas de GitHub
│   │   ├── wakatime.ts             # Tipos para respuestas de WakaTime
│   │   └── portfolio.ts            # Tipos generales del portafolio
│   ├── utils/
│   │   ├── ascii.ts                # Utilidades para arte ASCII
│   │   ├── formatters.ts           # Formateo de fechas, números
│   │   └── constants.ts            # Constantes globales
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── plan.md
```

---

## 5. Integraciones

### 5.1 GitHub API
- **Endpoint**: `https://api.github.com/users/{username}/events`
- **Cache**: 5 minutos (React Query o SWR)
- **Qué mostrar**: Últimas 3 interacciones del usuario autenticado
  - PushEvent → " pushed to {repo} "
  - CreateEvent → " created {repo} "
  - WatchEvent → " starred {repo} "
  - ForkEvent → " forked {repo} "
  - MemberEvent → "Followed {user}"
  - IssuesEvent → " opened/closed issue in {repo} "
  - PullRequestEvent → " opened/merged PR in {repo} "
- **Formato**:
  ```
  [PUSH]  2026-05-30 14:32:01
  › pushed to username/repo
  ─────────────────────────────────────
  
  [STAR]  2026-05-30 12:15:44
  › starred owner/repo
  ─────────────────────────────────────
  
  [CREATE]  2026-05-30 10:00:00
  › created username/new-repo
  ```
- **Live timer**: "hace 2m 34s" actualizándose cada segundo
- **Autenticación**: Token de GitHub con scope `repo` y `read:user` vía variable de entorno

### 5.2 WakaTime API
- **Endpoint**: `https://wakatime.com/api/v1/users/current/stats/last_7_days`
- **Qué mostrar**:
  - Total de horas codeadas (hoy, 7 días, 30 días)
  - Lenguajes más usados con barras de progreso
  - Editores más usados
  - Proyectos más activos
- **Formato**:
  ```
  ┌──── WAKATIME CODING STATS ────┐
  │                                │
  │  Total (7d):   42h 15m        │
  │  Today:         5h 32m        │
  │                                │
  │  Languages:                   │
  │  TypeScript    [████████░░] 67%│
  │  Python        [████░░░░░░] 30%│
  │  Rust          [██░░░░░░░░] 18%│
  │                                │
  └────────────────────────────────┘
  ```

---

## 6. Secciones del Portafolio

### 6.1 Hero
- Arte ASCII del nombre o avatar (convertido con ascii.com)
- Prompt de bienvenida: `axel@portafolio:~$ _`
- Matrix rain de fondo (opcional, toggle)
- Cursor parpadeante

### 6.2 About / Sobre Mí
```
axel@portafolio:~$ cat about.md
─────────────────────────────────────
 Nombre:    Axel
 Rol:       Full-Stack Developer
 Location:  [Ciudad], [País]
─────────────────────────────────────
 Breve descripción personal...
```

### 6.3 Proyectos
- Grid 2-3 columnas
- Cada proyecto como una tarjeta con bordes de terminal
- Badges de tecnologías
- Links a GitHub y live demo
- Efecto glitch en hover

### 6.4 Logros / Achievements
- Certificaciones, cursos, hitos
- Display tipo timeline vertical con caracteres `├──` y `└──`

### 6.5 GitHub Activity
- Feed con últimas 3 interacciones
- Live timer para cada una

### 6.6 WakaTime Stats
- Widget con estadísticas de código
- Barras de progreso animadas

### 6.7 Contacto
- Formulario (o mailto)
- Links a redes sociales (GitHub, LinkedIn, Twitter/X)
- Output tipo:
  ```
  axel@portafolio:~$ sendmail --to axel@email.com
  ┌──────────────────────────────────┐
  │  Mensaje enviado correctamente   │
  └──────────────────────────────────┘
  ```

---

## 7. Animaciones Detalladas

### 7.1 Matrix Rain
- Canvas HTML5
- Caracteres: katakana + hexadecimales + símbolos ASCII
- Velocidad variable, color `#00fff2` con opacidad degradada
- Referencia: https://github.com/Nomadcxx/sysc-Go#fireworks

### 7.2 Fireworks (opcional, sección achievements)
- Partículas con caracteres `*` `・` `✦` `✧`
- Estallido desde punto central, gravedad simulada
- Colores: `#ff0066`, `#00fff2`, `#ffffff`

### 7.3 Typewriter
- Texto aparece letra por letra
- Velocidad: 50-100ms por carácter
- Cursor parpadeante al final

### 7.4 Glitch
- Desplazamiento de color RGB en hover
- Efecto de "corte" horizontal aleatorio

### 7.5 Scanlines
- Superposición CSS con repeating-linear-gradient
- Opacidad muy baja (< 5%)
- Efecto de monitor CRT

### 7.6 Terminal Loading
- Spinners: `⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏`
- Progress bars: `[████████░░░░]`
- Skeleton: bloques grises parpadeantes

### 7.7 Borde Animado
- Bordes de las tarjetas con gradiente animado (neon cyan → neon magenta → neon cyan)

---

## 8. CSS Variables (variables.css)

```css
:root {
  /* Colores */
  --color-black: #090909;
  --color-white: #ffffff;
  --color-magenta: #ff0066;
  --color-neon: #00fff2;

  /* Opacidades */
  --color-white-10: rgba(255, 255, 255, 0.1);
  --color-white-20: rgba(255, 255, 255, 0.2);
  --color-white-50: rgba(255, 255, 255, 0.5);
  --color-magenta-50: rgba(255, 0, 102, 0.5);
  --color-neon-50: rgba(0, 255, 242, 0.5);

  /* Tipografía */
  --font-mono: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --font-size-3xl: 2.5rem;

  /* Espaciado */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Bordes */
  --border-thin: 1px solid var(--color-white-20);
  --border-neon: 1px solid var(--color-magenta);

  /* Transiciones */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;

  /* Neon glow */
  --glow-magenta: 0 0 10px var(--color-magenta-50), 0 0 20px var(--color-magenta-50);
  --glow-neon: 0 0 10px var(--color-neon-50), 0 0 20px var(--color-neon-50);

  /* Z-index layers */
  --z-background: 0;
  --z-content: 10;
  --z-overlay: 20;
  --z-modal: 30;
  --z-toast: 40;
}
```

---

## 9. Plan de Implementación por Fases

### Fase 1: Setup y Base
- [ ] Inicializar proyecto Vite + React + TypeScript
- [ ] Configurar Fira Code (Google Fonts o self-hosted)
- [ ] Crear archivo de variables CSS
- [ ] Configurar ESLint + Prettier

### Fase 2: Layout y Componentes UI
- [ ] TerminalLayout (estructura principal tipo terminal)
- [ ] Box (contenedor con bordes de terminal)
- [ ] Button, Input, Badge, Separator
- [ ] Header con título de "ventana" tipo terminal
- [ ] Footer con stats

### Fase 3: Animaciones Base
- [ ] Scanlines overlay
- [ ] Cursor parpadeante
- [ ] Typewriter effect + hook
- [ ] Terminal spinner
- [ ] Progress bar animada

### Fase 4: Secciones Principales
- [ ] Hero con ASCII art y prompt
- [ ] About (formato cat de archivo)
- [ ] Projects grid con tarjetas
- [ ] Achievements timeline
- [ ] Contact form con output tipo terminal
- [ ] Matrix rain background

### Fase 5: Integraciones
- [ ] Servicio de GitHub API
- [ ] GitHubActivity widget con últimas 3 interacciones
- [ ] LiveTimer hook (hace X tiempo)
- [ ] Servicio de WakaTime API
- [ ] WakaTimeWidget con stats y progress bars

### Fase 6: Pulido
- [ ] Efecto glitch en hover
- [ ] Borde animado neon en tarjetas
- [ ] Fireworks animation
- [ ] Responsive design
- [ ] Modo offline / loading states
- [ ] SEO y meta tags

### Fase 7: Despliegue
- [ ] Build de producción
- [ ] Configurar dominio personalizado (opcional)
- [ ] Desplegar en Vercel / Netlify / GitHub Pages

---

## 10. Notas Adicionales

- **No usar emojis** en ningún lugar del proyecto
- **Commits y push**: no realizar hasta indicación expresa
- **Paleta cerrada**: no desviarse de los 4 colores definidos
- **Rendimiento**: lazy loading en secciones pesadas, animaciones con `will-change` y `transform`
- **Accesibilidad**: mantener contraste suficiente, soportar prefers-reduced-motion
- **Fuente**: Fira Code debe cargarse con font-display: swap y subsets latinos
- **Arte ASCII**: assets .txt en `/public/ascii-art/` para carga estática
