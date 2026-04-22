<script lang="ts">
import { PUBLIC_S3_URL } from "$env/static/public";
import Section from "./section.svelte";

const GIFT_ACCOUNTS = [
	{ label: "BRI ANGGITA KUSUMA PUTRI", value: "093401009179508" },
	{ label: "BCA FUAD MAHMUD IBRAHIM", value: "8705337990" },
];
let selectedAccount = $state(GIFT_ACCOUNTS[0].value);

function handleChangeAccount(
	e: Event & {
		currentTarget: EventTarget & HTMLSelectElement;
	},
) {
	selectedAccount = e.currentTarget.value;
}

async function copyText() {
	try {
		await navigator.clipboard.writeText(selectedAccount);
	} catch (err) {
		console.error("Failed to copy: ", err);
	}
}
</script>
<Section
  id="gift"
  imgUrl={`${PUBLIC_S3_URL}/gift-2.webp`}
  imgAlt="gift"
>
  <div class="bg-white/30 rounded-sm p-4 flex flex-col text-left justify-center gap-4 text-olive-300">
    <h2 class="text-2xl font-playfair">WEDDING GIFT</h2>
    <p class="font-opensans font-light text-sm">
      Tanpa mengurangi rasa hormat kami bagi tamu yang ingin mengirimkan hadiah kepada kedua&nbsp;
      mempelai, silahkan klik di bawah ini:
    </p>
    <div class="flex flex-row items-center justify-between gap-4">
      <select name="account" id="account" class="text-slate-950 min-w-0" onchange={handleChangeAccount}>
        {#each GIFT_ACCOUNTS as account (account.value)}
          <option value={account.value}>{account.label}</option>
        {/each}
      </select>
      <button
        class="text-sm backdrop-blur-xs bg-white/30 p-3 rounded-sm text-slate-300 lg:w-1/2 cursor-pointer"
        type="button"
        onclick={copyText}
      >
        COPY
      </button>
    </div>
  </div>
</Section>