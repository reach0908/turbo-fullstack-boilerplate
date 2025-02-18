import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import { prefetchUser } from '@/lib/auth/actions/user';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import '@workspace/ui/globals.css';

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
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000, // 1분
				refetchOnWindowFocus: false,
			},
		},
	});

	// 서버 사이드에서 사용자 데이터 프리페치
	await queryClient.prefetchQuery({
		queryKey: ['user'],
		queryFn: prefetchUser,
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<html lang="ko" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
			>
				<Providers dehydratedState={dehydratedState}>
					{children}
				</Providers>
			</body>
		</html>
	);
}
