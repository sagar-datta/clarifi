import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '@clerk/backend';
import config from '../config/env.js';

export interface AuthenticatedRequest extends Request {
  auth: {
    userId: string;
    sessionId: string;
  };
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const requireAuth: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
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
      authorizedParties: config.cors.allowedOrigins,
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
    if (error instanceof AuthError) {
      next(error);
    } else {
      next(new AuthError('Authentication failed'));
    }
  }
};
