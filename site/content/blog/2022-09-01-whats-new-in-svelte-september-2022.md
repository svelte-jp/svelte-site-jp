---
title: "What's new in Svelte: 2022年9月"
description: "SvelteKit の新しいファイルシステムベースルーターへの移行"
author: Daniel Sandoval
authorURL: https://desandoval.net
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-september-2022
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

今月やりたいことをまだお探しですか? Svelte Summit Stockholm のチケットを手に入れる最後のチャンスです! [9月8-9日です、ご参加ください](https://www.sveltesummit.com/) 🎉

先月、再設計された SvelteKit のファイルシステムベースルーターがマージされ、今月は、[移行スクリプト](https://github.com/sveltejs/kit/discussions/5774) から新しいブログ記事の数々、ビデオ、チュートリアルまで、コンテンツが盛り沢山です。

しかし、SvelteKit の新機能は新しいルーティングだけではありません…

## What's new in SvelteKit
- HTTP ヘッダーの `Link` がサポートされ、Cloudflare の [Automatic Early Hints](https://github.com/sveltejs/kit/issues/5455) がすぐに使えるようになりました (**1.0.0-next.405**, [PR](https://github.com/sveltejs/kit/pull/5735))
- 機密性の高い値がディスクに書き込まれるのを防ぐため、`$env/static/*` は仮想化(virtual)されました (**1.0.0-next.413**, [PR](https://github.com/sveltejs/kit/pull/5825))
- `$app/stores` がブラウザのどこからでも使用できるようになりました (**1.0.0-next.428**, [PR](https://github.com/sveltejs/kit/pull/6100))
- `config.kit.env.dir` は `.env` ファイルを探すディレクトリを設定する新しいコンフィグです (**1.0.0-next.430**, [PR](https://github.com/sveltejs/kit/pull/6175))

**Breaking changes:**
- ファイルシステムベースルーターと `load` API において、ルート(routes)を管理する方法が改善されました。 **`@sveltejs/kit@1.0.0-next.406` 以降のバージョンをインストールする前に、[こちらの移行ガイド(migration guide)に従ってください](https://github.com/sveltejs/kit/discussions/5774)** ([PR](https://github.com/sveltejs/kit/pull/5778), [Issue](https://github.com/sveltejs/kit/discussions/5748))
- `event.session` が `load` から削除され、合わせて `session` ストアと `getSession` も削除されました。代わりに `event.locals` を使用してください (**1.0.0-next.415**, [PR](https://github.com/sveltejs/kit/pull/5946))
- 名前付きレイアウト(Named layouts)が削除され、`(groups)` が作成されました (**1.0.0-next.432**, [Docs](https://kit.svelte.dev/docs/advanced-routing#advanced-layouts), [PR & Migration Instructions](https://github.com/sveltejs/kit/pull/6174))
- `event.clientAddress` は `event.getClientAddress()` になりました (**1.0.0-next.438**, [PR](https://github.com/sveltejs/kit/pull/6237))
- `$app/env` は `$app/environment` にリネームされ、`$env/...` と混同しにくくなりました (**1.0.0-next.445**, [PR](https://github.com/sveltejs/kit/pull/6334))

変更の全リストは、kit の  [CHANGELOG](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md) をご確認ください。

**Updates to language tools**
- TypeScript が SvelteKit の $types をうまく解決できませんでしたが、Svelte の language tools の最新バージョンではそれが改善されました (**105.21.0**, [#1592](https://github.com/sveltejs/language-tools/pull/1592))


---

## Community Showcase

**Apps & Sites built with Svelte**
- [canno](https://twitter.com/a_warnes/status/1556724034959818754?s=20&t=RyKWALPByqMT5A_PkLtUew) is a simple interactive 3d physics game with adjustable gravity, cannon power, and debug visualizer - made with threlte
- [straw.page](https://straw.page/) is an extremely simple website builder that lets you create unique websites straight from your phone
- [Patra](https://patra.webjeda.com/) lets you share short notes just with a link. No database. No storage
- [promptoMANIA](https://promptomania.com/) is an AI art community with an online prompt builder
- [Album by Mood](https://www.albumbymood.com/) lets you listen to music based on your mood
- [Daily Sumeiro](https://digivaux.com/sumeiro/daily/) is a daily game to test your math and logic skills
- [Lofi and Games](https://www.lofiandgames.com/) - play relaxing, casual games right from your browser
- [Pitch Pipe](https://github.com/joelgibson/pitch-pipe) is a digital pitch pipe with a frequency analyser and just-intonation intervals
- [classes.wtf](https://github.com/ekzhang/classes.wtf) is a custom, distributed search engine written in Go and Svelte to make searching for Harvard courses much quicker than the standard course catalog
- [Scrumpack](https://scrumpack.io/) is a set of tools to help agile/scrum teams with their ceremonies like Planning Poker and Retrospectives

**Learning Resources**

_Starring the Svelte team_
- [Supper Club × Rich Harris, Author of Svelte — Syntax Podcast 499](https://syntax.fm/show/499/supper-club-rich-harris-author-of-svelte)
- [Let's talk routing with Rich Harris on Svelte Radio](https://www.svelteradio.com/episodes/lets-talk-routing-with-rich-harris)
- [2.17 - Building the Future of Svelte at Vercel with Rich Harris](https://www.youtube.com/watch?v=F1sSUDVoij4)
- [1.15 - What's Up With SvelteKit with Shawn Wang (swyx)](https://www.youtube.com/watch?v=xLhuUShkYkM)
- [Adding Notion Tailwindcss and DaisyUI to Svelte App](https://www.youtube.com/watch?v=l4sbqrY0XGk)
- [Svelte 101 Session](https://www.youtube.com/watch?v=IIeBERpyxx4)
- [Astro and Svelte](https://www.youtube.com/watch?v=iYKKg-50Gm4)
- [Storyblok in Svelte](https://www.youtube.com/watch?v=xXHFRzqUxoE)
- [Svelte London August Recording](https://www.youtube.com/watch?v=ua6gE2zPulw)

_Learning the new SvelteKit routing_
- [Migrating Breaking Changes in SvelteKit](https://www.netlify.com/blog/migrating-breaking-changes-in-sveltekit/) by Brittney Postma (Netlify)
- [Major Svelte Kit API Change - Fixing `load`, and tightening up SvelteKit's design before 1.0](https://www.youtube.com/watch?v=OUGn7VifUCg) - Video by LevelUpTuts
- [SvelteKit Is Never Going To Be The Same](https://www.youtube.com/watch?v=eVFcGA-15LA) - Video by Joy of Code
- [Let's learn SvelteKit by building a static Markdown blog from scratch](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) by Josh Collinsworth (updated Aug 26th to keep up with the new changes)

_To Watch_
- [Svelte Guide For React Developers](https://www.youtube.com/watch?v=uWDBEUkTRGk) and [Svelte State Management Guide](https://www.youtube.com/watch?v=4dDjQiOVrOo) by Joy of Code
- [What Is Bookit? The Svelte Kit Storybook Killer](https://www.youtube.com/watch?v=aOBGhvggsq0) and [What Is @type{import In Svelte Kit - JSDoc Syntax](https://www.youtube.com/watch?v=y0DvJTVO65M) by LevelUpTuts
- [TWF Yet another JS Framework... or not? Svelte!](https://www.youtube.com/watch?app=desktop&v=nT8QtDBIKZA) by TWF meetup


_To Read_
- [Creating a Figma Plugin with Svelte](https://www.lekoarts.de/javascript/creating-a-figma-plugin-with-svelte) by Lennart
- [Svelte Video Blog: Vlog with Mux from your own SvelteKit Site](https://plus.rodneylab.com/tutorials/svelte-video-blog) and [Svelte Shy Header: Peekaboo Sticky Header with CSS](https://rodneylab.com/svelte-shy-header/) by Rodney Lab


**Libraries, Tools & Components**
- [@svelte-plugins/tooltips](https://github.com/svelte-plugins/tooltips) is a simple tooltip action and component designed for Svelte
- [Lucia](https://github.com/pilcrowOnPaper/lucia-sveltekit) is a simple authentication library for SvelteKit that connects your SvelteKit app to your database
- [remix-router-svelte](https://github.com/brophdawg11/remix-routers/tree/main/packages/svelte) is a Svelte implementation of the `react-router-dom` API (driven by `@remix-run/router`)
- [MKRT](https://github.com/j4w8n/mkrt) is a CLI to help you create SvelteKit routes, fast
- [Histoire](https://histoire.dev/guide/) is a tool to generate stories applications - scenarios where you showcase components for specific use cases
- [sveltekit-flash-message](https://www.npmjs.com/package/sveltekit-flash-message) is a Sveltekit library that passes temporary data to the next request, usually from endpoints
- [svelte-particles](https://github.com/matteobruni/tsparticles#svelte) is a lightweight TypeScript library for creating particles
- [svelte-claps](https://github.com/bufgix/svelte-claps) adds clap button (like Medium) to any page for your SvelteKit apps
- [Neon Flicker](https://svelte.dev/repl/fd5e3b2be7da42fe8afddf89661af7d7?version=3.49.0) is a Svelte component to make your text flicker in a cyberpunk style
- [ComboBox](https://svelte.dev/repl/144f22d18c6943abb1fdd00f13e23fde?version=3.49.0) is a search input to help users select from a large list of items
- [@svelte-put](https://github.com/vnphanquang/svelte-put) is useful svelte stuff to put in your projects
- [vite-plugin-svelte-bridge](https://github.com/joshnuss/vite-plugin-svelte-bridge) lets you write Svelte components and use them from React & Vue

_UI Kits and Starters_
- [Svelte-spectre](https://github.com/basf/svelte-spectre) is a UI-kit based on spectre.css and powered by Svelte
- [Skeleton](https://skeleton.brainandbonesllc.com/) allows you to build fast and reactive web UI using the power of Svelte + Tailwind
- [iconsax-svelte](https://www.npmjs.com/package/iconsax-svelte) brings the popular icon kit to Svelte
- [laravel-vite-svelte-spa-template](https://github.com/NukeJS/laravel-vite-svelte-spa-template) is a Laravel 9, Vite, Svelte SPA, Tailwind CSS (w/ Forms Plugin & Aspect Ratio Plugin), Axios, & TypeScript starter template
- [neutralino-svelte-boilerplate-js](https://github.com/Raffaele/neutralino-svelte-boilerplate-js) is a cross platform desktop template for Neutralino and Svelte 
- [figma-plugin-svelte-vite](https://github.com/candidosales/figma-plugin-svelte-vite) is a boilerplate for creating Figma plugins using Svelte, Vite and Typescript
- [Urara](https://github.com/importantimport/urara) is a sweet & powerful SvelteKit blog starter
- [SvelteKit Commerce](https://vercel.com/templates/svelte/sveltekit-commerce) is an all-in-one starter kit for high-performance e-commerce sites built with SvelteKit by Vercel

Did we miss anything? Let us know on [Reddit](https://www.reddit.com/r/sveltejs/) or [Discord](https://discord.com/invite/yy75DKs)!

See ya next month!
