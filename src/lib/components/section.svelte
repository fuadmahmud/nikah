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
	imgLoading?: "lazy" | "eager";
	imgFetchPriority?: "high" | "low" | "auto";
}

const {
	id,
	imgUrl,
	imgAlt,
	imgLoading = "lazy",
	imgFetchPriority = "auto",
	classNames,
	textContainerClass,
	children,
}: SectionProps = $props();
const classes = $derived(
	clsx("min-h-dvh w-full relative snap-start flex flex-col", classNames ?? ""),
);
const textContainerClasses = $derived(
	clsx(
		"w-full min-h-full inset-0 z-10 text-olive-200 absolute flex flex-col bg-black/35 p-8",
		textContainerClass ?? "",
	),
);
</script>

<section class={classes} id={id}>
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

	<div class="relative h-dvh w-full lg:mx-auto lg:max-w-160">
		<img
			src={imgUrl}
			alt={imgAlt}
			class="w-full h-full object-cover will-change-transform"
			loading={imgLoading}
			fetchpriority={imgFetchPriority}
		>
		<div class={textContainerClasses}>
			{@render children()}
		</div>
	</div>
</section>
