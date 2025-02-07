
export class CreateExpenseDto {

    constructor(
        public readonly description: string,
        public readonly amount: number,
    ){}

    public static create(object: {[key:string]: any}): [string?, CreateExpenseDto?]{
        const {description, amount} = object
        if(!description) return ['Missing description']
        if(!amount) return ['Missing amount']
     
        return [undefined, new CreateExpenseDto(description, amount)]
    }
}