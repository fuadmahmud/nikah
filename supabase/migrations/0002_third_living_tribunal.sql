ALTER TABLE "wish" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "wish" ADD COLUMN "verified" boolean DEFAULT false NOT NULL;