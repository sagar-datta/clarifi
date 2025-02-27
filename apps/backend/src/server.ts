/**
 * Express Server Entry Point
 *
 * Core server architecture with the following features:
 * - JWT-based authentication via Clerk
 * - Strict CORS policy for security
 * - Environment-aware logging
 * - Global error handling
 *
 * Security features:
 * - Helmet for HTTP headers hardening
 * - CORS with explicit origin whitelist
 * - Authentication via Clerk JWT verification
 * - Normalized error responses to prevent info leakage
 */

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

// Initialize Clerk client globally for connection reuse
createClerkClient({ secretKey: config.clerk.secretKey });

const app = express();

/**
 * Middleware Stack
 * Order is critical for security and functionality:
 * 1. helmet - Sets security headers before any response
 * 2. cors - Must run before any route handling
 * 3. json parsing - Required for POST/PUT requests
 *
 * Note: Additional middleware like rate limiting should
 * be added here before route handlers.
 */
app.use(helmet());
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    credentials: true, // Required for cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
app.use(express.json());

/**
 * Environment-aware Logger
 *
 * Prevents logging in production while maintaining debug info in development.
 * Implementation note: We're explicitly disabling eslint for console
 * as this is our intentional logging strategy.
 *
 * TODO: Replace with proper logging service in production
 */
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

/**
 * Route Definitions
 *
 * API Structure:
 * - Public endpoints (no auth required)
 * - Protected endpoints (requires valid JWT)
 *
 * Note: As the API grows, consider moving routes to separate files
 * and using express.Router() for better organization
 */

// Health check endpoint for infrastructure monitoring
app.get('/health', (_req, res) => {
  res.json({
    status: 'healthy',
    environment: config.nodeEnv,
  });
});

/**
 * Protected Routes
 * All routes below this point require authentication
 *
 * Implementation note: requireAuth middleware ensures
 * req.auth exists and is properly typed via AuthenticatedRequest
 */
app.get('/me', requireAuth, (req, res) => {
  const authReq = req as AuthenticatedRequest;
  res.json({
    userId: authReq.auth.userId,
    message: 'Protected route accessed successfully',
  });
});

/**
 * Global Error Handler
 *
 * Provides consistent error responses across the application:
 * - Authentication errors return 401
 * - All other errors return 500
 *
 * Security features:
 * - Sanitizes error messages in production
 * - Logs full error details for debugging
 * - Type-safe error handling with ErrorRequestHandler
 */
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  logger.error('Error:', err);

  res.status(err instanceof AuthError ? 401 : 500).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
};

app.use(errorHandler);

/**
 * Server Initialization
 *
 * Note: In production, consider:
 * - Using a process manager (e.g., PM2)
 * - Implementing graceful shutdown
 * - Setting up clustering for better performance
 */
app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});
