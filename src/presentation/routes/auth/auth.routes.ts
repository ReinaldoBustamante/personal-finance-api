import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthServices } from "../../../domain/services/auth.service";
import { AuthMiddleware } from "../../middlewares/Auth.middleware";

export class AuthRoutes {
    constructor(){}

    public static router(): Router{
        const router = Router()
        const authServices = new AuthServices()
        const userController = new AuthController(authServices)

        router.post('/', userController.login)
        router.post('/register', userController.register)
    
        return router
    }
}