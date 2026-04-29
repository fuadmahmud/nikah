<script>
import { PUBLIC_S3_URL } from "$env/static/public";
</script>
<div class="w-dvw h-dvh flex">
  <img
    src="{PUBLIC_S3_URL}/message.webp"
    alt="background-welcome"
    class="w-full h-full object-cover self-end relative"
    loading="eager"
    fetchpriority="high"
  >
  <div class="w-full h-full z-10 absolute bg-backdrop/50 text-olive-300 flex flex-col items-center justify-center p-12">
    <h5 class="text-2xl font-playfair font-light tracking-widest">We cannot find the page you requested please try another page</h5>
  </div>
</div>