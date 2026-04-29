<script lang="ts">
import Splash from "$lib/pages/splash.svelte";
import Home from "$lib/pages/home.svelte";
import { setContext } from "svelte";

let isSplashPage = $state(true);
const { data } = $props();
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

const handleOpen = () => {
	isSplashPage = false;
};
</script>


{#if isSplashPage}
  <Splash onOpen={handleOpen} guest={data.guest} />
{/if}
{#if !isSplashPage}
  <Home />
{/if}