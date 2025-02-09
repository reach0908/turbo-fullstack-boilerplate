import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailModule } from 'src/email/email.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [EmailModule],
})
export class UsersModule {}
