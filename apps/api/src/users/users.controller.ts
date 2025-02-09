import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseIntPipe,
	Post,
	Query,
} from '@nestjs/common';
import { CreateUserDto } from '@workspace/shared/users/dto/create-user.dto';
import { EmailVerifyDto } from '@workspace/shared/users/dto/email-verify.dto';
import { UserLoginDto } from '@workspace/shared/users/dto/user-login.dto';
import { UserEntity } from '@workspace/shared/users/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async getAllUsers(
		@Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
	): Promise<UserEntity[]> {
		console.log(offset, limit);

		return this.usersService.getAllUsers(offset, limit);
	}

	@Post()
	async createUser(
		@Body() createUserDto: CreateUserDto,
	): Promise<UserEntity> {
		return await this.usersService.createUser(createUserDto);
	}

	@Post('email-verify')
	async emailVerify(
		@Query() emailVerifyDto: EmailVerifyDto,
	): Promise<string> {
		console.log(emailVerifyDto);
		return;
	}

	@Post('login')
	async login(@Body() userLoginDto: UserLoginDto): Promise<void> {
		return await this.usersService.login(userLoginDto);
	}

	@Get(':id')
	async getUserInfo(
		@Param(
			'id',
			new ParseIntPipe({
				errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
			}),
		)
		userId: UserEntity['id'],
	): Promise<void> {
		return this.usersService.getUserInfo(userId);
	}

	@Delete(':id')
	async deleteUser(@Param('id') userId: UserEntity['id']): Promise<void> {
		console.log(userId);
	}
}
