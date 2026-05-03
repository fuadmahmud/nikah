<script lang="ts">
import { PUBLIC_S3_URL } from "$env/static/public";
import { fly } from "svelte/transition";
import Section from "./section.svelte";

const photos = [
	`${PUBLIC_S3_URL}/background.webp`,
	`${PUBLIC_S3_URL}/wish-1.webp`,
	`${PUBLIC_S3_URL}/wish-2.webp`,
	`${PUBLIC_S3_URL}/gift.webp`,
	`${PUBLIC_S3_URL}/gift-2.webp`,
	`${PUBLIC_S3_URL}/location.webp`,
	`${PUBLIC_S3_URL}/seating.webp`,
	`${PUBLIC_S3_URL}/slider-1.webp`,
	`${PUBLIC_S3_URL}/slider-2.webp`,
	`${PUBLIC_S3_URL}/slider-3.webp`,
	`${PUBLIC_S3_URL}/gallery-1.webp`,
	`${PUBLIC_S3_URL}/gallery-2.webp`,
	`${PUBLIC_S3_URL}/gallery-3.webp`,
	`${PUBLIC_S3_URL}/journey.webp`,
	`${PUBLIC_S3_URL}/closing.webp`,
];
let currentPhoto = $state(0);
let direction = $state(1);
let prev = $state<number | null>(null);
let imagesPreloaded = $state(false);

// Preload all gallery images into browser cache
function preloadImages() {
	if (imagesPreloaded) return;
	// biome-ignore lint/complexity/noForEach: <explanation>
	photos.forEach((src) => {
		const img = new Image();
		img.src = src;
	});
	imagesPreloaded = true;
}

// Watch the previous section and trigger preload when it's visible
$effect(() => {
	const prevSection = document.querySelector("#journey");
	if (!prevSection) return;

	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				preloadImages();
				observer.disconnect(); // only need to fire once
			}
		},
		{ threshold: 0.2 }, // trigger when 20% of the previous section is visible
	);

	observer.observe(prevSection);

	return () => observer.disconnect();
});

function nextPhoto() {
	if (currentPhoto === photos.length - 1) return;
	direction = 1;
	prev = currentPhoto;
	currentPhoto = currentPhoto + 1;
}

function previousPhoto() {
	if (currentPhoto === 0) return;
	direction = -1;
	prev = currentPhoto;
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
      {#if prev !== null}
        {#key prev}
          <img
            src={photos[prev]}
            alt="Gallery"
            class="w-full h-full object-cover absolute inset-0 will-change-transform"
            out:fly={{ x: direction > 0 ? '-100%' : '100%', duration: 500, opacity: 1 }}
            onoutroend={() => (prev = null)}
          />
        {/key}
      {/if}

      {#if currentPhoto !== null}
        {#key currentPhoto}
          <img
            src={photos[currentPhoto]}
            alt="Gallery"
            class="w-full h-full object-cover absolute inset-0 will-change-transform"
            in:fly={{ x: direction > 0 ? '100%' : '-100%', duration: 500, opacity: 1 }}
          />
        {/key}
      {/if}

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
    <h2 class="text-2xl font-playfair font-light w-full text-white mb-2 absolute bottom-0 text-center">OUR GALLERY</h2>
  </div>
</Section>
