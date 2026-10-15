import React from 'react';

interface SectionBlockProps {
  id: string;
  index: string;
  fileName: string;
  startLine: number;
  lineCount: number;
  isActive: boolean;
  children: React.ReactNode;
}

export const SectionBlock: React.FC<SectionBlockProps> = ({
  id,
  fileName,
  startLine,
  lineCount,
  isActive,
  children,
}) => {
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => startLine + i);

  return (
    <section id={`section-${id}`} className="w-full flex flex-col font-mono mb-6 scroll-mt-4">
      {/* Clean minimal file tag */}
      <div className="flex items-center gap-2 mb-2 select-none text-[11px]">
        <span className={isActive ? 'text-ctp-mauve font-bold' : 'text-ctp-overlay'}>
          {fileName}
        </span>
      </div>

      {/* Main section body with left line gutter */}
      <div className="flex flex-row w-full items-stretch">
        {/* Line Gutter */}
        <div className="hidden sm:flex flex-col items-end pr-2.5 mr-3 select-none text-[11px] text-ctp-overlay/40 border-r border-ctp-surface0 min-w-[2rem] leading-relaxed">
          {lineNumbers.map((num) => (
            <span
              key={num}
              className={isActive && num === startLine ? 'text-ctp-teal font-bold' : ''}
            >
              {num}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </section>
  );
};
