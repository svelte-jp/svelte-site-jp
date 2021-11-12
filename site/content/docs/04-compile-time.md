---
title: Compile time
---

通常、Svelte コンパイラと直接やりとりすることはなく、代わりにバンドルプラグインを使ってビルドシステムに統合することになります。

* [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte) は [Rollup](https://rollupjs.org) のユーザー向けです
* [svelte-loader](https://github.com/sveltejs/svelte-loader) は [webpack](https://webpack.js.org) のユーザー向けです
* もしくは [コミュニティでメンテナンスされているプラグイン](https://sveltesociety.dev/tooling) のどれか

とはいえ、バンドルプラグインは一般的にコンパイラのオプションを公開しているので、コンパイラの使い方を理解しておくと便利です。



### `svelte.compile`

```js
result: {
	js,
	css,
	ast,
	warnings,
	vars,
	stats
} = svelte.compile(source: string, options?: {...})
```

---

ここでマジックが起こります。`svelte.compile` はコンポーネントのソースコードを受け取ります。そしてそれを使用して、クラスをエクスポートするJavaScriptモジュールに変えます。

```js
const svelte = require('svelte/compiler');

const result = svelte.compile(source, {
	// options
});
```

以下のオプションをコンパイラに渡すことができます。どれも必須ではありません。

<!-- | option | type | default
| --- | --- | --- |
| `filename` | string | `null`
| `name` | string | `"Component"`
| `format` | `"esm"` or `"cjs"` | `"esm"`
| `generate` | `"dom"` or `"ssr"` or `false` | `"dom"`
| `errorMode` | `"throw"` or `"warn"` | `"throw"`
| `varsReport` | `"strict"` or `"full"` or `false` | `"strict"`
| `dev` | boolean | `false`
| `immutable` | boolean | `false`
| `hydratable` | boolean | `false`
| `legacy` | boolean | `false`
| `customElement` | boolean | `false`
| `tag` | string | null
| `accessors` | boolean | `false`
| `css` | boolean | `true`
| `loopGuardTimeout` | number | 0
| `preserveComments` | boolean | `false`
| `preserveWhitespace` | boolean | `false`
| `outputFilename` | string | `null`
| `cssOutputFilename` | string | `null`
| `sveltePath` | string | `"svelte"` -->

| option | default | description |
| --- | --- | --- |
| `filename` | `null` | デバッグのヒントやソースマップに使われる `string` です。バンドルプラグインが自動的に設定します。
| `name` | `"Component"` | 結果として得られるJavaScriptクラスの名前を設定する `string` です (ただし、スコープ内の他の変数と競合する場合はコンパイラが名前を変更します)、通常は `filename` から推測されます。
| `format` | `"esm"` | `"esm"` の場合、JavaScriptモジュールを作成します (`import` と `export` を指定します)、`"cjs"` の場合、CommonJSモジュールを作成します(`require` と `module.exports` を指定します)、これは、いくつかのサーバーサイドのレンダリング状況やテストに便利です。
| `generate` | `"dom"` | `"dom"` の場合、SvelteはDOMにマウントするためのJavaScriptクラスを生成します。`"ssr"`の場合、サーバサイドのレンダリングに適した `render` メソッドを持つオブジェクトを出力します。`false` の場合、JavaScriptやCSSは返されず、メタデータだけが返されます。
| `errorMode` | `"throw"` | `"throw"` の場合、Svelteはコンパイルエラーが発生したときにエラーをスローします。`"warn"` の場合、Svelteはエラーを警告として扱い、その警告をwarning reportに追加します。
| `varsReport` | `"strict"` | `"strict"` の場合、Svelteはグローバルまたはインターナルな変数以外のみの変数レポートを返します。`"full"` の場合は検出された全ての変数を返します、`false` の場合は変数レポートは返しません。
| `dev` | `false` | `true` の場合、コンポーネントに特別なコードを追加します。これは、ランタイムチェックを実行し、開発中にデバッグ情報を提供するためのものです。
| `immutable` | `false` | `true` の場合、オブジェクトを変更させないことをコンパイラに伝えます。これにより、値が変更されたかどうかのチェックをより控えめにすることができます。
| `hydratable` | `false` | `true` を指定すると、DOMコードを生成する際に `hydrate: true` ランタイムオプションが有効になり、新しいDOMをゼロから生成するのではなく、既存のDOMをアップグレードすることができます。これにより、SSRコードを生成する際に `<head>` 要素にマーカーが追加され、ハイドレーションがどれを置き換えるべきかを知ることができるようになります。
| `legacy` | `false` | `true` ならば、`element.dataset` のようなものをサポートしていないIE9とIE10で動作するコードを生成します。
| `accessors` | `false` | `true` の場合、ゲッターとセッターはコンポーネントのプロパティ(props)に対して作成されます。`false` の場合、それらは読み書きされた値に対してのみ作成されます。 (つまり`const`, `class`, `function` で宣言されたもの) `customElement: true` でコンパイルした場合、このオプションのデフォルトは `true` です。
| `customElement` | `false` | `true` ならば、コンパイラに通常のSvelteコンポーネントの代わりにカスタム要素のコンストラクタを生成するように指示します。
| `tag` | `null` | Svelteにカスタム要素を登録するタグ名を指定する `string`。文字列は小文字の英数字で、少なくとも1つのハイフンを含んだ文字列でなければなりません。例えば `"my-element"`.
| `css` | `true` | `true` の場合、スタイルはJavaScriptクラスに含まれ、実行時に注入されます。これを `false` に設定して静的に生成されたCSSを使うと、JavaScriptのバンドルが小さくなり、パフォーマンスが向上するのでおすすめです。
| `cssHash` | 右記 | `{ hash, css, name, filename }`を引数に取り、スコープ付きCSSのクラス名として使われる文字列を返す関数。デフォルトでは、`svelte-${hash(css)}`を返します。
| `loopGuardTimeout` | 0 | `loopGuardTimeout` msを超えてスレッドがブロックされた場合にループを解除するようにSvelteに指示する `数値` です。これは無限ループを防ぐのに便利です。**利用可能なのは `dev: true` の場合のみです**
| `preserveComments` | `false` | `true` の場合、サーバサイドでのレンダリング中に HTML コメントが保存されます。デフォルトではコメントは削除されます。
| `preserveWhitespace` | `false` | `true` の場合、要素内や要素間の空白は、可能であれば削除されたり単一の空白になったりするのではなく、入力したとおりに保持されます。
| `sourcemap` | `object \| string` | An initial sourcemap that will be merged into the final output sourcemap. This is usually the preprocessor sourcemap.
| `enableSourcemap` | `boolean \| { js: boolean; css: boolean; }` | If `true`, Svelte generate sourcemaps for components. Use an object with `js` or `css` for more granular control of sourcemap generation. By default, this is `true`.
| `outputFilename` | `null` | JavaScriptのソースマップに使われる `文字列` です。
| `cssOutputFilename` | `null` | CSSのソースマップに使われる `文字列` です。
| `sveltePath` | `"svelte"` | `svelte` パッケージの場所。`svelte` または `svelte/[module]` からのインポートは、それに応じて変更されます。
| `namespace` | `"html"` | 要素の名前空間。例えば、`"mathml"`, `"svg"`, `"foreign"`

---

返ってきた `result` オブジェクトには、有用なメタデータとともにコンポーネントのコードが含まれます。

```js
const {
	js,
	css,
	ast,
	warnings,
	vars,
	stats
} = svelte.compile(source);
```

* `js` と `css` は以下のプロパティを持つオブジェクトです。
	* `code` は JavaScript の文字列です。
	* `map` はソースマップに `toString()` と `toUrl()` の便利なメソッドを追加したものです。
* `ast` はコンポーネントの構造を表す抽象構文ツリーです。
* `warnings` はコンパイル時に生成された警告オブジェクトの配列です。各警告にはいくつかのプロパティがあります。
	* `code` は警告のカテゴリを識別する文字列です。
	* `message` は人間が読みやすい言葉で問題を説明したものです。
	* `start` and `end` はもしも警告が特定の場所に関連している場合には `line`, `column`, `character` プロパティを持つオブジェクトです。
	* `frame` は該当する場合に問題のあるコードを行番号で強調表示する文字列です。
* `vars` はコンポーネントの宣言の配列です、例えば [eslint-plugin-svelte3](https://github.com/sveltejs/eslint-plugin-svelte3) で使用されているように、各変数はいくつかのプロパティを持っています。
	* `name` はそのままの意味です
	* `export_name` は、エクスポートされた場合に使用される名前です。 (`export...as` でない限り、`name` と一致します)
	* `injected` が `true` なのは、宣言はあなたが書いたコードではなく、Svelteによって注入されている場合です。
	* `module` が `true` なのは、モジュールの値が `context="module"`スクリプトで宣言されている場合です。
	* `mutated` が `true` なのは、値のプロパティがコンポーネント内部に割り当てられている場合です。
	* `reassigned` が `true` なのは、コンポーネント内で値が再割り当てされている場合です。
	* `referenced` が `true` なのは、テンプレート内で値が使われている場合です。
	* `referenced_from_script` が `true` なのは、宣言外の `<script>` の中で値が使われている場合です。
	* `writable` が `true` なのは、値が `let` または `var` で宣言されている場合です。 (ただし`const`, `class` と `function` は除きます)
* `stats` はSvelte開発チームがコンパイラを診断するために使用するオブジェクトです。これに依存してはいけません！


<!--

```js
compiled: {
	// `map` is a v3 sourcemap with toString()/toUrl() methods
	js: { code: string, map: {...} },
	css: { code: string, map: {...} },
	ast: {...}, // ESTree-like syntax tree for the component, including HTML, CSS and JS
	warnings: Array<{
		code: string,
		message: string,
		filename: string,
		pos: number,
		start: { line: number, column: number },
		end: { line: number, column: number },
		frame: string,
		toString: () => string
	}>,
	vars: Array<{
		name: string,
		export_name: string,
		injected: boolean,
		module: boolean,
		mutated: boolean,
		reassigned: boolean,
		referenced: boolean,
		referenced_from_script: boolean,
		writable: boolean
	}>,
	stats: {
		timings: { [label]: number }
	}
} = svelte.compile(source: string, options?: {...})
```

-->


### `svelte.parse`

```js
ast: object = svelte.parse(
	source: string,
	options?: {
		filename?: string,
		customElement?: boolean
	}
)
```

---

`parse` 関数はコンポーネントを解析し、その抽象構文木のみを返します。`generate: false` オプションを指定してコンパイルするのとは異なり、これはコンポーネントを解析する以外の検証やその他の解析を行いません。


```js
const svelte = require('svelte/compiler');

const ast = svelte.parse(source, { filename: 'App.svelte' });
```


### `svelte.preprocess`

Svelte を TypeScript, PostCSS, SCSS, Less などのツールで利用できるようにするための [コミュニティでメンテナンスされているプリプロセッサプラグイン](https://sveltesociety.dev/tools#preprocessors) が多数用意されています。

`svelte.preprocess` APIを使って独自のプリプロセッサを書くことができます。

```js
result: {
	code: string,
	dependencies: Array<string>
} = await svelte.preprocess(
	source: string,
	preprocessors: Array<{
		markup?: (input: { content: string, filename: string }) => Promise<{
			code: string,
			dependencies?: Array<string>
		}>,
		script?: (input: { content: string, markup: string, attributes: Record<string, string>, filename: string }) => Promise<{
			code: string,
			dependencies?: Array<string>
		}>,
		style?: (input: { content: string, markup: string, attributes: Record<string, string>, filename: string }) => Promise<{
			code: string,
			dependencies?: Array<string>
		}>
	}>,
	options?: {
		filename?: string
	}
)
```

---

`preprocess` 関数は、コンポーネントのソースコードを任意に変換するための便利なフックを提供します。例えば、`<style lang="sass">` ブロックを純粋なCSSに変換するために使うことができます。

最初の引数はコンポーネントのソースコードです。2番目の引数は、*プリプロセッサ* の配列です (1つしかない場合は単独のプリプロセッサになります)。このプリプロセッサは `markup`, `script`, `style` 関数を持つオブジェクトであり、これらは全てオプションです。

各 `markup`, `script`, `style` 関数は、変換されたソースコードを表す `code` プロパティと、任意で `dependencies` の配列を含んだオブジェクト (またはオブジェクトを resolve する promise) を返さなければなりません。

`markup` 関数は、コンポーネントのソーステキスト全体と、第3引数にコンポーネントの `filename` が指定されている場合はそのコンポーネントの `filename` を受け取ります。

> プリプロセッサ関数は、`code` や `dependencies` に加えて `map` オブジェクトを返すことがあります。この `map` は変換を表すソースマップです。

```js
const svelte = require('svelte/compiler');
const MagicString = require('magic-string');

const { code } = await svelte.preprocess(source, {
	markup: ({ content, filename }) => {
		const pos = content.indexOf('foo');
		if(pos < 0) {
			return { code: content }
		}
		const s = new MagicString(content, { filename })
		s.overwrite(pos, pos + 3, 'bar', { storeName: true })
		return {
			code: s.toString(),
			map: s.generateMap()
		}
	}
}, {
	filename: 'App.svelte'
});
```

---

`script`関数と`style`関数はそれぞれ `<script>` と `<style>` 要素の内容(`content`)とコンポーネントのソーステキスト全体(`markup`)を受け取ります。これらの関数は `filename` に加えて要素の属性のオブジェクトを取得します。

`依存関係`の配列が返された場合、それが結果オブジェクトに含まれます。これは（例えば）[rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte) のようなパッケージで、`<style>` タグに `@import` がある場合などに、追加ファイルの変更を監視するために使われます。

```js
const svelte = require('svelte/compiler');
const sass = require('node-sass');
const { dirname } = require('path');

const { code, dependencies } = await svelte.preprocess(source, {
	style: async ({ content, attributes, filename }) => {
		// only process <style lang="sass">
		if (attributes.lang !== 'sass') return;

		const { css, stats } = await new Promise((resolve, reject) => sass.render({
			file: filename,
			data: content,
			includePaths: [
				dirname(filename),
			],
		}, (err, result) => {
			if (err) reject(err);
			else resolve(result);
		}));

		return {
			code: css.toString(),
			dependencies: stats.includedFiles
		};
	}
}, {
	filename: 'App.svelte'
});
```

---

複数のプリプロセッサを併用することができます。最初のプリプロセッサの出力は、2番目のプリプロセッサへの入力になります。最初に `markup` 関数が実行され、次に `script` と `style` が実行されます。

```js
const svelte = require('svelte/compiler');

const { code } = await svelte.preprocess(source, [
	{
		markup: () => {
			console.log('this runs first');
		},
		script: () => {
			console.log('this runs third');
		},
		style: () => {
			console.log('this runs fifth');
		}
	},
	{
		markup: () => {
			console.log('this runs second');
		},
		script: () => {
			console.log('this runs fourth');
		},
		style: () => {
			console.log('this runs sixth');
		}
	}
], {
	filename: 'App.svelte'
});
```


### `svelte.walk`

```js
walk(ast: Node, {
	enter(node: Node, parent: Node, prop: string, index: number)?: void,
	leave(node: Node, parent: Node, prop: string, index: number)?: void
})
```

---

`walk` 関数はパーサーによって生成された抽象構文木をウォークする方法を提供します。コンパイラの組み込みインスタンスである[estree-walker](https://github.com/Rich-Harris/estree-walker)を使用します。

ウォーカーは歩くための抽象構文木と、オプションの2つのメソッド `enter` と `leave` を持つオブジェクトを受け取ります。各ノードに対して、(存在すれば) `enter` が呼び出されます。そして `enter` を実行している間に `this.skip()` が呼ばれない限り、各子プロセスを巡回した後、ノード上で `leave` が呼ばれます。


```js
const svelte = require('svelte/compiler');
svelte.walk(ast, {
	enter(node, parent, prop, index) {
		do_something(node);
		if (should_skip_children(node)) {
			this.skip();
		}
	},
	leave(node, parent, prop, index) {
		do_something_else(node);
	}
});
```


### `svelte.VERSION`

---

package.json で設定されている現在のバージョンです。

```js
const svelte = require('svelte/compiler');
console.log(`running svelte version ${svelte.VERSION}`);
```
