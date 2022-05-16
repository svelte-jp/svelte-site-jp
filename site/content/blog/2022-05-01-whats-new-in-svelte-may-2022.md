---
title: "What's new in Svelte: 2022年5月"
description: "`<svelte:element>` で動的に HTML 要素タイプを切り替える"
author: Daniel Sandoval
authorURL: https://desandoval.net
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-may-2022
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

昨日 Svelte Summit があったので、シェアするニュースがたくさんあります！[Svelte Society YouTube Channel](https://www.youtube.com/sveltesociety) のレコーディングをチェックしてみてください。それでは、今月の更新情報をどうぞ…

## What's new in Svelte
- `<svelte:element>` 要素によって、動的に指定したタイプの要素をレンダリングできます。これは例えば、CMS のリッチなテキストコンテンツをレンダリングする場合などに便利です。詳細は [docs](https://svelte.jp/docs#template-syntax-svelte-element) や [tutorial](https://svelte.jp/tutorial/svelte-element) をチェックしてみてください (**3.47.0**)!


## Language Tools updates
- `svelte:element` と `sveltekit:reload` がサポートされました
- 無効な Svelte インポートパスが自動的に検知されるようになりました。以前の動作に戻したい場合は PR をご確認ください ([#1448](https://github.com/sveltejs/language-tools/pull/1448))
- `source.sortImports` によって、未使用のインポートを削除することなくインポートをソートできるようになりました ([#1338](https://github.com/sveltejs/language-tools/issues/1338))
- HMTL 属性にカーソルを合わせたときに、TS のホバー情報ではなく HTML のホバー情報が表示されるようになり、より便利な情報が見られるようになりました ([#1447](https://github.com/sveltejs/language-tools/pull/1447))
- VS Code で、`Insert Snippet` コマンドを使って既存のコードブロックをコントロールフロータグでラップできるようになりました ([#1373](https://github.com/sveltejs/language-tools/pull/1373))

## What's new in SvelteKit
- ルート(routes)のディレクトリにあるファイルやディレクトリの名前を `__tests__` や `__test__` にすることができるようになりました ([#4438](https://github.com/sveltejs/kit/pull/4438))
- Netlify Edge Functions ([#4657](https://github.com/sveltejs/kit/pull/4657)) と Vercel build output API ([#4663](https://github.com/sveltejs/kit/pull/4663)) がサポートされました
- Custom `load` dependencies, array of strings representing URLs the page depends on, are now available when loading routes ([Docs](https://kit.svelte.jp/docs/loading#output-dependencies), [#4536](https://github.com/sveltejs/kit/pull/4536))
- ルート(routes)のロード時、そのページが依存している URL を表す文字列の配列である dependencies プロパティに、カスタムで URL を追加できるようになりました ([Docs](https://kit.svelte.dev/docs/loading#output-dependencies), [#4536](https://github.com/sveltejs/kit/pull/4536))


**Breaking Changes**
- Validators が "matchers" という名称に変わりました ([Docs](https://kit.svelte.dev/docs/routing#advanced-routing-matching), [#4358](https://github.com/sveltejs/kit/pull/4358))
- `__layout.reset` が名前付きレイアウト(named layouts)に置き換えられました。これによって、レイアウトの共通化などの設定がこれまで以上にできるようになりました ([Docs](https://kit.svelte.dev/docs/layouts#named-layouts), [#4388](https://github.com/sveltejs/kit/pull/4388))
- プリレンダリングで、`rel="external"` リンクがスキップされるようになりました ([#4545](https://github.com/sveltejs/kit/pull/4545))
- `maxage` は、`LoadOutput` の中の `cache` になりました ([#4690](https://github.com/sveltejs/kit/pull/4690))


---

## Community Showcase

**Apps & Sites built with Svelte**
- [polySpectra AR](https://ar.polyspectra.com/) は、AR のファイルを渡すことで 3D プリントを早くプロトタイプすることができます ([video demo](https://www.youtube.com/watch?v=VhYCeVGcG3E))
- [Pixel Art Together](https://github.com/liveblocks/pixel-art-together) は、複数人で使用できるフリーのピクセルアートエディタです。Liveblocks を使用しています
- [Tooling Manager](https://tooling-manager.netlify.app/) では、あなたの JavaScript の技術スタックと、業界の標準的なボイラープレートを比較することができます
- [Easy Portfolio](https://easy-portfolio.com/) は、あなたの GitHub プロフィールをもとにポートフォリオを生成します
- [FLOAT](https://github.com/muttoni/float) は、イベント用の出席管理プログラムです
- [The Coin Perspective](https://thecoinperspective.com/) は暗号通貨の価格トラッカー兼ポートフォリオ管理ツールです
- [Locutionis](https://github.com/pbouillon/locutionis) は、修辞的表現法の小さなオンラインリファレンスです (フランス語)
- [ASM Editor](https://asm-editor.specy.app/) は、M68K と MIPS 向けのオールインワンなエディタです
- [Otium](https://github.com/alombi/otium) はフリーでオープンソースのブックマネージャーであり、ブックシェルフオーガナイザーです。あなたの本や読みたい本を管理するのに役立ちます
- [Sinwaver](https://github.com/Hugo-Dz/Sinwaver) は正弦波の SVG を生成するジェネレーターです

モダンな SvelteKit webサイト に貢献してみたいですか？[Svelte Society のサイト構築を手伝っていただけませんか](https://github.com/svelte-society/sveltesociety.dev/issues)!


**Learning Resources**

_To Read_
- [4 tips for cleaner Svelte components](https://geoffrich.net/posts/clean-component-tips/) by Geoff Rich
- [Building a Clubhouse clone with Svelte and 100ms](https://www.100ms.live/blog/clubhouse-clone-with-svelte) By Seun Taiwo
- [SvelteKit uvu Testing: Fast Component Unit Tests](https://rodneylab.com/sveltekit-uvu-testing/) by Rodney Lab
- [SvelteKit JWT authentication tutorial](https://dev.to/pilcrowonpaper/sveltekit-jwt-authentication-tutorial-2m34) by pilcrowOnPaper
- [Converting a Rollup-based Svelte SPA to SvelteKit](https://github.com/sveltejs/kit/discussions/4595) by Simon H
- [Add Commitint, Commitizen, Standard Version, and Husky to SvelteKit Project](https://davipon.hashnode.dev/add-commitint-commitizen-standard-version-and-husky-to-sveltekit-project) by David Peng

_To Watch or Hear_
- [Rich Harris - The Road to SvelteKit 1.0 (Svelte Society NYC)](https://www.youtube.com/watch?v=s6a1pbTVcUs) by Svelte Society
- [Svelte Fundamentals - Intro to Svelte](https://codingcat.dev/course/intro-to-svelte) by Coding Cat
- [Svelte Components Using Custom Markdown Renderers - Weekly Svelte](https://www.youtube.com/watch?v=ZiEROAqobwM) by LevelUpTuts
- [Implementing {@const} in if block](https://www.youtube.com/watch?v=f5iReGqjmG0) by lihautan
- [Svelte and Contributing to Open-Source with Geoff Rich](https://podcast.20minjs.com/1952066/10417700-episode-6-svelte-and-contributing-to-open-source-with-geoff-rich) by 20minJS


**Libraries, Tools & Components**
- [KitDocs](https://github.com/svelteness/kit-docs) は SvelteKit 向けのドキュメントのインテグレーションです。Svelte にとっての VitePress のようなものです。
- [Svelte Copy](https://github.com/ghostdevv/svelte-copy) は、クリック/タップで簡単にクリップボードにコピーすることができるライブラリです
- [Svend3r](https://github.com/oslabs-beta/svend3r) は D3 のパワーを活用した美しいビジュアライゼーションを提供してデータに命を吹き込み、それだけでなく、命令形のコードを抽象化できます
- [Svelte Hamburgers](https://github.com/ghostdevv/svelte-hamburgers) は Svelte 向けの簡単に使えるハンバーガーメニューコンポーネントです
- [Svelte Droplet](https://github.com/probablykasper/svelte-droplet) は Svelte 向けのファイルドロップゾーンです
- [Svelte MP3](https://www.npmjs.com/package/svelte-mp3) は Svelte 向けの、軽量で高速かつシンプルでミニマルなオーディオプレーヤーです
- [SvelteUI](https://github.com/Brisklemonade/svelteui) は高機能でアクセシブルな Web アプリケーションをより速く構築するためのコンポーネントライブラリです
- [svelte-spotlight](https://github.com/beynar/svelte-spotlight) はヘッドレスな spotlight コンポーネントで、短時間でサイト全体の検索ボックスを構築するのに役立ちます
- [svelte-pdf-simple](https://github.com/gspasov/svelte-pdf-simple) は PDF を表示するためのシンプルな Svelte ライブラリで、コントロールがカスタマイズ可能です
- [persistent-svelte-store](https://github.com/omer-g/persistent-svelte-store) は永続化のための汎用的な書き込み可能なストア(writable store)です。TypeScriptでスクラッチで構築されており、Svelte のストアコントラクト(store contract)に準拠しています
- [svelte-exmarkdown](https://github.com/ssssota/svelte-exmarkdown) は markdown を動的にレンダリングするための Svelte コンポーネントです
- [Bookit](https://github.com/leveluptuts/bookit) は storybook ライクなコンポーネントレンダリング環境です。SvelteKit プロジェクトで動作するように細かくチューニングされています

この続きは [Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.com/invite/yy75DKs) で！

オフラインでのコミュニティ参加を待ち望んでいた方に朗報です。ついに Svelte Summit がリアルワールドに移行します。是非、素晴らしい Svelte コンテンツ でいっぱいの2日間にご参加ください！[チケットはこちら！](https://ti.to/svelte/svelte-summit-fall-edition)

また来月お会いしましょう！
