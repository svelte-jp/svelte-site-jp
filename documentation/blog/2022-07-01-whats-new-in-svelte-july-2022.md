---
title: "What's new in Svelte: 2022年7月"
description: "より高速な SSR、language tools の改善と新たな paid contributor!"
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-july-2022
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

SSR の高速化から SvelteKit における Vitest と Storybook のサポートまで、今月のニュースレターは盛り沢山です…

それでは見ていきましょう!

## OpenCollective funding drives Svelte forward

Svelte の支援者の方々は、約 $80,000 を [OpenCollective のプロジェクト](https://opencollective.com/svelte) に寄付してくれました。この資金が、Svelte を有意義に前進させるために使用されていることを、私たちは嬉しく思っています。**[@gtm-nayan](https://github.com/gtm-nayan)** 氏は SvelteKit を 1.0 レベルに安定させるため、プロジェクトの paid contributor として先月から issue のトリアージと修正を行っています! @gtm-nayan はずっと長い間 Svelte コミュニティのアクティブなメンバーであり、私たちの Discord サーバーの運営を助ける bot を書いていることでも知られています。今回の資金提供により、彼がより多くの時間を Svelte に使えるようになったことを嬉しく思います。

また、OpenCollective の資金を活用して、Svelte のコアメンテナーが秋の [Svelte Summit](https://www.sveltesummit.com/) に現地参加できるようにする予定です。寄付してくださった皆様、ありがとうございます!

## What's new in Svelte & Language Tools

- [learn.svelte.dev](https://learn.svelte.dev/) は、Svelte と SvelteKit を1から学ぶための新しい方法で、現在開発中です
- SSR の高速化が Svelte の次のリリースに取り込まれます。2年以上費やされた PR で、いくつかのベンチマークテストによれば、レンダリングが3倍高速になりました! ([PR](https://github.com/sveltejs/svelte/pull/5701))
- Svelte extension の最新版で、"Find File References" ([0.14.28](https://github.com/sveltejs/language-tools/releases/tag/language-server-0.14.28)) と "Find Component References" ([0.14.29](https://github.com/sveltejs/language-tools/releases/tag/language-server-0.14.29)) が追加され、Svelte ファイルと Svelte コンポーネントがインポートされている場所がわかるようになりました ([Demo](https://twitter.com/dummdidumm_/status/1532459709604716544/photo/1))
- Svelte extension が CSS path の補完をサポートしました ([0.14.29](https://github.com/sveltejs/language-tools/releases/tag/language-server-0.14.29))

## What's new in SvelteKit

- Vitest や Storybook などの、Vite エコシステムの他のツールと SvelteKit の総合運用を可能にする `@sveltejs/kit/experimental/vite` が作成されました ([#5094](https://github.com/sveltejs/kit/pull/5094))。この機能を experimental から外して全てのユーザーに対して `vite.config.js` を必須にするか検討するため、この機能が動作するか、役に立つかどうか、[フィードバック](https://github.com/sveltejs/kit/issues/5184) をお願いします
- エンドポイントで Streaming がサポートされました ([#3419](https://github.com/sveltejs/kit/issues/3419))。これは Undici の `fetch` 実装に切り替えることで可能になりました ([#5117](https://github.com/sveltejs/kit/pull/5117))
- 開発環境において、静的なアセットをシンボリックリンクできるようになりました ([#5089](https://github.com/sveltejs/kit/pull/5089))
- `server` と `prod` 環境変数が利用できるようになりました。これは `browser` と `dev` にそれぞれ対応するものです ([#5251](https://github.com/sveltejs/kit/pull/5251))

---

## Community Showcase

**Apps & Sites built with Svelte**

- [Virtual Maker](https://www.virtualmaker.net/) lets you make interactive 3D and VR scenes in your browser
- [Apple Beta Music](https://www.reddit.com/r/sveltejs/comments/v7ic2s/apple_beta_music_uses_svelte/) appears to have been written in some combination of Svelte and web components
- [Itatiaia](https://www.itatiaia.com.br/), the largest radio station in the country of Brazil just relaunched its news portal in SvelteKit
- [Pronauns](https://www.pronauns.com) helps you learn pronunciation online with IPA to speak better and sound more native
- [Immich](https://www.immich.app/) is an open source, high performance self-hosted backup solution for videos and photos on your mobile phone
- [Pendek](https://github.com/leovoon/link-shortener) is a link shortener built with SvelteKit, Prisma and PlanetScale
- [Grunfy](https://grunfy.com/tools) is a set of guitar tools - recently migrated to SvelteKit
- [Radiant: The Future of Radio](https://play.google.com/store/apps/details?id=co.broadcastapp.Radiant) is a personal radio station app built with Svelte and Capacitor
- [Imperfect Reminders](https://imperfectreminders.mildlyupset.com/) is a todo list for things that are only sort of time sensitive
- [Periodic Table](https://github.com/janosh/periodic-table) is a dynamic Periodic Table component written in Svelte
- [Svelvet](https://github.com/open-source-labs/Svelvet) is a lightweight Svelte component library for building interactive node-based diagrams
- [publint](https://github.com/bluwy/publint) lints for packaging errors to ensure compatibility across environments
- [Playlistr](https://github.com/alextana/spotify-playlist-creator) helps manage and create Spotify playlists
- [Geoff Rich's page transitions demo](https://twitter.com/geoffrich_/status/1534980702785003520) shows how SvelteKit's `beforeNavigate`/`afterNavigate` hooks can make smooth document transitions in the latest Chrome Canary
- [Menger Sponge](https://twitter.com/a_warnes/status/1536215896078811137) is a fractal built with Threlte

Want to contribute to a site using the latest SvelteKit features? [Help build the Svelte Society site](https://github.com/svelte-society/sveltesociety.dev/issues)!

**Learning Resources**

_Starring the Svelte team_

- [Svelte Origins: A JavaScript Documentary](https://www.youtube.com/watch?v=kMlkCYL9qo0) by OfferZen Origins
- [Full Stack Documentation (announcing learn.svelte.dev)](https://portal.gitnation.org/contents/full-stack-documentation) by Rich Harris @ JSNation 2022
- [All About the Sirens](https://www.svelteradio.com/episodes/all-about-the-sirens) by Svelte Radio

_To Watch_

- [SvelteKit Page Endpoints](https://www.youtube.com/watch?v=yQRf2wmTu5w), [Named Layouts](https://www.youtube.com/watch?v=UHX9TJ0BxZY) and [Passing data from page component to layout component with $page.stuff](https://www.youtube.com/watch?v=CXaCstU5pcw) by lihautan
- [🍞 & 🧈: Magically load data with SvelteKit Endpoints](https://www.youtube.com/watch?v=f6prqYlbTE4) by Johnny Magrippis
- [Svelte for React developers](https://www.youtube.com/watch?v=7tsrwrx5HtQ) by frontendtier
- [Learn Svelte JS || JavaScript Compiler for Building Front end Applications](https://www.youtube.com/watch?v=1rKRarJJFrY&list=PLIGDNOJWiL1-7zCgdR7MKuho-tPC6Ra6C&index=1) by Code with tsksharma
- [SvelteKit Authentication](https://www.youtube.com/watch?v=T935Ya4W5X0&list=PLA9WiRZ-IS_zKrDzhOhV5RGKKTHNIyTDO&index=1) by Joy of Code
- [Svelte + websockets: Build a real-time Auction app](https://www.youtube.com/watch?v=CqgsWFrwQIU) by Evgeny Maksimov

_To Read_

- [Up-To-Date Analytics on a Static Website](https://paullj.github.io/posts/up-to-date-analytics-on-a-static-website) and [Fast, Lightweight Fuzzy Search using Fuse.js](https://paullj.github.io/posts/fast-lightweight-fuzzy-search-using-fuse.js) by paullj
- [Use SvelteKit as a handler in the ExpressJs project](https://chientrm.medium.com/use-sveltekit-as-a-handler-in-the-expressjs-project-15524b01128f) by Tran Chien
- [Creating a desktop application with Tauri and SvelteKit](https://github.com/Stijn-B/tauri-sveltekit-example) by Stijn-B
- [List of awesome Svelte stores](https://github.com/samuba/awesome-svelte-stores) by samuba
- [SvelteKit Content Security Policy: CSP for XSS Protection](https://rodneylab.com/sveltekit-content-security-policy/) by Rodney Lab
- [SvelteKit Hooks. Everything You Need To Know](https://kudadam.com/blog/understanding-sveltekit-hooks) by Lucretius K. Biah
- [3 tips for upgrading the performance of your Svelte stores](https://www.mathiaspicker.com/posts/3-tips-for-upgrading-the-performance-of-your-svelte-stores) by Mathias Picker

**Libraries, Tools & Components**

- [Svend3r](https://github.com/oslabs-beta/svend3r) is a plug and play D3 charting library for Svelte
- [Svelte Hover Draw SVG](https://github.com/davipon/svelte-hover-draw-svg) is a lightweight Svelte component to draw SVG on hover
- [Svelte French Toast](https://svelte-french-toast.com/) provides buttery smooth toast notifications that are lightweight, customizable, and beautiful by default
- [SVooltip](https://svooltip.vercel.app/) is a basic Svelte tooltip directive, powered by Floating UI
- [Svelte Brick Gallery](https://github.com/anotherempty/svelte-brick-gallery) is a masonry-like image gallery component for Svelte
- [use-vest](https://github.com/enyo/use-vest) is a Svelte action for Vest - a library that makes it easy to validate forms and show errors when necessary
- [Svelidate](https://github.com/svelidate/svelidate) is a simple and lightweight form validation library for Svelte with no dependencies
- [Svve11](https://github.com/oslabs-beta/Svve11) is an "accessibility-first" component library for Svelte
- [Slidy](https://github.com/Valexr/Slidy) is a simple, configurable & reusable carousel sliding action script with templates & some useful plugins
- [Svelte Component Snippets](https://marketplace.visualstudio.com/items?itemName=brysonbw.svelte-component-snippets) is a VS Code extension with access to common Svelte snippets
- [Svelte Confetti](https://github.com/Mitcheljager/svelte-confetti) adds a little bit of flair to your app with some confetti 🎊

もし見落としがありましたら、[Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.com/invite/yy75DKs) で教えてください。

ストックホルムで開催される Svelte Summit に現地参加することもできますので、お忘れなく! Svelteの素晴らしいコンテンツでいっぱいの2日間に是非加わってください! [チケットはこちらです](https://www.sveltesummit.com/)。

また来月お会いしましょう!
