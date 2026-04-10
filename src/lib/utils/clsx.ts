export function clsx(...args: string[]) {
	let str = "";
	const len = args.length;
	for (let i = 0; i < len; i++) {
		const tmp = args[i];
		if (tmp) {
			if (typeof tmp === "string") {
				str += (str && " ") + tmp;
			}
		}
	}
	return str;
}

export default clsx;
