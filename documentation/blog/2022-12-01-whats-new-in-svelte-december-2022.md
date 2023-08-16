---
title: "What's new in Svelte: 2022年12月"
description: "SvelteKit 1.0 はもう間近"
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-december-2022
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

SvelteKit 1.0 はもう間近です！[マイルストーンにあるイシューの99%が完了したので](https://github.com/sveltejs/kit/milestone/2)、先月のたくさんの変更点をカバーしなければなりません…

それでは参りましょう！

## What's new in SvelteKit

- ナビゲーションの結果、アプリがアンロード(フルページリロード / クローズ / 別ページへの離脱)されるかどうかを調べるには、`willUnload` プロパティを使用します。([#6813](https://github.com/sveltejs/kit/pull/6813))
- `__data.json` リクエストがキャッシュできるようになり、すべての再取得シナリオ(invalidation scenarios)にマッチするレスポンスをキャッシュすることを保証します ([#7532](https://github.com/sveltejs/kit/pull/7532))
- `<a name="hash">` タグへのリンクがサポートされました ([#7596](https://github.com/sveltejs/kit/pull/7596))
- `handle` hook でリダイレクトをスローすることがサポートされました ([#7612](https://github.com/sveltejs/kit/pull/7612))
- フォールバックコンポーネントがないレイアウトには、自動的にフォールバックコンポーネントが追加されるようになりました ([#7619](https://github.com/sveltejs/kit/pull/7619))
- `resolve` hook にある新しい `preload` 関数は、どのファイルをプリロードのために <head> タグに追加するかを決定します ([Docs](https://kit.svelte.jp/docs/hooks#server-hooks-handle), [#4963](https://github.com/sveltejs/kit/pull/4963), [#7704](https://github.com/sveltejs/kit/pull/7704))
- `version` が `$app/environment` 経由で使えるようになりました ([#7689](https://github.com/sveltejs/kit/pull/7689), [#7694](https://github.com/sveltejs/kit/pull/7694))
- `handleError` が promise を返すようになりました ([#7780](https://github.com/sveltejs/kit/pull/7780))

**Breaking changes:**

- `routeId` が `route.id` になりました ([#7450](https://github.com/sveltejs/kit/pull/7450))
- `beforeNavigate` メソッドと `afterNavigate` メソッドの 'load' は 'enter' に、'unload' は 'leave' にリネームされました。外部へのナビゲーションの際に、`beforeNavigate` は type 'leave' を引数にとって一回だけ呼び出され、リダイレクトの際には実行されなくなりました ([#7502](https://github.com/sveltejs/kit/pull/7502), [#7529](https://github.com/sveltejs/kit/pull/7529), [#7588](https://github.com/sveltejs/kit/pull/7588))
- `redirect` ヘルパーは、リダイレクト時はステータスコードの 300-308 のみを許可し、`error` ステータスコードの場合は 400-599 のみを許可するようになりました ([#7767](https://github.com/sveltejs/kit/pull/7767)) ([#7615](https://github.com/sveltejs/kit/pull/7615), [#7767](https://github.com/sveltejs/kit/pull/7767))
- ルート(route)ディレクトリ名の特殊文字は、hex/unicode のエスケープシーケンスでエンコードされるようになりました ([#7644](https://github.com/sveltejs/kit/pull/7644))
- action data の(デ)シリアライズに devalue が使用されるようになりました - これは、`use:enhance` を使わずに直接 action を fetch する方にとっては breaking change です ([#7494](https://github.com/sveltejs/kit/pull/7494))
- `trailingSlash` が configuration ではなく page option になりました ([#7719](https://github.com/sveltejs/kit/pull/7719))
- クライアントサイドのルーターは、`%sveltekit.body%` の外にあるリンクを無視するようになりました ([#7766](https://github.com/sveltejs/kit/pull/7766))
- `prerendering` は `building` にリネームされ、`config.kit.prerender.enabled` は削除されました ([#7762](https://github.com/sveltejs/kit/pull/7762))
- `getStaticDirectory()` は builder API から削除されました ([#7809](https://github.com/sveltejs/kit/pull/7809))
- `format` オプションが `generateManifest(...)` から削除されました ([#7820](https://github.com/sveltejs/kit/pull/7820))
- `data-sveltekit-prefetch` は `-preload-code` と `-preload-data` に置き換えられ、`prefetch` は `preloadData` になり、`prefetchRoutes` は `preloadCode` になりました ([#7776](https://github.com/sveltejs/kit/pull/7776), [#7776](https://github.com/sveltejs/kit/pull/7776))
- `SubmitFunction` は `$app/forms` から `@sveltejs/kit` に移動しました ([#7003](https://github.com/sveltejs/kit/pull/7003))

## New in Svelte

- css コンパイラオプションの `css: false` と `css: true` は、`'external' | 'injected' | 'none'` 設定に置き換えられ、`ssr` ビルド向けのコンパイルが高速化し、わかりやすさが改善されました (**3.53.0**)

Svelte compiler に対する全ての変更については、まだ未リリースの変更も含め、[CHANGELOG](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md) をご確認ください。

---

## Community Showcase

**Apps & Sites built with Svelte**

- [Appwrite's new console](https://github.com/appwrite/console) makes its secure backend server for web, mobile & Flutter developers available in the browser
- [RepoMagic](https://www.repomagic.com/) is a search and analytics tool for GitHub
- [Podman Desktop](https://github.com/containers/podman-desktop) is a graphical tool for developing on containers and Kubernetes
- [Ballerine](https://github.com/ballerine-io/ballerine) is a Know Your Customer (KYC) UX for any vertical or geography using modular building blocks, components, and 3rd party integrations
- [Budget Pen](https://github.com/Nico-Mayer/budget_pen) is a Codepen-like browser code editor with Tailwind included
- [doTogether](https://github.com/SarcevicAntonio/doTogether) helps you keep track of stuff you have get done via a List of recurring Tasks
- [Webscraped College Results](https://www.redditcollegeresults.com/) is a collection of visualizations for data from r/collegeresults
- [Let's premortem](https://letspremortem.com/) helps avoid lengthy, frustrating post-mortems after a project fails
- [BLKMARKET.COM](https://beta.blkmarket.com/) is an illustration library for commercial and personal use
- [Sigil](https://sigilspace.com/) is a canvas for anything with spaces organized by the most-voted content
- [corpus-activity-streams](https://github.com/ryanatkn/corpus-activity-streams) is an unofficial ActivityStreams 2.0 vocabulary data set and alternative docs
- [nodeMyAdmin](https://github.com/Andrea055/nodeMyAdmin) is an alternative to phpMyAdmin written with SvelteKit
- [Image to Pattern Conversion](https://www.thread-bare.com/convert) is a cross-stitch pattern conversion tool with [a list of pre-made patterns](https://www.thread-bare.com/store) to start with
- [Verbums](https://verbums.vdoc.dev/) is an English vocabulary trainer to improve language comprehension
- [SVGPS](https://svgps.app/) removes the burden of working with a cluster of SVG files by converting your icons into a single JSON file
- [This 3D retro-themed asteroid shooter](https://photon-alexwarnes.vercel.app/showcase/asteroids) was made with threlte

**Learning Resources**

_To Hear_

- [Catching up after Svelte Summit](https://www.svelteradio.com/episodes/catching-up) and [3D, WebGL and AI](https://www.svelteradio.com/episodes/3d-webgl-and-ai) by Svelte Radio

_To Watch_

- [Domenik Reitzner - The easy way, an introduction to Sveltekit](https://www.youtube.com/watch?v=t-LKRrNedps) from Svelte Society Vienna
- [Sirens: Form Actions](https://www.youtube.com/watch?v=2OISk5-EHek) - Kev joins the Sirens again to chat about Form actions in SvelteKit and create a new form for speaker submissions on SvelteSirens.dev
- [Introduction To 3D With Svelte (Threlte)](https://www.youtube.com/watch?v=89LYeHOncVk), [How To Use Global Styles In SvelteKit](https://www.youtube.com/watch?v=jHSwChkx3TQ) and [Progressive Form Enhancement With SvelteKit](https://www.youtube.com/watch?v=6pv70d7i-3Q) by Joy of Code

_To Read_

- [Building tic-tac-toe with Svelte](https://geoffrich.net/posts/tic-tac-toe/) by Geoff Rich
- [Speed up SvelteKit Pages With a Redis Cache](https://www.captaincodeman.com/speed-up-sveltekit-pages-with-a-redis-cache) by Captain Codeman
- [Understanding environment variables in SvelteKit](https://www.okupter.com/blog/environment-variables-in-sveltekit), [Form validation with SvelteKit and Zod](https://www.okupter.com/blog/sveltekit-form-validation-with-zod) and [Build a SvelteKit application with Docker](https://www.okupter.com/blog/build-a-sveltekit-application-with-docker) by Justin Ahinon
- [Why I failed to create the "Solid.js's store" for Svelte, and announcing svelte-store-tree v0.3.1](https://dev.to/igrep/why-i-failed-to-create-the-solidjss-store-for-svelte-and-announcing-svelte-store-tree-v031-1am2) by YAMAMOTO Yuji
- [Create an offline-first and installable PWA with SvelteKit and workbox-precaching](https://www.sarcevic.dev/offline-first-installable-pwa-sveltekit-workbox-precaching) by Antonio Sarcevic

**Libraries, Tools & Components**

- [Skeleton](https://www.skeleton.dev/) is a UI toolkit to build fast and reactive web interfaces using Svelte + Tailwind CSS
- [svelte-svg-spinners](https://github.com/luluvia/svelte-svg-spinners) is a collection of SVG Spinners components
- [Svelte Floating UI](https://github.com/fedorovvvv/svelte-floating-ui) enables floating UIs with actions - no wrapper components or component bindings required
- [at-html](https://github.com/micha-lmxt/at-html) lets you use `{@html }` tags with slots in Svelte apps
- [html-svelte-parser](https://github.com/PatrickG/html-svelte-parser) is a HTML to Svelte parser that works on both the server (Node.js) and the client (browser)
- [svelte-switcher](https://github.com/rohitpotato/svelte-switcher) is a fully customisable, touch-friendly, accessible and tiny toggle component
- [sveltkit-hook-html-minifier](https://www.npmjs.com/package/@svackages/sveltkit-hook-html-minifier) is a hook that wrapps `html-minifier`
- [sveltekit-hook-redirect](https://www.npmjs.com/package/@svackages/sveltekit-hook-redirect) is a hook that makes redirects easy
- [sveltekit-video-meet](https://github.com/harshmangalam/sveltekit-video-meet) is a video calling web app built with SvelteKit and SocketIO
- [svelte-colourpicker](https://www.npmjs.com/package/svelte-colourpicker) is a lightweight opinionated colour picker component for Svelte
- [Svelte-HeadlessUI](https://captaincodeman.github.io/svelte-headlessui/) is an unofficial implementation of Tailwind HeadlessUI for Svelte
- [svelte-lazyimage-cache](https://github.com/binsarjr/svelte-lazyimage-cache) is a Lazy Image component with IntersectionObserver and cache action
- [threlte v5.0](https://www.reddit.com/r/sveltejs/comments/ywit18/threlte_v50_is_here_a_completely_new_developer/) is a completely new developer experience that is faster, more powerful, and incredibly flexible

今月はこれでおしまいです！見落としなどございましたら [Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.gg/svelte) にてお知らせください。

それではまた来年 🎆
