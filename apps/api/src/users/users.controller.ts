import {
	Controller,
	Get,
	Post,
	Req,
	HttpCode,
	Header,
	Query,
	Redirect,
	Param,
	Body,
} from '@nestjs/common';
import type { Request } from 'express';
import type { CreateUserDto } from '@workspace/shared/users/dto/create-user.dto';

// 컨트롤러 접두사
@Controller('users')
export class UserController {
	// 메서드 데코레이터
	@Get()
	// 메서드 이름에는 특별한 의미를 부여하지 않는다.
	async findAll(@Req() reqeust: Request): Promise<string[]> {
		/**
		 * 그냥 문자열을 반환하는 경우에는 응답과 함께 200 상태 코드를 반환
		 * 값만 반환하면 Nest가 나머지를 처리함
		 * 기본 요청은 200, POST 요청은 201 상태 코드를 반환
		 * 핸들러 수준에서 이 동작을 쉽게 변경할 수 있음 (@HttpCode())
		 */
		return [];
	}

	@Post()
	@Header('cache-control', 'none')
	@HttpCode(204)
	create(@Body() createUserDto: CreateUserDto): string {
		return 'This action adds a new user';
	}

	// 리디렉션 예제
	@Get('docs')
	@Redirect('https://nestjs.com', 302)
	getDocs(@Query('version') version: string) {
		if (version && version === '5') {
			return { url: 'https://docs.nestjs.com/v5/' };
		}
	}

	@Get(':id')
	// 파라미터 메서드 매개변수를 데코레이트하는 데코레이터
	findOne(@Param('id') id: string): string {
		return `This action returns a #${id} user`;
	}
}
