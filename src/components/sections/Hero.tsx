import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="font-mono text-left w-full select-text space-y-2">
      <div className="flex items-center gap-2 text-xs text-ctp-mauve font-bold">
        <span>axel@portafolio:~$</span>
        <span className="text-ctp-teal">whoami</span>
      </div>

      <div className="space-y-0.5 pt-0.5">
        <h1 className="text-base md:text-lg font-bold text-[var(--color-white)] tracking-wide">
          Axel Moraga
        </h1>
        <p className="text-xs text-ctp-subtext">
          Desarrollador Fullstack y Sistemas • Santiago, Chile
        </p>
      </div>

      <p className="text-xs text-[var(--color-white-80)] max-w-2xl leading-relaxed pt-1">
        Desarrollo de interfaces interactivas inspiradas en terminales, software modular con TypeScript y sistemas de observabilidad. Co-desarrollando la plataforma <span className="text-ctp-teal font-bold">LogOS</span>.
      </p>
    </div>
  );
};
