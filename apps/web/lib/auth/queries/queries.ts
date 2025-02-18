import type { User } from '../types/user';

export async function fetchUser(): Promise<User | null> {
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

export const userQuery = {
	queryKey: ['user'] as const,
	queryFn: fetchUser,
	staleTime: 1000 * 60, // 1분
	retry: false,
};
