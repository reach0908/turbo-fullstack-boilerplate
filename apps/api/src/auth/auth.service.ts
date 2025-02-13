import { DatabaseAsyncProvider } from '#/database/database.provider';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'src/database/schema';
import {
	NewOAuthAccountEntity,
	OAuthAccountEntity,
	oauthAccounts,
} from 'src/database/schemas/oauth.schema';
import { EncryptionUtil } from 'src/utils/encryption.util';
import { eq, and } from 'drizzle-orm';
import { UsersService } from '../users/users.service';
import { UserEntity } from 'src/database/schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface TokenPayload {
	sub: number;
	email: string;
	username: string;
}

interface Tokens {
	accessToken: string;
	refreshToken: string;
}

@Injectable()
export class AuthService {
	constructor(
		@Inject(DatabaseAsyncProvider)
		private readonly db: NodePgDatabase<typeof schema>,
		private readonly encryptionUtil: EncryptionUtil,
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async validateOAuthLogin(params: {
		providerId: string;
		provider: string;
		email: string;
		username: string;
		avatar?: string;
		accessToken: string;
		refreshToken?: string;
		tokenExpiresAt?: Date;
	}): Promise<{ user: UserEntity; oauthAccount: OAuthAccountEntity }> {
		// OAuth 계정 먼저 찾기
		const existingOAuth = await this.findByProviderId(
			params.providerId,
			params.provider,
		);

		let user: UserEntity;
		let oauthAccount: OAuthAccountEntity;

		if (existingOAuth) {
			// 기존 OAuth 계정이 있는 경우
			const foundUser = await this.usersService.findById(
				existingOAuth.userId,
			);
			if (!foundUser) {
				throw new Error('User not found');
			}
			user = foundUser;

			// OAuth 토큰 정보 업데이트
			oauthAccount = await this.updateOAuthAccount(existingOAuth.id, {
				accessToken: params.accessToken,
				refreshToken: params.refreshToken,
				tokenExpiresAt: params.tokenExpiresAt,
			});
		} else {
			// 새로운 사용자 생성
			user = await this.usersService.createUser({
				username: params.username,
				email: params.email,
				avatar: params.avatar,
			});

			// OAuth 계정 생성
			oauthAccount = await this.createOAuthAccount({
				userId: user.id,
				provider: params.provider,
				providerId: params.providerId,
				accessToken: params.accessToken,
				refreshToken: params.refreshToken,
				tokenExpiresAt: params.tokenExpiresAt,
			});
		}

		return { user, oauthAccount };
	}

	private async updateOAuthAccount(
		id: number,
		data: Partial<NewOAuthAccountEntity>,
	): Promise<OAuthAccountEntity> {
		const updatedAccount = await this.db
			.update(oauthAccounts)
			.set({
				accessToken: data.accessToken
					? this.encryptionUtil.encrypt(data.accessToken)
					: null,
				refreshToken: data.refreshToken
					? this.encryptionUtil.encrypt(data.refreshToken)
					: null,
				tokenExpiresAt: data.tokenExpiresAt,
			})
			.where(eq(oauthAccounts.id, id))
			.returning();

		return this.decryptSensitiveData(updatedAccount[0]);
	}

	async findByProviderId(providerId: string, provider: string) {
		const account = await this.db
			.select()
			.from(oauthAccounts)
			.where(
				and(
					eq(oauthAccounts.providerId, providerId),
					eq(oauthAccounts.provider, provider),
				),
			);

		return account[0];
	}

	async createOAuthAccount(accountInfo: NewOAuthAccountEntity) {
		const encryptedAccount = this.encryptSensitiveData(accountInfo);

		const account = await this.db
			.insert(oauthAccounts)
			.values(encryptedAccount)
			.returning();

		return this.decryptSensitiveData(account[0]);
	}

	private encryptSensitiveData(
		account: NewOAuthAccountEntity,
	): NewOAuthAccountEntity {
		return {
			...account,
			accessToken: account.accessToken
				? this.encryptionUtil.encrypt(account.accessToken)
				: null,
			refreshToken: account.refreshToken
				? this.encryptionUtil.encrypt(account.refreshToken)
				: null,
		};
	}

	private decryptSensitiveData<
		T extends {
			accessToken?: string | null;
			refreshToken?: string | null;
			profile?: string | null;
		},
	>(account: T): T {
		return {
			...account,
			accessToken: account.accessToken
				? this.encryptionUtil.decrypt(account.accessToken)
				: null,
			refreshToken: account.refreshToken
				? this.encryptionUtil.decrypt(account.refreshToken)
				: null,
		};
	}

	async cleanupExpiredTokens() {
		const now = new Date();
		await this.db
			.delete(oauthAccounts)
			.where(eq(oauthAccounts.tokenExpiresAt, now));
	}

	generateTokens(user: UserEntity): Tokens {
		const payload: TokenPayload = {
			sub: user.id,
			email: user.email,
			username: user.username,
		};

		const [accessToken, refreshToken] = [
			this.generateAccessToken(payload),
			this.generateRefreshToken(payload),
		];

		return {
			accessToken,
			refreshToken,
		};
	}

	private generateAccessToken(payload: TokenPayload): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.getOrThrow('auth.jwt.secret'),
			expiresIn: '15m', // 액세스 토큰은 15분
		});
	}

	private generateRefreshToken(payload: TokenPayload): string {
		return this.jwtService.sign(payload, {
			secret: this.configService.getOrThrow('auth.jwt.refreshSecret'),
			expiresIn: '7d', // 리프레시 토큰은 7일
		});
	}

	async refreshTokens(refreshToken: string): Promise<Tokens | null> {
		try {
			const payload = this.jwtService.verify<TokenPayload>(refreshToken, {
				secret: this.configService.getOrThrow('auth.jwt.refreshSecret'),
			});

			const user = await this.usersService.findById(payload.sub);
			if (!user) {
				return null;
			}

			return this.generateTokens(user);
		} catch {
			return null;
		}
	}
}
