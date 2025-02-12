import { prisma } from "../../config/db/prisma";
import { CreateExpenseDto } from "../dtos/expense/createExpense.dto";
import { CustomError } from "../error/customError";

export class ExpenseService {

    public async getExpenses(id: number, pagination: { limit: number, offset: number }) {
        
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!user) throw CustomError.notFound('User not found')

        const expenses = await prisma.expense.findMany({
            where: {
                user_id: id
            },
            take: pagination.limit,
            skip: pagination.offset,
        })

        const totalCount = await prisma.expense.count({
            where: {
                user_id: id
            }
        })
        
        if (totalCount <= pagination.offset) throw CustomError.badRequest(`Offset must be less than: ${totalCount}`)
        const totalPages = Math.ceil(totalCount / pagination.limit)
        const currentPage = Math.floor(pagination.offset / pagination.limit) + 1
        const previousPage = currentPage > 1 ? currentPage - 1 : null;
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        return {
            expenses,
            pagination: {
                totalPages,
                currentPage,
                previousPage,
                nextPage
            }
        }
    }

    public async createExpense(id: number, createExpenseDto: CreateExpenseDto) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!user) throw CustomError.notFound('User not found')

        const newExpense = await prisma.expense.create({
            data: {
                ...createExpenseDto,
                user_id: id
            }
        })
        return newExpense
    }
}