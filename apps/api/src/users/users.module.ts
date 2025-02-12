import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { EmailModule } from '../email/email.module.js';
import { UsersRepository } from './users.repository.js';
import { DrizzleModule } from '../drizzle/drizzle.module.js';

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	imports: [EmailModule, DrizzleModule],
})
export class UsersModule {}
