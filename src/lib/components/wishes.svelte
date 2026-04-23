<script lang="ts">
import { PUBLIC_S3_URL } from "$env/static/public";
import Section from "./section.svelte";
import clsx from "../utils/clsx";
import Input from "./input.svelte";
import gsap from "gsap";

const STEPS = ["name", "rsvp", "wishes", "submit"];
const LAST = STEPS.length - 1;
let currentStep = $state(0);

function handleNext() {
	const next = Math.min(currentStep + 1, LAST);
	currentStep = next;

	gsap.from(`#container-${STEPS[next]}`, {
		xPercent: -30,
		autoAlpha: 0,
		duration: 2,
		ease: "power2.out",
	});
}

function handleBack() {
	const prev = Math.max(0, currentStep - 1);
	currentStep = prev;

	gsap.from(`#container-${STEPS[prev]}`, {
		xPercent: 30,
		autoAlpha: 0,
		duration: 2,
		ease: "power2.out",
	});
}
</script>
<Section
  id="wishes"
  imgUrl={`${PUBLIC_S3_URL}/journey.webp`}
  imgAlt="wishes"
>
  <div class="flex flex-col text-left h-full gap-4">
    <h2 class="text-2xl font-playfair text-center">UCAPAN DAN DOA</h2>
    <p class="font-playfair font-light text-sm">Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
        Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
        kehadiran dan doa restunya, kami mengucapkan terima kasih.
    </p>
    <div class="flex flex-row items-center justify-evenly gap-2 w-full">
      {#each STEPS as step, index (step)}
        <span
          class="{clsx(
            'rounded-full p-2 h-8 w-8 flex items-center justify-center text-xs',
            index <= currentStep
              ? 'bg-olive-300 text-neutral-800'
              : 'backdrop-blur-xs bg-white/30 text-olive-300'
          )}"
        >
          {index + 1}
        </span>
        {#if index < LAST}
          <div class="h-px flex-1 bg-white"></div>
        {/if}
      {/each}
    </div>
    <form action="" class="mt-8">
      <Input
        className={!currentStep ? "" : "hidden"}
        labelAttr={{
          for: "name",
        }}
        inputAttr={{
          id: "name",
          name: "name",
          class: "w-full"
        }}
        placeholder="NAME"
      />
      <Input
        className={currentStep === 1 ? "" : "hidden"}
        labelAttr={{
          for: "rsvp",
        }}
        inputAttr={{
          id: "rsvp",
          name: "rsvp",
          class: "w-full"
        }}
        placeholder="RSVP"
      />
      <Input
        className={currentStep === 2 ? "" : "hidden"}
        labelAttr={{
          for: "wishes",
        }}
        textAreaAttr={{
          id: "wishes",
          name: "wishes",
          class: "w-full"
        }}
        textarea
        placeholder="Give us your best wishes"
      />
      <div class="flex flex-row items-center gap-4 mt-4">
        {#if currentStep > 0}
          <button
            class="text-sm p-3 rounded-sm bg-white/50 backdrop-blur-xs cursor-pointer flex-1"
            type="button"
            onclick={handleBack}
          >
            BACK
          </button>
        {/if}
        <button 
          class="text-sm p-3 rounded-sm text-neutral-800 bg-olive-300 cursor-pointer flex-1"
          type="button"
          onclick={handleNext}
        >
          {currentStep >= LAST ? "SEND" : "NEXT"}
        </button>
      </div>
    </form>
  </div>
</Section>