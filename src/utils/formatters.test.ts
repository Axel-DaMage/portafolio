import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { formatElapsedTime, formatTerminalTimestamp } from './formatters'

describe('formatElapsedTime', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-15T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const isoSecondsAgo = (secs: number) =>
    new Date(Date.now() - secs * 1000).toISOString()

  it('returns "hace 0s" for a future date', () => {
    const future = new Date(Date.now() + 60_000).toISOString()
    expect(formatElapsedTime(future)).toBe('hace 0s')
  })

  it('formats seconds only', () => {
    expect(formatElapsedTime(isoSecondsAgo(45))).toBe('hace 45s')
  })

  it('formats minutes and seconds', () => {
    expect(formatElapsedTime(isoSecondsAgo(2 * 60 + 34))).toBe('hace 2m 34s')
  })

  it('formats hours, minutes and seconds', () => {
    expect(formatElapsedTime(isoSecondsAgo(3600 + 12 * 60 + 5))).toBe('hace 1h 12m 5s')
  })

  it('formats days, hours, minutes and seconds', () => {
    expect(formatElapsedTime(isoSecondsAgo(3 * 86400 + 4 * 3600 + 10 * 60 + 22))).toBe(
      'hace 3d 4h 10m 22s',
    )
  })

  it('returns "hace 0s" for an invalid date string', () => {
    expect(formatElapsedTime('not-a-date')).toBe('hace 0s')
  })
})

describe('formatTerminalTimestamp', () => {
  it('formats a Date input as YYYY-MM-DD HH:mm:ss', () => {
    expect(formatTerminalTimestamp(new Date('2026-09-18T21:30:05Z'))).toBe(
      '2026-09-18 21:30:05',
    )
  })

  it('formats an ISO string input', () => {
    expect(formatTerminalTimestamp('2026-01-01T00:00:00Z')).toBe('2026-01-01 00:00:00')
  })

  it('returns an empty string for invalid input', () => {
    expect(formatTerminalTimestamp('garbage')).toBe('')
    expect(formatTerminalTimestamp(new Date('invalid'))).toBe('')
  })
})
