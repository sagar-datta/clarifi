import { cleanEnv, str, port, url } from 'envalid';
import { config as dotenvConfig } from 'dotenv';

/**
 * Environment Configuration
 *
 * Uses envalid for runtime environment validation with the following features:
 * - Type-safe environment variables
 * - Validation on application startup
 * - Default values where appropriate
 * - Clear error messages for missing required variables
 *
 * Architecture notes:
 * - Separates raw env access from business logic
 * - Provides type safety through the entire app
 * - Fails fast if environment is misconfigured
 */

// Load environment variables from .env file
dotenvConfig();

export type NodeEnv = 'development' | 'production' | 'test';

/**
 * Environment variable validation schema.
 * Any missing or invalid variables will throw an error during startup.
 *
 * Security note: This prevents accidental deployment with missing credentials.
 */
export const config = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development',
  }),
  PORT: port({ default: 3001 }),

  // Clerk Authentication
  CLERK_SECRET_KEY: str(),
  CLERK_PUB_KEY: str(),

  // Supabase Database
  SUPABASE_URL: url(),
  SUPABASE_ANON_KEY: str(),
  SUPABASE_SERVICE_ROLE_KEY: str(),

  // CORS Configuration
  FRONTEND_URL: url({ default: 'http://localhost:3000' }),
});

/**
 * Typed configuration object used throughout the application.
 *
 * Benefits:
 * - Provides IntelliSense support
 * - Catches typos at compile time
 * - Centralizes configuration structure
 *
 * Note: Using 'as const' to ensure maximum type safety
 * and prevent accidental mutation of config values.
 */
export default {
  nodeEnv: config.NODE_ENV as NodeEnv,
  port: config.PORT,

  clerk: {
    secretKey: config.CLERK_SECRET_KEY,
    pubKey: config.CLERK_PUB_KEY,
  },

  supabase: {
    url: config.SUPABASE_URL,
    anonKey: config.SUPABASE_ANON_KEY,
    serviceRoleKey: config.SUPABASE_SERVICE_ROLE_KEY,
  },

  cors: {
    // Convert readonly array to mutable array for cors middleware compatibility
    allowedOrigins: Array.from([config.FRONTEND_URL]),
  },
} as const;
