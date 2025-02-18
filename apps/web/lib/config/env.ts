const requiredServerEnvs = ['API_URL'] as const;
const requiredClientEnvs = [] as const;

export function validateEnv() {
	for (const env of requiredServerEnvs) {
		if (!process.env[env]) {
			throw new Error(`${env} 환경 변수가 설정되지 않았습니다.`);
		}
	}

	for (const env of requiredClientEnvs) {
		if (!process.env[`NEXT_PUBLIC_${env}`]) {
			throw new Error(
				`NEXT_PUBLIC_${env} 환경 변수가 설정되지 않았습니다.`,
			);
		}
	}
}

// 서버 사이드 환경 변수
export const serverEnv = {
	// eslint-disable-next-line turbo/no-undeclared-env-vars
	apiUrl: process.env.API_URL,
} as const;

// 클라이언트 사이드 환경 변수
export const clientEnv = {} as const;
