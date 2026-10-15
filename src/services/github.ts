import type { GitHubEvent, GitHubEventType } from '../types';

// Datos de respaldo para GitHub
const mockGitHubEvents: GitHubEvent[] = [
  {
    type: 'PUSH',
    repo: 'Axel-DaMage/portafolio',
    timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    actionText: 'push en Axel-DaMage/portafolio (feat: paleta catppuccin y modo visual)',
  },
  {
    type: 'STAR',
    repo: 'Nomadcxx/sysc-Go',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    actionText: 'estrella en Nomadcxx/sysc-Go',
  },
  {
    type: 'CREATE',
    repo: 'Axel-DaMage/cli-tetris',
    timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
    actionText: 'creó repositorio Axel-DaMage/cli-tetris',
  },
];

export const fetchGitHubActivity = async (username: string): Promise<GitHubEvent[]> => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  if (!token || username === 'mock' || username === '') {
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
      throw new Error(`GitHub API retornó estado ${response.status}`);
    }

    const data = await response.json();

    const parsedEvents: GitHubEvent[] = [];
    for (const event of data) {
      if (parsedEvents.length >= 3) break;

      let type: GitHubEventType;
      let actionText = '';

      switch (event.type) {
        case 'PushEvent':
          type = 'PUSH';
          actionText = `push en ${event.repo.name}`;
          break;
        case 'WatchEvent':
          type = 'STAR';
          actionText = `destacó ${event.repo.name}`;
          break;
        case 'CreateEvent':
          type = 'CREATE';
          actionText = `creó ${event.repo.name}`;
          break;
        case 'ForkEvent':
          type = 'FORK';
          actionText = `fork en ${event.repo.name}`;
          break;
        case 'IssuesEvent':
          type = 'ISSUE';
          actionText = `issue en ${event.repo.name}`;
          break;
        case 'PullRequestEvent':
          type = 'PR';
          actionText = `pull request en ${event.repo.name}`;
          break;
        default:
          continue;
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
    console.warn('Fallo al obtener eventos en tiempo real de GitHub, cargando datos locales...', error);
    return mockGitHubEvents;
  }
};
