/**
 * Shared Constants
 * App-wide constants, config values, and enums
 */

// API Configuration
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || process.env.VITE_API_URL || 'http://localhost/api';
export const API_TIMEOUT = 30000; // 30 seconds

// WebSocket Configuration
export const WS_URL =
  process.env.REACT_APP_WS_URL || process.env.VITE_WS_URL || 'http://localhost';
export const WS_RECONNECT_DELAY = 1000; // Start with 1 second
export const WS_MAX_RECONNECT_DELAY = 30000; // Cap at 30 seconds

// Game Configuration
export const GAME_CANVAS_WIDTH = 1200;
export const GAME_CANVAS_HEIGHT = 800;
export const ENTITY_SPEED = 5; // pixels per frame
export const TICK_RATE = 60; // 60 FPS

// Pagination
export const DEFAULT_PAGE_LIMIT = 20;
export const MAX_PAGE_LIMIT = 100;

// Rate Limiting
export const RATE_LIMIT_WINDOW = 60000; // 1 minute
export const RATE_LIMIT_MAX_REQUESTS = 100;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed',
  VALIDATION_ERROR: 'Invalid input provided',
  UNAUTHORIZED: 'You are not authorized',
  FORBIDDEN: 'Access forbidden',
  NOT_FOUND: 'Resource not found',
  SERVER_ERROR: 'Server error occurred',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Created successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  SAVED: 'Saved successfully',
} as const;
