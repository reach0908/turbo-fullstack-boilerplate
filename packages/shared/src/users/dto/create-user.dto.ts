import { User } from '@workspace/shared/users/entities/user.entity';

export class CreateUserDto {
	id: User['id'];
	name: User['name'];
	email: User['email'];
}
