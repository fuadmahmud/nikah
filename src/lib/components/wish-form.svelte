<script lang="ts">
import clsx from "../utils/clsx";
import Input from "./input.svelte";
import { gsap } from "$lib/utils/gsap";
import { enhance } from "$app/forms";
import { getContext } from "svelte";
import type { Giphy, GiphyResponse, Guest } from "../../types";
import type { ChangeEventHandler } from "svelte/elements";
import { Dialog, Separator } from "bits-ui";
import { debounce } from "$lib/utils/debounce";
import { PUBLIC_S3_URL } from "$env/static/public";
import Section from "./section.svelte";

const guest = getContext<() => Guest>("guest");
const STEPS = ["name", "rsvp", "wishes", "submit"];
const LAST = STEPS.length - 1;
let formEl: HTMLFormElement;
let currentStep = $state(0);
let name = $state(guest().name);
let disabled = $derived(!name);
let gifResults = $state<Giphy[]>([]);
let values = $state({
	rsvp: true,
	wishes: "",
	gifUrl: "",
});

const handleNext = () => {
	const next = Math.min(currentStep + 1, LAST);

	if (currentStep === LAST) {
		return formEl.requestSubmit();
	}

	gsap.from(`#container-${STEPS[next]}`, {
		xPercent: -30,
		autoAlpha: 0,
		duration: 2,
		ease: "power2.out",
	});

	if (next === LAST) {
		const formData = new FormData(formEl);

		values = {
			...values,
			rsvp: formData.get("rsvp") === "true",
			wishes: formData.get("wishes") as string,
		};
	}

	if (next === LAST - 1 && !values.wishes) {
		disabled = true;
	}

	currentStep = next;
};

const handleBack = () => {
	const prev = Math.max(0, currentStep - 1);
	currentStep = prev;
	disabled = false;

	gsap.from(`#container-${STEPS[prev]}`, {
		xPercent: 30,
		autoAlpha: 0,
		duration: 2,
		ease: "power2.out",
	});
};

const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
	disabled = !e.currentTarget.value.trim();
	name = e.currentTarget.value ?? "";
};

const handleChangeWish: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
	disabled = !e.currentTarget.value.trim();
	values = { ...values, wishes: e.currentTarget.value };
};

const handleSearchGif = debounce(async (q: string) => {
	if (!q.trim()) {
		gifResults = [];
		return;
	}
	const res = await fetch(`/api/v1/giphy?q=${encodeURIComponent(q)}`);
	const responseJson: GiphyResponse = await res.json();
	gifResults = responseJson.data;
}, 400);
</script>

<Section
  id="wish-form"
  imgUrl={`${PUBLIC_S3_URL}/wish-2.webp`}
  imgAlt="wish-form"
  overlayClass="bg-black/10"
>
  <div class="flex flex-col text-left h-full gap-4">
    <div class="text-shadow-readable">
      <h2 class="text-2xl font-noto text-center">UCAPAN DAN DOA</h2>
      <p class="font-opensans font-light text-sm mt-4">Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
          Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas
          kehadiran dan doa restunya, kami mengucapkan terima kasih.
      </p>
    </div>
    <div class="flex flex-row items-center justify-evenly gap-2 w-full">
      {#each STEPS as step, index (step)}
        <span
          class="{clsx(
            'rounded-full p-2 h-8 w-8 flex items-center justify-center text-xs',
            index <= currentStep
              ? 'bg-olive-300 text-neutral-800'
              : 'backdrop-blur-xs bg-white/30 text-white'
          )}"
        >
          {index + 1}
        </span>
        {#if index < LAST}
          <div class="h-px flex-1 bg-white"></div>
        {/if}
      {/each}
    </div>
    <form
      class="mt-8"
      bind:this={formEl}
      method="POST"
      action="?/wish"
      use:enhance={() => {
        disabled = true;

        return async ({ update }) => {
          await update({ reset: false });
          disabled = false;
        }
      }}
    >
      <input hidden name="slug" value={guest().slug} />
      <input hidden name="gifUrl" bind:value={values.gifUrl} />
      <Input
        className={!currentStep ? "" : "hidden"}
        labelAttr={{
          for: "name",
        }}
        inputAttr={{
          id: "name",
          name: "name",
          class: "w-full text-sm",
          onchange: handleChangeName,
          value: name,
          onkeydown: (e) => {
            if (e.key === "Enter") {
              return handleNext()
            }
          }
        }}
        placeholder="Name"
      />
      <div
        id="container-rsvp"
        class="{clsx(
          "flex-col -mt-4",
          currentStep === 1 ? "flex" : "hidden"
        )}"
      >
        <label for="rsvp" class="text-[.75em] mb-0.5">RSVP</label>
        <select name="rsvp" id="rsvp" class="w-full bg-transparent border-white caret-white text-sm">
          <option value="true">YES</option>
          <option value="false">NO</option>
        </select>
      </div>
      <div
        id="container-wishes"
        class={clsx(
          "flex flex-col",
          currentStep === 2 ? "" : "hidden"
        )}
      >
        <Input
          labelAttr={{
            for: "wishes",
          }}
          textAreaAttr={{
            id: "wishes",
            name: "wishes",
            class: "w-full text-sm",
            maxlength: 255,
            onchange: handleChangeWish
          }}
          textarea
          placeholder="Give us your best wishes"
        />
        {#if guest().id}
          <Dialog.Root>
            <Dialog.Trigger
              class="text-sm p-3 rounded-sm text-neutral-800 bg-olive-300 cursor-pointer flex-1 mt-2"
              type="button"
            >
              ADD GIF
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay
                class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80"
              />
              <Dialog.Content
                class="rounded-sm bg-olive-300 shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border p-5 sm:max-w-[122.5] md:w-full"
              >
                <Dialog.Title
                  class="flex w-full items-center justify-center text-lg font-opensans text-neutral-800"
                >
                  Select your gif to express your wishes
                </Dialog.Title>
                <Separator.Root class="bg-neutral-800 -mx-5 mb-6 mt-5 block h-px" />
                <div class="flex flex-col items-start gap-3 pb-4 pt-7 w-full">
                  <Input
                    labelAttr={{
                      for: "searchGif",
                      class: "text-neutral-800"
                    }}
                    inputAttr={{
                      id: "searchGif",
                      name: "searchGif",
                      class: "w-full text-sm border-neutral-800",
                      onchange: (e) => handleSearchGif(e.currentTarget.value),
                    }}
                    placeholder="Search gif"
                    className="w-full"
                  />
                  {#if gifResults.length}
                    <ul class="grid max-h-72 w-full grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                      {#each gifResults as gif (gif.id)}
                        <li>
                          <Dialog.Close
                            class="w-full cursor-pointer rounded-sm border border-neutral-800/20 bg-white/30 p-1 transition hover:bg-white/50"
                            onclick={() => {
                              values = { ...values, gifUrl: gif.images.original.url };
                            }}
                          >
                            <img
                              src={gif.images.fixed_height_small.url}
                              alt={gif.title || "gif-preview"}
                              class="h-24 w-full rounded-sm object-cover"
                              loading="lazy"
                            />
                          </Dialog.Close>
                        </li>
                      {/each}
                    </ul>
                  {:else}
                    <p class="text-xs text-neutral-800/70">Search to see GIF previews.</p>
                  {/if}
                </div>
                <Dialog.Close
                  class="focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden absolute right-5 top-5 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]"
                >
                  <div>
                    <i class="fa-solid fa-x text-white"></i>
                    <span class="sr-only">Close</span>
                  </div>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        {/if}
        {#if values.gifUrl}
          <img
            src={values.gifUrl}
            alt="selected-gif"
            class="w-1/2 h-1/2 object-cover rounded-sm mt-2 self-center"
            loading="lazy"
          />
        {/if}
      </div>
      <div
        id="container-submit"
        class="{clsx(
          "grid-cols-2 gap-4 border border-white p-4 text-sm",
          currentStep === LAST ? "grid" : "hidden"
        )}"
      >
        <dl>
          <dt>Name:</dt>
          <dt>RSVP:</dt>
          <dt>Wishes:</dt>
        </dl>
        <dl>
          <dd class="truncate">{name}</dd>
          <dd>{values.rsvp ? "YES" : "NO"}</dd>
          <dd class="text-balance wrap-break-word">{values.wishes}</dd>
          <dd>
            {#if values.gifUrl}
              <img
                src={values.gifUrl}
                alt="selected-gif"
                class="w-1/2 h-1/2 object-cover rounded-sm mt-2 self-center"
                loading="lazy"
              />
            {/if}
          </dd>
        </dl>
      </div>
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
          class="text-sm p-3 rounded-sm text-neutral-800 bg-white cursor-pointer flex-1 disabled:opacity-90"
          type="button"
          disabled={disabled}
          onclick={handleNext}
        >
          {#if disabled && currentStep === LAST}
            <i class="fa-solid fa-spinner fa-spin"></i>
          {:else}
            {currentStep >= LAST ? "SEND" : "NEXT"}
          {/if}
        </button>
      </div>
    </form>
  </div>
</Section>