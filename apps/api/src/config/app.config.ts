import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
	host: process.env.HOST || 'localhost',
	port: process.env.PORT || 8080,
	frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
}));
