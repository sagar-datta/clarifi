import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

type NodeEnv = 'development' | 'production' | 'test';

const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const validateNodeEnv = (env: string | undefined): NodeEnv => {
  if (env && ['development', 'production', 'test'].includes(env)) {
    return env as NodeEnv;
  }
  return 'development';
};

export const config = {
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: validateNodeEnv(process.env.NODE_ENV),
  },
  clerk: {
    secretKey: requireEnv('CLERK_SECRET_KEY'),
    pubKey: requireEnv('CLERK_PUB_KEY'),
  },
  supabase: {
    url: requireEnv('SUPABASE_URL'),
    anonKey: requireEnv('SUPABASE_ANON_KEY'),
    serviceRoleKey: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
  },
  cors: {
    allowedOrigins: (
      process.env.ALLOWED_ORIGINS || 'http://localhost:3000'
    ).split(','),
  },
} as const;

// Type for the entire config object
export type Config = typeof config;
