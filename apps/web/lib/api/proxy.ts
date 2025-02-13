// lib/api/proxy.ts
import { NextRequest, NextResponse } from 'next/server';

type ProxyOptions = {
	// 백엔드 서버의 어느 경로로 요청을 보낼지 지정 (예: '/auth/me')
	targetPath: string;
};

export function createProxyHandler({ targetPath }: ProxyOptions) {
	return async function handler(request: NextRequest) {
		const backendUrl = process.env.BACKEND_URL;
		if (!backendUrl) {
			return NextResponse.json(
				{ error: 'Backend URL not configured' },
				{ status: 500 },
			);
		}

		// 대상 URL 구성 (쿼리 파라미터 포함)
		const url = new URL(`${backendUrl}${targetPath}`);
		if (request.method === 'GET') {
			const reqUrl = new URL(request.url);
			reqUrl.searchParams.forEach((value, key) => {
				url.searchParams.append(key, value);
			});
		}

		// 클라이언트 요청의 헤더를 복사(불필요한 헤더는 제거)
		const headers = new Headers(request.headers);
		headers.delete('host');

		let body: string | undefined;
		if (request.method !== 'GET' && request.method !== 'HEAD') {
			body = await request.text();
		}

		try {
			const response = await fetch(url.toString(), {
				method: request.method,
				headers,
				body,
			});

			// 백엔드 응답을 텍스트로 읽은 후 JSON 파싱 시도
			const resBody = await response.text();
			const contentType = response.headers.get('content-type');

			if (contentType && contentType.includes('application/json')) {
				try {
					const data = JSON.parse(resBody);
					return NextResponse.json(data, { status: response.status });
				} catch (err) {
					// JSON 파싱 실패 시 텍스트 응답 반환
					return new Response(resBody, {
						status: response.status,
					});
				}
			} else {
				return new Response(resBody, { status: response.status });
			}
		} catch (error) {
			// 네트워크나 기타 에러 처리
			return NextResponse.json(
				{
					error: 'Proxy request failed',
					details:
						error instanceof Error ? error.message : String(error),
				},
				{ status: 500 },
			);
		}
	};
}
