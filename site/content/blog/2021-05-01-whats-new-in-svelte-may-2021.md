---
title: What's new in Svelte: 2021年5月
description: SvelteKit 1.0に向けた取り組みとSvelteKitサイトでいっぱいのショーケース！
author: Daniel Sandoval
authorURL: https://desandoval.net
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-may-2021
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

先週、Svelte Summitの大量のコンテンツにとても感激しました！ [フルレコーディングをご覧いただけますし](https://www.youtube.com/watch?v=fnr9XWvjJHw)、音声のみの(プ)レビューを[Svelte Radio](https://www.svelteradio.com/episodes/svelte-summit-party-episode)でお聞きいただけます。それでは今月のニュースに参りましょう…

## New features in the Svelte Compiler
- `:global()` が合成CSSセレクター(compound CSS selectors)の一部としてサポートされました (**3.38.0**, [Example](https://svelte.dev/repl/54148fd2af484f2c84977c94e523c7c5?version=3.38.0))
- CSSカスタムプロパティをコンポーネントに渡すことができるようになり、テーマ設定などに利用できるようになりました (**3.38.0**, [Docs coming soon](https://github.com/sveltejs/svelte/issues/6268))

## New in SvelteKit
- [kit.svelte.dev](https://kit.svelte.dev/) の外観が新しくなり、[SvelteKit Demoサイト](https://netlify.demo.svelte.dev/) も一新されました。`npm init svelte@next` を実行してチェックしてみてください。
- `@sveltejs/adapter-static` を使って、fallback page を指定することでシングルページアプリまたはSPAを作れるようになりました ([PR](https://github.com/sveltejs/kit/pull/1181), [Docs](https://github.com/sveltejs/kit/tree/master/packages/adapter-static))
- アプリ全体またはページごとにサーバーサイドレンダリング (SSR) を無効にできるようになりました ([PR](https://github.com/sveltejs/kit/pull/713), [Docs](https://kit.svelte.dev/docs#ssr-and-javascript-ssr))
- プリレンダリングのときにスローされるエラーメッセージがよりわかりやすく読みやすくなりました ([PR](https://github.com/sveltejs/kit/pull/1062), [Docs](https://kit.svelte.dev/docs#layouts-error-pages))
- ページがルートレイアウトを継承しないようにレイアウトをリセットできるようになりました。これは特定のレイアウトがある場合やi18n variationに便利です ([PR](https://github.com/sveltejs/kit/pull/1061), [Docs](https://kit.svelte.dev/docs#layouts-resets))
- SvelteKitコードの `fetch` は可能な限り環境が提供する実装を使用できるようになりました。もし `fetch` が利用できない場合は、アダプタによってpolyfillされます ([PR](https://github.com/sveltejs/kit/pull/1066), [Docs](https://kit.svelte.dev/docs#loading-input-fetch))

## New in Svelte & Language Tools
- `svelte-preprocess` が tsconfig.json の "extends" フィールドをサポートしました (4.7.2)
- HTML の `style` 属性に hover と auto-complete が追加されました。Foreign namespaces と ESM configs が Svelte language server と extension でサポートされました
- Svelte language tools は slot/event にジェネリックな関係が定義されている場合にそれらのプロパティから型を推測できるようになりました (原文: The Svelte language tools can now infer slot/event types from their props if a generic relationship between them was defined)

---

## Community Showcase

**Apps & Sites**

- [gitpod.io](https://github.com/gitpod-io/website) は最近 SvelteKit でサイトを書き直しました
- [highlight eel](https://highlighteel.com/) はあらゆるYoutubeビデオのお気に入りの部分をマークしてクリップし、誰とでも共有できるWebベースのエディターです
- [The Far Star Mission](https://thefarstar.apotheus.net/) は、Apotheus のアルバム「The Far Star」に付属する対話型のオーディオブックです。
- [JavaScript quiz](https://github.com/nclskfm/javascript-quiz) は解答をローカルに保存できる小さなクイズアプリケーションです
- [ExtensionPay](https://extensionpay.com/) を使用すると、バックエンドのサーバーコードなしで、ブラウザ拡張機能で安全な支払いを受け取ることができます。
- [mk48.io](https://mk48.io/) は SvelteKitで作られた海軍戦艦のゲームです
- [Frog Safety](https://frog-safety.vercel.app/) は African Dwarf Frogs と API freshwater master kit のガイドです
- [Stardew Valley Character Preview](https://github.com/overscore-media/stardew-valley-character-preview) Stardew Valley のセーブファイルからキャラクターの属性をロードし、様々な服、色、アクセサリーで遊ぶことができます


**Demos, Libraries, Tools & Components**

- [svelte-parallax](https://github.com/kindoflew/svelte-parallax) はSvelte向けのスプリングベースのパララックスコンポーネントです
- [@svelte-plugins/viewable](https://github.com/svelte-plugins/viewable) は要素の視認性をトラッキングするためのシンプルなルールベースのアプローチです
- [Sveltekit-JUI](https://github.com/Wolfr/sveltekit-jui) は Svelte および SvelteKit と組み合わせて使用するUIコンポーネントキットです
- [EZGesture](https://github.com/mhmd-22/ezgesture#integrating-with-other-frameworks) は、シンプルなネイティブDOMイベントでジェスチャー機能を簡単に追加することができます

**自分のコンポーネントを投稿してみたいですか？** [このファイルに対するPR](https://github.com/svelte-society/sveltesociety.dev/blob/master/src/pages/components/components.json) を作成し、[コンポーネント](https://sveltesociety.dev/components) を Svelte Society site に提出してください。


**Starters**
- [How to use Vercel Analytics with SvelteKit](https://ivoberger.com/posts/using-vercel-analytics-with-svelte-kit) では、ユーザーのデバイス間で Web Vitals をトラッキングする方法を説明しています
- [Asp.NETCore + Svelte + Vite](https://github.com/Kiho/aspcore-spa-cli/tree/master/samples/SviteSample) は3つのフレームワークを SpaCliMiddleware (VS2019) で接続します
- [Add CoffeeScript to Svelte](https://github.com/Leftium/coffeescript-adder) は、SvelteKit プロジェクトや Vite を使用している Svelte アプリに CoffeeScript を追加する実験的なコマンドです
- [Adds Supabase to Svelte](https://github.com/joshnuss/svelte-supabase) は、SvelteKit プロジェクトに Spabase を追加する実験的なコマンドです
- [svelte-babylon](https://github.com/SectorXUSA/svelte-babylon) はリアクティブな Svelte コンポーネントを通して BabylonJS を A-Frame のように使用することができます

**特定のスターターをお探しですか？** [svelte-adders](https://github.com/svelte-add/svelte-adders) や、その他多数のテンプレート例をコミュニティサイト [sveltesociety.dev](https://sveltesociety.dev/templates/) からチェックしてみてください。


**Learning Resources**
- [Amazing macOS Dock animation in Svelte](https://dev.to/puruvj/amazing-macos-dock-animation-in-svelte-5hfb) では Svelte と popmotion の相性の良さを示しています
- [Solving the Tower of Hanoi with recursive Svelte templates](https://geoffrich.net/posts/svelte-tower-of-hanoi/) では、`<svelte:self>` 要素を一般的なコンピュータサイエンスの問題に組み込んでいます
- [DIY SvelteKit CDK adapter](https://dev.to/juranki/diy-sveltekit-cdk-adapter-3enp) は SvelteKit と AWS CDK を統合します
- Fireshipの [Svelte in 100 Seconds](https://www.youtube.com/watch?v=rv3Yq-B8qp4) は Svelte のコアコンセプトをすばやく簡単に紹介しています
- [Tech Downtime](https://www.youtube.com/watch?v=tsePBA2JC7o&list=PLualcIC6WNK1LHIYx2Tg9AQfTQDv4zNPu) は、Svlete の起動と実行、デバッグまで深く掘り下げているプレイリストです
- lihautan の [Svelte 101](https://www.youtube.com/watch?v=rwYgOU0WmVk&list=PLoKaNN3BjQX3mxDEVG3oGJx2ByXnue_gR&index=59) と [Svelte Store](https://www.youtube.com/watch?v=p4GmT0trCPE&list=PLoKaNN3BjQX3fG-XOSwsPHtnV8FUY6lgK&index=19) の最新ビデオは、slots、store、context と、それをいつどこで使用するかを説明しています
- [DavidParkerW](https://www.youtube.com/c/DavidParkerW/playlists) は、Svelte、Sapper、SvelteKitをいくつかの実世界のシナリオで探求しています。例えば、[APIからブログポストのリストを表示する](https://www.youtube.com/watch?v=kAPVFgFnxaM&list=PLPqKsyEGhUna6cvm6d4vZNI6gbt_0S4Xx&index=15) 、などです。



## See you next month!

なにかご意見がありますか？ [Svelte Society](https://sveltesociety.dev/)、[Reddit](https://www.reddit.com/r/sveltejs/)、[Discord](https://discord.com/invite/yy75DKs)にジョインしてください！
