/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				opensans: ["Bricolage Grotesque", "sans-serif"],
				dancing: ["'Dancing Script'", "cursive"],
				playfair: ["Noto Serif", "serif"],
			},
		},
	},
	plugins: [],
};
