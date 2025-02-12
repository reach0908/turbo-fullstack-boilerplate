CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(20) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(60) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
