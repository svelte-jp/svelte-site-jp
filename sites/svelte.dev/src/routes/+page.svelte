<script>
	import { Blurb, Footer, TrySection } from '@sveltejs/site-kit/home';
	import Demo from './_components/Demo.svelte';
	import Hero from './_components/Hero.svelte';
	import Supporters from './_components/Supporters/index.svelte';
	import WhosUsingSvelte from './_components/WhosUsingSvelte/index.svelte';
</script>

<svelte:head>
	<title>Svelte • サイバネティクスで強化されたwebアプリ</title>

	<meta name="twitter:title" content="Svelte" />
	<meta name="twitter:description" content="サイバネティクスで強化されたwebアプリ" />
	<meta name="Description" content="サイバネティクスで強化されたwebアプリ" />
</svelte:head>

<h1 class="visually-hidden">Svelte</h1>

<Hero />

<Blurb --background="var(--sk-back-1)">
	<div slot="one">
		<h2>compiled</h2>
		<p>
			Svelte は、可能な限り多くの作業をブラウザからビルドステップにシフトさせます。手作業による最適化はもう不要です —
			より高速で、より効率的なアプリを。
		</p>
	</div>

	<div slot="two">
		<h2>compact</h2>
		<p>
			よく知られている言語(HTML、CSS、JavaScript)を使って、息を呑むほど簡潔にコンポーネントを書くことができます。
			そして、あなたのアプリケーションバンドルはとても小さくなります。
		</p>
	</div>

	<div slot="three">
		<h2>complete</h2>
		<p>
			scoped styling、state management、motion primitives、form bindings などはビルトインで用意されています — 
			必要なものを探し求めて npm をさまよう必要はありません。全てここにあります。
		</p>
	</div>
</Blurb>

<TrySection />

<Demo />

<WhosUsingSvelte />

<Supporters />

<Footer
	links={{
		resources: [
			{
				title: 'documentation',
				href: '/docs'
			},
			{
				title: 'tutorial',
				href: '/tutorial'
			},
			{
				title: 'examples',
				href: '/examples'
			},
			{
				title: 'blog',
				href: '/blog'
			}
		],
		connect: [
			{
				title: 'github',
				href: 'https://github.com/sveltejs/svelte'
			},
			{
				title: 'opencollective',
				href: 'https://opencollective.com/svelte'
			},
			{
				title: 'discord',
				href: '/chat'
			},
			{
				title: 'twitter',
				href: 'https://twitter.com/sveltejs'
			}
		]
	}}
>
	<span slot="copyright">
		Svelte is <a href="https://github.com/sveltejs/svelte">free and open source software</a> released
		under the MIT license
	</span>
</Footer>

<style>
	h2 {
		line-height: 1.05;
	}

	p {
		font-size: var(--sk-text-m);
	}
</style>
