'use client';

import { useRequireAuth } from '@/lib/auth/hooks/use-auth';
import Image from 'next/image';

export default function DashboardPage() {
	const { user, isLoading } = useRequireAuth();

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="mb-4 text-2xl font-bold">
				Welcome, {user?.username}!
			</h1>
			<div className="rounded-lg border p-4">
				<h2 className="mb-2 text-xl font-semibold">Your Profile</h2>
				<div className="space-y-2">
					<p>
						<span className="font-medium">Email:</span>{' '}
						{user?.email}
					</p>
					{user?.avatar && (
						<>
							<p className="text-xs text-gray-500">
								Avatar URL: {user.avatar}
							</p>
							{user.avatar.startsWith('https://') ? (
								<div className="relative h-16 w-16">
									<Image
										src={user.avatar}
										alt="Profile"
										fill
										className="rounded-full object-cover"
									/>
								</div>
							) : (
								<div className="h-16 w-16 rounded-full bg-gray-200" />
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
