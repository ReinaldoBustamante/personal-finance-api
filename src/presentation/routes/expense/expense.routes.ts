import { Request, Response, Router } from "express";
import { ExpenseControllers } from "./expense.controller";


export class ExpenseRoutes{
    
    public static router(): Router {
        const router = Router()
        const expenseControllers = new ExpenseControllers()
        
        router.get('/', expenseControllers.getExpenses)

        return router
    }
}