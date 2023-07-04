---
title: "What's new in Svelte: 2022年6月"
description: "キャンセル可能なディスパッチイベント、より深い {@const} 宣言など!"
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-june-2022
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

先月 [Svelte Summit](https://www.youtube.com/watch?v=qqj2cBockqE) があったので、私たちは学んだことすべてをこの6月に適用する準備ができています! また、`createEventDispatcher`、`@const` 宣言 などの QOL を上げてくれる変更や、SvelteKit 1.0 に向けた大量の進捗があります。

それでは見ていきましょう!

## What's new in Svelte

- `createEventDispatcher` 関数で、カスタムイベントをキャンセルできるようになりました (**3.48.0**, [Docs](https://svelte.jp/docs#run-time-svelte-createeventdispatcher), [PR](https://github.com/sveltejs/svelte/pull/7064))
- `{@const}` タグが `{#if}` ブロックの中で使えるようになり、条件に応じて変数が定義できるようになりました (**3.48.0**, [Docs](https://svelte.jp/docs#template-syntax-const), [PR](https://github.com/sveltejs/svelte/pull/7451))
- `<svelte:element>`、アニメーション、多くの DOM 要素に関するバグが修正されました。詳細は [CHANGELOG](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md#3480) をご覧ください!

## What's new in SvelteKit

- Vite 2 のリリースの最後の1つとして、Vite 2.9.9 がリリースされました。Svelte チームは、SvelteKit と Vite の統合をこれまで以上にスムーズにするために、Vite 3 のリリースに向けて、一生懸命コントリビュートしています ([Vite 3.0 Milestone](https://github.com/vitejs/vite/milestone/5))
- `config.kit.alias` によって、`import` 文の値を置き換えるカスタムのエイリアスを簡単に宣言できるようになりました ([Docs](https://kit.svelte.dev/docs/configuration#alias), [PR](https://github.com/sveltejs/kit/pull/4964))
- プリレンダリングされるようマークされたページが、SSR の実行中に失敗するようになりました ([PR](https://github.com/sveltejs/kit/pull/4812))

**Breaking Changes**

- Node 14 はもうサポートされません ([PR](https://github.com/sveltejs/kit/pull/4922))
- `/favicon.ico` に対するリクエストはもう抑制されなくなり、正しいルート(route)として扱われるようになりました ([PR](https://github.com/sveltejs/kit/pull/5046))
- AMP サポートは `@sveltejs/amp` パッケージに分割されました ([Docs](https://kit.svelte.jp/docs/seo#manual-setup-amp), [PR](https://github.com/sveltejs/kit/pull/4710))
- Generated types は `_types` ディレクトリに生成されるようになったため、それに合わせてインポートを更新してください ([PR](https://github.com/sveltejs/kit/pull/4705))
- `%svelte.head%` と `%svelte.body%` は、`app.html` の `%sveltekit.head%` と `%sveltekit.body%` になりました  ([Docs](https://kit.svelte.jp/docs/migrating#project-files-src-template-html), [PR](https://github.com/sveltejs/kit/pull/5016/))
- `LoadInput` は `LoadEvent` になりました
- Wrangler 2 を優先するため、Wrangler 1 はサポートされなくなりました ([PR](https://github.com/sveltejs/kit/pull/4887))

---

## Community Showcase

**Apps & Sites built with Svelte**

- [Plantarium](https://github.com/jim-fx/plantarium) は、3D の植物を手続き的に生成するためのツールです。
- [SPATULA](https://github.com/AlexWarnes/lamina-spatula) は、lamina と threejs を使用するプロジェクトであればコードマテリアルとしてポータブルなシェーディングマテリアルを構築するためのツールです。
- [Waaard](https://waaard.com/) は、様々な SSO プロバイダーでリンクを保護できるようにし、それを送信することができます
- [Magidoc](https://github.com/magidoc-org/magidoc) は、高速かつ高いカスタマイズ性を備えた GraphQL ドキュメントジェネレーターです
- [myMarkmap](https://github.com/eyssette/myMarkmap) は、マークアップ向けのカスタムエディタで、SvelteKit で構築されています
- [PassShare](https://passshare.mynt.pw/) では、あなたのパスワードをあなたの友人に、安全かつ効率的に共有することができます
- [DashingOS](https://beta.dashingos.com/) は、(Notion + CodeSandbox のような)ツールで、プロトタイプと文書化を一箇所で、素早く簡単に行うことができます
- [worker-kit-email](https://github.com/miunau/worker-kit-email) は、通常の SvelteKit のルート(routes)を使用して、トランザクショナルな email を開発するのに便利です
- [kaios-weather-svelte](https://github.com/cyan-2048/kaios-weather-svelte) は、KaiOS 向けのとても親しみやすい天気アプリです
- [svelte-gantt](https://github.com/ANovokmet/svelte-gantt) は、軽量で高速かつインタラクティブなガントチャート/リソースブッキングコンポーネントです
- [Miru](https://github.com/ThaUnknown/miru) は、cats 向けの BitTorrent ストリーミングソフトウェアです

素晴らしい SvelteKit Web サイトに貢献してみませんか? [Svelte Society のサイトの構築を手伝っていただけませんか](https://github.com/svelte-society/sveltesociety.dev/issues)!

**Learning Resources**

_To Read_

- [Component party](https://component-party.dev/) is a site that compares common patterns in different frameworks
- [Quick tip: style prop defaults](https://geoffrich.net/posts/style-prop-defaults/) by Geoff Rich
- [Working with reduced motion in Svelte](https://ghostdev.xyz/posts/working-with-reduced-motion-in-svelte) by GHOST
- [Building a Musical Instrument with the Web Audio API](https://www.taniarascia.com/musical-instrument-web-audio-api/) by Tania Rascia
- [Svelte-Cubed: Creating an Accessible and Consistent Experience Across Devices](https://dev.to/alexwarnes/svelte-cubed-creating-an-accessible-and-consistent-experience-across-devices-42ae) and [Svelte-Cubed: Loading Your glTF Models](https://dev.to/alexwarnes/svelte-cubed-loading-your-gltf-models-14lf) by Alex Warnes

_To Watch_

From Svelte Society:

- [The Svelte Summit Spring 2022 stream recording](https://www.youtube.com/watch?v=qqj2cBockqE) has been updated with chapter markers to make it easy to watch again and again
- [The full recording of Svelte London, April 2022](https://www.youtube.com/watch?v=zIxzJzTnoxA) is up! Check out the amazing talks from across the Svelte London community
- [Persian Svelte Society](https://www.youtube.com/channel/UCfWH9lCsXN3j8oXq8dru82Q) is making Persian-language videos about Svelte
- Svelte Sirens has been talking monthly to creators and contributors across the Svelte Community:
  - [SvelteKit + Sanity.io: a match made in heaven](https://www.youtube.com/watch?v=j0_1hfiEVWA&list=PL8bMgX1kyZThkJ_Rk6AAFI4eY24g5XKwK&index=5) on May 13
  - [Slicing up your Svelte Sites with Prismic](https://www.youtube.com/watch?v=FUbHwwMALkk) on May 20
  - [Rendering your Svelte apps on Render](https://www.youtube.com/watch?v=SnV_hMLVyqs) on May 24
  - [The story behind the (unofficial) Svelte newsletter](https://www.youtube.com/watch?v=aK0xXm3hPxk&list=PL8bMgX1kyZThkJ_Rk6AAFI4eY24g5XKwK&index=7) on May 27

Across the Web:

- [Building vite-plugin-svelte-inspector](https://www.youtube.com/watch?v=udYB24IMtsY), [What is Singleton?](https://www.youtube.com/watch?v=xhi0m1QZue0) and [What is Navigation?](https://www.youtube.com/watch?v=Ym-OnGUps2c) by lihautan
- [Auto Import Components In Svelte Kit - Weekly Svelte](https://www.youtube.com/watch?v=JXvKBtTPr64) by LevelUpTuts
- [🧪 Test SvelteKit with TDD & VITEST 🧪](https://www.youtube.com/watch?v=5bQD3dCoyHA) by Johnny Magrippis
- [Google Analytics With SvelteKit](https://www.youtube.com/watch?v=l-x6H0fnqqQ), [Using WebSockets With SvelteKit](https://www.youtube.com/watch?v=mAcKzdW5fR8), [SvelteKit Authentication Using Cookies](https://www.youtube.com/watch?v=T935Ya4W5X0) and [Svelte Headless UI Component Library](https://www.reddit.com/r/sveltejs/comments/ueu849/svelte_headless_ui_component_library/) by Joy of Code
- [Named Layouts In Nested Routes in SvelteKit](https://www.youtube.com/watch?v=hKg_V3jouLk) by The Svelte Junction
- [SvelteKit Shiki Syntax Highlighting: Markdown Codeblocks](https://rodneylab.com/sveltekit-shiki-syntax-highlighting/) and [Svelte Capsize Styling: Typography Tooling](https://rodneylab.com/svelte-capsize-styling/) by Rodney Lab

_To Hear_

- Svelte Radio has been putting out weekly episodes:
  - [The Adventures of Running a Svelte Meetup](https://www.svelteradio.com/episodes/the-adventures-of-running-a-svelte-meetup)
  - [The other Rich! Geoff! (feat. Geoff Rich)](https://www.svelteradio.com/episodes/the-other-rich-geoff)
  - [Inspecting Svelte Code with Dominik G.](https://www.svelteradio.com/episodes/inspecting-svelte-code-with-dominik-g)
  - [Stores Galore](https://www.svelteradio.com/episodes/stores-galore)
- [Svelte and the Future of Frontend Development (feat. Rich Harris)](https://thenewstack.io/svelte-and-the-future-of-front-end-development/) from The New Stack

**Libraries, Tools & Components**

- [vite-plugin-svelte-console-remover](https://github.com/jhubbardsf/vite-plugin-svelte-console-remover) is a Vite plugin that removes all console statements (log, group, dir, error, etc) from Svelte, JS, and TS files during build so they don't leak into production
- [Svelte Headless Tables](https://github.com/bryanmylee/svelte-headless-table) is an unopinionated and extensible data tables for Svelte
- [y-presence](https://github.com/nimeshnayaju/y-presence) is a lightweight set of libraries to easily add presence (live cursors/avatars) to any web application (now with Svelte support!)
- [Svelcro](https://github.com/oslabs-beta/Svelcro) is a component performance tracker for Svelte applications
- [Svelte-Splitpanes](https://github.com/orefalo/svelte-splitpanes) lets you create dynamic and predictable view panels to layout an application
- [svelte-miniplayer](https://github.com/ThaUnknown/svelte-miniplayer) is a lightweight, fast, resizable and draggable miniplayer for media
- [svelte-keybinds](https://github.com/ThaUnknown/svelte-keybinds) is a minimalistic keybinding interface, with rebinding and saving
- [svelte-speech-recognition](https://github.com/jhubbardsf/svelte-speech-recognition) converts speech from the microphone to text and makes it available to your Svelte components

**Special Feature: Svelte Stores**
There were lots of Svelte stores released this month from a number of authors...

- [svelte-mutable-store](https://github.com/feltcoop/svelte-mutable-store) is a Svelte store for mutable values with the `immutable` compiler option
- [svelte-damped-store](https://github.com/aredridel/svelte-damped-store) is a derived writable store that can suspend updates while [svelte-lens-store](https://github.com/aredridel/svelte-lens-store) is a functional lens over Svelte stores
- [svelte-persistent-store](https://github.com/furudean/svelte-persistent-store) is a writable svelte store that saves and loads data from `Window.localStorage` or `Window.sessionStorage`.

もし見落としがありましたら、[Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.com/invite/yy75DKs) で教えてください。

ストックホルムで開催される Svelte Summit に現地参加することもできますので、お忘れなく! Svelteの素晴らしいコンテンツでいっぱいの2日間に是非加わってください! [チケットはこちらです](https://ti.to/svelte/svelte-summit-fall-edition)。

また来月お会いしましょう!
