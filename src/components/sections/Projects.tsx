import React from 'react';

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
}

export const Projects: React.FC = () => {
  const projectsList: Project[] = [
    {
      title: 'TERM-TUI-PORTFOLIO',
      description: 'Portafolio minimalista con estética de terminal, soporte para navegación por teclado y paleta Catppuccin Mocha.',
      tags: ['React 19', 'TypeScript', 'CSS Modules'],
      githubUrl: 'https://github.com/Axel-DaMage/portafolio',
      demoUrl: '#',
    },
    {
      title: 'LogOS Platform',
      description: 'Plataforma de observabilidad y agregación de telemetría de sistemas distribuidos en tiempo real.',
      tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
      githubUrl: 'https://github.com/Axel-DaMage',
    },
    {
      title: 'cli-tetris',
      description: 'Juego de consola retro desarrollado con interfaces textuales interactivas en Go.',
      tags: ['Go', 'TUI', 'Bubbletea'],
      githubUrl: 'https://github.com/Axel-DaMage/cli-tetris',
    },
  ];

  return (
    <div className="font-mono text-left w-full select-text space-y-3">
      <div className="flex items-center gap-2 text-xs text-ctp-mauve font-bold pb-1">
        <span>axel@portafolio:~$</span>
        <span className="text-ctp-teal">ls ./projects/</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        {projectsList.map((project, index) => (
          <div
            key={index}
            className="p-3 bg-ctp-surface0/30 border border-ctp-surface0 flex flex-col justify-between space-y-2.5 transition-colors hover:border-ctp-surface2"
          >
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-ctp-mauve">
                {project.title}
              </div>

              <p className="text-xs text-ctp-subtext leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-2 pt-1 border-t border-ctp-surface0">
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-1.5 py-0.2 text-[10px] bg-ctp-surface1/50 text-ctp-subtext border border-ctp-surface1 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 text-xs pt-1">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ctp-blue hover:underline font-bold"
                >
                  [código]
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="text-ctp-teal hover:underline font-bold"
                  >
                    [demo]
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
