import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt"

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";

@Module({
    imports : [JwtModule.register({
        secret : "l3^6gigCc`$c^ge}LEB:<Is5D^(m)!wL"
    }),
    PrismaModule,
    UserModule
],
    providers : [AuthService, UserService],
    controllers : [AuthController]
})
export class AuthModule {}