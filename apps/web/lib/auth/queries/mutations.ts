import { TokenRefreshError } from '../utils/errors';

export const authMutations = {
	logout: {
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
	},

	refresh: {
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
	},
} as const;
