<script lang="ts">
import clsx from "$lib/utils/clsx";
import type { Snippet } from "svelte";

interface SectionProps {
	id: string;
	imgUrl: string;
	imgAlt: string;
	children: Snippet<[]>;
	classNames?: string;
}

const { id, imgUrl, imgAlt, classNames, children }: SectionProps = $props();
const classes = $derived(
	clsx(
		"h-screen w-full relative snap-start flex flex-col overflow-hidden",
		classNames ?? "",
	),
);
</script>


<section class={classes} id={id}>
    <img
      src={imgUrl}
      alt={imgAlt}
      class="w-full h-full object-cover"
    >
    <div class="w-full h-full z-10 bg-white/5 text-olive-200 absolute top-0 flex flex-col p-8">
      {@render children()}
    </div>
  </section>