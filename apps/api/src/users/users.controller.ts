import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserEntity } from 'src/database/schemas/users.schema';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	getCurrentUser(@CurrentUser() user: UserEntity) {
		return user;
	}
}
