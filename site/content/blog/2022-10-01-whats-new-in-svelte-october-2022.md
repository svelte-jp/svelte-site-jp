---
title: "What's new in Svelte: 2022年10月"
description: "Svelte Summit、`use:enhance`、そして SvelteKit Release Candidate!"
author: Daniel Sandoval
authorURL: https://desandoval.net
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-october-2022
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

今月は更新がいっぱいあります… Svelte と SvelteKit の新機能から 2日間の *サミット* まで! それに加えて、Svelte の extension に追加された便利な新機能、新しいアクセシビリティ (a11y) の警告、そして Tan Li Hau による Svelte と Svelte スプレッドシートの構築方法についての講座もございます 😎

## What happened at Svelte Summit?

コンテンツが盛り沢山です! それぞれのライブストリームから、タイムスタンプで全ての講演をご覧いただけます。分割されたビデオは近日中に Svelte Society のチャンネルに追加される予定ですので、まだの方は [チャンネル登録](https://www.youtube.com/c/SvelteSociety) をお忘れなく!

_Day One_
- [12:31](https://www.youtube.com/watch?v=pJcbZr5VlV4&t=751s) - How to get Svelte adopted at work
- [33:21](https://www.youtube.com/watch?v=pJcbZr5VlV4&t=2001s) - Animating Data Visualization in Svelte
- [2:20:36](https://www.youtube.com/watch?v=pJcbZr5VlV4&t=8436s) - Red flags & code smells
- [2:53:42](https://www.youtube.com/watch?v=pJcbZr5VlV4&t=10422s) - Enhance your DX
- [4:42:41](https://www.youtube.com/watch?v=pJcbZr5VlV4&t=16961s) - Svelte in UBS’ knowledge graph
- [5:06:42](https://www.youtube.com/watch?v=pJcbZr5VlV4&t=18402s) - How to migrate react libraries to svelte
- [5:45:27](https://www.youtube.com/watch?v=pJcbZr5VlV4&t=20727s) - DX magic in the world of Svelte
- [7:25:39](https://www.youtube.com/watch?v=pJcbZr5VlV4&t=26739s) - Data visualizations powered by Svelte
- [7:59:38](https://www.youtube.com/watch?v=pJcbZr5VlV4&t=28778s) - Partial Hydration in Svelte for Increased Performance
- [8:20:49](https://www.youtube.com/watch?v=pJcbZr5VlV4&t=30049s) - Building the future, faster

_Day Two_
- [24:09](https://www.youtube.com/watch?v=A8jkJTWacow&t=1449s) - Scrollytell me why: Ain't nothing but a piece of cake
- [2:02:40](https://www.youtube.com/watch?v=A8jkJTWacow&t=7360s) - I told you my dog wouldn’t run
- [2:29:43](https://www.youtube.com/watch?v=A8jkJTWacow&t=8983s) - 10Xing Svelte
- [3:04:56](https://www.youtube.com/watch?v=A8jkJTWacow&t=11096s) - Svemix? Re-svmix? Re-svelte?: Bringing Svelte to Remix Router
- [5:09:39](https://www.youtube.com/watch?v=A8jkJTWacow&t=18579s) - Having fun with stores: an interactive demo of Svelte’s built in state management library
- [5:37:06](https://www.youtube.com/watch?v=A8jkJTWacow&t=20226s) - When Keeping it Svelte Goes Wrong. An Analysis of Some of the Worst Svelte I Have Ever Coded
- [7:22:05](https://www.youtube.com/watch?v=A8jkJTWacow&t=26525s) - Getting started with Hooks
- [7:38:14](https://www.youtube.com/watch?v=A8jkJTWacow&t=27494s) - Special Announcement*

*サミットの最後のトークでは、Rich Harris が SvelteKit の最初のリリース候補版(Release Candidate)を発表しました! 破壊的変更は行われなくなる予定で、チームはバグ潰しと 1.0 に向けた残りの機能の追加に懸命に取り組んでいます…

## More SvelteKit Updates
- `use:enhance` はフォームを漸進的に強化 (progressively enhance) するのに最も簡単な方法です ([Docs](https://kit.svelte.dev/docs/form-actions#progressive-enhancement-use-enhance), [#6633](https://github.com/sveltejs/kit/pull/6633), [#6828](https://github.com/sveltejs/kit/pull/6828), [#7012](https://github.com/sveltejs/kit/pull/7012))
- デモアプリが更新され、Sverdle ゲームが追加されました。Rich は Svelte Summit で披露し、`use:enhance` のデモンストレーションを行いました ([#6979](https://github.com/sveltejs/kit/pull/6979))
- Cloudflare Pages の `_routes.json` の仕様が `adapter-cloudflare` でサポートされました ([#6530](https://github.com/sveltejs/kit/pull/6530))
- asset とページの圧縮を並行に実行することでビルドパフォーマンスが改善されました ([#6710](https://github.com/sveltejs/kit/pull/6710))

**Breaking changes:**
- SvelteKit を実行できる Node のミニマムバージョンが Node 16.14 になりました ([#6388](https://github.com/sveltejs/kit/pull/6388))
- `App.PrivateEnv` と `App.PublicEnv` が削除され、generated types がその役割を引き継ぎます ([#6413](https://github.com/sveltejs/kit/pull/6413))
- `%sveltekit.message%` は `%sveltekit.error.message%` に置き換わります ([6659](https://github.com/sveltejs/kit/pull/6659))
- `App.PageError` は `App.Error` となりました - hooks をご確認ください ([Docs](https://kit.svelte.dev/docs/hooks#shared-hooks-handleerror), [#6963](https://github.com/sveltejs/kit/pull/6963))
- `externalFetch` は `handleFetch` となり、サーバー上で実行される `load` から全ての fetch が実行されます ([#6565](https://github.com/sveltejs/kit/pull/6565))

変更の全リストは、SvelteKit の [CHANGELOG](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md) をご確認ください。

## Svelte Updates
- 新たな a11y warning として `incorrect-aria-attribute-type`、`no-abstract-role`、`interactive-element-to-noninteractive-role`、`role-has-required-aria-props` が追加されました。`no-noninteractive-tabindex` と `click-events-have-key-events` も間もなくです! (**3.50.0**)
- `ComponentEvents` and `SveltePreprocessor` (**3.50.0**)
- 新たな型として `ComponentEvents` と `SveltePreprocessor` が追加されました (**3.50.0**)
- ホワイトスペースの大きいブロックが含まれている場合においてパースのスピードが改善されました (**3.50.0**)
- 全てのグローバルな JavaScript オブジェクトと関数が、既知のグローバルなものとして認識されるようになりました (**3.50.1**)

Svelte コンパイラに対する全ての変更や、今後の変更については、[CHANGELOG](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md) をご確認ください。

## New in Language Tools
- エディタが提案するコードフォーマットが改善されました (**106.0.0**, [#1598](https://github.com/sveltejs/language-tools/pull/1598))
- SvelteKit の route ファイルが、コンテキストメニューやコマンドパレットから簡単に作成できるようになりました (**106.1.0**, [#1620](https://github.com/sveltejs/language-tools/pull/1620))

---

## Ask Questions in the Svelte Discord

発表を見逃してしまった方、Svelte Discord にエキサイティングな更新があるんです… それはフォーラムです! 新しい [questions channel](https://discord.com/channels/457912077277855764/1023340103071965194) は、Discord の新しいフォーラム機能を利用し、質問とその発見、そして回答をするためのより良いコミュニティとなることを支援します!

Svelte や SvelteKit を使って実現したいことや、コミュニティのライブラリ、ツールなど、なんにでもお使いいただけます。お気軽にどうぞ!

---

## Community Showcase

**Apps & Sites built with Svelte**
- [Timeflow](https://www.timeflow.site/) is a smart calendar & task manager that dynamically schedules your tasks between your events
- [GeoQuest](https://github.com/woutdp/geoquest) is an open source geography game
- [Houses Of](https://housesof.world/) is a project showcasing charismatic houses around the world
- [Greenfield Brewery](https://greenfield-brewery.vercel.app/) is a tool for quickly installing a lot of homebrew casks
- [Gram Jam](https://gramjam.app/) is a word puzzle game inspired by match three games and Scrabble
- [Beatbump](https://github.com/snuffyDev/Beatbump) is a privacy-respecting alternative frontend for YouTube Music
- [RoomOS Device Widgets](https://github.com/wxsd-sales/roomos-device-widgets) is an app for demoing RoomOS device capabilities in Kiosk/PWA mode
- [World Seed](https://store.steampowered.com/app/1870320/World_Seed/) is a full blown online multiplayer game
- [Lirify](https://lirify-tan.vercel.app/) is a song lyrics writing web app tool made in Latvia
- [Splet Tech Konferencija](https://www.splet.rs/) is a tech conference in Serbia with a *very* fancy website
- [Unbounded](https://unbounded.polkadot.network/) is an open-source variable font - funded by blockchain (and an awesome-looking website)
- [Porter's Paints](https://shop.porterspaints.com/) is an eCommerce site for (you guessed it) paints built with Svelte
- [CRAN/E](https://www.cran-e.com/) is a search engine for modern R-packages 


**Learning Resources**

_Starring the Svelte team_
- [Upgrading SvelteKit](https://www.youtube.com/watch?v=vzeZskhjoeQ) by Svelte Sirens (with Brittney, Kev, and GHOST!)
- [Build your own Svelte](https://www.youtube.com/watch?v=mwvyKGw2CzU) by lihautan
- [Native Page Transitions in SvelteKit: Part 1](https://geoffrich.net/posts/page-transitions-1/) by Geoff Rich
- [Build a cross platform app with Tauri](https://ghostdev.xyz/posts/build-a-cross-platform-app-with-tauri/) by GHOST

_To Watch_
- [How To Use Future CSS In Svelte](https://www.youtube.com/watch?v=eqwtoaP-0pk) and [Master Animation With Svelte](https://www.youtube.com/watch?v=3RlBfUQCiAQ) by Joy of Code
- [Svelte Kit Form Actions 101 - New Svelte Kit API](https://www.youtube.com/watch?v=i5zdnv83mxY) and [Svelte Kit Form Actions - Real World Examples - Q&A](https://www.youtube.com/watch?v=PK2Mpt1q6K8) by LevelUpTuts

_To Read_
- [What's new in `svelte-kit, 1.0.0-next.445`: (group) layout](https://dev.to/parables/whats-new-in-svelte-kit-100-next445-group-layout-1ld5) by Parables
- [Handling breaking changes in SvelteKit pre-1.0](https://maier.tech/posts/handling-breaking-changes-in-sveltekit-pre-1-0) by Thilo Maier
- [Svelte Custom Stores Demystified](https://raqueebuddinaziz.com/blog/svelte-custom-stores-demystified/) by Raqueebuddin Aziz
- Sveltekit Changes: [Advanced Layouts](https://dev.to/theether0/sveltekit-changes-advanced-layouts-3id4), [Form Actions and Progressive Enhancement](https://dev.to/theether0/sveltekit-changes-form-actions-and-progressive-enhancement-31h9) and [Cookies and Authentication](https://dev.to/theether0/sveltekit-changes-session-and-cookies-enb) by Shivam Meena
- [How to add an Emoji Picker to Sveltekit](https://xvrc.net/) by Xavier Coiffard
- [Get Started with SvelteKit Headless WordPress](https://plus.rodneylab.com/tutorials/get-started-sveltekit-headless-wordpress) by Rodney Lab
- [Speed up SvelteKit Pages With a Redis Cache](https://www.captaincodeman.com/speed-up-sveltekit-pages-with-a-redis-cache) and [How to await Firebase Auth with SvelteKit](https://www.captaincodeman.com/how-to-await-firebase-auth-with-sveltekit) by Captain Codeman
- [Deploying SvelteKit with NodeJS to a Server Using Gitlab and PM2](https://abyteofcoding.com/blog/deploying-sveltekit-with-nodejs-pm2-to-server/) by A Byte of Coding
- [Quality of Life Tips when using SvelteKit in VS Code](https://www.reddit.com/r/sveltejs/comments/xltgyp/quality_of_life_tips_when_using_sveltekit_in_vs/) by doa-doa


**Libraries, Tools & Components**
- [Svelte Fit](https://github.com/leveluptuts/svelte-fit) is an extremely simple, no dependency fit text library
- [svelte-switch-case](https://github.com/l-portet/svelte-switch-case) is a switch case syntax for your Svelte components
- [svelte-canvas-confetti](https://github.com/andreasmcdermott/svelte-canvas-confetti) uses a single canvas to render full-screen confetti
- [@slidy/svelte](https://github.com/Valexr/Slidy/tree/master/packages/svelte) is a simple, configurable & reusable carousel component built with Svelte - based on `@slidy/core`
- [svelte-currency-input](https://github.com/canutin/svelte-currency-input) is a form input that converts numbers to localized currency formats as you type
- [Adria](https://github.com/pilcrowOnPaper/adria) is a super simple form validation library, with autocomplete and value/type checking
- [Canopy](https://github.com/oslabs-beta/canopy) is a Svelte debugging app for the Chrome devtools panel
- [MenuFramework](https://github.com/MyHwu9508/altv-os-menu-framework) is a menu framework written for [alt:V](https://altv.mp/#/)
- [whyframe](https://whyframe.dev/) gives iframes superpowers, making it easy to render anything in isolation
- [@svelte-put/modal](https://github.com/vnphanquang/svelte-put/tree/main/packages/misc/modal) is a solution to async, declarative, type-safe modals in Svelte
- [Kitty](https://github.com/grottopress/kitty) is a collection of libraries and handlers for developing secure frontend apps
- [svelte-turnstile](https://github.com/ghostdevv/svelte-turnstile) is a component for Cloudflare Turnstile, the privacy focused CAPTCHA replacement 

_UI Kits and Starters_
- [QWER](https://github.com/kwchang0831/svelte-QWER) is a blog starter built with SvelteKit
- [SvelteKit Zero API](https://github.com/Refzlund/sveltekit-zero-api) provides type-safety between the frontend and backend - creating a structure for easy APIs
- [sveltekit-monorepo](https://github.com/sw-yx/sveltekit-monorepo) is monorepo starter with 2022 tech
- [svelte-component-test-recipes](https://github.com/davipon/svelte-component-test-recipes) uses `vitest`, `@testing-library/svelte`, and `svelte-htm` to test Svelte components that seemed to be hard to test

Whew! 更新が盛り沢山でしたね。何か見逃していることがあれば [Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.com/invite/yy75DKs) でお知らせください!

それではまた来月 👋
