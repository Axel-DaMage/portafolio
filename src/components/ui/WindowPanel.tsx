import React from 'react';

interface WindowPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  contentClassName?: string;
  children: React.ReactNode;
}

export const WindowPanel: React.FC<WindowPanelProps> = ({
  title = 'TERMINAL',
  contentClassName = '',
  children,
  className = '',
  ...props
}) => {
  return (
    <div 
      className={`relative bg-[var(--color-black)] border-[var(--color-neon)] border shadow-[0_0_15px_var(--color-neon-20)] flex flex-col font-mono text-[var(--color-white)] electric-panel ${className}`}
      {...props}
    >
      {/* CRT Scanline overlay effect just for the window */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-20 opacity-30 mix-blend-overlay"></div>
      
      {/* Window Handle (Title Bar) */}
      <div className="bg-[var(--color-neon-dark)] text-[var(--color-black)] border-b border-[var(--color-neon)] px-2 py-1 flex items-center justify-between select-none relative z-30 flex-shrink-0 shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
        <span className="font-bold text-xs tracking-wider">[{title}]</span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-black)] opacity-40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-black)] opacity-40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-black)] opacity-80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
        </div>
      </div>

      {/* Window Content */}
      <div className={`p-3 relative z-10 h-full overflow-y-auto min-h-0 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};