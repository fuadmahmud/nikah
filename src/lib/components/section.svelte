<script lang="ts">
import clsx from "$lib/utils/clsx";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
interface SectionProps extends HTMLAttributes<HTMLElement> {
	imgUrl: string;
	imgAlt: string;
	children: Snippet<[]>;
	classNames?: string;
	textContainerClass?: string;
	overlayClass?: string;
}

const {
	id,
	imgUrl,
	imgAlt,
	classNames,
	textContainerClass,
	children,
	overlayClass,
	...props
}: SectionProps = $props();
const rootClass = $derived(
	clsx(
		"h-svh w-full relative flex flex-col will-change-transform backface-hidden",
		"snap-start bg-cover bg-center bg-no-repeat bg-origin-padding",
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
	style="background-image: url({imgUrl})"
	role="img"
	aria-label={imgAlt ?? `bg-${id}`}
	{...props}
>
	<div class={clsx(
		"bg-black/30 h-full w-full absolute inset-0 z-10",
		overlayClass || ''
	)}></div>
	<div class={contentClass}>
		{@render children()}
	</div>
</section>
