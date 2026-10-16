import React from 'react';
import useSWR from 'swr';
import { fetchGitHubActivity } from '../../services/github';
import type { GitHubEvent } from '../../types';
import { useLiveTimer } from '../../hooks/useLiveTimer';

interface EventItemProps {
  event: GitHubEvent;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const relativeTime = useLiveTimer(event.timestamp);

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'PUSH':
        return 'text-ctp-mauve bg-ctp-surface0';
      case 'STAR':
        return 'text-ctp-yellow bg-ctp-surface0';
      case 'CREATE':
        return 'text-ctp-green bg-ctp-surface0';
      default:
        return 'text-ctp-teal bg-ctp-surface0';
    }
  };

  return (
    <div className="font-mono text-xs w-full flex flex-col items-start text-left py-1.5 border-b border-ctp-surface0 last:border-b-0 space-y-1">
      <div className="flex items-center gap-2 w-full">
        <span className={`px-1.5 py-0.2 text-[10px] font-bold border border-ctp-surface1 ${getTypeBadgeColor(event.type)}`}>
          {event.type}
        </span>
        <span className="text-[11px] text-ctp-teal font-bold">{event.repo}</span>
        <span className="text-[10px] text-ctp-subtext ml-auto">{relativeTime}</span>
      </div>
      <div className="text-[11px] text-[var(--color-white-80)] pl-1">
        › {event.actionText}
      </div>
    </div>
  );
};

export const GitHubWidget: React.FC = () => {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'mock';

  const { data, error, isLoading } = useSWR(
    ['github-activity', username],
    () => fetchGitHubActivity(username),
    {
      refreshInterval: 300000, // 5 min TTL
      revalidateOnFocus: false,
    }
  );

  if (isLoading) {
    return (
      <div className="font-mono text-xs opacity-60 flex items-center gap-2 py-2">
        <span className="animate-spin inline-block">⠋</span>
        <span>Cargando eventos de GitHub...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-ctp-red text-xs font-mono py-2">
        Conexión no disponible con GitHub
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full text-left">
      {data.map((event, index) => (
        <EventItem key={index} event={event} />
      ))}
    </div>
  );
};
