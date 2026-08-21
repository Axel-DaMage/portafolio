export interface WakaTimeLanguage {
  name: string;
  percent: number;
}

export interface WakaTimeEditor {
  name: string;
  percent: number;
}

export interface WakaTimeStats {
  totalHours7d: string;
  totalHoursToday: string;
  languages: WakaTimeLanguage[];
  editors: WakaTimeEditor[];
}

// Elegant Mock Data for WakaTime
const mockWakaTimeStats: WakaTimeStats = {
  totalHours7d: '42h 15m',
  totalHoursToday: '5h 32m',
  languages: [
    { name: 'TypeScript', percent: 67 },
    { name: 'React/JSX', percent: 48 },
    { name: 'Python', percent: 30 },
    { name: 'Rust', percent: 18 },
    { name: 'CSS/HTML', percent: 12 },
  ],
  editors: [
    { name: 'Neovim', percent: 75 },
    { name: 'VS Code', percent: 25 },
  ],
};

export const fetchWakaTimeStats = async (): Promise<WakaTimeStats> => {
  const apiKey = import.meta.env.VITE_WAKATIME_API_KEY;

  if (!apiKey) {
    // Gracefully fallback to high-fidelity mock metrics
    return mockWakaTimeStats;
  }

  try {
    const response = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers: {
        Authorization: `Basic ${btoa(apiKey)}`,
      },
    });

    if (!response.ok) {
      throw new Error(`WakaTime API returned status ${response.status}`);
    }

    interface ApiLanguage {
      name: string;
      percent: number;
    }

    interface ApiEditor {
      name: string;
      percent: number;
    }

    const data = await response.json();
    const stats = data.data;

    const languages = (stats.languages || [])
      .slice(0, 5)
      .map((l: ApiLanguage) => ({ name: l.name, percent: Math.round(l.percent) }));

    const editors = (stats.editors || [])
      .slice(0, 2)
      .map((e: ApiEditor) => ({ name: e.name, percent: Math.round(e.percent) }));

    return {
      totalHours7d: stats.human_readable_total_including_other_language || '42h 15m',
      totalHoursToday: stats.human_readable_daily_average || '5h 32m',
      languages,
      editors,
    };
  } catch (error) {
    console.warn('WakaTime stats request failed, returning offline mock metrics instead...', error);
    return mockWakaTimeStats;
  }
};
