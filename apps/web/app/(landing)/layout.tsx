import { LandingLayout } from '@/components/landing-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Welcome',
	description: 'Welcome to our platform',
};

export default function LandingPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <LandingLayout>{children}</LandingLayout>;
}
