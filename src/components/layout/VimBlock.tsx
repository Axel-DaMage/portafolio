import React from 'react';

interface VimBlockProps {
  id: string;
  blockIndex: number;
  activeBlockIndex: number;
  onSelectBlock: (index: number) => void;
  title?: string;
  children: React.ReactNode;
}

export const VimBlock: React.FC<VimBlockProps> = ({
  id,
  blockIndex,
  activeBlockIndex,
  onSelectBlock,
  title,
  children,
}) => {
  const isActive = blockIndex === activeBlockIndex;

  return (
    <div
      id={id}
      onClick={() => onSelectBlock(blockIndex)}
      className={`vim-block p-3 rounded-none relative cursor-pointer mb-3 text-left ${
        isActive ? 'vim-block-active' : ''
      }`}
    >
      {title && (
        <div className="flex items-center justify-between text-[11px] mb-2 font-mono select-none border-b border-ctp-surface0 pb-1">
          <div className="flex items-center gap-1.5">
            <span className={isActive ? 'text-ctp-mauve font-bold' : 'text-transparent'}>
              ▶
            </span>
            <span className={isActive ? 'text-ctp-mauve font-bold' : 'text-ctp-subtext'}>
              {title}
            </span>
          </div>
        </div>
      )}
      <div className="text-left w-full">
        {children}
      </div>
    </div>
  );
};
