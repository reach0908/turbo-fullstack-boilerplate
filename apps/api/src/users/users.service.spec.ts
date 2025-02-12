import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "@workspace/api/users/dto/create-user.dto.js";
import { UserLoginDto } from "@workspace/api/users/dto/user-login.dto.js";
import { UserEntity } from "@workspace/api/users/user.schema.js";

import { EmailService } from "#/email/email.service.js";
import { UsersRepository } from "#/users/users.repository.js";
import { UsersService } from "#/users/users.service.js";

describe("UsersService", () => {
  let service: UsersService;
  let emailService: EmailService;
  let usersRepository: UsersRepository;

  const mockEmailService = {
    sendUserSignupEmail: jest.fn(),
  };

  const mockUsersRepository = {
    createUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    emailService = module.get<EmailService>(EmailService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createUser", () => {
    it("should create a user and send verification email", async () => {
      const createUserDto: CreateUserDto = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      };

      const mockUser: UserEntity = {
        id: 1,
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      };

      mockUsersRepository.createUser.mockResolvedValue(mockUser);
      mockEmailService.sendUserSignupEmail.mockResolvedValue(undefined);

      const result = await service.createUser(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUsersRepository.createUser).toHaveBeenCalledWith(
        createUserDto,
      );
      expect(mockEmailService.sendUserSignupEmail).toHaveBeenCalled();
    });
  });

  describe("getAllUsers", () => {
    it("should return an array of users", async () => {
      const result = await service.getAllUsers(0, 10);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("login", () => {
    it("should throw error for unimplemented method", async () => {
      const loginDto: UserLoginDto = {
        email: "test@example.com",
        password: "password123",
      };

      await expect(service.login(loginDto)).rejects.toThrow(
        "Method not implemented",
      );
    });
  });

  describe("getUserInfo", () => {
    it("should throw error for unimplemented method", async () => {
      await expect(service.getUserInfo(1)).rejects.toThrow(
        "Method not implemented",
      );
    });
  });

  describe("deleteUser", () => {
    it("should log the user id", async () => {
      const spy = jest.spyOn(console, "log").mockImplementation();
      const userId = 123;
      await service.deleteUser(userId);
      expect(spy).toHaveBeenCalledWith(userId);
      spy.mockRestore();
    });
  });
});
