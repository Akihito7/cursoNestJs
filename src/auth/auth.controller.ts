import { Body, Controller, Post, Headers, UseGuards, Param, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./dtos/auth-login.dto";
import { AuthCreateDto } from "./dtos/auth-create.dto";
import { AuthTokenDTO } from "./dtos/auth-token.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";

@Controller("auth")
export class AuthController {

    constructor(private readonly authService : AuthService){}

    @Post("login")
    async login(@Body() {email, password} : AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post("register")
    async register(@Body() user : AuthCreateDto){
        return this.authService.register(user)
    }

    @Post("forget")
    async forget(){
        return "esqueci minha senha"
    }

    @Post("change-password")
    async changePassword() {
        return "mudar senha"
    }

    
    @Post("check-token")
    async checkToken(@Headers("authorization") token : AuthTokenDTO){
   
        return this.authService.checkToken(token)
    }

    @UseGuards(AuthGuard)
    @Post("me")
    async testGuards(@User() user){
        return {user};
    }


}