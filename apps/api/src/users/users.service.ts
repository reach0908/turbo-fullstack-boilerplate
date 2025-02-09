import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@workspace/shared/users/dto/create-user.dto';
import { User } from '@workspace/shared/users/entities/user.entity';
import { EmailService } from '../email/email.service';
import * as uuid from 'uuid';
import { UserLoginDto } from '@workspace/shared/users/dto/user-login.dto';
@Injectable()
export class UsersService {
	constructor(private emailService: EmailService) {}

	async createUser(createUserDto: CreateUserDto): Promise<void> {
		const { name, email, password } = createUserDto;

		// await this.checkUserExists(email);

		const signupVerifyToken = uuid.v1();

		// await this.saveUser(name, email, password, signupVerifyToken);
		await this.seneUserSignupEmail(email, signupVerifyToken);
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

	async login(userLoginDto: UserLoginDto) {
		throw new Error('Method not implemented');
	}

	async getUserInfo(userId: User['id']) {
		throw new Error('Method not implemented');
	}
}
