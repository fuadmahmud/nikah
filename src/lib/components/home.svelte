<script lang="ts">
import { fly } from "svelte/transition";
import Section from "./section.svelte";
import formatDate from "$lib/utils/formatDate";
import { WEDDING_DATE } from "../../constants";
</script>

<div in:fly={{ y: 20, duration: 800 }} class="h-dvh w-dvw relative">
  <section class="h-full w-full">
    <video 
      poster="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/poster.webp"
      loop
      autoplay
      muted
      playsinline
      class="w-full h-full object-cover"
    >
      <source type="video/mp4" src="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/video-bg.mp4" />
      Your browser doesn't support video tag
    </video>
    <div class="z-10 absolute inset-0 h-full w-full flex flex-col bg-dark/35 text-white p-12 items-center-safe justify-center-safe bg-black/35">
      <div class="flex flex-col gap-2 text-center">
        <p class="font-light tracking-wide text-xs">THE WEDDING OF</p>
        <h5 class="text-2xl font-dancing tracking-wider">FUAD & ANGGITA</h5>
        <p class="font-light tracking-wide text-xs">{formatDate(WEDDING_DATE)?.toUpperCase()}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-8">
        <path d="M12 5v14"/>
        <path d="m19 12-7 7-7-7"/>
      </svg>
    </div>
  </section>

  <Section
    id="surah"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/message.webp"
    imgAlt="opening-message"
  >
    <div class="flex flex-col text-left h-full justify-end gap-4">
      <p class="text-3xl">Q.S. AR-RUM : 21</p>
      <p class="">Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.</p>
      <h5 class="text-2xl font-dancing tracking-wider">FUAD & ANGGITA</h5>
    </div>
  </Section>

  <Section
    id="groom"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/groom.webp"
    imgAlt="groom"
  >
    <div class="flex flex-col text-left h-full justify-end gap-4">
      <p class="text-3xl">THE GROOM</p>
      <p class="text-4xl">Fuad Mahmud Ibrahim</p>
      <i>Putra ke 1 dari 4</i>
      <p>Alm. Bapak Sunarto dan Ibu Puspita Sari</p>
    </div>
  </Section>

  <Section
    id="bride"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/bride.webp"
    imgAlt="bride"
  >
    <div class="flex flex-col text-left h-full justify-end gap-4">
      <p class="text-3xl">THE BRIDE</p>
      <p class="text-4xl">Anggita Kusuma Putri</p>
      <i>Putri ke 3 dari 3</i>
      <p>Bapak Anwar Kusni dan Ibu Sri Suripni</p>
    </div>
  </Section>
  
</div>