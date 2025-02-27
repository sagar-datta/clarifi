/**
 * Transactions Routes
 *
 * RESTful endpoints for managing transactions.
 * All routes are protected by authentication.
 */

import { Router } from 'express';
import type { Response, NextFunction, Request, RequestHandler } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { TransactionsService } from '../services/transactions.js';
import type { TransactionType } from '../types/database.js';

const router = Router();

interface CreateTransactionBody {
  amount: number;
  description: string;
  category: string;
  type: TransactionType;
  date: string;
}

interface UpdateTransactionBody {
  amount?: number;
  description?: string;
  category?: string;
  type?: TransactionType;
  date?: string;
}

interface TransactionParams {
  id: string;
}

/**
 * GET /transactions
 * List all transactions for the authenticated user
 */
const listTransactions: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { auth } = req as AuthenticatedRequest;
    const transactions = await TransactionsService.list(auth.userId);
    res.json({
      status: 'success',
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /transactions/:id
 * Get a specific transaction by ID
 */
const getTransaction: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { auth } = req as AuthenticatedRequest;
    const { id } = req.params;
    if (!id) {
      throw new Error('Transaction ID is required');
    }
    const transaction = await TransactionsService.get(auth.userId, id);
    res.json({
      status: 'success',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /transactions
 * Create a new transaction
 */
const createTransaction: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { auth } = req as AuthenticatedRequest;
    const transaction = await TransactionsService.create(auth.userId, req.body);
    res.status(201).json({
      status: 'success',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /transactions/:id
 * Update an existing transaction
 */
const updateTransaction: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { auth } = req as AuthenticatedRequest;
    const { id } = req.params;
    if (!id) {
      throw new Error('Transaction ID is required');
    }
    const transaction = await TransactionsService.update(
      auth.userId,
      id,
      req.body,
    );
    res.json({
      status: 'success',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /transactions/:id
 * Delete a transaction
 */
const deleteTransaction: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { auth } = req as AuthenticatedRequest;
    const { id } = req.params;
    if (!id) {
      throw new Error('Transaction ID is required');
    }
    await TransactionsService.delete(auth.userId, id);
    res.json({
      status: 'success',
      message: 'Transaction deleted',
    });
  } catch (error) {
    next(error);
  }
};

// Mount routes
router.get('/', listTransactions);
router.get('/:id', getTransaction);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
