<script lang="ts">
import { getContext } from "svelte";
import type { Wish } from "../../types";
import { id } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";
import clsx from "$lib/utils/clsx";
import { ANON_ID } from "../../constants";

const ctx = getContext<{ wishes: Wish[] }>("wishes");
</script>

<div class="overflow-y-scroll mt-8 flex flex-col max-h-dvh scroll-none">
<h2 class="text-2xl font-playfair font-light w-full border-b border-slate-300 pb-1 mb-4">Ucapan</h2>
{#if !ctx.wishes.length}
  <p class="text-xs text-olive-300 text-center">Be the first one to give us wish</p>
{/if}
{#each ctx.wishes as wish, index (wish.id)}
  <div
    class="{clsx(
      "mb-4 w-3/4",
      index % 2 !== 0
        ? "ml-auto text-right"
        : "text-left"
    )}"
  >
    {#if wish.guestSalutation}
      <i class="text-lg font-playfair font-light">{wish.guestSalutation.toUpperCase()}&nbsp;</i>
      <br>
    {/if}
    <i class="text-lg font-playfair font-light">{wish.guest_id === ANON_ID ? wish.name : wish.guestName?.toUpperCase()}</i>
    <p class="text-sm font-light">{wish.description}</p>
    {#if wish.gif_url}
      <img
        src="{wish.gif_url}"
        alt="Gif comment {wish.id}"
        class={clsx(
          "w-1/2 h-1/2 object-cover rounded-sm mt-2",
          index % 2 !== 0 ? "ml-auto" : ""
        )}
        loading="lazy"
      />
    {/if}
    <div class="{clsx(
      "flex flex-row items-center text-olive-300/50 ml-auto text-right text-xs gap-2 mt-4",
      index % 2 !== 0 ? "justify-end" : ""
    )}">
      <i class="fa-regular fa-clock"></i>
      <p>
        {formatDistanceToNowStrict(wish.created_at ?? new Date(), {
          locale: id,
          addSuffix: true,
        })}
      </p>
    </div>
  </div>
{/each}
</div>