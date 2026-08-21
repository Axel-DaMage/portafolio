import React from 'react';
import { Box } from '../ui/Box';
import { Separator } from '../ui/Separator';

export const About: React.FC = () => {
  const skills = [
    { category: 'FRONTEND', items: ['React 18+', 'TypeScript', 'HTML5 / CSS Modules', 'Next.js'] },
    { category: 'BACKEND', items: ['Node.js', 'Express', 'PostgreSQL', 'RESTful APIs'] },
    { category: 'SYSTEMS & TOOLS', items: ['Git', 'Vite', 'Docker', 'Linux / Bash'] },
  ];

  return (
    <div className="font-mono text-sm space-y-6 py-2 select-text w-full flex flex-col items-center">
      <div className="flex justify-center items-center gap-2">
        <span className="text-[var(--color-magenta)] font-bold">axel@portafolio:~$</span>
        <span className="text-[var(--color-white)]">cat about.md</span>
      </div>

      <Box borderStyle="double" color="magenta" title="PROFILE_SUMMARY" centerContent={true}>
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-center w-full max-w-lg">
            <div><span className="text-[var(--color-neon)] font-bold">› NAME:</span> Axel</div>
            <div><span className="text-[var(--color-neon)] font-bold">› ROLE:</span> Full-Stack Developer</div>
            <div><span className="text-[var(--color-neon)] font-bold">› LOCATION:</span> Santiago, Chile</div>
            <div><span className="text-[var(--color-neon)] font-bold">› STACK:</span> TypeScript, React, Node.js</div>
          </div>

          <Separator char="─" color="white" />

          <p className="text-[var(--color-white-80)] text-xs md:text-sm text-center max-w-xl leading-relaxed">
            Estudiante de Ingeniería en Informática y desarrollador web enfocado en la creación de interfaces interactivas estilo terminal (TUI), diseño de software modular con TypeScript y co-desarrollo de startups tecnológicas.
          </p>
        </div>
      </Box>

      <div className="flex justify-center items-center gap-2 pt-2">
        <span className="text-[var(--color-magenta)] font-bold">axel@portafolio:~$</span>
        <span className="text-[var(--color-white)]">cat skills.json</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {skills.map((skillGroup, index) => (
          <Box key={index} borderStyle="single" color="neon" title={skillGroup.category} centerContent={true}>
            <ul className="space-y-2 text-xs text-center flex flex-col items-center justify-center">
              {skillGroup.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-center justify-center gap-1.5 w-full">
                  <span className="text-[var(--color-neon)]">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Box>
        ))}
      </div>
    </div>
  );
};
