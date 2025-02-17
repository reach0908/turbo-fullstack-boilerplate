'use client';

import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import { type AuthContextType, type User } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// 초기 사용자 정보 로드
	useEffect(() => {
		void fetchUser();
	}, []);

	// 사용자 정보 가져오기
	const fetchUser = async () => {
		try {
			const response = await fetch('/api/users/me', {
				credentials: 'include',
			});

			if (response.ok) {
				const userData = await response.json();
				setUser(userData);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error('Error fetching user:', error);
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	// 로그아웃
	const logout = async () => {
		try {
			window.location.href = '/api/auth/logout';
		} catch (error) {
			console.error('Logout failed:', error);
			throw error;
		}
	};

	// 토큰 갱신
	const refreshAuth = async () => {
		try {
			const response = await fetch('/api/auth/refresh', {
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Token refresh failed');
			}

			await fetchUser();
		} catch (error) {
			console.error('Auth refresh failed:', error);
			setUser(null);
			throw error;
		}
	};

	// 로그인
	const login = async () => {
		window.location.href = '/api/auth/discord';
	};

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: !!user,
			isLoading,
			login,
			logout,
			refreshAuth,
		}),
		[user, isLoading],
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
