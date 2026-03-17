import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { healthRouter } from './health.js';

describe('GET /api/health', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = Fastify();
    await app.register(healthRouter, { prefix: '/api' });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns 200 status', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/health' });
    expect(response.statusCode).toBe(200);
  });

  it('returns status ok', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/health' });
    expect(response.json().status).toBe('ok');
  });

  it('returns uptime as a number', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/health' });
    expect(typeof response.json().uptime).toBe('number');
  });

  it('returns a valid ISO timestamp', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/health' });
    const { timestamp } = response.json();
    expect(new Date(timestamp).toISOString()).toBe(timestamp);
  });

  it('returns environment', async () => {
    const response = await app.inject({ method: 'GET', url: '/api/health' });
    expect(response.json().environment).toBeDefined();
  });
});
