<script lang="ts">
  import { WEDDING_DATE } from "../../constants";

  const TIME_LABEL = ["days", "hours", "minutes", "seconds"];
  const INTERVAL = 1000;
  let timer = $state(getTimer(WEDDING_DATE));

  function getTimer(date: Date): string {
    const now = Date.now();
    const remaining = Math.max(0, date.getTime() - now);
    const pad = (n: number) => String(n).padStart(2, "0");

    const seconds = Math.floor(remaining / 1000) % 60;
    const minutes = Math.floor(remaining / (1000 * 60)) % 60;
    const hours = Math.floor(remaining / (1000 * 60 * 60)) % 24;
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));

    return `${pad(days)} ${pad(hours)} ${pad(minutes)} ${pad(seconds)}`;
  }

  $effect(() => {
    const intervalId = setInterval(() => {
      timer = getTimer(WEDDING_DATE);
    }, INTERVAL);

    return () => clearInterval(intervalId);
  });
</script>


<div class="flex flex-col justify-start gap-2 my-auto font-playfair">
  <h2 class="text-xl font-playfair text-center">COUNT THE DATE</h2>
  <div class="flex flex-row items-center w-full justify-evenly font-light">
    {#each timer.split(" ") as time, i (i)}
      <div class="w-1/5">
        <div class="font-playfair">
          <p class="text-2xl">{time}</p>
          <i>{TIME_LABEL[i]}</i>
        </div>
      </div>
    {/each}
  </div>
</div>