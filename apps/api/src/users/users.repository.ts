import { Inject, Injectable } from '@nestjs/common';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@workspace/shared/drizzle/schema';
import { CreateUserDto } from '@workspace/shared/users/dto/create-user.dto';

@Injectable()
export class UsersRepository {
	constructor(
		@Inject(DrizzleAsyncProvider)
		private db: NodePgDatabase<typeof schema>,
	) {}

	async createUser(createUserDto: CreateUserDto): Promise<schema.UserEntity> {
		const [user] = await this.db
			.insert(schema.users)
			.values(createUserDto)
			.returning();

		return user;
	}
}
