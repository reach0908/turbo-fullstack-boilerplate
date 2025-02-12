import { ConfigService } from "@nestjs/config";
import * as schema from "@workspace/api/drizzle/schema.js";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";

export const DrizzleAsyncProvider = "DrizzleAsyncProvider";

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const connectionString = configService.get<string>("DATABASE_URL");
      const pool = new pg.Pool({ connectionString });
      return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
    },
  },
];
