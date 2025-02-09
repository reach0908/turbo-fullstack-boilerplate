import {
	IsEmail,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from 'class-validator';
import { UserEntity } from '../user.schema';

export class CreateUserDto {
	@IsString()
	@MinLength(1)
	@MaxLength(30)
	readonly name: UserEntity['name'];

	@IsString()
	@IsEmail()
	@MaxLength(60)
	readonly email: UserEntity['email'];

	@IsString()
	@Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
	readonly password: UserEntity['password'];
}
