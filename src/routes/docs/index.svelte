<script context="module">
	import { waitLocale } from 'svelte-i18n';
	import { getLocaleFromQueryOrStore } from '../../i18n.js';

	const title_replacements = {
		'1_export_creates_a_component_prop': 'props',
		'2_Assignments_are_reactive': 'reactive assignments',
		'3_$_marks_a_statement_as_reactive': 'reactive statements ($:)',
		'4_Prefix_stores_with_$_to_access_their_values': 'accessing stores ($)'
	};

	export async function preload({ query }) {
		await waitLocale();
		const sections = await this.fetch(`docs.json?locale=${getLocaleFromQueryOrStore(query.lang)}`).then(r => r.json());
		for (const section of sections) {
			for (const subsection of section.subsections) {
				const { slug } = subsection;
				// show abbreviated title in the table of contents
				if (slug in title_replacements) {
					subsection.title = title_replacements[slug];
				}
			}
		}

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
			// `locale` parameterはキャッシュのためだけに使用しており、Server Sideでは何も使われない
			sections = await fetch(`docs.json?locale=${value}`).then(r => r.json());
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
/>