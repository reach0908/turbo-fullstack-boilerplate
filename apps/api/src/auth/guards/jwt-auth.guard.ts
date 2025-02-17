import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/database/schemas/users.schema';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	handleRequest<TUser = UserEntity>(err: Error | null, user: TUser): TUser {
		if (err || !user) {
			throw new UnauthorizedException('인증이 필요합니다.');
		}
		return user;
	}
}
