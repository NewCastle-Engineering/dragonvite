/**
 * Backend Utilities
 * Common helper functions
 */

import { FastifyRequest } from 'fastify';

/**
 * Extract user ID from request (from JWT or header)
 */
export function getUserIdFromRequest(request: FastifyRequest): string | null {
  // TODO: Implement JWT extraction or header parsing
  return request.headers['x-user-id'] as string | null;
}

/**
 * Generate pagination metadata
 */
export function getPaginationMeta(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
}

/**
 * Format error response
 */
export function formatErrorResponse(message: string, statusCode: number = 500) {
  return {
    error: message,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}
