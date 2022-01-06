---
title: "What's new in Svelte: 2022年1月"
description: "SvelteKit のビルドの高速化と待望の REPL 機能"
author: Daniel Sandoval
authorURL: https://desandoval.net
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-january-2022
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

Happy new year, Svelte Community! Svelte、SvelteKit、Language Tools、 Showcase にまたがって共有することがたくさんあります。Svelte を使って2021年を素晴らしい年にしてくれた全ての方に感謝します。今年も楽しみにしています 🚀

## What's new in SvelteKit
- SvelteKit の `@sveltejs/adapter-static` に `precompress` オプションが追加され、アセットとページの brotli 圧縮が簡単にできるようになりました ([#3079](https://github.com/sveltejs/kit/pull/3079))
- SvelteKit の Concurrency mode はページを並行してプリレンダリングするようになりました ([#3120](https://github.com/sveltejs/kit/pull/3120))。`1.0.0-next.205` 以降ではデフォルトで有効になります
- CSS が自動的に JS より前にインクルードされるようになり、ページのパフォーマンスが向上します ([d13efe](https://github.com/sveltejs/kit/commit/d138efe21692f5925f1e89afc0a33f42d6a1a711))
- 新しい設定オプションによって service worker の登録を無効にできるようになり、カスタムで独自の登録を行うことができます ([#2988](https://github.com/sveltejs/kit/pull/2988))
- SSR のルート分割(route-splitting)の導入 - モノリシックなビルドをより小さなピースに分割し、起動とルーティングのパフォーマンスを向上させます ([#2931](https://github.com/sveltejs/kit/pull/2931))
- `request.origin/path/query` は `request.url` になりました - 設定とページの `load` 関数がシンプルになりました ([#3126](https://github.com/sveltejs/kit/pull/3126))
- [Vite 2.7 へのアップデート](https://github.com/sveltejs/kit/pull/3018)後、SvelteKit ユーザーから [大幅なパフォーマンスの向上が報告されており](https://www.reddit.com/r/sveltejs/comments/rljhfc/sveltekit_massive_compiler_improvement_by/)、SSRでのサードパーティライブラリのロードも大幅に改善されました
- 設定ファイルの変更時、SvelteKit サーバーが自動的に再起動するようになりました ([vite-plugin-svelte#237](https://github.com/sveltejs/vite-plugin-svelte/pull/237))


## Other new bits from `svelte/*`
- [Svelte 3.44.3](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md#3443) がリリースされ、バインディングやループコードのいくつかのバグが修正されました
- Svelte Language Tools が、Svelte 3.41 からの then/catch の短縮構文と TypeScript の "go to" 機能 ([105.8.0 以降](https://github.com/sveltejs/language-tools/releases/tag/extensions-105.8.0)) のサポートが導入されました
- Svelte REPL にも素晴らしいアップグレードがあります - 保存された REPL を削除できるようになりました。[svelte.dev/apps](https://svelte.dev/apps) にログインして試してみてください


---

## Community Showcase

**Apps & Sites**
- [Discover Twitter Spaces](https://github.com/navneetsharmaui/discover-twitter-spaces) は Twitter Spaces を探すのに便利なツールです
- [Modern Fluid Typography Editor](https://github.com/codeAdrian/modern-fluid-typography-editor) は CSS clamp を使用して美しい fluid typography の作成を手助けしてくれます
- [Unnwhiteboard](https://github.com/AviKKi/unnwhiteboard) は "ホワイトボード" 面接を行わない企業(またはチーム)のための job board です 
- [Secret Santa](https://gitlab.com/arturoguzman/secret-santa-sveltekit) は手軽さを重視して開発されたギフトコーディネートアプリです
- [LogSnag](https://logsnag.com/) は、プロジェクトのイベントを通知し、タイムラインを提供することで、重要なことが起こったときにそれを記録することができます
- [Version 0.2 of Tangent](http://tangentnotes.com/Download) はSvelteベースのノートアプリで、ベータ版になりました
- [Intl Explorer](https://github.com/jesperorb/intl-explorer) は Intl に対応する全てのフォーマッターの出力を見るためのツールです

Svelte のメインの Web サイトと Svelte REPL を https://github.com/sveltejs/sites リポジトリに移行するために多くの作業が行われました - それには [svelte.dev](https://svelte.dev/) のリニューアルも含まれます。これを実現した全てのコントリビューターに感謝します！

もし何か作業できる楽しいSvelteKitプロジェクトをお探しなら、[Svelte Society サイトの書き直しに貢献できます](https://github.com/svelte-society/sveltesociety-2021/issues) 💅


**Learning and Listening**

_To Read_
- [Mutating Query Params in SvelteKit Without Page Reloads or Navigations](https://dev.to/mohamadharith/mutating-query-params-in-sveltekit-without-page-reloads-or-navigations-2i2b) by Mohamad Harith
- [Svelte for Reactaholics : A guide for React developers](https://www.100ms.live/blog/svelte-guide-for-react-developers) by Puru Vijay
- [Svelte's lifecycle methods can be used anywhere](https://geoffrich.net/posts/svelte-lifecycle-examples/) and [The many meanings of $ in Svelte](https://geoffrich.net/posts/svelte-$-meanings/) by Geoff Rich
- [Vercel and Svelte: A Perfect Match for Web Developers](https://thenewstack.io/vercel-and-svelte-a-perfect-match-for-web-developers/) by Darryl K. Taft
- [User-defined TailwindCSS Color Scheme with Svelte Stores](https://blog.dayslice.io/user-defined-tailwindcss-color-scheme-with-svelte-stores-ad80ca2cf038) by jeremy zaborowski
- [Ionic 6 + Svelte 🚀](https://medium.com/@raymondboswel/ionic-6-svelte-ae904caa82df) by Raymond Boswel
- [What happened in #Svelte language tools this year](https://twitter.com/dummdidumm_/status/1474158105395179525?t=ytj2K2Q52iD5-lNyLnQaAQ&s=19) by Simon H

_To Watch_
- [The Future of Svelte (Interview with Rich Harris)](https://www.youtube.com/watch?v=uQntFkK8Z54) by Lee Robinson, Director of Developer Relations at Vercel
- [Svelte is becoming the go-to framework](https://www.youtube.com/watch?v=fo6BKY2xR2w&t=1834s) for Obsidian plugin developers
- [Sveltekit WordPress Headless Blog](https://www.youtube.com/watch?v=c0UDVgjPxFw) by WebJeda
- [Getting started with SvelteKit](https://www.youtube.com/watch?v=i2suPKMPUFA) by Lihau Tan
- [Deploy a full-stack SvelteKit app on Cloudflare Pages](https://www.youtube.com/watch?v=Wc1_U6Dy5Tw) by 1nf

_To Listen To_
- [Syntax podcast: How To Do Things In Svelte](https://podcasts.apple.com/ca/podcast/how-to-do-things-in-svelte/id1253186678?i=1000544796072)
- [JS Party #205: So much Sveltey goodness (w/ Rich Harris)](https://changelog.com/jsparty/205)

**Libraries, Tools & Components**
- [svelte-headlessui](https://github.com/rgossiaux/svelte-headlessui) は Headless UI コンポーネントライブラリの、アンオフィシャルなSvelte向けの完全移植版です
- [svelte-forms v2](https://chainlist.github.io/svelte-forms/) がリリースされました - 作者は [フィードバックを募集中です](https://www.reddit.com/r/sveltejs/comments/r6354j/svelteforms_v2_has_been_released/)
- [Percival](https://github.com/ekzhang/percival) は宣言的なデータクエリと視覚化言語(visualization language)です
- [Svelte FlatList](https://github.com/snuffyDev/svelte-flatlist) はモバイルフレンドリーで、シンプルで、カスタマイズ可能なドラッグメニューです
- [svelte-keyed](https://github.com/bryanmylee/svelte-keyed) はオブジェクトと配列向けの writable derived store です
- [Svemix](https://github.com/svemix/svemix) は Svelte 向けの Remix です - Svelte コンポーネント/ルート内にサーバースクリプトを配置し、それがエンドポイントに変換されます

ショーケースに追加したいものがありますか？ Svelte でアイデアを実現するのに助けが必要ですか？ [Reddit](https://www.reddit.com/r/sveltejs/) また [Discord](https://discord.com/invite/yy75DKs) にご参加ください！

また来月お会いしましょう！
