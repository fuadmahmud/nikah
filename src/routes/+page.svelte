<script lang="ts">
import Home from "$lib/pages/home.svelte";
import Splash from "$lib/pages/splash.svelte";

let isSplashPage = $state(true);

const handleOpen = async () => {
	isSplashPage = false;
};
</script>


{#if isSplashPage}
  <Splash onOpen={handleOpen} />
{/if}
{#if !isSplashPage}
  <Home />
{/if}