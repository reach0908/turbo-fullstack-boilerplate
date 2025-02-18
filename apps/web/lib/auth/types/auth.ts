import type { User } from './user';

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export interface AuthContextType extends AuthState {
	login: (provider?: string) => void;
	logout: () => Promise<void>;
	refreshAuth: () => Promise<void>;
}

export interface UseRequireAuthOptions {
	redirectTo?: string;
	onRedirect?: () => void;
}

export interface UseAutoRefreshOptions {
	interval?: number;
	enabled?: boolean;
	onError?: (error: unknown) => void;
}

export interface TokenConfig {
	refreshThreshold: number;
	refreshInterval: number;
}
