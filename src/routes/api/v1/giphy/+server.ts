import { GIPHY_API_KEY, GIPHY_URL } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get("q") ?? "";
	const urlParams = new URLSearchParams();
	urlParams.append("limit", "10");
	urlParams.append("offset", "0");
	urlParams.append("rating", "g");
	urlParams.append("api_key", GIPHY_API_KEY);
	urlParams.append("q", q);

	const response = await fetch(`${GIPHY_URL}/search?${urlParams.toString()}`);
	const data = await response.json();

	return json(data);
};
