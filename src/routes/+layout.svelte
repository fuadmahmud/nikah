<script lang="ts">
import "./layout.css";
import favicon from "$lib/assets/favicon.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { setContext } from "svelte";
import { gsap, ScrollTrigger, SplitText, Flip } from "$lib/utils/gsap.js";

const { data, children } = $props();
const guest = $derived(data.guest);
let wishes = $derived(data.wishes);

setContext("wishes", {
	get wishes() {
		return wishes;
	},
	set wishes(wish) {
		wishes = wish;
	},
});
setContext("guest", () => data.guest);

gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="manifest" href="/manifest.json" />
	<link rel="apple-touch-icon" href="/favicon.svg" />
	<title>The Wedding of Fuad & Anggita</title>
	<meta name="description" content="The Wedding Invitation of Anggita & Fuad">
	<meta property="og:title" content="The Wedding of Anggita & Fuad">
	<meta property="og:description" content="Dear, {guest?.salutation ? `${guest.salutation} ` : ''}{guest?.name || 'invitee'} we happily invite you to celebrate our wedding">
	<meta property="og:url" content="https://menikah.fuadmahmud.dev">
	<meta property="og:image" content="https://menikah.fuadmahmud.dev/og-image.jpg">
	<meta property="og:image:height" content="1200">
	<meta property="og:image:width" content="630">
	<meta property="og:image:alt" content="You're invite to our wedding">
	<meta property="og:type" content="website">
</svelte:head>
{@render children()}
