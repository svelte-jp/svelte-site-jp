---
title: 'Custom elements API'
---

`customElement: true` コンパイラオプションを使って、Svelte コンポーネントを custom elements (別名 web components) にコンパイルすることもできます。コンポーネントのタグ名は `<svelte:options>` [element](/docs/special-elements#svelte-options) で指定する必要があります。

```svelte
<svelte:options customElement="my-element" />

<!-- Svelte 3 の場合はこうしてください:
<svelte:options tag="my-element" />
-->

<script>
	export let name = 'world';
</script>

<h1>Hello {name}!</h1>
<slot />
```

公開したくない内部コンポーネントのタグ名を省略し、通常の Svelte コンポーネントのように使用することができます。必要に応じて、コンポーネントの使用者が、後から名前を付けることもできます。これを行うには、`customElement` コンパイラオプションを `true` にすると使えるようになる 静的な `element` プロパティを使用します (これには custom element のコンストラクタが含まれています)。

```js
// @noErrors
import MyElement from './MyElement.svelte';

customElements.define('my-element', MyElement.element);
// Svelte 3 の場合はこうしてください:
// customElements.define('my-element', MyElement);
```

一度 custom element が定義(define)されると、それを通常の DOM 要素として使用することができます。

```js
document.body.innerHTML = `
	<my-element>
		<p>This is some slotted content</p>
	</my-element>
`;
```

デフォルトでは、custom elements は `accessors: true` でコンパイルされます。これは、任意の [props](/docs/basic-markup#attributes-and-props) が DOM 要素のプロパティとして公開されることを意味します (また、可能であれば属性として読み書きすることができます)。

これを防ぐには、`<svelte:options>` に `accessors={false}` を追加します。

```js
// @noErrors
const el = document.querySelector('my-element');

// get the current value of the 'name' prop
console.log(el.name);

// set a new value, updating the shadow DOM
el.name = 'everybody';
```

## Component lifecycle

custom elements は、Svelte コンポーネントからラッパーアプローチ(wrapper approach)で作成されます。これはつまり、内部の Svelte コンポーネントは自身が custom element であることを知りません。custom element のラッパー(wrapper)が、そのライフサイクルを適切に処理します。

custom element が作成されるとき、それがラップする Svelte コンポーネントはすぐには作成されません。`connectedCallback` が呼び出されたあとの次の tick で作成されます。custom element が DOM に挿入される前にその custom element に割り当てられたプロパティは一時的に保存され、コンポーネントが作成されるときにセットされるため、その値は失われません。しかし、custom element で export された関数を呼び出す場合は同じようにはいかず、マウントされた後でないと使用することはできません。もしコンポーネントが作成される前に関数を呼び出す必要がある場合は、[`extend` option](#component-options) を使用することで対応できます。

Svelte で書かれた custom element が作成または更新されると、shadow DOM はすぐにではなく次の tick で値を更新します。こうすることで更新をバッチにすることができ、要素を一時的に (しかし同期的に) DOM から切り離すような DOM 移動を行っても、内部コンポーネントのアンマウントにつながることはありません。

内部の Svelte コンポーネントは、`disconnectedCallback` が呼び出されたあとの次の tick で破棄されます。

## Component options

Svelte 4 から、custom element を作る際に、`<svelte:options>` 内のオブジェクトとして `customElement` を定義することで、様々な側面を調整できるようになりました。このオブジェクトには以下のプロパティがあります:

- `tag`: custom element の名前に必須の `tag` プロパティです
- `shadow`: オプションのプロパティで、`"none"` を設定することで shadow root の作成を省略します。こうするとスタイルがカプセル化されなくなり、slots が使用できなくなります
- `props`: オプションのプロパティで、コンポーネントのプロパティの詳細や動作を変更することができます。以下の設定をすることができます:
  - `attribute: string`: custom element の prop を更新するには、2つの方法があります: 上記で説明したように、custom element の参照にプロパティを設定するか、HTML 属性を使用するか、です。後者の場合、デフォルトの属性名は小文字のプロパティ名です。これを変更するには、`attribute: "<desired name>"` を代入します。
  - `reflect: boolean`: デフォルトでは、更新された prop の値は DOM に反映されません。この動作を有効にするには、`reflect: true` を設定します。
  - `type: 'String' | 'Boolean' | 'Number' | 'Array' | 'Object'`: 属性の値を prop の値に変換してそれを反映させるとき、prop の値はデフォルトで `String` であると仮定されています。これがいつも正しいとは限りません。例えば、数値型の場合、`type: "Number"` と定義します
    全てのプロパティを書く必要はありません、書かなかったプロパティは全て、デフォルトの設定が使用されます。
- `extend`: オプションのプロパティで、引数に関数を取ります。その関数は、Svelte によって生成された custom element class が渡され、custom element class を返す必要があります。custom element のライフサイクルに対して非常に特殊な要件がある場合や、例えばより良い HTML form インテグレーションのために [ElementInternals](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals#examples) を使用するなど、class を拡張したい場合に便利です。

```svelte
<svelte:options
	customElement={{
		tag: 'custom-element',
		shadow: 'none',
		props: {
			name: { reflect: true, type: 'Number', attribute: 'element-index' }
		},
		extend: (customElementConstructor) => {
			// Extend the class so we can let it participate in HTML forms
			return class extends customElementConstructor {
				static formAssociated = true;

				constructor() {
					super();
					this.attachedInternals = this.attachInternals();
				}

				// Add the function here, not below in the component so that
				// it's always available, not just when the inner Svelte component
				// is mounted
				randomIndex() {
					this.elementIndex = Math.random();
				}
			};
		}
	}}
/>

<script>
	export let elementIndex;
	export let attachedInternals;
	// ...
	function check() {
		attachedInternals.checkValidity();
	}
</script>

...
```

## 注意事項と制限 <!--caveats-and-limitations-->

custom elements は、非Svelteアプリで利用されるコンポーネントをパッケージ化するのに便利です。純粋な HTML と JavaScript の同様に、[ほとんどのフレームワーク](https://custom-elements-everywhere.com/) でも動作するからです。しかし、注意すべき重要な違いがいくつかあります。

- スタイルは単なる _scoped_ ではなく _カプセル化(encapsulated)_ されています (`shadow: "none"` に設定していない限り)。つまり、コンポーネントのスタイルではないもの (例えば `global.css` ファイルにあるスタイルや、`:global(...)` 修飾子のスタイルなど)は、custom element には適用されないということです
- スタイルは、別の .css ファイルとして抽出されるのではなく、JavaScript の文字列としてコンポーネントにインライン化されます
- JavaScript が読み込まれるまで shadow DOM は見えないので、custom elements は一般的にサーバーサイドレンダリングには適していません。
- Svelte では、スロットされるコンテンツ (slotted content) は _遅延して(lazily)_ レンダリングされます。DOMでは _先行して(eagerly)_ レンダリングします。言い換えれば、コンポーネントの `<slot>` 要素が `{#if ...}` ブロックの中にあっても、常に作成されます。同様に、`{#each ...}` ブロックの中に `<slot>` 要素を含めても、スロットされるコンテンツが何度もレンダリングされることはありません。
- `let:` ディレクティブは何の効果もありません。なぜなら custom elements には slot を埋め込む側の親コンポーネントにデータを渡す手段がないからです
- 古いブラウザをサポートするにはポリフィル(polyfill)が必要です。
- Svelte の context 機能は、custom element の中の通常の Svelte コンポーネント間では使用できますが、custom elements をまたいで使用することはできません。言い換えると、親の custom element で `setContext` を使用したとしても、子の custom element で `getContext` を使用しても読み取ることはできません。
