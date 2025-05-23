import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.use(cookieParser());

	const configService = app.get(ConfigService);
	const port = configService.get<number>('app.port') || 3000;

	app.enableCors({
		origin: true,
		credentials: true,
	});

	await app.listen(port);

	console.log(`Server is running on port ${port}`);
}

void bootstrap().catch((error) => {
	console.error('Failed to start application:', error);
	process.exit(1);
});
