export class AuthError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'AuthError';
	}
}

export class UnauthorizedError extends AuthError {
	constructor(message = '인증이 필요합니다.') {
		super(message);
		this.name = 'UnauthorizedError';
	}
}

export class TokenExpiredError extends AuthError {
	constructor(message = '인증이 만료되었습니다. 다시 로그인해 주세요.') {
		super(message);
		this.name = 'TokenExpiredError';
	}
}

export class TokenRefreshError extends AuthError {
	constructor(message = '인증 갱신에 실패했습니다.') {
		super(message);
		this.name = 'TokenRefreshError';
	}
}

export const isAuthError = (error: unknown): error is AuthError => {
	return error instanceof AuthError;
};

export const formatAuthError = (error: unknown): string => {
	if (isAuthError(error)) {
		return error.message;
	}
	if (error instanceof Error) {
		return error.message;
	}
	return '알 수 없는 오류가 발생했습니다.';
};
