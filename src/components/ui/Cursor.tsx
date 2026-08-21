import React from 'react';

interface CursorProps {
  char?: string;
  color?: 'white' | 'magenta' | 'neon';
  blink?: boolean;
}

export const Cursor: React.FC<CursorProps> = ({
  char = '▊',
  color = 'magenta',
  blink = true,
}) => {
  const colorClass = {
    white: 'text-[var(--color-white)]',
    magenta: 'text-[var(--color-magenta)] drop-shadow-[0_0_3px_var(--color-magenta)]',
    neon: 'text-[var(--color-neon)] drop-shadow-[0_0_3px_var(--color-neon)]',
  }[color];

  return (
    <span className={`inline-block leading-none ${colorClass} ${blink ? 'animate-blink' : ''}`}>
      {char}
    </span>
  );
};
