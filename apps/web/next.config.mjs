/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";

/**
 * ESM에서 __filename, __dirname 대신 import.meta.url 사용
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@workspace/ui": path.resolve(__dirname, "../../packages/ui/src"),
    };
    return config;
  },
};

export default nextConfig;
