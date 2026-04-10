<script lang="ts">
import formatDate from "$lib/utils/formatDate";
import { blur, scale } from "svelte/transition";
import { WEDDING_DATE } from "../../constants";
import gsap from "gsap";
import { onMount } from "svelte";

interface SplashProps {
	onOpen: () => void;
}

const { onOpen }: SplashProps = $props();

onMount(() => {
	gsap.to("#btn-open", {
		duration: 3,
		repeat: -1,
		ease: "sine",
		y: "+=20",
	});
});
</script>


<div class="w-dvw h-dvh flex" transition:blur={{ duration: 750, delay: 150, opacity: 80  }}>
  <img
    src="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/background.webp"
    alt="background-welcome"
    class="w-full h-full object-cover relative"
    loading="eager"
    fetchpriority="high"
    out:scale={{ duration: 1000, start: 1.1 }}
  >
  <div class="w-full h-full z-10 bg-black/35 absolute top-0 text-white flex flex-col items-center p-12">
    <div class="flex flex-col gap-2 text-center">
      <p class="font-light tracking-wide text-xs">THE WEDDING OF</p>
      <h5 class="text-2xl font-dancing font-normal tracking-wider">FUAD & ANGGITA</h5>
      <p class="font-light tracking-wide text-xs">{formatDate(WEDDING_DATE)?.toUpperCase()}</p>
    </div>
    <div class="flex flex-col my-auto text-center pb-12">
      <i>Kepada</i>
      <i>Bapak & Ibu Test</i>
      <button class="mt-4 text-sm bg-olive-300 p-3 rounded-sm text-stone-500" type="button" onclick={onOpen} id="btn-open">
        OPEN INVITATION
      </button>
    </div>
  </div>
</div>