import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  width?: number; // width in characters
  color?: 'white' | 'magenta' | 'neon';
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  width = 15,
  color = 'neon',
  showPercentage = true,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const filledCount = Math.round((percentage / 100) * width);
  const emptyCount = width - filledCount;

  const filledChar = '█';
  const emptyChar = '░';

  const colorClass = {
    white: 'text-[var(--color-white)]',
    magenta: 'text-[var(--color-magenta)] text-shadow-[var(--text-glow-magenta)]',
    neon: 'text-[var(--color-neon)] text-shadow-[var(--text-glow-neon)]',
  }[color];

  const bar = `${filledChar.repeat(filledCount)}${emptyChar.repeat(emptyCount)}`;

  return (
    <div className="flex items-center font-mono select-none">
      <span className="opacity-40 mr-1">[</span>
      <span className={colorClass}>{bar}</span>
      <span className="opacity-40 ml-1">]</span>
      {showPercentage && <span className="ml-2 min-w-[35px] text-right text-xs">{percentage}%</span>}
    </div>
  );
};
