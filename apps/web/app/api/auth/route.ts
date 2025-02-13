import { createProxyHandler } from '@/lib/api/proxy';

export const GET = createProxyHandler({ targetPath: '/auth/refresh' });
