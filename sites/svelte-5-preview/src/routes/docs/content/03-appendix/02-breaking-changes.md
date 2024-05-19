---
title: Breaking changes
---

Svelte 5 自体は完全な書き直しですが、ほとんどのコードベースが最小限の作業でアップグレードできるように最善を尽くしています。そうは言っても、アクションが必要となるかもしれない小さな破壊的変更(breaking changes)がいくつかあります。それらをこちらにリストアップします。

## コンポーネントはもう class ではありません <!--components-are-no-longer-classes-->

Svelte 3 と 4 では、コンポーネントは class です。Svelte 5 では、コンポーネントは関数であり、インスタンス化される方法が異なります。手動でコンポーネントをインスタンス化する必要がある場合は、(`svelte` からインポートして) `mount` か `hydrate` を使用してください。SvelteKit を使用していてこれに関するエラーが出た場合は、まず SvelteKit を最新バージョンにアップデートしてください。Svelte 5 のサポートが追加されています。もし SvelteKit 以外で Svelte を使用している場合は、`main.js` ファイル (やこれに該当するもの) を調整する必要があります:

```diff
+ import { mount } from 'svelte';
import App from './App.svelte'

- const app = new App({ target: document.getElementById("app") });
+ const app = mount(App, { target: document.getElementById("app") });

export default app;
```

`mount` と `hydrate` は全く同じ API です。違いは、`hydrate` の場合、Svelte のサーバーレンダリング HTML をそのターゲットに取り込み、ハイドレーションを行うという点です。どちらも、コンポーネントの export と、場合によっては property accessor (`accesors: true` でコンパイルした場合) を含むオブジェクトを返します。クラスコンポーネントではおなじみの `$on`、`$set`、`$destroy` メソッドはありません。以下はその代替となるものです:

`$on` の場合、イベントをリッスンする代わりに、オプション引数の `events` プロパティでイベントを渡します。

```diff
+ import { mount } from 'svelte';
import App from './App.svelte'

- const app = new App({ target: document.getElementById("app") });
- app.$on('event', callback);
+ const app = mount(App, { target: document.getElementById("app"), events: { event: callback } });
```

> `events` の使用は推奨されません — 代わりに、[コールバックを使用してください](https://svelte-5-preview-ja.vercel.app/docs/event-handlers)

`$set` の場合、代わりに `$state` を使用してリアクティブプロパティオブジェクトを作成し、それを操作します。`.js` ファイルや `.ts` ファイルの中でこれを行う場合は、そのファイル名の末尾に `.svelte` を付けます。つまり、`.svelte.js` や `.svelte.ts` というファイル名にするということです。

```diff
+ import { mount } from 'svelte';
import App from './App.svelte'

- const app = new App({ target: document.getElementById("app"), props: { foo: 'bar' } });
- app.$set('event', { foo: 'baz' });
+ const props = $state({ foo: 'bar' });
+ const app = mount(App, { target: document.getElementById("app"), props });
+ props.foo = 'baz';
```

`$destroy` の場合、代わりに `unmount` を使用します。

```diff
+ import { mount, unmount } from 'svelte';
import App from './App.svelte'

- const app = new App({ target: document.getElementById("app"), props: { foo: 'bar' } });
- app.$destroy();
+ const app = mount(App, { target: document.getElementById("app") });
+ unmount(app);
```

暫定的なソリューションとして、`createClassComponent` や `asClassComponent` を (`svelte/legacy` からインポートして) 使用することで、インスタンス化後に Svelte 4と同じ API を使用することもできます。

```diff
+ import { createClassComponent } from 'svelte/legacy';
import App from './App.svelte'

- const app = new App({ target: document.getElementById("app") });
+ const app = createClassComponent({ component: App, target: document.getElementById("app") });

export default app;
```

もしコンポーネントがあなたのコントロール下にない場合は、`legacy.componentApi` コンパイラオプションを使用することで後方互換性を自動的に適用することができます (各コンポーネントごとに若干のオーバーヘッドが追加されることにご注意ください)。こうすると、`bind:this` で取得した全てのコンポーネントインスタンスに `$set` メソッドと `$on` メソッドが追加されます。

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
- `enableSourcemap` オプションが削除されました。ソースマップは常に作成されるようになり、ツールはこれを無視することができます。
- `tag` オプションが削除されました。代わりにコンポーネント内で `<svelte:options customElement="tag-name" />` をお使いください。
- `loopGuardTimeout`、`format`、`sveltePath`、`errorMode`、`varsReport` オプションが削除されました

## `children` prop が予約語に <!--children-prop-is-reserved-->

コンポーネントタグ内のコンテンツは `children` という [snippet prop](/docs/snippets) になります。`children` という名前で別の prop を持つことはできません。

## runes モードにおける破壊的変更 <!--breaking-changes-in-runes-mode-->

コンポーネントが runes モードになったときにのみ適用される破壊的変更がいくつかあります。

### コンポーネントの exports へのバインディングができなくなりました <!--bindings-to-component-exports-are-not-allowed-->

runes モードのコンポーネントの exports を直接バインドすることはできません。例えば、コンポーネント `A` に  `export const foo = ...` があるとして、`<A bind:foo />` はエラーとなります。代わりに `bind:this` を使用し (`<A bind:this={a} />`)、`a.foo` というように export にアクセスします。この変更により、props と exports の明確な分離が矯正されるため、物事が推論しやすくなります。

### バインディングには `$bindable()` を使用して明示的に定義します <!--bindings-need-to-be-explicitly-defined-using-$bindable-->

Svelte 4 の構文では、(`export let` で宣言された) 全てのプロパティは `bind:` でバインド可能です。runes モードの場合、デフォルトではプロパティはバインドすることができません。バインド可能な props を示すには [`$bindable`](/docs/runes#$bindable) rune を使用します。

### `accessors` オプションは無視されます <!--accessors-option-is-ignored-->

`accessors` オプションを `true` にすると、コンポーネントのインスタンス上でそのコンポーネントのプロパティに直接アクセスできるようになります。runes モードでは、コンポーネントのインスタンス上で直接プロパティにアクセスすることはできません。プロパティを公開する必要がある場合は、代わりにコンポーネントの exports を使用します。

### `immutable` オプションは無視されるようになりました <!--immutable-option-is-ignored-->

`immutable` オプションを設定しても rune モードでは効果がない。このコンセプトは、`$state` とそのバリエーションの動作・仕組みによって置き換えられています。

### Class は "自動リアクティブ(auto-reactive)" ではなくなりました <!--classes-are-no-longer-auto-reactive-->

Svelte 4 では、以下のようにするとリアクティビティがトリガーされました:

```svelte
<script>
	let foo = new Foo();
</script>

<button on:click={() => (foo.value = 1)}>{foo.value}</button
>
```

これは、Svelte コンパイラが `foo.value` への代入を、`foo` を参照するものを更新する命令として扱ったからです。Svelte 5 では、リアクティビティはコンパイル時ではなく実行時に決定されるため、`Foo` class 上で `value` をリアクティブな `$state` フィールドとして定義する必要があります。`new Foo()` を `$state(...)` でラップしても効果はありません。バニラオブジェクトと配列(vanilla objects and arrays)だけが、ディープなリアクティブになります。

## その他の破壊的変更 <!--other-breaking-changes-->

### `@const` 代入に対するより厳格なバリデーション <!--stricter-const-assignment-validation-->

`@const` 宣言の分割された部分への代入は許可されなくなります。今まで可能だったのは誤りでした。

### CSS の `:global` セレクタ に対する、より厳格なバリデーション <!--stricter-css-global-selector-validation-->

以前までは、全称セレクタまたは要素型セレクタを持つ global 修飾子で始まる複合セレクタ (例: `:global(span).foo`) は有効でした。Svelte 5 では、バリデーションエラーとなります。なぜなら、このセレクタによって出力される CSS は、`:global` がないものと同等になるからです。言い換えると、この場合の `:global` は無視されます。

### CSS hash の位置は保証されません <!--css-hash-position-no-longer-deterministic-->

以前までの Svelte では、CSS hash は常に最後に挿入されていました。Svelte 5 ではこれは保証されません。これにより、[非常に奇妙な css セレクタ](https://stackoverflow.com/questions/15670631/does-the-order-of-classes-listed-on-an-item-affect-the-css)を持っている場合にのみ壊れます。

### Scoped CSS で :where(...) が使用されます <!--scoped-css-uses-where-->

詳細度の予期せぬ変更によって引き起こされる問題を避けるため、scoped CSS セレクタは、`.svelte-xyz123` (`xyz123` の部分は、以前と同様 `<style>` コンテンツのハッシュです) と一緒に `:where(.svelte-xyz123)` セレクタ修飾子を使用するようになりました。詳しくは[こちら](https://github.com/sveltejs/svelte/pull/10443) をお読みください。

`:where` を実装していない古いブラウザをサポートする必要がある場合は、処理された CSS を手動で変更することができます (その代償として、詳細度の予期せぬ変更が発生する可能性があります:

```js
// @errors: 2552
css = css.replace(/:where\((.+?)\)/, '$1');
```

### エラー/警告のコードのリネーム <!--error-warning-codes-have-been-renamed-->

エラーと警告のコードがリネームされました。以前は単語を区切るのにダッシュを使用していましたが、現在はアンダースコアを使用しています (例: foo-bar が foo_bar になりました)。加えて、若干のコードが少し言い換えられました。

### 名前空間(namespaces)の数が削減 <!--reduced-number-of-namespaces-->

コンパイラオプション `namespace` に渡せる有効な名前空間(namespaces)の数が、`html` (デフォルト)、`mathml`、`svg`、`foreign` に削減されました。

### beforeUpdate/afterUpdate の変更 <!--beforeupdate-afterupdate-changes-->

`beforeUpdate` は、テンプレートで差参照されている変数を変更する場合において、最初のレンダリングの際に2回実行されることがなくなりました。

親コンポーネントの `afterUpdate` コールバックは、子コンポーネントの `afterUpdate` コールバックのあとに実行されるようになりました。

Both functions are disallowed in runes mode — use `$effect.pre(...)` and `$effect(...)` instead.
どちらの関数も runes モードでは使用できません。代わりに、`$effect.pre(...)` と `$effect(...)` を使用してください。

### `contenteditable` の動作の変更 <!--contenteditable-behavior-change-->

`contenteditable` ノードとそれに対応するバインディングがあり、その中にリアクティブな値がある場合 (例: `<div contenteditable=true bind:textContent>count is {count}</div>`)、`count` が更新されても contenteditable の中にある値は更新されません。なぜなら、バインディングは即座にそのコンテンツを完全にコントロールし、それを通してのみ更新されるべきだからです。

### `oneventname` 属性は文字列の値を受け取れなくなりました <!--oneventname-attributes-no-longer-accept-string-values-->

Svelte 4 では、HTML の要素のイベント属性を文字列で指定することができました:

```svelte
<button onclick="alert('hello')">...</button>
```

これは推奨されませんし、Svelte 5 では行えなくなりました。Svelte 5 では、[イベントハンドラ](/docs/event-handlers) を追加するメカニズムとして、`onclick` が `on:click` に取って代わります。

### `null` と `undefined` は空文字列 (empty string) になりました <!--null-and-undefined-become-the-empty-string-->

Svelte 4では、`null` と `undefined` をプリント出力したときに、それぞれ `null` と `undefined` という文字列が出力されていました。しかしほとんどのケースの場合、例えば100回のうち99回は、空文字列 (empty string) になっていてほしいと思います (他のほとんどのフレームワークがそうしているように)。そのため、Svelte 5では、`null` と `undefined` は空文字列になります。

### `bind:files` の値は `null`、`undefined`、`FileList` のいずれかにする必要があります <!--bind-files-values-can-only-be-null-undefined-or-filelist-->

`bind:files` は双方向バインディングになりました。例えば値をセットするときには、その値は falsy (`null` や `undefined`) か、`FileList` 型にする必要があります。

### バインディングはフォームのリセットに対しリアクティブになりました <!--bindings-now-react-to-form-resets-->

以前は、バインディングはフォームの `reset` イベントを考慮していなかったため、その値は DOM と同期されませんでした。Svelte 5では、document に `reset` リスナーを置き、必要に応じてバインディングを呼び出すことでこれを修正しました。

### `walk` が export されなくなりました <!--walk-not-longer-exported-->

`svelte/compiler` はこれまで便宜的に `estree-walker` から `walk` を再 export していましたが、Svelte 5では不要となったため、もし必要な場合は直接 import してください。

### `svelte:options` の内側にコンテンツを置くことは禁止されました <!--content-inside-svelte-options-is-forbidden-->

Svelte 4 では、`<svelte:options />` タグの内側にコンテンツを置くことができました。無視されますが、そこになにかを書くことはできました。Svelte 5 では、このタグの内側のコンテンツはコンパイルエラーとなります。

### declarative shadow roots の `<slot>` 要素はそのまま保持されます <!--slot-elements-in-declarative-shadow-roots-are-preserved-->

Svelte 4 では、どんな場所にある `<slot />` タグでも独自のバージョンの slot に置き換えられました。Svelte 5 では`<template shadowrootmode="...">` 要素の子である場合、そのまま保持されます。

### `<svelte:element>` タグは式でなければいけません <!--svelte-element-tag-must-be-an-expression-->

Svelte 4では、`<svelte:element this="div">` は有効なコードです。しかし、これはあまり意味がありません。単に`<div>`とすべきです。まれに、何らかの理由でリテラル値を使用する必要がある場合は、このようにすることができます：

```diff
- <svelte:element this="div">
+ <svelte:element this={"div"}>
```

Svelte 4では、例えば `<svelte:element this="input">` を `<input>` と同じように扱い、どの `bind:` ディレクティブが適用されるかを決定していましたが、Svelte 5ではそうではないことに注意してください。
