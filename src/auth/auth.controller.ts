import { Body, Controller, Post, Headers, UseGuards, Param, Req, Patch, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileValidator, FileTypeValidator } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import { AuthCreateDto } from "./dtos/auth-create.dto";
import { AuthTokenDTO } from "./dtos/auth-token.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express"
import { writeFile } from "fs/promises"
import { join } from "path"
import { users } from "@prisma/client";

@Controller("auth")
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("login")
    async login(@Body() { email, password }: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post("register")
    async register(@Body() user: AuthCreateDto) {
        return this.authService.register(user)
    }

    @Post("forget")
    async forget(@Body() body : string) {
        return this.authService.forgetPassword(body)
    }

    @Post("change-password")
    async changePassword() {
        return "mudar senha"
    }


    @Post("check-token")
    async checkToken(@Headers("authorization") token: AuthTokenDTO) {

        return this.authService.checkToken(token)
    }

    @UseGuards(AuthGuard)
    @Post("me")
    async testGuards(@User() user: users) {
        return { user };
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("avatar"))
    @Patch("avatar")
    async updateAvatar(@User() user: users,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 1024 * 50 }),
                new FileTypeValidator({ fileType: "image/jpeg" })
            ]
        })) avatar: Express.Multer.File
    ) {

        const avatarName = `${user.email}-${user.id}.png`;
        this.authService.updateAvatar(avatarName, avatar);
        return { message: "sucess", statusCode: 200 }
    }


}