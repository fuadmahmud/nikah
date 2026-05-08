// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare module "*&enhanced" {
	const value: {
		sources: Record<string, string>;
		img: { src: string; w: number; h: number };
	};
	export default value;
}

declare module "*?enhanced" {
	const value: {
		sources: Record<string, string>;
		img: { src: string; w: number; h: number };
	};
	export default value;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: { COUNTER: DurableObjectNamespace };
			context: { waitUntil(promise: Promise<any>): void };
			caches: CacheStorage & { default: Cache };
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}
	}
}

export {};
