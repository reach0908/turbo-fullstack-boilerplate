'use client';

import { useAuth } from '@/lib/auth/auth-context';

export function LandingLayoutClient({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useAuth();

	return (
		<div className="min-h-screen">
			<header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<span className="text-xl font-bold">Logo</span>
						</div>
						<div className="flex items-center space-x-4">
							{user ? (
								<a
									href="/dashboard"
									className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
								>
									go to Dashboard
								</a>
							) : (
								<a
									href="/login"
									className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
								>
									Login
								</a>
							)}
						</div>
					</div>
				</div>
			</header>
			<main className="pt-16">{children}</main>
		</div>
	);
}
