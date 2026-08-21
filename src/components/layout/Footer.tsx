import React from 'react';
import { Code, FolderGit, Link2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-4 pt-3 font-mono text-[10px] text-[var(--color-white-40)] select-none w-full relative min-h-[32px]">
      {/* Top border line cut on the left to avoid collision with the 3 squares */}
      <div className="absolute top-0 right-0 h-[1px] bg-[var(--color-white-10)] left-10" />
      {/* 3 squares on the absolute left-0 edge, vertically centered, affected by neon beam */}
      <div className="absolute-y-center left-0 flex items-center">
        <span className="flex items-center gap-0.5">
          <span className="text-[8px] text-neon animate-beam">■</span>
          <span className="text-[8px] text-neon animate-beam">■</span>
          <span className="text-[8px] text-neon animate-beam">■</span>
        </span>
      </div>

      {/* Centered social icons affected by white beam */}
      <div className="flex items-center justify-center gap-6 w-full min-h-[32px]">
        <a
          href="https://github.com/Axel-DaMage/portafolio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white-40 animate-beam hover:text-[var(--color-neon)] transition-colors"
          title="Código Fuente"
        >
          <Code size={16} />
        </a>
        <a
          href="https://github.com/Axel-DaMage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white-40 animate-beam hover:text-[var(--color-neon)] transition-colors"
          title="GitHub Profile"
        >
          <FolderGit size={16} />
        </a>
        <a
          href="#"
          className="text-white-40 animate-beam hover:text-[var(--color-neon)] transition-colors"
          title="LinkedIn Profile"
        >
          <Link2 size={16} />
        </a>
      </div>
    </footer>
  );
};
