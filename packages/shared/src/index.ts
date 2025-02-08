import { CreateUserDto } from '@workspace/shared/users/dto/create-user.dto';
import { User } from '@workspace/shared/users/entities/user.entity';

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
