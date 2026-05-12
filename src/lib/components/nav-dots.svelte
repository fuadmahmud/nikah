<script lang="ts">
import { ScrollTrigger } from "$lib/utils/gsap";
import clsx from "clsx";

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

	const newSection = [
		...sections,
		{ id: "groom", label: "Groom" },
		{ id: "bride", label: "Bride" },
	];
	for (const section of newSection) {
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
	class={clsx(
		"fixed bottom-0 -translate-y-1/2 z-50 flex flex-col gap-3 font-opensans",
		activeSection === "groom"
			? "left-4"
			: "right-4"
	)}
>
	{#each sections as section (section.id)}
		<button
			type="button"
			title={section.label}
			class={clsx(
				"group flex items-center justify-end gap-2",
				activeSection === "groom"
					? "flex-row-reverse"
					: ""
			)}
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