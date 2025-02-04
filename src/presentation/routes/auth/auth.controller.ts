import { Request, Response } from "express"

export class AuthController{
    constructor(){}

    public getAllUsers = (req: Request, res: Response) => {
        res.json([
            {
                name: 'Reinaldo',
                email: 'Reinaldo.ebust@gmail.com'
            }
        ])
    }
}