/**
 * Shared Types
 * Type definitions used across frontend, backend, and shared packages
 */

// User types
export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

// Game/Canvas types
export type GameEntity = {
  id: string;
  type: 'player' | 'npc' | 'item' | 'obstacle';
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GameState = {
  entities: GameEntity[];
  turn: number;
  timestamp: number;
};

// API Response types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
};

export type PageParams = {
  page: number;
  limit: number;
  offset: number;
};

// Socket.io Event types
export type SocketEventMap = {
  'game:move': { entityId: string; x: number; y: number };
  'game:state': { state: GameState };
  'chat:message': { userId: string; message: string; timestamp: number };
};
