import type { TokenConfig } from '../types/auth';

export const DEFAULT_TOKEN_CONFIG: TokenConfig = {
	refreshThreshold: 5 * 60 * 1000, // 만료 5분 전
	refreshInterval: 60 * 1000, // 1분마다 체크
};

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

export function shouldRefreshToken(token: string, threshold: number): boolean {
	if (!token) return false;
	const expiration = getTokenExpiration(token);
	const now = Date.now();
	return expiration - now < threshold;
}
