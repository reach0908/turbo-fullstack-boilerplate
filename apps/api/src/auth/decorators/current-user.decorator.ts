import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/database/schemas/users.schema';
import { Request } from 'express';

interface RequestWithUser extends Request {
	user: UserEntity;
}

export const CurrentUser = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): UserEntity => {
		const request = ctx.switchToHttp().getRequest<RequestWithUser>();
		return request.user;
	},
);
