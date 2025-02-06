import { BcryptAdapter, JWTAdapter } from "../../../src/config/adapters";
import { prisma } from "../../../src/config/db/prisma";
import { AuthServices } from "../../../src/domain/services/auth.service";

jest.mock('../../../src/config/db/prisma', () => ({
    prisma: {
        user: {
            findUnique: jest.fn()
        }
    }
}));

jest.mock('../../../src/config/adapters/bcrypt.adapter', () => ({
    BcryptAdapter: {
        hashPassword: jest.fn(),
        comparePassword: jest.fn()
    }
}));

jest.mock('../../../src/config/adapters/jwt.adapter', () => ({
    JWTAdapter: {
        signToken: jest.fn()
    }
}))

describe('AuthServices', () => {
    let authService: AuthServices;

    beforeEach(() => {
        authService = new AuthServices();
        jest.resetAllMocks();
    });

    describe('loginUser', () => {
        it('should throw CustomError if user not found', async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);

            await expect(authService.loginUser({
                email: 'testEmail@gmail.com',
                password: 'wrongPassword'
            })).rejects.toMatchObject({
                statusCode: 404,
                message: 'User not found'
            });
          
        });

        it('should throw CustomError if credentials are invalid', async () => {
         
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({
                email: 'testEmail@gmail.com',
                password: 'hashedPassword' 
            });

            (BcryptAdapter.comparePassword as jest.Mock).mockResolvedValueOnce(false);

            await expect(authService.loginUser({
                email: 'testEmail@gmail.com',
                password: 'wrongPassword'
            })).rejects.toMatchObject({
                statusCode: 401,
                message: 'Credentials incorrect.'
            });
        });

        it('should return user data if credentials are correct', async () => {
            const userMock = { email: 'testEmail@gmail.com', password: 'hashedPassword' };
        
            (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(userMock);
            (BcryptAdapter.comparePassword as jest.Mock).mockResolvedValueOnce(true);
            (JWTAdapter.signToken as jest.Mock).mockReturnValueOnce('abc');
            
            const result = await authService.loginUser({
                email: 'testEmail@gmail.com',
                password: 'correctPassword'
            });
        
            expect(result).toEqual({
                user: {
                    email: userMock.email
                },
                token: 'abc'
            }); 
        });
    });
});