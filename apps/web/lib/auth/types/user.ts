export interface User {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
	username: string;
	email: string;
	avatar?: string | null;
}
