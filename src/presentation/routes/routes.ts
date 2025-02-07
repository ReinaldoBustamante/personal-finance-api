import { Router } from "express";
import { AuthRoutes } from "./auth/auth.routes";

export class AppRoutes {
    constructor() { }

    public static router(): Router {
        const router = Router()
        
        router.use('/auth', AuthRoutes.router())

        return router
    }
}