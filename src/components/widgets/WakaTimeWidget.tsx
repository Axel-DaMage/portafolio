import React from 'react';
import useSWR from 'swr';
import { fetchWakaTimeStats } from '../../services/wakatime';
import { ProgressBar } from '../ui/ProgressBar';

export const WakaTimeWidget: React.FC = () => {
  const { data, error, isLoading } = useSWR(
    'wakatime-stats',
    fetchWakaTimeStats,
    {
      refreshInterval: 300000, // 5 min TTL
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="font-mono text-xs opacity-60 flex items-center gap-2 py-2">
        <span className="animate-spin inline-block">⠋</span>
        <span>Cargando telemetría...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-ctp-red text-xs font-mono py-2">
        Conexión no disponible con WakaTime
      </div>
    );
  }

  return (
    <div className="font-mono text-xs w-full flex flex-col items-start text-left space-y-3">
      {/* Hours Overview */}
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="p-2 bg-ctp-surface0/30 border border-ctp-surface0">
          <div className="text-[10px] text-ctp-subtext mb-0.5">Últimos 7 días</div>
          <div className="text-sm font-bold text-ctp-teal">
            {data.totalHours7d}
          </div>
        </div>
        <div className="p-2 bg-ctp-surface0/30 border border-ctp-surface0">
          <div className="text-[10px] text-ctp-subtext mb-0.5">Hoy</div>
          <div className="text-sm font-bold text-ctp-mauve">
            {data.totalHoursToday}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="w-full space-y-1.5">
        <div className="text-[11px] text-ctp-peach font-bold">
          Lenguajes
        </div>
        <div className="space-y-1.5 p-2 bg-ctp-surface0/30 border border-ctp-surface0 w-full">
          {data.languages.slice(0, 4).map((lang, index) => (
            <div key={index} className="flex items-center justify-between text-xs w-full">
              <span className="text-[var(--color-white-80)]">{lang.name}</span>
              <div className="flex items-center gap-2">
                <ProgressBar value={lang.percent} width={12} color="neon" />
                <span className="text-[10px] text-ctp-subtext w-7 text-right">{lang.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editors */}
      <div className="w-full space-y-1.5">
        <div className="text-[11px] text-ctp-blue font-bold">
          Editores
        </div>
        <div className="space-y-1.5 p-2 bg-ctp-surface0/30 border border-ctp-surface0 w-full">
          {data.editors.map((editor, index) => (
            <div key={index} className="flex items-center justify-between text-xs w-full">
              <span className="text-[var(--color-white-80)]">{editor.name}</span>
              <div className="flex items-center gap-2">
                <ProgressBar value={editor.percent} width={12} color="magenta" />
                <span className="text-[10px] text-ctp-subtext w-7 text-right">{editor.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
