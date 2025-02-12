import { UserEntity } from '../user.schema';

export class UserLoginDto {
	email!: UserEntity['email'];
	password!: UserEntity['password'];
}
