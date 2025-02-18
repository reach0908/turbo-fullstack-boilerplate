import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './auth-context';
import type {
	UseRequireAuthOptions,
	UseAutoRefreshOptions,
	User,
	AuthState,
} from './types';
import {
	TokenRefreshError,
	UnauthorizedError,
	formatAuthError,
} from './errors';

/**
 * 보호된 라우트에서 인증 상태를 확인하는 hook
 * @param options - 인증 확인 옵션
 * @returns 인증 상태 정보
 * @throws {UnauthorizedError} 인증되지 않은 경우
 */
export function useRequireAuth(
	options: UseRequireAuthOptions = {},
): Omit<AuthState, 'error'> {
	const { redirectTo = '/login', onRedirect } = options;
	const { isAuthenticated, isLoading, user, error } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			const authError = error || new UnauthorizedError();
			onRedirect?.();
			router.push(
				`${redirectTo}?error=${encodeURIComponent(formatAuthError(authError))}`,
			);
		}
	}, [isAuthenticated, isLoading, router, redirectTo, onRedirect, error]);

	return {
		isLoading,
		isAuthenticated,
		user,
	};
}

/**
 * 토큰 자동 갱신을 처리하는 hook
 * @param options - 토큰 갱신 옵션
 */
export function useAutoRefresh(options: UseAutoRefreshOptions = {}): void {
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
				const refreshError = new TokenRefreshError(
					error instanceof Error ? error.message : undefined,
				);
				onError?.(refreshError);
			}
		};

		// 초기 갱신 시도
		refresh();

		const timeoutId = setInterval(refresh, interval);
		return () => clearInterval(timeoutId);
	}, [refreshAuth, interval, enabled, onError]);
}
