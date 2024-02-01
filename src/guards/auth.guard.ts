import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private readonly authService : AuthService,
        private readonly userService : UserService
        ){}

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();

        const { authorization } = request.headers;

        const { sub : id} = this.authService.checkToken(authorization);

        const user = await this.userService.findById(Number(id));

        request.user = user;

        return true
    }
}

//estamos verificando se na requsição tem um json web token para decidir se o usuario vai poder seguir seu caminho ate o endpoint