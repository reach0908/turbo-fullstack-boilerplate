'use server';

import { cookies } from 'next/headers';
import { serverEnv } from '../../config/env';

export async function prefetchUser() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token');

	if (!accessToken) {
		return null;
	}

	try {
		const response = await fetch(`${serverEnv.apiUrl}/users/me`, {
			headers: {
				Cookie: `access_token=${accessToken.value}`,
			},
			cache: 'no-store',
		});

		if (!response.ok) {
			return null;
		}

		return response.json();
	} catch (error) {
		console.error('Failed to prefetch user:', error);
		return null;
	}
}
