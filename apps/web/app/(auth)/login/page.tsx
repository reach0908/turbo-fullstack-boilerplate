'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import { useAuth } from '@/lib/auth/hooks/use-auth';

export default function LoginPage() {
	const { login } = useAuth();
	const searchParams = useSearchParams();
	const error = searchParams.get('error');

	return (
		<div className="space-y-6">
			<div className="space-y-2 text-center">
				<h1 className="text-3xl font-bold">Welcome back</h1>
				<p className="text-gray-500">
					Enter your credentials to access your account
				</p>
				{error && (
					<p className="text-sm text-red-500" role="alert">
						{error}
					</p>
				)}
			</div>
			<div className="space-y-4">
				<Button
					variant="default"
					onClick={() => login('discord')}
					className="w-full"
				>
					Continue with Discord
				</Button>
			</div>
		</div>
	);
}
