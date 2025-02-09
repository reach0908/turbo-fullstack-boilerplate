import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	out: './src/drizzle/migrations',
	dbCredentials: {
		// eslint-disable-next-line turbo/no-undeclared-env-vars
		url: process.env.DATABASE_URL,
	},
	schema: '@workspace/shared',
});
