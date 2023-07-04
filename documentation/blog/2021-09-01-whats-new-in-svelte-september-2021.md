---
title: "What's new in Svelte: 2021年9月"
description: StackOverflowで最も愛されているWebフレームワーク
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-september-2021
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

今月は、Svelteが[StackOverflowの最も愛されているWebフレームワーク](https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-web-frameworks)に選ばれたり、Tan Li Hau氏がSvelteのYouTubeチャンネルについて[Svelte Radio](https://share.transistor.fm/s/84c7521b)に出演したり、SvelteKitが1.0リリースに向けてさらに進化したりしました。

## New in Svelte

- `use:actions`が`<svelte:body>`で使用できるようになりました。(**3.42.0**)
- `HTMLElement`, `SVGElement` (**3.42.2**) および `BigInt` (**3.42.3**) はグローバルに追加されました。
- **3.42.2** では以下の点が改善され、Svelteの出力に含まれるコードが少なくなりました。
  - クラスおよびスタイル属性で空白が折りたたまれるようになりました。
  - ハイドレートを含んだコンポーネントは、コンポーネント内に存在する要素の種類を作成する際にヘルパーのみに依存するように更新されました。
- スケーリングが `flip` アニメーションで考慮されるようになりました。 (**3.42.2**)
- `<select>` の中のすべての `<option>` が、バインドされた値がそれらのどれにも一致しないときに、選択解除されるようになりました。 (**3.42.2**)

機能やバグフィックスの全リストは、[Svelte changelog](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md)をご覧ください。

## SvelteKit Updates

Svelteのメンテナは[SvelteKitを1.0にする手助けを探しています](https://github.com/sveltejs/kit/issues/2100) 1.0のマイルストーンにあった100以上の問題を解決しました。残りは数十個しかありませんが、そのリストを少しでも短くするために手を貸していただきたいと思っています。
ご協力いただける方は、[1.0 milestone issues](https://github.com/sveltejs/kit/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.0)のいずれかの作業をご検討ください。

この1か月間は、あらゆる問題を解決することに注力し、100件以上のPRを統合しました。いくつかの新機能も追加されました…

- SvelteKitは、事前にレンダリングされたアプリがクエリパラメータにアクセスしようとしているかどうかを検出し、サイレントに失敗するのではなくエラーを返すようになりました。([#2104](https://github.com/sveltejs/kit/pull/2104))
- `adapter-node` では、[Kitミドルウェアを自分のサーバーに追加して](https://kit.svelte.jp/faq#integrations) 他のミドルウェアと一緒に使うことができるようになりました。また、[開発モードでミドルウェアを追加](https://kit.svelte.jp/faq#how-do-i-use-x-with-sveltekit-how-do-i-use-middleware)することもできます。この分野ではさらに改良が加えられる予定です。
- 新しい[`sequence`ヘルパーは、複数の`handle`コールを連鎖させることができます。](https://kit.svelte./docs/modules#sveltejs-kit-hooks)
- 新しい[`handleError`フック](https://kit.svelte.jp/docs/hooks#handleerror)では、エラー追跡サービスにデータを送信したり、コンソールにエラーを表示する前にフォーマットをカスタマイズしたりすることができます。
- `adapter-node` がソケットパスをリッスンできるようになりました。([#2048](https://github.com/sveltejs/kit/pull/2048))

SvelteKitのすべてのアップデートを確認するには、[SvelteKit changelog](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md)をご覧ください。

---

## Community Showcase

**Apps & Sites**

- [macos-web](https://github.com/PuruVJ/macos-web) by @puruvjdev は、Svelteを使って、一から作り直しました。詳細はこの[Twitter スレッド](https://twitter.com/puruvjdev/status/1426267327687847939)をご覧ください。
- [Brave Search](https://search.brave.com/) は、Svelteを使用しています。
- [exatorrent](https://github.com/varbhat/exatorrent) は、GoとSvelteで書かれた、セルフホスティング可能で使いやすく、軽量で機能豊富なtorrentクライアントです。
- [json2TsTypes](https://github.com/jatinhemnani01/json2TsTypes) は、JSONをTypeScriptのTypes/Interfacesに変換するシンプルなツールです。
- [Histogram.dev](https://histogram.dev/) は、CSVの各機能のヒストグラムを生成します。
- [cybernetic.dev](https://cybernetic.dev/) は、Svelteの学習中に行われたデータ中心のUI実験のコレクションです。
- [LunaNotes](https://chrome.google.com/webstore/detail/lunanotes-youtube-video-n/oehoffnnkgcdacmbkhmlbjedinpampak?hl=en) は、YouTube動画のメモを取るのに役立つChrome拡張機能です。
- [theia.games](https://theia.games/#dev)に内蔵された3D環境エディタで、Svelteに組み込まれたメニューでVRの世界を作ることができます。
- [Ferrum](https://github.com/probablykasper/ferrum) は、Mac、Windows、Linuxで利用可能な音楽ライブラリとプレーヤーです。
- [Fluid Earth](https://github.com/byrd-polar/fluid-earth) は、地球の大気や海洋を可視化するためのインタラクティブなWebGLアプリケーションです。

**作業するSvelteプロジェクトを探していますか？** SvelteKitでのSvelte Societyの書き換えに貢献したい方は、[the list of open issues](https://github.com/svelte-society/sveltesociety-2021/issues)をご覧ください。

**Educational Content**

- [Tauri with Standard Svelte or SvelteKit](https://medium.com/@cazanator/tauri-with-standard-svelte-or-sveltekit-ad7f103c37e7) は、クロスプラットフォームのハイブリッドデスクトップアプリケーションを開発するための新しい軽量フレームワークであるTauriでSvelteをセットアップする方法を説明しています。
- [Svelte - Web App Development Reimagined [An Intro to Svelte]](https://www.youtube.com/watch?v=4CGzFwHoD0A&list=PLEx5khR4g7PKSASVAXXiAhkyx02_OeruP) は、goto; conferenceでの素晴らしいイントロトークです。
- [LevelUpTuts - Even More 5 Things I Like More In Svelte Than React](https://www.youtube.com/watch?v=ISmnG2sIOeM) は、リファレンス(必要ありません) 、メタタグなどのSvelteのアプローチを紹介しています。
- [State Management in Svelte Applications](https://auth0.com/blog/state-management-in-svelte-applications/) は、Svelteアプリケーションの状態を管理するために、Svelteの状態管理ストアを使用する方法についてのチュートリアルです。
- [Migrating from Sapper to SvelteKit](https://shipbit.de/blog/migrating-from-sapper-to-svelte-kit/) は、ShipBitのSapperからの移行の評価と振り返りです。

**Libraries, Tools & Components**

- [svelte-stripe-js](https://github.com/joshnuss/svelte-stripe-js) は、あなたのSvelteプロジェクトにStripeを追加するために必要なすべてです。100% SvelteKit互換
- [svelte-steps](https://github.com/shaozi/svelte-steps) は、Svelteで書かれたカスタマイズ可能なステップコンポーネントです。
- [simple-optics-module](https://gitlab.com/Samzelot/simple-optics-module) は、幾何学的光学の実験と教育のための、オンラインのオープンソース光学ツールです。
- [inlang](https://github.com/samuelstroschein/inlang) は、SvelteKitアプリ用の国際化(i18n)ツールです。
- [Sveno](https://github.com/pocinnovation/sveno) は、ReactコンポーネントをSvelteコンポーネントに変換するコンポーネントトランスファイラーです。
- [svelte-useactions](https://github.com/paolotiu/svelte-useactions) は、アクションをコンポーネントに渡すための完全に型付けされたライブラリです。
- [Svelte-Element-Query](https://github.com/leveluptuts/Svelte-Element-Query) は、322bのエレメントクエリ用のライブラリ/アクションです。
- [svelte-meta-tags](https://github.com/oekazuma/svelte-meta-tags) は、SvelteプロジェクトでSEO管理を容易にするプラグインです。
- [svelte-domtree](https://github.com/alex-knyaz/svelte-domtree) では、DOMを視覚化することができます。Chrome DevToolsのDOMツリーに似ています。
- クロスフレームワークの状態管理ライブラリである[Diffx](https://github.com/jbjorge/diffx/tree/master/svelte) は、Svelteのサポートが追加されました。
- [svelte-ionic-starter](https://github.com/Zettexe/svelte-ionic-starter) は、ライブリロードとiOS/Androidビルドターゲットを備えたSvelte + Ionic + CapacitorJSアプリ用のプロジェクトテンプレートです。
- [demo-sveltekit-sanity](https://github.com/stephane-vanraes/demo-sveltekit-sanity/) は、オープンソースのReactCMSであるSvelteKitおよびSanityのスターターキットです。

コミュニティサイト [sveltesociety.dev](https://sveltesociety.dev/templates/) では、Svelte エコシステム全体からの templates、adders、adapters をご覧いただけます。

## See you next month!

もっと更新情報が欲しいですか？ [Reddit](https://www.reddit.com/r/sveltejs/) or [Discord](https://discord.com/invite/yy75DKs) に参加してください！
