<script context="module">
	import { waitLocale } from 'svelte-i18n';

	export async function preload() {
		await waitLocale();
		const sections = await this.fetch(`docs.json`).then(r => r.json());
		return { sections };
	}
</script>

<script>
	import { Docs } from '@sveltejs/site-kit';
	import { onDestroy } from 'svelte';
	import { _, locale } from 'svelte-i18n';

	export let sections;

	const unsbscribe = locale.subscribe(async value => {
		if (process.browser) {
			sections = await fetch(`docs.json`).then(r => r.json());
		}
	});

	onDestroy(unsbscribe);
</script>

<svelte:head>
	<title>API Docs • Svelte</title>

	<meta name="twitter:title" content="Svelte API docs">
	<meta name="twitter:description" content="Cybernetically enhanced web apps">
	<meta name="Description" content="Cybernetically enhanced web apps">
</svelte:head>

<h1 class="visually-hidden">API Docs</h1>
<Docs
	{sections}
	owner={$_("docs.owner", { default : "sveltejs"})}
	project={$_("docs.project", { default : "svelte"})}
	path={$_("docs.path", { default : "/site/content"})}
	dir={$_("docs.dir", { default : "docs"})}
/>