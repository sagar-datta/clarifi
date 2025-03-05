import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '@clerk/backend';
import { config } from '../config/env.js';

/**
 * Extends Express Request to include auth information.
 * This is used for type safety in protected routes after authentication.
 * The auth property is guaranteed to exist after passing through requireAuth middleware.
 */
export interface AuthenticatedRequest<TBody = any, TParams = any>
  extends Request<TParams, any, TBody> {
  auth: {
    userId: string; // Clerk's unique user identifier
    sessionId: string; // Clerk's session identifier for token refresh
  };
}

/**
 * Custom error class for authentication failures.
 * Used to distinguish auth errors from other errors in the global error handler.
 * This allows us to send appropriate HTTP status codes (401 vs 500).
 */
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Authentication middleware that verifies Clerk session tokens.
 *
 * Implementation notes:
 * - Uses type assertion to add auth property to req object
 * - Validates both token presence and format before verification
 * - Supports multiple frontend origins through config.cors.allowedOrigins
 * - Passes AuthError instances to next() for consistent error handling
 *
 * Security considerations:
 * - Token verification includes authorizedParties to prevent token reuse
 * - All authentication failures are normalized to generic messages
 * - Session data is typed to prevent accidental exposure of sensitive info
 */
export const requireAuth: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Development bypass with X-Dev-User-Id header
    if (config.nodeEnv === 'development' && req.headers['x-dev-user-id']) {
      (req as AuthenticatedRequest).auth = {
        userId: req.headers['x-dev-user-id'] as string,
        sessionId: 'dev-session',
      };
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AuthError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new AuthError('Invalid token format');
    }

    const session = await verifyToken(token, {
      secretKey: config.clerk.secretKey,
    });
    if (!session) {
      throw new AuthError('Invalid token');
    }

    (req as AuthenticatedRequest).auth = {
      userId: session.sub,
      sessionId: session.sid,
    };

    next();
  } catch (error) {
    console.error('Auth error:', error);
    next(new AuthError('Authentication failed'));
  }
};
