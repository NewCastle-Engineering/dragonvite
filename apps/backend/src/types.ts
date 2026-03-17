/**
 * Backend Type Definitions
 * API request/response types, internal types
 */

import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * API Request types
 */
export namespace API {
  export interface GetUserRequest extends FastifyRequest {
    Params: { id: string };
  }

  export interface CreateUserRequest extends FastifyRequest {
    Body: {
      email: string;
      name?: string;
    };
  }

  export interface ErrorResponse {
    error: string;
    statusCode: number;
    timestamp: string;
  }
}

/**
 * Service types
 */
export namespace Service {
  export interface UserCreateInput {
    email: string;
    name?: string;
  }

  export interface UserUpdateInput {
    name?: string;
    avatar?: string;
  }

  export interface GameStateUpdateInput {
    level?: number;
    experience?: number;
    health?: number;
    mana?: number;
    gold?: number;
  }
}

/**
 * Socket.io types
 */
export namespace SocketIO {
  export interface GameMoveData {
    roomId: string;
    entityId: string;
    x: number;
    y: number;
  }

  export interface ChatMessageData {
    roomId: string;
    message: string;
    userId: string;
  }
}
