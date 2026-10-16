import React, { useEffect, useRef } from 'react';
import type { NavMode } from '../../types';

export type { NavMode };

interface ModeModalProps {
  isOpen: boolean;
  onSelectMode: (mode: NavMode) => void;
  currentMode: NavMode;
}

export const ModeModal: React.FC<ModeModalProps> = ({
  isOpen,
  onSelectMode,
  currentMode,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Initial focus + focus restore on close
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const target =
      dialogRef.current?.querySelector<HTMLElement>('[data-autofocus]') ??
      dialogRef.current?.querySelector<HTMLElement>('button');
    target?.focus();
    return () => previous?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '1') {
        e.preventDefault();
        onSelectMode('vim');
      } else if (e.key === '2') {
        e.preventDefault();
        onSelectMode('normal');
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'm') {
        e.preventDefault();
        onSelectMode(currentMode);
      } else if (e.key === 'Tab') {
        const items = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) ?? []
        ).filter((el) => !el.hasAttribute('disabled'));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        const inside = dialogRef.current?.contains(active) ?? false;
        if (e.shiftKey) {
          if (!inside || active === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (!inside || active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onSelectMode, currentMode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop p-4 font-mono select-none">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mode-modal-title"
        className="w-full max-w-lg bg-ctp-base border border-ctp-surface1 shadow-2xl p-4 md:p-6 text-left space-y-4"
      >
        {/* Modal Header */}
        <div className="border-b border-ctp-surface0 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              id="mode-modal-title"
              className="text-xs md:text-sm font-bold text-[var(--color-white)] tracking-wide"
            >
              Modo de navegación
            </span>
          </div>
          <button
            onClick={() => onSelectMode(currentMode)}
            className="text-[10px] text-ctp-overlay hover:text-ctp-subtext"
          >
            [ESC / m: cerrar]
          </button>
        </div>

        <p className="text-xs text-ctp-subtext leading-relaxed">
          Elige cómo deseas explorar este portafolio:
        </p>

        {/* Two Large Mode Buttons */}
        <div className="space-y-3 pt-1">
          {/* Option 1: MODO VIM */}
          <button
            data-autofocus
            onClick={() => onSelectMode('vim')}
            className={`w-full p-4 border text-left transition-colors flex flex-col gap-1.5 cursor-pointer ${
              currentMode === 'vim'
                ? 'border-ctp-surface2 bg-ctp-surface0/60'
                : 'border-ctp-surface0 hover:border-ctp-surface1 bg-ctp-surface0/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm font-bold text-ctp-mauve">
                [1] Modo Vim
              </span>
              <span className="text-[10px] text-ctp-teal font-mono">
                [tecla 1]
              </span>
            </div>
            <p className="text-xs text-ctp-subtext leading-relaxed">
              Navegación por componentes con teclas <span className="text-[var(--color-white)] font-bold">hjkl</span>, saltos <span className="text-[var(--color-white)] font-bold">g / G</span>, números <span className="text-[var(--color-white)] font-bold">1..5</span> y vista de bloques interactiva.
            </p>
          </button>

          {/* Option 2: MODO NORMAL */}
          <button
            onClick={() => onSelectMode('normal')}
            className={`w-full p-4 border text-left transition-colors flex flex-col gap-1.5 cursor-pointer ${
              currentMode === 'normal'
                ? 'border-ctp-surface2 bg-ctp-surface0/60'
                : 'border-ctp-surface0 hover:border-ctp-surface1 bg-ctp-surface0/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm font-bold text-ctp-teal">
                [2] Modo Normal
              </span>
              <span className="text-[10px] text-ctp-teal font-mono">
                [tecla 2]
              </span>
            </div>
            <p className="text-xs text-ctp-subtext leading-relaxed">
              Navegación tradicional con <span className="text-[var(--color-white)] font-bold">Flechas (↑ / ↓)</span>, selección con <span className="text-[var(--color-white)] font-bold">Enter</span>, scroll convencional y números <span className="text-[var(--color-white)] font-bold">1..5</span>.
            </p>
          </button>
        </div>

        {/* Modal Footer Prompt */}
        <div className="pt-2 border-t border-ctp-surface0 flex items-center justify-between text-[11px] text-ctp-overlay">
          <span>Pulsa [1] o [2] en tu teclado</span>
          <span className="text-ctp-subtext">Puedes cambiarlo en cualquier momento con [m]</span>
        </div>
      </div>
    </div>
  );
};
