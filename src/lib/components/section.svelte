<script lang="ts">
import clsx from "$lib/utils/clsx";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { EnhancedImage } from "../../types";
interface SectionProps extends HTMLAttributes<HTMLElement> {
	imgAlt: string;
	bgImage: EnhancedImage;
	children: Snippet<[]>;
	classNames?: string;
	textContainerClass?: string;
	overlayClass?: string;
}

const {
	id,
	imgAlt,
	classNames,
	textContainerClass,
	children,
	overlayClass,
	bgImage,
	...props
}: SectionProps = $props();
const rootClass = $derived(
	clsx(
		"h-svh w-svw relative flex flex-col will-change-transform snap-start",
		classNames ?? "",
	),
);
const contentClass = $derived(
	clsx(
		"relative w-full text-white flex flex-col p-8 z-20 lg:mx-auto lg:max-w-160",
		textContainerClass ?? "",
	),
);
</script>

<section
	class={rootClass}
	id={id}
	{...props}
>
	<enhanced:img
		alt={imgAlt}
		class="h-svh w-svw absolute inset-0 object-cover object-center will-change-transform"
		src={bgImage}
		fetchpriority="high"
	/>
	<div class={clsx(
		"bg-black/30 h-full w-full absolute inset-0 z-10",
		overlayClass || ''
	)}></div>
	<div class={contentClass}>
		{@render children()}
	</div>
</section>
