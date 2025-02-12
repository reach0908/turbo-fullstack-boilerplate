import { Test, TestingModule } from "@nestjs/testing";

import { UsersController } from "#/users/users.controller.js";

describe("UsersController", () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("createUser", () => {
    it("should log createUserDto and return void", async () => {
      const dto = {
        name: "John Doe",
        email: "john@example.com",
        password: "testpassword",
      }; // CreateUserDto 예시 객체
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      await controller.createUser(dto);
      expect(consoleSpy).toHaveBeenCalledWith(dto);
      consoleSpy.mockRestore();
    });
  });

  describe("emailVerify", () => {
    it("should log emailVerifyDto and return undefined", async () => {
      // EmailVerifyDto 타입에 signupVerifyToken 속성이 필요함
      const dto = {
        email: "john@example.com",
        signupVerifyToken: "token123",
      };
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      const result = await controller.emailVerify(dto);
      expect(consoleSpy).toHaveBeenCalledWith(dto);
      expect(result).toBeUndefined(); // 반환값 undefined 확인
      consoleSpy.mockRestore();
    });
  });

  describe("login", () => {
    it("should log userLoginDto and return undefined", async () => {
      // UserLoginDto 타입에 email 속성이 필요함
      const dto = {
        username: "john",
        password: "doe",
        email: "john@example.com",
      };
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      const result = await controller.login(dto);
      expect(consoleSpy).toHaveBeenCalledWith(dto);
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });

  describe("getUserInfo", () => {
    it("should log userId and return undefined", async () => {
      const userId = "1";
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();
      const result = await controller.getUserInfo(userId);
      expect(consoleSpy).toHaveBeenCalledWith(userId);
      expect(result).toBeUndefined();
      consoleSpy.mockRestore();
    });
  });
});
