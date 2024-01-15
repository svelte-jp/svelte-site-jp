---
title: TypeScript
---

Svelte コンポーネント内では TypeScript が使用できます。[Svelte VSCode extension](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) などの IDE の拡張機能を使用すると、エディター上でエラーをすぐに見つけやすくなります。また、[`svelte-check`](https://www.npmjs.com/package/svelte-check) は同じことをコマンドライン上で実行できるため、CI と統合できます。

## セットアップ <!--setup-->

Svelte コンポーネント内で TypeScript を使用するには、TypeScript を JavaScript に変換するプリプロセッサーを追加する必要があります。

### SvelteKit または Vite を使用する <!--using-sveltekit-or-vite-->

TypeScript を使い始めるのに最も簡単な方法は、`npm create svelte@latest` とタイプして、新しい SvelteKit プロジェクトを scaffold し、プロンプトに従って TypeScript オプションを選択することです。

```ts
/// file: svelte.config.js
// @noErrors
import { vitePreprocess } from '@sveltejs/kit/vite';

const config = {
	preprocess: vitePreprocess()
};

export default config;
```

SvelteKit が提供するすべての機能が必要ではない場合は、`npm create vite@latest` とタイプして `svelte-ts` オプションを選ぶことで、Svelte 向けの Vite プロジェクトを scaffold できます。

```ts
/// file: svelte.config.js
// @filename: ambient.d.ts
declare module '@sveltejs/vite-plugin-svelte' {
	import { ResolvedConfig } from 'vite';
	import { InlineConfig } from 'vite/dist/node/config';

	export interface VitePreprocessOptions {
		script?: boolean;
		style?: boolean | InlineConfig | ResolvedConfig;
	}

	export function vitePreprocess(
		options?: VitePreprocessOptions
	): import('svelte/compiler').PreprocessorGroup;
}

// @filename: index.ts
// ---cut---
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess()
};

export default config;
```

いずれの場合でも、`vitePreprocess` を使用した `svelte.config.js` が追加されます。Vite/SvelteKit はこの設定ファイルを読み込みます。

### その他のビルドツール <!--other-build-tools-->

代わりに Rollup や Webpack のようなツールを使用している場合、ツール向けの Svelte プラグインをインストールしてください。Rollup の場合は [rollup-plugin-svelte](https://github.com/sveltejs/rollup-plugin-svelte)、Webpack の場合は[svelte-loader](https://github.com/sveltejs/svelte-loader) です。どちらの場合も、`typescript` と `svelte-preprocess` をインストールして、プリプロセッサーをプラグインの設定に追加する必要があります（より詳しい情報については、それぞれのREADMEを確認してください）。新しいプロジェクトを開始する場合には、[rollup](https://github.com/sveltejs/template) や [webpack](https://github.com/sveltejs/template-webpack) のテンプレートを使ってスクリプトからセットアップを scaffold することもできます。

> 新しいプロジェクトを開始する場合は、代わりに SvelteKit または Vite を使うことをおすすめします。

## `<script lang="ts">`

Svelte コンポーネント内で TypeScript を使うには、`lang="ts"` を `script` タグに追加します。

```svelte
<script lang="ts">
	let name: string = 'world';

	function greet(name: string) {
		alert(`Hello, ${name}!`);
	}
</script>
```

### Props

Props は、`export let` 文に直接型付けできます。

```svelte
<script lang="ts">
	export let name: string;
</script>
```

### Slots

Slot と slot prop の型は、渡された slot props の型から推論されます。

```svelte
<script lang="ts">
	export let name: string;
</script>

<slot {name} />

<!-- Later -->
<Comp let:name>
	<!--    ^ string として推論される -->
	{name}
</Comp>
```

### Events

Event は `createEventDispatcher` を使って型付けできます。

```svelte
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		event: null; // payload を受け付けない
		click: string; // 必須の string の payload を持つ
		type: string | null; // オプションの string payload を持つ
	}>();

	function handleClick() {
		dispatch('event');
		dispatch('click', 'hello');
	}

	function handleType() {
		dispatch('event');
		dispatch('type', Math.random() > 0.5 ? 'world' : null);
	}
</script>

<button on:click={handleClick} on:keydown={handleType}>Click</button>
```

## ビルトインのDOM型を拡張する <!--enhancing-built-in-dom-types-->

Svelte はベストエフォートで存在する全ての HTML DOM の型を提供します。ときには実験的な属性やアクションから来るカスタムイベントを使いたい場合があるかもしれません。そのような場合には、TypeScript が型エラーを発生し、未知の型であると報告します。もし実験的ではない標準の属性やイベントであるなら、Svelte の [HTML 型](https://github.com/sveltejs/svelte/blob/master/packages/svelte/elements.d.ts) から来た型付けの誤りによる可能性があります。その場合、issue や修正の PR を歓迎します。

これがカスタムまたは実験的な属性またはイベントの場合、以下のように型を拡張できます。

```ts
/// file: additional-svelte-typings.d.ts
declare namespace svelteHTML {
	// 要素の拡張
	interface IntrinsicElements {
		'my-custom-element': { someattribute: string; 'on:event': (e: CustomEvent<any>) => void };
	}
	// 属性の拡張
	interface HTMLAttributes<T> {
		// on:beforeinstallprompt を使用したい場合
		'on:beforeinstallprompt'?: (event: any) => any;
		// myCustomAttribute={..} (注意: すべて小文字) を使用したい場合
		mycustomattribute?: any; // 望むなら any をより特定の型に置き換えられます
	}
}
```

そして、`d.ts` ファイルが `tsconfig.json` で参照されるようにします。`"include": ["src/**/*"]` のような設定があり、`d.ts` ファイルが `src` 内にあれば、上手く動作するはずです。変更を反映するためには再読み込みが必要なことがあります。

Svelte バージョン 4.2 / `svelte-check` バージョン 3.5 / VS Code 拡張機能 107.10.0 以降では、以下のように `svelte/elements` モジュールを拡張することでも型を宣言できるようになりました。

```ts
/// file: additional-svelte-typings.d.ts
import { HTMLButtonAttributes } from 'svelte/elements';

declare module 'svelte/elements' {
	export interface SvelteHTMLElements {
		'custom-button': HTMLButtonAttributes;
	}

	// 型を追加する要素へのより細かい制御を可能にする
	export interface HTMLButtonAttributes {
		veryexperimentalattribute?: string;
	}
}

export {}; // これが ambient module ではなく、他の型が拡張される代わりに上書きされることを保証する
```

## 実験的な高度な型付け <!--experimental-advanced-typings-->

特定のインターフェイスを実装するコンポーネントの型付け、明示的に型付けされた slot、ジェネリクスの使用など、より高度なユースケースで TypeScript を最大限に活用するには、いくつかの機能が欠けています。これらの機能は、実験的な高度な型機能を利用することで実現可能です。使用方法に関するより詳しい情報は、[この RFC](https://github.com/dummdidumm/rfcs/blob/ts-typedefs-within-svelte-components/text/ts-typing-props-slots-events.md) を参照してください。

> API は実験的であるため、いつでも変更される可能性があります

## 制限事項 <!--limitations-->

### マークアップ内ではTSは使えない <!--no-ts-in-markup-->

TypeScript はテンプレートのマークアップ内では使えません。たとえば、次のコードは機能しません。

```svelte
<script lang="ts">
	let count = 10;
</script>

<h1>Count as string: {count as string}!</h1> <!-- ❌ 動かない -->
{#if count > 4}
	{@const countString: string = count} <!-- ❌ 動かない -->
	{countString}
{/if}
```

### リアクティブな宣言 <!--reactive-declarations-->

TypeScript を使用したリアクティブな宣言に対しては、変数と同じように型付けすることはできません。たとえば、次のコードは動作しません。

```svelte
<script lang="ts">
	let count = 0;

	$: doubled: number = count * 2; // ❌ 動かない
</script>
```

この位置では無効な構文となるため、`: TYPE` を追加することはできません。その代わり、型の定義を直前の `let` 文に移動できます。

```svelte
<script lang="ts">
	let count = 0;

	let doubled: number;
	$: doubled = count * 2;
</script>
```

## Types

> TYPES: svelte
