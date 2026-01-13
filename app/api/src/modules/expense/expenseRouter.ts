import { Router } from "express";
import { createExpenseHandler, getExpenseByIdHandler, getExpensesHandler, updateExpenseHandler, deleteExpenseHandler } from "./expenseController";
import { roleAuthorize } from "../../middlewares/roleAuthorize";

const router = Router({ mergeParams: true });

router
    .post("/", roleAuthorize(["ADMIN", "MANAGER"]), createExpenseHandler)
    .get("/:id", getExpenseByIdHandler)
    .get('/', getExpensesHandler)
    .patch('/:id', roleAuthorize(["ADMIN", "MANAGER"]), updateExpenseHandler)
    .delete('/:id', roleAuthorize(["ADMIN", "MANAGER"]), deleteExpenseHandler)
export default router;
