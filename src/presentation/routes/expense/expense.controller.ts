import { Request, Response } from "express";
import { CustomError } from "../../../domain/error/customError";
import { ExpenseService } from "../../../domain/services/expense.service";
import { CreateExpenseDto } from "../../../domain/dtos/expense/createExpense.dto";

export class ExpenseControllers {
    constructor(
        public expenseService: ExpenseService
    ) { }

    public getExpenses = async (req: Request, res: Response) => {
        const id = req.body.user.id
        try {
            if (!id) throw CustomError.unauthorized('User not logged')
            const expenses = await this.expenseService.getExpenses(id)
            res.json({
                expenses,
                pagination: {
                    
                }
            })
        } catch (error) {
            CustomError.showError(error, res)
        }
    }

    public createExpense = async (req: Request, res: Response) => {
        const id = req.body.user.id
        const [error, createExpenseDto] = CreateExpenseDto.create(req.body)
        try {
            if (!id) throw CustomError.unauthorized('User not logged')
            if (error) throw CustomError.badRequest(error)
            const newExpense = await this.expenseService.createExpense(id, createExpenseDto!)
            res.json(newExpense)
        } catch (error) {
            CustomError.showError(error, res)
        }
    }
}