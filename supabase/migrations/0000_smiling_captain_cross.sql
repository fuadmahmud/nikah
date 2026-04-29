CREATE TABLE "guest" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "guest_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) DEFAULT '' NOT NULL,
	"slug" varchar(100) DEFAULT '' NOT NULL,
	"salutation" varchar(50) DEFAULT '',
	CONSTRAINT "guest_slug_unique" UNIQUE("slug")
);

ALTER TABLE "guest" ENABLE ROW LEVEL SECURITY;