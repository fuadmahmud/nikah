CREATE TABLE "wish" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "wish_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"description" varchar(255) NOT NULL,
	"gif_url" text,
	"created_at" timestamp DEFAULT now(),
	"guest_id" integer
);
--> statement-breakpoint
ALTER TABLE "guest" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "wish" ADD CONSTRAINT "wish_guest_id_guest_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."guest"("id") ON DELETE no action ON UPDATE no action;

ALTER TABLE "wish" ENABLE ROW LEVEL SECURITY;