import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JsonWebTokenMiddleware } from "src/middlewares/json-web-token.middleware";
import { AuthService } from "src/auth/auth.service";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        //consumer.apply(JsonWebTokenMiddleware).forRoutes(
            ////{ path: 'users', method: RequestMethod.ALL },
            ////{ path: 'users/:id', method: RequestMethod.ALL }
        //)
    }
}