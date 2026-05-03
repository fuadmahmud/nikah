<script lang="ts">
import { PUBLIC_S3_URL } from "$env/static/public";
import formatDate from "$lib/utils/formatDate";
import { onDestroy, onMount } from "svelte";
import { WEDDING_DATE } from "../../constants";
import Counter from "./counter.svelte";
import Section from "./section.svelte";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const ADDRESS =
	"Jl. Balai Rakyat, RT.8/RW.10, Utan Kayu Utara, Kec. Matraman, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13120";

let gsapCtx: gsap.Context | undefined;
let wrapperEl: HTMLDivElement;
let splitTextInstance: SplitText | undefined;

gsap.registerPlugin(ScrollTrigger, SplitText);

onMount(async () => {
	await document.fonts.ready;

	const scrollerEl = document.querySelector<HTMLElement>(".parent");

	gsapCtx = gsap.context(() => {
		splitTextInstance = SplitText.create(".text-scrub", {
			type: "words",
			reduceWhiteSpace: true,
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				...(scrollerEl ? { scroller: scrollerEl } : {}),
				trigger: wrapperEl,
				start: "top 80%",
				toggleActions: "restart restart none none",
			},
		});

		tl.fromTo(
			splitTextInstance.words,
			{ opacity: 0.4 },
			{
				opacity: 1,
				duration: 1,
				ease: "power1.out",
				stagger: {
					each: 0.4,
					from: "start",
				},
			},
		);
	});
});

onDestroy(() => {
	splitTextInstance?.revert();
	gsapCtx?.kill();
});
</script>

<Section
  id="date"
  imgUrl="{PUBLIC_S3_URL}/location.webp"
  imgAlt="date"
  textContainerClass="justify-center"
>
  <div class="flex flex-col gap-12" bind:this={wrapperEl}>
    <div class="flex flex-col justify-start gap-4 mb-4">
      <h2 class="text-2xl font-playfair text-scrub">{formatDate(WEDDING_DATE)?.toUpperCase()}</h2>
      <div class="h-px w-auto grow bg-white"></div>
      <div class="flex flex-row items-center justify-between">
        <p>
          <span class="font-playfair text-lg text-scrub">AKAD NIKAH</span>
          <br>
          <span class="font-light">16.00 WIB</span>
        </p>
        <p>
          <span class="font-playfair text-lg text-scrub">RESEPSI</span>
          <br>
          <span class="font-light">19.00 - 21.00 WIB</span>
        </p>
      </div>
      <div class="h-px w-auto grow bg-white"></div>
      <div class="font-opensans text-sm flex flex-col gap-1">
        <span class="font-playfair text-lg text-scrub">GOR MATRAMAN</span>
        <span class="font-light">{ADDRESS}</span>
        <a
          href="https://maps.app.goo.gl/hrQ8rohJTUW7kLoW9"
          referrerpolicy="no-referrer"
          target="_blank"
          rel="no-referrer"
          class="mt-4 text-sm text-center backdrop-blur-xs bg-white/30 p-3 rounded-sm text-white"
        >
          LIHAT LOKASI
        </a>
      </div>
    </div>
    <Counter />
  </div>
</Section>