'use client';

import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HydrationBoundary, type DehydratedState } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '@/lib/auth/components/auth-provider';

interface ProvidersProps {
	children: React.ReactNode;
	dehydratedState: DehydratedState;
}

export function Providers({ children, dehydratedState }: ProvidersProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000, // 1분
						refetchOnWindowFocus: false,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydratedState}>
				<AuthProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
					>
						{children}
					</ThemeProvider>
				</AuthProvider>
			</HydrationBoundary>
		</QueryClientProvider>
	);
}
