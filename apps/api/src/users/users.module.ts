import { Module } from "@nestjs/common";

import { DrizzleModule } from "#/drizzle/drizzle.module.js";
import { EmailModule } from "#/email/email.module.js";
import { UsersController } from "#/users/users.controller.js";
import { UsersRepository } from "#/users/users.repository.js";
import { UsersService } from "#/users/users.service.js";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [EmailModule, DrizzleModule],
})
export class UsersModule {}
