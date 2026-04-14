<script lang="ts">
import clsx from "$lib/utils/clsx";
import type { Snippet } from "svelte";
interface SectionProps {
	id: string;
	imgUrl: string;
	imgAlt: string;
	children: Snippet<[]>;
	classNames?: string;
	textContainerClass?: string;
}

const {
	id,
	imgUrl,
	imgAlt,
	classNames,
	textContainerClass,
	children,
}: SectionProps = $props();
const classes = $derived(
	clsx(
		"h-dvh w-full relative snap-start flex flex-col overflow-hidden",
		classNames ?? "",
	),
);
const textContainerClasses = $derived(
	clsx(
		"w-full h-full z-10 text-olive-200 absolute flex flex-col bg-linear-to-t from-black/70 to-transparent to-40% p-4",
		textContainerClass ?? "",
	),
);
</script>

<section class={classes} id={id}>
	<img
		src={imgUrl}
		alt={imgAlt}
		class="w-full h-full object-cover"
	>
	<div class={textContainerClasses}>
		{@render children()}
	</div>
</section>
