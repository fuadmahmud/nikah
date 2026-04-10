<script lang="ts">
import Section from "./section.svelte";
import formatDate from "$lib/utils/formatDate";
import { WEDDING_DATE } from "../../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMount } from "svelte";

onMount(() => {
	gsap.registerPlugin(ScrollTrigger);

	gsap.fromTo(
		".surah-text",
		{
			y: 1000,
			scrollTrigger: {
				trigger: ".surah-text",
				toggleActions: "restart none none none",
			},
		},
		{
			y: "-=500",
			duration: 2,
			delay: 1,
		},
	);
});
</script>

<div class="h-screen overflow-y-scroll snap-y snap-mandatory parent">
  <section class="h-screen w-full relative snap-start flex flex-col overflow-hidden section" id="opening">
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
      <div class="scroll-icon"></div>
    </div>
  </section>

  <Section
    id="surah"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/message.webp"
    imgAlt="opening-message"
  >
    <div class="text-left h-full overflow-hidden">
      <div class="surah-text flex flex-col justify-end gap-4 ">
        <p class="text-2xl font-playfair tracking-wide">Q.S. AR-RUM : 21</p>
        <p class="font-opensans text-sm">Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.</p>
        <h5 class="text-2xl font-dancing tracking-wider">FUAD & ANGGITA</h5>
      </div>
    </div>
  </Section>

  <Section
    id="groom"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/groom.webp"
    imgAlt="groom"
  >
    <div class="flex flex-col text-left h-full justify-end gap-4">
      <p class="font-playfair">THE GROOM</p>
      <p class="text-3xl font-playfair">Fuad Mahmud I.</p>
      <div class="flex items-center gap-4">
        <i class="font-opensans">Putra ke 1 dari 4</i>
        <div class="h-px w-auto grow bg-white"></div>
      </div>
      <p class="font-opensans text-sm">Alm. Bapak Sunarto dan Ibu Puspita Sari</p>
      <i class="fa-brands fa-instagram"></i>
    </div>
  </Section>

  <Section
    id="bride"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/bride.webp"
    imgAlt="bride"
  >
    <div class="flex flex-col text-left h-full justify-end gap-4">
      <p class="font-playfair">THE BRIDE</p>
      <p class="text-3xl font-playfair">Anggita Kusuma P.</p>
      <div class="flex items-center gap-4">
        <i class="font-opensans">Putri ke 3 dari 3</i>
        <div class="h-px w-auto grow bg-white"></div>
      </div>
      <p class="font-opensans text-sm">Bapak Anwar Kusni dan Ibu Sri Suripni</p>
      <i class="fa-brands fa-instagram"></i>
    </div>
  </Section>
  
</div>

<style lang="scss">
  .parent {
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .scroll-icon {
	width: 50px;
	height: 80px;
	border: 1px solid white;
	border-radius: 60px;
	position: relative;
  margin-top: 2rem;
    &::before {
      content: '';
      width: 12px;
      height: 12px;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: white;
      border-radius: 50%;
      opacity: 1;
      animation: wheel 2s infinite;
      -webkit-animation: wheel 2s infinite;
    }
  }

  @keyframes wheel {
    to {
      opacity: 0;
      top: 60px;
    }
  }

  @-webkit-keyframes wheel {
    to {
      opacity: 0;
      top: 60px;
    }
  }
</style>