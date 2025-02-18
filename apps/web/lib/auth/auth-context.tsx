'use client';

import { createContext, useContext, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AuthContextType, User } from './types';

const AuthContext = createContext<AuthContextType | null>(null);

async function fetchUser(): Promise<User | null> {
	try {
		const response = await fetch('/api/auth/me');
		if (!response.ok) return null;
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
		staleTime: 5 * 60 * 1000, // 5분
		retry: false,
	});

	const loginMutation = useMutation({
		mutationFn: async () => {
			// 로그인 API 호출
			const response = await fetch('/api/auth/login', { method: 'POST' });
			if (!response.ok) throw new Error('Login failed');
			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	const logoutMutation = useMutation({
		mutationFn: async () => {
			// 로그아웃 API 호출
			await fetch('/api/auth/logout', { method: 'POST' });
		},
		onSuccess: () => {
			queryClient.setQueryData(['user'], null);
		},
	});

	const refreshAuthMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch('/api/auth/refresh', {
				method: 'POST',
			});
			if (!response.ok) throw new Error('Token refresh failed');
			return response.json();
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['user'], data.user);
		},
	});

	const login = useCallback(async () => {
		await loginMutation.mutateAsync();
	}, [loginMutation]);

	const logout = useCallback(async () => {
		await logoutMutation.mutateAsync();
	}, [logoutMutation]);

	const refreshAuth = useCallback(async () => {
		await refreshAuthMutation.mutateAsync();
	}, [refreshAuthMutation]);

	const value = useMemo(
		() => ({
			user: user ?? null,
			isAuthenticated: !!user,
			isLoading,
			error:
				loginMutation.error ||
				logoutMutation.error ||
				refreshAuthMutation.error,
			login,
			logout,
			refreshAuth,
		}),
		[
			user,
			isLoading,
			loginMutation.error,
			logoutMutation.error,
			refreshAuthMutation.error,
			login,
			logout,
			refreshAuth,
		],
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
