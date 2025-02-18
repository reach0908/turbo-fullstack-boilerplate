import { TokenConfig } from './types';

/**
 * 기본 토큰 설정
 */
export const DEFAULT_TOKEN_CONFIG: TokenConfig = {
	refreshThreshold: 5 * 60 * 1000, // 만료 5분 전
	refreshInterval: 60 * 1000, // 1분마다 체크
};

/**
 * 토큰 만료 시간 확인
 */
export function getTokenExpiration(token: string): number {
	try {
		const [, payload] = token.split('.');
		if (!payload) return 0;
		const decodedPayload = JSON.parse(atob(payload));
		return decodedPayload.exp * 1000;
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
