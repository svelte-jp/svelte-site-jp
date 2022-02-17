---
title: "Svelte 3: リアクティビティ再考"
description: ついにここまで来ました
author: Rich Harris
authorURL: https://twitter.com/Rich_Harris
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/svelte-3-rethinking-reactivity
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

あとほんの数ヶ月後には、Svelte 3 の安定版リリースを発表することができ、大変嬉しく思っています。これは、Svelteコミュニティの多くの人々による数百時間の作業を表す巨大なリリースです。これには、あらゆる段階で設計の形成に貢献したベータテスターからの貴重なフィードバックが含まれます。 

私たちはあなたがそれを気に入ってくれると思います。


## Svelte とは何か？(What is Svelte?)

Svelteはコンポーネントフレームワーク -- React や Vue のような -- ですが、重要な違いがあります。従来のフレームワークでは、宣言的な state 駆動型のコードを書くことができますが、ペナルティがあります。ブラウザは宣言的な構造を DOM 操作に変換するために余分な作業をしなければならず、[仮想 DOM の差分更新](/blog/virtual-dom-is-pure-overhead)技術のようなものはフレーム予算を食い荒らし、ガベージコレクタに課税します。

その代わり、Svelteは *ビルド時* に実行され、あなたのコンポーネントを DOM の更新を行う非常に効率的な *命令的* コードに変換します。その結果、優れたパフォーマンス特性を持つ野心的なアプリケーションを書くことができます。

Svelte の最初のバージョンは[仮説を検証する](/blog/frameworks-without-the-framework)ことがすべてでした -- これは、専用のコンパイラが優れたユーザーエクスペリエンスを提供する強固なコードを生成することができることを示しています。2つ目は、物事を少し片付けた小さなアップグレードでした。

バージョン3は大幅なオーバーホールです。この5、6か月間、私たちの焦点は、優れた *開発者* 体験を提供することにありました。今では、他の場所で見かけるものよりも[大幅に少ないボイラープレート](/blog/write-less-code)でコンポーネントを書くことができるようになりました。真新しい[チュートリアル](/tutorial)を試してみて、私たちが何を言っているのか確認してください。-- 他のフレームワークに慣れている人なら、きっと驚くと思います。

それを可能にするためには、まず、現代のUIフレームワークの中心となるコンセプト、リアクティビティを再考する必要がありました。

<div class="max">
<figure style="max-width: 960px; margin: 0 auto">
<div style="height: 0; padding: 0 0 57.1% 0; position: relative; margin: 0 auto;">
	<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; margin: 0;" src="https://www.youtube-nocookie.com/embed/AdNJ3fydeao" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<figcaption>'Rethinking Reactivity' from <a href="https://www.israel.yglfconf.com/">You Gotta Love Frontend Code Camp</a></figcaption>
</figure>
</div>


## リアクティビティを言語化する(Moving reactivity into the language)

昔の Svelte では、`this.set` メソッドを呼び出すことで state が変わったことをコンピュータに伝えることができました。

```js
const { count } = this.get();
this.set({
	count: count + 1
});
```

これはコンポーネントが *react(反応)* する原因になります。そういえば、`this.set` は古典的な (hooks 以前の) React で使われている `this.setState` メソッドとほぼ同じです。

```js
const { count } = this.state;
this.setState({
	count: count + 1
});
```

いくつかの重要な技術的な違いがありますが（上の動画で説明したように、React はリアクティブではありません）、概念的には同じものです。

<aside>
	<p>In fact, Svelte 3 is basically <a href="https://twitter.com/threepointone/status/1057179801109311488">Sunil's fault</a>.</p>
</aside>

それは [フック](https://reactjs.org/docs/hooks-intro.html) の登場ですべてが変わりました。多くのフレームワークがフックの独自の実装を実験し始めましたが、私たちはすぐにそれは私たちが望んでいる方向ではないと結論付けました。フックには魅力的な特性がありますが、不自然なコードを含んでいたり、ガベージコレクタのために不必要な作業が発生したりします。[組込みデバイス](https://mobile.twitter.com/sveltejs/status/1088500539640418304)やアニメーションを多用するインタラクティブな環境で使用されているフレームワークでは、それは良いことではありません。

そこで、私たちは一歩下がって、どのようなAPIが私たちにとって機能するのかを自問自答しました…そして、最高のAPIは全くAPIがないことに気付きました。私たちはただ *言語を使う* ことができます。いくつかの `count` 値の更新 -- そしてそれに依存するすべてのもの -- は、このように簡単であるべきです。

```js
count += 1;
```

コンパイラなので、裏で代入にタグ付けすることでそれが可能になります。

```js
count += 1; $$invalidate('count', count);
```

重要なことは、プロキシやアクセサを使用する際のオーバーヘッドや複雑さを伴わずに、これらのことをすべて行うことができるということです。ただの変数です。


## 新しい Svelte(New look)

改修されているのはコンポーネントだけではありません。[svelte.technology](https://svelte.technology) から [svelte.dev](https://svelte.dev)(訳注:[日本語版](https://svelte.jp)) に移行した新しいロゴとウェブサイトを作成した [AchimVedam](https://vedam.de/) の素晴らしいデザイン作業のおかげで、Svelte 自体はまったく新しいルックアンドフィールになっています。 

また、私たちはキャッチフレーズを「魔法のように消える UI フレームワーク」から「サイバネティックに強化されたウェブアプリ」に変更しました。Svelte には様々な側面があります。-- 卓越した性能、小さなバンドル、アクセシビリティ、組み込みのスタイルカプセル化、宣言的な遷移、使いやすさ、コンパイラであることなど -- その中のどれか1つに焦点を当てることは、他のものに不公平感を与えるような気がします。「Cybernetically enhanced」は、私たちのツールは私たち自身の知能の拡張として機能するべきだという Svelte の包括的な哲学を思い起こさせるようにデザインされています -- 願わくばレトロでウィリアム・ギブソン風のひねりを加えて。


## バージョン2からのアップグレード(Upgrading from version 2)

もしあなたが既存の Svelte 2 ユーザーであれば、手動でのアップグレードが必要になると思います。近日中に移行ガイドと [svelte-upgrade](https://github.com/sveltejs/svelte-upgrade) の更新版をリリースする予定です。これは作業を自動化するためにできる限りのことをしてくれます。しかし、*これ* は大きな変化であり、すべてが自動的に処理できるわけではありません。

私たちはこれを軽視していません、Svelte 3 を体験してもらえれば、なぜ過去と決別する必要があると感じたのか理解してもらえると思います。


## これから(Still to come)

このリリースは大変なものでしたが、まだ完成には至っていません。 よりスマートでコンパクトなコードと長い機能のウィッシュリストを生成するためのアイデアがたくさんあります。Next.js スタイルのアプリフレームワークである [Sapper](https://sapper.svelte.dev) は、Svelte 3 を使用するためのアップデートの真っ最中です。[Svelte Native](https://svelte-native.technology/) のコミュニティプロジェクトは、Svelte で Android や iOS アプリを書くことができるようになり、順調に進んでいますが、コアからのより完全なサポートが必要です。他のフレームワークが持っているようなエディタ拡張機能、シンタックスハイライター、コンポーネントキット、devtools などの豊富な機能はまだありません。私たちは *本当に* ファーストクラスの TypeScript サポートを追加したいと思っています。

しかし、それらを待つ間でも Svelte 3 は Web アプリを構築するための最良の方法だと考えています。1時間ほどかけて[チュートリアル](/tutorial)を読んでみてください。いずれにしても、[Discord チャットルーム](https://svelte.dev/chat)や [GitHub](https://github.com/sveltejs/svelte) でお待ちしています。-- 誰でも歓迎します、特にあなたは。
