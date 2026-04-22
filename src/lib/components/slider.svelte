<script lang="ts">
import { onMount, onDestroy, type Snippet } from "svelte";
import { PUBLIC_S3_URL } from "$env/static/public";
import { gsap } from "gsap";

interface SliderProps {
	children: Snippet<[]>;
}

const slides = [
	`${PUBLIC_S3_URL}/slider-1.webp`,
	`${PUBLIC_S3_URL}/slider-2.webp`,
	`${PUBLIC_S3_URL}/slider-3.webp`,
];
const SLIDE_DURATION = 2;
const TRANSITION = 1.3;

let gsapCtx: gsap.Context;
let current = $state(0);
let slidesTL: gsap.core.Timeline;
const { children }: SliderProps = $props();

const slideEls: HTMLElement[] = $state([]);

function buildTransitionSegment(tl: gsap.core.Timeline, fromIdx: number) {
	const toIdx = (fromIdx + 1) % slides.length;

	const fromEl = slideEls[fromIdx];
	const toEl = slideEls[toIdx];

	// Each segment starts at a labelled position so repeat:-1 replays cleanly
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
				current = toIdx;
				// Bring incoming slide underneath at scale 0.94, then grow it
				gsap.set(toEl, { zIndex: 1, opacity: 0, scale: 0.94 });
				gsap.set(fromEl, { zIndex: 2 });
			},
			onComplete: () => {
				gsap.set(fromEl, { opacity: 1, scale: 1, zIndex: 0 });
			},
		},
		`${label}+=${SLIDE_DURATION}`,
	)

		// Incoming: fade in + scale up to natural size
		.to(
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

function startAutoplay() {
	slidesTL?.play();
}

function stopAutoplay() {
	slidesTL?.pause();
}

onMount(() => {
	gsapCtx = gsap.context(() => {
		slideEls.forEach((el, i) => {
			gsap.set(el, { zIndex: i === 0 ? 1 : 0 });
		});

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

		slidesTL = gsap.timeline({ repeat: -1, delay: 2 });

		for (let i = 0; i < slides.length; i++) {
			buildTransitionSegment(slidesTL, i);
		}
	});

	startAutoplay();
});

onDestroy(() => {
	stopAutoplay();
	gsapCtx?.clear();
});
</script>

<!-- Slider root -->
<div class="w-full h-dvh">
  <div
    role="region"
    aria-label="Background image slider"
    class="relative h-full w-full overflow-hidden bg-backdrop font-opensans cursor-default snap-start"
    onmouseenter={stopAutoplay}
    onmouseleave={startAutoplay}
  >
    <!-- Slides -->
    {#each slides as slide, i (slide)}
      <div
        bind:this={slideEls[i]}
        aria-hidden={i !== current}
        class="absolute inset-0 overflow-hidden"
      >
        <!-- Parallax bg — inset -8% gives room for the parallax shift -->
        <div
          class="bg-img absolute bg-cover bg-center will-change-transform"
          style="inset: -8%; background-image: url('{slide}')"
        ></div>

        <!-- Gradient overlay -->
        <div
          class="absolute inset-0"
          style="background: linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)"
        ></div>
      </div>
    {/each}
    <div class="z-10 absolute inset-0 h-full w-full flex flex-col text-olive-200 p-12 items-center-safe bg-black/20">
      {@render children()}
    </div>
  </div>
</div>