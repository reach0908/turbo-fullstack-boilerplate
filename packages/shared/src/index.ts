import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/entities/user.entity';

export const users = {
	dto: {
		CreateUserDto,
	},
	entities: {
		User,
	},
};

export default {
	users,
};
