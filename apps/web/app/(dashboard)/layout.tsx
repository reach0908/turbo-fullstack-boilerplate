import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'User dashboard and management',
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<span className="text-xl font-bold">Dashboard</span>
						</div>
						<div className="flex items-center">
							<button className="ml-4 text-gray-600 hover:text-gray-900">
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				{children}
			</main>
		</div>
	);
}
