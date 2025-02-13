import {
	pgTable,
	varchar,
	text,
	timestamp,
	integer,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { baseFields } from './base.schema';
import { relations } from 'drizzle-orm';

export const oauthAccounts = pgTable('oauth_accounts', {
	...baseFields,
	userId: integer('user_id')
		.references(() => users.id)
		.notNull(),
	provider: varchar('provider', { length: 20 }).notNull(),
	providerId: varchar('provider_id', { length: 100 }).notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	tokenExpiresAt: timestamp('token_expires_at'),
	profile: text('profile'),
});

export type OAuthAccountEntity = typeof oauthAccounts.$inferSelect;
export type NewOAuthAccountEntity = typeof oauthAccounts.$inferInsert;

export const oauthRelations = relations(oauthAccounts, ({ one }) => ({
	user: one(users, {
		fields: [oauthAccounts.userId],
		references: [users.id],
	}),
}));

export enum OAuthProvider {
	DISCORD = 'discord',
	GOOGLE = 'google',
	GITHUB = 'github',
	KAKAO = 'kakao',
	NAVER = 'naver',
}
