import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { users } from "@prisma/client";
import { Role } from "src/enums/role.enum";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext) {

        const requiredRoles = this.reflector.getAllAndOverride("roles", [context.getHandler(), context.getClass()])

        const request = context.switchToHttp().getRequest();

        const user : users = request.user;

        const allowAcess = requiredRoles.filter(( role: Role ) => role === user.roles);

        return allowAcess.length > 0;
    }
}