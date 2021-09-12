---
title: What's new in Svelte: 2021年8月
description: おお！ Shadow DOM、export と await だ。
author: Daniel Sandoval
authorURL: https://desandoval.net
---

> 翻訳 : Svelte日本コミュニティ
> 原文 : https://svelte.dev/blog/sveltekit-beta
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。
> 正確な内容についてはsvelte.devの原文を参照してください。
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

Changelog（[JS Party Ep. 182](https://changelog.com/jsparty/182)）から Svelte Radio（エピソード [29](https://share.transistor.fm/s/adc23e84) と [30](https://share.transistor.fm/s/6316622d)）まで、今月は Svelte のことを話さずにはいられなかったようですね。また、Svelte では、shadow DOM のサポートと、新たに export や await 機能が追加されました。

## New in Svelte

7月は、未解決の PR の数を減らすために本当に努力し、Svelte 3.39.0、3.40.0、3.41.0がリリースされたように、Svelte コアリポジトリにとって2019年後半から最も活発な月でした。大量のバグ修正に加えて、以下の新機能が追加されました。

- イベント修飾子 `|trusted` は、イベントが呼び出される前に、そのイベントが信頼できるかどうかをチェックすることができます（[#6137](https://github.com/sveltejs/svelte/issues/6137)）。
- SvelteKit SSR の改善作業をサポートする新しい `svelte/ssr` パッケージです（[#6416](https://github.com/sveltejs/svelte/pull/6416)）。
- TypeScript ファイルの前処理を改善するための新しい `errorMode` コンパイラオプション（[#6194](https://github.com/sveltejs/svelte/pull/6194)）。
- コンポーネント作成時に `target` として `ShadowRoot` を指定できるようになり、Svelte コンポーネントを shadow DOM 内でレンダリングできるようになりました（[#5869](https://github.com/sveltejs/svelte/issues/5869)）。
- `export { ... } from`（[#2214](https://github.com/sveltejs/svelte/issues/2214)）、`export let { ... } =`（[#5612](https://github.com/sveltejs/svelte/issues/5612)）と `{#await ... then/catch}`（[#6270](https://github.com/sveltejs/svelte/issues/6270)）の構文がすべて Svelte コンポーネントでサポートされました。

機能とバグ修正の全リストは、[Svelte の Changelog](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md) をご覧ください。

## SvelteKit Updates
- `prerender.force` が `prerender.onError` になり、ビルドに失敗するエラーと失敗しないエラーを微調整できるようになりました（[#2007](https://github.com/sveltejs/kit/pull/2007)）。
- esbuild の設定が SvelteKit adapters で使用できるようになりました（[#1914](https://github.com/sveltejs/kit/pull/1914)）。
- 一般的な設定エラー（[#1910](https://github.com/sveltejs/kit/pull/1910)）やコンパイラエラー（[#1827](https://github.com/sveltejs/kit/pull/1827)）のエラーメッセージがより分かりやすくなりました。
- 対象となるホストが SvelteKit アプリケーションと同じか、より特定のサブドメインである場合にのみ Cookie がパスされるようになりました（[#1847](https://github.com/sveltejs/kit/pull/1847)）。
- より良い imports のために、パッケージング時に index.js の exports がディレクトリの exports に変更されるようになりました（[#1905](https://github.com/sveltejs/kit/pull/1905)）。
- Vite.js の `mode` が `$app/env` から公開されるようになりました（[#1789](https://github.com/sveltejs/kit/pull/1789)）。
- 全般的に types が向上（[#1778](https://github.com/sveltejs/kit/pull/1778)、[#1791](https://github.com/sveltejs/kit/pull/1791)、[#1646](https://github.com/sveltejs/kit/pull/1646)）。

SvelteKit のすべてのアップデートを確認するには、[SvelteKit の Changelog](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md) をご覧ください。

## Features & bug fixes from around svelte/*
- 言語ツールが "Workplace Trust" 機能をより適切にサポートするようになりました（VS Code の使用において）。
- svelte2tsx では、JS 出力の修正 によって、ambient タイプの宣言の名前が変更され、将来的に宣言が衝突しないようになりました。ユーザーは ambient タイプの定義を自分で提供できることが期待されています。
- Sapper は v0.29.2 をリリースしました。このバージョンでは、正規表現のルート、ディレクトリ要求時のステータスコード、ユーザーが `base` タグを提供していない場合の exports を修正しています（[changelog](https://github.com/sveltejs/sapper/blob/master/CHANGELOG.md)）。

---

## Community Showcase

**Apps & Sites**
- [Parsnip](https://www.parsnip.ai/) は、モバイルファーストのプログレッシブウェブアプリで、家庭料理を学ぶのに役立ちます。詳しくは、[Reddit の記事](https://www.reddit.com/r/sveltejs/comments/oearb9/learning_to_cook_at_home_with_parsnip_built/)をご覧ください。
- [Central Bank Digital Currency (CBDC) tracker](https://www.atlanticcouncil.org/cbdctracker/) は、世界各国でどのようにデジタル通貨を導入しているかを記録したサイトです。
- [Svelte Commerce](https://github.com/itswadesh/svelte-commerce) は、Sveltekit をベースにした、Eコマースのための先進的なフロントエンドプラットフォームです。
- [neovimcraft](https://neovimcraft.com/) は neovim プラグインに特化した SvelteKit 製サイトです。

**Svelte のプロジェクトをお探しですか？ウェブ上での Svelte の存在感を高めることに興味がありますか？** SvelteKit での Svelte Society の書き換えに貢献したい方は、[未解決の Issue のリスト](https://github.com/svelte-society/sveltesociety-2021/issue)をチェックしてください。

**Educational Content**
- [How I Built a Cross-Platform Desktop Application with Svelte, Redis, and Rust](https://css-tricks.com/how-i-built-a-cross-platform-desktop-application-with-svelte-redis-and-rust/) は、Cloudflare 社の Svelte メンテナおよび Developer Advocate である Luke Edwards 氏のブログ記事です。
- [How to Create a Blog with SvelteKit and Strapi](https://strapi.io/blog/how-to-create-a-blog-with-svelte-kit-strapi) は、Strapi の Aarnav Pai 氏による段階的なチュートリアルです。
- [Sveltekit Markdown Blog](https://www.youtube.com/watch?v=sKKgT0SEioI&list=PLm_Qt4aKpfKgonq1zwaCS6kOD-nbOKx7V) は、WebJeda 氏による YouTube のチュートリアルシリーズです。
- [Using Custom Elements in Svelte](https://css-tricks.com/using-custom-elements-in-svelte/) Geoff Rich 氏による Custom Elements の紹介です。
- [learn / graphql / svelte](https://hasura.io/learn/graphql/svelte-apollo/introduction/) は、Hasura の2時間で学べる無料の GraphQL 講座です。
- [How to add Magic Link to a SvelteKit application](https://magic.link/posts/magic-svelte) は、もっとも知られているパスワードレスのログインパターンを解説しています。

**Libraries, Tools & Components**
- [Svelte-Capacitor](https://github.com/drannex42/svelte-capacitor/) は、v2.0.0 をリリースしました。Svelte と Capacitor を使用して、ネイティブに近いパフォーマンスで iOS と Android 用のハイブリッドモバイルアプリケーションをより簡単に構築することができます。
- [svelte-remixicon](https://github.com/ABarnob/svelte-remixicon) は、Remix Icon をベースにした Svelte 用のアイコンライブラリで、2000種類以上のアイコンが収録されています。
- [SveltePress](https://github.com/GeopJr/SveltePress) は、SvelteKit 上に構築されたドキュメントツールです。
- [Svelte Starter Kit](https://github.com/one-aalam/svelte-starter-kit/tree/auth-supabase) は、Supabase を利用した Auth と User Profiles により、Svelte を迅速に立ち上げるためのボイラプレートです。
- [Kahi UI](https://github.com/novacbn/kahi-ui) はダークモードが組み込まれた Svelte 初の UI Kit です。
- [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n) は、 TypeScript や JavaScript プロジェクトのための、独断的で、完全に型安全な軽量ローカリゼーションライブラリで、外部依存はありません。

コミュニティサイト [sveltesociety.dev](https://sveltesociety.dev/templates/) では、Svelte エコシステム全体からの templates、adders、adapters をご覧いただけます。


## See you next month!

もっと更新情報が欲しいですか？ [Reddit](https://www.reddit.com/r/sveltejs/) or [Discord](https://discord.com/invite/yy75DKs) に参加してください！