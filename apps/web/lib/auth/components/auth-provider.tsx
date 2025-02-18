'use client';

import { createContext, useCallback, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AuthContextType } from '../types/auth';
import { userQuery } from '../queries/queries';
import { authMutations } from '../queries/mutations';
import { DEFAULT_TOKEN_CONFIG, shouldRefreshToken } from '../utils/token';
import { TokenRefreshError } from '../utils/errors';

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();

	const { data: user, isLoading } = useQuery(userQuery);

	const logoutMutation = useMutation({
		...authMutations.logout,
		onSuccess: () => {
			queryClient.setQueryData(['user'], null);
			window.location.href = '/login';
		},
	});

	const refreshAuthMutation = useMutation({
		...authMutations.refresh,
		onSuccess: (data) => {
			queryClient.setQueryData(['user'], data.user);
		},
		onError: () => {
			queryClient.setQueryData(['user'], null);
		},
	});

	const login = useCallback((provider = 'discord') => {
		window.location.href = `/api/auth/${provider}`;
	}, []);

	const logout = useCallback(async () => {
		await logoutMutation.mutateAsync();
	}, [logoutMutation]);

	const refreshAuth = useCallback(async () => {
		await refreshAuthMutation.mutateAsync();
	}, [refreshAuthMutation]);

	// 슬라이딩 세션 관리
	useEffect(() => {
		if (!user) return;

		const checkAndRefreshToken = async () => {
			const accessToken = document.cookie
				.split('; ')
				.find((row) => row.startsWith('access_token='))
				?.split('=')[1];

			if (
				accessToken &&
				shouldRefreshToken(
					accessToken,
					DEFAULT_TOKEN_CONFIG.refreshThreshold,
				)
			) {
				try {
					await refreshAuth();
				} catch (error) {
					console.error('Failed to refresh token:', error);
					if (error instanceof TokenRefreshError) {
						window.location.href = '/login';
					}
				}
			}
		};

		// 초기 체크
		checkAndRefreshToken();

		// 주기적 체크 설정
		const intervalId = setInterval(
			checkAndRefreshToken,
			DEFAULT_TOKEN_CONFIG.refreshInterval,
		);

		return () => clearInterval(intervalId);
	}, [user, refreshAuth]);

	const value = useMemo(
		() => ({
			user: user ?? null,
			isAuthenticated: !!user,
			isLoading,
			login,
			logout,
			refreshAuth,
		}),
		[user, isLoading, login, logout, refreshAuth],
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
