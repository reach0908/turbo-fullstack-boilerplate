import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
dotenv.config({
	path: path.resolve(
		process.env.NODE_ENV === 'production'
			? '.env'
			: '.env.development.local',
	),
});

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	await app.listen(process.env.PORT ?? 3001);
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	console.log(`Server is running on port ${process.env.PORT ?? 3001}`);
}
bootstrap();
