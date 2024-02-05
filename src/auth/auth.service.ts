import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { users } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthCreateDto } from "./dtos/auth-create.dto";
import { AuthTokenDTO } from "./dtos/auth-token.dto";
import { compare } from "bcrypt";
import { writeFile } from "fs/promises";
import { join } from "path";
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService,
        private readonly mailer: MailerService
    ) { }

    createToken(user: users) {

        return this.jwtService.sign({}, {
            expiresIn: "1 day",
            issuer: "login",
            audience: "users",
            subject: String(user.id),
        });
    }

    checkToken(token: AuthTokenDTO) {

        const verifyToken = String(token).split(" ")[1]

        try {
            const isValidToken = this.jwtService.verify(verifyToken, {
                issuer: "login",
                audience: "users"
            })

            return isValidToken

        } catch (error) {
            throw new BadRequestException("Token inválido")
        }

    }

    async login(email: string, password: string) {

        const user = await this.prisma.users.findFirst({
            where: {
                email,
            }
        });

        if (!user) throw new UnauthorizedException("E-mail e ou senha incorretos");

        const matchPassword = await compare(password, user.password);

        if (!matchPassword) throw new UnauthorizedException("E-mail e ou senha incorretos");

        const token = this.createToken(user);

        return { user, token };
    }

    async register(data: AuthCreateDto) {

        const user = await this.userService.create(data);

        return this.login(data.email, data.password)

    }

    async updateAvatar(nameAvatar: string, avatar: Express.Multer.File) {
        return writeFile(join(__dirname, "..", "..", "storage", "avatar", nameAvatar), avatar.buffer)
    }


    async forgetPassword(email) {

        try {

            const user = await this.prisma.users.findFirst({ where: email})

            if (!user) throw new NotFoundException("Usúario não encontrado na nossa base de dados!");
            
            const token = this.jwtService.sign({}, {
                expiresIn: "20 minutes",
                subject: String(user.id),
                issuer: "forgetPassword",
                audience: "users",
            })

            await this.mailer.sendMail({
                subject : "Recuperação de senha",
                to: email.email,
                html: `
                <h1>Olá, ${user.name}!</h1>
                <p>Seu token é: ${token}</p>
                <!-- Adicione o conteúdo HTML desejado aqui -->
            `,

            })

            return { message: "E-mail para recuperação de senha enviado, use o token!" }


        } catch (error) {
            throw new BadRequestException(error)
        }
    }

}