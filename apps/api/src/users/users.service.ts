import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@workspace/shared/users/dto/create-user.dto';
import { User } from '@workspace/shared/users/entities/user.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
	constructor(private readonly emailService: EmailService) {}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const { name, email, password } = createUserDto;

		await this.checkUserExists(email);

		return {
			id: 1,
			name: createUserDto.name,
			email: createUserDto.email,
			password: createUserDto.password,
		};
	}

	async deleteUser(userId: User['id']): Promise<void> {
		console.log(userId);
	}

	private checkUserExists(email: User['email']) {
		return false;
	}

	private saveUser(
		name: User['name'],
		email: User['email'],
		password: User['password'],
		signupVerifyToken: string,
	) {
		return;
	}

	private async seneUserSignupEmail(
		email: User['email'],
		signupVerifyToken: string,
	) {
		await this.emailService.sendUserSignupEmail(email, signupVerifyToken);
	}
}
