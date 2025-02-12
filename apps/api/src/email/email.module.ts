import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { EmailService } from "#/email/email.service.js";
@Module({
  providers: [EmailService, ConfigService],
  exports: [EmailService],
})
export class EmailModule {}
