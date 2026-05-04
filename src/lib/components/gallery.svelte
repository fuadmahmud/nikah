<script lang="ts">
import { PUBLIC_S3_URL } from "$env/static/public";
import { fly } from "svelte/transition";
import Section from "./section.svelte";
import { GALLERY_IMAGES as photos } from "../../constants";

let currentPhoto = $state(0);
let direction = $state(1);

function nextPhoto() {
	if (currentPhoto === photos.length - 1) return;
	direction = 1;
	currentPhoto = currentPhoto + 1;
}

function previousPhoto() {
	if (currentPhoto === 0) return;
	direction = -1;
	currentPhoto = currentPhoto - 1;
}
</script>
<Section
  id="gallery"
  imgUrl={`${PUBLIC_S3_URL}/journey.webp`}
  imgAlt="gallery"
  textContainerClass="h-dvh bg-black/20 p-4"
>
  <div class="flex flex-col text-left gap-4 h-full relative overflow-hidden">
    <div class="relative w-full h-full overflow-hidden">
      {#key currentPhoto}
        <img
          src={photos[currentPhoto]}
          alt="Gallery"
          class="w-full h-full object-cover absolute inset-0 will-change-transform"
          in:fly={{ x: direction > 0 ? '100%' : '-100%', duration: 500, opacity: 1 }}
          out:fly={{ x: direction > 0 ? '-100%' : '100%', duration: 500, opacity: 1 }}
        />
      {/key}
    </div>
    <button
      onclick={nextPhoto}
      type="button"
      class="absolute top-1/2 right-0 p-2 text-white disabled:opacity-30 text-xl"
      title="Next"
      disabled={currentPhoto === photos.length - 1}
    >
      <i class="fa-solid fa-arrow-right"></i>
    </button>
    <button
      onclick={previousPhoto}
      type="button"
      class="absolute top-1/2 left-0 p-2 text-white disabled:opacity-30 text-xl"
      title="Previous"
      disabled={currentPhoto === 0}
    >
      <i class="fa-solid fa-arrow-left"></i>
    </button>
    <h2 class="text-2xl font-noto font-light w-full text-white mb-2 absolute bottom-0 text-center">OUR GALLERY</h2>
  </div>
</Section>
