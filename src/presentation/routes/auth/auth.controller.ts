import { Request, Response } from "express"
import { RegisterUserDto, LoginUserDto } from "../../../domain/dtos"
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

    public login = async (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)
        try {
            if (error) throw CustomError.badRequest(error)
            const user = await this.authServices.loginUser(loginUserDto!)
            res.json(user)
        } catch (error) {
            CustomError.showError(error, res)
        }
    }

}