import { Inject, Injectable } from '@nestjs/common';
import { DatabaseAsyncProvider } from 'src/database/database.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
	UserEntity,
	NewUserEntity,
	users,
} from 'src/database/schemas/users.schema';
import * as schema from 'src/database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
	constructor(
		@Inject(DatabaseAsyncProvider)
		private readonly db: NodePgDatabase<typeof schema>,
	) {}

	async findById(id: number): Promise<UserEntity | null> {
		const result = await this.db
			.select()
			.from(users)
			.where(eq(users.id, id));

		return result[0] || null;
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		const result = await this.db
			.select()
			.from(users)
			.where(eq(users.email, email));

		return result[0] || null;
	}

	createUser(userInfo: NewUserEntity): Promise<UserEntity> {
		const user = this.db
			.insert(users)
			.values(userInfo)
			.returning()
			.then((rows) => rows[0]);

		return user;
	}

	updateUser(userInfo: Partial<UserEntity>): Promise<UserEntity> {
		if (!userInfo.id) {
			throw new Error('User ID is required');
		}

		const user = this.db
			.update(users)
			.set(userInfo)
			.where(eq(users.id, userInfo.id))
			.returning()
			.then((rows) => rows[0]);

		return user;
	}
}
