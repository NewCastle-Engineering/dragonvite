/**
 * Health Check Route
 * Basic health check endpoint for monitoring
 */

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export interface HealthResponse {
  status: string;
  uptime: number;
  timestamp: string;
  environment: string;
}

export async function healthRouter(fastify: FastifyInstance) {
  fastify.get<{ Reply: HealthResponse }>('/health', async (
    _request: FastifyRequest,
    reply: FastifyReply
  ) => {
    return reply.send({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    });
  });
}
