import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from 'src/email/email.module';
import { UsersRepository } from './users.repository';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	imports: [EmailModule, DrizzleModule],
})
export class UsersModule {}
