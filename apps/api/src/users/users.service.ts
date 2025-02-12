import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service.js';
import * as uuid from 'uuid';

import { CreateUserDto } from '@workspace/shared/users/dto/create-user.dto.js';
import { UserLoginDto } from '@workspace/shared/users/dto/user-login.dto.js';
import type { UserEntity } from '@workspace/shared/users/user.schema.js';

import { UsersRepository } from './users.repository.js';
@Injectable()
export class UsersService {
	constructor(
		private emailService: EmailService,
		private readonly userRepository: UsersRepository,
	) {}

	async getAllUsers(offset: number, limit: number): Promise<UserEntity[]> {
		return [];
	}

	async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const { email } = createUserDto;

		// await this.checkUserExists(email);

		const signupVerifyToken = uuid.v1();

		const user = await this.userRepository.createUser(createUserDto);
		await this.seneUserSignupEmail(email, signupVerifyToken);

		return user;
	}

	async deleteUser(userId: UserEntity['id']): Promise<void> {
		console.log(userId);
	}

	private checkUserExists(email: UserEntity['email']) {
		return false;
	}

	private saveUser(
		name: UserEntity['name'],
		email: UserEntity['email'],
		password: UserEntity['password'],
		signupVerifyToken: string,
	) {
		return;
	}

	private async seneUserSignupEmail(
		email: UserEntity['email'],
		signupVerifyToken: string,
	) {
		await this.emailService.sendUserSignupEmail(email, signupVerifyToken);
	}

	async login(userLoginDto: UserLoginDto) {
		throw new Error('Method not implemented');
	}

	async getUserInfo(userId: UserEntity['id']) {
		throw new Error('Method not implemented');
	}
}
