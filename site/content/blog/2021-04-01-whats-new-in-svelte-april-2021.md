---
title: "What's new in Svelte: 2021年4月"
description: SvelteKitベータとslotの新しい使い方
author: Daniel Sandoval
authorURL: https://desandoval.net
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-april-2021
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

数ヶ月(数年)かけて進めてきた2つのプロジェクトが公開されました。SvelteKitは現在パブリックベータとなり、slotted components はSvelteで使えるようになりました！

## SvelteKitはどう？(What's up with SvelteKit?)
[SvelteKit](https://kit.svelte.dev/) - SSR、サーバーレスアプリケーション、SPAなどを構築するためのSvelteの汎用的なフレームワーク - が正式にパブリックベータになりました。バグがあるかも！　詳細は[最新のブログ記事](https://svelte.dev/blog/sveltekit-beta)をご覧ください。1.0がいつリリースされるか知りたいですか？ [github](https://github.com/sveltejs/kit/milestone/2)のマイルストーンをチェックしてみてください。
> 訳注 : `最新のブログ記事`の日本語翻訳版は[こちら](https://svelte.jp/blog/sveltekit-beta)です。

始め方、Sapperとの違い、新しい機能や移行方法を学びたいですか？　今週の[Svelte Radioのエピソード](https://www.svelteradio.com/episodes/svelte-kit-public-beta)で、AntonyとKevとSwyxが深く掘り下げているのでチェックしてみてください。

## SvelteとLanguageツールの新着情報(New in Svelte & Language Tools)
- Slotted components (`<svelte:fragment slot="...">`を含む) を使用すると、コンポーネントの利用者が特定のスロットにリッチなコンテンツを割り当てることができます (**Svelte 3.35.0, Language Tools [104.5.0](https://github.com/sveltejs/language-tools/releases/tag/extensions-104.5.0)**, [docs](https://svelte.dev/docs#template-syntax-svelte-fragment) と [tutorial](https://svelte.dev/tutorial/svelte-fragment) をチェックしてみてください)
- Linked editing がSvelteファイル内のHTMLで機能するようになりました (**Language Tools, [104.6.0](https://github.com/sveltejs/language-tools/releases/tag/extensions-104.6.0)**)
- 型定義 `svelte.d.ts` が正常に解決されるようになり、ライブラリの作成者がSvelteコンポーネントと一緒に型定義を配布できるようになりました (**Language Tools, [104.7.0](https://github.com/sveltejs/language-tools/releases/tag/extensions-104.7.0)**)
- ViteでSvelteを使用するのに [vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte) が利用可能になりました。`npm init @vitejs/app` はこのプラグインを使用したSvelteオプションが含まれています。

---

## Community Showcase

**アプリ & サイト**

- [Nagato](https://nagato.app/) はポピュラーなタイムトラッキングツールやToDoツールを1箇所につなげられるタスク管理ツールです。
- [type-kana](https://type-kana.cass.moe/setup) は日本の文字である ひらがな (hiragana) と カタカナ (katakana) を学ぶのに役に立つクイズアプリです。
- [Pittsburgh Steps](https://pittsburgh-steps.samlearner.com/) はペンシルベニア州ピッツバーグにある800以上の公共の屋外階段のインタラクティブなマップです。
- [Music Mode Wheels](https://tobx.github.io/music-mode-wheels/) は音楽のモードをインタラクティブなホイールとして表示するWebサイトです。
- [Critical Notes](https://www.critical-notes.com/) はゲームマスターとプレイヤーがロールプレイングゲームのキャンペーンやアドベンチャーを記録するのに役立ちます。
- [Svelte Game of Life](https://github.com/alanrsoares/svelte-game-of-life) はコンウェイのライフゲームの教育向けの実装で、TypeScriptとSvelteで書かれています。
- [foxql](https://github.com/foxql) はブラウザ上で動作するピアツーピアの全文検索エンジンです。


**デモ、ライブラリ、ツール & コンポーネント**

- [svelte-nodegui](https://github.com/nodegui/svelte-nodegui) はパフォーマンスの良いネイティブでクロスプラットフォームなデスクトップアプリケーションをNode.jsとSvelteで構築する方法です。
- [Svelte Story Format](https://www.npmjs.com/package/@storybook/addon-svelte-csf) は、Svelteの構文でStorybookの "ストーリー(stories)" を書くことができます。詳しくは [Storybook blog](https://storybook.js.org/blog/storybook-for-svelte/) をご覧ください。
- [SelectMadu](https://github.com/pavish/select-madu) は検索、複数選択、非同期データロードなどをサポートする、セレクトメニューの代替です。
- [Svelte Checklist](https://www.npmjs.com/package/svelte-checklist) はSvelteで構築されたカスタマイズ可能なチェックリストです。
- [Suspense for Svelte](https://www.npmjs.com/package/@jamcart/suspense) はReactの`<Suspense>`の中核となるアイデアを実装したSvelteコンポーネントです。
- [MiniRx](https://spierala.github.io/mini-rx-store/) はSvelteとTypeScriptで使える RxJS Redux Store です。
- [svelte-formly](https://github.com/arabdevelop/svelte-formly) はSvelteとSapper向けに動的なフォームを生成します。
- [7ty](https://www.npmjs.com/package/@jamcart/7ty) はSvelteを使用した静的サイトジェネレーターで、コンポーネントの部分的なハイドレーションをサポートし、Sapperや11tyに似たファイルベースルーティングを使用します。

**自分のコンポーネントを投稿してみたいですか？** [このファイルに対するPR](https://github.com/svelte-society/sveltesociety.dev/blob/master/src/pages/components/components.json) を作成し、[コンポーネント](https://sveltesociety.dev/components) を Svelte Society site に提出してください。


**スターター(Starters)**

- [sveltekit-electron](https://github.com/FractalHQ/sveltekit-electron) はSvelteKitを使ったElectronのスターターキットです。
- [sveltekit-tailwindcss-external-api](https://github.com/acidlake/sveltekit-tailwindcss-external-api) はTailwindCSSと外部のAPIを使用するSvelteプロジェクトを構築するために必要なことが全て揃っており、create-svelteで作られました。
- [Sapper Netlify](https://www.npmjs.com/package/sapper-netlify) は Netlify functions 上で動作するSapper Projectです。


**特定のスターターをお探しですか？** [svelte-adders](https://github.com/svelte-add/svelte-adders) や、その他多数のテンプレート例をコミュニティサイト [sveltesociety.dev](https://sveltesociety.dev/templates/) からチェックしてみてください。

**学習リソース**
- [How to Build a Website with Svelte and SvelteKit](https://prismic.io/blog/svelte-sveltekit-tutorial) は新しいSvelteKitのセットアップを順を追って説明するチュートリアルです。
- [A Svelte store for prefers-reduced-motion](https://geoffrich.net/posts/svelte-prefers-reduced-motion-store/) では、ユーザーがモーションの軽減を要求しているかどうかを示す値を持つカスタムのSvelte storeを作成して、アクセシビリティを向上させる方法について説明しています。
- [TypeScript support in Svelte](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_TypeScript) はSvelteでTypeScriptを使う方法についてのMDNのガイドです。
- [How to merge cells with svelte-window](https://gradientdescent.de/merging-cells/) は、テーブルのセルをマージする人気ツール react-window の移植版である svelte-window の解説をしています。この移行の詳細については [from react-window 1:1 to svelte-window](https://gradientdescent.de/porting-react-window/) をご覧ください。
- [Easy-to-Embed Svelte Components](https://codeandlife.com/2021/03/06/easy-to-embed-svelte-components/) では、Rollupとscriptタグを使ってSvelteコンポーネントを任意の場所に埋め込む方法を説明しています。
- [Convert Svelte project from Rollup to Snowpack](https://www.youtube.com/watch?v=-sHcqj4YLeQ) は一般的な移行パターンについてビデオで解説しています。
- [How to internationalize routing in Svelte & Sapper](https://www.leaf.cloud/blog/how-to-internationalize-routing-in-svelte-sapper?utm_medium=story&utm_source=reddit.com&utm_campaign=awareness&utm_content=sapper_routing) では、leaf.cloud がどのようにサイトをオランダ語に翻訳したかを説明しています。
- [Svelte Store: Reactive context using Svelte Store](https://www.youtube.com/watch?v=-rTnWlbdjoY) は "どうやって [a] context の値をリアクティブにするのか" という質問に答えているビデオです。
- [Creating Social Sharing Images with Cloudinary and Svelte](https://www.youtube.com/watch?v=-Si5o-R7KHY) はJAMstackのWebサイト向けのOpen GraphのイメージやTwitterカードを動的に開発する方法を説明するCloudinaryのビデオです。


## また来月お会いしましょう！(See you next month!)

なにかご意見がありますか？ [Svelte Society](https://sveltesociety.dev/)、[Reddit](https://www.reddit.com/r/sveltejs/)、[Discord](https://discord.com/invite/yy75DKs)にジョインしてください！
