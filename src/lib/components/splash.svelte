<script lang="ts">
import formatDate from "$lib/utils/formatDate";
import { fade, scale } from "svelte/transition";
import { WEDDING_DATE } from "../../constants";

interface SplashProps {
	onOpen: () => void;
}

const { onOpen }: SplashProps = $props();
</script>


<div class="w-dvw h-dvh flex" out:fade={{ duration: 800 }}>
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
      <button class="bg-taupe-300 p-3 rounded-full text-slate-900 mt-4" type="button" onclick={onOpen}>
      Open Invitation
      </button>
    </div>
  </div>
</div>