import React from 'react';
import { Box } from '../ui/Box';
import { Button } from '../ui/Button';

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
      description: 'A completely customized command-line style terminal interface with retro CRT overlays, scanlines, and live integration hooks.',
      tags: ['React 18', 'TypeScript', 'CSS Modules', 'SWR'],
      githubUrl: 'https://github.com/Axel-DaMage/portafolio',
      demoUrl: '#',
    },
  ];

  return (
    <div className="font-mono text-sm space-y-6 py-2 select-text w-full flex flex-col items-center">
      <div className="flex justify-center items-center gap-2">
        <span className="text-[var(--color-magenta)] font-bold">axel@portafolio:~$</span>
        <span className="text-[var(--color-white)]">ls -la --color ./projects/</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-stretch">
        {projectsList.map((project, index) => (
          <Box
            key={index}
            borderStyle="single"
            color="white"
            title={project.title}
            centerContent={true}
            className="hover:border-[var(--color-magenta)] transition-all duration-300 group hover:shadow-[var(--glow-magenta)]"
          >
            <div className="flex flex-col h-full justify-between items-center gap-4 text-center w-full">
              <div className="space-y-3 flex flex-col items-center w-full">
                <p className="text-xs text-[var(--color-white-60)] leading-relaxed min-h-[60px] max-w-sm text-center">
                  {project.description}
                </p>

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5 pt-2 justify-center">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-1.5 py-0.5 text-[10px] border border border-[var(--color-white-20)] text-[var(--color-white-40)] font-bold rounded-sm group-hover:border-[var(--color-neon)] group-hover:text-[var(--color-neon)] select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons centered */}
              <div className="flex items-center justify-center gap-3 border-t border-[var(--color-white-10)] pt-3 w-full mt-auto">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button variant="bracket" color="magenta" className="text-xs">
                    SOURCE
                  </Button>
                </a>
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button variant="bracket" color="neon" className="text-xs">
                      DEMO
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
};
