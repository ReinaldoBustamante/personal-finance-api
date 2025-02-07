import { RegisterUserDto } from "../../../../src/domain/dtos"

describe('./domain/dtos/auth/registerUser.dto.ts', () => {
    it('should correctly create a RegisterUserDto from valid input data', () => {
        const data = {
            email: 'reinaldo.bustamante026@gmail.com',
            name: 'reinaldo bustamante',
            password: 'admin',
            campo: 'azxc',
            campo2: 123
        }
        const [error, registerUserDto] = RegisterUserDto.create(data)
        expect(error).toBeUndefined()
        expect(registerUserDto).toBeDefined()
        expect(registerUserDto).toEqual({
            email: data.email,
            name: data.name,
            password: data.password
        })
    })

    it('Should return missing name', () => {
        const data = {
            email: 'reinaldo.bustamante026@gmail.com'
        }
        const [error, registerUserDto] = RegisterUserDto.create(data)
        expect(registerUserDto).toBeUndefined()
        expect(error).toBe('Missing name')
    })

    it('Should return missing email', () => {
        const data = {
            name: 'Reinaldo Bustamante'
        }
        const [error, registerUserDto] = RegisterUserDto.create(data)
        expect(registerUserDto).toBeUndefined()
        expect(error).toBe('Missing email')
    })

    it('Should return missing password', () => {
        const data = {
            email: 'reinaldo.bustmanate026@gmail.com',
            name: 'Reinaldo Bustamante'
        }
        const [error, registerUserDto] = RegisterUserDto.create(data)
        expect(registerUserDto).toBeUndefined()
        expect(error).toBe('Missing password')
    })
})