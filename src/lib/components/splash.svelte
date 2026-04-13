<script lang="ts">
import { blur } from "svelte/transition";
import { WEDDING_DATE } from "../../constants";
import gsap from "gsap";
import { onMount } from "svelte";

interface SplashProps {
	onOpen: () => void;
}

const { onOpen }: SplashProps = $props();
const monthAndDate = `${WEDDING_DATE.getMonth().toString().padStart(2, "0")}/${WEDDING_DATE.getDate()}`;
const year = WEDDING_DATE.getFullYear();

onMount(() => {
	gsap.to("#btn-open", {
		duration: 3,
		repeat: -1,
		ease: "back.inOut",
		boxShadow: "rgb(216, 216, 208, 0.5) 0px 4px 12px",
	});
});
</script>


<div class="w-dvw h-dvh flex" transition:blur={{ duration: 750, delay: 150, opacity: 80  }}>
  <img
    src="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/message.webp"
    alt="background-welcome"
    class="w-full h-full object-cover self-end relative"
    loading="eager"
    fetchpriority="high"
  >
  <div class="w-full h-full z-10 absolute bg-olive/50 text-olive-200 flex flex-col justify-between p-12">
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
      <button class="mt-4 text-sm bg-olive-300 p-3 rounded-sm text-stone-500" type="button" onclick={onOpen} id="btn-open">
        OPEN INVITATION
      </button>
    </div>
  </div>
</div>