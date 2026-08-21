import React from 'react';
import useSWR from 'swr';
import { fetchGitHubActivity } from '../../services/github';
import type { GitHubEvent } from '../../services/github';
import { useLiveTimer } from '../../hooks/useLiveTimer';
import { Separator } from '../ui/Separator';

interface EventItemProps {
  event: GitHubEvent;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const relativeTime = useLiveTimer(event.timestamp);

  const format24hISO = (isoString: string) => {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  return (
    <div className="font-mono text-sm w-full flex flex-col items-center text-center">
      <div className="flex flex-col items-center gap-1.5 text-xs mb-2">
        <span className={`px-2 py-0.5 font-bold ${
          event.type === 'PUSH' ? 'bg-[var(--color-magenta-10)] text-[var(--color-magenta)] border border-[var(--color-magenta-50)]' : 'bg-[var(--color-neon-10)] text-[var(--color-neon)] border border-[var(--color-neon-50)]'
        }`}>
          [{event.type}]
        </span>
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-[var(--color-white-40)]">
          <span>{format24hISO(event.timestamp)}</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-[var(--color-neon)] font-medium">{relativeTime}</span>
        </div>
      </div>
      <div className="py-1 text-[var(--color-white)] text-xs md:text-sm max-w-sm leading-relaxed">
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
      <div className="font-mono text-xs opacity-60 flex items-center justify-center gap-2 py-4">
        <span className="animate-spin inline-block">⠋</span>
        <span>FETCHING GITHUB SYSTEM EVENT FEED...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-[var(--color-magenta)] text-xs font-mono text-center py-4">
        [ERROR] FAILED TO CONNECT TO GITHUB API FEED
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {data.map((event, index) => (
        <React.Fragment key={index}>
          <EventItem event={event} />
          {index < data.length - 1 && <Separator char="─" color="white" />}
        </React.Fragment>
      ))}
    </div>
  );
};
