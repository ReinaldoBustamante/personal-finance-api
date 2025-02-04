import { Router } from "express";
import { UserRoutes } from "./users/users.routes";

export class AppRoutes {
    constructor() { }

    public static router(): Router {
        const router = Router()
        
        router.use('/user', UserRoutes.router())

        return router
    }
}