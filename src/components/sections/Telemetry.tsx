import React from 'react';
import { GitHubWidget, WakaTimeWidget } from '../widgets';

export const Telemetry: React.FC = () => {
  return (
    <div className="font-mono text-left w-full select-text space-y-3">
      <div className="flex items-center gap-2 text-xs text-ctp-mauve font-bold pb-1">
        <span>axel@portafolio:~$</span>
        <span className="text-ctp-teal">cat telemetry.log</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {/* WakaTime Metrics Box */}
        <div className="p-3 bg-ctp-surface0/30 border border-ctp-surface0 space-y-2">
          <div className="text-xs font-bold border-b border-ctp-surface0 pb-1 text-ctp-teal">
            WakaTime
          </div>
          <WakaTimeWidget />
        </div>

        {/* GitHub Live Events Box */}
        <div className="p-3 bg-ctp-surface0/30 border border-ctp-surface0 space-y-2">
          <div className="text-xs font-bold border-b border-ctp-surface0 pb-1 text-ctp-mauve">
            Actividad de GitHub
          </div>
          <GitHubWidget />
        </div>
      </div>
    </div>
  );
};
