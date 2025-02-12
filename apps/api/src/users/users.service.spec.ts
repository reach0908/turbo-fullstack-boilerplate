import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service.js";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
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
