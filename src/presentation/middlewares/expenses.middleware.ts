import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/error/customError";

export class ExpensesMiddleware {

    constructor() { }

    public static validatePaginationQueryParams(req: Request, res: Response, next: NextFunction) {
        const { limit, offset } = req.query;

        try {
            if (!limit) throw CustomError.badRequest('Limit query param is mandatory')
            if (isNaN(+limit) || +limit <= 0 || +limit > 500) throw CustomError.badRequest('Limit must be a positive number and <= 500');
            if (offset && (isNaN(+offset) || +offset < 0)) throw CustomError.badRequest('Offset must be a non-negative number');
            next();
        } catch (error) {
            CustomError.showError(error, res)
        }
    }
}