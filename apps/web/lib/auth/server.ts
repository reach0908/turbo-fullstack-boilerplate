import { cookies } from 'next/headers';

/**
 * 서버 사이드에서 사용자 데이터 프리페치
 */
export async function prefetchUser() {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token');

	if (!accessToken) {
		return null;
	}

	try {
		// eslint-disable-next-line turbo/no-undeclared-env-vars
		const response = await fetch(`${process.env.API_URL}/users/me`, {
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
