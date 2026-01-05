import { Router } from "express";
import { createExpenseHandler, getExpenseByIdHandler, getExpensesHandler, updateExpenseHandler, deleteExpenseHandler } from "./expenseController";

const router = Router({ mergeParams: true });

router
    .post("/", createExpenseHandler)
    .get("/:id", getExpenseByIdHandler)
    .get('/', getExpensesHandler)
    .patch('/:id', updateExpenseHandler)
    .delete('/:id', deleteExpenseHandler)

export default router;
