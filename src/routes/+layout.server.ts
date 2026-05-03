import { createDb } from "$lib/db";
import { desc, eq, getTableColumns } from "drizzle-orm";
import type { Guest } from "../types";
import type { LayoutServerLoad } from "./$types";
import * as schema from "$lib/db/schema";
import { ANON_ID } from "../constants";

export const load: LayoutServerLoad = async ({ url }) => {
	const { db, client } = createDb();
	const params = url.searchParams.get("guest") ?? "";
	const defaultGuest: Guest = {
		id: 0,
		name: "",
		slug: "",
		salutation: "",
		created_at: null,
	};
	try {
		const wishes = await db
			.select({
				...getTableColumns(schema.wish),
				guestName: schema.guest.name,
				guestSalutation: schema.guest.salutation,
			})
			.from(schema.wish)
			.leftJoin(schema.guest, eq(schema.wish.guest_id, schema.guest.id))
			.orderBy(desc(schema.wish.created_at));
		const guest = await db.query.guest.findFirst({
			where: (guests, { eq }) => eq(guests.slug, params),
		});

		if (!params || guest?.id === ANON_ID) return { guest: defaultGuest, wishes };

		return {
			guest,
			wishes,
		};
	} finally {
		await client.end();
	}
};
