import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { appConfig } from './config/app.config';
import { authConfig } from './config/auth.config';
import { AuthModule } from './auth/auth.module';
@Module({
	imports: [
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			load: [databaseConfig, appConfig, authConfig],
		}),
		UsersModule,
		DatabaseModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
