<script lang="ts">
import { getContext } from "svelte";
import type { Wish } from "../../types";
import { id } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";
import clsx from "$lib/utils/clsx";
import { ANON_ID } from "../../constants";

const ctx = getContext<{ wishes: Wish[] }>("wishes");
</script>

<div class="overflow-y-scroll w-full flex flex-col max-h-dvh scroll-none mb-4">
{#if !ctx.wishes.length}
  <p class="text-xs text-white text-center">Be the first one to give us wish</p>
{/if}
{#each ctx.wishes as wish, index (wish.id)}
  {@const isRight = index % 2 !== 0}

  <div
    class="{clsx(
      "mb-4 w-3/4",
      isRight
        ? "ml-auto text-right"
        : "text-left"
    )}"
  >
    {#if wish.guestSalutation}
      <i class="text-lg font-noto font-light">{wish.guestSalutation.toUpperCase()}&nbsp;</i>
      <br>
    {/if}
    <div class={clsx(
      isRight
        ? "flex flex-row-reverse gap-2"
        : "flex flex-row gap-2",
      "items-center"
    )}>
      <i class="text-lg font-noto font-light">{wish.name}</i>
      {#if ANON_ID !== wish.guest_id}
        <i class="fa-regular fa-circle-check"></i>
      {/if}
    </div>
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
      "flex flex-row items-center text-white/50 ml-auto text-right text-xs gap-2 mt-4",
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