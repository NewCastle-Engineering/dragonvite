/**
 * Backend Configuration
 * Validates and loads environment variables using Zod
 */

import { z } from 'zod';

const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),

  // Database
  DATABASE_URL: z.string(),

  // Redis
  REDIS_URL: z.string(),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost'),

  // JWT
  JWT_SECRET: z.string().min(32),

  // BullMQ
  BULLMQ_QUEUE_NAME: z.string().default('dragonvite-jobs'),
  BULLMQ_WORKERS: z.coerce.number().default(4),

  // External Services
  RESEND_API_KEY: z.string().optional(),
  OLLAMA_API_URL: z.string().url().optional(),
  OLLAMA_MODEL: z.string().default('llama2'),
  SENTRY_DSN: z.string().url().optional(),

  // Logging
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
});

type Config = z.infer<typeof envSchema>;

let config: Config;

/**
 * Load and validate environment configuration
 */
export function loadConfig(): Config {
  try {
    config = envSchema.parse(process.env);
    return config;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map((e) => e.path.join('.')).join(', ');
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

/**
 * Get current configuration (must call loadConfig first)
 */
export function getConfig(): Config {
  if (!config) {
    throw new Error('Config not loaded. Call loadConfig() first.');
  }
  return config;
}

/**
 * Check if in production
 */
export function isProduction(): boolean {
  return getConfig().NODE_ENV === 'production';
}

/**
 * Check if in development
 */
export function isDevelopment(): boolean {
  return getConfig().NODE_ENV === 'development';
}
