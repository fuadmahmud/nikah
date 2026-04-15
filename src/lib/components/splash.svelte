<script lang="ts">
import { blur } from "svelte/transition";
import { WEDDING_DATE } from "../../constants";
import { PUBLIC_S3_URL } from "$env/static/public";

interface SplashProps {
	onOpen: () => void;
}

const { onOpen }: SplashProps = $props();
const monthAndDate = `${WEDDING_DATE.getMonth().toString().padStart(2, "0")}/${WEDDING_DATE.getDate()}`;
const year = WEDDING_DATE.getFullYear();
</script>


<div class="w-dvw h-dvh flex" transition:blur={{ duration: 750, delay: 150, opacity: 80  }}>
  <img
    src="{PUBLIC_S3_URL}/message.webp"
    alt="background-welcome"
    class="w-full h-full object-cover self-end relative"
    loading="eager"
    fetchpriority="high"
  >
  <div class="w-full h-full z-10 absolute bg-backdrop/50 text-olive-200 flex flex-col justify-between p-12">
    <div class="flex flex-col gap-2 text-center">
      <div class="flex justify-around items-center italic font-light">
        <p>{monthAndDate}</p>
        <p>{year}</p>
      </div>
      <p class="font-light tracking-wide text-xs font-playfair text-white/90">WE INVITE YOU TO CELEBRATE</p>
      <h5 class="text-2xl font-playfair font-light tracking-widest">FUAD & ANGGITA</h5>
    </div>
    <div class="flex flex-col justify-self-end text-center pb-12">
      <p class="font-playfair tracking-widest">Kepada Yth.</p>
      <p>Bapak & Ibu Test</p>
      <button class="mt-4 text-sm backdrop-blur-xs bg-white/30 p-3 rounded-sm text-white lg:w-1/2 mx-auto cursor-pointer" type="button" onclick={onOpen} id="btn-open">
        <i class="fa-regular fa-envelope-open mr-1"></i>
        OPEN INVITATION
      </button>
    </div>
  </div>
</div>