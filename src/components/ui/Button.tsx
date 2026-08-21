import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'bracket' | 'box' | 'ghost';
  color?: 'white' | 'magenta' | 'neon';
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'bracket',
  color = 'white',
  active = false,
  className = '',
  ...props
}) => {
  const baseClass = 'font-mono transition-all duration-150 outline-none select-none cursor-pointer inline-flex items-center justify-center';
  
  const colorMap = {
    white: {
      text: 'text-[var(--color-white)]',
      hover: 'hover:text-[var(--color-neon)] hover:text-shadow-[var(--glow-neon)]',
      active: 'text-[var(--color-neon)] font-bold',
      border: 'border-[var(--color-white-20)] hover:border-[var(--color-neon)]',
    },
    magenta: {
      text: 'text-[var(--color-magenta)] text-shadow-[var(--text-glow-magenta)]',
      hover: 'hover:text-[var(--color-white)] hover:text-shadow-[0_0_5px_rgba(255,255,255,0.5)]',
      active: 'text-[var(--color-magenta)] font-bold border-[var(--color-magenta)]',
      border: 'border-[var(--color-magenta)] hover:border-[var(--color-white)]',
    },
    neon: {
      text: 'text-[var(--color-neon)] text-shadow-[var(--text-glow-neon)]',
      hover: 'hover:text-[var(--color-white)] hover:text-shadow-[0_0_5px_rgba(255,255,255,0.5)]',
      active: 'text-[var(--color-neon)] font-bold border-[var(--color-neon)]',
      border: 'border-[var(--color-neon)] hover:border-[var(--color-white)]',
    },
  }[color];

  if (variant === 'bracket') {
    return (
      <button
        className={`${baseClass} ${colorMap.text} ${colorMap.hover} ${active ? colorMap.active : ''} ${className}`}
        {...props}
      >
        <span className="opacity-60 mr-1">[</span>
        <span className="px-1">{children}</span>
        <span className="opacity-60 ml-1">]</span>
      </button>
    );
  }

  if (variant === 'box') {
    return (
      <button
        className={`${baseClass} border px-4 py-1 bg-[var(--color-black)] ${colorMap.text} ${colorMap.border} ${colorMap.hover} ${active ? 'border-2' : ''} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={`${baseClass} ${colorMap.text} ${colorMap.hover} ${active ? 'underline' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
