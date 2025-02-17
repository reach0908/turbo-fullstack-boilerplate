import { LandingLayoutClient } from '@/app/(landing)/components/landing-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Welcome',
	description: 'Welcome to our platform',
};

export default function LandingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <LandingLayoutClient>{children}</LandingLayoutClient>;
}
