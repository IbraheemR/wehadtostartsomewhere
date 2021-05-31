import App from './App.svelte';

import model from "./model/model"

const app = new App({
	target: document.body,
	props: {
		model
	}
});

export default app;