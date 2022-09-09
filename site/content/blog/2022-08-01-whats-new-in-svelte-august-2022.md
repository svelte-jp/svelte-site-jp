---
title: "What's new in Svelte: 2022年8月"
description: "1.0 前の SvelteKit の `load` の変更、Vite 3 サポート、そして `vite.config.js`!"
author: Daniel Sandoval
authorURL: https://desandoval.net
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-august-2022
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

今月は盛り沢山です… 1.0 が完了する前に、SvelteKit の設計に大きな変更があります。まだご存知ないようでしたら、Rich さんの Discussion [Fixing `load`, and tightening up SvelteKit's design before 1.0 #5748](https://github.com/sveltejs/kit/discussions/5748) をチェックしてみてください。

また、[@dummdidumm](https://github.com/dummdidumm) (Simon H) 氏が [Vercel に加わり、フルタイムで Svelte に取り組むことになりました](https://twitter.com/dummdidumm_/status/1549041206348222464)。そして [@tcc-sejohnson](https://github.com/tcc-sejohnson) 氏が SvelteKit メンテナーのグループに加わりました! Svelte と SvelteKit の開発に専念できるメンテナーが増え、すでに大きなインパクトを与えています。7月には、SvelteKit の開始以来、3番目に大きな変更がありました!

それではアップデートの残りを見ていきましょう…

## What's new in SvelteKit
- 動的にインポートされた style が、SSR時に含まれるようになりました ([#5138](https://github.com/sveltejs/kit/pull/5138))
- ルート(routes)とプロパティの更新が改善され、不必要な再レンダリングを防ぐようになりました ([#5654](https://github.com/sveltejs/kit/pull/5654), [#5671](https://github.com/sveltejs/kit/pull/5671))
- エラーハンドリングが多く改善されました ([#4665](https://github.com/sveltejs/kit/pull/4665), [#5622](https://github.com/sveltejs/kit/pull/5622), [#5619](https://github.com/sveltejs/kit/pull/5619), [#5616](https://github.com/sveltejs/kit/pull/5616))
- カスタムの Vite mode が SSR ビルドの際に有効になりました(原文 : Custom Vite modes are now respected in SSR builds) ([#5602](https://github.com/sveltejs/kit/pull/5602))
- カスタムの Vite config locations がサポートされました ([#5705](https://github.com/sveltejs/kit/pull/5705))
- プライベートな環境変数 (aka "secrets") がよりセキュアになりました。もしそれらが誤ってクライアントサイドのコードにインポートされても、エラーになります ([#5663](https://github.com/sveltejs/kit/pull/5663), [Docs](https://kit.svelte.jp/docs/configuration#env))
- Vercel v3 build output API が `adapter-vercel` で使用されるようになりました ([#5514](https://github.com/sveltejs/kit/pull/5514))
- `vite-plugin-svelte` が 1.0 となり、Vite 3 がサポートされました。デフォルトのポートが、`dev` (port 5173) と `preview` (port 4173) でそれぞれ新しくなっています ([#5005](https://github.com/sveltejs/kit/pull/5005), [vite-plugin-svelte CHANGELOG](https://github.com/sveltejs/vite-plugin-svelte/blob/main/packages/vite-plugin-svelte/CHANGELOG.md))

**Breaking changes:**
- `$app/env` の `mode`、`prod`、`server` が使用できなくなりました  ([#5602](https://github.com/sveltejs/kit/pull/5602))
- `svelte-kit` CLI コマンドは `vite` コマンドを使うようになり、`vite.config.js` が必須になりました。これにより、Vitest や Storybook など、Vite エコシステムの他のプロジェクトのファーストクラスのサポートが可能になります ([#5332](https://github.com/sveltejs/kit/pull/5332), [Docs](https://kit.svelte.jp/docs/project-structure#project-files-vite-config-js))
- `endpointExtensions` は `moduleExtensions` となり、param matchers をフィルタできるようになりました ([#5085](https://github.com/sveltejs/kit/pull/5085), [Docs](https://kit.svelte.jp/docs/configuration#moduleextensions))
- Node 16.9 が SvelteKit の minimum version になりました ([#5395](https://github.com/sveltejs/kit/pull/5395))
- %-エンコードされたファイル名が使えるようになりました。ルート(route)に `%` を使用する場合は、エンコードして `%25` にしなければなりません ([#5056](https://github.com/sveltejs/kit/pull/5056))
- HTTP の仕様に合わせるため、Endpoint のメソッド名はアッパーケースになりました ([#5513](https://github.com/sveltejs/kit/pull/5513), [Docs](https://kit.svelte.jp/docs/routing#endpoints))
- Vite の設定に合わせるため、`writeStatic` が削除されました ([#5618](https://github.com/sveltejs/kit/pull/5618))
- `transformPage` は `transformPageChunk` になりました ([#5657](https://github.com/sveltejs/kit/pull/5657), [Docs](https://kit.svelte.jp/docs/hooks#handle))
- `prepare` script が `package.json` から不要になりました ([#5760](https://github.com/sveltejs/kit/pull/5760))
- [`compression` ライブラリのバグが修正されるまで](https://github.com/expressjs/compression/pull/183)、`adapter-node` は圧縮しないようになりました ([#5560](https://github.com/sveltejs/kit/pull/5506))

変更の全リストは、kit の [CHANGELOG](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md) をご覧ください。


## What's new in Svelte & Language Tools
- `@layer` [CSS at-rule](https://developer.mozilla.org/ja/docs/Web/CSS/@layer) が Svelte コンポーネントでサポートされました (**3.49.0**, [PR](https://github.com/sveltejs/svelte/issues/7504))
- `inert` [HTML 属性](https://html.spec.whatwg.org/multipage/interaction.html#the-inert-attribute) が Svelte の language tool とプラグインでサポートされました (**105.20.0**, [PR](https://github.com/sveltejs/language-tools/pull/1565))
- Svelte プラグインは、利用可能な場合は、`SvelteComponentTyped` の型付けを使用するようになりました (**105.19.0**, [PR](https://github.com/sveltejs/language-tools/pull/1548))


---

## Community Showcase

**Apps & Sites built with Svelte**
- [PocketBase](https://github.com/pocketbase/pocketbase) is an open source Go backend with a single file and an admin dashboard built with Svelte
- [Hondo](https://www.playhondo.com/how-to-play) is a word guessing game with multiple rounds
- [Hexapipes](https://github.com/gereleth/hexapipes) is a site for playing hexagonal pipes puzzle
- [Mail Must Move](https://www.mordon.app/) is an email made for those who want to get more done
- [Jot Down](https://github.com/brysonbw/vscode-jot-down) is a Visual Studio Code extension for quick and simple note taking
- [Kadium](https://kadium.kasper.space/) is an app for staying on top of YouTube channels' uploads
- [Samen zjin we #1metS10](https://1mets10.avrotros.nl/) is a campaign website to support S10, the dutch Eurovision finalist, by sending a drawing or a wish
- [On Writing Code](https://onwritingcode.com/) is an interactive website to learn programming design patterns
- [Svelte-In-Motion](https://github.com/novacbn/svelte-in-motion) lets you create Svelte-animated videos in your browser
- [Svelte Terminal](https://github.com/Nico-Mayer/svelte-terminal) is a terminal-like website
- [Bulletlist](https://bulletlist.com/) is a simple tool with a single purpose: making lists
- [Remind Me Again](https://github.com/probablykasper/remind-me-again) is an app for toggleable reminders on Mac, Linux and Windows
- [Heyweek](https://heyweek.com/) is a timetracking app built for freelancers craving that extra pizzazz

**Learning Resources**

_Starring the Svelte team_
- [The Svelte Documentary is out!](https://www.svelteradio.com/episodes/the-svelte-documentary-is-out) on Svelte Radio
- [Beginner SvelteKit](https://vercel.com/docs/beginner-sveltekit) by Vercel
- [Challenge: Explore Svelte by Building a Bubble Popping Game](https://prismic.io/blog/try-svelte-build-game) by Brittney Postma
- [Let's write a Client-side Routing Library with Svelte](https://www.youtube.com/watch?v=3foVDSknGEY) by lihautan
- [Svelte Sirens July Talk - Testing in Svelte with Jess Sachs](https://sveltesirens.dev/event/testing-in-svelte)

_To Watch_
- [10 Awesome Svelte UI Component Libraries](https://www.youtube.com/watch?v=RkD88ARvucM) by LevelUpTuts
- [Learn How SvelteKit Works](https://www.youtube.com/watch?v=VizuTy3uSNE) and [SvelteKit Endpoints](https://www.youtube.com/watch?v=XnVxDLTgCgo) by Joy of Code
- [SvelteKit using TS, and Storybook setup](https://www.youtube.com/watch?v=L4F5dSu0FcQ) by Jarrod Kane
- [Building Apps with Svelte!](https://www.youtube.com/watch?v=prsXVk1fdW4) by Simon Grimm
- [SvelteKit authentication, the better way - Tutorial](https://www.youtube.com/watch?v=Y98KipzwVdM) by Pilcrow

_To Read_
- [Some assorted Svelte demos](https://geoffrich.net/posts/assorted-svelte-demos/) by Geoff Rich
- [Three ways to bootstrap a Svelte project](https://maier.tech/posts/three-ways-to-bootstrap-a-svelte-project) by Thilo Maier
- [Design & build an app with Svelte](https://bootcamp.uxdesign.cc/design-build-an-app-with-svelte-ecd7ed0729da) by Hugo
- [Define routes via JS in SvelteKit](https://dev.to/maxcore/define-routes-via-js-in-sveltekit-27e9) by Max Core
- [Integrating Telegram api with SvelteKit](https://dev.to/theether0/integrating-telegram-api-with-sveltekit-5gb) by Shivam Meena
- [SvelteKit SSG: how to Prerender your SvelteKit Site](https://rodneylab.com/sveltekit-ssg/) by Rodney Lab
- [ADEO Design System: Building a Web Component library with Svelte and Rollup](https://medium.com/adeo-tech/adeo-design-system-building-a-web-component-library-with-svelte-and-rollup-72d65de50163) by Mohamed Mokhtari
- [The Svelte Handbook](https://thevalleyofcode.com/svelte/) by The Valley of Code
- [Test Svelte Component Using Vitest & Playwright](https://davipon.hashnode.dev/test-svelte-component-using-vitest-playwright) by David Peng
- [Transitional Apps with Phoenix and Svelte](https://nathancahill.com/phoenix-svelte) by Nathan Cahill

_Tech Demos_
- [Bringing the best GraphQL experience to Svelte](https://www.the-guild.dev/blog/houdini-and-kitql) by The Guild
- [Style your Svelte website faster with Stylify CSS](https://stylifycss.com/blog/style-your-svelte-website-faster-with-stylify-css/) by Stylify
- [Revamped Auth Helpers for Supabase (with SvelteKit support)](https://supabase.com/blog/2022/07/13/supabase-auth-helpers-with-sveltekit-support) by Supabase


**Libraries, Tools & Components**
- [Lucia](https://github.com/pilcrowOnPaper/lucia-sveltekit) is a simple, JWT based authentication library for SvelteKit that connects your SvelteKit app with your database
- [Skeleton](https://github.com/Brain-Bones/skeleton) is a UI component library for use with Svelte + Tailwind
- [pass-composer](https://pass-composer.vercel.app/) helps you compose your postprocessing passes for threlte scenes
- [@crikey/stores-*](https://whenderson.github.io/stores-mono/) is a collection of libraries to extend Svelte stores for common use-cases
- [Svelte Chrome Storage](https://github.com/shaun-wild/svelte-chrome-storage) is a lightweight abstraction between Svelte stores and Chrome extension storage
- [Svelte Schema Form](https://github.com/restspace/svelte-schema-form) is a form generator for JSON schema
- [svelte-gesture](https://github.com/wobsoriano/svelte-gesture) is a library that lets you bind richer mouse and touch events to any component or view
- [Snap Layout](https://github.com/ThaUnknown/snap-layout) and [universal-title-bar](https://github.com/ThaUnknown/universal-title-bar) bring Windows 11 snap layout and title features to webapps and PWAs. Both can be imported as a `.svelte` module or as a web component
- [svelte-adapter-bun](https://github.com/gornostay25/svelte-adapter-bun) is an adapter for SvelteKit apps that generates a standalone Bun server
- [json2dir](https://www.npmjs.com/package/json2dir) converts JSON objects into directory trees
- [Svelte Command Palette](https://github.com/rohitpotato/svelte-command-palette) is a drop-in command palette component
- [svelte-use-drop-outside](https://github.com/untemps/svelte-use-drop-outside) is a Svelte action to drop an element outside an area
- [PowerTable](https://github.com/muonw/powertable) is a JavaScript component that turns JSON data into an interactive HTML table
- [svelte-slides](https://github.com/rajasegar/svelte-slides) is a slide show template for Svelte using Reveal.js
- [Svelte Theme Light](https://marketplace.visualstudio.com/items?itemName=webmaek.svelte-theme-light) is a Visual Studio Code theme based on the Svelte REPL

もし見落としがありましたら、[Reddit](https://www.reddit.com/r/sveltejs/) か [Discord](https://discord.com/invite/yy75DKs) にどうぞ!

9月に何かやりたいことをお探しでしたら、ストックホルムで開催される Svelte Summit に参加してみませんか! [チケットはこちらです](https://www.sveltesummit.com/)。

また来月!
