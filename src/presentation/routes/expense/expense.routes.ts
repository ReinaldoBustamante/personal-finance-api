import { Request, Response, Router } from "express";
import { ExpenseControllers } from "./expense.controller";
import { ExpenseService } from "../../../domain/services/expense.service";
import { ExpensesMiddleware } from "../../middlewares/expenses.middleware";


export class ExpenseRoutes {

    public static router(): Router {
        const router = Router()
        const expenseService = new ExpenseService()
        const expenseControllers = new ExpenseControllers(expenseService)

        router.get('/', [ExpensesMiddleware.validatePaginationQueryParams], expenseControllers.getExpenses)
        router.post('/', expenseControllers.createExpense)

        return router
    }
}