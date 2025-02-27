import { cleanEnv, str, port, url } from 'envalid';
import { config as dotenvConfig } from 'dotenv';

// Load environment variables from .env file
dotenvConfig();

export type NodeEnv = 'development' | 'production' | 'test';

export const config = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development',
  }),
  PORT: port({ default: 3001 }),

  // Clerk
  CLERK_SECRET_KEY: str(),
  CLERK_PUB_KEY: str(),

  // Supabase
  SUPABASE_URL: url(),
  SUPABASE_ANON_KEY: str(),
  SUPABASE_SERVICE_ROLE_KEY: str(),

  // CORS
  FRONTEND_URL: url({ default: 'http://localhost:3000' }),
});

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
    allowedOrigins: Array.from([config.FRONTEND_URL]),
  },
} as const;
