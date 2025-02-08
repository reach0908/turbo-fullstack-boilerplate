import { CreateUserDto } from './users/dto/create-user.dto';
import { EmailVerifyDto } from './users/dto/email-verify.dto';
import { UserLoginDto } from './users/dto/user-login.dto';
import { User } from './users/entities/user.entity';

export const users = {
	dto: {
		CreateUserDto,
		EmailVerifyDto,
		UserLoginDto,
	},
	entities: {
		User,
	},
};

export default {
	users,
};
