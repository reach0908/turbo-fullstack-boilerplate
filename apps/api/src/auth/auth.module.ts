import { DatabaseModule } from '#/database/database.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EncryptionUtil } from '#/utils/encryption.util';
import { UsersModule } from '#/users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { DiscordStrategy } from './strategies/discord.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		DatabaseModule,
		UsersModule,
		PassportModule.register({ defaultStrategy: 'discord' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.getOrThrow('auth.jwt.secret'),
				signOptions: {
					expiresIn: '15m', // 액세스 토큰 15분
				},
			}),
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, EncryptionUtil, DiscordStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
