import { Request, Response } from "express"
import { RegisterUserDto } from "../../../domain/dtos/auth/registerUser.dto"
import { CustomError } from "../../../domain/error/customError"

export class AuthController {
    constructor() { }

    public register = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body)
        try {
            if (error) throw CustomError.badRequest(error)
            res.json(registerUserDto)
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