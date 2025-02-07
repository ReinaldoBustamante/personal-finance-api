import { prisma } from "../../config/db/prisma";
import { CreateExpenseDto } from "../dtos/expense/createExpense.dto";
import { CustomError } from "../error/customError";

export class ExpenseService {

    public async getExpenses(id: number){
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
        if(!user) throw CustomError.notFound('User not found')

        const expenses = await prisma.expense.findMany({
            where: {
                user_id: id
            }
        })
        return expenses
    }

    public async createExpense(id: number, createExpenseDto: CreateExpenseDto){
        const user = await prisma.user.findUnique({
            where:{
                id
            }
        })
        if(!user) throw CustomError.notFound('User not found')
        
        const newExpense = await prisma.expense.create({
            data: {
                ...createExpenseDto,
                user_id: id
            }
        })
        return newExpense
    }
}