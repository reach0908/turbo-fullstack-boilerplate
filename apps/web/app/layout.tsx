import { Geist, Geist_Mono } from 'next/font/google';
import '@workspace/ui/globals.css';
import { Providers } from '@/components/providers';
import { AuthProvider } from '@/lib/auth/auth-context';

const fontSans = Geist({
	subsets: ['latin'],
	variable: '--font-sans',
});

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
			>
				<AuthProvider>
					<Providers>{children}</Providers>
				</AuthProvider>
			</body>
		</html>
	);
}
