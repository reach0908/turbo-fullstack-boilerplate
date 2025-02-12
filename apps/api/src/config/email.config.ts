import { registerAs } from "@nestjs/config";

export const emailConfig = registerAs("email", () => ({
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  service: process.env.EMAIL_SERVICE,
  auth: {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    user: process.env.EMAIL_USER,
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    pass: process.env.EMAIL_PASSWORD,
  },
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  baseUrl: process.env.EMAIL_BASE_URL,
}));
