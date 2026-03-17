/**
 * Example User Service
 * Business logic for user operations
 */

import { PrismaClient } from '@prisma/client';
import { User } from '@dragonvite/shared';

const prisma = new PrismaClient();

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Create new user
 */
export async function createUser(data: { email: string; name?: string }): Promise<User> {
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
    },
  });
}

/**
 * Update user
 */
export async function updateUser(
  userId: string,
  data: Partial<{ name: string; avatar: string }>
): Promise<User> {
  return prisma.user.update({
    where: { id: userId },
    data,
  });
}

/**
 * Delete user
 */
export async function deleteUser(userId: string): Promise<User> {
  return prisma.user.delete({
    where: { id: userId },
  });
}
