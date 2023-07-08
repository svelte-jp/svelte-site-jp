---
title: "What's new in Svelte: 2021年10月"
description: "What's new in Svelte は1周年"
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte日本コミュニティ
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-october-2021
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。
> 正確な内容についてはsvelte.devの原文を参照してください。
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

やぁみんな👋 Svelteブログに「What's new in Svelte」を掲載し始めてから1年が経ちました。いつも読んでくださっている皆さん、そして毎月投稿してくださっている皆さんにこの場を借りて感謝の気持ちをお伝えしたいと思います。メンテナから、DiscordやRedditに投稿してくれる皆さんまで、Svelteコミュニティを素晴らしいものにするための努力を目の当たりにするのは素晴らしいことです。

皆さん、これからもがんばっていきましょう！それでは、今月のニュースに飛び込んでみましょう…

## New around Svelte

- Svelteのエクスポートマップに新たな機能が追加され、SSRのライフサイクル関数のno-opバージョンが公開されるようになりました (Svelte **3.43.0**)
- `src`属性を持つカスタムコンポーネントが、`svelte-native`のビルドを崩さなくなりました (Svelte **3.42.4**)
- [TypeScriptプラグイン](https://www.npmjs.com/package/typescript-svelte-plugin)を有効にしていないSvelteプラグインのユーザは、TypeScriptプラグインを有効にするよう促されるようになりました。TypeScriptプラグインはSvelteファイルを取り扱うためのインテリセンスを追加し、TypeScriptとJavaScriptのファイルを強化します。使用されている方は、[フィードバックをお願いします](https://github.com/sveltejs/language-tools/issues/580) (Svelte extensions **105.4.0**)
- イベントモディファイヤがインテリセンスに追加され、オートコンプリートされたりホバーで情報が表示されたりするようになりました (Svelte extensions **105.4.0**)
- Svelteバージョン3.39以降と`svelte-preprocess`バージョン4.9.5以降を使用している場合、TypeScriptユーザは型のインポートと値のインポートを厳密に分ける必要がなくなりました。つまり、`import type { MyInterface } from './somewhere'; import { myValue } from './somewhere'`の代わりに、`import { MyInterface, myValue } from './somewhere'`と書くことができるようになりました。主にこの機能を実装したコミュニティメンバの[@SomaticIT](https://github.com/SomaticIT)氏に厚く感謝します！

機能やバグフィックスの全リストは、[SvelteのChangelog](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md)をご覧ください。

## SvelteKit Updates

先月も100近いPRがコミットされましたが、まだまだやるべきことはたくさんあり、Svelteメンテナは[SvelteKitを1.0にするための支援を求めています](https://github.com/sveltejs/kit/issues/2100)。Antonyは、この問題に関する[最近のコメント](https://github.com/sveltejs/kit/issues/2100#issuecomment-895446285)の中で、このように言っていました:

> もし自分がコントリビュートできないほどのドシロートだと思うなら（そんなことはありませんが）、テストを追加するか、追加したい機能のテストを書いてから追加してください！小さく始めて、その方法でコードベースを学びましょう。

貢献したい方は、[「help wanted」とラベル付けされた1.0へのマイルストーンのIssue](https://github.com/sveltejs/kit/issues?q=is%3Aopen+is%3Aissue+milestone%3A1.0+label%3A%22help+wanted%22)のいずれかに取り組むことをご検討ください。

今月のSvelteKitの注目すべき改善点は…

- サービスワーカーが`$lib`エイリアスを使用してファイルにアクセスできるようになりました ([#2326](https://github.com/sveltejs/kit/pull/2326))
- SvelteのライブラリがViteの設定なしですぐに動作するようになりました ([#2343](https://github.com/sveltejs/kit/pull/2343))
- package exportsフィールドの改善 ([#2345](https://github.com/sveltejs/kit/pull/2345)と [#2327](https://github.com/sveltejs/kit/pull/2327))
- [重要]`prerender.pages`設定オプションの名称が`prerender.entries`に変更されました ([#2380](https://github.com/sveltejs/kit/pull/2380))
- フックからのBodyの型付けを可能にするために、新しいジェネリック引数が追加されました ([#2413](https://github.com/sveltejs/kit/pull/2413))
- packageコマンドの実行時にpackage.jsonに`svelte`フィールドが追加されるようになりました ([#2431](https://github.com/sveltejs/kit/pull/2431))
- [重要]load関数の`context`パラメータが`stuff`に改名されました ([#2439](https://github.com/sveltejs/kit/pull/2439))
- `adapter-node`を使ってカスタムサーバを構築するときのために、`entryPoint`オプションを追加しました ([#2414](https://github.com/sveltejs/kit/pull/2414))
- `vite-plugin-svelte`は、SvelteコンポーネントのTypeScript、PostCSS、Scssなどの自動プリプロセッサにViteを使用する[useVitePreprocess](https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#usevitepreprocess)のサポートを改善しました ([#173](https://github.com/sveltejs/vite-plugin-svelte/pull/173))

SvelteKitのすべての更新を確認するには、[SvelteKitのChangelog](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md)をご覧ください。


---

## Community Showcase

**Apps & Sites**

- [radiofrance](https://www.radiofrance.fr/)は、ウェブサイトをSvelteKitに移行しました
- [FLAYKS](https://flayks.com/)は、SvelteKit、Sanity、Anime.jsで作られたFélix Péaultのポートフォリオサイトです
- [hirehive](https://www.hirehive.com/)は、求職者と仕事のトラッキングサイトです
- [Microsocial](https://microsocial.xyz/)は、実験的なPeer-to-Peerソーシャルプラットフォームです
- [Dylan Ipsum](https://www.dylanlyrics.app/)は、lorem ipsumをBob Dylanの歌詞に置き換えるランダムテキストジェネレータです
- [Chip8 Svelte](https://github.com/mikeyhogarth/chip8-svelte)は、CHIP8 TypeScriptの上に構築されたCHIP-8エミュレータのフロントエンドです

**Svelteのプロジェクトをお探しですか？ウェブ上でのSvelteの存在感を高めることに興味がありますか？**SvelteKitでのSvelte Societyの書き換えに貢献したい方は、[オープンなIssueのリスト](https://github.com/svelte-society/sveltesociety-2021/issues)をチェックしてください。

**Podcasts Featuring Svelte**

- [Syntax Podcast: From React to SvelteKit](https://podcasts.apple.com/us/podcast/from-react-to-sveltekit/id1253186678?i=1000536276106) ReactからSvelteKitへ Level Up TutorialsをReactからSvelteKitに移行した理由、方法、利点、注意すべき点などについて、ScottとWesが語ります！
- [Web Rush Podcast: Svelte Tools and Svelte Society](https://www.webrush.io/episodes/episode-150-svelte-tools-and-svelte-society) Kevin Åberg Kultalahtiが、Svelte Societyとは何か、Svelteに期待していること、製品にとってドキュメントがいかに重要であるか、など _など_ について語ります
- [Svelte: The Compiled Future of Front End](https://www.arahansen.com/the-compiled-future-of-front-end/)では、コンポーネントベースのフロントエンドの歴史と、コンパイラがどのようにすべてを変えるかについて詳しく説明しています
- [Svelte Radio: Contributing to Svelte with Martin 'Grygrflzr' Krisnanto Putra](https://share.transistor.fm/s/10aa305c) Grygrflzrがメンテナになるまでの道のりや、React、Vite、その他多くのことについての見解を語っています
- [Svelte Radio: Routify 3 with Jake and Willow](https://share.transistor.fm/s/10aa305c) Svelte RadioクルーがRoutifyのメンテナと一緒に、リリースされたばかりのRoutify 3について語ります
- [JS Party: 1Password](https://twitter.com/geoffrich_/status/1441816829853253640?s=20)がページ内提案にSvelteを使用していることに言及している、The Changelog's JS Partyの最新エピソードです

**Educational Content**

- [How I built a blog with Svelte and SvelteKit](https://fantinel.dev/blog-development-sveltekit/)は、Svelte、SvelteKit、プログレッシブ・エンハンスメントについて、コード例を交えて紹介しています
- [I built a decentralized chat dapp](https://www.youtube.com/watch?v=J5x3OMXjgMc)は、GUNのような一般的なweb3技術を使って、分散型ウェブアプリ（dapp）を構築する方法についてのチュートリアルです
- [Writing a Svelte Store with TypeScript](https://javascript.plainenglish.io/writing-a-svelte-store-with-typescript-22fa1c901a4)は、TypeScriptを使ってSvelteストアを書くことについて、深く掘り下げています
- [How Svelte scopes component styles](https://geoffrich.net/posts/svelte-scoped-styles/)では、クラスを使用やより複雑なCSS指定子を使用したスコープの作り方について説明しています。
- [SvelteKit Hooks](https://www.youtube.com/watch?v=RarufLoEL08)では、Sveltekitでのhooks.jsの使用方法を説明しています。終わったら、[パート2](https://www.youtube.com/watch?v=RmIBG3G0-VY)をご覧ください
- [An early look at SvelteKit](https://www.infoworld.com/article/3630395/an-early-look-at-sveltekit.html)は、Infoworld社がSvelteKitの機能とオンボーディングについて解説した記事です

**Libraries, Tools & Components**

- [sveltekit-netlify-cms](https://github.com/buhrmi/sveltekit-netlify-cms)は、Netlify CMSで使用するために構成されたSvelteKitスケルトンアプリです
- [SvelteFireTS](https://github.com/jacobbowdoin/sveltefirets)は、Fireship.ioにインスパイアされた、SvelteKit + TypeScript + Firebaseライブラリです
- [stores-x](https://github.com/Anyass3/stores-x)は、vueXのようにSvelteストアを使用することができます
- [sveltekit-snippets](https://github.com/stordahl/sveltekit-snippets)は、SvelteKitとVanilla Svelteの共通パターンのスニペットを提供するVSCode拡張です
- [svelte-xactor](https://github.com/wobsoriano/svelte-xactor)は、xactorマシンをストアコントラクトを実装したグローバルストアに簡単に変換することができるミドルウェアです
- [vite-plugin-pages-svelte](https://github.com/aldy505/vite-plugin-pages-svelte)は、ファイルシステムベースの自動ルーティングのためのviteプラグインです
- [sveltio](https://www.npmjs.com/package/sveltio)は、proxy-stateライブラリであるvaltioのSvelteラッパーです
- [svelte-transition-classes](https://github.com/rmarscher/svelte-transition-classes)は、CSSクラスを追加および交換するためのSvelteカスタムトランジションです
- [Svelte-Boring-Avatars](https://github.com/paolotiu/svelte-boring-avatars)は、人気の高いReactプロジェクト「[Boring Avatars](https://github.com/boringdesigners/boring-avatars)」のSvelte移植版です
- [Svelte DataTables](https://github.com/homescriptone/svelte-datatables)は、データを簡単に表形式で表示できるJavaScriptライブラリDataTableをSvelteプロジェクトに移植したものです
- [focus-svelte](https://github.com/chanced/focus-svelte)は、依存関係をもたないSvelte用のフォーカストラップです
- [filedrop-svelte](https://github.com/chanced/filedrop-svelte)は、Svelte用のファイルドロップゾーンのアクションとコンポーネントです

コミュニティサイト[sveltesociety.dev](https://sveltesociety.dev/templates/)には、Svelteエコシステムのテンプレート、アダー、アダプタが多数掲載されていますので、ぜひご覧ください。

## Before you go, answer the call for speakers!

Svelte Summit Fall 2021（2021年11月20日開催）では、講演者を募集しています。10月30日までにトークプロポーザルを提出してください…どなたでも発表や参加が可能です。

### More info on the [sessionize site](https://sessionize.com/svelte-summit-fall-2021/)

サミットまで待てませんか？[Reddit](https://www.reddit.com/r/sveltejs/)や[Discord](https://discord.com/invite/yy75DKs)にご参加ください！
