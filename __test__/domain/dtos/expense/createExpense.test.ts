import { CreateExpenseDto } from "../../../../src/domain/dtos/expense/createExpense.dto"



describe('', () => {
    it('Should return an object with the corresponding fields', () => {
        const data = {
            description: 'expense 1',
            amount: 3000,
            test: '2',
            test2: false
        }

        const [error, createExpense] = CreateExpenseDto.create(data)

        expect(error).toBeUndefined()
        expect(createExpense).toEqual({
            description: 'expense 1',
            amount: 3000
        })
    })

    it('should show an error when not including relevant fields', () => {
        const data1 = {
            description: 'test1'
        }
        const data2 = {
            amount: 3000
        }

        const [error1, createExpense1] = CreateExpenseDto.create(data1)
        const [error2, createExpense2] = CreateExpenseDto.create(data2)

        expect(createExpense1).toBeUndefined()
        expect(createExpense2).toBeUndefined()
        expect(error1).toBe('Missing amount')
        expect(error2).toBe('Missing description')
    })
})