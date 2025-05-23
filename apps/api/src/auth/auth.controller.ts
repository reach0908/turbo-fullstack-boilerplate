import {
	Controller,
	Get,
	HttpStatus,
	Req,
	Res,
	UseGuards,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { DiscordOAuthRequest } from './interface/oauth.type';
import { ConfigService } from '@nestjs/config';
import { RequestWithCookies } from './interface/request.type';

@Controller('auth')
export class AuthController {
	private readonly logger = new Logger(AuthController.name);
	constructor(
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
	) {}

	/**
	 * Discord OAuth 로그인 시작점
	 */
	@Get('discord')
	@UseGuards(AuthGuard('discord'))
	handleDiscordLogin() {
		// Guard가 Discord OAuth 페이지로 리다이렉트
		return;
	}

	/**
	 * Discord OAuth 콜백 처리
	 */
	@Get('discord/callback')
	@UseGuards(AuthGuard('discord'))
	handleDiscordCallback(
		@Req() req: DiscordOAuthRequest,
		@Res() res: Response,
	) {
		try {
			const user = req.user;
			const frontendUrl =
				this.configService.get<string>('app.frontendUrl');

			this.logger.debug('Discord callback received:', {
				user,
				frontendUrl,
			});

			const { accessToken, refreshToken } =
				this.authService.generateTokens(user);

			// 액세스 토큰 설정
			res.cookie('access_token', accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 15 * 60 * 1000, // 15분
			});

			// 리프레시 토큰 설정
			res.cookie('refresh_token', refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
				path: '/api/auth/refresh',
			});

			const redirectUrl = frontendUrl || 'http://localhost:3000';
			this.logger.debug('Redirecting to frontend:', { redirectUrl });

			return res.redirect(redirectUrl);
		} catch (error) {
			this.logger.error('Discord OAuth 로그인 실패:', error);
			const frontendUrl =
				this.configService.get<string>('app.frontendUrl') ||
				'http://localhost:3000';
			return res
				.status(HttpStatus.UNAUTHORIZED)
				.redirect(`${frontendUrl}/error`);
		}
	}

	/**
	 * 토큰 갱신 엔드포인트
	 */
	@Get('refresh')
	async refreshTokens(@Req() req: RequestWithCookies, @Res() res: Response) {
		try {
			const refreshToken = req.cookies.refresh_token;
			if (!refreshToken) {
				throw new UnauthorizedException('리프레시 토큰이 없습니다.');
			}

			const tokens = await this.authService.refreshTokens(refreshToken);
			if (!tokens) {
				throw new UnauthorizedException(
					'유효하지 않은 리프레시 토큰입니다.',
				);
			}

			// 새로운 액세스 토큰 설정
			res.cookie('access_token', tokens.accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 15 * 60 * 1000, // 15분
			});

			// 새로운 리프레시 토큰 설정
			res.cookie('refresh_token', tokens.refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
				path: '/api/auth/refresh',
			});

			return res.json({ success: true });
		} catch (error) {
			if (error instanceof UnauthorizedException) {
				return res.status(HttpStatus.UNAUTHORIZED).json({
					success: false,
					message: error.message,
				});
			}

			this.logger.error('토큰 갱신 실패:', error);
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: '토큰 갱신에 실패했습니다.',
			});
		}
	}

	/**
	 * 로그아웃
	 */
	@Get('logout')
	logout(@Res() res: Response) {
		// 모든 인증 쿠키 제거
		res.clearCookie('access_token');
		res.clearCookie('refresh_token', { path: '/api/auth/refresh' });

		const frontendUrl =
			this.configService.get<string>('app.frontendUrl') ||
			'http://localhost:3000';
		return res.redirect(frontendUrl);
	}
}
