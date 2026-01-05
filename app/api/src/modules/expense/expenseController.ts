import catchAsync from "../../utils/catchAsync";
import { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } from "./expenseService";

export const createExpenseHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    const expenseData = req.body;
    const result = await createExpense(buildingId, expenseData);
    res.status(201).json({ message: "Expense created successfully", data: result });
});

export const getExpensesHandler = catchAsync(async (req, res) => {
    const { buildingId } = req.params;
    const expenses = await getAllExpenses(buildingId, req.query);
    res.status(200).json({ data: expenses });
});

export const getExpenseByIdHandler = catchAsync(async (req, res) => {
    const { id, buildingId } = req.params;
    const result = await getExpenseById(buildingId, id);
    res.status(200).json({ data: result });
});

export const updateExpenseHandler = catchAsync(async (req, res) => {
    const { id, buildingId } = req.params;
    const expenseData = req.body;
    const updated = await updateExpense(buildingId, id, expenseData);
    res.status(200).json({ message: "Expense updated successfully", data: updated });
});

export const deleteExpenseHandler = catchAsync(async (req, res) => {
    const { buildingId, id } = req.params;
    await deleteExpense(buildingId, id);
    res.status(200).json({ message: "Expense deleted successfully" });
});
