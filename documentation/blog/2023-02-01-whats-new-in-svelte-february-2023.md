---
title: "What's new in Svelte: 2023年2月"
description: "マイナーバージョンとメジャーな満足度"
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-february-2023
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

先月から、Svelte と SvelteKit のマイナーバージョンのリリースがあり、たくさんの教育コンテンツが 1.0 リリースをサポートし、そして [State of JS survey](https://stateofjs.com) の結果は…

Svelte は今回も、満足度、興味、ともに上昇しました。投票してくださった皆さんに感謝します！

それではアップデートを見てみましょう…

## What's new in SvelteKit

今月の Svelte エコシステムにおける活動は、SvelteKit のバグフィックスと  1.0 ローンチからのフィードバックに対する取り組みにフォーカスされていました。待ち望まれていた [SvelteKit の base path サポートのバグフィックス](https://github.com/sveltejs/kit/issues/2958)がリリースされたことで、リモート開発環境でも SvelteKit プロジェクトが作れるようになりました。こういったフィックスだけでなく、以下のような新機能も[リリース](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md)されています:
- `<form method="get">` にプログレッシブ・エンハンスメントを適用している場合、submitter の値が自動的に含まれるようになりました  (**1.0.3**, [#8273](https://github.com/sveltejs/kit/pull/8273))
- グローバルな fetch に相対 URL が使用されている場合、開発モードではエラーが追加されるようになりました (**1.0.8**, [#8370](https://github.com/sveltejs/kit/pull/8370))
- HTML からコメントが削除された場合にハイドレーションが壊れる可能性がある、という警告が追加されました (**1.0.11**, [#8423](https://github.com/sveltejs/kit/pull/8423))
- `.svelte` ファイルに page option が使用されている場合や、レイアウトに `<slot />` が無い場合に警告されるようになりました (**1.1.0**, [#8475](https://github.com/sveltejs/kit/pull/8475))
- 新しい `text(...)` ヘルパーにより、テキストのレスポンスを簡単に生成できるようになりました (**1.2.0**, [#8371](https://github.com/sveltejs/kit/pull/8371))
- パブリックな env が app.html でアクセスできるようになりました (**1.2.0**, [Docs](https://kit.svelte.jp/docs/project-structure#project-files-src), [#8449](https://github.com/sveltejs/kit/pull/8449))
- cookie がサイズ制限を超過した場合にエラーがスローされるようになりました (**1.2.1**, [#8591](https://github.com/sveltejs/kit/pull/8591))
- 生成される `tsconfig` を変更できるようになりました (**1.3.0**, [#8606](https://github.com/sveltejs/kit/pull/8606))

## What's new in Svelte and Language Tools

- VS Code HTML language service の `html.customData` に対するサポートが追加されました (**extensions-107.0.0**, [#1824](https://github.com/sveltejs/language-tools/pull/1824))
- インポートが必要な store のオートコンプリート ([#1823](https://github.com/sveltejs/language-tools/pull/1823)) と object/class メンバーのスニペット ([#1817](https://github.com/sveltejs/language-tools/pull/1817)) が Svelte extension に追加されました (**extensions-107.0.0**)
- 関数の型の promise の検知が改善されました (**Svelte 3.55.1**, [#8162](https://github.com/sveltejs/svelte/pull/8162))
- グローバルな `part` 属性と `on:submit` に、それぞれ不足している型とプロパティが追加されました (**Svelte 3.55.1**, [#8181](https://github.com/sveltejs/svelte/issues/8181))
- 多くのパフォーマンス改善とバグフィックス (**Svelte 3.55.1*** and **extensions-107.0.x**)

\*Svelte コンパイラに対する全ての変更については、まだ未リリースの変更も含め、 [CHANGELOG](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md)  をご確認ください。

---

## Community Showcase

**Apps & Sites built with Svelte**

- [Titowest.com](https://titowest.com/) is a series of photographic films by the writer & photographer, Tito West
- [Verve](https://github.com/ParthJadhav/verve) is a lightweight and blazingly fast launcher for accessing and opening applications, files and documents
- [Round The World](https://rtw.voyage/) is an interactive guide to the travels of Andrew Carnegie
- [Linear Regression](https://mlu-explain.github.io/linear-regression/) is an interactive blog post visual introduction to (almost) everything you should know about linear regression
- [Flotes](https://flotes.app/) is a free note taking app enhanced with flashcard features
- [nomie](https://github.com/open-nomie/nomie6-oss) is a Daily Journal for short attention spans
- [nocode.gallery](https://nocode.gallery/) is a collection of stunning websites made with no code
- [Whom to Follow](https://whomtofollow.com/) helps you find accounts you'll love by searching the network of accounts you already follow
- [poker-simulator](https://github.com/hucancode/poker-simulator) is a poker simulation and evaluation tool
- [Pixelicious](https://www.pixelicious.xyz/) converts your images into pixel art
- [Apple Music](https://music.apple.com/us/browse) is now built with Svelte ([proof](https://twitter.com/BrittneyPostma/status/1615381017300271104))

**Learning Resources**

_Featuring Svelte Contributors and Ambassadors_

- [SvelteKit | Rich Harris | ViteConf 2022](https://www.youtube.com/watch?v=-OMPfr56kXI)
- [Talking Gradio and AI with pngwn 🐧](https://www.svelteradio.com/episodes/gradio-with-pngwn) from Svelte Radio
- [Progressively enhancing the Marvel By Year filter](https://geoffrich.net/posts/marvel-filter-state/) and [Advent of SvelteKit 2022: my favorite demos](https://geoffrich.net/posts/advent-of-sveltekit-2022/) by Geoff Rich
- [EP 13: Contributing more to open source + a Svelte Newsletter showcase rewind ⏪](https://bookmarkbeat.substack.com/p/contributing-more-to-open-source) by Dani Sandoval

_To Watch or Hear_

- [I built a $5 chat app with Pocketbase & Svelte. Will it scale?](https://www.youtube.com/watch?v=gUYBFDPZ5qk) by Fireship
- [The Comprehensive Introduction To SvelteKit](https://www.youtube.com/watch?v=obmiLi3bhkQ), [What Svelte UI Library Should You Use?](https://www.youtube.com/watch?v=O0mNU0maItY) and [Learn Everything About SvelteKit Routing (Pages, Layout, Nested Routes)](https://www.youtube.com/watch?v=7hXHbGj6iE0) by Joy of Code
- [Progressive Enhancement in SvelteKit (use:enhance)](https://www.youtube.com/watch?v=jXtzWMhdI2U), [Are Your Routes Actually Protected?](https://www.youtube.com/watch?v=UbhhJWV3bmI) and [10X Your SvelteKit Developer Experience in VSCode](https://www.youtube.com/watch?v=13v50nLh67Q) by Huntabyte
- [The easiest realtime app I’ve ever built](https://www.youtube.com/watch?v=UbOaAtHWidc) by Beyond Fireship
- [Angular developers can learn Svelte so fast...](https://www.youtube.com/watch?v=lKdw_z9qmPU) by Joshua Morony
- [SvelteKit + PocketBase Integration: User Login and Registration](https://www.youtube.com/watch?v=AxPB3e-3yEM) by Jian Yuan Lee
- [Marvels Of Using Svelte and SvelteKit - JSJ 566](https://topenddevs.com/podcasts/javascript-jabber/episodes/marvels-of-using-svelte-and-sveltekit-jsj-566) with Tracey Lee and Adam L Barrett

_To Read_

- [A practical first look at the Svelte framework](https://mainmatter.com/blog/2023/01/24/sveltekit-super-rentals/) by Daniel Beer
- [State Modeling in Svelte with XState](https://github.com/annaghi/xstate-svelte-workshop) is the port of the Frontend Masters React + XState workshop written in Svelte and built with SvelteKit!
- [🚀 Code your SvelteKit website faster with Stylify CSS](https://stylifycss.com/blog/code-your-sveltekit-website-faster-with-stylify-css/) by Stylify CSS
- [🎮 Five Svelte Games To Learn How To Code](https://tomaszs2.medium.com/five-svelte-games-to-learn-how-to-code-f36ae6e58923) by Tom Smykowski
- [How to make declarative (code-based) router instead of file-based router in SvelteKit](https://dev.to/devpunk/how-to-make-declarativecode-based-router-instead-of-file-based-router-in-sveltekit-2-3dd4) by Dev Punk
- [How to import tailwindcss custom config in JS/TS parts of a SvelteKit app](https://gist.github.com/0gust1/aa8c8b831428cdd7a5535e92cbf02f04) by 0gust1
- [SvelteKit Internals: Load function](https://www.okupter.com/blog/sveltekit-internals-load-function) and [Svelte and CSS](https://www.okupter.com/blog/svelte-and-css) by Justin Ahinon
- [Internationalization Formatting with Intl + SSR + SvelteKit](https://www.captaincodeman.com/internationalization-formatting-with-intl-ssr-sveltekit) by Captain Codeman
- [Typesafe i18n with SvelteKit](https://blog.encodeart.dev/typesafe-i18n-with-sveltekit) by Andreas Söderlund
- [Authorization in your SvelteKit app](https://cerbos.dev/blog/authorization-in-your-sveltekit-app) by Adam Barrett
- [Validate your form using Sveltekit, Tailwindcss, Felte and Yup](https://medium.com/@Heesel/validate-your-form-using-sveltekit-tailwindcss-felte-and-yup-ddc11cd04717) by Hessel
- [SvelteKit Form Actions bound to TypeScript class + Validation (yup) w/dynamic array](http://enehana.nohea.com/general/sveltekit-form-actions-bound-to-typescript-class-validation-yup-w-dynamic-array/) by Hekili Tech
- [Smooth Page Transitions with SvelteKit](https://philkruft.dev/blog/smooth-page-transitions-with-sveltekit/) by Phil Kruft
- [Redis Integration in SvelteKit: A Game-Changer for Session Management](https://dev.to/theether0/redis-integration-in-sveltekit-a-game-changer-for-session-management-84i) by Shivam Meena
- [SvelteKit and GitHub Pages](https://andrewlester.net/blog/posts/sveltekit-and-github-pages) by Andrew Lester
- [Tailwind + Sveltekit in 2023](https://medium.com/@gentmitch/tailwind-sveltkit-in-2023-44c19d91c8fd) by Mitch Gent
- [Svelte Stores Tutorial: Share Data Between Multiple Components](https://learnjavascripts.com/development/web-development/frameworks/svelte/svelte-stores-tutorial-share-data-between-multiple-components/) by Vincent Widerberg

**Libraries, Tools & Components**

- [Sveltepress](https://sveltepress.site/) is a simple, easy to use, content centered site build tool with the full power of SvelteKit
- [Svelte Form Helper](https://www.npmjs.com/package/svelte-form-helper) is a lightweight helper for form validation with Svelte
- [Dapper UI](https://github.com/Bastian/dapper-ui) is a sleek and modern UI component library for Svelte, offering full TypeScript support and extensive documentation
- [TeilUI](https://sidharth-anand.github.io/teil-ui/) is a better way to build design systems with Svelte
- [Neodrag](https://www.neodrag.dev/) is an SSR-friendly, multi-framework draggable library
- [Svelvet](https://www.svelvet.io/), a UI library for Svelte, is now 5.0 (read more [here](https://medium.com/@efergus1/svelvet-5-0-a-community-driven-update-cfcc93e7b7a7))
- [Svelte Inview](https://github.com/maciekgrzybek/svelte-inview) is a Svelte action that monitors an element enters or leaves the viewport/parent element
- [html2svelte](https://github.com/drbh/html2svelte) makes it easy to convert HTML to Svelte components in a snap

お読みいただきありがとうございます！見落としなどございましたら [Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.gg/svelte) にてお気軽にお知らせください。
