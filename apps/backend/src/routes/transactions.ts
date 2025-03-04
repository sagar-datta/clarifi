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

/**
 * DELETE /transactions/all
 * Delete all transactions for a user
 */
const deleteAllTransactions: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { auth } = req as AuthenticatedRequest;
    await TransactionsService.deleteAll(auth.userId);
    res.json({
      status: 'success',
      message: 'All transactions deleted',
    });
  } catch (error) {
    next(error);
  }
};

// Test endpoint to create dummy data
router.post(
  '/seed',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { auth } = req as AuthenticatedRequest;

      type CategoryConfig = {
        min: number;
        max: number;
        frequency: 'monthly' | 'quarterly' | 'yearly';
        probability?: number;
      };

      type CategoryGroup = {
        [key: string]: CategoryConfig;
      };

      const INCOME_CATEGORIES: Record<string, CategoryGroup> = {
        Employment: {
          salary: { min: 4000, max: 5500, frequency: 'monthly' },
          bonus: { min: 2000, max: 8000, frequency: 'quarterly' },
          commission: {
            min: 500,
            max: 2000,
            frequency: 'monthly',
            probability: 0.3,
          },
          overtime: {
            min: 200,
            max: 800,
            frequency: 'monthly',
            probability: 0.4,
          },
        },
        Business: {
          business_income: {
            min: 2000,
            max: 5000,
            frequency: 'monthly',
            probability: 0.2,
          },
          freelance: {
            min: 500,
            max: 3000,
            frequency: 'monthly',
            probability: 0.5,
          },
          consulting: {
            min: 1000,
            max: 4000,
            frequency: 'monthly',
            probability: 0.3,
          },
        },
        Investments: {
          dividends: { min: 100, max: 1000, frequency: 'quarterly' },
          interest: { min: 50, max: 200, frequency: 'monthly' },
          capital_gains: {
            min: 1000,
            max: 5000,
            frequency: 'quarterly',
            probability: 0.3,
          },
          rental: {
            min: 1500,
            max: 3000,
            frequency: 'monthly',
            probability: 0.2,
          },
        },
        Government: {
          tax_refund: { min: 1000, max: 5000, frequency: 'yearly' },
          benefits: {
            min: 200,
            max: 800,
            frequency: 'monthly',
            probability: 0.1,
          },
          pension: {
            min: 1000,
            max: 2000,
            frequency: 'monthly',
            probability: 0.1,
          },
        },
        Other: {
          gifts_received: {
            min: 50,
            max: 500,
            frequency: 'quarterly',
            probability: 0.4,
          },
          sale: {
            min: 100,
            max: 1000,
            frequency: 'quarterly',
            probability: 0.3,
          },
          misc_income: {
            min: 50,
            max: 300,
            frequency: 'monthly',
            probability: 0.2,
          },
        },
      };

      const EXPENSE_CATEGORIES: Record<string, CategoryGroup> = {
        'Essential Living': {
          rent: { min: 1500, max: 2500, frequency: 'monthly' },
          utilities: { min: 100, max: 300, frequency: 'monthly' },
          groceries: { min: 400, max: 800, frequency: 'monthly' },
          household: { min: 50, max: 200, frequency: 'monthly' },
        },
        Transportation: {
          fuel: { min: 100, max: 300, frequency: 'monthly' },
          public_transport: {
            min: 50,
            max: 150,
            frequency: 'monthly',
            probability: 0.7,
          },
          car_maintenance: { min: 200, max: 1000, frequency: 'quarterly' },
          parking: {
            min: 20,
            max: 100,
            frequency: 'monthly',
            probability: 0.6,
          },
        },
        'Health & Wellbeing': {
          medical: { min: 100, max: 500, frequency: 'quarterly' },
          fitness: {
            min: 50,
            max: 150,
            frequency: 'monthly',
            probability: 0.8,
          },
          personal_care: { min: 30, max: 150, frequency: 'monthly' },
        },
        Lifestyle: {
          dining: { min: 100, max: 400, frequency: 'monthly' },
          entertainment: {
            min: 50,
            max: 200,
            frequency: 'monthly',
            probability: 0.8,
          },
          shopping: {
            min: 100,
            max: 500,
            frequency: 'monthly',
            probability: 0.9,
          },
          hobbies: {
            min: 50,
            max: 300,
            frequency: 'monthly',
            probability: 0.7,
          },
          gifts: { min: 50, max: 200, frequency: 'monthly', probability: 0.4 },
        },
        Financial: {
          insurance: { min: 100, max: 300, frequency: 'monthly' },
          debt: { min: 200, max: 1000, frequency: 'monthly', probability: 0.5 },
          investments: {
            min: 200,
            max: 2000,
            frequency: 'monthly',
            probability: 0.6,
          },
          fees: { min: 10, max: 50, frequency: 'monthly' },
        },
        Other: {
          education: {
            min: 200,
            max: 1000,
            frequency: 'monthly',
            probability: 0.3,
          },
          business: {
            min: 100,
            max: 500,
            frequency: 'monthly',
            probability: 0.2,
          },
          charity: {
            min: 50,
            max: 200,
            frequency: 'monthly',
            probability: 0.5,
          },
          misc_expense: {
            min: 20,
            max: 100,
            frequency: 'monthly',
            probability: 0.3,
          },
        },
      };

      function generateAmount(min: number, max: number): number {
        return Number((Math.random() * (max - min) + min).toFixed(2));
      }

      function shouldGenerateTransaction(probability = 1): boolean {
        return Math.random() < probability;
      }

      function generateTransactionsForDate(date: Date): Array<{
        amount: number;
        description: string;
        category: string;
        type: TransactionType;
        date: string;
      }> {
        const transactions = [];

        // Generate income transactions
        for (const [groupName, categories] of Object.entries(
          INCOME_CATEGORIES,
        )) {
          for (const [category, config] of Object.entries(categories)) {
            const { min, max, frequency, probability = 1 } = config;

            if (!shouldGenerateTransaction(probability)) continue;

            if (
              frequency === 'monthly' ||
              (frequency === 'quarterly' && date.getMonth() % 3 === 0) ||
              (frequency === 'yearly' && date.getMonth() === 0)
            ) {
              const description = `${groupName} - ${category
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}`;

              transactions.push({
                amount: generateAmount(min, max),
                description,
                category,
                type: 'income' as TransactionType,
                date: new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  Math.floor(Math.random() * 28) + 1,
                ).toISOString(),
              });
            }
          }
        }

        // Generate expense transactions
        for (const [groupName, categories] of Object.entries(
          EXPENSE_CATEGORIES,
        )) {
          for (const [category, config] of Object.entries(categories)) {
            const { min, max, frequency, probability = 1 } = config;

            if (!shouldGenerateTransaction(probability)) continue;

            if (
              frequency === 'monthly' ||
              (frequency === 'quarterly' && date.getMonth() % 3 === 0) ||
              (frequency === 'yearly' && date.getMonth() === 0)
            ) {
              const description = `${groupName} - ${category
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}`;

              transactions.push({
                amount: generateAmount(min, max),
                description,
                category,
                type: 'expense' as TransactionType,
                date: new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  Math.floor(Math.random() * 28) + 1,
                ).toISOString(),
              });
            }
          }
        }

        return transactions;
      }

      const transactions = [];

      // Generate transactions for the past 3 years
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setFullYear(endDate.getFullYear() - 3);

      for (
        let date = startDate;
        date <= endDate;
        date.setMonth(date.getMonth() + 1)
      ) {
        const monthlyTransactions = generateTransactionsForDate(new Date(date));
        transactions.push(...monthlyTransactions);
      }

      // Create transactions in sequence
      const createdTransactions = await Promise.all(
        transactions.map((transaction) =>
          TransactionsService.create(auth.userId, transaction),
        ),
      );

      res.json({
        status: 'success',
        message: 'Sample transactions created successfully',
        count: createdTransactions.length,
        userId: auth.userId,
      });
    } catch (error) {
      next(error);
    }
  },
);

// Mount routes
router.get('/', listTransactions);
router.delete('/all', deleteAllTransactions);
router.get('/:id', getTransaction);
router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
