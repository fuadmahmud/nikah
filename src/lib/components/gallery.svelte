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
      onclick={previousPhoto}
      type="button"
      class="absolute top-1/2 left-3 text-white disabled:text-white/30 flex items-center justify-center text-sm"
      title="Previous"
      disabled={currentPhoto === 0}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z">
        </path>
      </svg>
    </button>
    <button
      onclick={nextPhoto}
      type="button"
      class="absolute top-1/2 right-3 text-white disabled:text-white/30 text-sm"
      title="Next"
      disabled={currentPhoto === photos.length - 1}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z">
        </path>
      </svg> 
    </button>
    <h2 class="text-2xl font-noto font-light w-full text-white mb-2 absolute bottom-8 text-center">OUR GALLERY</h2>
    <i class="text-sm font-light absolute left-3 bottom-2">{currentPhoto + 1}/{photos.length}</i>
  </div>
</Section>
