import { User } from '../entities/user.entity';

export class UserLoginDto {
	email: User['email'];
	password: User['password'];
}
