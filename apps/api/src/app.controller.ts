import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service.js";

/**
 * 컨트롤러는 들어오는 요청을 처리하고 클라이언트에게 응답을 다시 보내는 역할을 담당
 * 클래스와 데코레이터를 사용
 * 데코레이터는 클래스를 필요한 메타데이터와 연결하여 Nest가 요청을 해당 컨트롤러에 연결하는 라우팅 맵을 만들 수 있도록 한다.
 */

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return process.env.NEST_PORT || "3000";
  }
}
