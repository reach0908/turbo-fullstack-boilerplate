'use client';

import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';
import { useAuth } from '@/lib/auth/hooks/use-auth';

export function LandingLayout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated, logout } = useAuth();

	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b">
				<div className="container mx-auto flex h-16 items-center justify-between px-4">
					<Link href="/" className="font-bold">
						Turbo Fullstack
					</Link>
					<nav>
						{isAuthenticated ? (
							<div className="flex items-center gap-4">
								<Link href="/dashboard">
									<Button variant="ghost">Dashboard</Button>
								</Link>
								<Button
									variant="outline"
									onClick={() => logout()}
								>
									Logout
								</Button>
							</div>
						) : (
							<Link href="/login">
								<Button>Login</Button>
							</Link>
						)}
					</nav>
				</div>
			</header>
			<main className="flex-1">{children}</main>
			<footer className="border-t">
				<div className="container mx-auto flex h-16 items-center justify-between px-4">
					<p className="text-sm text-gray-500">
						© {new Date().getFullYear()} Turbo Fullstack. All
						rights reserved.
					</p>
				</div>
			</footer>
		</div>
	);
}
