/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@workspace/ui'],
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				// eslint-disable-next-line turbo/no-undeclared-env-vars
				destination: `${process.env.API_URL}/:path*`,
			},
		];
	},
};

export default nextConfig;
