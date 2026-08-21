export interface GitHubEvent {
  type: string;
  repo: string;
  timestamp: string; // ISO 24h format
  actionText: string;
}

// Elegant Mock Data for fallback
const mockGitHubEvents: GitHubEvent[] = [
  {
    type: 'PUSH',
    repo: 'Axel-DaMage/portafolio',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(), // 3 mins ago
    actionText: 'pushed to Axel-DaMage/portafolio (feat: add crt styling & widgets)',
  },
  {
    type: 'STAR',
    repo: 'Nomadcxx/sysc-Go',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 mins ago
    actionText: 'starred Nomadcxx/sysc-Go',
  },
  {
    type: 'CREATE',
    repo: 'Axel-DaMage/cli-tetris',
    timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(), // 3.5 hrs ago
    actionText: 'created repository Axel-DaMage/cli-tetris',
  },
];

export const fetchGitHubActivity = async (username: string): Promise<GitHubEvent[]> => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  if (!token || username === 'mock' || username === '') {
    // Graceful fallback to mock data
    return mockGitHubEvents;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/events`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned status ${response.status}`);
    }

    const data = await response.json();
    
    // Parse top 3 interactive events
    const parsedEvents: GitHubEvent[] = [];
    for (const event of data) {
      if (parsedEvents.length >= 3) break;
      
      let type = '';
      let actionText = '';

      switch (event.type) {
        case 'PushEvent':
          type = 'PUSH';
          actionText = `pushed to ${event.repo.name}`;
          break;
        case 'WatchEvent':
          type = 'STAR';
          actionText = `starred ${event.repo.name}`;
          break;
        case 'CreateEvent':
          type = 'CREATE';
          actionText = `created ${event.repo.name}`;
          break;
        case 'ForkEvent':
          type = 'FORK';
          actionText = `forked ${event.repo.name}`;
          break;
        case 'IssuesEvent':
          type = 'ISSUE';
          actionText = `${event.payload.action} issue in ${event.repo.name}`;
          break;
        case 'PullRequestEvent':
          type = 'PR';
          actionText = `${event.payload.action} PR in ${event.repo.name}`;
          break;
        default:
          continue; // Skip irrelevant events
      }

      parsedEvents.push({
        type,
        repo: event.repo.name,
        timestamp: event.created_at,
        actionText,
      });
    }

    return parsedEvents.length > 0 ? parsedEvents : mockGitHubEvents;
  } catch (error) {
    console.warn('Failed to fetch real-time GitHub events, loading fallback data...', error);
    return mockGitHubEvents;
  }
};
