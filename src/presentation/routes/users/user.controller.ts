import { Request, Response } from "express"

export class UserController{
    constructor(){}

    public getAllUsers = (req: Request, res: Response) => {
        res.json({message: 'view all'})
    }
}