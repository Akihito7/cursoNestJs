import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler"
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from "@nestjs-modules/mailer"
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter"
import { join } from 'path';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 20,
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),

    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: "tyson.moen64@ethereal.email",
          pass: "rB2c8QcJuHj8M1g9PZ",
        },
      },
      defaults: {
        from: '"api_nestjs" <amiya.willms83@ethereal.email>',
      },
      template: {
        dir: join(__dirname, "templates"),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),

  ],


  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
