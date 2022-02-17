---
title: SvelteKitがpublic betaに到達しました(SvelteKit is in public beta)
description: 皆様からのフィードバックをお待ちしております
author: Rich Harris
authorURL: https://twitter.com/rich_harris
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/sveltekit-beta
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

<aside><p>前回: <a href="/blog/whats-the-deal-with-sveltekit">What's the deal with SvelteKit?</a></p></aside>

お待たせしました。5か月という期間、何百ものコミットを経て、ついにSvelteKitのベータ版をお試し頂けるようになりました。まだ完成はしていません — いくつか既知のバグや、不足している機能がありますが — 私たちは出来栄えにとても満足しており、皆様に試して頂くのが待ちきれません。

新しいプロジェクトの開始は簡単です:

```bash
# プロジェクト作成
mkdir my-app
cd my-app
npm init svelte@next

# 依存関係をインストール
npm install

# 開発サーバを開始してブラウザタブを開く
npm run dev -- --open
```

ドキュメントは [kit.svelte.dev/docs](https://kit.svelte.dev/docs)(訳注:[日本語版](https://kit.svelte.jp/docs))にあります。もし [Sapper](https://sapper.svelte.dev) アプリをSvelteKitに移行したい場合は、[kit.svelte.dev/docs/migrating](https://kit.svelte.dev/docs/migrating) (訳注:[日本語版](https://kit.svelte.jp/docs/migrating))に解説がございます。

ソースコードは [github.com/sveltejs/kit](https://github.com/sveltejs/kit) で公開しています。issueとpull requestは整理が完了するまで無効にしておりますが、近い将来、完全に公開する予定です。


## 待って、SvelteKitって何？(Wait, what is SvelteKit?)

Svelteにとっての [Next](https://nextjs.org/) のようなものだとお考えください。Svelteでアプリを構築するためのフレームワークであり、サーバーサイドレンダリング、ルーティング、JSやCSSのコード分割、様々なサーバーレスプラットフォームへのアダプターなどが完備されています。

[Sapper](https://sapper.svelte.dev) に精通されている方にとっては、SvelteKitはSapperの後継です。

## SnowpackからViteに(From Snowpack to Vite)

[Snowpack](https://www.snowpack.dev/) について熱弁を振るった[アナウンスビデオ](/blog/whats-the-deal-with-sveltekit) の後では驚かれるかもしれませんが、SvelteKitは内部で [Vite](https://vitejs.dev) を使用しています。SvelteKitがどんな構成をとるべきか考え始めた頃に Snowpack を試したのですが、一目惚れでした。

Snowpack は開発ツールの完全に新しいカテゴリーを生み出しました。ここ数年の webpack や Rollup のように開発中のアプリを _バンドル_ するのではなく、Snowpack はブラウザのネイティブな `import` を使用して、動作中にSvelteコンポーネントなどを 1:1 で変換する _バンドルしない開発サーバー_ です。その結果、迅速な起動、シンプルなキャッシング、即時のホットモジュールリロードを実現しています。一度この方法を経験すると、もう今までの方法に戻りたくなくなります。

Vite は Snowpack と同じカテゴリーに属します。Vite 1 はVue中心 (ViteとVueはどちらも [Evan You](https://twitter.com/youyuxi) が開発しています) でサーバーサイドレンダリングが難しかったためSvelteKitには適していませんでしたが、Vite 2 はフレームワークにとらわれず、SSRを中心に設計されています。また、CSSのコード分割など、以前は自分たちで実装しなければならなかった強力な機能を備えています。2つのテクノロジーを並べて評価したところ、ViteのほうがSvelteKitの要件にマッチしており、私たちが考えているフレームワークを実現できる可能性が高いと結論づけざるを得ませんでした。

開発の初期段階に緊密に協力してくれたこと、また、今後数年のWeb開発の道筋を示してくれたことの両方について、Snowpackチームに深い感謝の意を表します。とても素晴らしいツールなので、是非試してみてください。


## エクストリームスポーツとしてのドッグフーディング(Dogfooding as extreme sport)

SvelteKit はまだベータ版ですが、プロダクションで使われていないわけではありません。

私の本業は New York Times で、過去12か月のほとんどを [coronavirus tracker](https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html) の開発に費やしてきました。これは Times のグラフィックの大半を担うワークフローのカスタマイズバージョンを使用していますが、大規模な複数ページのプロジェクト向けには設計されていません。昨年末、アメリカの~3,000もの郡ごとにページを作成することを決めたとき、プロジェクトを完全に再構築する必要があると気付きました。

SvelteKitは、まだ完成していないにもかかわらず、私たちの難解な要件にマッチする唯一のフレームワークでした(ニュースルームで働き、CMSと格闘したことが有る人なら、私が言っていることがわかると思います)。現在では、[county risk pages](https://www.nytimes.com/interactive/2021/us/tom-green-texas-covid-cases.html) にも使用されており、既存のページをSvelteKitアプリに移行しているところです。

<aside><p>同僚たちの忍耐力には永遠に感謝します。</p></aside>

何百万人もの人に見てもらうアプリを作るのに未完成のソフトウェアを使用するのはリスクがありますし、一般的にはおすすめできません。しかし、これによってアプリの開発を大幅に速くすることができましたし、フレームワーク自体も以前よりずっと強固になりました。

## 1.0に向けたロードマップ(The road to 1.0)

1.0マイルストーンの未解決のissueは [issue tracker](https://github.com/sveltejs/kit/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.0) で確認できます。その作業に加えて、ドキュメントをアップグレードし、[adapters](https://kit.svelte.jp/docs/adapters) を追加する予定です。

最も重要なことは、私たちが最高のアプリケーションフレームワークを作るためには、皆さんからのフィードバックが必要であるということです。実際に使ってみて、足りない部分を教えてください。

'here be dragons' という警告や、ドキュメントの不足にもかかわらず、SvelteKitを試してくださった皆様に感謝します。バックチャンネルのフィードバックは非常に貴重でした。特に、非公式のドキュメントと不足していたWindowsサポートを追加したフォークをメンテしてくれた [GrygrFlzr](https://github.com/GrygrFlzr) と、 [Svite](https://github.com/svitejs/svite) でSvelteKitのViteインテグレーションの重要な基礎を築いた [dominikg](https://github.com/dominikg) に感謝したいと思います。この度、両名ともチームに迎え入れられました。
