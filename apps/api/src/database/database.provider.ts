import { ConfigService } from '@nestjs/config';
import * as schema from './schema';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Provider } from '@nestjs/common';

export const DatabaseAsyncProvider = 'DatabaseAsyncProvider';

export const databaseProvider: Provider[] = [
	{
		provide: DatabaseAsyncProvider,
		inject: [ConfigService],
		useFactory: async (configService: ConfigService) => {
			const connectionString = configService.get<string>('database.url');
			if (!connectionString) {
				throw new Error(
					'DATABASE_URL is not defined in environment variables',
				);
			}

			const pool = new Pool({ connectionString });

			try {
				await pool.connect();
				return drizzle(pool, { schema }) as NodePgDatabase<
					typeof schema
				>;
			} catch (error: unknown) {
				throw new Error(
					`Failed to connect to database: ${error instanceof Error ? error.message : 'Unknown error'}`,
				);
			}
		},
	},
];
