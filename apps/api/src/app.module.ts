import { Module } from "@nestjs/common";
import { AppController } from "#/app.controller.js";
import { AppService } from "#/app.service.js";
import { UsersModule } from "#/users/users.module.js";
import { ConfigModule } from "@nestjs/config";
import { emailConfig } from "#/config/email.config.js";
import { validationSchema } from "#/config/validationSchema.js";
import { DrizzleModule } from "#/drizzle/drizzle.module.js";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === "production"
          ? ".env"
          : ".env.development.local",
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
    UsersModule,
    DrizzleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
