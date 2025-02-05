import { prisma } from "../../config/db/prisma";
import { BcryptAdapter , JWTAdapter} from "../../config/adapters";
import { LoginUserDto, RegisterUserDto } from "../dtos";
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

    public async loginUser(loginUserDto: LoginUserDto) {
        const {email, password} = loginUserDto
        //find user
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user) throw CustomError.notFound('User not found')
        // verify password
        const isCredentialsCorrect = await BcryptAdapter.comparePassword(password, user.password)
        if(!isCredentialsCorrect) throw CustomError.unauthorized('Credentials incorrect.')
        // JWT
        const token = JWTAdapter.signToken({
            id: user.id,
            name: user.name,
            email: user.email
        })

        const {password: userPassword, ...userEntity} = user
        return {
            user: userEntity,
            token: token
        }
        
    }
}