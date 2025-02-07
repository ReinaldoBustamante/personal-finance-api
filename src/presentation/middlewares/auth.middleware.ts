import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/error/customError";
import { JWTAdapter } from "../../config/adapters";

export class AuthMiddleware {

    constructor() { }

    public static auth(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization
        try {
            if (!authorization) throw CustomError.badRequest('No bearer token provider')

            const [type, token] = authorization.split(' ')
            if (type !== 'Bearer') throw CustomError.badRequest('Need Bearer Token')
            if (!token) throw CustomError.badRequest('Invalid token format');
            const decodeToken = JWTAdapter.verifyToken(token)
            req.body.user = decodeToken

            next()
        } catch (error) {
            CustomError.showError(error, res)
        }

    }
}