import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Authentication',
	description: 'Authentication pages',
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
				{children}
			</div>
		</div>
	);
}
