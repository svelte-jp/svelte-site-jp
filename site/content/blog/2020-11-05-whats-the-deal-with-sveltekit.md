---
title: SvelteKitとは (What's the deal with SvelteKit?)
description: Svelteアプリの構築方法を再考しています。これはあなたが知っておくべきことです
author: Rich Harris
authorURL: https://twitter.com/rich_harris
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-the-deal-with-sveltekit
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

<aside><p>もし Svelte Summit に参加<em>していない</em>場合は、こちらの <a href="https://www.youtube.com/c/SvelteSociety/videos">Svelte Society YouTube page</a> からご覧いただけます。</p></aside>

先月の [Svelte Summit](https://sveltesummit.com/) に参加していたなら、私の講演「Futuristic Web Development」をご覧になったかもしれません。この講演で、Svelte に関する FAQ の中で最も頻繁に寄せられる「Sapper がバージョン1.0に到達するのはいつですか？」という質問にようやく答えました。

答え: 到達しません。

これはちょっとした皮肉で、この講演で説明したように、実際には Sapper の書き換えとリブランドが行われています。しかし、コミュニティからは新しい質問が多く寄せられるようになり、Sapper の後継である SvelteKit にはどんなことが期待できるのかもう少し明確にする時が来ました。

<div class="max">
<figure style="max-width: 960px; margin: 0 auto">
<div style="height: 0; padding: 0 0 57.1% 0; position: relative; margin: 0 auto;">
	<iframe style="position: absolute; width: 100%; height: 100%; left: 0; top: 0; margin: 0;" src="https://www.youtube-nocookie.com/embed/qSfdtmcZ4d0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<figcaption>'Futuristic Web Development' from <a href="https://sveltesummit.com/">Svelte Summit</a></figcaption>
</figure>
</div>


## What's Sapper?

[Sapper](https://sapper.svelte.dev) は*アプリケーションフレームワーク* (または 'メタフレームワーク') で、Svelte (*コンポーネント*フレームワーク) の上に構築されています。その目的は、サーバーサイドレンダリング (SSR) やコード分割など、最新のベストプラクティスをすべて備えた Svelte アプリの構築を簡単にすること、そして開発が生産的かつ楽しくなるようなプロジェクト構造を提供することです。*ファイルシステムベースのルーティング* ([Next](https://nextjs.org/) によって普及し、他の多くのフレームワークでも採用されていますが、いくつか機能を強化しています) を使用しており、プロジェクトのファイル構造がアプリ自体の構造を反映しています。

Svelte のホームページやドキュメントでは [degit](https://github.com/Rich-Harris/degit) と [sveltejs/template](https://github.com/sveltejs/template) リポジトリを使ってアプリの構築を始めることが推奨されていますが、Sapper は長い間、アプリ構築をするための私達のお勧めの方法でした。このブログ記事も(執筆時点では) Sapper によってレンダリングされています。


## Why are we migrating to something new?

まず最初に、[sveltejs/template](https://github.com/sveltejs/template) と [sveltejs/sapper-template](https://github.com/sveltejs/sapper-template) の区別は混乱を招きます、特に Svelte を初めて利用する人には。Svelte でアプリを構築し始めるのに、推奨する方法が1つであれば、大きなメリットがもたらされるでしょう。オンボーディングをシンプルにし、メンテナンスとサポートの負担を減らし、潜在的には予測しやすいプロジェクト構造によって解き放たれる新しい可能性を探り始めることができます。(最後の部分は、その可能性を完全に理解するには時間がかかるため、意図的に曖昧にしています)

それはさておき、私たちはしばらくの間 Sapper を書き直すという考えに惹かれていました。長年に渡りコードベースが少し荒れてきたというのもありますが ([Sapper は2017年にスタート](/blog/sapper-towards-the-ideal-web-app-framework))、大きな理由は、ここ最近 Web に多くの変化があったからで、基本的な前提をいくつか再考する時期が来ています。


## How is this new thing different?

基本的な前提の1つは、アプリをビルドするのに [webpack](https://webpack.js.org/) や [Rollup](http://rollupjs.org/) のようなモジュールバンドラーを使う必要があるということです。これらのツールはアプリケーションの依存関係グラフをトレースし、解析し、コードを変換 (例えば、Svelte コンポーネントを JS モジュールに変換するなど) して、どこでも実行できるコードのバンドルを作成します。私は Rollup の最初の作者として、これが驚くほど複雑な問題で厄介なエッジケースがあると証言できます。

確かにここ数年はバンドラーが必要でした。ブラウザーが `import` キーワードをネイティブにサポートしていなかったからです。しかし今日ではそれほど当てはまりません。現在では、*バンドルしない開発* ワークフローが台頭しており、これは根本的にシンプルです。アプリをバンドルする代わりに、開発サーバーが (必要に応じて JavaScript に変換された) モジュールを*オンデマンド*でサーブします。つまり、アプリが大きくなったとしても基本的にはすぐに起動できることを意味します。

[Snowpack](https://www.snowpack.dev/) はこのムーブメントの先駆者であり、SvelteKit の原動力です。驚くほど高速で、素晴らしい開発体験(ホットモジュールリロード、エラーオーバーレイなど)を備えており、私達は SSR などの機能で Snowpack チームと緊密に連携しています。ホットモジュールリロードは特に、Sapper と Rollup (最も効率的なアウトプットを優先し、ファーストクラスのHMRサポートを持たないアーキテクチャ) を使用することに慣れている方にとっては新たな発見があります。

バンドラーを完全に捨てるわけではありません。アプリをプロダクション向けに最適化することは依然として不可欠で、SvelteKit は Rollup を使用してアプリを可能な限り速く小さいものにします (これには、静的な `.css` ファイルへの style の抽出なども含まれます) 。

他の基本的な前提としては、サーバーレンダリングされたアプリには、サーバーが必要である、というものがあります。Sapper には事実上2つのモードがあります。Nodeサーバー上で実行されるスタンドアローンアプリを作る `sapper build` と、アプリを GitHub Pages のようなサービスでのホスティングに適した静的ファイルのコレクションに仕上げる `sapper export` です。

静的ファイルはどこにでも置くことができますが、Node サーバーの実行 (とモニタリング/スケーリングなど) はそれほど簡単ではありません。今日では、サーバーレスプラットフォームへの移行を目にします。サーバーレスプラットフォームでは、アプリの作者はコードが実行されているサーバーやそれに伴う複雑さについて考える必要がありません。[vercel-sapper](https://github.com/thgh/vercel-sapper) などのおかげで Sapper アプリをサーバーレスプラットフォームで実行することができますが、確かに慣用的であるとは言えません。

<aside><p>Node アプリと完全にプリレンダリングされた (つまりエクスポートされた) サイトの両方を作ることは可能です</a></p></aside>

SvelteKit はサーバーレスパラダイムを完全に取り入れており、メジャーなサーバーレスプロバイダを全てサポートする予定です。公式には対応していないプラットフォームをターゲットにするための 'adapter' API も用意されます。さらに、部分的なプリレンダリングも可能になるでしょう。つまり、静的なページはビルド時に生成することができ、動的なページはオンデマンドでレンダリングするということです。 


## When can I start using it?

勇気がある方は、今すぐ始められます。

```bash
npm init svelte@next
```

これによって新しいプロジェクトが作成され、`@sveltejs/kit` CLI がインストールされてアプリの開発とビルドのためのツールが提供されます。

ですが推奨はしません！ドキュメントはありませんし、どんな形式のサポートも提供できないでしょう。また、頻繁に壊れる可能性もあります。

私達はまだ探索モードなので、プライベートなモノレポで作業を進めています。私たちの計画では、いくつかの Issue を解決したら、パブリックベータを準備し、ここで発表します。その時点ではリポジトリをプライベートなままにしておく予定ですが、皆様からのフィードバックを集める場を設ける予定です。その後で、1.0 リリースに向けて作業を進め、リポジトリを公開する予定です。

私は約束を破るのが好きではないので、時期について確固たる約束はできません。しかし、数ヶ月ではなく数週間の話だと*考えて*います。


## What if I don't want to use SvelteKit?

使用する必要はありません。Svelte をスタンドアローンパッケージとして、または [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte) のようなバンドラーインテグレーションを介して使用することは常に可能です。どんなに難解なワークフローであってもそれにフィットするよう柔軟に対応できることや、[Elder.js](https://github.com/Elderjs/elderjs)、[Routify](https://routify.dev/)、[Plenti](https://plenti.co/)、[Crown](https://crownframework.com/)、[JungleJS](https://www.junglejs.org/) などのサードパーティのアプリケーションフレームワークを使えることが重要だと考えています。


## TypeScript?

心配しないで、TypeScript をフルにサポートせずにローンチするつもりはありません。


## How can I migrate my existing Sapper apps?

ほとんどの場合、Sapper のコードベースを移行するのは比較的簡単なはずです。

いくつかの避けられない変更があり (サーバーレスプラットフォームで実行できるようにするということは、カスタムの `server.js` ファイルと `(req, res) => {...}` 関数をよりポータブルなもので置き換える必要があるということを意味します) 、この機会にいくつかの設計上の欠点を修正していますが、全体的には SvelteKit アプリは Sapper ユーザーにとって非常に馴染みのあるものになっています。

詳細な移行ガイドは 1.0 と一緒に提供されるでしょう。


## How can I contribute?

パブリックベータのローンチやリポジトリの公開の時期に関する発表をお見逃しなく。(また、ブログ記事に書く予定ですが、私たちは [OpenCollective](https://opencollective.com/svelte) を開始しており、もしこのプロジェクトがあなたにとって価値がある場合に財政的な貢献ができることをお伝えしておかなければなりません。すでに寄付してくださった方々にはとても、とても感謝しています)


## Where can I learn more?

Twitter で [@sveltejs](https://twitter.com/sveltejs) と [@SvelteSociety](https://twitter.com/SvelteSociety) をフォローしてください。また、[svelte.dev/chat](https://svelte.dev/chat) にお越しください。また、[Svelte Radio](https://www.svelteradio.com/) を購読してください。次回のエピソードでKevinと共同ホストがこのプロジェクトについて私に質問する予定です (今から来週の収録までの間に、質問があれば[このTwitterのスレッドに返信してください](https://twitter.com/Rich_Harris/status/1323376048571121665))。
