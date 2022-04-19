---
title: Making an app
---

このチュートリアルは、コンポーネントを書くプロセスに慣れることを目的としています。しかしいつかは、ご自身のテキストエディタで快適にコンポーネントを書きたいと思うでしょう。

まず最初に、Svelteとビルドツールを統合する必要があります。公式にメンテナンスされている、[Vite](https://vitejs.dev/)、[Rollup](https://rollupjs.org)と[webpack](https://webpack.js.org/)のプラグインが用意されています。

* [vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte)
* [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte)
* [svelte-loader](https://github.com/sveltejs/svelte-loader)

…また、[コミュニティがメンテナンスしているプラグイン](https://sveltesociety.dev/tools)も数多くあります。

もしWeb開発にあまり慣れておらずこういったツールを使ったことがなくてもご安心ください。順を追って段階的に進められるシンプルなガイド[Svelte for new developers](/blog/svelte-for-new-developers)をご用意しています。

また、テキストエディタの設定もしておくと良いでしょう。公式の[VS Code extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)はもちろん、他のエディタ向けにも[プラグイン](https://sveltesociety.dev/tools#editor-support) があります。

<!-- 
NOTE: Removed until we have better place for setting-up-your-editor guide. See https://github.com/sveltejs/svelte/pull/7310#issuecomment-1049923609
If your editor does not have a Svelte plugin then you can follow [this guide](/blog/setting-up-your-editor) to configure your text editor to treat `.svelte` files the same as `.html` for the sake of syntax highlighting. -->

そして、プロジェクトのセットアップが完了したら、Svelteのコンポーネントを使うのは簡単です。コンパイラは各コンポーネントを通常のJavaScript classに変換します。コンポーネントをインポートして `new` でインスタンス化するだけです。

```js
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// we'll learn about props later
		answer: 42
	}
});
```

必要に応じて、[component API](/docs#run-time-client-side-component-api)を使用して`app`を操作することもできます。
