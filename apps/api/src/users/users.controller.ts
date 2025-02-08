import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
} from '@nestjs/common';
import { CreateUserDto } from '@workspace/shared/users/dto/create-user.dto';
import { EmailVerifyDto } from '@workspace/shared/users/dto/email-verify.dto';
import { UserLoginDto } from '@workspace/shared/users/dto/user-login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
		await this.usersService.createUser(createUserDto);
		console.log('완료');
	}

	@Post('email-verify')
	async emailVerify(
		@Query() emailVerifyDto: EmailVerifyDto,
	): Promise<string> {
		console.log(emailVerifyDto);
		return;
	}

	@Post('login')
	async login(@Body() userLoginDto: UserLoginDto): Promise<string> {
		console.log(userLoginDto);
		return;
	}

	@Get(':id')
	async getUserInfo(@Param('id') userId: string): Promise<string> {
		console.log(userId);
		return;
	}

	@Delete(':id')
	async deleteUser(@Param('id') userId: string): Promise<void> {
		console.log(userId);
	}
}
