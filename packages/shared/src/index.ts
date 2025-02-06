import { CreateUserDto } from './users/dtos/create-user.dto';
import { User } from './users/entities/user.entity';

export const users = {
	dto: {
		CreateUserDto,
	},
	entities: {
		User,
	},
};
