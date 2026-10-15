import React, { useState } from 'react';
import type { NavMode } from '../../types';

interface CommandLineProps {
  navMode: NavMode;
  isOpen: boolean;
  error: string | null;
  helpOpen: boolean;
  onCancel: () => void;
  onExecute: (raw: string) => void;
  onOpenModeModal: () => void;
}

export const CommandLine: React.FC<CommandLineProps> = ({
  navMode,
  isOpen,
  error,
  helpOpen,
  onCancel,
  onExecute,
  onOpenModeModal,
}) => {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      const raw = value;
      setValue('');
      onExecute(raw);
    } else if (e.key === 'Escape') {
      setValue('');
      onCancel();
    }
  };

  return (
    <div className="tui-commandline relative px-3 flex items-center justify-between text-xs text-ctp-subtext select-none text-left">
      {/* Help panel (':ayuda') floats above the bar */}
      {helpOpen && (
        <div
          className="absolute left-0 z-30 flex flex-col gap-1.5 p-2 bg-ctp-mantle border border-ctp-surface1 text-xs whitespace-nowrap"
          style={{ bottom: '100%' }}
        >
          <span className="text-ctp-mauve font-bold">:ayuda — comandos</span>
          <span>
            <span className="text-ctp-teal font-bold">:e &lt;archivo&gt;</span> ir a sección (:e projects · :e 02_projects.tsx)
          </span>
          <span>
            <span className="text-ctp-teal font-bold">:1..5</span> salto directo a sección
          </span>
          <span>
            <span className="text-ctp-teal font-bold">:set mode vim|normal</span> cambiar modo
          </span>
          <span>
            <span className="text-ctp-teal font-bold">:q</span> intentar salir
          </span>
          <span className="text-ctp-subtext">teclas: j/k mover · g/G inicio/fin · b árbol · m modo · : comandos</span>
          <span className="text-ctp-overlay">[esc / enter] cerrar</span>
        </div>
      )}

      {isOpen ? (
        <div className="flex items-center gap-1.5 flex-1 h-full">
          <span className="text-ctp-mauve font-bold">:</span>
          <input
            type="text"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={onCancel}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="command line"
            className="tui-command-input h-full"
          />
        </div>
      ) : error ? (
        <div className="tui-cmdline-feedback flex items-center flex-1" style={{ minWidth: 0 }}>
          <span className="text-ctp-red font-bold truncate">{error}</span>
        </div>
      ) : navMode === 'vim' ? (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-ctp-mauve font-bold">:ayuda</span>
          <span>│</span>
          <span>[j/k] mover bloque</span>
          <span>│</span>
          <span>[h/l] árbol / buffer</span>
          <span>│</span>
          <span>[1..5] sección</span>
          <span>│</span>
          <span>[g/G] inicio / fin</span>
          <span>│</span>
          <button
            onClick={onOpenModeModal}
            className="text-ctp-teal font-bold hover:underline cursor-pointer"
          >
            [m] cambiar modo
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-ctp-teal font-bold">:ayuda</span>
          <span>│</span>
          <span>[↑ / ↓] mover bloque</span>
          <span>│</span>
          <span>[Enter] enfocar</span>
          <span>│</span>
          <span>[1..5] sección</span>
          <span>│</span>
          <button
            onClick={onOpenModeModal}
            className="text-ctp-mauve font-bold hover:underline cursor-pointer"
          >
            [m] cambiar modo
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="text-ctp-teal font-bold">axel@portafolio:~$</span>
        <button
          onClick={onOpenModeModal}
          className="text-xs font-semibold hover:underline cursor-pointer"
        >
          modo: {navMode}
        </button>
      </div>
    </div>
  );
};
