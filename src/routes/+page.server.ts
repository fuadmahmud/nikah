import { createDb } from "$lib/db";
import * as schema from "$lib/db/schema";
import type { Actions } from "@sveltejs/kit";
import { ANON_ID } from "../constants";

export const actions = {
	wish: async ({ request }) => {
		const { db, client } = createDb();
		const formData = await request.formData();
		const slug = formData.get("slug") as string;
		const name = formData.get("name") as string;
		
		try {
			if (!slug) {
				return await db.insert(schema.wish).values({
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

			return await db.insert(schema.wish).values({
				name,
				description: formData.get("wishes") as string,
				rsvp: formData.get("rsvp") === "true",
				guest_id: guest?.id,
				verified: true,
				gif_url: (formData.get("gifUrl") as string) || "",
			});
		} finally {
			await client.end();
		}
	},
} satisfies Actions;
