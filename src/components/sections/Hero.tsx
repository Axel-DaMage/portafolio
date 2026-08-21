import React, { useState } from 'react';
import { Typewriter } from '../animations/Typewriter';

export const Hero: React.FC = () => {
  const [introStep, setIntroStep] = useState(0);

  const asciiBanner = `
 █████  ███    ███ ███████ ██      
██   ██  ███  ███  ██      ██      
███████   █████    █████   ██      
██   ██  ███  ███  ██      ██      
██   ██ ███    ███ ███████ ███████ 
`;

  return (
    <div className="flex flex-col items-center justify-center font-mono py-2 text-center w-full select-none">
      {/* Centered pre-rendered banner */}
      <div className="flex justify-center w-full overflow-x-auto">
        <pre className="text-xs md:text-sm glow-text-magenta select-none leading-tight font-bold mb-4 whitespace-pre text-center mx-auto">
          {asciiBanner}
        </pre>
      </div>

      {/* Centered terminal prompt typewriter sequence */}
      <div className="flex flex-col items-center justify-center w-full max-w-lg space-y-2 text-xs md:text-sm">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[var(--color-magenta)] font-bold">axel@portafolio:~$</span>
          <Typewriter
            text="whoami"
            speed={50}
            onComplete={() => setIntroStep(1)}
          />
        </div>

        {introStep >= 1 && (
          <div className="text-[var(--color-white-60)] text-xs md:text-sm text-center px-4 py-1">
            <Typewriter
              text="Axel - Developer & TUI enthusiast. Building highly interactive terminal-style web solutions using React, TypeScript, and modern styling architectures."
              speed={15}
              delay={200}
            />
          </div>
        )}
      </div>
    </div>
  );
};
