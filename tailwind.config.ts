/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			fontFamily: {
				opensans: ["Playfair Display", "sans-serif"],
				noto: ["Noto Serif", "serif"],
			},
		},
	},
	plugins: [],
};
