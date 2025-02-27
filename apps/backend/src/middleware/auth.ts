import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@clerk/backend';
import { config } from '../config/env';

// Extend Express Request type to include auth data
declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
        sessionId: string;
      };
    }
  }
}

// Custom error for authentication failures
export class AuthenticationError extends Error {
  status: number;

  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'AuthenticationError';
    this.status = 401;
  }
}

// Clerk middleware with custom error handling
export const requireAuth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the session token from the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        throw new AuthenticationError('No token provided');
      }

      // We know token exists because of the check above
      const token = authHeader.split(' ')[1]!;

      // Verify the token
      const verifiedToken = await verifyToken(token, {
        secretKey: config.clerk.secretKey,
        // Add your frontend URL(s) here
        authorizedParties: ['http://localhost:3000'],
      });

      if (!verifiedToken?.sub) {
        throw new AuthenticationError('Invalid session');
      }

      // Attach the verified data to the request
      req.auth = {
        userId: verifiedToken.sub,
        sessionId: verifiedToken.sid,
      };

      next();
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message:
          error instanceof Error ? error.message : 'Authentication failed',
      });
    }
  };
};
