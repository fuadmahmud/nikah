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
	imgLoading?: "lazy" | "eager";
	imgFetchPriority?: "high" | "low" | "auto";
	overlayClass?: string;
}

const {
	id,
	imgUrl,
	classNames,
	textContainerClass,
	children,
	overlayClass,
	...props
}: SectionProps = $props();
const rootClass = $derived(
	clsx(
		"min-h-svh w-full relative snap-start flex flex-col will-change-transform backface-hidden",
		classNames ?? "",
	),
);
const contentClass = $derived(
	clsx(
		"relative w-full text-white flex flex-col p-8 z-20",
		textContainerClass ?? "",
	),
);
</script>

<section class={rootClass} id={id} {...props}>
	<div class="absolute inset-0 hidden lg:grid lg:grid-cols-[1fr_minmax(0,40rem)_1fr]">
		<div
			class="bg-cover bg-center blur-xl scale-110 opacity-50"
			style={`background-image: url('${imgUrl}')`}
			aria-hidden="true"
		></div>
		<div aria-hidden="true"></div>
		<div
			class="bg-cover bg-center blur-xl scale-110 opacity-50"
			style={`background-image: url('${imgUrl}')`}
			aria-hidden="true"
		></div>
	</div>

	<div
		class="min-h-dvh relative w-full lg:mx-auto lg:max-w-160 flex flex-col"
	>
		<img
			src={imgUrl}
			alt="bg-{id}"
			class="absolute inset-0 object-cover h-full w-full"
			loading="eager"
		/>
		<div class={clsx(
			"bg-black/30 h-full w-full absolute inset-0 z-10",
			overlayClass || ''
		)}></div>
		<div class={contentClass}>
			{@render children()}
		</div>
	</div>
</section>
