---
title: "What's new in Svelte: 2023年1月"
description: "SvelteKit 1.0、learn.svelte.dev、そして Svelte elements の型定義"
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-january-2023
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

[SvelteKit 1.0](https://svelte.jp/blog/announcing-sveltekit-1.0) のリリースからちょうど2週間が経ちました！ もしまだなら、[livestream](https://www.youtube.com/watch?v=N4BRVkQVoMc)、[新しい web サイト](https://kit.svelte.jp/) をチェックし、SvelteKit の全機能を段階的に学ぶなら [learn.svelte.dev](https://learn.svelte.dev/)(日本語版: https://learn.svelte.jp/) をチェックしてみてください。

それでは詳細を見ていきましょう…

## What's new in SvelteKit

- `@sveltejs/kit` 1.0 がリリースされました！今後のリリースは全て semver に準拠し、変更点は [CHANGELOG](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md#100) に major/minor/patch としてリストアップされます。
- Storybook と Histoire のサポートが改善されました ([#7990](https://github.com/sveltejs/kit/pull/7990))。これらのツールを完全にサポートするための作業が進行中です ([storybook#20239](https://github.com/storybookjs/storybook/pull/20239)).
- `vitePreprocess` がデフォルトのプリプロセッサになりました。`vitePreprocess` と `svelte-preprocess` の違いについては [ドキュメント](https://kit.svelte.jp/docs/integrations#preprocessors) をご覧ください ([#8036](https://github.com/sveltejs/kit/pull/8036)).

**Breaking changes:**

- Unknown exports (アンダースコアで始まるものは除く) が `+(layout|page)(.server)?.js` と `+server.js` ファイルで行えなくなりました ([#7878](https://github.com/sveltejs/kit/pull/7878))
- `__data.json` が URL から取り除かれます ([#7979](https://github.com/sveltejs/kit/pull/7979))
- `sveltekit()` が Vite plugin の配列の promise を返すようになりました ([#7994](https://github.com/sveltejs/kit/pull/7994))
- SvelteKit を埋め込む際に、リンクのクリックをサポートする新しい `embedded` オプション(デフォルトではオフ)が追加されました ([docs](https://kit.svelte.jp/docs/configuration), [#7969](https://github.com/sveltejs/kit/pull/7969))
- フォールバックの自動生成は `builder.generateFallback(fallback)` に置き換わりました ([#8013](https://github.com/sveltejs/kit/pull/8013))
- `invalid()` は `fail()` に、`ValidationError` は `ActionFailure` に置き換わりました ([#8012](https://github.com/sveltejs/kit/pull/8012))
- 不正な load レスポンスに対し、SvelteKit はエラーをスローするようになりました ([#8003](https://github.com/sveltejs/kit/pull/8003))
- SvelteKit は Vite 4 を使用するようになり、Svelte の `peerDependency` は `^3.54.0` が必須になりました ([#7543](https://github.com/sveltejs/kit/pull/7543))
- `ssr` が false で `prerender` が false でない場合、シェル(Shells)がプリレンダリングされるようになりました。ssr が false の場合、prerender を false にしてください(訳注: これまでと同じ挙動にする場合のみ。詳細は [#8131](https://github.com/sveltejs/kit/pull/8131) を参照) ([#8131](https://github.com/sveltejs/kit/pull/8131))
- API の削除や変更に関する警告やエラーが削除されました ([#8019](https://github.com/sveltejs/kit/pull/8019))

## What's new in Svelte

- `options.direction` 引数を、カスタムのトランジション関数に渡せるようになりました (**3.54.0**, [#3918](https://github.com/sveltejs/svelte/issues/3918))
- `@const` で宣言した関数から、変数を更新できるようになりました (**3.54.0**, [#7843](https://github.com/sveltejs/svelte/issues/7843))
- `svelte/elements` に、Svelte/HTML の型定義が追加されました (**3.55.0**, [#7649](https://github.com/sveltejs/svelte/pull/7649))

## What's new in Language Tools

Svelte extension と language tools が要求するミニマムバージョンが新しくなりました:
- Node のバージョン は 16 になりました
- TypeScript のバージョンは 4.9 になりました
- Svelte のバージョンは 3.55 になりました

以下の機能がリリースされました:

- missing handler quick fix ([#1731](https://github.com/sveltejs/language-tools/pull/1731))
- add Svelte anchor missing attribute code action ([#1730](https://github.com/sveltejs/language-tools/pull/1730))
- better commit characters handling ([#1742](https://github.com/sveltejs/language-tools/pull/1742))
- add `--preserveWatchOutput` option ([#1715](https://github.com/sveltejs/language-tools/pull/1715))
- enhance Quickfixes to include Svelte Stores ([#1789](https://github.com/sveltejs/language-tools/pull/1789))
- only show SvelteKit files context menu in SvelteKit projects ([#1771](https://github.com/sveltejs/language-tools/pull/1771))
- use the `satisfies` operator if possible ([#1770](https://github.com/sveltejs/language-tools/pull/1770))

Svelte コンパイラに対する全ての変更については、まだ未リリースの変更も含め、[CHANGELOG](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md) をご確認ください。

---

## Community Showcase

**Apps & Sites built with Svelte**

- [Svelte Recipes 🧑‍🍳](https://svelte.recipes/) provides code snippets for common data visualization problems
- [Everything Svelte](https://www.everythingsvelte.com/) is a new course teaching everything you need to know to build a modern web application
- [CSS Timeline](https://css-timeline.vercel.app/) is a Timeline of the history and evolution of CSS
- [GitBar](https://github.com/mikaelkristiansson/gitbar) is a system tray app for showing your pull requested reviews
- [Texture Lab](https://www.texturelab.xyz/) generates instant textures for games from any text
- [Totems](https://totems-soclage.com/) is a studio creating custom-made stands and supports
- [PeopletoNotion](https://www.peopletonotion.com/) is a Chrome Extension that adds LinkedIn profiles to Notion in one click
- [DeckDev](https://deckdev.com/) is a deck builder for Magic: The Gathering
- [Default Shortcuts](https://www.defaultshortcuts.com/) is a tool for searching keyboard shortcuts across browsers.

**Learning Resources**

_From Svelte Society_

- [Svelte Society - London December 2022](https://www.youtube.com/watch?v=2ijSarsHfN0) featuring two talks by Antony and Rich, respectively. Rich's talk, "Mistakes were made" is a SvelteKit 1.0 retrospective.
- [SvelteKit with Netlify Edge Functions](https://twitter.com/BrittneyPostma/status/1603402599742537729?s=20&t=Lw08QNMpdEP1JZzMQGXLDA) by Brittney Postma
- [Sirens Stream: Skeleton - A fully featured UI Toolkit](https://www.youtube.com/watch?v=2OnJYCXJPK4) with Chris Simmons and Brittney Postma
- [Sirens: SvelteKit for Enterprise](https://www.youtube.com/watch?v=_0ijqV0DmNQ) - Lacey Pevey joins the Sirens to talk through using SvelteKit at the Enterprise level
- [Sirens: Form Actions](https://www.youtube.com/watch?v=2OISk5-EHek) - Kev joins the Sirens again to chat about Form actions in SvelteKit and create a new form for speaker submissions on SvelteSirens.dev

_To Watch_

- [SvelteKit is my mistress](https://www.youtube.com/watch?v=uEJ-Rnm2yOE) by Fireship
- [Sveltekit 1.0 in under 3 minutes](https://www.youtube.com/watch?v=3KGKDgwIrkE) by Gui Bibeau
- [What Svelte UI Library Should You Use?](https://www.youtube.com/watch?v=O0mNU0maItY) and [The Best Icon Library For Svelte (Iconify)](https://www.youtube.com/watch?v=iGVhzsTZSa8) by Joy of Code

_To Read_

- [Rendering emails with Svelte](https://escape.tech/blog/sveltemails/) by Gautier Ben Aïm
- [Now That React is Dead, What’s the Next Big Thing?](https://javascript.plainenglish.io/now-that-react-js-is-dead-whats-the-next-big-thing-7fa72a36a69b) by Somnath Singh
- [What is SvelteKit? And Why Should You Care?](https://blog.tiia.rocks/what-is-sveltekit-and-why-should-you-care) by Tila
- [Sveltekit API endpoints](https://www.jefmeijvis.com/post/006-sveltekit-api-endpoints) by Jef Meijvis
- [Chart.js 4.0](https://github.com/chartjs/Chart.js/discussions/10977) has been released, with updated Svelte support
- [Creating A Custom Svelte Media Query Store](https://pqina.nl/blog/svelte-media-query-store/) by Rik Schennink

**Libraries, Tools & Components**

- [Konsta UI](https://konstaui.com/) is a library of pixel perfect mobile UI components built with Tailwind CSS for React, Vue & Svelte
- [probablykasper/modal-svelte](https://github.com/probablykasper/modal-svelte) is a modal component for Svelte
- [deepcrayon/scrolltron](https://spacecruft.org/deepcrayon/scrolltron) is a news ticker overlay for OBS Studio
- [JetBrains WebStorm 2022.3](https://www.jetbrains.com/webstorm/whatsnew/#:~:text=Update%20about%20Svelte%20support) now has built-in support for Svelte
- [NextAuth.js](https://vercel.com/blog/announcing-sveltekit-auth) is now available for SvelteKit
- [SvelteKit CAS authentication](https://www.npmjs.com/package/@macfja/sveltekit-cas) is a set of functions to ease usage of a CAS/SSO in SvelteKit
- [@macfja/sveltekit-session](https://www.npmjs.com/package/@macfja/sveltekit-session) is an easy way to do session management for SvelteKit
- [@svelte-plugins/tooltips](https://svelte-plugins.github.io/tooltips/) is a basic tooltip component written in Svelte
- [tRPC-SvelteKit](https://github.com/icflorescu/trpc-sveltekit) provides end-to-end typesafe APIs for your SvelteKit applications
- [SvelteKit Tailwind Blog Starter](https://github.com/akiarostami/sveltekit-tailwind-blog-starter) is an easily configurable and customizable blog starter for SvelteKit + Tailwind CSS
- [Free Svelte Accelerators](https://sveltekitstarter.com/) is a list of Svelte and Sveltekit open source code to jump start your project

ハッピーニューイヤー 🎆 見落としなどございましたら [Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.gg/svelte) にてお知らせください。
