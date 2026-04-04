<script lang="ts">
import type { Snippet } from "svelte";

interface SectionProps {
	id: string;
	imgUrl: string;
	imgAlt: string;
	children: Snippet<[]>;
}

const { id, imgUrl, imgAlt, children }: SectionProps = $props();
</script>


<section class="h-full w-full relative" id={id}>
    <img
      src={imgUrl}
      alt={imgAlt}
      class="w-full h-full object-cover"
    >
    <div class="w-full h-full z-10 bg-black/35 absolute top-0 text-white flex flex-col p-8">
      {@render children()}
    </div>
  </section>