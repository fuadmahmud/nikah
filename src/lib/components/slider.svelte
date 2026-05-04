<script lang="ts">
import { onMount, type Snippet } from "svelte";
import { PUBLIC_S3_URL } from "$env/static/public";
import { gsap } from "$lib/utils/gsap";

interface SliderProps {
	children: Snippet<[]>;
	id?: string;
	slides?: string[];
}

const DEFAULT_SLIDES = [
	`${PUBLIC_S3_URL}/slider-1.webp`,
	`${PUBLIC_S3_URL}/slider-2.webp`,
	`${PUBLIC_S3_URL}/slider-3.webp`,
];
const SLIDE_DURATION = 2;
const TRANSITION = 1.3;
const OPENING_ID = "opening";

let gsapCtx: gsap.Context;
let slidesTL: gsap.core.Timeline;
const { children, id, slides = DEFAULT_SLIDES }: SliderProps = $props();

const slideEls: HTMLImageElement[] = [];

function buildTransitionSegment(tl: gsap.core.Timeline, fromIdx: number) {
	const toIdx = (fromIdx + 1) % slides.length;
	const fromEl = slideEls[fromIdx];
	const toEl = slideEls[toIdx];

	if (!fromEl || !toEl) return;

	const label = `slide-${fromIdx}`;
	tl.addLabel(label);

	tl.to(
		fromEl,
		{
			opacity: 0,
			scale: 1.06,
			duration: TRANSITION,
			ease: "power2.inOut",
			onStart: () => {
				gsap.set(toEl, { zIndex: 1, opacity: 0, scale: 0.94 });
				gsap.set(fromEl, { zIndex: 2 });
			},
			onComplete: () => {
				// Reset the slide so it's ready for its next appearance
				gsap.set(fromEl, { opacity: 1, scale: 1, zIndex: 0 });
			},
		},
		`${label}+=${SLIDE_DURATION}`,
	).to(
		toEl,
		{
			opacity: 1,
			scale: 1,
			duration: TRANSITION,
			ease: "power2.inOut",
		},
		`${label}+=${SLIDE_DURATION}`,
	);
}

onMount(() => {
	// gsap.context handles all scoped animations
	gsapCtx = gsap.context(() => {
		// Initial setup
		slideEls.forEach((el, i) => {
			if (el)
				gsap.set(el, { zIndex: i === 0 ? 1 : 0, opacity: i === 0 ? 1 : 0 });
		});

		if (OPENING_ID === id) {
			gsap.to(".arrow", {
				duration: 1.5,
				repeat: -1,
				boxShadow: "rgba(216, 216, 208, 0.5) 0px 0px 12px",
			});
			gsap.to(".fa-angle-down", {
				duration: 1.5,
				repeat: -1,
				y: 10,
			});
		}

		slidesTL = gsap.timeline({ repeat: -1, delay: 1 });

		for (let i = 0; i < slides.length; i++) {
			buildTransitionSegment(slidesTL, i);
		}
	});

	return () => {
		gsapCtx?.revert();
	};
});
</script>

<!-- Slider root -->
<div class="min-h-svh w-full" id={id}>
  <div
    role="region"
    aria-label="Background image slider"
    class="relative min-h-dvh w-full bg-backdrop font-opensans cursor-default snap-start overflow-hidden"
  >
    <!-- Slides -->
    {#each slides as slide, i (slide)}
			<img
				bind:this={slideEls[i]}
				src={slide}
				alt="slide-{i}"
				loading="eager"
				fetchpriority="high"
				class="absolute object-cover will-change-transform inset-0 h-full w-full"
			>
    {/each}
		<div class="bg-black/30 h-full w-full absolute inset-0 z-10"></div>
    <div class="z-20 relative w-full flex flex-col text-white p-8 items-center-safe">
      {@render children()}
    </div>
  </div>
</div>