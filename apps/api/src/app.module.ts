import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { emailConfig } from './config/email.config';
import { validationSchema } from './config/validationSchema';
import { DrizzleModule } from './drizzle/drizzle.module';
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath:
				process.env.NODE_ENV === 'production'
					? '.env'
					: '.env.development.local',
			load: [emailConfig],
			isGlobal: true,
			validationSchema,
		}),
		UsersModule,
		DrizzleModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
