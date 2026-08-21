import React from 'react';

interface BoxProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  borderStyle?: 'single' | 'double' | 'dashed' | 'none';
  color?: 'white' | 'magenta' | 'neon';
  title?: string;
  centerContent?: boolean;
}

export const Box: React.FC<BoxProps> = ({
  children,
  borderStyle = 'single',
  color = 'white',
  title,
  centerContent = true,
  className = '',
  style,
  ...props
}) => {
  // Crisp Solid Color Styles (No Glows/Shadows)
  const colorClass = {
    white: 'border-[var(--color-white-20)] text-[var(--color-white)]',
    magenta: 'border-[var(--color-magenta)] text-[var(--color-magenta)]',
    neon: 'border-[var(--color-neon)] text-[var(--color-neon)]',
  }[color];

  const textStyleColor = {
    white: 'text-[var(--color-white)]',
    magenta: 'text-[var(--color-magenta)]',
    neon: 'text-[var(--color-neon)]',
  }[color];

  if (borderStyle === 'none') {
    return (
      <div
        className={`bg-[var(--color-black)] p-4 ${centerContent ? 'text-center flex flex-col items-center justify-center' : ''} ${className}`}
        style={{ ...style }}
        {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}
      >
        {title && (
          <div className={`mb-3 font-bold text-center ${textStyleColor}`}>
            › [ {title} ] ‹
          </div>
        )}
        <div className="text-[var(--color-white)] w-full">{children}</div>
      </div>
    );
  }

  const borderStyleClass = {
    single: 'border-solid border',
    double: 'border-double border-4',
    dashed: 'border-dashed border',
  }[borderStyle];

  return (
    <fieldset
      className={`bg-[var(--color-black)] font-mono ${borderStyleClass} ${colorClass} px-4 py-3 ${className.includes('w-') ? '' : 'w-full'} ${className}`}
      style={{ ...style }}
      {...props}
    >
      {title && (
        <legend className={`mx-auto px-2 font-bold text-xs md:text-sm uppercase tracking-wider select-none ${textStyleColor}`}>
          [ {title} ]
        </legend>
      )}
      <div className={`w-full text-[var(--color-white)] ${
        centerContent ? 'text-center flex flex-col items-center justify-center' : ''
      }`}>
        {children}
      </div>
    </fieldset>
  );
};
