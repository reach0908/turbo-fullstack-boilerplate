import { Request } from 'express';

export interface RequestWithCookies extends Request {
	cookies: {
		access_token?: string;
		refresh_token?: string;
		[key: string]: string | undefined;
	};
}
