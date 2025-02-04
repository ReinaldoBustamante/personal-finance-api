import { Request, Response } from "express"
import { RegisterUserDto } from "../../../domain/dtos/auth/registerUser.dto"
import { CustomError } from "../../../domain/error/customError"
import { AuthServices } from "../../../domain/services/auth.service"

export class AuthController {
    constructor(
        public authServices: AuthServices
    ) { }

    public register = async (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        try {
            if (error) throw CustomError.badRequest(error)
            const user = await this.authServices.registerUser(registerUserDto!)
            res.json(user)
        } catch (error) {
            CustomError.showError(error, res)
        }
    }

    public login = (req: Request, res: Response) => {
        res.json({
            message: 'not implemented'
        })
    }
}