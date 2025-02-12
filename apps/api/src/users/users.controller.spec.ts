import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDto } from "@workspace/api/users/dto/create-user.dto.js";
import { EmailVerifyDto } from "@workspace/api/users/dto/email-verify.dto.js";
import { UserLoginDto } from "@workspace/api/users/dto/user-login.dto.js";
import { UserEntity } from "@workspace/api/users/user.schema.js";

import { UsersController } from "#/users/users.controller.js";
import { UsersService } from "#/users/users.service.js";

describe("UsersController", () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    getAllUsers: jest.fn(),
    createUser: jest.fn(),
    login: jest.fn(),
    getUserInfo: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAllUsers", () => {
    it("should return an array of users", async () => {
      const mockUsers: UserEntity[] = [
        {
          id: 1,
          name: "Test User",
          email: "test@example.com",
          password: "password123",
        },
      ];

      mockUsersService.getAllUsers.mockResolvedValue(mockUsers);

      const result = await controller.getAllUsers(0, 10);

      expect(result).toEqual(mockUsers);
      expect(mockUsersService.getAllUsers).toHaveBeenCalledWith(0, 10);
    });
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

      mockUsersService.createUser.mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe("emailVerify", () => {
    it("should verify email", async () => {
      const emailVerifyDto: EmailVerifyDto = {
        signupVerifyToken: "test-token",
      };

      const result = await controller.emailVerify(emailVerifyDto);

      expect(result).toBe(emailVerifyDto.signupVerifyToken);
    });
  });

  describe("login", () => {
    it("should login user", async () => {
      const loginDto: UserLoginDto = {
        email: "test@example.com",
        password: "password123",
      };

      mockUsersService.login.mockResolvedValue(undefined);

      await controller.login(loginDto);

      expect(mockUsersService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe("getUserInfo", () => {
    it("should get user info", async () => {
      const userId = 1;

      mockUsersService.getUserInfo.mockResolvedValue(undefined);

      await controller.getUserInfo(userId);

      expect(mockUsersService.getUserInfo).toHaveBeenCalledWith(userId);
    });
  });

  describe("deleteUser", () => {
    it("should delete user", async () => {
      const userId = 1;

      await controller.deleteUser(userId);

      expect(mockUsersService.deleteUser).toHaveBeenCalledWith(userId);
    });
  });
});
