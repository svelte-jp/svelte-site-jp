<script>
	import { Blurb, Hero, Section } from '@sveltejs/site-kit';
	import Contributors from './_components/Contributors.svelte';
	import Example from './_components/Example.svelte';
	import WhosUsingSvelte from './_components/WhosUsingSvelte.svelte';
	import { _ } from 'svelte-i18n';
	// import Lazy from '../components/Lazy.svelte';

	// TODO this causes a Sapper CSS bug...
	// function loadReplWidget() {
	// 	console.log('lazy loading');
	// 	return import('../components/Repl/ReplWidget.svelte').then(mod => mod.default);
	// }

	let innerWidth;
</script>

<style>
	/* darken text for accessibility */
	/* TODO does this belong elsewhere? */
	:global(.back-light) {
		--text: hsl(36, 3%, 44%);
	}

	.examples {
		background: var(--second);
		color: white;
		overflow: hidden;
	}

	.attention {
		position: absolute;
		width: 100%;
		padding: 0 var(--side-nav);
		max-width: 120rem;
		left:50%;
		transform: translate(-50%, 15%);
		font-size: var(--h6);
		z-index: 1;
	}

	@media (max-width: 710px) {
		.attention {
			padding: 0 2rem;
			transform: translate(-50%, 5%);
		}
	}

	@media (max-width: 425px) {
		.attention {
			padding: 0 1rem;
			transform: translate(-50%, 2%);
			line-height: 130%;
		}
	}
</style>

<svelte:window bind:innerWidth />

<svelte:head>
	<title>Svelte • Cybernetically enhanced web apps</title>

	<meta name="twitter:title" content="Svelte">
	<meta name="twitter:description" content="Cybernetically enhanced web apps">
	<meta name="Description" content="Cybernetically enhanced web apps">
</svelte:head>

<section class="attention">
	<div>
		<p>
			{$_('attention.1', { default: 'This is an unofficial site for Japanese translation by volunteers in Svelte Japan ' })}
			{$_('attention.2', { default: '(The repository is ' })}<a href="https://github.com/tomoam/svelte-site-jp">{$_('attention.3_link', { default: 'here' })}</a>{$_('attention.4', { default: '). ' })}
			{#if innerWidth > 700}
				<br/>
			{/if}
			{$_('attention.5', { default: 'The content on this unofficial site may be out of date or incorrect.' })}
			{#if innerWidth > 700}
				<br/>
			{/if}
			{$_('attention.6', { default: 'If you are looking for the official website, please visit ' })}<a href="https://svelte.dev/">{$_('attention.7_link', { default: 'svelte.dev' })}</a>{$_('attention.8', { default: '.' })}
		</p>
	</div>
</section>

<h1 class="visually-hidden">Svelte</h1>
<Hero
	title="Svelte"
	tagline="Cybernetically enhanced web apps"
	outline="svelte-logo-outline.svg"
	logotype="svelte-logotype.svg"
/>

<Blurb>
	<a href="blog/write-less-code" slot="one">
		<h2>{$_('top.blurb.one.title', { default: 'Write less code' })}</h2>
		<p>{$_('top.blurb.one.content', { default: 'Build boilerplate-free components using languages you already know — HTML, CSS and JavaScript' })}</p>

		<span class="learn-more">{$_('top.blurb.one.learn-more', { default: 'learn more' })}</span>
	</a>

	<a href="blog/virtual-dom-is-pure-overhead" slot="two">
		<h2>{$_('top.blurb.two.title', { default: 'No virtual DOM' })}</h2>
		<p>{$_('top.blurb.two.content', { default: 'Svelte compiles your code to tiny, framework-less vanilla JS — your app starts fast and stays fast' })}</p>

		<span class="learn-more">{$_('top.blurb.two.learn-more', { default: 'learn more' })}</span>
	</a>

	<a href="blog/svelte-3-rethinking-reactivity" slot="three">
		<h2>{$_('top.blurb.three.title', { default: 'Truly reactive' })}</h2>
		<p>{$_('top.blurb.three.content', { default: 'No more complex state management libraries — Svelte brings reactivity to JavaScript itself' })}</p>

		<span class="learn-more">{$_('top.blurb.three.learn-more', { default: 'learn more' })}</span>
	</a>

	<div class="description" slot="what">
		<p>{$_('top.blurb.what.p1.first', { default: 'Svelte is a radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the ' })}<em>{$_('top.blurb.what.p1.second_em', { default: 'browser' })}</em>{$_('top.blurb.what.p1.third', { default: ', Svelte shifts that work into a ' })}<em>{$_('top.blurb.what.p1.fourth_em', { default: 'compile step' })}</em>{$_('top.blurb.what.p1.fifth', { default: ' that happens when you build your app.' })}</p>

		<p>{$_('top.blurb.what.p2', { default: 'Instead of using techniques like virtual DOM diffing, Svelte writes code that surgically updates the DOM when the state of your app changes.' })}</p>

		<p><a href="blog/svelte-3-rethinking-reactivity">{$_('top.blurb.what.p3.first_link', { default: 'Read the introductory blog post' })}</a>{$_('top.blurb.what.p3.second', { default: ' to learn more.' })}</p>
	</div>

	<div style="grid-area: start; display: flex; flex-direction: column; min-width: 0" slot="how">
		<pre class="language-bash" style="margin: 0 0 1em 0; min-width: 0; min-height: 0">
npx degit <a href="https://github.com/sveltejs/template" style="user-select: initial;">sveltejs/template</a> my-svelte-project
<span class="token comment"># {$_('top.blurb.how.terminal.dl.first', { default: 'or download and extract ' })}<a href="https://github.com/sveltejs/template/archive/master.zip">{$_('top.blurb.how.terminal.dl.link', { default: 'this .zip file' })}</a></span>
cd my-svelte-project
<span class="token comment"># {$_('top.blurb.how.terminal.ts.first', { default: 'to use ' })}<a href="blog/svelte-and-typescript">{$_('top.blurb.how.terminal.ts.second_link', { default: 'TypeScript' })}</a>{$_('top.blurb.how.terminal.ts.third', { default: ' run:' })}</span>
<span class="token comment"># node scripts/setupTypeScript.js</span>

npm install
npm run dev
		</pre>

		<p style="flex: 1">{$_('top.blurb.how.p1.first', { default: 'See the ' })}<a href="blog/the-easiest-way-to-get-started">{$_('top.blurb.how.p1.second_link', { default: 'quickstart guide' })}</a>{$_('top.blurb.how.p1.third', { default: ' for more information.' })}</p>

		<p class="cta"><a rel="prefetch" href="tutorial">{$_('top.blurb.how.learn_link', { default: 'Learn Svelte' })}</a></p>
	</div>
</Blurb>

<div class="examples">
	<Example id="hello-world">
		<p>Svelte components are built on top of HTML. Just add data.</p>
	</Example>

	<Example id="nested-components">
		<p>CSS is component-scoped by default — no more style collisions or specificity wars. Or you can <a href="/blog/svelte-css-in-js">use your favourite CSS-in-JS library</a>.</p>
	</Example>

	<Example id="reactive-assignments">
		<p>Trigger efficient, granular updates by assigning to local variables. The compiler does the rest.</p>
	</Example>

	<Example id="svg-transitions">
		<p>Build beautiful UIs with a powerful, performant transition engine built right into the framework.</p>
	</Example>
</div>

<Section>
	<h3>Who's using Svelte?</h3>

	<WhosUsingSvelte/>
</Section>

<Section>
	<h3>Contributors</h3>

	<p>Svelte is free and open source software, made possible by the work of dozens of volunteers. <a href="https://github.com/sveltejs/svelte">Join us!</a></p>

	<Contributors/>
</Section>
