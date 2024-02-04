import { MiddlewareConsumer, Module, NestModule,forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        PrismaModule,
        forwardRef(() => UserModule),
        forwardRef(() => AuthModule),
    ],
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