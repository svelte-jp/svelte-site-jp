---
title: 'svelte/register'
---

> この API は Svelte 4 で削除されました。`require` hooks は非推奨で、現在の Node のバージョンでは、ESM に対応しています。Svelte コンポーネントから JavaScript モジュールを作成するには、Vite のようなバンドラーを使用するか、私たちのフルスタックフレームワークである [SvelteKit](https://kit.svelte.jp)を使用してください。

Svelteコンポーネントをビルドせずに Node.js でレンダリングするには、`require('svelte/register')`を使います。その後 `require` を使って `.svelte` ファイルをインクルードすることができます。

```js
// @noErrors
require('svelte/register');

const App = require('./App.svelte').default;

// ...

const { html, css, head } = App.render({ answer: 42 });
```

> `.default`は、ネイティブの JavaScript モジュールから Node が認識する CommonJS モジュールに変換するために必要です。コンポーネントが JavaScript モジュールをインポートすると、Node での読み込みに失敗するので、代わりにバンドラを使う必要があることに注意してください。

コンパイルオプションを設定したり、カスタムファイルの拡張子を使用したりするには、`register` フックを関数として呼び出します。

```js
// @noErrors
require('svelte/register')({
	extensions: ['.customextension'], // defaults to ['.html', '.svelte']
	preserveComments: true
});
```
