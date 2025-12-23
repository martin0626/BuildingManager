import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import AppError from './appError';

const handlePrismaError = (err: unknown): AppError | unknown => {
    
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        
        switch (err.code) {
        case 'P2002':
            {
            const duplicateTarget =
                Array.isArray(err.meta?.target)
                ? err.meta.target.join(', ')
                : 'unique field';
            return new AppError(
                `Duplicate field value: ${duplicateTarget}`,
                400
            );
        }

        case 'P2025':
            return new AppError('Record not found', 404);
        default:
            return new AppError('Database error', 400);
        }
    }

        if (err instanceof Prisma.PrismaClientValidationError) {
            return new AppError('Invalid data provided', 400);
        }

        return err;
    };

    const globalErrorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    let error = err;

    error = handlePrismaError(error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        });
    }

    // Fallback for unknown / programming errors
    console.error('UNHANDLED ERROR 💥', error);

    res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
};

export default globalErrorHandler;