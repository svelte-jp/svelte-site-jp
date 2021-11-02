<script>
	import { Blurb, Hero, Section } from '@sveltejs/site-kit';
	import Contributors from './_components/Contributors.svelte';
	import Donors from './_components/Donors.svelte';
	import Example from './_components/Example.svelte';
	import WhosUsingSvelte from './_components/WhosUsingSvelte.svelte';
	// import Lazy from '../components/Lazy.svelte';

	// TODO this causes a Sapper CSS bug...
	// function loadReplWidget() {
	// 	console.log('lazy loading');
	// 	return import('../components/Repl/ReplWidget.svelte').then(mod => mod.default);
	// }
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
</style>

<svelte:head>
	<title>Svelte • サイバネティクスで強化されたWebアプリ</title>

	<meta name="twitter:title" content="Svelte">
	<meta name="twitter:description" content="サイバネティクスで強化されたWebアプリ">
	<meta name="Description" content="サイバネティクスで強化されたWebアプリ">
</svelte:head>

<h1 class="visually-hidden">Svelte</h1>
<Hero
	title="Svelte"
	tagline="サイバネティクスで強化されたWebアプリ"
	outline="svelte-logo-outline.svg"
	logotype="svelte-logotype.svg"
/>

<Blurb>
	<a href="blog/write-less-code" slot="one">
		<h2>Write less code</h2>
		<p>既に広く知られている言語（HTML、CSS、JavaScript）で、ボイラープレートのないコンポーネントを作成することができます</p>

		<span class="learn-more">さらに詳しく</span>
	</a>

	<a href="blog/virtual-dom-is-pure-overhead" slot="two">
		<h2>No virtual DOM</h2>
		<p>Svelteはコードを、フレームワークを含まない小さいvanilla JSにコンパイルします - アプリケーションは高速に起動し、そのスピードを維持します</p>

		<span class="learn-more">さらに詳しく</span>
	</a>

	<a href="blog/svelte-3-rethinking-reactivity" slot="three">
		<h2>Truly reactive</h2>
		<p>もう複雑な状態管理ライブラリは必要ありません - SvelteはJavaScriptそのものにリアクティビティをもたらします</p>

		<span class="learn-more">さらに詳しく</span>
	</a>

	<div class="description" slot="what">
		<p>Svelteはユーザーインタフェースを構築する先鋭的で新しいアプローチです。ReactやVueのような従来のフレームワークがその作業の大部分を <em>ブラウザ</em> で行うのに対し、Svelteはその作業をアプリをビルドする際の <em>コンパイル時</em> に行います。</p>

		<p>Svelteは仮想DOMによる差分検出のようなテクニックを使用する代わりに、アプリケーションの状態が変化したときにDOMを外科的に更新するコードを生成します。</p>

		<p>Svelteが最近行われた2つの調査で <a href="https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-web-frameworks">最も愛されているWebフレームワーク</a>、<a href="https://2020.stateofjs.com/en-US/technologies/front-end-frameworks/">最も開発者を満足させるフレームワーク</a> にそれぞれ選出されたことを誇りに思います。あなたにもきっと気に入って頂けると思います。もっと詳しく知りたい方は <a href="blog/svelte-3-rethinking-reactivity">こちらの紹介記事</a> をご覧ください。</p>
	</div>

	<div style="grid-area: start; display: flex; flex-direction: column; min-width: 0" slot="how">
		<pre class="language-bash" style="margin: 0 0 1em 0; min-width: 0; min-height: 0">
npx degit <a href="https://github.com/sveltejs/template" style="user-select: initial;">sveltejs/template</a> my-svelte-project
<span class="token comment"># または、<a href="https://github.com/sveltejs/template/archive/master.zip">こちらの.zipファイル</a> をダウンロードし、解凍します</span>
cd my-svelte-project
<span class="token comment"># <a href="blog/svelte-and-typescript">TypeScript</a> を使用する場合はこちらを実行してください:</span>
<span class="token comment"># node scripts/setupTypeScript.js</span>

npm install
npm run dev
		</pre>

		<p style="flex: 1">もっと詳しく知りたい方はこちらの<a href="blog/the-easiest-way-to-get-started">クイックスタートガイド</a>をご覧ください。</p>

		<p class="cta"><a sveltekit:prefetch href="tutorial">Svelteを学ぶ</a></p>
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
	<h3>Supporters</h3>

	<p>Svelte is free and open source software, made possible by the work of hundreds of volunteers and donors. <a href="https://github.com/sveltejs/svelte">Join us</a> or <a href="https://opencollective.com/svelte">give</a>!</p>

	<h3>Contributors</h3>

	<Contributors/>

	<p></p>

	<h3>Donors</h3>

	<Donors/>
</Section>
