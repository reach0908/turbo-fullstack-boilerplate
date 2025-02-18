import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import type {
	UseRequireAuthOptions,
	UseAutoRefreshOptions,
	AuthContextType,
} from '../types/auth';
import { AuthContext } from '../components/auth-provider';
import {
	TokenRefreshError,
	UnauthorizedError,
	formatAuthError,
} from '../utils/errors';

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
	const { redirectTo = '/login', onRedirect } = options;
	const { isAuthenticated, isLoading, user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			const authError = new UnauthorizedError();
			onRedirect?.();
			router.push(
				`${redirectTo}?error=${encodeURIComponent(formatAuthError(authError))}`,
			);
		}
	}, [isAuthenticated, isLoading, router, redirectTo, onRedirect]);

	return {
		isLoading,
		isAuthenticated,
		user,
	};
}

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
