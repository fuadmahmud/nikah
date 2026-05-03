<script lang="ts">
import Splash from "$lib/pages/splash.svelte";
import Home from "$lib/pages/home.svelte";
import { setContext } from "svelte";

let isSplashPage = $state(true);

const handleOpen = () => {
	isSplashPage = false;
};
</script>


{#if isSplashPage}
  <Splash onOpen={handleOpen} />
{/if}
{#if !isSplashPage}
  <Home />
{/if}