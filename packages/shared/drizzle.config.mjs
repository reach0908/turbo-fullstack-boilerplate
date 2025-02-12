import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const currentFile = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFile);
// .env.development.local 파일을 currentDir 기준으로 로드합니다. override: true 옵션 추가
config({ path: join(currentDir, '.env.development.local'), override: true });

console.log('Using DATABASE_URL:', process.env.DATABASE_URL);

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'postgresql',
	out: './src/drizzle/migrations',
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
	schema: './src/drizzle/schema.ts',
});
