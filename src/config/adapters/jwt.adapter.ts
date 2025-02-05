import { JsonWebTokenError, JwtPayload, sign, verify } from 'jsonwebtoken'
import { CustomError } from '../../domain/error/customError'

export class JWTAdapter {
    constructor() { }

    public static signToken(payload: { id: number, name: string, email: string }) {
        try {
            const token = sign(payload, 'seed', { expiresIn: '2h' })
            return token
        } catch (error) {
            throw Error('Internal Server Error')
        }
    }

    public static verifyToken(token: string) {
        try {
            const { id, name, email } = verify(token, 'seed') as JwtPayload
            return {
                id,
                name,
                email
            }
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                if (error.message === 'jwt malformed') {
                    throw CustomError.unauthorized('Invalid Token')
                }
                if (error.message === 'jwt expired') {
                    throw CustomError.unauthorized('Token expired')
                }
            } else {
                throw Error('Internal Server Error')
            }
        }
    }
}