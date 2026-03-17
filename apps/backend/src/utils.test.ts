import { describe, it, expect } from 'vitest';
import type { FastifyRequest } from 'fastify';
import { getPaginationMeta, formatErrorResponse, getUserIdFromRequest } from './utils.js';

describe('getPaginationMeta', () => {
  it('calculates totalPages correctly', () => {
    const meta = getPaginationMeta(1, 10, 25);
    expect(meta.totalPages).toBe(3);
  });

  it('sets hasNextPage true when not on last page', () => {
    const meta = getPaginationMeta(1, 10, 25);
    expect(meta.hasNextPage).toBe(true);
    expect(meta.hasPreviousPage).toBe(false);
  });

  it('sets hasPreviousPage true when past first page', () => {
    const meta = getPaginationMeta(2, 10, 25);
    expect(meta.hasPreviousPage).toBe(true);
  });

  it('sets hasNextPage false on last page', () => {
    const meta = getPaginationMeta(3, 10, 25);
    expect(meta.hasNextPage).toBe(false);
    expect(meta.hasPreviousPage).toBe(true);
  });

  it('handles single page result', () => {
    const meta = getPaginationMeta(1, 20, 5);
    expect(meta.totalPages).toBe(1);
    expect(meta.hasNextPage).toBe(false);
    expect(meta.hasPreviousPage).toBe(false);
  });

  it('returns all pagination fields', () => {
    const meta = getPaginationMeta(2, 10, 50);
    expect(meta).toMatchObject({ page: 2, limit: 10, total: 50, totalPages: 5 });
  });
});

describe('formatErrorResponse', () => {
  it('includes the error message', () => {
    const result = formatErrorResponse('Something went wrong');
    expect(result.error).toBe('Something went wrong');
  });

  it('defaults to status code 500', () => {
    const result = formatErrorResponse('error');
    expect(result.statusCode).toBe(500);
  });

  it('accepts a custom status code', () => {
    const result = formatErrorResponse('Not found', 404);
    expect(result.statusCode).toBe(404);
  });

  it('includes a valid ISO timestamp', () => {
    const result = formatErrorResponse('error');
    expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
  });
});

describe('getUserIdFromRequest', () => {
  it('returns user id from x-user-id header', () => {
    const req = { headers: { 'x-user-id': 'user-abc' } } as unknown as FastifyRequest;
    expect(getUserIdFromRequest(req)).toBe('user-abc');
  });

  it('returns null when header is absent', () => {
    const req = { headers: {} } as unknown as FastifyRequest;
    expect(getUserIdFromRequest(req)).toBeNull();
  });
});
