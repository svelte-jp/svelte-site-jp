---
title: Breaking changes
---

Svelte 5 自体は完全な書き直しですが、ほとんどのコードベースが最小限の作業でアップグレードできるように最善を尽くしています。そうは言っても、アクションが必要となるかもしれない小さな破壊的変更(breaking changes)がいくつかあります。それらをこちらにリストアップします。

## コンポーネントはもう class ではありません <!--components-are-no-longer-classes-->

Svelte 3 と 4 では、コンポーネントは class です。Svelte 5 では、コンポーネントは関数であり、インスタンス化される方法が異なります。手動でコンポーネントをインスタンス化する必要がある場合は、(`svelte` からインポートして) `mount` か `createRoot` を使用してください。SvelteKit を使用していてこれに関するエラーが出た場合は、まず SvelteKit を最新バージョンにアップデートしてください。Svelte 5 のサポートが追加されています。もし SvelteKit 以外で Svelte を使用している場合は、`main.js` ファイル (やこれに該当するもの) を調整する必要があります:

```diff
+ import { createRoot } from 'svelte';
import App from './App.svelte'

- const app = new App({ target: document.getElementById("app") });
+ const app = createRoot(App, { target: document.getElementById("app") });

export default app;
```

`createRoot` は、`$set` メソッドと `$destroy` メソッドを持つオブジェクトを返します。class コンポーネント API にはあった `$on` メソッドはありません。代わりに、オプションの引数の `events` プロパティを介して渡します。コンポーネントのインスタンスを作成した後にそのインスタンスとやり取りする必要がない場合は、代わりに `mount` を使用することで、バイト数を節約することができます。

> `events` の使用は推奨されません — 代わりに、[コールバックを使用してください](https://svelte-5-preview-ja.vercel.app/docs/event-handlers)

暫定的なソリューションとしては、インスタンス化に同じ API を使えるようにする方法として (`svelte/legacy` からインポートして) `createClassComponent` や `asClassComponent` を使用することもできます。もしコンポーネントがあなたのコントロール下にない場合は、`legacy.componentApi` コンパイラオプションを使用することで後方互換性を自動的に適用することができます (各コンポーネントに若干のオーバーヘッドが追加されることにご注意ください)。

### Server API の変更 <!--server-api-changes-->

同様に、コンポーネントがサーバーサイドレンダリングようにコンパイルされた場合は `render` メソッドがありません。代わりに、`svelte/server` から `render` をインポートし、コンポーネント関数を渡します:

```diff
+ import { render } from 'svelte/server';
import App from './App.svelte';

- const { html, head } = App.render({ message: 'hello' });
+ const { html, head } = render(App, { props: { message: 'hello' } });
```

`render` は CSS を返さなくなりました; そのため、CSS ファイルとは別でサーブする必要があります。

### bind:this の変更 <!--bind-this-changes-->

コンポーネントが class ではなくなったため、`bind:this` はもう `$set`、`$on`、`$destroy` メソッドを持つ class インスタンスを返しません。インスタンスのエクスポート (`export function/const`) だけを返します。`accessors` オプションを使用している場合は、各プロパティごとの getter/setter のペアも返します。

## ホワイトスペースの取り扱いの変更 <!--whitespace-handling-changed-->

以前までの Svelte では、ホワイトスペースを残すかどうか判断するのにとても複雑なアルゴリズムを採用していました。Svelte 5 では、開発者にとってより推測しやすいようにシンプルにしました。ルールは以下の通りです:

- ノード間のホワイトスペースは単一のホワイトスペースに折りたたまれます
- タグの最初と最後にあるホワイトスペースは完全に削除されます
- `pre` タグの中のホワイトスペースはそのまま保持される、などの例外があります

以前と同様に、コンパイラの設定で `preserveWhitespace` オプションを設定するか、コンポーネントごとに `<svelte:options>` を設定することで、ホワイトスペースのトリムを無効化することができます。

## より新しいブラウザが必要 <!--more-recent-browser-required-->

Svelte では、`bind:clientWidth/clientHeight/offsetWidth/offsetHeight` で要素の寸法を計測するのに、IFrame ではなく Mutation Observer を使用するようになりました。また、range input で `change` イベントをリスンしなくなりました。最後に、`legacy` オプションは削除されました (というより、別の設定をするものになりました)。

## コンパイラオプションの変更 <!--changes-to-compiler-options-->

- `css` オプションから、`false`/`true` (以前から非推奨) と、`"none"` が削除されました
- `legacy` オプションは別の目的に使用されるようになりました
- `hydratable` オプションが削除されました。Svelte コンポーネントは常にハイドレーション可能(hydratable)です
- `tag` オプションが削除されました。代わりにコンポーネント内で `<svelte:options customElement="tag-name" />` をお使いください。
- `loopGuardTimeout`、`format`、`sveltePath`、`errorMode`、`varsReport` オプションが削除されました

## `children` prop が予約語に <!--children-prop-is-reserved-->

コンポーネントタグ内のコンテンツは `children` という [snippet prop](/docs/snippets) になります。`children` という名前で別の prop を持つことはできません。

## その他の破壊的変更 <!--other-breaking-changes-->

### `@const` 代入に対するより厳格なバリデーション <!--stricter-const-assignment-validation-->

`@const` 宣言の分割された部分への代入は許可されなくなります。今まで可能だったのは誤りでした。

### CSS の `:global` セレクタ に対するより厳格なバリデーション <!--stricter-css-global-selector-validation-->

以前までは、`.foo :global(bar).baz` のようなセレクタは有効でした。Svelte 5 では、バリデーションエラーとなります。なぜなら、このセレクタによって出力される CSS は、`:global` がないものと同等になるからです。言い換えると、この場合の `:global` は無視されます。

### CSS hash の位置は保証されません <!--css-hash-position-no-longer-deterministic-->

以前までの Svelte では、CSS hash は常に最後に挿入されていました。Svelte 5 ではこれは保証されません。これにより、[非常に奇妙な css セレクタ](https://stackoverflow.com/questions/15670631/does-the-order-of-classes-listed-on-an-item-affect-the-css)を持っている場合にのみ壊れます。

### 各エラー/警告のコードのリネーム <!--renames-of-various-error-warning-codes-->

各エラーや警告のコードの名称が少し変更されました。

### 名前空間(namespaces)の数が削減 <!--reduced-number-of-namespaces-->

コンパイラオプション `namespace` に渡せる有効な名前空間(namespaces)の数が、`html` (デフォルト)、`svg`、`foreign` に削減されました。

### beforeUpdate の変更 <!--beforeupdate-change-->

`beforeUpdate` は、テンプレートで差参照されている変数を変更する場合において、最初のレンダリングの際に2回実行されることがなくなりました。

### `contenteditable` の動作の変更 <!--contenteditable-behavior-change-->

`contenteditable` ノードとそれに対応するバインディングがあり、その中にリアクティブな値がある場合 (例: `<div contenteditable=true bind:textContent>count is {count}</div>`)、`count` が更新されても contenteditable の中にある値は更新されません。なぜなら、バインディングは即座にそのコンテンツを完全にコントロールし、それを通してのみ更新されるべきだからです。

### `oneventname` 属性は文字列の値を受け取れなくなりました <!--oneventname-attributes-no-longer-accept-string-values-->

Svelte 4 では、HTML の要素のイベント属性を文字列で指定することができました:

```svelte
<button onclick="alert('hello')">...</button>
```

これは推奨されませんし、Svelte 5 では行えなくなりました。Svelte 5 では、[イベントハンドラ](/docs/event-handlers) を追加するメカニズムとして、`onclick` が `on:click` に取って代わります。
