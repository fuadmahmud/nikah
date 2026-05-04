<script lang="ts">
import type {
	HTMLInputAttributes,
	HTMLLabelAttributes,
	HTMLTextareaAttributes,
} from "svelte/elements";
import clsx from "../utils/clsx";
import { onDestroy, onMount } from "svelte";
import { gsap } from "$lib/utils/gsap";

interface InputProps {
	className?: string;
	labelAttr?: HTMLLabelAttributes;
	inputAttr?: HTMLInputAttributes;
	textAreaAttr?: HTMLTextareaAttributes;
	placeholder: string;
	textarea?: boolean;
}

const {
	labelAttr = {},
	inputAttr = {},
	textAreaAttr = {},
	placeholder,
	textarea,
	className,
}: InputProps = $props();
let inputEl: HTMLInputElement | HTMLTextAreaElement | undefined =
	$state(undefined);
let spanEl: HTMLLabelElement;

onMount(() => {
	inputEl?.addEventListener("input", handleInput);
	inputEl?.addEventListener("focus", activate);
	inputEl?.addEventListener("blur", deactivate);

	if (inputAttr?.value) activate();
});

onDestroy(() => {
	inputEl?.removeEventListener("input", handleInput);
	inputEl?.removeEventListener("focus", activate);
	inputEl?.removeEventListener("blur", deactivate);
});

function handleInput() {
	if (inputEl?.value) deactivate();
	else activate();
}

function activate() {
	gsap.to(spanEl, {
		x: -12,
		y: textarea ? -44 : -32,
		opacity: 1,
		fontSize: "0.75em",
		cursor: "default",
		duration: 1,
		ease: "power1.inOut",
	});
}

function deactivate() {
	if (!inputEl?.value) {
		gsap.to(spanEl, {
			x: 0,
			y: 0,
			opacity: 0.6,
			fontSize: "1em",
			cursor: "text",
			duration: 1,
			ease: "power1.inOut",
		});
	}
}
</script>

<div
  class="{clsx(
		"relative font-noto",
		className ?? ""
	)}"
	id="container-{inputAttr.id || textAreaAttr.id}"
>
  {#if textarea}
    <textarea
      bind:this={inputEl}
      {...textAreaAttr}
      class="{clsx(
        'bg-transparent border border-white max-h-16',
        textAreaAttr?.class as string || ''
      )}"></textarea>
  {:else}
    <input
      bind:this={inputEl}
      {...inputAttr}
      class="{clsx(
        'bg-transparent border border-white',
        inputAttr?.class as string ?? ''
      )}"
    >
  {/if}
  <label
    bind:this={spanEl}
		{...labelAttr}
    class="{clsx(
			'absolute opacity-60 cursor-text inset-y-0 left-3 flex items-center pointer-events-none',
			labelAttr?.class as string ?? '',
			textarea ? '-mt-1' : ''
		)}"
	>
		{placeholder}
	</label>
</div>