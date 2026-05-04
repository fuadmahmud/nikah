<script lang="ts">
import Splash from "$lib/pages/splash.svelte";
import type { Component } from "svelte";

let isSplashPage = $state(true);
let Home = $state<Component<Record<string, never>, object, ""> | null>(null);

const handleOpen = async () => {
	const component = await import("$lib/pages/home.svelte");
	Home = component.default;
	isSplashPage = false;
};
</script>


{#if isSplashPage}
  <Splash onOpen={handleOpen} />
{/if}
{#if !isSplashPage && Home}
  <Home />
{/if}