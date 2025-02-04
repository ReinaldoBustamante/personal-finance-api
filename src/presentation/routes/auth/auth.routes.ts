import { Router } from "express";
import { AuthController } from "./auth.controller";

export class AuthRoutes {
    constructor(){}

    public static router(): Router{
        const router = Router()
        const userController = new AuthController()

        router.get('/', userController.getAllUsers)

        return router
    }
}