import { prisma } from "../../../src/config/db/prisma";
import { ExpenseService } from "../../../src/domain/services/expense.service";

jest.mock('../../../src/config/db/prisma', () => ({
    prisma: {
        user: {
            findUnique: jest.fn()
        },
        expense: {
            findMany: jest.fn(),
            count: jest.fn(),
            create: jest.fn()
        }
    }
}));


describe('', () => {
    let expenseService: ExpenseService;

    beforeEach(() => {
        expenseService = new ExpenseService();
        jest.resetAllMocks();
    });

    describe('getExpenses', () => {
        it('', async () => {
            (prisma.user.findUnique as jest.Mock).mockReturnValueOnce(null)

            await expect(expenseService.getExpenses(1, {
                limit: 500,
                offset: 0
            })).rejects.toMatchObject({
                statusCode: 404,
                message: 'User not found'
            });
        })

        it('', async () => {
            (prisma.user.findUnique as jest.Mock).mockReturnValueOnce({
                email: 'test@gmail.com',
                password: 'test'
            });

            (prisma.expense.findMany as jest.Mock).mockReturnValueOnce([
                {
                    description: 'test1',
                    Amount: 3000
                },
                {
                    description: 'test2',
                    Amount: 3400
                }
            ]);

            (prisma.expense.count as jest.Mock).mockReturnValueOnce(4);

            await expect(expenseService.getExpenses(1, {
                limit: 2,
                offset: 0
            })).resolves.toMatchObject({
                expenses: [
                    {
                        description: 'test1',
                        Amount: 3000
                    },
                    {
                        description: 'test2',
                        Amount: 3400
                    }
                ],
                pagination: {
                    totalPages: 2,
                    currentPage: 1,
                    previousPage: null,
                    nextPage: 2
                }
            })
        })

        it('', async () => {
            (prisma.user.findUnique as jest.Mock).mockReturnValueOnce({
                email: 'test@gmail.com',
                password: 'test'
            });

            (prisma.expense.findMany as jest.Mock).mockReturnValueOnce([
                {
                    description: 'test3',
                    Amount: 3000
                },
                {
                    description: 'test4',
                    Amount: 3400
                }
            ]);

            (prisma.expense.count as jest.Mock).mockReturnValueOnce(4);

            await expect(expenseService.getExpenses(1, {
                limit: 2,
                offset: 2
            })).resolves.toMatchObject({
                expenses: [
                    {
                        description: 'test3',
                        Amount: 3000
                    },
                    {
                        description: 'test4',
                        Amount: 3400
                    }
                ],
                pagination: {
                    totalPages: 2,
                    currentPage: 2,
                    previousPage: 1,
                    nextPage: null
                }
            })
        })

        it('', async () => {
            (prisma.user.findUnique as jest.Mock).mockReturnValueOnce({});
            (prisma.expense.count as jest.Mock).mockReturnValueOnce(3)

            await expect(expenseService.getExpenses(1, {
                limit: 500,
                offset: 4
            })).rejects.toMatchObject({
                statusCode: 400,
                message: 'Offset must be less than: 3'
            })
        })
    })

    describe('createExpense', () => {
        it('', async () => {
            (prisma.user.findUnique as jest.Mock).mockReturnValueOnce(null)

            await expect(expenseService.createExpense(1,{
                description: 'new expense',
                amount: 3000
            })).rejects.toMatchObject({
                statusCode: 404,
                message: 'User not found'
            })
        })

        it('', async () => {
            const created_at = new Date();
            (prisma.user.findUnique as jest.Mock).mockReturnValueOnce({});
            (prisma.expense.create as jest.Mock).mockReturnValueOnce({
                id: 1,
                description: 'new expense',
                amount: 3000,
                created_at,
                monthly: false,
                user_id: 1
            });

            await expect(expenseService.createExpense(1, {
                description: 'new expense',
                amount: 3000
            })).resolves.toMatchObject({
                id: 1,
                description: 'new expense',
                amount: 3000,
                created_at,
                monthly: false,
                user_id: 1
            })
            
        })
    })
})