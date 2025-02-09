import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 20 }).notNull(),
	email: varchar('email', { length: 100 }).notNull().unique(),
	password: varchar('password', { length: 60 }).notNull(),
});

export type UserEntity = typeof users.$inferSelect;
