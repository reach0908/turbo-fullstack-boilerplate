'use client';

import { useEffect } from 'react';
import { Button } from '@workspace/ui/components/button';
import { isAuthError } from '@/lib/auth/errors';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// 에러 로깅 서비스로 에러 전송
		console.error('Error:', error);
	}, [error]);

	const errorMessage = isAuthError(error)
		? error.message
		: '예기치 않은 오류가 발생했습니다.';

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-4 p-4">
			<div className="text-center">
				<h2 className="mb-2 text-2xl font-bold text-gray-900">
					문제가 발생했습니다
				</h2>
				<p className="mb-4 text-gray-600">{errorMessage}</p>
				<Button onClick={reset} variant="outline" className="mx-auto">
					다시 시도
				</Button>
			</div>
		</div>
	);
}
