import { Geist, Geist_Mono } from 'next/font/google';
import '@workspace/ui/globals.css';
import { Providers } from '@/components/providers';
import { prefetchUser } from '@/lib/auth/utils';
import { headers } from 'next/headers';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

const fontSans = Geist({
	subsets: ['latin'],
	variable: '--font-sans',
});

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const queryClient = new QueryClient();

	// 서버 사이드에서 사용자 데이터 프리페치
	await queryClient.prefetchQuery({
		queryKey: ['user'],
		queryFn: prefetchUser,
	});

	return (
		<html lang="ko" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
			>
				<HydrationBoundary state={dehydrate(queryClient)}>
					<Providers>{children}</Providers>
				</HydrationBoundary>
			</body>
		</html>
	);
}
