import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './auth-context';

interface UseRequireAuthOptions {
	redirectTo?: string;
	onRedirect?: () => void;
}

/**
 * 보호된 라우트에서 인증 상태를 확인하는 hook
 * @param options - 인증 확인 옵션
 * @returns 인증 상태 정보
 */
export function useRequireAuth(options: UseRequireAuthOptions = {}) {
	const { redirectTo = '/login', onRedirect } = options;
	const { isAuthenticated, isLoading, user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			onRedirect?.();
			router.push(redirectTo);
		}
	}, [isAuthenticated, isLoading, router, redirectTo, onRedirect]);

	return {
		isLoading,
		isAuthenticated,
		user,
	};
}

interface UseAutoRefreshOptions {
	interval?: number;
	enabled?: boolean;
	onError?: (error: unknown) => void;
}

/**
 * 토큰 자동 갱신을 처리하는 hook
 * @param options - 토큰 갱신 옵션
 */
export function useAutoRefresh(options: UseAutoRefreshOptions = {}) {
	const {
		interval = 14 * 60 * 1000, // 기본값 14분
		enabled = true,
		onError,
	} = options;
	const { refreshAuth } = useAuth();

	useEffect(() => {
		if (!enabled) return;

		const refresh = async () => {
			try {
				await refreshAuth();
			} catch (error) {
				onError?.(error);
			}
		};

		// 초기 갱신 시도
		refresh();

		const timeoutId = setInterval(refresh, interval);
		return () => clearInterval(timeoutId);
	}, [refreshAuth, interval, enabled, onError]);
}
