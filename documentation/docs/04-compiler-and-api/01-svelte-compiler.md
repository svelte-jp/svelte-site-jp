---
title: 'svelte/compiler'
---

通常、Svelte コンパイラと直接やり取りすることはありません。その代わり、バンドラープラグイン(bundler plugin)を使ってビルドシステムにインテグレートします。Svelte チームが最も推奨している、また注力もしているバンドラープラグインは [vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte) です。[SvelteKit](https://kit.svelte.jp/) フレームワークは `vite-plugin-svelte` を活用し、アプリケーションをビルドするためのセットアップと、[Svelte コンポーネントライブラリをパッケージングするツール](https://kit.svelte.jp/docs/packaging)を提供しています。Svelte Society には、Rollup や Webpack などのツール向けの [その他のバンドラープラグイン](https://sveltesociety.dev/tools/#bundling) のリストがあります。

とはいえ、バンドラープラグインは一般的にコンパイラのオプションを公開しているので、コンパイラの使い方を理解しておくと便利です。

## compile

> EXPORT_SNIPPET: svelte/compiler#compile

ここでマジックが起こります。`svelte.compile` はあなたのコンポーネントのソースコードを使用して、クラスをエクスポートするJavaScriptモジュールに変えます。

```js
// @filename: ambient.d.ts
declare global {
	var source: string
}

export {}

// @filename: index.ts
// ---cut---
import { compile } from 'svelte/compiler';

const result = compile(source, {
	// options
});
```

使用可能なすべてのオプションについては、[CompileOptions](#types-compileoptions) をご参照ください。

戻り値の `result` オブジェクトには、あなたのコンポーネントのコードと、ちょっとした便利なメタデータが含まれています。

```ts
// @filename: ambient.d.ts
declare global {
	const source: string;
}

export {};

// @filename: main.ts
import { compile } from 'svelte/compiler';
// ---cut---
const { js, css, ast, warnings, vars, stats } = compile(source);
```

コンパイルの result の完全な詳細については、[CompileResult](#types-compileresult) をご参照ください。

## parse

> EXPORT_SNIPPET: svelte/compiler#parse

`parse` 関数はコンポーネントをパースし、その抽象構文木(abstract syntax tree)のみを返します。`generate: false` オプションを指定してコンパイルするのとは異なり、これはコンポーネントをパースするだけで、バリデーションやその他の解析を行いません。戻り値の AST はパブリックな API とは見なされないため、将来どこかのタイミングで破壊的な変更が発生する可能性があることにご注意ください。	

```js
// @filename: ambient.d.ts
declare global {
	var source: string;
}

export {};

// @filename: main.ts
// ---cut---
import { parse } from 'svelte/compiler';

const ast = parse(source, { filename: 'App.svelte' });
```

## preprocess

> EXPORT_SNIPPET: svelte/compiler#preprocess

Svelte で TypeScript、PostCSS、SCSS、Less などのツールを利用できるようにするための [コミュニティでメンテナンスされているプリプロセッサプラグイン](https://sveltesociety.dev/tools#preprocessors) が多数用意されています。

`svelte.preprocess` API を使って独自のプリプロセッサを書くことができます。

`preprocess` 関数は、コンポーネントのソースコードを任意に変換するための便利なフックを提供します。例えば、`<style lang="sass">` ブロックを純粋なCSSに変換するために使うことができます。

最初の引数はコンポーネントのソースコードです。2番目の引数は、 _プリプロセッサ(preprocessor)_ の配列で (1つしかない場合は単独のプリプロセッサになります)、プリプロセッサは `name` (必須)と、`markup`、`script`、`style` 関数(それぞれオプション)を持つオブジェクトです。

`markup` 関数は、コンポーネントのソーステキスト全体と、第3引数にコンポーネントの `filename` が指定されている場合はそのコンポーネントの `filename` を受け取ります。

`script` 関数と `style` 関数はそれぞれ `<script>` と `<style>` 要素の内容 (`content`) とコンポーネントのソーステキスト全体 (`markup`) を受け取ります。これらの関数は `filename` に加えて要素の属性のオブジェクトを取得します。

`markup`、`script`、`style` 関数は、変換後のソースコードを表す `code` プロパティを持つオブジェクト (または resolve するとオブジェクトを返す promise) を返す必要があります。オプションで、変更を監視するファイルを表す `dependencies` の配列と、オリジナルと変換後のコードのマッピングをする sourcemap である `map` オブジェクトを返すことができます。`script` と `style` のプロプロセッサは、オプションで、script/style タグで更新された属性のレコードを返すことができます。

> プリプロセッサ関数は、可能な限り `map` オブジェクトを返すべきです。そうしないと、スタックトレースがオリジナルのコードに正しくリンクできないため、デバッグが難しくなります。

```js
// @filename: ambient.d.ts
declare global {
	var source: string;
}

export {};

// @filename: main.ts
// ---cut---
import { preprocess } from 'svelte/compiler';
import MagicString from 'magic-string';

const { code } = await preprocess(
	source,
	{
		markup: ({ content, filename }) => {
			const pos = content.indexOf('foo');
			if (pos < 0) {
				return { code: content };
			}
			const s = new MagicString(content, { filename });
			s.overwrite(pos, pos + 3, 'bar', { storeName: true });
			return {
				code: s.toString(),
				map: s.generateMap()
			};
		}
	},
	{
		filename: 'App.svelte'
	}
);
```

`dependencies` の配列が返される場合、それは result オブジェクトに含まれます。これは例えば、[vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte) や [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte) のようなパッケージで、`<style>` タグに `@import` がある場合など、追加のファイルのヘンクを監視するために使われます。

```ts
// @filename: ambient.d.ts
declare global {
	var source: string;
}

export {};

// @filename: main.ts
// @errors: 2322 2345 2339
/// <reference types="@types/node" />
// ---cut---
import { preprocess } from 'svelte/compiler';
import MagicString from 'magic-string';
import sass from 'sass';
import { dirname } from 'path';

const { code } = await preprocess(
	source,
	{
		name: 'my-fancy-preprocessor',
		markup: ({ content, filename }) => {
			// Return code as is when no foo string present
			const pos = content.indexOf('foo');
			if (pos < 0) {
				return;
			}

			// Replace foo with bar using MagicString which provides
			// a source map along with the changed code
			const s = new MagicString(content, { filename });
			s.overwrite(pos, pos + 3, 'bar', { storeName: true });

			return {
				code: s.toString(),
				map: s.generateMap({ hires: true, file: filename })
			};
		},
		style: async ({ content, attributes, filename }) => {
			// only process <style lang="sass">
			if (attributes.lang !== 'sass') return;

			const { css, stats } = await new Promise((resolve, reject) =>
				sass.render(
					{
						file: filename,
						data: content,
						includePaths: [dirname(filename)]
					},
					(err, result) => {
						if (err) reject(err);
						else resolve(result);
					}
				)
			);

			// remove lang attribute from style tag
			delete attributes.lang;

			return {
				code: css.toString(),
				dependencies: stats.includedFiles,
				attributes
			};
		}
	},
	{
		filename: 'App.svelte'
	}
);
```

複数のプリプロセッサを併用することができます。最初のプリプロセッサの出力は、2番目のプリプロセッサへの入力になります。プリプロセッサの中では、最初に `markup` 関数が実行され、次に `script`、そして `style` が実行されます。

> Svelte 3 では、すべての `markup` 関数がまず実行され、それからすべての `script`、そしてすべての `style` が実行されていました。この順番は、Svelte 4 で変更されました。

```js
// @errors: 2322
// @filename: ambient.d.ts
declare global {
	var source: string;
}

export {};

// @filename: main.ts
// ---cut---
import { preprocess } from 'svelte/compiler';

const { code } = await preprocess(source, [
	{
		name: 'first preprocessor',
		markup: () => {
			console.log('this runs first');
		},
		script: () => {
			console.log('this runs second');
		},
		style: () => {
			console.log('this runs third');
		}
	},
	{
		name: 'second preprocessor',
		markup: () => {
			console.log('this runs fourth');
		},
		script: () => {
			console.log('this runs fifth');
		},
		style: () => {
			console.log('this runs sixth');
		}
	}
], {
	filename: 'App.svelte'
});
```

## walk

> EXPORT_SNIPPET: svelte/compiler#walk

`walk` 関数はパーサーによって生成された抽象構文木(abstract syntax trees)をウォークする方法を提供します。コンパイラの組み込みの [estree-walker](https://github.com/Rich-Harris/estree-walker) のインスタンスを使用します。

walker は、walk する抽象構文木と、オプションの2つのメソッド `enter` と `leave` を持つオブジェクトを受け取ります。各ノードに対して、(存在すれば) `enter` が呼び出されます。そして `enter` を実行している間に `this.skip()` が呼ばれない限り、それぞれの子を巡回し、それからノード上で `leave` が呼ばれます。

```js
// @filename: ambient.d.ts
declare global {
	var ast: import('estree').Node;
	function do_something(node: import('estree').Node): void;
	function do_something_else(node: import('estree').Node): void;
	function should_skip_children(node: import('estree').Node): boolean;
}

export {};

// @filename: main.ts
// @errors: 7006
// ---cut---
import { walk } from 'svelte/compiler';

walk(ast, {
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

## VERSION

> EXPORT_SNIPPET: svelte/compiler#VERSION

package.json に設定されている現在のバージョンです。

```js
import { VERSION } from 'svelte/compiler';
console.log(`running svelte version ${VERSION}`);
```

## Types

> TYPES: svelte/compiler
