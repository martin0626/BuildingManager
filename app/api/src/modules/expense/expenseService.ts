import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import AppError from "../../utils/appError";

type CreateExpenseInput = {
    title: string;
    amount: number;
    date: string | Date;
};

type GetExpenseQuery = {
    title?: string;
    minAmount?: number;
    maxAmount?: number;
    dateFrom?: string;
    dateTo?: string;
};

export async function createExpense(buildingId: string, data: CreateExpenseInput) {
    await prisma.building.findUniqueOrThrow({ where: { id: buildingId } });

    return prisma.expense.create({
        data: {
            title: data.title,
            amount: data.amount,
            date: new Date(data.date),
            buildingId,
        },
    });
}

export async function getExpenseById(buildingId: string, expenseId: string) {
    return prisma.expense.findFirst({
        where: { id: expenseId, buildingId },
        include: {
            building: {
                select: {
                    id: true,
                    name: true,
                    address: true,
                    city: true,
                    imageUrl: true,
                },
            },
        },
    });
}

export async function getAllExpenses(buildingId: string, filters: GetExpenseQuery) {
    const where: Prisma.ExpenseWhereInput = { buildingId };

    if (filters.title !== undefined) {
        where.title = { contains: filters.title, mode: "insensitive" };
    }

    if (filters.minAmount !== undefined || filters.maxAmount !== undefined) {
        where.amount = {} as any;
        if (filters.minAmount !== undefined) (where.amount as any).gte = filters.minAmount;
        if (filters.maxAmount !== undefined) (where.amount as any).lte = filters.maxAmount;
    }

    if (filters.dateFrom !== undefined || filters.dateTo !== undefined) {
        where.date = {} as any;
        if (filters.dateFrom !== undefined) (where.date as any).gte = new Date(filters.dateFrom);
        if (filters.dateTo !== undefined) (where.date as any).lte = new Date(filters.dateTo);
    }

    return prisma.expense.findMany({
        where,
        select: {
            id: true,
            title: true,
            amount: true,
            date: true,
            buildingId: true,
        },
    });
}

export async function updateExpense(buildingId: string, expenseId: string, data: Partial<CreateExpenseInput>) {
    const expense = await prisma.expense.findFirst({ where: { id: expenseId, buildingId } });

    if (!expense) {
        throw new AppError("Expense not found in this building", 404);
    }

    const updateData: any = { ...data };
    if (data.date !== undefined) updateData.date = new Date(data.date as string);

    return prisma.expense.update({ where: { id: expenseId }, data: updateData });
}

export async function deleteExpense(buildingId: string, expenseId: string) {
    const expense = await prisma.expense.findFirst({ where: { id: expenseId, buildingId } });

    if (!expense) {
        throw new AppError("Expense not found in this building", 404);
    }

    return prisma.expense.delete({ where: { id: expenseId } });
}
