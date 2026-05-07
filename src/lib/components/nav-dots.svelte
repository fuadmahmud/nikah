<script lang="ts">
import { ScrollTrigger } from "$lib/utils/gsap";

interface Props {
	scrollContainer: HTMLDivElement;
}

const { scrollContainer }: Props = $props();

const sections = [
	{ id: "date", label: "Date" },
	{ id: "gallery", label: "Gallery" },
	{ id: "wish-form", label: "RSVP" },
];

let activeSection = $state("");

$effect(() => {
	if (!scrollContainer) return;

	for (const section of sections) {
		const el = document.getElementById(section.id);
		if (!el) return;

		ScrollTrigger.create({
			trigger: el,
			scroller: scrollContainer,
			start: "top center",
			end: "bottom center",
			onEnter: () => {
				activeSection = section.id;
			},
			onEnterBack: () => {
				activeSection = section.id;
			},
		});
	}
});

function scrollToSection(id: string) {
	const el = document.getElementById(id);
	if (!el || !scrollContainer) return;
	el.scrollIntoView({ behavior: "smooth" });
}
</script>

<div
	class="fixed right-4 bottom-0 -translate-y-1/2 z-50 flex flex-col gap-3 font-opensans"
>
	{#each sections as section (section.id)}
		<button
			type="button"
			title={section.label}
			class="group flex items-center justify-end gap-2"
			onclick={() => scrollToSection(section.id)}
		>
			<span
				class="text-xs text-white transition-colors duration-300 font-light"
			>
				{section.label}
			</span>
			<span
				class="block w-0.5 h-4 rounded-full border border-white/60 transition-all duration-300 {activeSection === section.id
					? 'bg-white scale-125'
					: 'bg-transparent hover:bg-white/40'}"
			></span>
		</button>
	{/each}
</div>