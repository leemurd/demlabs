import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess({ postcss: true }),
	kit: {
		adapter: adapter(),
	}
};

export default config;
