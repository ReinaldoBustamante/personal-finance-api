import { Response } from "express"

export class CustomError extends Error {
    constructor(
        public readonly message: string,
        public readonly statusCode: number
    ) {
        super(message)
    }

    public static badRequest(message: string) {
        return new CustomError(message, 400)
    }

    public static conflict(message: string) {
        return new CustomError(message, 409)
    }

    public static showError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message })
        } else {
            console.log(error)
            res.status(500).json({ error: 'internal server error' })
        }
    }

}