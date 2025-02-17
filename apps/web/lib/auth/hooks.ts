import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './auth-context';

// 보호된 라우트에서 인증 상태 확인
export function useRequireAuth() {
	const { isAuthenticated, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			router.push('/login');
		}
	}, [isAuthenticated, isLoading, router]);

	return { isLoading };
}

// 토큰 자동 갱신
export function useAutoRefresh() {
	const { refreshAuth } = useAuth();

	useEffect(() => {
		const REFRESH_INTERVAL = 14 * 60 * 1000; // 14분마다 갱신
		const timeoutId = setInterval(refreshAuth, REFRESH_INTERVAL);
		return () => clearInterval(timeoutId);
	}, [refreshAuth]);
}
