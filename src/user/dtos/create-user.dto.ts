import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator"
import { Roles } from "src/decorators/roles.decorator";

export class CreateUserDTO {

    @IsString()
    name: string;

    @IsEmail()
    email: string;


    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
    })
    password: string;

    @IsOptional()
    @IsDateString()
    birthdayAt: string

    @IsOptional()
    @IsEnum(Roles)
    roles: number;
}