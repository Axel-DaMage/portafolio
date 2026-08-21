import React from 'react';

interface SeparatorProps {
  char?: string;
  color?: 'white' | 'magenta' | 'neon';
  label?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  color = 'white',
  label,
}) => {
  const colorClass = {
    white: 'text-[var(--color-white-20)]',
    magenta: 'text-[var(--color-magenta-50)]',
    neon: 'text-[var(--color-neon-50)]',
  }[color];

  const textColorClass = {
    white: 'text-[var(--color-white-60)]',
    magenta: 'text-[var(--color-magenta)] glow-text-magenta',
    neon: 'text-[var(--color-neon)] glow-text-neon',
  }[color];

  if (label) {
    return (
      <div className={`flex items-center my-4 font-mono select-none w-full gap-2 ${colorClass}`}>
        <span>├</span>
        <span className="flex-grow border-t border-current opacity-30" />
        <span className={`px-2 text-xs font-bold ${textColorClass}`}>[ {label} ]</span>
        <span className="flex-grow border-t border-current opacity-30" />
        <span>┤</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center my-4 font-mono select-none w-full ${colorClass}`}>
      <span className="flex-grow border-t border-current opacity-30" />
    </div>
  );
};
