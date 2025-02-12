import { Module } from "@nestjs/common";

import {
  DrizzleAsyncProvider,
  drizzleProvider,
} from "#/drizzle/drizzle.provider.js";

@Module({
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule {}
