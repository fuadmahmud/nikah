import { twMerge } from "tailwind-merge";
import clsx from "clsx";

function merge(...args: string[]) {
	return twMerge(clsx(...args));
}

export default merge;
