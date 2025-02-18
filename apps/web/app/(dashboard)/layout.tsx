'use client';

import { useAuth } from '@/lib/auth/hooks/use-auth';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { logout } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
			// 로그아웃 후 자동으로 로그인 페이지로 리다이렉트됩니다 (useRequireAuth 훅에 의해)
		} catch (error) {
			console.error('로그아웃 실패:', error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<span className="text-xl font-bold">Dashboard</span>
						</div>
						<div className="flex items-center">
							<button
								onClick={handleLogout}
								className="ml-4 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
							>
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
