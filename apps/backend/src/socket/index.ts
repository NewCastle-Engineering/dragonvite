/**
 * Socket.io Server Setup
 * Real-time communication for game updates, chat, etc.
 */

import type { FastifyBaseLogger, FastifyInstance } from 'fastify';
import { Server as SocketIOServer } from 'socket.io';
import * as http from 'http';

let io: SocketIOServer;

/**
 * Setup Socket.io on Fastify server
 */
export async function setupSocketIO(fastify: FastifyInstance): Promise<void> {
  const logger: FastifyBaseLogger = fastify.log;
  const server = fastify.server as unknown as http.Server;

  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost',
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // Connection handling
  io.on('connection', (socket) => {
    logger.info({ socketId: socket.id }, 'Client connected');

    // Example event: user joins game
    socket.on('game:join', (data: { roomId: string; userId: string }) => {
      socket.join(`game:${data.roomId}`);
      logger.info({ socketId: socket.id, roomId: data.roomId }, 'User joined game room');

      // Notify others in room
      socket.to(`game:${data.roomId}`).emit('game:user-joined', { userId: data.userId });
    });

    // Example event: player moved
    socket.on('game:move', (data: { roomId: string; entityId: string; x: number; y: number }) => {
      logger.debug({ socketId: socket.id, entityId: data.entityId }, 'Player moved');

      // Broadcast to others in room (not including sender)
      socket.to(`game:${data.roomId}`).emit('game:entity-moved', {
        entityId: data.entityId,
        x: data.x,
        y: data.y,
      });
    });

    // Example event: chat message
    socket.on('chat:message', (data: { roomId: string; message: string; userId: string }) => {
      logger.info({ socketId: socket.id, roomId: data.roomId }, 'Chat message received');

      // Broadcast to all in room (including sender)
      io.to(`game:${data.roomId}`).emit('chat:new-message', {
        userId: data.userId,
        message: data.message,
        timestamp: new Date().toISOString(),
      });
    });

    // Disconnect handling
    socket.on('disconnect', () => {
      logger.info({ socketId: socket.id }, 'Client disconnected');
    });

    // Error handling
    socket.on('error', (error) => {
      logger.error({ socketId: socket.id, error }, 'Socket error');
    });
  });

  logger.info('Socket.io server initialized');
}

/**
 * Get Socket.io instance (for use in other modules)
 */
export function getSocketIO(): SocketIOServer {
  if (!io) {
    throw new Error('Socket.io not initialized. Call setupSocketIO first.');
  }
  return io;
}

/**
 * Emit event to specific room
 */
export function emitToRoom(roomId: string, event: string, data: unknown): void {
  getSocketIO().to(roomId).emit(event, data);
}

/**
 * Emit event to specific user
 */
export function emitToUser(userId: string, event: string, data: unknown): void {
  getSocketIO().to(`user:${userId}`).emit(event, data);
}

/**
 * Broadcast event to all connected clients
 */
export function broadcast(event: string, data: unknown): void {
  getSocketIO().emit(event, data);
}
