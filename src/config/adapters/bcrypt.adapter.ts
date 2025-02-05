import { hash, compare } from 'bcrypt'

export class BcryptAdapter {
    constructor() { }

    public static async hashPassword(password: string) {
        const saltRounds = 10;
        const passwordHashed = await hash(password, saltRounds)
        return passwordHashed
    }

    public static async comparePassword(password: string, hash:string){
        const isCorrect = await compare(password, hash)
        return isCorrect
    }
}