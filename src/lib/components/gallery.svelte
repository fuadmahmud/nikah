<script lang="ts">
import { PUBLIC_S3_URL } from "$env/static/public";
import gsap from "gsap";
import { onDestroy, onMount } from "svelte";
import Section from "./section.svelte";

const photos = {
  photo1: `${PUBLIC_S3_URL}/bride.webp`,
  photo2: `${PUBLIC_S3_URL}/groom.webp`,
  photo3: `${PUBLIC_S3_URL}/journey.webp`,
  photo4: `${PUBLIC_S3_URL}/closing.webp`,
};

const carouselPhotos = [
  `${PUBLIC_S3_URL}/slider-1.webp`,
  `${PUBLIC_S3_URL}/slider-2.webp`,
  `${PUBLIC_S3_URL}/slider-3.webp`,
  `${PUBLIC_S3_URL}/seating.webp`,
  `${PUBLIC_S3_URL}/location.webp`,
];

const duplicatedCarouselPhotos = [...carouselPhotos, ...carouselPhotos];

let carouselTrack: HTMLDivElement;
let autoScrollTween: gsap.core.Tween | undefined;

const setupAutoScroll = () => {
  if (!carouselTrack) return;

  autoScrollTween?.kill();
  gsap.set(carouselTrack, { x: 0 });

  const loopDistance = carouselTrack.scrollWidth / 2;
  if (!loopDistance) return;

  autoScrollTween = gsap.to(carouselTrack, {
    x: -loopDistance,
    duration: 24,
    ease: "none",
    repeat: -1,
  });
};

onMount(() => {
  setupAutoScroll();

  const resizeHandler = () => {
    setupAutoScroll();
  };

  window.addEventListener("resize", resizeHandler);

  return () => {
    window.removeEventListener("resize", resizeHandler);
    autoScrollTween?.kill();
  };
});

onDestroy(() => {
  autoScrollTween?.kill();
});
</script>
<Section
  id="gallery"
  imgUrl={`${PUBLIC_S3_URL}/journey.webp`}
  imgAlt="gallery"
>
  <div class="flex flex-col text-left h-full gap-4">
    <h2 class="text-2xl font-playfair text-center">GALERI</h2>
    <div class="backdrop-blur-xs bg-white/30 h-full w-full p-4 rounded-2xl overflow-y-auto">
      <div class="gallery-grid">
        <img src={photos.photo1} alt="Gallery 1" class="tile tile-photo-1" loading="lazy" />
        <img src={photos.photo2} alt="Gallery 2" class="tile tile-photo-2" loading="lazy" />
        <img src={photos.photo3} alt="Gallery 3" class="tile tile-photo-3" loading="lazy" />

        <div class="tile tile-carousel" aria-label="Gallery carousel">
          <div class="carousel-track" bind:this={carouselTrack}>
            {#each duplicatedCarouselPhotos as photo, index (`${photo}-${index}`)}
              <img src={photo} alt={`Carousel ${index + 1}`} class="carousel-photo" loading="lazy" />
            {/each}
          </div>
        </div>

        <img src={photos.photo4} alt="Gallery 4" class="tile tile-photo-4" loading="lazy" />
      </div>
    </div>
  </div>
</Section>

<style>
  .gallery-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, minmax(100px, 22vw));
    gap: 0.75rem;
  }

  .tile {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.75rem;
  }

  .tile-photo-1 {
    grid-column: 1;
    grid-row: 1;
  }

  .tile-photo-2 {
    grid-column: 1;
    grid-row: 2;
  }

  .tile-photo-3 {
    grid-column: 2;
    grid-row: 1 / span 2;
  }

  .tile-carousel {
    grid-column: 1 / span 2;
    grid-row: 3;
    overflow: hidden;
    overflow-y: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .tile-carousel::-webkit-scrollbar {
    display: none;
  }

  .carousel-track {
    display: flex;
    height: 100%;
    gap: 0.5rem;
    padding: 0.25rem;
  }

  .carousel-photo {
    flex: 0 0 calc(50% - 0.25rem);
    height: 100%;
    object-fit: cover;
    border-radius: 0.6rem;
  }

  .tile-photo-4 {
    grid-column: 1 / span 2;
    grid-row: 4 / span 2;
  }

  @media (min-width: 768px) {
    .gallery-grid {
      grid-template-rows: repeat(5, minmax(120px, 14vw));
    }

    .carousel-photo {
      flex-basis: calc(33.333% - 0.33rem);
    }
  }
</style>