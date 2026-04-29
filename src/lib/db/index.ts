import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { DATABASE_URL } from "$env/static/private";

export const createDb = () => {
	const client = postgres(DATABASE_URL, {
		max: 1,
		prepare: false,
	});

	return {
		db: drizzle(client, { schema }),
		client,
	};
};
