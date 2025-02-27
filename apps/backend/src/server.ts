import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createClerkClient } from '@clerk/backend';
import { config } from './config/env';
import { requireAuth } from './middleware/auth';

const app = express();

// Initialize Clerk client
const clerk = createClerkClient({
  secretKey: config.clerk.secretKey,
});

// Configure CORS with allowed origins
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Security middleware
app.use(helmet());
app.use(express.json());

// Public routes
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: config.server.nodeEnv,
  });
});

// Protected routes
app.get('/me', requireAuth(), async (req, res, next) => {
  try {
    const user = await clerk.users.getUser(req.auth.userId);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Global error handler
type ApiError = Error & { status?: number };

app.use(
  (
    err: ApiError,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    const message =
      config.server.nodeEnv === 'production'
        ? 'An error occurred'
        : err.message;

    res.status(statusCode).json({
      status: 'error',
      message,
      ...(config.server.nodeEnv !== 'production' && { stack: err.stack }),
    });
  },
);

// Start server
app.listen(config.server.port, () => {
  console.log(
    `Server running in ${config.server.nodeEnv} mode on port ${config.server.port}`,
  );
});
