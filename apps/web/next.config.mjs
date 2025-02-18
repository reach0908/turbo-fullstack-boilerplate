import { env } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@workspace/ui'],
	async rewrites() {
		console.log(env.API_URL);
		return [
			{
				source: '/api/:path*',
				destination: `${env.API_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
