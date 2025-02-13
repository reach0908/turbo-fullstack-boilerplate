import { pgTable, varchar, text } from 'drizzle-orm/pg-core';
import { baseFields } from './base.schema';
export const users = pgTable('users', {
	...baseFields,
	username: varchar('username', { length: 100 }).notNull(),
	email: varchar('email', { length: 100 }).notNull().unique(),
	avatar: text('avatar'),
});

export type UserEntity = typeof users.$inferSelect;
export type NewUserEntity = typeof users.$inferInsert;
