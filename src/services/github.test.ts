import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchGitHubActivity } from './github'

const mockFetch = (impl: () => Promise<unknown>) => {
  vi.stubGlobal('fetch', vi.fn(impl))
}

const okResponse = (data: unknown) =>
  ({ ok: true, json: async () => data }) as Response

describe('fetchGitHubActivity', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('returns 3 mock events when no token is configured', async () => {
    vi.stubEnv('VITE_GITHUB_TOKEN', '')
    const events = await fetchGitHubActivity('Axel-DaMage')
    expect(events).toHaveLength(3)
    expect(events[0].type).toBe('PUSH')
    expect(events[0].repo).toBe('Axel-DaMage/portafolio')
  })

  it('returns mock events for the "mock" username even with a token', async () => {
    vi.stubEnv('VITE_GITHUB_TOKEN', 'secret')
    const events = await fetchGitHubActivity('mock')
    expect(events).toHaveLength(3)
  })

  it('falls back to mock events when fetch rejects', async () => {
    vi.stubEnv('VITE_GITHUB_TOKEN', 'secret')
    mockFetch(() => Promise.reject(new Error('network down')))
    const events = await fetchGitHubActivity('Axel-DaMage')
    expect(events).toHaveLength(3)
    expect(console.warn).toHaveBeenCalled()
  })

  it('falls back to mock events on a 500 response', async () => {
    vi.stubEnv('VITE_GITHUB_TOKEN', 'secret')
    mockFetch(async () => ({ ok: false, status: 500 }) as Response)
    const events = await fetchGitHubActivity('Axel-DaMage')
    expect(events).toHaveLength(3)
  })

  it('parses a PushEvent payload into a PUSH event with repo name', async () => {
    vi.stubEnv('VITE_GITHUB_TOKEN', 'secret')
    mockFetch(async () =>
      okResponse([
        {
          id: '1',
          type: 'PushEvent',
          repo: { name: 'Axel-DaMage/hermes' },
          created_at: '2026-01-15T10:00:00Z',
        },
        {
          id: '2',
          type: 'DeleteEvent',
          repo: { name: 'ignored/repo' },
          created_at: '2026-01-15T09:00:00Z',
        },
      ]),
    )
    const events = await fetchGitHubActivity('Axel-DaMage')
    expect(events).toHaveLength(1)
    expect(events[0]).toMatchObject({
      type: 'PUSH',
      repo: 'Axel-DaMage/hermes',
      timestamp: '2026-01-15T10:00:00Z',
    })
    expect(events[0].actionText).toContain('Axel-DaMage/hermes')
  })
})
