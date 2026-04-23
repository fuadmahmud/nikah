<script lang="ts">
import Section from "./section.svelte";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { onDestroy, onMount } from "svelte";
import Slider from "./slider.svelte";
import { PUBLIC_S3_URL } from "$env/static/public";
import Person from "./person.svelte";
import { blur } from "svelte/transition";
import Gallery from "./gallery.svelte";
import Location from "./location.svelte";
import Gift from "./gift.svelte";
import Wishes from "./wishes.svelte";

gsap.registerPlugin(ScrollTrigger, SplitText);

let gsapCtx: gsap.Context;
let audioEl: HTMLAudioElement;
let isAudioPlay = $state(true);
let audioTimeout: ReturnType<typeof setTimeout>;

onMount(async () => {
	await document.fonts.ready;

	gsapCtx = gsap.context(() => {
		ScrollTrigger.defaults({ scroller: ".parent" });
		gsap.set(".surah-text", { visibility: "hidden" });

		const surahTween = gsap.from(".surah-text", {
			yPercent: -20,
			autoAlpha: 0,
			duration: 2,
			stagger: 0.05,
			ease: "power3.out",
			immediateRender: false,
		});

		ScrollTrigger.create({
			trigger: "#surah",
			start: "top 80%",
			end: "bottom 20%",
			onEnter: () => surahTween.restart(true),
			onEnterBack: () => surahTween.restart(true),
			onLeave: () => gsap.set(".surah-text", { yPercent: 20, opacity: 0 }),
			onLeaveBack: () => gsap.set(".surah-text", { yPercent: 20, opacity: 0 }),
		});

		SplitText.create(".journey-text", {
			type: "words",
			reduceWhiteSpace: true,
			onSplit: (self) => {
				gsap.from(self.words, {
					scrollTrigger: {
						trigger: "#journey",
						start: "top 80%",
					},
					opacity: 0,
					autoAlpha: 0,
					stagger: 0.1,
					duration: 3,
				});
			},
		});

		ScrollTrigger.refresh();
	});

	audioTimeout = setTimeout(() => {
		audioEl.play();
	}, 1100);

	document.addEventListener("visibilitychange", handleVisibilityChange);
});

onDestroy(() => {
	gsapCtx?.kill();
	clearTimeout(audioTimeout);
	document.removeEventListener("visibilitychange", handleVisibilityChange);
});

function handleMusic() {
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
  class="h-dvh w-dvw overflow-x-hidden overflow-y-scroll snap-y snap-mandatory parent font-opensans"
  in:blur={{ duration: 900, delay: 1100, opacity: 80 }}
>
  <!-- Opening Section -->
  <Slider>
    <div class="flex flex-col gap-2 text-center items-center justify-center">
      <p class="font-playfair text-xl mb-4">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
      <p class="font-light tracking-wide text-xs">THE WEDDING OF</p>
      <h5 class="text-2xl font-playfair font-light tracking-wider">ANGGITA & FUAD</h5>	
    </div>
    <div class="arrow border rounded-full border-olive-300 h-10 w-10 p-2 relative mt-2 flex items-center justify-center">
      <i class="fa-solid fa-angle-down font-light -mt-1"></i>
    </div>
  </Slider>

  <Section
    id="surah"
    imgUrl="{PUBLIC_S3_URL}/seating.webp"
    imgAlt="surah"
  >
    <div class="text-left h-max overflow-hidden rounded-md p-2 mt-[25%]">
      <div class="surah-text flex flex-col justify-end gap-4">
        <h2 class="text-2xl font-playfair tracking-wide">Q.S. AR-RUM: 21</h2>
        <p class="font-opensans font-light text-sm/5">Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.</p>
      </div>
    </div>
  </Section>

  <Person
    role="bride"
    imgEndpoint="bride.webp"
    name="Anggita Kusuma Putri"
    child="Putri terakhir"
    parent="Bapak Anwar Kusni dan Ibu Sri Suripni"
    social="@anggitaaksm_"
    position="left"
  />

  <Person
    role="groom"
    imgEndpoint="groom.webp"
    name="Fuad Mahmud Ibrahim"
    child="Putra pertama"
    parent="Alm. H. Sunarto dan Hj. Puspita Sari"
    social="@fuadmahmudi"
    position="right"
  />

  <Location />

  <Section
    id="journey"
    imgUrl="{PUBLIC_S3_URL}/journey.webp"
    imgAlt="journey"
    textContainerClass="p-8"
  >
    <div class="flex flex-col text-left h-full justify-center gap-4 my-auto">
      <h2 class="text-2xl font-playfair text-center">OUR JOURNEY</h2>
      <div class="journey-text font-light font-opensans text-[3vw] md:text-base">
        Terkadang, dua orang yang sudah begitu dekat jaraknya, justru dipertemukan pada waktu yang paling tepat.
        <br />
        <br />
        <b>Agustus 2023</b>
        <br />
        Kami dipertemukan di acara lamaran seorang teman, yang ternyata menjadi titik awal cerita kami. Sebenarnya kami sudah berada di lingkungan yang sama sejak lama, dan keluarga yang sudah saling mengenal, namun kami baru bertemu satu sama lain saat itu.
        <br />
        <br />
        Sejak hari itu, sebuah langkah kecil dimulai.
        Fuad memberanikan diri menyapa melalui media sosial, dan dari percakapan sederhana, tumbuh rasa nyaman yang perlahan  mendekatkan kami. 
        <br />
        <br />
        <b>Desember 2023</b>
        <br />
        Kami memilih untuk berjalan bersama, saling menjaga, dan menguatkan dalam satu tujuan yang sama.
        <br />
        <br />
        <b>Januari 2026</b>
        <br />
        Kami mengikat niat dalam sebuah lamaran, menyatukan dua keluarga dalam satu harapan.
        <br />
        <br />
        <b>Mei 2026</b>
        <br />
        Akan menjadi awal dari selamanya langkah baru sebagai dua hati yang dipersatukan dalam satu ikatan suci. 
      </div>
    </div>
  </Section>

  <Gallery />

  <Wishes />

  <Gift />

  <Section
    id="closing"
    imgUrl={`${PUBLIC_S3_URL}/closing.webp`}
    imgAlt="closing"
  >
    <div class="flex flex-col text-center h-full justify-center gap-4 text-shadow-lg">
      <h2 class="text-2xl font-light font-playfair">UCAPAN TERIMA KASIH</h2>
      <p class="text-sm font-light">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
        Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
        kehadiran dan doa restunya, kami mengucapkan terima kasih.
      </p>
      <p class="text-sm">Wassalamu'alaikum Wr. Wb.</p>
      <h4 class="text-2xl font-dancing tracking-wider">FUAD & ANGGITA</h4>
    </div>
  </Section>
  
  <button
    class="fixed right-4 top-1/12 z-30 backdrop-blur-xs bg-white/30 text-olive-300 p-4 h-6 w-6 rounded-full flex items-center justify-center"
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

  <audio bind:this={audioEl} loop class="hidden">
    <source src="{PUBLIC_S3_URL}/bg-music.mp3" type="audio/mp3" />
  </audio>
</div>

<style lang="scss">
  .parent {
    position: relative;
  }
</style>