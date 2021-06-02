---
title: What's new in Svelte: 2021年6月
description: SvelteKit 1.0に向けた進捗と language tools における TypeScript/Svelte 統合の強化
author: Daniel Sandoval
authorURL: https://desandoval.net
---

今月は、SvelteKit とそのドキュメントに多くの貢献がありました。language tools にもいくつか新機能が追加され、特に注目すべきは JavaScript または TypeScript ファイルと Svelte ファイルの深い統合です。それではアップデートに参りましょう…

## New in SvelteKit
- `svelte.config.js` コンフィグファイルが ESM フォーマットでロードされるようになりました (`.cjs` ではなく `.js`).
- AMP ページでレンダリングされた CSS が使われるようになります
- `svelte-check` が TypeScript テンプレートに追加されました ([sveltejs/kit#1556](https://github.com/sveltejs/kit/pull/1556)) 
- https キーペアのサポート [sveltejs/kit#1456](https://github.com/sveltejs/kit/pull/1456) 
- 現在は SvelteKit に Vite をバンドルし、アップグレードしたバージョンを使用しています。もし `package.json` に Vite がある場合は、それを削除します 
- バイナリレスポンスのための Etag [sveltejs/kit#1382](https://github.com/sveltejs/kit/pull/1382) 
- `$layout` から `__layout`、`$error` から `__error` にリネームしました
- `getContext` を削除し、代わりに `request.locals` を使用します 
- 出力ディレクトリを `.svelte` から `.svelte-kit` にリネームしました。適宜 `.gitignore` を更新してください。
- `trailingSlash: 'never' | 'always' | 'ignore'` がコンフィグで使用できるようになりました。これにより、`index.html` ページの末尾にスラッシュをつけることを前提とした静的ホスティングプロバイダで動作するサイトの構築が簡単になり、より複雑な動作を必要とする人向けのエスケープハッチが提供されることになります。

## Notable bug fixes in SvelteKit
- `adapter-netlify` が [sveltejs/kit#1467](https://github.com/sveltejs/kit/pull/1467) で修正され、[readme](https://github.com/sveltejs/kit/tree/master/packages/adapter-netlify) に新しいドキュメントが作成されました。
- アプリが所有していないURLのナビゲーションをルーターがインターセプトしなくなりました。これにより、同じオリジンでベースパスを共有していない `<a>` 要素をページに持つアプリのクラッシュが修正されました。
- ハッシュのみの変更がルーターによって処理されるようになり、ある状況でハッシュ変更中にブラウザの"戻る"ナビゲーションが実行されてしまうことが修正されました。



## New in Svelte & Language Tools
- Svelte 3.38.1 と 3.38.2 ではハイドレーションで要素の重複が発生する問題が修正されました。もしこの問題が発生している場合は最新のバージョンにアップデートしてください！
- 新しい TypeScriptプラグインは、JavaScriptやTypeScriptファイルとSvelteファイルのより深い統合を提供します。これには変数の診断、参照、名前変更などが含まれます。このプラグインは VS Code extension にパッケージされていますが、現在はデフォルトでオフになっています。[こちらの設定](https://github.com/sveltejs/language-tools/tree/master/packages/svelte-vscode#svelteenable-ts-plugin)で有効にすることができます。是非お試しいただき、[フィードバックをお寄せください](https://github.com/sveltejs/language-tools/issues/580)
- 最新バージョンの `svelte-check` は `tsconfig.json` や `jsconfig.json` のパスを指定できるようになりました。例: `svelte-check --tsconfig "./tsconfig.json"`。 これにより、そのコンフィグで参照されているファイルに対してのみ診断が行われます。また、JavaScriptやTypeScriptのファイルに対しても診断が実行されるため、Svelte 以外のファイルに対して (`tsc --noEmit` のような) 別のチェックを実行する必要がなくなります (`svelte-check` version [**1.6.0**](https://github.com/sveltejs/language-tools/releases/tag/svelte-check-1.6.0))
- VS Code extension と `svelte-check` が新しくメジャーリリースされました。以前は、イニシャライザを持たないプロパティ (`export let foo;`) は、ユーザが TypeScript を使用していて、かつ `strict` モードを有効にしている場合にのみ必須とされました。これが変更されました。TypeScriptを使用している場合や、JavaScriptでも `checkJs` を使用している場合は、これらのプロパティが常に必須としてマークされるようになりました (`svelte-check` version [**2.0.0**](https://github.com/sveltejs/language-tools/releases/tag/svelte-check-2.0.0), extension version [**105.0.0**](https://github.com/sveltejs/language-tools/releases/tag/extensions-105.0.0))

---

## Community Showcase

**Apps & Sites**

- [vidu](https://github.com/pa-nic/vidu) はミニマルな Web アナリティクスコレクターとダッシュボードです
- [River Runner](https://river-runner.samlearner.com/) は川の流れを仮想的に追うことができ、 Mapbox と Svelte で構築されています。
- [JSDoc Type Generator](https://rafistrauss.github.io/jsdoc-generator/) は有効なJSONの JSDoc 型定義を生成します。
- [pagereview.io](https://pagereview.io/) は Webサイトのフィードバックツールで、レビューするサイトに直接コメントを残すことができます。
- [gamesroom.io](https://gamesroom.io/) はビデオチャットが組み込まれているオンラインボードゲームプラットフォームです。
- [Greedy Goblin](https://greedygoblin-fe11c.web.app/) はオールドスクールな Runescape プレイヤーのためのレシピアプリです。
- [hashbrown.geopjr.dev](https://hashbrown.geopjr.dev/) は GNOME-shell にインスパイアされたWebページで、ソースコードについて学んだり、調べたり、Hashbrown GTK アプリをダウンロードすることができます ([ソースのリンク](https://github.com/GeopJr/Hashbrown/tree/website))。


**Libraries, Tools & Components**

- [svelte-image-crop](https://novacbn.github.io/svelte-image-crop/) は、Web APIを利用したシンプルなクリック＆ドラッグ式の画像切り抜きライブラリです。
- [svelte-datepicker](https://github.com/andrew-secret/svelte-datepicker) は、Svelteで構築された軽量で包括的な date picker です。
- [svelte-regex-router](https://www.npmjs.com/package/svelte-regex-router) は、Svelteアプリケーションでルーティングを簡単に扱うための、シンプルで軽量なライブラリです。
- [Svelte Micro](https://www.npmjs.com/package/svelte-micro) は、Svelte向けの軽量かつリアクティブな単一コンポーネントルーターです。
- [svelte-entity-store](https://www.npmjs.com/package/svelte-entity-store) は、エンティティオブジェクトのコレクションを保存するためのシンプルで汎用的なソリューションを提供します。
- [svelte-animation-store](https://github.com/joshnuss/svelte-animation-store) は、Svelteのトゥイーンストアをベースにしたストアで、トゥイーンの一時停止、継続、リセット、リプレイ、リバース、スピード調整などを行うことができます。


**自分のコンポーネントを投稿してみたいですか？** [このファイルに対するPR](https://github.com/svelte-society/sveltesociety.dev/blob/master/src/pages/components/components.json) を作成し、[コンポーネント](https://sveltesociety.dev/components) を Svelte Society site に提出してください。


## See you next month!

なにかご意見がありますか？ [Svelte Society](https://sveltesociety.dev/)、[Reddit](https://www.reddit.com/r/sveltejs/)、[Discord](https://discord.com/invite/yy75DKs)にジョインしてください！
