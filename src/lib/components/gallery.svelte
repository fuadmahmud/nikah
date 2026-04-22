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

</script>
<Section
  id="gallery"
  imgUrl={`${PUBLIC_S3_URL}/journey.webp`}
  imgAlt="gallery"
  textContainerClass="bg-black/50 h-max"
  classNames="h-auto"
>
  <div class="flex flex-col text-left gap-4 h-max">
    <h2 class="text-2xl font-playfair text-center">GALERI</h2>
    <div class="gallery-grid w-full scroll-none">
      <img src={photos.photo1} alt="Gallery 1" class="tile tile-photo-1" loading="lazy" />
      <img src={photos.photo2} alt="Gallery 2" class="tile tile-photo-2" loading="lazy" />
      <img src={photos.photo3} alt="Gallery 3" class="tile tile-photo-3" loading="lazy" />
      <img src={photos.photo4} alt="Gallery 4" class="tile tile-photo-4" loading="lazy" />
    </div>
  </div>
</Section>

<style lang="scss">
  .scroll-none {
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }

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
    border: white 1px solid;
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

  .tile-photo-4 {
    grid-column: 1 / span 2;
    grid-row: 4 / span 2;
  }
</style>