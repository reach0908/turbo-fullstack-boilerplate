import { DatabaseModule } from '#/database/database.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EncryptionUtil } from '#/utils/encryption.util';
import { UsersModule } from '#/users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { DiscordStrategy } from './strategies/discord.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		DatabaseModule,
		UsersModule,
		PassportModule.register({ defaultStrategy: 'discord' }),
		JwtModule.register({}),
	],
	controllers: [AuthController],
	providers: [AuthService, EncryptionUtil, DiscordStrategy],
	exports: [AuthService],
})
export class AuthModule {}
