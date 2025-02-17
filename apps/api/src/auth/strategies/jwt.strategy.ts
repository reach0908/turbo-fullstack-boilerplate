import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { RequestWithCookies } from '../interface/request.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly usersService: UsersService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: RequestWithCookies): string | null => {
					return request.cookies.access_token ?? null;
				},
			]),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow('auth.jwt.secret'),
		});
	}

	async validate(payload: { sub: number }) {
		const user = await this.usersService.findById(payload.sub);
		if (!user) {
			return null;
		}
		return user;
	}
}
