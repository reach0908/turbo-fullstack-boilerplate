import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { OAuthProvider, UserEntity } from '#/database/schema';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
	private readonly logger = new Logger(DiscordStrategy.name);

	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
	) {
		const clientID = configService.getOrThrow<string>(
			'auth.discord.clientID',
		);
		const clientSecret = configService.getOrThrow<string>(
			'auth.discord.clientSecret',
		);
		const callbackURL = configService.getOrThrow<string>(
			'auth.discord.callbackURL',
		);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		super({
			clientID: clientID,
			clientSecret: clientSecret,
			callbackURL: callbackURL,
			scope: ['identify', 'email'],
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
	): Promise<UserEntity> {
		try {
			// 디스코드로부터 데이터를 받아온다.
			const {
				id: discordId,
				email,
				username,
				avatar,
			} = profile as {
				id: string;
				email: string;
				username: string;
				avatar: string;
			};

			// OAuth 로그인 검증 및 계정 연동
			const { user } = await this.authService.validateOAuthLogin({
				providerId: discordId,
				provider: OAuthProvider.DISCORD,
				email,
				username,
				avatar,
				accessToken,
				refreshToken,
				// Discord 토큰은 7일 후 만료
				tokenExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			});

			return user;
		} catch (err) {
			this.logger.error('Discord 인증 실패:', err);
			throw new UnauthorizedException('Discord 인증에 실패했습니다.');
		}
	}
}
