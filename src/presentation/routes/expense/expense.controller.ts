import { Request, Response } from "express";

export class ExpenseControllers {
    constructor() { }

    public getExpenses = (req: Request, res: Response) => {
        res.json('finance')
    }
}