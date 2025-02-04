import { hash } from 'bcrypt'

export class BcryptAdapter {
    constructor() { }

    public static async hashPassword(password: string) {
        const saltRounds = 10;
        const passwordHashed = await hash(password, saltRounds)
        return passwordHashed
    }
}