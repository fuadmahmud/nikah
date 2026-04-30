<script lang="ts">
import { PUBLIC_S3_URL } from "$env/static/public";
import { Avatar, Separator } from "bits-ui";
import Section from "./section.svelte";
import gsap from "gsap";
import clsx from "$lib/utils/clsx";
import { Flip } from "gsap/Flip";
import { tick } from "svelte";

type Particle = {
	id: number;
	emoji: string;
	x: number;
	y: number;
	visible: boolean;
};

const GIFT_ACCOUNTS = [
	{
		name: "FUAD MAHMUD IBRAHIM",
		bankName: "BCA",
		value: "8705337990",
		img: "groom.webp",
		fallback: "FMI",
	},
	{
		name: "ANGGITA KUSUMA PUTRI",
		bankName: "BRI",
		value: "093401009179508",
		img: "bride.webp",
		fallback: "AKP",
	}
];

const firstClass = ["absolute", "inset-0", "opacity-25"];
const secondClass = ["relative", "-translate-x-3.5", "translate-y-3", "z-10"];

const EMOJI_SETS = [
	"🎉",
	"✨",
	"🌟",
	"💫",
	"🎊",
	"🔥",
	"⚡",
	"❤️‍🔥",
	"💕",
	"💖",
	"💗",
];
const PARTICLE_COUNT = 15;

let particleElsByCard: HTMLDivElement[][] = $state(
	GIFT_ACCOUNTS.map(() => [] as HTMLDivElement[]),
);
let particles: Particle[] = $state(
	Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
		id: i,
		emoji: EMOJI_SETS[i % EMOJI_SETS.length],
		x: 0,
		y: 0,
		visible: false,
	})),
);
let ringEls: Array<HTMLDivElement | undefined> = $state(
	GIFT_ACCOUNTS.map(() => undefined),
);
let activeBurstIndex: number | null = $state(null);
let cardEls: HTMLDivElement[] = $state([]);
let swapped = $state(false);

gsap.registerPlugin(Flip);

function getCardClass(index: number) {
	const isFirst = swapped ? index === 1 : index === 0;
	return clsx(
		"bg-olive-300 rounded-sm p-4 cursor-sw-resize",
		isFirst ? firstClass.join(" ") : secondClass.join(" "),
	);
}

async function copyText(account: string, cardIndex: number) {
	try {
		burstEmojis(cardIndex);
		await navigator.clipboard.writeText(account);
	} catch (err) {
		console.error("Failed to copy: ", err);
	}
}

function burstEmojis(cardIndex: number) {
	activeBurstIndex = cardIndex;
	particles = particles.map((p) => ({
		...p,
		emoji: EMOJI_SETS[Math.floor(Math.random() * EMOJI_SETS.length)],
		x: 0,
		y: 0,
		visible: true,
	}));

	requestAnimationFrame(() => {
		const tl = gsap.timeline({
			onComplete: () => {
				particles = particles.map((p) => ({ ...p, visible: false }));
				activeBurstIndex = null;
			},
		});

		particleElsByCard[cardIndex]?.forEach((el, i) => {
			if (!el) return;
			const angle =
				((Math.PI * 2) / PARTICLE_COUNT) * i + (Math.random() - 0.5) * 0.6;
			const dist = 60 + Math.random() * 90;
			const tx = Math.cos(angle) * dist;
			const ty = Math.sin(angle) * dist - 20;
			const rot = (Math.random() - 0.5) * 540;
			const scale = 0.6 + Math.random() * 0.8;
			const dur = 0.7 + Math.random() * 0.4;
			const delay = i * 0.1;

			tl.fromTo(
				el,
				{ opacity: 1, scale: 0, x: 0, y: 0, rotation: 0 },
				{
					opacity: 0,
					scale,
					x: tx,
					y: ty,
					rotation: rot,
					duration: dur,
					ease: "power3.out",
				},
				delay,
			);
		});

		const ringEl = ringEls[cardIndex];
		if (ringEl) {
			tl.fromTo(
				ringEl,
				{ opacity: 0.6, scale: 1, x: 0, y: 0 },
				{ opacity: 0, scale: 4, duration: 0.5, ease: "power2.out" },
				0,
			);
		}
	});
}

async function handleSwap() {
	if (cardEls.length < 2) return;
	const [firstEl, secondEl] = cardEls;
	if (!firstEl || !secondEl) return;

	const state = Flip.getState([firstEl, secondEl], {
		props: "transform,opacity",
	});

	swapped = !swapped;
	await tick();

	const firstTarget = swapped
		? { opacity: 1, x: -14, y: 12 }
		: { opacity: 0.25, x: 0, y: 0 };
	const secondTarget = swapped
		? { opacity: 0.25, x: 0, y: 0 }
		: { opacity: 1, x: -14, y: 12 };

	const tl = gsap.timeline({
		onComplete: () => {
			gsap.set([firstEl, secondEl], { clearProps: "x,y,opacity" });
		},
	});

	tl.add(
		Flip.from(state, {
			duration: 1.1,
			absolute: true,
			nested: true,
			ease: "power2.inOut",
			scale: false,
		}),
		0,
	);

	tl.to(
		firstEl,
		{
			...firstTarget,
			duration: 1.1,
			ease: "power2.inOut",
			overwrite: "auto",
		},
		0,
	);

	tl.to(
		secondEl,
		{
			...secondTarget,
			duration: 1.1,
			ease: "power2.inOut",
			overwrite: "auto",
		},
		0,
	);
}
</script>

<Section
  id="gift"
  imgUrl={`${PUBLIC_S3_URL}/gift-2.webp`}
  imgAlt="gift"
>
  <div class="rounded-sm p-4 flex flex-col text-left justify-center gap-4 text-olive-300">
    <h2 class="text-2xl font-playfair">WEDDING GIFT</h2>
    <p class="font-opensans font-light text-sm">
      Tanpa mengurangi rasa hormat kami bagi tamu yang ingin mengirimkan hadiah kepada kedua
      mempelai, silahkan klik pada kartu di bawah ini:
    </p>
    <div class="relative">
			{#each GIFT_ACCOUNTS as account, index (index)}
				<div class={getCardClass(index)}
					onclick={(e) => {
						handleSwap();
					}}
					role="button"
					tabindex={index + 1}
					onkeydown={(e) => {
						if (e.key === "ArrowDown") {
							handleSwap()
						}
					}}
					bind:this={cardEls[index]}
				>
					<div class="flex flex-row items-center justify-between">
						<Avatar.Root
							delayMs={200}
							class="data-[status=loaded]:border-foreground bg-muted text-muted-foreground h-12 w-12 rounded-full border font-medium uppercase data-[status=loading]:border-transparent"
						>
							<div
								class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
							>
								<Avatar.Image src="{PUBLIC_S3_URL}/{account.img}" alt={account.name} />
								<Avatar.Fallback class="border-muted border">{account.fallback}</Avatar.Fallback>
							</div>
						</Avatar.Root>
						<div class="relative">
							<div
								bind:this={ringEls[index]}
								class="absolute inset-0 m-auto w-3 h-3 rounded-full border-2 border-gray-900 pointer-events-none z-50 opacity-0"
							></div>
							{#each particles as p, i (p.id)}
								{#if p.visible && activeBurstIndex === index}
									<div
										bind:this={particleElsByCard[index][i]}
										class="absolute text-2xl pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 will-change-[transform,opacity]"
										style="left: {p.x}px; top: {p.y}px;"
									>
										{p.emoji}
									</div>
								{/if}
							{/each}
							<button
								class="text-xs p-3 rounded-sm text-neutral-800 lg:w-1/2 cursor-pointer border border-neutral-400"
								type="button"
								onclick={(e) => {
									e.stopPropagation();
									copyText(account.value, index);
								}}
								title="Copy account"
							>
								Copy
								<i class="fa-solid fa-copy"></i>
							</button>
						</div>
					</div>
					<Separator.Root
						class="bg-neutral-500 my-4 shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-[px]"
					/>
					<div class="text-neutral-800 font-light">
						<p class="text-xs">{account.bankName}</p>
						<p class="text-sm font-normal">{account.name}</p>
						<p class="text-sm">{account.value}</p>
					</div>
				</div>
			{/each}
    </div>
  </div>
</Section>