import { User } from '../entities/user.entity';

export class CreateUserDto {
	id: User['id'];
	name: User['name'];
	email: User['email'];
}
