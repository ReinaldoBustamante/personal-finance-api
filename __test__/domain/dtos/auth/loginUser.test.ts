import { LoginUserDto } from "../../../../src/domain/dtos"

describe('./domain/dtos/auth/loginUser.dto.ts', () => {
    it('should create LoginUserDto without errors when valid data is provided', () => {
        const data = {
            email: 'reinaldo.bustamante026@gmail.com',
            password: 'admin'
        }
        const [error, loginUserDto] = LoginUserDto.create(data)

        expect(error).toBeUndefined()
        expect(loginUserDto!.email).toEqual(data.email)
        expect(loginUserDto!.password).toEqual(data.password)
    })

    it('should return error when password is not provided', () => {
        const data = {
            email: 'reinaldo.bustamante026@gmail.com'
        }
        const [error, loginUserDto] = LoginUserDto.create(data)

        expect(error).toBe('Missing password')
    })

    it('should return error when email is not provided', () => {
        const data = {
            password: 'reinaldo.bustamante026@gmail.com'
        }
        const [error, loginUserDto] = LoginUserDto.create(data)

        expect(error).toBe('Missing email')
    })
})