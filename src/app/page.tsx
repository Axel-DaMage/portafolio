const projects = [
  {
    name: "joidy",
    kind: "FOSS notes app",
    description:
      "A free and open-source note-taking web app shaped around speed, ownership, and a clean writing flow.",
    language: "Python / Svelte",
    stars: "04",
    href: "https://github.com/Axel-DaMage/joidy",
    accent: "text-lime-300",
    border: "hover:border-lime-300/60",
    glow: "from-lime-300/20",
    span: "lg:col-span-3",
  },
  {
    name: "Faster",
    kind: "terminal ritual",
    description:
      "Fastfetch configuration script for people who treat the terminal as a personal operating system.",
    language: "Python",
    stars: "06",
    href: "https://github.com/Axel-DaMage/Faster",
    accent: "text-cyan-300",
    border: "hover:border-cyan-300/60",
    glow: "from-cyan-300/20",
    span: "lg:col-span-2",
  },
  {
    name: "Dotfiles",
    kind: "Arch / Hyprland",
    description:
      "A highly personal Arch Linux and Hyprland setup: Waybar, terminal ergonomics, and visual coherence.",
    language: "CSS / Shell",
    stars: "04",
    href: "https://github.com/Axel-DaMage/Dotfiles",
    accent: "text-fuchsia-300",
    border: "hover:border-fuchsia-300/60",
    glow: "from-fuchsia-300/20",
    span: "lg:col-span-2",
  },
  {
    name: "opencode-config",
    kind: "agentic workflow",
    description:
      "Personal AI-agent configuration exploring MCP, automation, and reproducible developer workflows.",
    language: "Shell",
    stars: "04",
    href: "https://github.com/Axel-DaMage/opencode-config",
    accent: "text-amber-300",
    border: "hover:border-amber-300/60",
    glow: "from-amber-300/20",
    span: "lg:col-span-3",
  },
  {
    name: "fullstack-ss",
    kind: "social platform",
    description:
      "React frontend for Sanos y Salvos, built as part of a full-stack project with geolocation services.",
    language: "TypeScript / React",
    stars: "03",
    href: "https://github.com/Axel-DaMage/fullstack-ss-frontend",
    accent: "text-sky-300",
    border: "hover:border-sky-300/60",
    glow: "from-sky-300/20",
    span: "lg:col-span-5",
  },
];

const signals = [
  [
    "01",
    "White Hat",
    "Security curiosity with an ethical constraint: understand systems to defend them.",
  ],
  [
    "02",
    "FOSS",
    "Open-source first: inspectable tools, portable knowledge, and software that respects the user.",
  ],
  [
    "03",
    "Trilingual",
    "English, Spanish, and Chinese as operating modes for crossing technical communities.",
  ],
  [
    "04",
    "Community",
    "AWS Student Builder and staff member at os-santiago, learning in public with others.",
  ],
];

const principles = [
  "Linux is not a hobby; it is a laboratory.",
  "Small tools, sharp edges, composable systems.",
  "Aesthetics matter because attention is infrastructure.",
  "Automation should make humans more dangerous, not more dependent.",
];

const terminalLines = [
  "whoami → inop1a",
  "location → /wired",
  "mission → build/open/defend",
  "status → accepting_signal",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050508] text-zinc-100">
      <div aria-hidden="true" className="noise-layer" />
      <div aria-hidden="true" className="grid-floor" />
      <div aria-hidden="true" className="ambient ambient-one" />
      <div aria-hidden="true" className="ambient ambient-two" />

      <section className="relative z-10 flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-14">
        <nav className="flex items-center justify-between border-b border-white/10 pb-5 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-zinc-400">
          <a
            href="#top"
            className="text-zinc-100 transition hover:text-lime-300"
          >
            inop1a/portfolio
          </a>
          <div className="hidden items-center gap-6 sm:flex">
            <a href="#projects" className="transition hover:text-cyan-300">
              projects
            </a>
            <a href="#signal" className="transition hover:text-fuchsia-300">
              signal
            </a>
            <a
              href="https://github.com/Axel-DaMage"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-lime-300"
            >
              github
            </a>
          </div>
        </nav>

        <div
          id="top"
          className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-8"
        >
          <div className="relative">
            <p className="terminal-caret mb-8 font-mono text-xs uppercase tracking-[0.38em] text-lime-300">
              access granted :: experimental build
            </p>
            <h1 className="max-w-5xl text-[clamp(4.6rem,14vw,13.5rem)] font-black leading-[0.74] tracking-[-0.1em] text-zinc-50">
              INO
              <span className="text-outline">P1A</span>
            </h1>
            <div className="mt-8 max-w-2xl border-l border-lime-300/50 pl-5">
              <p className="text-xl leading-8 text-zinc-300 sm:text-2xl sm:leading-9">
                Student, white-hat, FOSS builder, and system tinkerer crafting
                sharp tools at the intersection of security, Linux culture, and
                experimental web interfaces.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center overflow-hidden border border-lime-300/60 px-6 py-4 font-mono text-xs uppercase tracking-[0.28em] text-lime-200 transition duration-300 hover:text-black"
              >
                <span className="absolute inset-0 translate-y-full bg-lime-300 transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative">enter archive</span>
              </a>
              <a
                href="https://github.com/Axel-DaMage"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-white/15 px-6 py-4 font-mono text-xs uppercase tracking-[0.28em] text-zinc-300 transition hover:border-cyan-300/60 hover:text-cyan-200"
              >
                source / github
              </a>
            </div>
          </div>

          <aside className="identity-card relative min-h-[540px] overflow-hidden border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
            <div className="relative z-10 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.3em] text-zinc-400">
              <span>identity://inop1a</span>
              <span className="flex items-center gap-2 text-lime-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-lime-300" />
                online
              </span>
            </div>

            <div className="orbital-shell" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="core">∴</div>
            </div>

            <div className="relative z-10 mt-72 space-y-3 font-mono text-sm text-zinc-300">
              {terminalLines.map((line) => (
                <p key={line} className="border-b border-white/8 pb-2">
                  <span className="mr-3 text-cyan-300">▸</span>
                  {line}
                </p>
              ))}
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap gap-2">
              {["ENG", "ESP", "\u4e2d\u6587", "FOSS", "ARCH", "AWS"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="border border-white/10 bg-black/30 px-3 py-2 font-mono text-[0.65rem] tracking-[0.24em] text-zinc-300"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </aside>
        </div>
      </section>

      <div className="marquee relative z-10 border-y border-white/10 bg-black/40 py-4 font-mono text-xs uppercase tracking-[0.34em] text-zinc-400">
        <div className="marquee-track">
          {Array.from({ length: 2 }, (_, copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {[
                "open source",
                "white hat",
                "linux systems",
                "experimental web",
                "aws student builder",
                "os-santiago staff",
              ].map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="mx-8 whitespace-nowrap"
                >
                  {item} <span className="text-lime-300">{"//"}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section
        id="projects"
        className="relative z-10 px-5 py-24 sm:px-10 lg:px-14"
      >
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.36em] text-cyan-300">
              /archive
            </p>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.06em] text-zinc-50 sm:text-7xl">
              Selected builds
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-zinc-400">
            Public artifacts pulled from the GitHub orbit: useful tools, systems
            experiments, interfaces, and configurations that document how I
            think.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={`project-card group relative min-h-[280px] overflow-hidden border border-white/10 bg-zinc-950/70 p-6 transition duration-500 hover:-translate-y-2 ${project.border} ${project.span}`}
            >
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-gradient-to-br ${project.glow} via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100`}
              />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-zinc-500">
                      {String(index + 1).padStart(2, "0")} / {project.kind}
                    </p>
                    <h3
                      className={`mt-5 text-4xl font-black tracking-[-0.05em] ${project.accent}`}
                    >
                      {project.name}
                    </h3>
                  </div>
                  <span className="font-mono text-5xl font-black text-white/8 transition group-hover:text-white/20">
                    {project.stars}
                  </span>
                </div>
                <div>
                  <p className="max-w-xl text-base leading-7 text-zinc-300">
                    {project.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.24em] text-zinc-500">
                    <span>{project.language}</span>
                    <span className="transition group-hover:translate-x-1 group-hover:text-zinc-200">
                      open repository →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section
        id="signal"
        className="relative z-10 border-t border-white/10 px-5 py-24 sm:px-10 lg:px-14"
      >
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.36em] text-fuchsia-300">
              /signal
            </p>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.06em] text-zinc-50 sm:text-7xl">
              Operating frequency
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-8 text-zinc-400">
              The profile is not a resume. It is a living system: part security
              mindset, part open-source craft, part interface experiment.
            </p>
          </div>

          <div className="space-y-4">
            {signals.map(([index, title, body]) => (
              <article
                key={title}
                className="group grid gap-4 border border-white/10 bg-white/[0.025] p-5 transition hover:border-fuchsia-300/50 sm:grid-cols-[80px_1fr]"
              >
                <span className="font-mono text-sm text-fuchsia-300">
                  {index}
                </span>
                <div>
                  <h3 className="text-2xl font-bold tracking-[-0.03em] text-zinc-100">
                    {title}
                  </h3>
                  <p className="mt-2 leading-7 text-zinc-400">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {principles.map((principle, index) => (
            <div
              key={principle}
              className="border border-white/10 bg-black/30 p-5"
            >
              <p className="font-mono text-xs text-lime-300">0{index + 1}</p>
              <p className="mt-5 min-h-24 text-xl font-semibold leading-8 tracking-[-0.02em] text-zinc-200">
                {principle}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 overflow-hidden border-t border-white/10 px-5 py-16 sm:px-10 lg:px-14">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.36em] text-lime-300">
              /contact
            </p>
            <h2 className="mt-4 max-w-3xl text-5xl font-black leading-none tracking-[-0.07em] text-zinc-50 sm:text-7xl">
              Transmit through GitHub.
            </h2>
          </div>
          <a
            href="https://github.com/Axel-DaMage"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-4 border border-white/15 px-6 py-4 font-mono text-xs uppercase tracking-[0.28em] text-zinc-200 transition hover:border-lime-300/70 hover:text-lime-200"
          >
            @Axel-DaMage
            <span className="transition group-hover:translate-x-1">↗</span>
          </a>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-zinc-500 sm:flex-row">
          <span>inop1a — portfolio v0.1</span>
          <span>built with next.js / tailwind / wired energy</span>
        </div>
      </footer>
    </main>
  );
}
