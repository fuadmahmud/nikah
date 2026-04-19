<script lang="ts">
import Splash from "$lib/components/splash.svelte";
import Home from "$lib/components/home.svelte";

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