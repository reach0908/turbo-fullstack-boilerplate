import { UserEntity } from '../user.schema.js';

export class UserLoginDto {
	email!: UserEntity['email'];
	password!: UserEntity['password'];
}
