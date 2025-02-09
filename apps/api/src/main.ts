import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
	path: path.resolve(
		process.env.NODE_ENV === 'production'
			? '.env'
			: '.env.development.local',
	),
});

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.listen(process.env.NEST_PORT ?? 3001);
}
bootstrap();
