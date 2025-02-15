'use client';

import { Button } from '@workspace/ui/components/button';

export default function LoginPage() {
	const handleDiscordLogin = () => {
		window.location.href = 'http://localhost:3001/auth/discord';
	};

	return (
		<div className="space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-bold">Welcome back</h1>
				<p className="text-gray-500">
					Enter your credentials to access your account
				</p>
			</div>
			<div className="space-y-4">
				<Button
					variant="default"
					onClick={handleDiscordLogin}
					className="w-full"
				>
					Continue with Discord
				</Button>
			</div>
		</div>
	);
}
