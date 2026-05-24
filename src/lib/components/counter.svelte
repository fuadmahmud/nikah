<script lang="ts">
import { format, addHours } from "date-fns";
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

function saveTheDate() {
	const start = WEDDING_DATE;
	const end = addHours(start, 2);
	const fmtUTC = (d: Date) => {
		const shifted = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
		return format(shifted, "yyyyMMdd'T'HHmmss") + "Z";
	};

	if (
		/iPad|iPhone|iPod/.test(navigator.userAgent) ||
		(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
	) {
		const reminder = new Date(start.getTime() - 2 * 60 * 60 * 1000);
		const ics = [
			"BEGIN:VCALENDAR",
			"VERSION:2.0",
			"PRODID:-//Nikah//Wedding//EN",
			"BEGIN:VEVENT",
			`DTSTART:${fmtUTC(start)}`,
			`DTEND:${fmtUTC(end)}`,
			"SUMMARY:Anggita & Fuad Wedding Day",
			"DESCRIPTION:Save the date for our wedding!",
			"BEGIN:VALARM",
			`TRIGGER;VALUE=DATE-TIME:${fmtUTC(reminder)}`,
			"ACTION:DISPLAY",
			"DESCRIPTION:Wedding starts soon!",
			"END:VALARM",
			"END:VEVENT",
			"END:VCALENDAR",
		].join("\r\n");
		const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
		window.open(URL.createObjectURL(blob), "_blank");
	} else {
		const params = new URLSearchParams({
			action: "TEMPLATE",
			text: "Anggita & Fuad Wedding Day",
			dates: `${fmtUTC(start)}/${fmtUTC(end)}`,
		});
		window.open(`https://www.google.com/calendar/render?${params}`, "_blank");
	}
}

$effect(() => {
	const intervalId = setInterval(() => {
		timer = getTimer(WEDDING_DATE);
	}, INTERVAL);

	return () => clearInterval(intervalId);
});
</script>


<div class="flex flex-col justify-start gap-2 font-noto my-auto">
  <h2 class="text-xl font-noto text-center">COUNT THE DATE</h2>
  <div class="flex flex-row items-center w-full justify-evenly font-light">
    {#each timer.split(" ") as time, i (i)}
      <div class="w-1/5">
        <div class="font-noto">
          <p class="text-2xl">{time}</p>
          <i>{TIME_LABEL[i]}</i>
        </div>
      </div>
    {/each}
  </div>
  <button
    onclick={saveTheDate}
    class="mt-4 text-sm text-center backdrop-blur-xs bg-white/30 p-3 rounded-sm text-white font-opensans"
  >
    SIMPAN KE KALENDER
  </button>
</div>