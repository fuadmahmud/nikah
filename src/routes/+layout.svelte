<script lang="ts">
import "./layout.css";
import favicon from "$lib/assets/favicon.svg";
import "@fortawesome/fontawesome-free/css/all.min.css";

const { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>The Wedding of Fuad & Anggita</title>
	<meta name="description" content="The Wedding Invitation of Fuad & Anggita">
	<meta property="og:title" content="The Wedding of Fuad & Anggita">
	<meta property="og:description" content="The Wedding Invitation of Fuad & Anggita">
	<meta property="og:url" content="https://menikah.fuadmahmud.dev">
	<meta property="og:image" content="https://menikah.fuadmahmud.dev">
	<meta property="og:image:height" content="1200">
	<meta property="og:image:width" content="630">
	<meta property="og:image:alt" content="You're invite to our wedding">
	<meta property="og:type" content="website">
</svelte:head>
{@render children()}
