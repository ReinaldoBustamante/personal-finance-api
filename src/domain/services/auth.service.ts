import { BcryptAdapter } from "../../config/adapters/bcrypt.adapter";
import { prisma } from "../../config/db/prisma";
import { RegisterUserDto } from "../dtos/auth/registerUser.dto";
import { CustomError } from "../error/customError";

export class AuthServices {

    public async registerUser(registerUserDto: RegisterUserDto) {
        const { email, password, name } = registerUserDto

        //find user
        const isUserExist = !!(await prisma.user.findUnique({
            where: {
                email
            }
        }))
        if(isUserExist) throw CustomError.conflict('User already exists.')
        
        //hash password
        const passwordHashed = await BcryptAdapter.hashPassword(password)

        //create new user
        const user = await prisma.user.create({
            data: {
                email,
                password: passwordHashed,
                name
            }
        })
        const {password: userPassword, ...userEntity} = user

        return userEntity
    }
}