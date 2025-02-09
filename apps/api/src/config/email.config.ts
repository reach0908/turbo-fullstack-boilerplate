import { registerAs } from '@nestjs/config';

export const emailConfig = registerAs('email', () => ({
	service: process.env.EMAIL_SERVICE,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
	baseUrl: process.env.EMAIL_BASE_URL,
}));
