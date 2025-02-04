import { Router } from "express";
import { UserController } from "./user.controller";

export class UserRoutes {
    constructor(){}

    public static router(): Router{
        const router = Router()
        const userController = new UserController()

        router.get('/', userController.getAllUsers)

        return router
    }
}