export interface User {
	id: string;
	email: string;
	name: string;
	// 필요한 다른 사용자 정보들을 추가할 수 있습니다
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export interface AuthContextType extends AuthState {
	login: () => Promise<void>;
	logout: () => Promise<void>;
	refreshAuth: () => Promise<void>;
}
