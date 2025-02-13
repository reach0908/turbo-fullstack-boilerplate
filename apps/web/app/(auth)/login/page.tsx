import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login to your account',
};

export default function LoginPage() {
	return (
		<div className="space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-bold">Welcome back</h1>
				<p className="text-gray-500">
					Enter your credentials to access your account
				</p>
			</div>
			<div className="space-y-4">
				<button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#5865F2] px-4 py-2 text-white hover:bg-[#4752C4] transition-colors">
					Continue with Discord
				</button>
			</div>
		</div>
	);
}
