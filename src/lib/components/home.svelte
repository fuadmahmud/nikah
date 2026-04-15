<script lang="ts">
import Section from "./section.svelte";
import formatDate from "$lib/utils/formatDate";
import { WEDDING_DATE } from "../../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { onDestroy, onMount } from "svelte";
import Slider from "./slider.svelte";
import { PUBLIC_S3_URL } from "$env/static/public";
import Counter from "./counter.svelte";

gsap.registerPlugin(ScrollTrigger, SplitText);

let gsapCtx: gsap.Context;

onMount(async () => {
	await document.fonts.ready;

	gsapCtx = gsap.context(() => {
		ScrollTrigger.defaults({ scroller: ".parent" });

		const surahTween = gsap.fromTo(
			".surah-text",
			{
				yPercent: 20,
				opacity: 0,
			},
			{
				yPercent: 0,
				opacity: 1,
				duration: 2,
				ease: "power3.out",
				paused: true,
				immediateRender: false,
			},
		);

		ScrollTrigger.create({
			trigger: "#surah",
			start: "top 80%",
			end: "bottom 20%",
			onEnter: () => surahTween.restart(true),
			onEnterBack: () => surahTween.restart(true),
			onLeave: () => gsap.set(".surah-text", { yPercent: 20, opacity: 0 }),
			onLeaveBack: () => gsap.set(".surah-text", { yPercent: 20, opacity: 0 }),
		});

		SplitText.create(".journey-text", {
			type: "words",
			reduceWhiteSpace: true,
			onSplit: (self) => {
				gsap.from(self.words, {
					scrollTrigger: {
						trigger: "#journey",
						start: "top 80%",
					},
					opacity: 0,
					autoAlpha: 0,
					stagger: 0.05,
					duration: 3,
				});
			},
		});

		ScrollTrigger.refresh();
	});
});

onDestroy(() => {
	gsapCtx?.revert();
});
</script>

<div class="h-dvh overflow-y-scroll snap-y snap-mandatory parent font-opensans">
  <!-- Opening Section -->
  <Slider />

  <Section
    id="surah"
    imgUrl="{PUBLIC_S3_URL}/seating.webp"
    imgAlt="surah"
  >
    <div class="text-left h-max overflow-hidden mt-auto rounded-md p-2">
      <div class="surah-text flex flex-col justify-end gap-4">
        <h2 class="text-2xl font-playfair tracking-wide">Q.S. AR-RUM: 21</h2>
        <p class="font-opensans font-light text-sm/5">Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.</p>
        <h5 class="text-xl font-dancing tracking-wider">FUAD & ANGGITA</h5>
      </div>
    </div>
  </Section>

  <Section
    id="bride"
    imgUrl="{PUBLIC_S3_URL}/bride.webp"
    imgAlt="bride"
  >
    <div class="flex flex-col text-left h-full justify-end gap-2">
      <p class="font-playfair">THE BRIDE</p>
      <h3 class="text-2xl font-playfair border-t pt-1 w-max">Anggita Kusuma P.</h3>
      <i class="font-opensans">Putri ke 3 dari 3</i>
      <p class="font-opensans text-sm font-light">Bapak Anwar Kusni dan Ibu Sri Suripni</p>
      <a
        href="https://www.instagram.com/anggitaaksm_/"
        referrerpolicy="no-referrer"
        target="_blank"
        rel="no-referrer"
        class="backdrop-blur-xs bg-white/30 p-1 rounded-md w-max flex flex-row items-center">
        <i class="fa-brands fa-instagram"></i>
        <span class="pr-0.5 text-sm ml-0.5">@anggitaaksm_</span>
      </a>
    </div>
  </Section>

  <Section
    id="groom"
    imgUrl="{PUBLIC_S3_URL}/groom.webp"
    imgAlt="groom"
  >
    <div class="flex flex-col text-right items-end p-2 w-full justify-end gap-2 mt-auto">
      <p class="font-playfair">THE GROOM</p>
      <h3 class="text-2xl font-playfair border-t w-max pt-2">Fuad Mahmud I.</h3>
      <i class="font-opensans">Putra ke 1 dari 4</i>
      <p class="font-opensans text-sm font-light">Alm. Bapak Sunarto dan Ibu Puspita Sari</p>
      <a
        href="https://www.instagram.com/fuadmahmudi/"
        referrerpolicy="no-referrer"
        target="_blank"
        rel="no-referrer"
        class="backdrop-blur-xs bg-white/30 p-1 rounded-md w-max flex flex-row items-center">
        <i class="fa-brands fa-instagram"></i>
        <span class="pr-0.5 text-sm ml-0.5">@fuadmahmudi</span>
      </a>
    </div>
  </Section>

  <Section
    id="journey"
    imgUrl="{PUBLIC_S3_URL}/journey.webp"
    imgAlt="journey"
  >
    <div class="flex flex-col text-left h-full gap-4 my-auto">
      <h2 class="text-2xl font-playfair text-center">OUR JOURNEY</h2>
      <div class="journey-text font-light font-opensans text-[3vw] md:text-base">
        Terkadang, dua orang yang sudah begitu dekat jaraknya, justru dipertemukan pada waktu yang paling tepat.
        <br />
        <br />
        <b>Agustus 2023</b>
        <br />
        Kami dipertemukan di acara lamaran seorang teman, yang ternyata menjadi titik awal cerita kami. Sebenarnya kami sudah berada di lingkungan yang sama sejak lama, dan keluarga yang sudah saling mengenal, namun kami baru bertemu satu sama lain saat itu.
        <br />
        <br />
        Sejak hari itu, sebuah langkah kecil dimulai.
        Fuad memberanikan diri menyapa melalui media sosial, dan dari percakapan sederhana, tumbuh rasa nyaman yang perlahan  mendekatkan kami. 
        <br />
        <br />
        <b>Desember 2023</b>
        <br />
        Kami memilih untuk berjalan bersama, saling menjaga, dan menguatkan dalam satu tujuan yang sama.
        <br />
        <br />
        <b>Januari 2026</b>
        <br />
        Kami mengikat niat dalam sebuah lamaran, menyatukan dua keluarga dalam satu harapan.
        <br />
        <br />
        <b>Mei 2026</b>
        <br />
        Akan menjadi awal dari selamanya langkah baru sebagai dua hati yang dipersatukan dalam satu ikatan suci. 
      </div>
    </div>
  </Section> 

  <Section
    id="date"
    imgUrl="{PUBLIC_S3_URL}/location.webp"
    imgAlt="date"
  >
    <div>
      <div class="flex flex-col justify-start gap-4 mb-4">
        <h2 class="text-2xl font-playfair">{formatDate(WEDDING_DATE)?.toUpperCase()}</h2>
        <div class="h-px w-auto grow bg-white"></div>
        <div class="font-playfair text-lg flex flex-col gap-1">
          <p>AKAD NIKAH</p>
          <p>16.00</p>
          <p>GOR MATRAMAN</p>
          <p class="font-opensans font-light text-sm">
            Jl. Balai Rakyat, RT.8/RW.10, Utan Kayu Utara, Kec. Matraman, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13120
          </p>
        </div>
        <div class="h-px w-auto grow bg-white"></div>
        <div class="font-playfair text-lg flex flex-col gap-1">
          <p>RESEPSI</p>
          <p>19.00</p>
          <p>GOR MATRAMAN</p>
          <p class="font-opensans font-light text-sm">
            Jl. Balai Rakyat, RT.8/RW.10, Utan Kayu Utara, Kec. Matraman, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13120
          </p>
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
      <Counter />
    </div>
  </Section>


  <Section
    id="gift"
    imgUrl={`${PUBLIC_S3_URL}/journey.webp`}
    imgAlt="gift"
  >
    <div class="flex flex-col text-left h-full justify-center gap-4">
      <h2 class="text-2xl font-playfair">WEDDING GIFT</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius ipsam animi! Dolorem, soluta officiis. Ipsam quidem ratione odio neque, rerum quam odit asperiores praesentium dolore soluta, iusto provident ad.</p>
    </div>
  </Section>

  <Section
    id="wishes"
    imgUrl={`${PUBLIC_S3_URL}/journey.webp`}
    imgAlt="wishes"
  >
    <div class="flex flex-col text-left h-full gap-4">
      <h2 class="text-2xl font-playfair">UCAPAN DAN DOA</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius ipsam animi! Dolorem, soluta officiis. Ipsam quidem ratione odio neque, rerum quam odit asperiores praesentium dolore soluta, iusto provident ad.</p>
    </div>
  </Section>

  <Section
    id="wishes"
    imgUrl={`${PUBLIC_S3_URL}/journey.webp`}
    imgAlt="wishes"
  >
    <div class="flex flex-col text-left h-full gap-4">
      <h2 class="text-2xl font-playfair">GALERI</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius ipsam animi! Dolorem, soluta officiis. Ipsam quidem ratione odio neque, rerum quam odit asperiores praesentium dolore soluta, iusto provident ad.</p>
    </div>
  </Section>

  <Section
    id="closing"
    imgUrl={`${PUBLIC_S3_URL}/closing.webp`}
    imgAlt="closing"
  >
    <div class="flex flex-col text-center h-full justify-center gap-4 text-shadow-lg">
      <h2 class="text-2xl font-light font-playfair">UCAPAN TERIMA KASIH</h2>
      <p class="text-sm font-light">
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
</style>