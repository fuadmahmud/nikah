import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

export const guest = pgTable("guest", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull().default(""),
	slug: varchar({ length: 100 }).unique().notNull().default(""),
	salutation: varchar({ length: 50 }).default(""),
	created_at: timestamp().defaultNow(),
});

export const wish = pgTable("wish", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	description: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	verified: boolean().notNull().default(false),
	gif_url: text(),
	created_at: timestamp().defaultNow(),
	guest_id: integer("guest_id").references(() => guest.id),
	rsvp: boolean().default(false),
});
