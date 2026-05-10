<script lang="ts">
import Section from "../components/section.svelte";
import { gsap, ScrollTrigger, SplitText } from "$lib/utils/gsap";
import { onMount, onDestroy } from "svelte";
import Slider from "../components/slider.svelte";
import { PUBLIC_S3_URL } from "$env/static/public";
import Person from "../components/person.svelte";
import { blur } from "svelte/transition";
import Gallery from "../components/gallery.svelte";
import Location from "../components/location.svelte";
import Gift from "../components/gift.svelte";
import Wishes from "../components/wishes.svelte";
import WishForm from "../components/wish-form.svelte";
import Journey from "$lib/components/journey.svelte";
import NavDots from "$lib/components/nav-dots.svelte";
import Seating from "$lib/assets/images/surah/seating.webp?enhanced";
import Closing from "$lib/assets/images/closing/closing.webp?enhanced";

let audioEl: HTMLAudioElement;
let isAudioPlay = $state(true);
let audioTimeout: ReturnType<typeof setTimeout>;
let scrollContainer: HTMLDivElement | undefined = $state(undefined);
let closingEl: HTMLDivElement;
let gsapCtx: gsap.Context | undefined;

onMount(async () => {
	await document.fonts.ready;

	ScrollTrigger.defaults({
		scroller: scrollContainer,
		toggleActions: "restart pause resume pause",
	});

	requestAnimationFrame(() => {
		gsapCtx = gsap.context(() => {
			gsap.set(".surah-text", { visibility: "hidden" });

			gsap.from(".surah-text", {
				yPercent: -20,
				autoAlpha: 0,
				duration: 2,
				stagger: 0.05,
				ease: "power3.out",
				scrollTrigger: {
					trigger: "#surah",
				},
				delay: 0.5,
			});

			const blocks = [
				closingEl.querySelector("h2"),
				...closingEl.querySelectorAll("p"),
				closingEl.querySelector("h4"),
			];

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: closingEl,
					start: "top 80%",
					toggleActions: "play pause resume none",
				},
			});

			for (const block of blocks) {
				const split = SplitText.create(block, {
					type: "lines",
					reduceWhiteSpace: true,
				});

				tl.from(
					split.lines,
					{
						opacity: 0,
						autoAlpha: 0,
						y: 30,
						stagger: 0.05,
						duration: 1,
					},
					"+=0.1",
				);
			}
		});
	});

	audioTimeout = setTimeout(() => {
		audioEl.play();
	}, 1000);

	document.addEventListener("visibilitychange", handleVisibilityChange);
});

onDestroy(() => {
	gsapCtx?.kill();
	clearTimeout(audioTimeout);
	document.removeEventListener("visibilitychange", handleVisibilityChange);
});

function handleMusic() {
	if (!audioEl) return;
	if (isAudioPlay) {
		audioEl.pause();
	} else {
		audioEl.play();
	}
	isAudioPlay = !isAudioPlay;
}

function handleVisibilityChange() {
	const visibility = document.visibilityState === "visible";

	if (!visibility) {
		audioEl.pause();
	} else {
		audioEl.play();
	}
	isAudioPlay = visibility;
}
</script>

<div
  class="h-svh w-full overflow-y-scroll snap-y snap-mandatory parent font-opensans scroll-none"
  in:blur={{ duration: 900, delay: 1100, opacity: 80 }}
  bind:this={scrollContainer}
>
  <!-- Opening Section -->
  <Slider id="opening">
    <div class="flex flex-col gap-2 text-center items-center justify-center">
      <p class="font-noto text-xl mb-4">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
      <p class="font-light tracking-wide text-xs">THE WEDDING OF</p>
      <h5 class="text-2xl font-noto font-light tracking-wider">ANGGITA & FUAD</h5>	
    </div>
    <div class="arrow border rounded-full border-olive-300 h-10 w-10 p-2 relative mt-2 flex items-center justify-center">
      <i class="fa-solid fa-angle-down font-light -mt-1"></i>
    </div>
  </Slider>

  <Section
    id="surah"
    imgAlt="surah"
    bgImage={Seating}
  >
    <div class="text-left h-max overflow-hidden rounded-md p-2 mt-[25%]">
      <div class="surah-text flex flex-col justify-end gap-4 text-shadow-readable">
        <h2 class="text-2xl font-noto tracking-wide">Q.S. AR-RUM: 21</h2>
        <p class="font-opensans font-light text-sm/5">Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.</p>
      </div>
    </div>
  </Section>

  <Person
    role="bride"
    name="Anggita Kusuma Putri"
    child="Putri terakhir"
    parent="Bapak Anwar Kusni dan Ibu Sri Suripni"
    social="@anggitaaksm_"
    position="left"
  />

  <Person
    role="groom"
    name="Fuad Mahmud Ibrahim"
    child="Putra pertama"
    parent="Alm. H. Sunarto dan Hj. Puspita Sari"
    social="@fuadmahmudi"
    position="right"
  />

  <Location />

  <Journey />

  <Gallery />

  <WishForm />

  <Wishes />

  <Gift />

  <Section
    id="closing"
    imgAlt="closing"
    bgImage={Closing}
    textContainerClass="h-svh"
  >
    <div class="closing-text font-light text-center" bind:this={closingEl}>
      <h2 class="text-2xl font-noto">UCAPAN TERIMA KASIH</h2>
      <div class="mt-4">
        <p class="text-sm">Kami mohon maaf apabila ada salah dalam penyebutan nama ataupun gelar.</p>
      </div>
      <div class="mt-4">
        <p class="text-sm">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
          kehadiran dan doa restunya, kami mengucapkan terima kasih.
        </p>
      </div>
      <div class="mt-4">
        <p class="text-sm">Wassalamu'alaikum Wr. Wb.</p>
      </div>
      <div class="mt-4">
        <h4 class="text-2xl font-noto tracking-wider">ANGGITA & FUAD</h4>
      </div>
    </div>
    <p class="mt-auto text-xs font-light text-center">Made with 🤍 by Anggita & Fuad</p>
  </Section>
</div>

<button
  class="fixed right-4 top-1/12 z-30 backdrop-blur-xs bg-white/30 text-white size-6 p-4 rounded-full flex items-center justify-center"
  type="button"
  title="Pause music"
  onclick={handleMusic}
>
  {#if isAudioPlay}
    <i class="fa-solid fa-pause"></i>
  {:else}
    <i class="fa-solid fa-play"></i>
  {/if}
</button>
<NavDots {scrollContainer} />

<audio bind:this={audioEl} loop class="hidden">
  <source src="{PUBLIC_S3_URL}/bg-music.mp3" type="audio/mp3" />
</audio>

<style lang="scss">
  .parent {
    position: relative;
    -webkit-overflow-scrolling: touch;
    transform: translate3d(0,0,0);
    -webkit-transform: translate3d(0,0,0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
</style>