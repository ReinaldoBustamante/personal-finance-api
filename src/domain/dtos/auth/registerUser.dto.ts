
export class RegisterUserDto {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) { }

    public static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, email, password } = object
        if(!name) return ['Missing name']
        if(!email) return ['Missing email']
        if(!password) return ['Missing password']

        return [undefined, new RegisterUserDto(name, email, password)]
    }
}