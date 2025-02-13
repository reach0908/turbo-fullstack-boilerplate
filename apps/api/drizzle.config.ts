import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const databaseUrl = process.env.DATABASE_URL as string;

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/database/schema.ts',
	out: './drizzle/migrations',
	dbCredentials: {
		url: databaseUrl,
	},
	verbose: true,
	strict: true,
});
