import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'User dashboard overview',
};

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
				<p className="text-muted-foreground">
					Welcome to your dashboard overview.
				</p>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
					<h3 className="font-semibold">Quick Stats</h3>
					<p className="text-sm text-muted-foreground">
						Your activity overview
					</p>
				</div>
			</div>
		</div>
	);
}
