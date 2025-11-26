import { IsEmail, IsInt, IsString, IsStrongPassword, Max, Min } from "class-validator"

export class SignupDTO {
    @IsEmail()
    email : string

    @IsStrongPassword({
        minLength:9,
        minSymbols:1,
        minUppercase:3,
        minLowercase:5
    })
    password : string

    @IsStrongPassword()
    confirmPassword : string

    @IsString()
    name : string

    @IsInt()
    @Min(18)
    @Max(55)
    age : number
}