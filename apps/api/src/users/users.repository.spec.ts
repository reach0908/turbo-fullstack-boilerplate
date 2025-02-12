import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "@workspace/api/users/dto/create-user.dto.js";
import { UserEntity } from "@workspace/api/users/user.schema.js";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DrizzleAsyncProvider } from "#/drizzle/drizzle.provider.js";
import { UsersRepository } from "#/users/users.repository.js";

describe("UsersRepository", () => {
  let repository: UsersRepository;
  let db: NodePgDatabase<any>;

  const mockDb = {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: DrizzleAsyncProvider,
          useValue: mockDb,
        },
      ],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
    db = module.get<NodePgDatabase<any>>(DrizzleAsyncProvider);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });

  describe("createUser", () => {
    it("should create a user", async () => {
      const createUserDto: CreateUserDto = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      };

      const mockUser: UserEntity = {
        id: 1,
        ...createUserDto,
      };

      mockDb.returning.mockResolvedValue([mockUser]);

      const result = await repository.createUser(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.values).toHaveBeenCalledWith(createUserDto);
      expect(mockDb.returning).toHaveBeenCalled();
    });
  });
});
