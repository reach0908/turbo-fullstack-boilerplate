import { UserEntity } from 'src/database/schemas/users.schema';
import { Request } from 'express';

export type Done = (err: Error | null, user: UserEntity) => void;

export interface DiscordProfile {
	id: string;
	email: string;
	username: string;
	avatar?: string;
	accessToken: string;
	refreshToken?: string;
	tokenExpiresAt?: Date;
}

export interface DiscordOAuthRequest extends Request {
	user: UserEntity;
}
