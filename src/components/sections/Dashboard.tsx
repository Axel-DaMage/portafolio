import React from 'react';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  return (
    <div className="w-full font-mono text-left select-text space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {/* Profile Card */}
        <div className="p-3 bg-ctp-surface0/30 border border-ctp-surface0 space-y-2">
          <div className="text-xs border-b border-ctp-surface0 pb-1 text-ctp-mauve font-bold">
            Perfil
          </div>

          <div className="text-xs space-y-1.5 text-[var(--color-white-80)]">
            <div className="flex items-center gap-2">
              <span className="text-ctp-peach">rol:</span>
              <span className="text-[var(--color-white)]">Ingeniero Fullstack y Sistemas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ctp-peach">educación:</span>
              <span>Ing. Informática • DuocUC</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ctp-peach">proyecto actual:</span>
              <span>Co-desarrollo startup <span className="text-ctp-teal font-bold">LogOS</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ctp-peach">comunidades:</span>
              <span>JSChile • OpenSourceStgo</span>
            </div>
          </div>
        </div>

        {/* Shortcuts */}
        <div className="p-3 bg-ctp-surface0/30 border border-ctp-surface0 flex flex-col justify-between space-y-2">
          <div className="text-xs border-b border-ctp-surface0 pb-1 text-ctp-teal font-bold">
            Navegación rápida
          </div>

          <p className="text-xs text-ctp-subtext leading-relaxed">
            Puedes explorar los bloques usando <span className="text-ctp-mauve font-bold">j</span> / <span className="text-ctp-mauve font-bold">k</span> (o flechas en modo normal) y saltar a secciones con teclas numéricas.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setActiveTab('projects')}
              className="px-2.5 py-1 text-xs font-bold border border-ctp-surface1 text-ctp-mauve hover:bg-ctp-surface0 transition-colors"
            >
              [2] Proyectos
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="px-2.5 py-1 text-xs font-bold border border-ctp-surface1 text-ctp-teal hover:bg-ctp-surface0 transition-colors"
            >
              [5] Contacto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
