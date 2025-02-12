import { Inject, Injectable } from "@nestjs/common";
import { DrizzleAsyncProvider } from "#/drizzle/drizzle.provider.js";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "@workspace/api/drizzle/schema.js";
import { CreateUserDto } from "@workspace/api/users/dto/create-user.dto.js";
import {
  UserEntity,
  users as usersSchema,
} from "@workspace/api/users/user.schema.js";

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const [user] = await this.db
      .insert(usersSchema)
      .values(createUserDto)
      .returning();

    return user;
  }
}
