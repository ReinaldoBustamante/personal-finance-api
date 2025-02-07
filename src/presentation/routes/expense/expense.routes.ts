import { Request, Response, Router } from "express";
import { ExpenseControllers } from "./expense.controller";
import { ExpenseService } from "../../../domain/services/expense.service";


export class ExpenseRoutes{
    
    public static router(): Router {
        const router = Router()
        const expenseService = new ExpenseService()
        const expenseControllers = new ExpenseControllers(expenseService)
        
        router.get('/', expenseControllers.getExpenses)
        router.post('/', expenseControllers.createExpense)
        return router
    }
}