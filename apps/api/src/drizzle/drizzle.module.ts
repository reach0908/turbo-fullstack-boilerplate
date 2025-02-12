import { Module } from "@nestjs/common";
import { DrizzleAsyncProvider, drizzleProvider } from "./drizzle.provider.js";

@Module({
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule {}
