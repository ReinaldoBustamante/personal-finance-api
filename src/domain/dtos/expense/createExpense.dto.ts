
export class CreateExpenseDto {

    constructor(
        public readonly description: string,
        public readonly amount: number,
        public readonly monthly?: boolean
    ) { }

    public static create(object: { [key: string]: any }): [string?, CreateExpenseDto?] {
        const { description, amount, monthly } = object
        if (!description) return ['Missing description']
        if (!amount) return ['Missing amount']


        return [undefined, new CreateExpenseDto(description, amount, monthly)]
    }
}