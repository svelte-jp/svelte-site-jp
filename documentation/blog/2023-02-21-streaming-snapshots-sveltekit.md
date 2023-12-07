---
title: Streaming、snapshots、その他 SvelteKit 1.0 以降の新機能
description: SvelteKit 最新バージョンのエキサイティングな改善
author: Geoff Rich, Rich Harris
authorURL: https://geoffrich.net, https://twitter.com/Rich_Harris
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/streaming-snapshots-sveltekit
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

Svelte チームは SvelteKit 1.0 がリリースされたあとも懸命に取り組んできました。ローンチ後にリリースされたいくつかのメジャーな新機能についてご紹介します: [streaming non-essential data](https://kit.svelte.jp/docs/load#streaming-with-promises)、[snapshots](https://kit.svelte.jp/docs/snapshots)、そして [route-level config](https://kit.svelte.jp/docs/page-options#config) です。

## Stream non-essential data in load functions

SvelteKit は [load 関数](https://kit.svelte.jp/docs/load)を使用してルート(route)のデータを取得します。ページ間で移動する場合、まず最初にデータを取得し、それからその結果を用いてページをレンダリングします。このため、もしデータの一部が他のデータよりも取得に時間がかかる場合、特にそのデータが重要ではない場合、問題になるでしょう – すべてのデータが揃わないと、ユーザーは新しいページのどの部分も見ることができないからです。

これを回避する方法もありました。具体的には、コンポーネント自体で遅いデータを取得することができるので、まず `load` で取得したデータでレンダリングし、そのあとで遅いデータの取得を開始します。しかしこれは理想的ではありませんでした: クライアントがレンダリングするまでデータの取得を開始しないため、データはさらに遅延しますし、SvelteKit の `load` の規約を破ることにもなります。

今回、SvelteKit 1.8 において、新たなソリューションを提供します: server load 関数からネストした promise を返すと、SvelteKit はそれが解決する前にページのレンダリングを開始します。ネストした promise は完了し次第、その結果がページに[ストリーミング](https://developer.mozilla.org/ja/docs/Web/API/Streams_API)されます。

例えば、次の `load` 関数について考えてみましょう:

```ts
// @errors: 2304
export const load: PageServerLoad = () => {
	return {
		post: fetchPost(),
		streamed: {
			comments: fetchComments()
		}
	};
};
```

SvelteKit は自動的にこの `fetchPost` の呼び出しを await してからページのレンダリングを開始します。なぜならそれがトップレベルだからです。しかし、ネストした `fetchComments` の呼び出しが完了するのは待ちません – ページはレンダリングされ、`data.streamed.comments` はリクエストが完了すると解決する promise となります。`+page.svelte` で、Svelte の [await block](https://svelte.jp/docs#template-syntax-await) を使用してロード中の状態を表示することもできます:

```svelte
<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<article>
	{data.post}
</article>

{#await data.streamed.comments}
	Loading...
{:then value}
	<ol>
		{#each value as comment}
			<li>{comment}</li>
		{/each}
	</ol>
{/await}
```

この `streamed` プロパティに特別なものはありません – この動作をトリガーするのに必要なのは、戻り値のオブジェクトのトップレベル以外の場所にある promise だけです。

SvelteKit は、アプリのホスティングプラットフォームがストリーミングをサポートしている場合にのみ、レスポンスをストリーミングすることができます。一般的には、AWS Lambda を中心に構築されたプラットフォーム (例えば serverless functions) はストリーミングをサポートしていませんが、従来の Node.js サーバーや edge ベースのランタイムはサポートしています。プロバイダーのドキュメントで確認してみてください。

プラットフォームがストリーミングをサポートしていない場合でも、データは利用可能です。その場合レスポンスはバッファリングされ、すべてのデータが取得されるまでページのレンダリングは開始されません。

## How does it work?

データを server `load` 関数からブラウザに送信するには、データを _シリアライズ_ する必要があります。SvelteKit は [devalue](https://github.com/Rich-Harris/devalue) というライブラリを使用しています。これは `JSON.stringify` のようなものですが、より優れています — JSON では扱うことができない値 (例えば date や正規表現など) も扱うことができ、自身をその中に含むような (またはそのデータの中に何度も現れるような) オブジェクトもそのアイデンティティを破壊することなくシリアライズすることができ、そして [XSS 脆弱性](https://github.com/rich-harris/devalue#xss-mitigation) から保護することができます。

ページをサーバーでレンダリングする際、promise を、_deferred(遅延)_ を作成する function call としてシリアライズするよう devalue に指示します。これは SvelteKit がページに追加するコードを簡略化したものです。

```js
// @errors: 2339 7006
const deferreds = new Map();

window.defer = (id) => {
	return new Promise((fulfil, reject) => {
		deferreds.set(id, { fulfil, reject });
	});
};

window.resolve = (id, data, error) => {
	const deferred = deferreds.get(id);
	deferreds.delete(id);

	if (error) {
		deferred.reject(error);
	} else {
		deferred.fulfil(data);
	}
};

// devalue converts your data into a JavaScript expression
const data = {
	post: {
		title: 'My cool blog post',
		content: '...'
	},
	streamed: {
		comments: window.defer(1)
	}
};
```

このコードは、サーバーレンダリングされた一部の HTML と一緒にブラウザにすぐに送信されますが、コネクションは開いたままになっています。その後、promise が解決すると、SvelteKit は追加の HTML チャンクをブラウザにプッシュします:

```html
<script>
	window.resolve(1, {
		data: [{ comment: 'First!' }]
	});
</script>
```

クライアントサイドナビゲーションの場合は、少し異なるメカニズムを使用します。サーバーからのデータは [newline delimited JSON](https://dataprotocols.org/ndjson/) としてシリアライズされ、SvelteKit は `devalue.parse` で似たような遅延メカニズムを使用してその値を再構築します:

```json
// this is generated immediately — note the ["Promise",1]...
[{"post":1,"streamed":4},{"title":2,"content":3},"My cool blog post","...",{"comments":5},["Promise",6],1]

// ...then this chunk is sent to the browser once the promise resolves
[{"id":1,"data":2},1,[3],{"comment":4},"First!"]
```

このように promise はネイティブにサポートされているため、`load` から返されるデータのどこにでも置くことができます (トップレベルは除く。トップレベルは自動的に await するからです)。そして devalue がサポートするあらゆるタイプのデータを解決することができます — もちろんさらに多くの promise も！

注意事項: この機能には JavaScript が必要です。そのため、重要でないデータのみ、ストリーミングすることを推奨します。すべてのユーザーがエクスペリエンスのコアを利用できるようにするためです。

この機能の詳細については、[ドキュメント](https://kit.svelte.jp/docs/load#streaming-with-promises)をご覧ください。デモは [sveltekit-on-the-edge.vercel.app](https://sveltekit-on-the-edge.vercel.app/edge) (ロケーションデータをわざと遅延させ、ストリーミングしています) でご覧頂けますし、[ご自身で Vercel にデプロイ](https://vercel.com/templates/svelte/sveltekit-edge-functions)することもできます。Vercel では Edge Functions と Serverless Functions のどちらもストリーミングをサポートしています。

私たちは、Qwik、Remix、Solid、Marko、React などの、このアイデアの先行実装からインスピレーションを受けました。深く感謝します。

## Snapshots

以前までの SvelteKit アプリでは、フォームに入力を開始したあとで移動して、そのあと戻ってくるとフォームの state は復元されず、デフォルトの値でフォームが再作成されていました。場合によっては、ユーザーはフラストレーションが溜まるかもしれません。SvelteKit 1.5 以降は、これに対応するための方法が組み込まれています: それが snapshots です。

現在、`+page.svelte` や `+layout.svelte` で `snapshot` オブジェクトをエクスポートすることができます。このオブジェクトには、`capture` と `restore` という2つのメソッドがあります。`capture` 関数は、ユーザーがページを離れたときにどの state を保存するかを定義します。SvelteKit はその state を現在の履歴エントリに関連付けます。ユーザがページに戻った場合は、以前に設定した state を引数に取って `restore` 関数が呼び出されます。

こちらは textarea の値を capture し、restore する方法の例です:

```svelte
<script lang="ts">
	import type { Snapshot } from './$types';

	let comment = '';

	export const snapshot: Snapshot = {
		capture: () => comment,
		restore: (value) => (comment = value)
	};
</script>

<form method="POST">
	<label for="comment">Comment</label>
	<textarea id="comment" bind:value={comment} />
	<button>Post comment</button>
</form>
```

フォームの input の値やスクロールポジションなどは一般的な例で、JSON-serializable なデータならなんでも snapshot に保存することができます。snapshot のデータは [sessionStorage](https://developer.mozilla.org/ja/docs/Web/API/Window/sessionStorage) に保存されるので、ページがリロードされたときや、ユーザーがまったく別のサイトに移動したときにも保持されます。`sessionStorage` に保存されるため、サーバーサイドレンダリング中にアクセスすることはできません。

詳細は、[ドキュメント](https://kit.svelte.jp/docs/snapshots)をご覧ください。

## Route-level deployment configuration

SvelteKit はプラットフォームごとに固有の [adapter](https://kit.svelte.jp/docs/adapters) を使用してプロダクションへのデプロイ用にアプリのコードを変換しています。これまでは、デプロイメントの設定をアプリ全体レベルで行わなければなりませんでした。例えば、アプリを edge function としてデプロイするか、serverless function としてデプロイするか、どちらか一方は可能でしたが、両方同時に行うことはできませんでした。これでは、アプリの一部だけを edge にするというメリットを得ることができません – もし Node API を必要とするルート(route)がある場合、アプリ全体を edge にデプロイすることができないのです。リージョンの選択やメモリ割り当てなど、デプロイ設定の他の側面についても同様です: アプリ全体、すべてのルート(route)に適用される1つの値を選択しなければならなかったのです。

そしてこの度、`config` オブジェクトを `+server.js`、`+page(.server).js`、`+layout(.server).js` ファイルでエクスポートすることができるようになり、これらのルート(route)をどうやってデプロイするかコントロールできるようになりました。`+layout.js` でこれを行うと、そのすべての子ページに設定が適用されます。`config` の型は、デプロイ先の環境に依存するため、各 adapter ごとにユニークです。

```ts
// @errors: 2307
import type { Config } from 'some-adapter';

export const config: Config = {
	runtime: 'edge'
};
```

Config はトップレベルでマージされるため、レイアウトで設定された値をツリーのさらに下のページで上書きすることができます。詳細は[ドキュメント](https://kit.svelte.jp/docs/page-options#config)をご覧ください。

Vercel にデプロイする場合、最新バージョンの SvelteKit と adapter をインストールすることでこの機能のメリットを享受することができます。ルートレベル(route-level)の config をサポートする adapter は SvelteKit 1.5 以降が必要であるため、adapter のバージョンを大幅にアップグレードする必要があるかもしれません。

```bash
npm i @sveltejs/kit@latest
npm i @sveltejs/adapter-auto@latest # or @sveltejs/adapter-vercel@latest
```

今現在は、[Vercel adapter](https://kit.svelte.jp/docs/adapter-vercel#deployment-configuration) のみがルート固有(route-specific)の config を実装していますが、他のプラットフォーム向けでもこれを実装するためのビルディングブロックがあります。もしあなたが adapter の作者なら、[この PR](https://github.com/sveltejs/kit/pull/8740) の変更点を参照し、要求事項を確認してください。

## Incremental static regeneration on Vercel

ルートレベル(Route-level)の config では、もう1つ要望の多かった機能も使えるようになりました – Vercel にデプロイされる SvelteKit アプリで、[incremental static regeneration](https://kit.svelte.jp/docs/adapter-vercel#incremental-static-regeneration) (ISR) が使用できるようになりました。ISR は、プリレンダリングされたコンテンツにおけるコストとパフォーマンスの優位性と、動的なレンダリングコンテンツの柔軟性の両方を提供します。

ISR をルート(route)に追加するには、`config` オブジェクトに `isr` プロパティを追加します:

```ts
export const config = {
	isr: {
		// 必須のオプションについては Vercel adapter のドキュメントをご覧ください
	}
};
```

## And much more...

- [OPTIONS method](https://kit.svelte.jp/docs/routing#server) が `+server.js` ファイルでサポートされました。
- [別のファイルに属するものをエクスポート](https://github.com/sveltejs/kit/pull/9055)したときや、+layout.svelte に[slot を置くのを忘れた](https://github.com/sveltejs/kit/pull/8475)ときのエラーメッセージが改善されました。
- [app.html でパブリックな環境変数にアクセス](https://kit.svelte.jp/docs/project-structure#project-files-src)できるようになりました
- レスポンスを作成する新たな [text ヘルパー](https://kit.svelte.jp/docs/modules#sveltejs-kit-text)が追加されました
- そしてたくさんのバグフィックス – リリースノートの全文については[changelog](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md)をご覧ください。

SvelteKit にコントリビュートしてくれた皆様、SvelteKit をプロジェクトで使ってくださっている皆様、ありがとうございます。以前にもお伝えしましたが、Svelte はコミュニティプロジェクトであり、皆様のフィードバックやコントリビューションがなくては成り立たないものです。
