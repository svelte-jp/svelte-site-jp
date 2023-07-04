---
title: "What's new in Svelte: 2023年3月"
description: "SvelteHack、1.0以降の SvelteKit の改善、たくさんのショーケース"
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-march-2023
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

1.0 ローンチ後、SvelteKit にエッセンシャルな機能が多く追加されたため、ホットな3月になっています。詳細は[先週のブログ記事](https://svelte.jp/blog/streaming-snapshots-sveltekit)をチェックしてみてください。

Svelte Society は先月、$12,000 以上の賞金がかかっている [SvelteHack](https://hack.sveltesociety.dev/) を立ち上げました - 新旧すべての Svelte デベロッパーたちに、何か素晴らしいものを作ってもらえるよう呼びかけています。期限は4月17日！

そして、まだご存知でない方もいらっしゃるかもしれませんが、次回の Svelte Summit が開催する予定です！ [SvelteSummit.com](https://www.sveltesummit.com/) にアクセスして、ニュースレターに登録するとイベントの最新情報を受け取ることができます📬

それでは今月の最新情報を見ていきましょう…

## What's new in SvelteKit

- `$app/paths` がアプリなしで使えるようになりました - Vitest によるテストや Storybook の使用などが簡単になります (**1.4.0**, [#8838](https://github.com/sveltejs/kit/pull/8838))
- adapter でルートレベル(route level)の設定ができるようになりました (**1.5.0**, [Docs](https://kit.svelte.jp/docs/page-options#config), [#8740](https://github.com/sveltejs/kit/pull/8740))
- 新たな snapshot メカニズムにより、一時的な DOM の state を、たとえナビゲーション後やページリロード後でも保持できるようになりました (**1.5.0**,[Docs](https://kit.svelte.jp/docs/snapshots), [#8710](https://github.com/sveltejs/kit/pull/8710))
- `OPTIONS` が server method として使用できるようになりました (**1.6.0**, [Docs](https://kit.svelte.jp/docs/routing#server), [#8731](https://github.com/sveltejs/kit/pull/8731))
- 正しくないエクスポートに対するリッチなエラーメッセージが追加されました (**1.7.0**, [#9055](https://github.com/sveltejs/kit/pull/9055))
- server load 関数で promise のストリーミングができるようになりました (**1.8.0**, [Docs](https://kit.svelte.jp/docs/load#streaming-with-promises), [#8901](https://github.com/sveltejs/kit/pull/8901))
- 新たな設定オプションである `preloadStrategy` のおかげで、特定のブラウザ向けに、インポートの 'ウォーターフォール' を避けるためのプリロードのチューニングをすることがやりやすくなりました (**1.8.4**, [Docs](https://kit.svelte.jp/docs/configuration#output), [#9179](https://github.com/sveltejs/kit/pull/9179))
- 新たな `paths.relative` オプションは、`paths.assets` と `paths.base` の解釈をコントロールすることができます (**1.9.0**, [Docs](https://kit.svelte.jp/docs/configuration#paths), [#9220](https://github.com/sveltejs/kit/pull/9220))

## What's new in Svelte and Language Tools

- `svelte.dev` の REPL が、`package.json` の `exports` フィールドをサポートしました ([#445](https://github.com/sveltejs/sites/pull/445))
- 新たな呼び出し階層(Call Hierarchy)機能により、どこの関数やクラスが呼び出されたのか確認し、コールスタックをたどることができるようになりました (**extensions-107.1.0**, [#1889](https://github.com/sveltejs/language-tools/pull/1889))
- `declarationMap` のサポートが Svelte extension に追加されました。ライブラリに declaration map がある場合、`.svelte` ファイル上で "go to definition" を押すとソースコードに移動します (**extensions-107.1.0**, [#1878](https://github.com/sveltejs/language-tools/pull/1878))
- [TypeScript Inlay Hints](https://code.visualstudio.com/docs/typescript/typescript-editing#_inlay-hints) のサポートが Svelte Extension で使えるようになりました。`javascript.inlayHints.*` や `typescript.inlayHints.*` で有効化してください (**extensions-107.1.0**, [#1855](https://github.com/sveltejs/language-tools/pull/1855))

\*Svelte コンパイラに対する全ての変更については、まだ未リリースの変更も含め、[CHANGELOG](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md)  をご確認ください。

---

## Community Showcase

**Apps & Sites built with Svelte**

- [win32.run](https://github.com/ducbao414/win32.run) is a version of Windows XP in the browser - with a File System, programs, XP-style File Picker and Saver dialogs, 3rd-party programs, and more
- [Svelte Radial Menu](https://github.com/tglide/svelte-radial-menu) is a radial menu experiment - based on [Rauno's radial menu](https://rauno.me/craft/radial-menu)
- [apod color search](https://github.com/brycedorn/apod-color-search) lets you search for astronomy picture of the day (APO) photos by color
- [SvHighlight](https://www.reddit.com/r/sveltejs/comments/10pvqfm/svhighlight_a_code_highlighter_for_sveltekit_and/) is a code highlighter for SvelteKit and TailwindCSS with blur and focus blocks
- [Limey](https://limey.io/) lets you create beautiful one-page websites in minutes
- [a/links](https://a-links.io/) is an extension for short, composable bookmarks
- [Sprint Cards](https://sprint.cards) is a design challenge generator
- [Plought](https://github.com/rossrobino/plought) is a tool to reduce noise in decision making
- [ArcOS-Frontend](https://github.com/IzK-ArcOS/ArcOS-Frontend) is a rewrite of the Arc operating system's frontend in Svelte
- [Poxi](https://poxi.page) is powering the user-made web with a drag-and-drop, drawable website editor that's easy to collaborate in
- [demo-threlte-scroller-rocinante](https://twitter.com/a_warnes/status/1629235313808744449) is a "scrolly telling" proof-of-concept that combines svelte-sequence with Threlte
- [Phonics + Stuff](https://www.phonicsandstuff.com/) is a set of resources for learning & teaching phonics

**Learning Resources**

_Featuring Svelte Contributors and Ambassadors_

- [Streaming, snapshots, and other new features since SvelteKit 1.0](https://svelte.dev/blog/streaming-snapshots-sveltekit) by Geoff Rich (on the Svelte Blog)
- [View Transition Experiments with Svelte](https://geoffrich.net/posts/view-transition-experiments/) and [Native Page Transitions in SvelteKit (updated for 2023)](https://geoffrich.net/posts/page-transitions-1/) by Geoff Rich
- [Ron Au's story and how to be whimsical!](https://www.svelteradio.com/episodes/ron-aus-story-and-how-to-be-whimsical) by Svelte Radio
- [SvelteKit 1.0 with Rich Harris](https://podrocket.logrocket.com/sveltekit) by PodRocket
- [Svelte Society Africa](https://twitter.com/SvelteAfrica/status/1620526757593116672?s=20) has formally launched!
- [SvelteKit overview with Simon and Dominik](https://www.youtube.com/watch?v=CiOigf4FbNg) by Frontend RheinMain

_To Watch or Hear_

- [Delightful Web Development with SvelteKit](https://workshops.thisdot.co/learn/developing-with-sveltekit) is a workshop from This Dot Labs - taking place on April 13th.
- [Have More Control Over Layouts With Group Layouts In SvelteKit](https://www.youtube.com/watch?v=9UpaKEVuErs) and [Learn SvelteKit Hooks Through 6 Examples](https://www.youtube.com/watch?v=Kzrz7GZ9pIg) by Joy of Code
- [Svelte Kit Creating Popup Modals with Tailwind CSS](https://www.youtube.com/watch?v=qI4-q7SA7uM) and [SvelteKit: Creating Dynamic Tables with Tailwind CSS](https://www.youtube.com/watch?v=QqoYrdzoSSk) by Abdul Rehman 2050

_To Read_

- [Svelte Language Server Example](https://github.com/volarjs/svelte-language-tools) by VolarJS 
- [How I Made My App 2.4x Faster Switching to Svelte](https://blog.flotes.app/posts/flotes-2x-faster) by Erik Verduin
- [Smooth Page Transitions with SvelteKit](https://www.philkruft.dev/blog/smooth-page-transitions-with-sveltekit/) and [How to Build a Static SvelteKit Site](https://www.philkruft.dev/blog/how-to-build-a-static-sveltekit-site/) by Phil Kruft
- [Blazing fast PWAs with SEO power using SvelteKit and Ionic](https://ionic.io/blog/pwas-using-sveltekit-and-ionic) by Tommertom
- [Svelte Stores Tutorial: Share Data Between Multiple Components](https://learnjavascripts.com/development/web-development/frameworks/svelte/svelte-stores-tutorial-share-data-between-multiple-components/) by Vincent Widerberg
- [A Business Case for SvelteKit](https://elliscs.hashnode.dev/a-business-case-for-sveltekit) by Chris Ellis
- [How to set up a new Svelte project with SvelteKit](https://www.inow.dev/how-to-set-up-a-new-svelte-project-with-sveltekit/) by Igor Nowosad
- [How to type Events, Slots, and Props in Svelte](https://raqueebuddinaziz.com/blog/svelte-type-events-slots-and-props/) by Raqueebuddin Aziz
- [Use TypeScript with SvelteKit and Supabase](https://blog.robino.dev/posts/supabase-sveltekit) by Ross Robino
- [Invoking Svelte components from your Ember apps](https://dev.to/rajasegar/invoking-svelte-components-from-your-ember-apps-58h5) by Rajasegar Chandran
- [Add a sitemap to your server side rendered SvelteKit website](https://www.okupter.com/blog/sitemap-server-side-rendered-sveltekit-website) and [State in URL: the SvelteKit approach](https://www.okupter.com/blog/state-in-url-the-sveltekit-approach) by Justin Ahinon
- [Display crypto data real-time in a chart using Sveltekit, Chart.js & coincap.io](https://medium.com/@Heesel/display-crypto-data-real-time-in-a-chart-using-sveltekit-chart-js-coincap-io-70b90d3aac90) by Hessel

**Libraries, Tools & Components**

_UI Kits and Components_

- [Pink](https://pink.appwrite.io/) is a framework agnostic design system from Appwrite
- [quick-pick](https://github.com/arabisaldrin/quick-pick) is a simple search tool where you control the search catalog
- [Grail UI](https://github.com/grail-ui/grail-ui) offers a set of component primitives, actions and utilities that help you build accessible and high quality Svelte applications faster, while providing a great developer experience
- [svelte-image-comparison](https://www.npmjs.com/package/svelte-image-comparison) is a Svelte component to compare image or canvas elements
- [simple-font-select](https://www.npmjs.com/package/simple-font-select) is a simple font select component that exposes all local fonts as CSS font families
- [svelte-datatables-net](https://www.npmjs.com/package/svelte-datatables-net) is a Svelte component that turns data into an interactive HTML table
- [svelte-flextable](https://github.com/Parazeya/svelte-flextable) is a toolkit for creating server-side processing datatable components with Svelte
- [svelte-algolia-instantsearch](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch) is a community-developed wrapper around [instantsearch.js](https://github.com/algolia/instantsearch) for Svelte
- [svelte-deep-zoom](https://www.npmjs.com/package/svelte-deep-zoom) is a Svelte component to render interactive Deep Zoom images (tiled image pyramids)
- [SVoast](https://github.com/gibbu/svoast) is a simple toast component for Svelte
- [svelte-otp](https://github.com/K4UNG/svelte-otp) is a simple lightweight OTP input component for svelte
- [trace-svelte](https://trace-svelte.vercel.app/) is a line by line highlighter for Svelte
- [Svelte Auth UI](https://github.com/multiplehats/svelte-auth-ui) is a set of authentication components for Svelte
- [KitDocs](https://github.com/svelteness/kit-docs) is a documentation integration for SvelteKit - a VitePress alternative for Svelte
- [svelte-signature-pad](https://www.npmjs.com/package/svelte-signature-pad) is a Svelte action to capture smoothed signatures as SVG paths using the excellent [perfect-freehand](https://github.com/steveruizok/perfect-freehand) library

_Helpers, Stores and Actions_

- [SvelteKit-Document](https://github.com/barvian/sveltekit-document) is a tiny utility for SvelteKit that lets you change the `<html>`, `<head>`, and `<body>` tags from any page or layout - with full SSR support
- [SvelteKit Form Data](https://github.com/stolinski/sk-form-data) is an automatic SvelteKit form data parser middleware
- [sveltekit-superforms](https://github.com/ciscoheat/sveltekit-superforms) supercharges your SvelteKit forms with a bunch of quality of life features. Purports to be a "powerhouse of a library"
- [Houdini](https://github.com/HoudiniGraphQL/houdini) - the "disappearing" GraphQL client for the SvelteKit - is now 1.0
- [sveltekit-modal-langchain](https://github.com/semicognitive/sveltekit-modal-langchain) is an example SvelteKit project using [sveltekit-modal](https://github.com/semicognitive/sveltekit-modal), showing how easy it is to write Python endpoints in SvelteKit
- [mdsvex-excerpt](https://www.npmjs.com/package/mdsvex-excerpt) allows you to show only a portion of document in certain layouts
- [Svelte Action Balancer](https://www.npmjs.com/package/svelte-action-balancer) is a simple Svelte action that makes titles more readable
- [svelte-object](https://github.com/Refzlund/svelte-object) helps create and maintain objects using components. Values are stores and can therefore be intuitively subscribed to and updated
- [svelte-relative-time](https://www.npmjs.com/package/svelte-relative-time) is a tiny Svelte action and component to render relative times
- [svelte-disable-preload](https://www.npmjs.com/package/svelte-disable-preload) is a simple action to apply no-op event listeners to an element that prevent the document-level SvelteKit event handlers being invoked
- [SvelteKit Static Sitemap](https://github.com/tlaundal/sveltekit-static-sitemap) generates a sitemap.xml for your page during build
- [svelte-intersection-observer-action](https://www.npmjs.com/package/svelte-intersection-observer-action) is a Svelte action for element position notifications using IntersectionObserver
- [svelte-sequence](https://github.com/AlexWarnes/svelte-sequence) provides custom stores to compose tweened motion sequences over multiple steps
- [@svelte-put/inline-svg](https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/inline-svg) is a Svelte action for inlining dynamic SVGs (fetched from network)

_Other cool tools_

- [sveltekit-modal](https://github.com/semicognitive/sveltekit-modal) lets you write Python endpoints in SvelteKit using Modal
- [svelte-kit-bot-block](https://www.npmjs.com/package/svelte-kit-bot-block) is a server hook to handle spam requests with SvelteKit
- [Svelte Email](https://github.com/carstenlebek/svelte-email) lets you write and design email templates with Svelte and render them to HTML or plain text
- [Inertia.js](https://github.com/inertiajs/inertia) lets you quickly build modern single-page React, Vue and Svelte apps using classic server-side routing and controllers
- [svelte-adapter-bun](https://github.com/gornostay25/svelte-adapter-bun) is an adapter for SvelteKit apps that generates a standalone Bun server
- [React in Svelte](https://github.com/frontline-hq/react-in-svelte) is a library that enables you to use React components in Svelte
- [SvelteKit Redis Session Manager](https://github.com/etherCorps/SK-Redis-SessionManager) is a Redis integration in SvelteKit for Session Management

Thanks for reading! Don't forget to try your hand at the [Svelte Hackathon](https://hack.sveltesociety.dev/)!

Feel free to let us know if we missed anything on [Reddit](https://www.reddit.com/r/sveltejs/) or [Discord](https://discord.gg/svelte)
