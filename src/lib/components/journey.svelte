<script lang="ts">
import { PUBLIC_S3_URL } from "$env/static/public";
import { onMount } from "svelte";
import Section from "./section.svelte";
import { gsap, SplitText } from "$lib/utils/gsap";
import { GALLERY_IMAGES } from "../../constants";

let imagesPreloaded = $state(false);
let wrapperEl: HTMLDivElement;

// Preload all gallery images into browser cache
function preloadImages() {
	if (imagesPreloaded) return;
	// biome-ignore lint/complexity/noForEach: <explanation>
	GALLERY_IMAGES.forEach((src) => {
		const img = new Image();
		img.src = src;
	});
	imagesPreloaded = true;
}

onMount(async () => {
	await document.fonts.ready;

	SplitText.create(".journey-text", {
		type: "words",
		reduceWhiteSpace: true,
		onSplit: (self) => {
			gsap.from(self.words, {
				scrollTrigger: {
					trigger: wrapperEl,
					start: "top 80%",
				},
				opacity: 0,
				autoAlpha: 0,
				stagger: 0.1,
				duration: 3,
			});
		},
	});

	if (!imagesPreloaded) preloadImages();
});
</script>
<Section
    id="journey"
    imgUrl="{PUBLIC_S3_URL}/journey.webp"
    imgAlt="journey"
    textContainerClass="p-8"
  >
    <div class="flex flex-col text-left h-full justify-center gap-4 my-auto" bind:this={wrapperEl}>
      <h2 class="text-2xl font-noto text-center">OUR JOURNEY</h2>
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