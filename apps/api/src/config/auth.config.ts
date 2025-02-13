import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
	discord: {
		clientID: process.env.DISCORD_CLIENT_ID,
		clientSecret: process.env.DISCORD_CLIENT_SECRET,
		callbackURL: process.env.DISCORD_CALLBACK_URL,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		refreshSecret: process.env.JWT_REFRESH_SECRET,
	},
	encryption: {
		key: process.env.ENCRYPTION_KEY,
	},
}));
