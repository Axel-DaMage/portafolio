export interface GitHubEvent {
  type: string;
  repo: string;
  timestamp: string; // Formato ISO 24h
  actionText: string;
}

export type GitHubEventType = 'PUSH' | 'STAR' | 'CREATE' | 'FORK' | 'ISSUE' | 'PR';
