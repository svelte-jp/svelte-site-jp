---
title: "What's new in Svelte: 2022年3月"
description: "Svelte Summit Spring が近づく… そしてページエンドポイントの登場！"
author: Daniel Sandoval
authorURL: https://desandoval.net
---

> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-march-2022
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

発表: [Svelte Summit Spring](https://www.sveltesummit.com/) が 2022 年 4 月 30 日に開催されます。5 回目となるバーチャルな Svelte カンファレンスでは、[発表者](https://www.sveltesummit.com/#speakers)と[スポンサー](https://www.sveltesummit.com/sponsors)を募集中です。プロポーザルを書いてみませんか！

また、長らく待ち望まれていたいくつかの機能が今月 SvelteKit に追加されました…それにはページエンドポイントも含まれています！これは `load` 関数の動作を変えるもので、これにより、ベーシックなページにおけるデータの取得や、POST レスポンスからのリダイレクト、404 やその他のエラーのハンドリングなどがより簡単になります。

他にも新機能やバグフィックスがございます、以下をご覧ください！

## What's new in SvelteKit

- ドキュメントが複数ページになり、検索可能になりました。型定義もドキュメントに追加され、また、コード例をホバーすると型が表示されるようになりました。[kit.svelte.dev/docs](https://kit.svelte.dev/docs/) (訳注 : 日本語版は [kit.svelte.jp/docs](https://kit.svelte.jp/docs/)) をチェックしてみてください。
- ページエンドポイントにより、ページをロードするときに必要なボイラープレートが大幅に削減されます ([Issue](https://github.com/sveltejs/kit/issues/3532), [PR](https://github.com/sveltejs/kit/pull/3679), [Docs](https://kit.svelte.jp/docs/routing#endpoints-page-endpoints))
- アプリケーションのバージョニングとアップデートの検知がサポートされ、アプリのアップデート後にルート(route)のロードが失敗したときにどうするか決めることができるようになりました ([Issue](https://github.com/sveltejs/kit/issues/87), [PR](https://github.com/sveltejs/kit/pull/3412), [Docs](https://kit.svelte.jp/docs/configuration#version))
- `npm init svelte@next` に新しいオプションが追加され、テスト用に Playwright を自動でセットアップできるようになりました ([PR](https://github.com/sveltejs/kit/pull/4056))

**Breaking Changes**

- `target` オプションは使えなくなりましたが、代わりに、`init` スクリプトがその `parentNode` をハイドレーションします ([#3674](https://github.com/sveltejs/kit/pull/3674))
- アプリレベルの型情報を `App` namespace に埋め込めるようになり、`Stuff` や `Session` などのグローバルな型を型付けできるようになりました ([#3670](https://github.com/sveltejs/kit/pull/3670))
- `JSONString` は `JSONValue` に名前が変わりました ([#3683](https://github.com/sveltejs/kit/pull/3683))
- `createIndexFiles` は削除され、`trailingSlash` オプションでコントロールするようになりました ([#3801](https://github.com/sveltejs/kit/pull/3801))
- SvelteKit はプリレンダリングの際にルート(root)相対なリンクを除外しなくなります。もしその URL が分割したアプリによって提供されることを意図している場合、404 が発生します。そのエラーを無視する必要がある場合、カスタムで [`prerender.onError`](https://kit.svelte.dev/docs/configuration#prerender) ハンドラ を使用してください ([#3826](https://github.com/sveltejs/kit/pull/3826))

## New in Language Tools

- Svelte の language tool で、マークアップのプロパティへのアクセスが改善されました ([105.12.0](https://github.com/sveltejs/language-tools/releases/tag/extensions-105.12.0))。オートコンプリートに関するいくつかの既知の issue が解決します ([#538](https://github.com/sveltejs/language-tools/issues/538) / [#1302](https://github.com/sveltejs/language-tools/issues/1302))

---

## Community Showcase

**Apps & Sites**

- [SvelteStorm](https://github.com/open-source-labs/SvelteStorm) は、Svelte 開発者が Svelte アプリケーションを構築するのに必要なツールを全て提供することに特化した IDE です
- [Supachat](https://github.com/Lleweraf/supachat) は Svelte と Supabase を使用したリアルタイムチャットアプリです
- [Radicle](https://radicle.xyz/) はソフトウェアを共同で構築するための peer-to-peer スタックです
- [The Making Known](https://the-making-known.com/) は、第二次世界大戦中にナチスドイツが占領下のベルギー・フランス・ルクセンブルグとコミュニケーションを図るためにデザインされたポスターとの遭遇に関する、ナレーション形式の作品です
- [Svelte Kanban](https://github.com/V-Py/svelte-kanban) は Svelte と純粋な CSS で作られたシンプルなカンバンです
- [fngrng](https://github.com/nvlgzr/fngrng) は、スピードではなく正確性にフォーカスを置いたタイピングトレーナーです
- [Generative grids](https://svelte.dev/repl/873988ce33db43f097c0ca69df57b3ac?version=3.46.4) は、カラーパレットと形状をランダムに生成する、綺麗で小さい SVG グリッドです。Svelte REPL 上で動作します
- [LifeHash](https://github.com/BlockchainCommons/lifehash.info) は、美しい決定論的なアイコンを作成するハッシュ・ビジュアライゼーション手法です
- [TypedWebhook.tools](https://typedwebhook.tools/) は payload をチェックするための webhook テストツールで、自動型生成ができます
- [Speedskating](https://github.com/spiegelgraphics/speedskating) はオリンピックのスピードスケート滑走を表示するアニメーションウィジェットです。Svelte、D3、regl で構築されています
- [Web tail](https://github.com/mishankov/web-tail) はローカルまたはリモートサーバーのファイルを tail する web アプリケーションです

SvelteKit のサイトを一緒に作るのに興味がありますか？ [Svelte Society のサイトにコントリビュートしてみましょう](https://github.com/svelte-society/sveltesociety.dev/issues)！

**Learning Resources**

_To Read_

- [Svelte Components as Web Components](https://medium.com/@yesmeno/svelte-components-as-web-components-b400d1253504) by Matias Meno
- [Simple Svelte Routing with Reactive URLs](https://bjornlu.com/blog/simple-svelte-routing-with-reactive-urls) by Bjorn Lu
- [Leveling Up my Sveltekit / Sanity.io Blog Content with Featured Videos and Syntax Highlighting](https://ryanboddy.net/level-up-blog) by Ryan Boddy
- [How This Blog Makes the Most of GitHub](https://paullj.github.io/posts/how-this-blog-makes-the-most-of-github/) by paullj
- [FullStack JWT Auth: Introducing SvelteKit](https://dev.to/sirneij/fullstack-jwt-introducing-sveltekit-3jcn) by John Idogun
- [Svelte-Cubed: Adding Motion to 3D Scenes](https://dev.to/alexwarnes/svelte-cubed-adding-motion-to-3d-scenes-51lo) by Alex Warnes
- [Creating a RSS feed with Sanity and Svelte Kit](https://ghostdev.xyz/posts/creating-a-rss-feed-with-sanity-and-svelte-kit) by GHOST
- [How to use Svelte's style directive](https://geoffrich.net/posts/style-directives/) by Geoff Rich
- [SvelteKit and the "Client pattern"](https://retro.cloud/sveltekit-and-the-client-pattern/) by Julian Laubstein

_To Watch_

- [~~Shadow~~ Page Endpoints In Svelte Kit - Weekly Svelte](https://www.youtube.com/watch?v=PoYPZT7ruqI) by LevelUpTuts
- [Testing For Beginners (Playlist)](https://www.youtube.com/watch?v=y53wwdBr5AI&list=PLA9WiRZ-IS_z7KpqhPELfEMbhAGRwZrzn) by Joy of Code
- [KitQL - The native SvelteKit library for GraphQL](https://www.youtube.com/watch?v=6pH4fnFN70w) by Jean-Yves COUËT

**Libraries, Tools & Components**

- [gosvelte](https://github.com/sachinbhutani/gosvelte) は、Svelte が生成するページを Go 言語の HTTP サーバーでサーブし、Svelte コンポーネントにサーバーデータを props として送信する概念実証(proof of concept)です
- [svelte-ethers-store](https://www.npmjs.com/package/svelte-ethers-store) は ethers.js ライブラリを使用した、Svelte・Sapper・SvelteKit 向けの読み取り可能なストアのコレクションです
- [Fluid Grid](https://fluid-grid.com/) は未来の web のための CSS グリッドシステムです
- [stirstack](https://github.com/seeReadCode/stirstack) は、Svelte.js、TailwindCSS、InertiaJS、Ruby on Rails を組み合わせたオピニオネイテッドなフレームワークです。
- [OATHqr](https://codeberg.org/vhs/oathqr) は 2FA/MFA と 他の OAUTH 対応アプリを使用するためのセキュリティクレデンシャルを作るのに便利です。Aegis や YubiKey などのワンタイムパスワード認証アプリ向けのスキャン可能な QR コードを生成するのに使用します
- [svelte-GridTiles](https://github.com/honeybeeSunshine/svelte-GridTiles) はドラッグアンドドロップでサイズ変更可能なタイルライブラリで、レスポンシブグリッド上に構築されています
- [Miscellaneous Svelte Components](https://github.com/alex-knyaz/Miscellaneous-svelte-components/) は、alex-knyaz がよく使用する様々な svelte コンポーネントのコレクションです
- [walk-and-graph-svelte-components](https://github.com/j2l/walk-and-graph-svelte-components) は、svelte と js ファイルを走査し、依存関係(imports)を美しい JPG に描画する CLI node script です
- [Felte](https://www.npmjs.com/package/felte) は Svelte 向けのシンプルに使えるフォームライブラリです
- [svelte-use-tooltip](https://github.com/untemps/svelte-use-tooltip) は tooltip を表示するための Svelte action です
- [persistent-svelte-store](https://github.com/omer-g/persistent-svelte-store) は汎用的に使える書き込み可能な永続化ストアです。Svelte の store contract に従って TypeScript でスクラッチで開発されました

なにか見落としがありましたか？ [Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.com/invite/yy75DKs) に参加してください、お話を伺いましょう。

また来月お会いしましょう！
