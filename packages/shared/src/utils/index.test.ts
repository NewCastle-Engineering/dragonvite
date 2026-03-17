import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  exponentialBackoff,
  formatDate,
  parseError,
  debounce,
  throttle,
  generateUUID,
  safeJsonParse,
} from './index';

describe('exponentialBackoff', () => {
  it('returns a number greater than baseDelay on attempt 0', () => {
    const delay = exponentialBackoff(0, 1000, 30000);
    expect(delay).toBeGreaterThanOrEqual(1000);
    expect(delay).toBeLessThan(2000); // 1000 + max jitter(1000)
  });

  it('increases delay with higher attempt numbers', () => {
    const delay0 = exponentialBackoff(0, 100, 30000);
    const delay3 = exponentialBackoff(3, 100, 30000);
    expect(delay3).toBeGreaterThan(delay0);
  });

  it('caps delay at maxDelay plus jitter', () => {
    const delay = exponentialBackoff(100, 1000, 500);
    expect(delay).toBeLessThan(1500); // maxDelay(500) + jitter(<1000)
    expect(delay).toBeGreaterThanOrEqual(500);
  });
});

describe('formatDate', () => {
  it('formats a date to ISO string', () => {
    const date = new Date('2024-01-15T12:00:00.000Z');
    expect(formatDate(date)).toBe('2024-01-15T12:00:00.000Z');
  });

  it('returns a string', () => {
    expect(typeof formatDate(new Date())).toBe('string');
  });
});

describe('parseError', () => {
  it('returns message from Error instance', () => {
    expect(parseError(new Error('test error'))).toBe('test error');
  });

  it('returns string as-is', () => {
    expect(parseError('some error string')).toBe('some error string');
  });

  it('returns fallback for numbers', () => {
    expect(parseError(42)).toBe('An unknown error occurred');
  });

  it('returns fallback for null', () => {
    expect(parseError(null)).toBe('An unknown error occurred');
  });

  it('returns fallback for objects', () => {
    expect(parseError({ message: 'nope' })).toBe('An unknown error occurred');
  });
});

describe('debounce', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('does not call function immediately', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    expect(fn).not.toHaveBeenCalled();
  });

  it('calls function after delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets the timer on subsequent calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to the function', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced('hello', 42);
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('hello', 42);
  });
});

describe('throttle', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('executes function immediately on first call', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('ignores subsequent calls within the limit period', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('allows another call after limit expires', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    vi.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('generateUUID', () => {
  it('generates a valid UUID v4 format', () => {
    const uuid = generateUUID();
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    );
  });

  it('generates unique values', () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateUUID()));
    expect(ids.size).toBe(50);
  });
});

describe('safeJsonParse', () => {
  it('parses valid JSON object', () => {
    expect(safeJsonParse('{"key":"value"}', {})).toEqual({ key: 'value' });
  });

  it('parses valid JSON array', () => {
    expect(safeJsonParse('[1,2,3]', [])).toEqual([1, 2, 3]);
  });

  it('returns fallback for invalid JSON', () => {
    expect(safeJsonParse('not-json', { default: true })).toEqual({ default: true });
  });

  it('returns fallback for empty string', () => {
    expect(safeJsonParse('', 'fallback')).toBe('fallback');
  });
});
