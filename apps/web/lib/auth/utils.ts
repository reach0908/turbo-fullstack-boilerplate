import { cookies } from 'next/headers';
import { TokenConfig } from './types';

/**
 * 기본 토큰 설정
 */
export const DEFAULT_TOKEN_CONFIG: TokenConfig = {
	refreshThreshold: 5 * 60 * 1000, // 만료 5분 전
	refreshInterval: 60 * 1000, // 1분마다 체크
};

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
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
			{
				headers: {
					Cookie: `access_token=${accessToken.value}`,
				},
				cache: 'no-store',
			},
		);

		if (!response.ok) {
			return null;
		}

		return response.json();
	} catch (error) {
		console.error('Failed to prefetch user:', error);
		return null;
	}
}

/**
 * 토큰 만료 시간 확인
 */
export function getTokenExpiration(token: string): number {
	try {
		const [, payload] = token.split('.');
		if (!payload) return 0;
		const decodedPayload = JSON.parse(atob(payload));
		return decodedPayload.exp * 1000;
		return decodedPayload.exp * 1000; // 초를 밀리초로 변환
	} catch {
		return 0;
	}
}

/**
 * 토큰 갱신이 필요한지 확인
 */
export function shouldRefreshToken(token: string, threshold: number): boolean {
	if (!token) return false;

	const expiration = getTokenExpiration(token);
	const now = Date.now();

	return expiration - now < threshold;
}
