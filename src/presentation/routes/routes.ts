import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";
import { ExpenseRoutes } from "./expense/expense.routes";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AppRoutes {
    constructor() { }

    public static router(): Router {
        const router = Router()

        router.use('/auth', AuthRoutes.router())
        router.use('/expenses', [AuthMiddleware.auth], ExpenseRoutes.router())
        return router
    }
}