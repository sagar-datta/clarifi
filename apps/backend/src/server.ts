import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createClerkClient } from '@clerk/backend';
import config from './config/env.js';
import {
  requireAuth,
  AuthError,
  AuthenticatedRequest,
} from './middleware/auth.js';

// Initialize Clerk client
createClerkClient({ secretKey: config.clerk.secretKey });

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());

// Logger
const logger = {
  info: (message: string, ...args: unknown[]): void => {
    if (config.nodeEnv !== 'production') {
      // eslint-disable-next-line no-console
      console.log(message, ...args);
    }
  },
  error: (message: string, ...args: unknown[]): void => {
    if (config.nodeEnv !== 'production') {
      // eslint-disable-next-line no-console
      console.error(message, ...args);
    }
  },
};

// Public routes
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    environment: config.nodeEnv,
  });
});
// Protected routes
app.get('/me', requireAuth, (req, res) => {
  const authReq = req as AuthenticatedRequest;
  res.json({
    userId: authReq.auth.userId,
    message: 'Protected route accessed successfully',
  });
});

// Global error handler
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error('Error:', err);

  res.status(err instanceof AuthError ? 401 : 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
};

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});
