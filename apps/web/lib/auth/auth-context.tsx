'use client';

import {
	createContext,
	useContext,
	useCallback,
	useEffect,
	useMemo,
} from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AuthContextType, User } from './types';
import { DEFAULT_TOKEN_CONFIG, shouldRefreshToken } from './utils';
import { TokenRefreshError } from './errors';

const AuthContext = createContext<AuthContextType | null>(null);

async function fetchUser(): Promise<User | null> {
	try {
		const response = await fetch('/api/users/me', {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			if (response.status === 401) return null;
			throw new Error('Failed to fetch user');
		}

		return response.json();
	} catch (error) {
		console.error('Failed to fetch user:', error);
		return null;
	}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();

	const { data: user, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: fetchUser,
		staleTime: DEFAULT_TOKEN_CONFIG.refreshInterval,
		retry: false,
	});

	const logoutMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Logout failed');
			}
		},
		onSuccess: () => {
			queryClient.setQueryData(['user'], null);
			window.location.href = '/login';
		},
	});

	const refreshAuthMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch('/api/auth/refresh', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				if (response.status === 401) {
					window.location.href = '/login';
				}
				throw new TokenRefreshError();
			}

			return response.json();
		},
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

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
