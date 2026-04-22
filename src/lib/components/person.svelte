<script lang="ts">
import { PUBLIC_S3_URL } from "$env/static/public";
import { onDestroy, onMount } from "svelte";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./section.svelte";

interface Person {
	imgEndpoint: string;
	role: string;
	name: string;
	child: string;
	parent: string;
	social: string;
	position: "left" | "right";
}

const { imgEndpoint, role, name, child, parent, social, position }: Person =
	$props();
const classes = $derived(
	position === "left"
		? "flex flex-col gap-2 justify-end text-left mt-auto person-wrapper"
		: "flex flex-col gap-2 justify-end text-right items-end p-2 w-full mt-auto person-wrapper",
);

let socialEl: HTMLAnchorElement;
let wrapperEl: HTMLDivElement;
let gsapCtx: gsap.Context | undefined;

gsap.registerPlugin(ScrollTrigger);

onMount(async () => {
	await document.fonts.ready;

	const xFrom = position === "left" ? -60 : 60;
	const scrollerEl = document.querySelector<HTMLElement>(".parent");

	gsapCtx = gsap.context(() => {
		const textTargets =
			wrapperEl.querySelectorAll<HTMLElement>(".person-anim-text");

		for (const target of textTargets) {
			gsap.set(target, { visibility: "hidden" });
		}
		gsap.set(socialEl, { visibility: "hidden" });

		const tl = gsap.timeline({
			scrollTrigger: {
				id: `person-${role}`,
				...(scrollerEl ? { scroller: scrollerEl } : {}),
				trigger: wrapperEl,
				start: "top 85%",
				onEnter: () => tl.restart(true),
				onEnterBack: () => tl.restart(true),
				invalidateOnRefresh: true,
			},
		});

		tl.from([...textTargets, socialEl], {
			x: xFrom,
			autoAlpha: 0,
			duration: 2,
			stagger: 0.25,
			ease: "power3.out",
		});

		ScrollTrigger.refresh();
	}, wrapperEl);
});

onDestroy(() => {
	gsapCtx?.kill();
});
</script>
<Section
  id={role}
  imgUrl="{PUBLIC_S3_URL}/{imgEndpoint}"
  imgAlt={role}
>
  <div bind:this={wrapperEl} class={classes}>
    <p class="person-anim-text overflow-hidden font-playfair uppercase text-sm">THE {role}</p>
    <h3 class="person-anim-text overflow-hidden text-2xl font-playfair border-t pt-1 w-max">{name}</h3>
    <i class="person-anim-text overflow-hidden font-opensans text-sm font-light">{child}</i>
    <p class="person-anim-text overflow-hidden font-opensans text-sm font-light">{parent}</p>
    <a
      bind:this={socialEl}
      href="https://www.instagram.com/{social.slice(1)}/"
      referrerpolicy="no-referrer"
      target="_blank"
      rel="no-referrer"
      class="overflow-hidden backdrop-blur-xs bg-white/30 p-1 rounded-md w-max flex flex-row items-center">
      <i class="fa-brands fa-instagram"></i>
      <span class="pr-0.5 text-sm ml-0.5">{social}</span>
    </a>
  </div>
</Section>