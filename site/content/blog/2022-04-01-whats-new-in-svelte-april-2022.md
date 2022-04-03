---
title: "What's new in Svelte: 2022年4月"
description: "フォールスルールートにさようなら、param validatorにこんにちは！"
author: Daniel Sandoval
authorURL: https://desandoval.net
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-april-2022
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

今月は、SvelteKit のページプロパティの扱い方に変更がありました。フォールスルールート(fallthrough routes)を必要とするユースケースの最後の難関「パラメータプロパティの検証」が、より具体的なソリューションに置き換えられました。

より詳細な情報と、その他 Svelte の新機能について見ていきましょう…

## What's new in SvelteKit
- Param matchers により、ページをレンダリングする前に URL パラメータがマッチするかチェックできるようになりました。フォールスルールート(fallthrough routes)で URL パラメータをチェックしていた場合は、これに置き換えてください ([Docs](https://kit.svelte.jp/docs/routing#advanced-routing-matching), [#4334](https://github.com/sveltejs/kit/pull/4334))
- 明示的なリダイレクトをエンドポイントで直接扱えるようになりました ([#4260](https://github.com/sveltejs/kit/pull/4260))
- `svelte-kit sync` ([#4182](https://github.com/sveltejs/kit/pull/4182))、TypeScript 4.6 ([#4190](https://github.com/sveltejs/kit/pull/4190))、Vite 2.9 がリリースされました。ノンブロッキングな依存関係の最適化、開発モードでの実験的な CSS source map、SvelteKit チームのコントリビュートによるいくつかのバグフィックスが追加されています ([#4468](https://github.com/sveltejs/kit/pull/4468))


**New Config Options**
- `outDir` により、モノレポや、プロジェクトディレクトリの外側に出力ディレクトリを置きたい状況におけるパスの問題が解決します ([Docs](https://kit.svelte.jp/docs/configuration#outdir), [#4176](https://github.com/sveltejs/kit/pull/4176))
- `endpointExtensions` により、ご自身で endpointExtensions を指定しない限り、.js と .ts 以外のファイルがエンドポイントとして扱われるのを防ぎます ([Docs](https://kit.svelte.jp/docs/configuration#endpointextensions), [#4197](https://github.com/sveltejs/kit/pull/4197))
- `prerender.default` により、全てのページファイルに `export const prerender = true` を書かなくても全てのページをプリレンダリングすることができるようになりました ([Docs](https://kit.svelte.jp/docs/configuration#prerender), [#4192](https://github.com/sveltejs/kit/pull/4192))


**Breaking Changes**
- フォールスルールート(Fallthrough routes)が削除されました。マイグレーションのための tips については、PR を確認してみてください ([#4330](https://github.com/sveltejs/kit/pull/4330))
- `tabindex="-1"` がナビゲーションの間 `<body>` にのみ追加されるようになります ([#4140](https://github.com/sveltejs/kit/pull/4140)、[#4184](https://github.com/sveltejs/kit/pull/4184))
- Adapter は `getClientAddress` 関数を提供する必要があります ([#4289](https://github.com/sveltejs/kit/pull/4289))
- `InputProps` と `OutputProps` は、生成される `Load` において別々に型付けされるようになりました ([#4305](https://github.com/sveltejs/kit/pull/4305))
- `\$` 文字が動的なパラメータとして使えなくなりました ([#4334](https://github.com/sveltejs/kit/pull/4334))
- `svelte-kit package` が experimental としてマークされ、Kit 1.0 以降に変更があっても breaking と見なされません ([#4164](https://github.com/sveltejs/kit/pull/4164))


## New across the Svelte ecosystem
- Svelte: TypeScript、Svelte plugin ユーザー向けに新しい型が多く追加されました。`style:` ディレクティブや Svelte Actions も含まれます (**3.46.4**、**3.46.5**)
- Language Tools: Svelte のプロジェクトファイルを、TS ファイルでインポートしていなくても参照(reference)からインポート/検索できるようになりました ([105.13.0](https://github.com/sveltejs/language-tools/releases/tag/extensions-105.13.0))
- Language Tools: html で、 `<!--#region-->`/`<!--#endregion-->` で折りたたみができるようになりました ([105.13.0](https://github.com/sveltejs/language-tools/releases/tag/extensions-105.13.0))

---

## Community Showcase

**Apps & Sites built with Svelte**
- [Launcher](https://launcher.team/) はオープンソースのアプリランチャーです。SvelteKit、Prisma、Tailwind を使用しています
- [Paaster](https://paaster.io/) は end to end で暗号化された pastebin で、デフォルトで安全です。Svelte、Vite、Typescript、Python、Starlette、rclone、Docker で構築されています
- [Simple AF Video Converter](https://github.com/berlyozzy/Simple-AF-Video-Converter) は ffmpeg.wasm の Electron ラッパーです。フォーマット間の動画変換を簡単に行うことができます。
- [Streamchaser](https://github.com/streamchaser/streamchaser) は、一元化されたエンターテイメントテクノロジープラットフォームを通じて、映画やシリーズ、ドキュメンタリーなどの検索をシンプルにすることを追求しています
- [Svelte Color Picker](https://github.com/V-Py/svelte-material-color-picker) はシンプルなカラーピッカーで、Svelteで構築されています
- [ConcertMash](https://github.com/mcmxcdev/ConcertMash) は、Spotify API を使用してあなたが参加する予定のコンサートに基づいた新しいプレイリストを生成する小さな web サイトです
- [Modulus](https://modulus.vision/) はデザイン+コードのシンクタンクで、デザインとテクノロジーを進化させることを主なミッションとしています。
- [Multiply](https://www.multiply.us/) はカルチャーのスピードに合わせた PR とソーシャルの総合エージェンシーです
- [yia!](https://www.yia.co.nz/) はニュージーランドの Young Innovator Award コンペティションです
- [Write to Russia](https://www.writetorussia.org/index) は、パブリックな `.ru` のメールアドレスとやり取りするためのコミュニティメール作成プラットフォームです
- [Markdown Playground](https://github.com/Petros-K/markdown-playground) は、markdown 色々試してみるのに特化したオンラインの playground です 
- [RatherMisty](https://rathermisty.com/) は装飾を省いた天気予報アプリで、Open-Meteo の気象データを使用しています
- [Minecraft Profile Pic (MCPFP)](https://github.com/MauritsWilke/mcpfp) は Minecraft のプロフィール画像を簡単に生成できるサイトです
- [WebGL Fluid Simulation](https://github.com/jpaquim/svelte-webgl-fluid-simulation) は様々な設定が可能な流体シミュレーションで、Svelte と WebGL で構築されています
- [この @NobelPeaceOslo の展示](https://twitter.com/perbyhring/status/1504754949791621120) は、プリントグラフィックス、プロジェクションモーショングラフィックス、パーティクルアニメーション、ジェネレーティブサウンドデザインを用いて構築されています

モダンな SvelteKit webサイト に貢献してみたいですか？[Svelte Society のサイト構築を手伝っていただけませんか](https://github.com/svelte-society/sveltesociety.dev/issues)!


**Learning Resources**

_To Attend_
- [Svelte Summit: Spring](https://www.sveltesummit.com/) が2022年4月30日に開催されます！[YouTube](https://www.sveltesummit.com/) と Discord で、5回目のバーチャルな Svelte カンファレンスに是非ご参加ください 🍾

_To Read_
- [Svelte(Kit) TypeScript Showcase + general TypeScript tips](https://github.com/ivanhofer/sveltekit-typescript-showcase) by Hofer Ivan
- [Local constants in Svelte with the @const tag](https://geoffrich.net/posts/local-constants/) by Geoff Rich
- [Design Patterns for Building Reusable Svelte Components](https://render.com/blog/svelte-design-patterns) by Eric Liu
- [Svelte is better than React](https://labs.hamy.xyz/posts/svelte-is-better-than-react/) by Hamilton Greene
- [Making Visualizations Literally with Svelte and D3](https://www.connorrothschild.com/post/svelte-and-d3) by Connor Rothschild
- [Coordinating Multiple Elements with Svelte Deferred Transitions](https://imfeld.dev/writing/svelte_deferred_transitions) by Daniel Imfeld
- [Animate on scroll with Svelte Inview - Little Bits](https://dev.to/maciekgrzybek/animate-on-scroll-with-svelte-inview-266f) by Maciek Grzybek
- [Lazy-Loading Firebase with SvelteKit](https://www.captaincodeman.com/lazy-loading-firebase-with-sveltekit) and [HeadlessUI Components with Svelte](https://www.captaincodeman.com/headlessui-components-with-svelte) by Captain Codeman
- [SvelteKit Accessibility Testing: Automated CI A11y Tests](https://rodneylab.com/sveltekit-accessibility-testing/) by Rodney Lab
- [Getting Started with KitQL and GraphCMS](https://scottspence.com/posts/getting-started-with-kitql-and-graphcms) by Scott Spence
- [React ⇆ Svelte Cheatsheet](https://dev.to/joshnuss/react-to-svelte-cheatsheet-1a2a) は、2つのライブラリの類似点と相違点のリストです - by Joshua Nussbaum

_To Watch_
- [Svelte Extravaganza | Async](https://www.youtube.com/watch?v=mT4CLVHgtSg) by pngwn
- [6 Svelte Packages You Should Know](https://www.youtube.com/watch?v=y5SrUKcX_Co) and [Basic React To Svelte Conversion](https://www.youtube.com/watch?v=DiSuwLlhOxs) by LevelUpTuts
- [Page/Shadow Endpoint in SvelteKit](https://www.youtube.com/watch?v=j-9D5UDyVOM) by WebJeda
- [Custom Svelte Store: Higher Order Store](https://www.youtube.com/watch?v=p1aPfVyZ1IY) by lihautan
- [SvelteKit For Beginners (Playlist)](https://www.youtube.com/watch?v=bLBHecY4-ak&list=PLA9WiRZ-IS_zXZZyW4qfj0akvOAtk6MFS) by Joy of Code - follow along with the [blog guide](https://joyofcode.xyz/sveltekit-for-beginners)
- [Fullstack SvelteKit Auth 🔐 with Firebase & Magic Links! 🪄](https://www.youtube.com/watch?v=MAHE4iQgh5Q) by Johnny Magrippis
- [Firebase Authentication in SvelteKit! Full Stack App](https://www.youtube.com/watch?v=N6Y3hqhZvNI) by Ryan Boddy


**Libraries, Tools & Components**
- [SvelTable](https://sveltable.io/) は多機能なデータテーブルコンポーネントで、Svelteで構築されています
- [svelte-cyberComp](https://github.com/Cybersteam00/svelte-cyberComp) はパワフルで軽量な Svelte コンポーネントで、Svelte と Typescript で書かれています
- [Flowbite Svelte](https://github.com/shinokada/flowbite-svelte) は Svelte 向けの非公式な Flowbite コンポーネントライブラリです
- [Svelte-Tide-Project](https://github.com/jbertovic/svelte-tide-project) は、フロントエンドに Svelte、バックエンドに Rust の Tide を使った スターター・テンプレートです
- [Fetch Inject](https://github.com/vhscom/fetch-inject#sveltekit) は非同期な JavaScript の依存関係を管理するためのパフォーマンス最適化の実装で、Svelte をサポートし始めました
- [svelte-utterances](https://github.com/shinokada/svelte-utterances) は GitHub issues をベースにした軽量なコメントウィジェットです
- [Liquivelte](https://github.com/malipetek/liquivelte-vscode) は、Svelte ライクなコンポーネントで Shopify のテーマを構築することができます
- [@storyblok/svelte](https://github.com/storyblok/storyblok-svelte) は、Storyblok API を使用するのに必要な Svelte SDK で、リアルタイムでビジュアル編集が可能となります
- [@svelte-on-solana/wallet-adapter](https://github.com/svelte-on-solana/wallet-adapter) は Solana/Anchor アプリケーション向けのモジュラーな TypeScript wallet adapter と UI コンポーネント で、フレームワークとして SvelteJS を使用しています
- [svelte-lookat](https://www.npmjs.com/package/svelte-lookat) は、その子要素がマウスカーソル(モバイルの場合はユーザーの顔)に追従するような div を作成します

この続きは [Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.com/invite/yy75DKs) で！

また来月お会いしましょう！
