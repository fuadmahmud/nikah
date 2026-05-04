import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { browser } from "$app/environment";

// Register once here
if (browser) {
	gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

	ScrollTrigger.defaults({ scroller: ".parent" });
}

// Export the instances
export { gsap, ScrollTrigger, SplitText, Flip };
