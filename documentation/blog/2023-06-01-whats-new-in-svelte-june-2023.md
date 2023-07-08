---
title: "What's new in Svelte: 2023年6月"
description: "SvelteHack の受賞者、たくさんのバインディング、Svelte 4.0.0-next.0、そして SvelteKit の新機能がいっぱい"
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-june-2023
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

6月になりましたね。まず、[SvelteHack の全カテゴリーの受賞者の皆さま](https://hack.sveltesociety.dev/winners)、おめでとうございます！受賞者は5月6日の Svelte Summit で発表されました 🎉

Summit のプレイリストは、[the Svelte Society YouTube channel](https://www.youtube.com/playlist?list=PL8bMgX1kyZTiODueVnrK5GR42u3hgN13X) からご覧いただけます (各講演ごとに動画がビデオが分割されています)。まだ見ていない場合は、チェックしてみてください。

今月のニュースレターは、Svelte と Kit の改善点をたくせんお届けします…

## What's new in Svelte

Svelte 4.0 の最初のプレリリースバージョンである [Svelte 4.0.0-next.0](https://github.com/sveltejs/svelte/releases) が公開されました！ このリリースの変更点、改善点、目的に関する説明は [GitHub のリリースページ](https://github.com/sveltejs/svelte/releases/tag/svelte%404.0.0-next.0) でご確認いただけます。Svelte の未来を先行して知りたければ、チェックしてみてください。移行ガイドも含まれておりますので、ごくわずかな破壊的変更・非推奨事項についてもご確認いただけます。

Svelte 3.59.0 も公開され、新機能がたくさん追加されています:
- スプレッド構文 (`...`) による配列の再構築が正しく処理されるようになりました (**3.59.0**, [#8552](https://github.com/sveltejs/svelte/issues/8552), [#8554](https://github.com/sveltejs/svelte/issues/8554))
- 新たに追加された `a11y-autocomplete-valid` 警告は、autocomplete 属性が HTML の仕様に従って使用されていない場合に警告を出します (**3.59.0**, [Examples](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/d32a27fb64f4127d31e4e76bd08e319cfaf0ba53/docs/rules/autocomplete-valid.md), [#8520](https://github.com/sveltejs/svelte/pull/8520))
- `fullscreenElement` と `visibilityState` バインディングが `<svelte:document>` 要素で使用できるようになりました (**3.59.0**, [#8507](https://github.com/sveltejs/svelte/pull/8507))
- `devicePixelRatio` バインディングが `<svelte:window>` 要素で使用できるようになりました (**3.59.0**, [#8285](https://github.com/sveltejs/svelte/issues/8285))
- `ResizeObserver` のバインディング `contentRect`/`contentBoxSize`/`borderBoxSize`/`devicePixelContentBoxSize` が、`bind:` で使用できるようになりました (**3.59.0**, [#8022](https://github.com/sveltejs/svelte/pull/8022))

Svelte コンパイラに対する全ての変更については、まだ未リリースの変更も含め、[CHANGELOG](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md)  をご確認ください。

## What's new in SvelteKit

- ルートレベルのエントリジェネレータ(Route-level entry generators)、つまり `+page`、`+page.server`、`+server` ファイルから entries 関数をエクスポートすることができるようになり、プリレンダリング向けにパラメータ(params)の値を提供することができるようになりました (**1.16.0**, [Docs](https://kit.svelte.jp/docs/page-options#entries), [#9571](https://github.com/sveltejs/kit/pull/9571))
- `<meta>` タグの URL がクロールされるようになり、プログラムによるソーシャルイメージの作成が簡単になりました (**1.17.0**, [Docs](https://kit.svelte.jp/docs/seo#manual-setup-title-and-meta), [#9900](https://github.com/sveltejs/kit/pull/9900))
- `enhance` 関数の `data` と `form` がそれぞれ `formData` と `formElement` にリネームされました。古い名前を使用すると、非推奨である旨の警告が表示されます。また、将来的には削除されます。 (**1.17.0**, [Docs](https://kit.svelte.jp/docs/form-actions#progressive-enhancement-use-enhance), [#9902](https://github.com/sveltejs/kit/pull/9902))
- Link options に `true` と `false` を設定できるようになりました (**1.19.0**, [Docs](https://kit.svelte.jp/docs/link-options#disabling-options), [#10039](https://github.com/sveltejs/kit/pull/10039))
- 新しい `resolvePath` エクスポートは、ルート ID (route ID) とパラメータから相対パスを構築するために使用されます (**1.19.0**, [Docs](https://kit.svelte.jp/docs/modules#sveltejs-kit-resolvepath), [#9949](https://github.com/sveltejs/kit/pull/9949))

---

## Community Showcase

**Apps & Sites built with Svelte**

- [a-maze](https://github.com/nedredmond/a-maze) is a simple maze generator (using DFS) with any dimensions between 5 cells and 75 cells
- [Windows 11 in Svelte](https://github.com/yashash-pugalia/win11-svelte) attempts to replicate the Windows 11 desktop experience on web
- [JsonCrunch](https://github.com/aghorui/jsoncrunch) is a JSON viewing, transformation and querying tool meant for quickly manipulating small to medium size pieces of JSON data
- [Typepost](https://dezain.io/typepost/) is a simple text post generator for social media
- [tall.ly](https://tall.ly/) is a website for sharing bookmarks ([example](https://tall.ly/zx/icons))
- [bbchallenge](https://github.com/bbchallenge/bbchallenge) is a collaborative environment to prove or disprove the Busy Beaver conjecture
- [Reddit Map](https://github.com/iDPI-Umass/reddit-map) is a project of computer, data, and social scientists to explore and visualize Reddit
- [WeWatch](https://github.com/orosmatthew/wewatch) allows watching videos together in sync
- [Wonderplan](https://wonderplan.ai/) is an AI-Powered Trip Planner tailored to your preferences and covering all aspects of your trip
- [CodingView.io](https://codingview.io/) is an online coding interview tool
- [MeatGPT](https://meat-gpt.sonnet.io/) is an art-site that promptly ignores your prompt
- [Vim Ninja](https://www.vimninja.com/) is an interactive Vim course in the browser
- [prcl](https://prcl.dev/) is a Pastebin-alternative focused on speed and simplicity
- [md](https://github.com/rossrobino/md) is a web based markdown editor

**Learning Resources**

_Featuring Svelte Contributors and Ambassadors_

- This Week in Svelte:
  - [2023 April 28](https://www.youtube.com/watch?v=LlONGghw_MA) - SK 1.15.9, colour contrast, SK reusable types, path aliases
  - [2023 May 5](https://www.youtube.com/watch?v=jo9osUzHnHY) - SvelteKit 1.16.0, reactive statement lifecycle, custom stores
  - [2023 May 12](https://www.youtube.com/watch?v=MBSYHW50xb8) - Svelte 4.0 preview, SvelteKit 1.16.3, Svelte 3.59.1
  - [2023 May 19](https://www.youtube.com/watch?v=CnvU6K12iK4) - SvelteKit 1.18.0, accessible HTML tables, CSS nesting
  - [2023 May 26](https://www.youtube.com/watch?v=oqroEq1DoKI) - SvelteKit 1.19.0, choosing a UI library, breakpoint debugging
- Svelte Radio
  - [Svelte Summit Hypisode](https://www.svelteradio.com/episodes/svelte-summit-hypisode) (May 4, 2023)
  - [A primer on AI for developers with Swyx from Latent Space](https://www.svelteradio.com/episodes/a-primer-on-ai-for-developers-with-swyx-from-latent-space) (May 11, 2023 | [Video Version](https://www.youtube.com/watch?v=PzImLLdU5Wk))

_To Watch_

- [Build a Blazing Fast SvelteKit Markdown Blog](https://www.youtube.com/watch?v=RhScu3uqGd0), [Page Versus Standalone Endpoints In SvelteKit](https://www.youtube.com/watch?v=8OmsVZuuQMc) and [Learn How Data Flows In Your SvelteKit App](https://www.youtube.com/watch?v=ampDDmT3TU0) by Joy of Code
- [Build a ChatGPT Plugin with SvelteKit](https://www.youtube.com/watch?v=P4wZ9JIxwjs) by SuperMilkDaddy
- [Svelte makes Drag And Drop API easy!](https://www.youtube.com/watch?v=lTDKhj83tec) and [Simple native-like App in SvelteKit!](https://www.youtube.com/watch?v=Enl4OPQ2OAM) by Antonio Sarcevic
- [Let's Learn Svelte.js in 60 Minutes (fun speed run).](https://www.youtube.com/watch?v=0FCbd1XVYWo) by developedbyed

_To Read_

- [Bridging Vue 2 and Svelte](https://workadventu.re/blog/post/bridging-vue2-and-svelte) by Alexis Faizeau
- [Write Once, Run Anywhere](https://blog.robino.dev/posts/drizzle-svelte) by Ross Robino
- [Reflections on Migrating my SaaS To SvelteKit](http://sveltekitsaas.com/articles/migrate-saas-to-sveltekit/) by SvelteKitSaaS
- [Authentication system using rust (actix-web) and SvelteKit](https://dev.to/sirneij/full-stack-authentication-system-using-rust-actix-web-and-sveltekit-1cc6) by John Owolabi Idogun
- [SvelteKit Forms: Grammar Check App](https://rodneylab.com/sveltekit-forms/), [SvelteKit Ably: Sqvuably Real‑Time Game](https://rodneylab.com/sveltekit-ably/) and [Svelte Login Form Example: Best Practices](https://rodneylab.com/svelte-login-form-example/) by Rodney Lab
- [The Correct Way to Use Stores in SvelteKit](https://dev.to/jdgamble555/the-correct-way-to-use-stores-in-sveltekit-3h6i) and [Rich Harris is NOT Getting Rid of TS Support in Svelte](https://dev.to/jdgamble555/rich-harris-is-not-getting-rid-of-ts-support-in-svelte-pp6) by Jonathan Gamble
- [How to add a basic SEO component to SvelteKit](https://maier.tech/posts/how-to-add-a-basic-seo-component-to-sveltekit) by Thilo Maier
- [SvelteKit Contact Form Example with Airtable](https://scottspence.com/posts/sveltekit-contact-form-example-with-airtable) by Scott Spence
- [Performant Reactivity with Svelte-Kit](https://itnext.io/performant-reactivity-with-svelte-kit-47d11769c5f) by Erxk
- [Svelte stores: the curious parts](https://blog.thoughtspile.tech/2023/04/22/svelte-stores/) by Valdimir Klepov

**Libraries, Tools & Components**

- [svelte-svg-transform](https://github.com/bartektelec/svelte-svg-transform) is a tiny library that makes it easier for you to add SVGs and transform them in your Svelte project
- [sirens](https://github.com/spiegelgraphics/sirens) is a visualization of active air raid sirens in Ukraine by DER SPIEGEL
- [Sveltronics](https://github.com/vasucp1207/sveltronics) is a collection of Svelte utility functions for your project
- [Prompta](https://github.com/iansinnott/prompta) is yet another interface for chatting with ChatGPT (or GPT-4)
- [Colibri](https://github.com/thetinkerinc/colibri) is a lightweight, customizable component library for Svelte apps
- [Svelte Smart Doc](https://www.sveltron.com/) is a natural language interface to search the Svelte Svelte documentation
- [Tailwind Elements](https://tailwind-elements.com/docs/standard/integrations/svelte-integration/) now has a Svelte Integration

お読みくださりありがとうございました！ いつも通り、見落としなどございましたら [Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.gg/svelte) にてお気軽にお知らせください。

また次回お会いしましょう 👋
