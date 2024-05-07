---
title: Svelte 4 migration guide
---

この移行ガイドでは、Svelteバージョン3から4に移行する方法の概要を説明します。各変更の詳細については、リンクされたPRを参照してください。 移行スクリプトを使用して、これらの一部を自動的に移行します: `npx svelte-migrate@latest svelte-4`

あなたがライブラリ作成者の場合は、Svelte4のみをサポートするか、Svelte3もサポートできるかどうかを検討してください。 重大な変更のほとんどは多くの人に影響を与えないので、これは簡単に可能かもしれません。また、`peerDependencies`のバージョン範囲も忘れずに更新してください。

## 最低限必要なバージョン

- Node16以上にアップグレードしてください。それ以前のバージョンはもうサポートされていません。([#8566](https://github.com/sveltejs/svelte/issues/8566))
- SvelteKitを使用している場合、1.20.4以降にアップグレードしてください ([sveltejs/kit#10172](https://github.com/sveltejs/kit/pull/10172))
- SvelteKit を使わずに Vite を使っている場合は、`vite-plugin-svelte`2.4.1以降にアップグレードしてください ([#8516](https://github.com/sveltejs/svelte/issues/8516))
- webpackを使用している場合は、webpack5以降と `svelte-loader`3.1.8以降にアップグレードしてください。それ以前のバージョンはサポートされなくなりました。([#8515](https://github.com/sveltejs/svelte/issues/8515), [198dbcf](https://github.com/sveltejs/svelte/commit/198dbcf))
- Rollupを使用している場合は、`rollup-plugin-svelte`7.1.5以降にアップグレードしてください ([198dbcf](https://github.com/sveltejs/svelte/commit/198dbcf))
- TypeScriptを使用している場合は、TypeScript5以降にアップグレードしてください。それ以下のバージョンでも動作する可能性はありますが、保証はできません。([#8488](https://github.com/sveltejs/svelte/issues/8488))

## バンドラーのブラウザ条件

ブラウザ用のフロントエンドバンドルをビルドするとき、バンドラーは`browser`条件を指定しなければならなくなりました。SvelteKitとViteは自動的にこれを処理します。他のものを使っている場合は、`onMount` のようなライフサイクルのコールバックが呼ばれないことがあるので、モジュールの解決設定を更新する必要があります。

- Rollup の場合は、`@rollup/plugin-node-resolve`プラグインのオプションで`browser: true`を設定することで行います。詳しくは [`rollup-plugin-svelte`](https://github.com/sveltejs/rollup-plugin-svelte/#usage) ドキュメントを参照してください。
- wepback では、`"browser"`を`conditionNames`配列に追加します。また、`alias`を設定している場合は、それを更新する必要があるかもしれない。詳しくは [`svelte-loader`](https://github.com/sveltejs/svelte-loader#usage) のドキュメントを参照してください。

([#8516](https://github.com/sveltejs/svelte/issues/8516))

## CJS関連の出力の削除

Svelteはコンパイラ出力のCommonJS (CJS)フォーマットをサポートしなくなり、`svelte/register`フックとCJSランタイムバージョンも削除されました。CJS出力フォーマットを維持する必要がある場合は、ビルド後のステップでSvelteのESM出力をCJSに変換するバンドラーの使用を検討してください。([#8613](https://github.com/sveltejs/svelte/issues/8613))

## Svelt関数のより厳密な型

`createEventDispatcher`、`Action`、`ActionReturn`、および`onMount`には、より厳密なタイプが追加されました。

- `createEventDispatcher`はペイロードがオプション、必須、または存在しないことを指定できるようになり、それに応じてコールサイトがチェックされます ([#7224](https://github.com/sveltejs/svelte/issues/7224))

```ts
// @errors: 2554 2345
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher<{
	optional: number | null;
	required: string;
	noArgument: null;
}>();

// Svelte バージョン 3:
dispatch('optional');
dispatch('required'); // 詳細引数は省略できます
dispatch('noArgument', 'surprise'); // 詳細な引数を追加することもできます

// TypeScript厳密モードを使用した Svelte バージョン 4:
dispatch('optional');
dispatch('required'); // エラー、引数がありません
dispatch('noArgument', 'surprise'); // エラー、引数を渡すことができません
```

- `Action`と`ActionReturn`のデフォルトのパラメータタイプは `undefined` になりました。移行スクリプトはこれを自動的に移行します ([#7442](https://github.com/sveltejs/svelte/pull/7442))

```diff
-const action: Action = (node, params) => { .. } // 何らかの方法でparamsを使用すると、エラーになります
+const action: Action<HTMLElement, string> = (node, params) => { .. } // paramsはstring型です
```

- 非同期に関数を返した場合、`onMount`は型エラーを表示するようになりました。これは、コールバックが破棄時に呼び出されることを期待しているコードのバグである可能性が高いからです。

```diff
// この変更によって実際のバグが明らかになった例
onMount(
- // onMountに渡される関数が非同期であるため、someCleanup()が呼び出されない
- async () => {
-   const something = await foo();
+ // onMountに渡された関数が同期されているため、someCleanup()が呼び出される。
+ () => {
+  foo().then(something =>  ..
   // ..
   return () => someCleanup();
}
);
```

## Svelteを使用したカスタム要素

Svelteでのカスタム要素の作成が大幅に改善されました。`tag`オプションは廃止され、新しい`customElement`オプションが採用されました：

```diff
-<svelte:options tag="my-component" />
+<svelte:options customElement="my-component" />
```

この変更は、高度なユースケースのための[より詳細な設定](custom-elements-api#component-options)を可能にするために行われました。移行スクリプトは、コードを自動的に調整します。プロパティの更新タイミングも若干変更されました。([#8457](https://github.com/sveltejs/svelte/issues/8457))

## SvelteComponentTypedは非推奨です

`SvelteComponent`がすべての型付け機能を持つようになったため、`SvelteComponentTyped`は非推奨です。すべての`SvelteComponentTyped`インスタンスを`SvelteComponent`に置き換えてください。

```diff
- import { SvelteComponentTyped } from 'svelte';
+ import { SvelteComponent } from 'svelte';

- export class Foo extends SvelteComponentTyped<{ aProp: string }> {}
+ export class Foo extends SvelteComponent<{ aProp: string }> {}
```

以前、コンポーネントのインスタンスタイプとして`SvelteComponent`を使用していた場合、やや不透明なタイプエラーが表示されることがありますが、これは`: typeof SvelteComponent`を`: typeof SvelteComponent<any>`に変更することで解決します。

```diff
<script>
  import ComponentA from './ComponentA.svelte';
  import ComponentB from './ComponentB.svelte';
  import { SvelteComponent } from 'svelte';

-  let component: typeof SvelteComponent;
+  let component: typeof SvelteComponent<any>;

  function choseRandomly() {
    component = Math.random() > 0.5 ? ComponentA : ComponentB;
  }
</script>

<button on:click={choseRandomly}>random</button>
<svelte:element this={component} />
```

移行スクリプトは両方を自動的に実行します。 ([#8512](https://github.com/sveltejs/svelte/issues/8512))

## トランジションはデフォルトでlocalになりました

ページナビゲーションの混乱を防ぐため、トランジションはデフォルトでlocalになりました。"local"とは、ネストされたコントロールフローブロック（`each/if/await/key`）内にあり、直接の親ブロックではなく、その上のブロックが生成/破棄された場合にはトランジションが再生されないことを意味します。次の例では、`slide`のイントロアニメーションは、`success`が`false`から`true`になったときだけ再生されますが、`show`が`false`から`true`になったときは再生されません：

```svelte
{#if show}
	...
	{#if success}
		<p in:slide>Success</p>
	{/each}
{/if}
```

トランジションをグローバルにするには、`|global`モディファイアを追加してください。移行スクリプトは自動的にこれを行います。([#6686](https://github.com/sveltejs/svelte/issues/6686))

## デフォルトのスロットバインディング

デフォルトのスロットバインディングが名前付きスロットに公開されることはなくなりました：

```svelte
<script>
	import Nested from './Nested.svelte';
</script>

<Nested let:count>
	<p>
		count in default slot - is available: {count}
	</p>
	<p slot="bar">
		count in bar slot - is not available: {count}
	</p>
</Nested>
```

例えば、デフォルトのスロットがリストにあって、指定されたスロットがそうでない場合、動作は未定義なので、これはスロットバインディングをより一貫性のあるものにします。([#6049](https://github.com/sveltejs/svelte/issues/6049))

## プリプロセッサ

プリプロセッサの適用順序が変更されました。現在、プリプロセッサはマークアップ、スクリプト、スタイルの順に実行されます。

```js
// @errors: 2304
import { preprocess } from 'svelte/compiler';

const { code } = await preprocess(
	source,
	[
		{
			markup: () => {
				console.log('markup-1');
			},
			script: () => {
				console.log('script-1');
			},
			style: () => {
				console.log('style-1');
			}
		},
		{
			markup: () => {
				console.log('markup-2');
			},
			script: () => {
				console.log('script-2');
			},
			style: () => {
				console.log('style-2');
			}
		}
	],
	{
		filename: 'App.svelte'
	}
);

// Svelte 3 logs:
// markup-1
// markup-2
// script-1
// script-2
// style-1
// style-2

// Svelte 4 logs:
// markup-1
// script-1
// style-1
// markup-2
// script-2
// style-2
```

これは、例えば`MDsveX`を使用している場合に影響する可能性があります。

```diff
preprocess: [
-	vitePreprocess(),
-	mdsvex(mdsvexConfig)
+	mdsvex(mdsvexConfig),
+	vitePreprocess()
]
```

各プリプロセッサにも`name`が必要です。([#8618](https://github.com/sveltejs/svelte/issues/8618))

## 新しいeslintパッケージ

`eslint-plugin-svelte3`は非推奨です。Svelte4ではまだ動くかもしれませんが、保証はしません。新しいパッケージ[eslint-plugin-svelte](https://github.com/sveltejs/eslint-plugin-svelte)に切り替えることをお勧めします。移行方法は[このGithubの投稿](https://github.com/sveltejs/kit/issues/10242#issuecomment-1610798405)を参照してください。あるいは、`npm create svelte@latest`を使って新しいプロジェクトを作成し、eslint (場合によってはTypeScriptも) オプションを選択して、関連ファイルを既存のプロジェクトにコピーすることもできます。

## その他の変更点

- outroing要素に`inert`属性が適用されるようになり、支援技術から見えなくなり、インタラクションを防ぐことができるようになりました。([#8628](https://github.com/sveltejs/svelte/pull/8628))
- ランタイムが`classList.toggle(name, boolean)`を使うようになりました。これらのブラウザをサポートする必要がある場合は、[polyfill](https://github.com/eligrey/classList.js) を使うことを検討してください。([#8629](https://github.com/sveltejs/svelte/issues/8629))
- ランタイムが`CustomEvent`コンストラクタを使用するようになりました。これらのブラウザをサポートする必要がある場合は、[polyfill](https://github.com/theftprevention/event-constructor-polyfill/tree/master) の使用を検討してください。([#8775](https://github.com/sveltejs/svelte/pull/8775))
- `svelte/store`から`StartStopNotifier`インターフェース（`writable`などのcreate関数に渡される）を使ってスクラッチから独自のストアを実装する場合、set関数に加えてupdate関数を渡す必要があります。これはストアを使用している人や、既存のSvelteストアを使用してストアを作成している人には影響しません。([#6750](https://github.com/sveltejs/svelte/issues/6750))
- `derived`に渡されるストアの代わりに、不正な値に対してエラーを投げるようになりました。([#7947](https://github.com/sveltejs/svelte/issues/7947))
- `svelte/internal`の型定義が削除され、パブリックAPIではない内部メソッドの使用を抑制した。これらのほとんどはSvelte5で変更されると思われます。
- DOMノードの削除がバッチ処理されるようになり、順序が若干変更されました。このため、これらの要素で`MutationObserver`を使用している場合、イベントの発生順序に影響を与える可能性があります。 ([#8763](https://github.com/sveltejs/svelte/pull/8763))
- `svelte.JSX`名前空間を使用してグローバルタイピングを拡張していた場合は`svelteHTML`名前空間を使用するように移行する必要があります。同様に`svelte.JSX`名前空間から型定義を使用していた場合は、代わりに`svelte/elements`から型定義を使用するように移行する必要があります。何をすべきかについての詳細は[こちら](https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-getting-deprecation-warnings-for-sveltejsx--i-want-to-migrate-to-the-new-typings)を参照してください。
