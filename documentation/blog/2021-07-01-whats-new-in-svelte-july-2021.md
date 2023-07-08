---
title: "What's new in Svelte: 2021年7月"
description: バグ修正、TypeScriptツール、および多数の新機能でクールに保つ
author: Dani Sandoval
authorURL: https://dreamindani.com
---

> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-july-2021
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

北半球が暑くなる中、 Svelte はパフォーマンス向上やバグ修正、 TypeScript のサポート強化、エコシステム全体から多くの新しいコンポーネントやツールの追加などで涼しさを保ちました。ちょっと覗いてみましょう。 👀

## New in SvelteKit

- `adapter-node` gzip と brotli を使ってアセットを事前に圧縮するようになりました。 ([#1693](https://github.com/sveltejs/kit/pull/1693))
- TypeScript トランスパイルのサポートが `svelte-kit package` ツールに追加されました。 ([#1633](https://github.com/sveltejs/kit/pull/1633))
- `adapter-node` デフォルトのキャッシングを改善しました。 ([#1416](https://github.com/sveltejs/kit/pull/1416))
- Rollup の出力オプションを設定可能に。 ([#1572](https://github.com/sveltejs/kit/pull/1572))
- HMR での SSL の使い方を修正。 ([#1517](https://github.com/sveltejs/kit/pull/1517))

## Features & bug fixes from around svelte/*
- [Svelte 3.38.3](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md#3383) (released June 22) には、ハイドレーションの最適化、バブリングイベントでの `this` の保存など、多くのパフォーマンス改善とバグ修正が含まれています。
- 最新の Svelte Language Tools のリリースでは、コンポーネント外部での prop 名変更サポート、 PostCSS の構文文法、 Svelte ファイルから型定義を作成するのに使用できる `svelte2tsx` の `.d.ts` 出力ターゲットが追加されました。
- また、 Svelte Language Tools では、 TypeScript のサポートを強化するための待望の実験的機能が追加されました。 - コンポーネントのイベントやスロットに明示的に型を付与することや、ジェネリックを使用することなどです。 詳細は [the RFC](https://github.com/sveltejs/rfcs/pull/38) をご覧いただき、お使いの方は [this issue](https://github.com/sveltejs/language-tools/issues/442) にフィードバックをお願いします。
- `svelte-scroller` 2.0.7 では、 quality-of-life をいくつか修正しました。初期の幅に関するバグを修正し、`index` をより控えめに更新しました。

## Coming soon to Svelte
- マークアップにおける定数 - ([RFC](https://github.com/sveltejs/rfcs/blob/master/text/0000-markup-constants.md)) ローカル定数を定義する新しい `{@const ...}` タグを追加しました ([PR](https://github.com/sveltejs/svelte/pull/6413))

---

## Community Showcase

**Apps & Sites**

- [SvelteThemes](https://sveltethemes.dev/) svelte, sveltekit, elderjs, routify などを使用して構築された Svelte テーマとテンプレートの厳選されたリストです。
- [Beatbump](https://github.com/snuffyDev/Beatbump) は、Svelte/SvelteKit を用いて作成された、 YouTube Music 代替のフロントエンドツールです。
- [Sveltuir](https://github.com/webspaceadam/sveltuir) はギターのフレットボードを覚えるのに役立つアプリです。

**Educational Content**

- [Svelte Radio: A Jolly Good Svelte Summer](https://share.transistor.fm/s/60880542) は、 Svelte の最新情報や Svelte Radio 1周年を祝うトークです。
- [Class properties in Svelte](https://navillus.dev/blog/svelte-class-props) は、 React から Svelte に乗り換える開発者のために、 `class` の力を再確認します。
- [Sveltekit Tutorial for Beginners](https://www.youtube.com/playlist?list=PLm_Qt4aKpfKjf77S8UD79Ockhwp_699Ms) は、 WebJeda による SvelteKit を学ぶためのビデオプレイリストです。
- [How To Cache Dynamic Pages On Demand With A Service Worker In SvelteKit](https://jochemvogel.medium.com/how-to-cache-dynamic-pages-on-demand-with-a-service-worker-in-sveltekit-4b4a7652583d) は、 SvelteKit でオンデマンドキャッシングに使用されるサービスワーカーの力を説明します。
- [Vue vs Svelte: Comparing Framework Internals](https://www.vuemastery.com/blog/vue-vs-svelte-comparing-framework-internals/) は、 Vue と Svelte の違いを内側から深く掘り下げます。
- [Setting up a development environment for SvelteKit with Docker and Docker Compose](https://jenyus.web.app/blog/2021-05-30-setting-up-a-development-environment-for-sveltekit-with-docker-and-compose) は、どんなデバイスでコードを実行しても、再利用可能な開発環境を作るために Docker を使用する方法を説明します。
- Scalable Scripts は今月、 Docker 化された Svelte アプリを [AWS](https://youtu.be/VOs2Od5jYOc), [Azure](https://youtu.be/gdg4ne_uDm8), [Google Cloud](https://youtu.be/_-uBb61Tikw) にデプロイする方法を説明した3つのビデオを公開しました。
- [Render Katex with Svelte from zero to hero](https://www.youtube.com/watch?v=euowJs9CblA) は、 Svelte プロジェクトに Katex を導入する方法を紹介します。
- [Using Custom Elements in Svelte](https://css-tricks.com/using-custom-elements-in-svelte/) では、 Svelte サイトで custom elements を使用する際に注意すべき点を紹介しています。

**Libraries, Tools & Components**

- [svelte-pipeline](https://github.com/novacbn/svelte-pipeline) は、 Svelte Store として、 REPL や Editor などにカスタムの JavaScript コンテキストと Svelte Compiler を提供します。
- [Sveltotron](https://github.com/Salemmous/sveltotron) はあなたの Svelte アプリを検査するために作られた Electron ベースのアプリです。
- [svelte-qr-reader-writer](https://github.com/pleasemarkdarkly/svelte-qr-reader-writer) は、QRコードからのデータの読み取りと書き込みを支援する Svelte コンポーネントです。
- [svelte-stack-router](https://www.npmjs.com/package/svelte-stack-router) Stacks との連携により、 Svelte アプリをよりネイティブに近づけることを目的としています。
- [svelte-typed-context](https://www.npmjs.com/package/svelte-typed-context) では、 `getContext` や `setContext` に提供されると、より厳密な型が可能になるインターフェースを提供しています。
- [svelte-modals](https://svelte-modals.mattjennings.io/) は、シンプルで柔軟性が高く、 zero-dependency のモーダルマネージャです。

**コンポーネントを投稿したいですか？ Svelte を Web 上で存在感を高めることに興味がありますか？** コンポーネントを Svelte Society サイトに提出するには、 [a PR to this file](https://github.com/svelte-society/sveltesociety-2021/blob/main/src/routes/components/components.json) を作成してください。 SvelteKit で Svelte Society の書き直しに貢献したい場合は、 [the list of open issues](https://github.com/svelte-society/sveltesociety-2021/issues) をチェックしてください。

## See you next month!

もっと更新情報が欲しいですか？ [Reddit](https://www.reddit.com/r/sveltejs/) or [Discord](https://discord.com/invite/yy75DKs) に参加してください！
