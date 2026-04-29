ALTER TABLE "guest" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "wish" ADD COLUMN "rsvp" boolean DEFAULT false;