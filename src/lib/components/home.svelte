<script lang="ts">
import Section from "./section.svelte";
import formatDate from "$lib/utils/formatDate";
import { WEDDING_DATE } from "../../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onDestroy, onMount } from "svelte";

gsap.registerPlugin(ScrollTrigger);

let scrollContainer: HTMLDivElement;
let gsapCtx: gsap.Context;

onMount(() => {
	gsapCtx = gsap.context(() => {
		gsap.fromTo(
			".surah-text",
			{
				opacity: 0,
				y: 200,
				scrollTrigger: {
					trigger: scrollContainer,
					start: "top 80%",
					toggleActions: "play none stop reverse",
				},
			},
			{
				y: "-=200",
				opacity: 1,
				ease: "power2.out",
				duration: 3,
				delay: 2,
			},
		);
	});
});

onDestroy(() => {
	gsapCtx?.revert();
});
</script>

<div class="h-screen overflow-y-scroll snap-y snap-mandatory parent font-opensans" bind:this={scrollContainer}>
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
    <div class="z-10 absolute inset-0 h-full w-full flex flex-col text-olive-200 p-12 items-center-safe bg-black/20">
      <div class="flex flex-col gap-2 text-center">
        <p class="font-playfair text-xl mb-4">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
        <p class="font-light tracking-wide text-xs">THE WEDDING OF</p>
        <h4 class="text-2xl font-dancing tracking-wider">FUAD & ANGGITA</h4>
      </div>
      <div class="scroll-icon"></div>
    </div>
  </section>

  <Section
    id="surah"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/seating.webp"
    imgAlt="opening-message"
  >
    <div class="text-left h-max overflow-hidden mt-auto rounded-md p-2">
      <div class="surah-text flex flex-col justify-end gap-4">
        <h2 class="text-2xl font-playfair tracking-wide">Q.S. AR-RUM: 21</h2>
        <p class="font-opensans text-xs">Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.</p>
        <h5 class="text-xl font-dancing tracking-wider">FUAD & ANGGITA</h5>
      </div>
    </div>
  </Section>

  <Section
    id="bride"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/bride.webp"
    imgAlt="bride"
  >
    <div class="flex flex-col text-left h-full justify-end gap-2">
      <p class="font-playfair">THE BRIDE</p>
      <h3 class="text-2xl font-playfair border-t pt-1 w-max">Anggita Kusuma P.</h3>
      <i class="font-opensans">Putri ke 3 dari 3</i>
      <p class="font-opensans text-sm">Bapak Anwar Kusni dan Ibu Sri Suripni</p>
      <a
        href="https://www.instagram.com/anggitaaksm_/"
        referrerpolicy="no-referrer"
        target="_blank"
        rel="no-referrer"
        class="bg-olive-300 text-stone-500 p-1 rounded-md w-max">
        <i class="fa-brands fa-instagram"></i>
        <span class="pr-0.5 text-sm">@anggitaaksm_</span>
      </a>
    </div>
  </Section>

  <Section
    id="groom"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/groom.webp"
    imgAlt="groom"
  >
    <div class="flex flex-col text-right items-end p-2 w-full justify-end gap-2 mt-auto">
      <p class="font-playfair">THE GROOM</p>
      <h3 class="text-2xl font-playfair border-t w-max pt-2">Fuad Mahmud I.</h3>
      <i class="font-opensans">Putra ke 1 dari 4</i>
      <p class="font-opensans text-sm">Alm. Bapak Sunarto dan Ibu Puspita Sari</p>
      <a
        href="https://www.instagram.com/fuadmahmudi/"
        referrerpolicy="no-referrer"
        target="_blank"
        rel="no-referrer"
        class="bg-olive-300 text-stone-500 p-1 rounded-md w-max">
        <i class="fa-brands fa-instagram"></i>
        <span class="pr-0.5 text-sm">@fuadmahmudi</span>
      </a>
    </div>
  </Section>

  <Section
    id="journey"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/journey.webp"
    imgAlt="journey"
  >
    <div class="flex flex-col text-left h-full gap-4 my-auto">
      <h2 class="text-2xl font-playfair">OUR JOURNEY</h2>
      <pre class="whitespace-pre-line font-opensans text-xs sm:text-sm">
        Terkadang, dua orang yang sudah begitu dekat jaraknya, justru dipertemukan pada waktu yang paling tepat.

        Agustus 2023
        Kami dipertemukan di acara lamaran seorang teman, yang ternyata menjadi titik awal cerita kami. Sebenarnya kami sudah berada di lingkungan yang sama sejak lama, dan keluarga yang sudah saling mengenal, namun kami baru bertemu satu sama lain saat itu.

        Sejak hari itu, sebuah langkah kecil dimulai.
        Fuad memberanikan diri menyapa melalui media sosial, dan dari percakapan sederhana, tumbuh rasa nyaman yang perlahan  mendekatkan kami. 

        Desember 2023
        Kami memilih untuk berjalan bersama, saling menjaga, dan menguatkan dalam satu tujuan yang sama.

        Januari 2026
        Kami mengikat niat dalam sebuah lamaran, menyatukan dua keluarga dalam satu harapan.

        Mei 2026 
        Akan menjadi awal dari selamanya langkah baru sebagai dua hati yang dipersatukan dalam satu ikatan suci. 
      </pre>
      
    </div>
  </Section>
  
  <Section
    id="date"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/location.webp"
    imgAlt="date"
  >
    <div class="my-auto">
      <div class="flex flex-col text-left h-full justify-end gap-4">
        <h2 class="text-2xl font-playfair">{formatDate(WEDDING_DATE)?.toUpperCase()}</h2>
        <div class="h-px w-auto grow bg-white"></div>
        <div class="font-playfair text-lg flex flex-col gap-1">
          <p>AKAD NIKAH</p>
          <p>16.00</p>
          <p>GOR MATRAMAN</p>
          <p class="font-opensans text-sm">Jl. Balai Rakyat, RT.8/RW.10, Utan Kayu Utara, Kec. Matraman, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13120</p>
        </div>
        <div class="h-px w-auto grow bg-white"></div>
        <div class="font-playfair text-lg flex flex-col gap-1">
          <p>RESEPSI</p>
          <p>19.00</p>
          <p>GOR MATRAMAN</p>
          <p class="font-opensans text-sm">Jl. Balai Rakyat, RT.8/RW.10, Utan Kayu Utara, Kec. Matraman, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13120</p>
          <a
            href="https://maps.app.goo.gl/hrQ8rohJTUW7kLoW9"
            referrerpolicy="no-referrer"
            target="_blank"
            rel="no-referrer"
            class="mt-4 text-sm text-center bg-olive-300 p-3 rounded-sm text-stone-500"
          >
            LIHAT LOKASI
          </a>
        </div>
      </div>
    </div>
  </Section>

  <Section
    id="counter"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/journey.webp"
    imgAlt="counter"
  >
    <div class="flex flex-col text-center gap-4 my-auto font-playfair">
      <h2 class="text-2xl font-playfair">COUNT THE DATE</h2>
      <div class="flex flex-row items-center w-full justify-evenly">
        <div class="w-1/5">
          <div class="font-playfair">
            <p class="text-2xl">00</p>
            <i>days</i>
          </div>
        </div>
        <div class="w-1/5">
          <div class="font-playfair">
            <p class="text-2xl">00</p>
            <i>hours</i>
          </div>
        </div>
        <div class="w-1/5">
          <div class="font-playfair">
            <p class="text-2xl">00</p>
            <i>minutes</i>
          </div>
        </div>
        <div class="w-1/5">
          <div class="font-playfair">
            <p class="text-2xl">00</p>
            <i>seconds</i>
          </div>
        </div>
      </div>
    </div>
  </Section>

  <Section
    id="gift"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/journey.webp"
    imgAlt="gift"
  >
    <div class="flex flex-col text-left h-full justify-center gap-4">
      <h2 class="text-2xl font-playfair">WEDDING GIFT</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius ipsam animi! Dolorem, soluta officiis. Ipsam quidem ratione odio neque, rerum quam odit asperiores praesentium dolore soluta, iusto provident ad.</p>
    </div>
  </Section>

  <Section
    id="wishes"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/journey.webp"
    imgAlt="wishes"
  >
    <div class="flex flex-col text-left h-full gap-4">
      <h2 class="text-2xl font-playfair">UCAPAN DAN DOA</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius ipsam animi! Dolorem, soluta officiis. Ipsam quidem ratione odio neque, rerum quam odit asperiores praesentium dolore soluta, iusto provident ad.</p>
    </div>
  </Section>

  <Section
    id="wishes"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/journey.webp"
    imgAlt="wishes"
  >
    <div class="flex flex-col text-left h-full gap-4">
      <h2 class="text-2xl font-playfair">GALERI</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius ipsam animi! Dolorem, soluta officiis. Ipsam quidem ratione odio neque, rerum quam odit asperiores praesentium dolore soluta, iusto provident ad.</p>
    </div>
  </Section>

  <Section
    id="closing"
    imgUrl="https://s3.ap-southeast-1.amazonaws.com/bucket.fmd.my.id/public/closing.webp"
    imgAlt="closing"
  >
    <div class="flex flex-col text-center h-full justify-center gap-4 text-shadow-lg">
      <h2 class="text-2xl font-light font-playfair">UCAPAN TERIMA KASIH</h2>
      <p class="text-sm">
        Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
        Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
        kehadiran dan doa restunya, kami mengucapkan terima kasih.
      </p>
      <p class="text-sm">Wassalamu'alaikum Wr. Wb.</p>
      <h4 class="text-2xl font-dancing tracking-wider">FUAD & ANGGITA</h4>
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