import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchWakaTimeStats } from './wakatime'

describe('fetchWakaTimeStats', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('returns mock stats when no API key is configured', async () => {
    vi.stubEnv('VITE_WAKATIME_API_KEY', '')
    const stats = await fetchWakaTimeStats()
    expect(stats.totalHours7d).toBe('42h 15m')
    expect(stats.dailyAverage).toBe('5h 32m')
    expect(stats.languages).toHaveLength(5)
    expect(stats.editors).toHaveLength(2)
  })

  it('falls back to mock stats when fetch rejects', async () => {
    vi.stubEnv('VITE_WAKATIME_API_KEY', 'secret')
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))))
    const stats = await fetchWakaTimeStats()
    expect(stats.totalHours7d).toBe('42h 15m')
    expect(console.warn).toHaveBeenCalled()
  })

  it('falls back to mock stats on a non-OK response', async () => {
    vi.stubEnv('VITE_WAKATIME_API_KEY', 'secret')
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 500 }) as Response))
    const stats = await fetchWakaTimeStats()
    expect(stats.totalHours7d).toBe('42h 15m')
  })
})
