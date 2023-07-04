---
title: "What's new in Svelte: 2023年5月"
description: "新たなアンバサダー、新たな ESLint plugin、そして SvelteHack の全応募を一挙公開"
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-may-2023
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

最新情報に飛び込む前に、まず最初に特別なアナウンスがあります:

## New Svelte Ambassadors

このニュースレターでも定期的にフィーチャーされている、素晴らしい Svelte コンテンツのクリエーターである [JoyOfCode](https://www.youtube.com/@JoyofCodeDev) と [HuntaByte](https://www.youtube.com/@Huntabyte) が Svelte アンバサダーに任命されました。Svelte のアンバサダーの方々はその親切さと貢献がよく知られており、そして Svelte がフレンドリーで歓迎されるコミュニティであるという評判を維持してくれていて、私たちはアンバサダーの方々に深く感謝しています。

## SvelteHack winners will be announced May 6th

2/17から4/17にかけて開催された [SvelteHack](https://hack.sveltesociety.dev/) の優勝者があと数日で発表されます。あなたが好きなプロジェクトが選ばれたかどうか、5/6 の [Svelte Summit](https://www.sveltesummit.com/) をご覧ください 👀

今月のショーケースにはたくさんのハッカソンへの応募作品を紹介しています… でもまずは、最新情報を見ていきましょう！

## What's new in Svelte

- `style` ブロックで CSS `@container` クエリがサポートされました (**3.58.0**)
- `bind:innerText` が `contenteditable` 要素でサポートされました (**3.58.0**)
- 新たなアクセシビリティ警告 `a11y-interactive-supports-focus` は、インタラクティブな要素がフォーカスできないようになっているときに警告してくれます (**3.58.0**)

Svelte コンパイラに対する全ての変更については、まだ未リリースの変更も含め、[CHANGELOG](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md)  をご確認ください。

## What's new in SvelteKit

- ホットモジュールリローディング (HMR) が有効なとき、エラーが修正されたあとにページがリロードされるようになりました (**1.14.0**, [#9497](https://github.com/sveltejs/kit/pull/9497))
- 同じ html ページにロードされた2つのアプリを、"embedded" モードで同時に読み込めるようになりました (**1.15.7**, [#9610](https://github.com/sveltejs/kit/pull/9610))
- Vite のコンパイルで、標準の Vite resolve ではなく `svelte` フィールドを使用して Svelte ファイルの resolve を行うパッケージに対し、警告のログを出力するようになりました (**vite-plugin-svelte@2.1.0**, **kit@1.15.8**)

## What's new in Language Tools
- `<svelte:document>` がサポートされ ([#1958](https://github.com/sveltejs/language-tools/pull/1958))、新たなバインディング向けのインテリセンスレポートがサポートされました ([#1957](https://github.com/sveltejs/language-tools/pull/1957)) (**107.3.0**)
- "Quick fix..." の新たな fix-all メニューオプションで、"Add all missing imports" や other detected errors が簡単にできるようになりました (**107.3.0**, [#1939](https://github.com/sveltejs/language-tools/pull/1939))
- 公式の [ESLint plugin](https://github.com/sveltejs/eslint-plugin-svelte) が新しく、より良くなりました！これまでの ESLint の Svelte に対するサポートは、テンプレートの AST をうまく扱えず、偽陽性/偽陰性になってしまったり、カスタムの ESLint ルールを作成するのに高い障壁がありました。この新しい公式バージョンは [ota-meshi](https://github.com/ota-meshi) の [svelte-eslint-parser](https://github.com/sveltejs/svelte-eslint-parser) がベースとなっており、すぐにお使いいただけます。トライしてみて、[フィードバックをシェアしてください](https://github.com/sveltejs/eslint-plugin-svelte/issues)！

---

## Community Showcase

**Apps & Sites built with Svelte**

- [Sound of War](https://soundofwar.art/) is a storytelling data visualization project to help understand the scale of destruction in Ukraine
- [Syntax FM's swag shop](https://swag.syntax.fm/) is now built with SvelteKit, PlanetScale and Prisma
- [Appreciation Jar](https://appreciation.place/) is your own private space where you can send encouraging and appreciative messages to your partner
- [Japanese Jouzu](https://jp-jouzu.netlify.app/) is a Japanese sound and symbol learning app
- [MarkMyImages](https://www.markmyimages.com/) is a tool to bulk watermark, image resize, rename, effects, and more - all on-device for speed and privacy
- [Immich](https://github.com/immich-app/immich) is a self-hosted photo and video backup solution directly from your mobile phone
- [Earbetter](https://github.com/ryanatkn/earbetter) is an ear training game and tools for playing and programming music and audio
- [Tune Twisters](https://tune-twisters.vercel.app/) is a guessing game for songs... in reverse
- [ResponseHunt](https://www.responsehunt.com/) is a mystery game based on browser requests - use your programming skills to get to the “golden” response
- [Wolfensvelte 3D](https://github.com/snuffyDev/Wolfensvelte-3D/) is a Svelte "port" of Wolfenstein 3D
- [Code Solving](https://code-svelte.vercel.app/) teaches how to solve problems with code
- [Make Bookmarklets](https://make-bookmarklets.com/) is a quick way to create JavaScript bookmarklets with linting, intellisense and auto-minification
- [GeniePM](https://genie.pm) is an AI tool to help Product Managers write user stories and requirements
- [Bitesized News](https://bitesized.news/) is an AI that delivers news digests and responds to questions via chat
- [Open Tunings](https://www.open-tunings.com/) is a place to explore alternative guitar tunings without having to retune your guitar
- [BlinkSMS](https://blinksms.se/#) is a text alert tool for Stockholm Student Housing to help with booking laundry times
- [Dev Links](https://github.com/killswitchh/dev-links) helps dev showcase multiple links in a single place - similar to Linktree and Kofi
- [Audiogest](https://audiogest.app/) is a tool to convert speech to text & summarize any audio
- [MineSweep](https://alecames.com/minesweep) is a rendition of Minesweeper built with Svelte and JavaScript
- [Biolytics](https://biolytics.app/) lets you import your lab tests to see all your lab tests in one place
- [Zero share](https://github.com/ntsd/zero-share) is a secure P2P file sharing using WebRTC
- [Svelte lab](https://www.sveltelab.dev/) is a sandbox for creating and sharing SvelteKit projects

**Learning Resources**

_Featuring Svelte Contributors and Ambassadors_

- [Dev Vlog: April 2023 - TypeScript vs JSDoc, Transitions API, Dominic Gannaway joins Svelte team](https://www.youtube.com/watch?v=MJHO6FSioPI)
- [Rich Harris on frameworks, the web, and the edge.](https://www.youtube.com/watch?v=uXCipjbcQfM) from Vercel's Svelte Meetup in NYC
- [Svelte & SvelteKit](https://frontendmasters.com/workshops/svelte-sveltekit/) taught by Rich Harris on Frontend Masters
- This Week in Svelte:
  - [2023 March 31 - SvelteKit, Svelte; static sites and headless CMS demos](https://www.youtube.com/watch?v=-YjLubiieYs)
  - [2023 April 22 - SvelteKit 1.15.7, skip links, error handling, static assets](https://www.youtube.com/watch?v=SCMosMo85_8)
  - [2023 April 14 - SvelteKit 1.15.5, accessible buttons, advanced toggle state 🧪🔥](https://www.youtube.com/watch?v=H2kOO5mvUQs)
  - [2023 April 21 - SvelteKit 1.15.7, skip links, error handling, static assets](https://www.youtube.com/watch?v=SCMosMo85_8)
- Svelte Radio
  - [Using Svelte in React with Puru Vijay](https://www.svelteradio.com/episodes/using-svelte-in-react-with-puru-vijay)
  - [Eric Brehault and Nuclia](https://www.svelteradio.com/episodes/eric-brehault-and-nuclia)
  - [Svelte at AppWrite with Alex Patterson](https://www.svelteradio.com/episodes/svelte-at-appwrite-with-alex-patterson)
  - [Svelte in Research at Dartmouth with Wasita and Eshin](https://www.svelteradio.com/episodes/svelte-in-research-at-dartmouth-with-wasita-and-eshin)

_To Watch_

- [The Complete SvelteKit Course For Building Modern Web Apps](https://www.youtube.com/watch?v=MoGkX4RvZ38) and [Simple SvelteKit Page Transitions](https://www.youtube.com/watch?v=gkw1wFIXM_8) by Joy of Code
- [Svelte For React Developers | Your Next JavaScript Framework?](https://www.youtube.com/watch?v=smqE0y0z0CA) by Cretezy
- [Svelte & SvelteKit: The Complete Guide](https://www.udemy.com/course/svelte-and-sveltekit/?ranMID=39197&ranEAID=msYS1Nvjv4c&ranSiteID=msYS1Nvjv4c-oN6aTXp3jgDgUps8JCGxcg&LSNPUBID=msYS1Nvjv4c&utm_source=aff-campaign&utm_medium=udemyads) by Ali Alaa on Udemy
- [ChatGPT-4 with SvelteKit 🤖 Generative AI on the EDGE 🌍](https://www.youtube.com/watch?v=Uw5GZg96kD8) by Johnny Magrippis

_To Read_

- [Headless WordPress with GraphQL and SvelteKit](https://www.okupter.com/blog/headless-wordpress-graphql-sveltekit) and [How to fix the duplicate meta tags issue in SvelteKit](https://www.okupter.com/blog/sveltekit-fix-duplicate-metatags-issue) by Justin Ahinon
- [How to setup tRPC in a SvelteKit project](https://raqueebuddinaziz.com/blog/how-to-setup-trpc-in-a-sveltekit-project/) by Raqueebuddin Aziz
- [Better Data Visualizations with Svelte](https://www.newline.co/courses/better-data-visualizations-with-svelte/welcome) by newline
- [Offline App with SvelteKit + SQLite Part 1: Setup WebAssembly SQLite](https://www.youtube.com/watch?v=Uvnzwp72Ze8) by hartenfellerdev

**Libraries, Tools & Components**

- [Sveltris](https://github.com/mokshit06/sveltris) lets you intermix UI primitives like components, and state primitives like hooks between frameworks, without even noticing
- [SwiftMarket](https://github.com/SwiftMarket/swiftmarket-sveltekit) is an E-Commerce solution built with SvelteKit, Pocketbase as a database and Stripe for payments
- [Svelegante](https://www.npmjs.com/package/svelegante) is a Classy writable store for Svelte
- [Table Generator](https://www.table-generator.de/) lets you create, design and customize your own tables tables online using a graphical editor
- [Svelte Animated Headline](https://www.npmjs.com/package/svelte-animated-headline) is an animated headline component that can grab attention in an informative way
- [SvelteKit Music App Example](https://github.com/tguelcan/music) demonstrates how to connect and process data as well as some practical examples of how to develop frontend components with TailwindCSS
- [Socio](https://www.npmjs.com/package/socio) is a WebSocket Real-Time Communication (RTC) API framework to connect your front-end logic to a back-end database reactively
- [Flowbite Svelte](https://flowbite-svelte.com/) is an official Flowbite component library for Svelte
- [Wundergraph](https://wundergraph.com/blog/introducing_svelte_query_client), a backend for frontend framework, just released their Svelte Query client
- [Lucia](https://lucia-auth.com/blog/lucia-1) just reached 1.0 for their simple and flexible auth library for SvelteKit
- [svelte-stepper](https://github.com/efstajas/svelte-stepper) is a simple library for building animated stepper flows with Svelte

いつも通り、見落としなどございましたら [Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.gg/svelte) にてお気軽にお知らせください。

また次回お会いしましょう！
