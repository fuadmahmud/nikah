import { db } from "$lib/db";
import * as schema from "$lib/db/schema";
import { desc, eq, getTableColumns } from "drizzle-orm";
import type { Guest } from "../types";
import type { PageServerLoad } from "./$types";
import type { Actions } from "@sveltejs/kit";
import { ANON_ID } from "../constants";

export const load: PageServerLoad = async ({ url }) => {
	const params = url.searchParams.get("guest") ?? "";
	const defaultGuest: Guest = {
		id: 0,
		name: "",
		slug: "",
		salutation: "",
		created_at: null,
	};
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
};

export const actions = {
	wish: async ({ request }) => {
		const formData = await request.formData();
		const slug = formData.get("slug") as string;
		const name = formData.get("name") as string;

		if (!slug) {
			return db.insert(schema.wish).values({
				name,
				description: formData.get("wishes") as string,
				rsvp: formData.get("rsvp") === "true",
				guest_id: ANON_ID,
				verified: false,
			});
		}

		const guest = await db.query.guest.findFirst({
			where: (guests, { eq }) => eq(guests.slug, slug),
		});

		return db.insert(schema.wish).values({
			name,
			description: formData.get("wishes") as string,
			rsvp: formData.get("rsvp") === "true",
			guest_id: guest?.id,
			verified: true,
			gif_url: (formData.get("gifUrl") as string) || "",
		});
	},
} satisfies Actions;
