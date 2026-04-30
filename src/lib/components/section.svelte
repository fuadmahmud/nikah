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
}

const {
	id,
	imgUrl,
	classNames,
	textContainerClass,
	children,
	...props
}: SectionProps = $props();
const rootClass = $derived(
	clsx("w-full relative snap-start flex flex-col", classNames ?? ""),
);
const contentClass = $derived(
	clsx(
		"relative w-full text-olive-300 flex flex-col p-8",
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
		class="min-h-dvh relative w-full lg:mx-auto lg:max-w-160 bg-cover bg-center bg-no-repeat will-change-transform flex flex-col"
		style="background-image: url('{imgUrl}');"
	>
		<div class="bg-black/50 h-full w-full absolute inset-0"></div>
		<div class={contentClass}>
			{@render children()}
		</div>
	</div>
</section>
