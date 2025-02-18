import { env } from 'process';

if (!env.API_URL) {
	throw new Error('API_URL 환경 변수가 설정되지 않았습니다.');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@workspace/ui'],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.discordapp.com',
				pathname: '/avatars/**',
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${env.API_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
