// TODO: 타입 공통 패키지화 작업 후 공통 패키지에서 가져올 수 있도록 수정
/**
 * 사용자 엔티티 타입
 */
export interface User {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
	username: string;
	email: string;
	avatar?: string | null;
	// 필요한 다른 사용자 정보들을 추가할 수 있습니다
}

/**
 * 인증 상태 타입
 */
export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error?: Error | null;
}

/**
 * useRequireAuth hook 옵션 타입
 */
export interface UseRequireAuthOptions {
	redirectTo?: string;
	onRedirect?: () => void;
}

/**
 * useAutoRefresh hook 옵션 타입
 */
export interface UseAutoRefreshOptions {
	interval?: number;
	enabled?: boolean;
	onError?: (error: unknown) => void;
}

export interface AuthContextType extends AuthState {
	login: () => Promise<void>;
	logout: () => Promise<void>;
	refreshAuth: () => Promise<void>;
}
