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
      <div className="font-mono text-xs opacity-60 flex items-center justify-center gap-2 py-4">
        <span className="animate-spin inline-block">⠋</span>
        <span>FETCHING WAKATIME CORE TELEMETRY...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-[var(--color-magenta)] text-xs font-mono text-center py-4">
        [ERROR] CONNECTION TIMEOUT RETRIEVING WAKATIME CORE METRICS
      </div>
    );
  }

  return (
    <div className="font-mono text-sm w-full flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-4 mb-4 text-xs w-full max-w-sm">
        <div className="border border-[var(--color-white-10)] p-2 text-center">
          <div className="opacity-45 mb-1">TOTAL WORKTIME (7d)</div>
          <div className="text-base font-bold text-[var(--color-neon)] glow-text-neon">
            {data.totalHours7d}
          </div>
        </div>
        <div className="border border-[var(--color-white-10)] p-2 text-center">
          <div className="opacity-45 mb-1">DAILY WORKTIME (TODAY)</div>
          <div className="text-base font-bold text-[var(--color-magenta)] glow-text-magenta">
            {data.totalHoursToday}
          </div>
        </div>
      </div>

      <div className="space-y-4 w-full max-w-sm">
        <div className="w-full flex flex-col items-center">
          <div className="text-xs text-[var(--color-neon)] font-bold mb-2 tracking-wider text-center">
            TOP LANGUAGES
          </div>
          <div className="space-y-2 border border-[var(--color-white-10)] p-3 w-full flex flex-col items-center">
            {data.languages.map((lang, index) => (
              <div key={index} className="flex flex-col items-center justify-center gap-1 text-xs w-full">
                <span className="text-[var(--color-white)] font-semibold mb-0.5">{lang.name}</span>
                <ProgressBar value={lang.percent} width={15} color="neon" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="text-xs text-[var(--color-magenta)] font-bold mb-2 tracking-wider text-center">
            PREFERRED ENVIRONMENT
          </div>
          <div className="space-y-2 border border-[var(--color-white-10)] p-3 w-full flex flex-col items-center">
            {data.editors.map((editor, index) => (
              <div key={index} className="flex flex-col items-center justify-center gap-1 text-xs w-full">
                <span className="text-[var(--color-white)] font-semibold mb-0.5">{editor.name}</span>
                <ProgressBar value={editor.percent} width={15} color="magenta" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
