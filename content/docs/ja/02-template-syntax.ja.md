---
title: Template syntax
---


### Tags

---

`<div>` のような小文字のタグは、通常の HTML 要素を表します。大文字のタグ、例えば `<Widget>` や `<Namespace.Widget>` は *コンポーネント* を表します。

```sv
<script>
	import Widget from './Widget.svelte';
</script>

<div>
	<Widget/>
</div>
```


### Attributes and props

---

デフォルトでは、属性はHTMLと全く同じように動作します。

```sv
<div class="foo">
	<button disabled>can't touch this</button>
</div>
```

---

HTMLのように、値は引用符で囲まれていない場合があります。

```sv
<input type=checkbox>
```

---

属性値には JavaScript の式を含めることができます。

```sv
<a href="page/{p}">page {p}</a>
```

---

あるいは、JavaScript の式にすることもできます。

```sv
<button disabled={!clickable}>...</button>
```

---

Boolean の属性は、その値が [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) であれば要素に含まれ、[falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) であれば除外されます。

それ以外の属性は、その値が [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish) (`null` または `undefined`) でない限り含まれます。

```html
<input required={false} placeholder="This input field is not required">
<div title={null}>This div has no title attribute</div>
```

---

式には、通常の HTML ではシンタックスハイライトに失敗するような文字が含まれている可能性があるので、値を引用符で囲むことが許可されています。引用符は値の解析方法には影響しません。

```sv
<button disabled="{number !== 42}">...</button>
```

---

属性名と値が一致する場合(`name={name}`)は、`{name}`で置き換えることができます。

```sv
<!-- These are equivalent -->
<button disabled={disabled}>...</button>
<button {disabled}>...</button>
```

---

慣習として、コンポーネントに渡される値は DOM の機能である *属性* ではなく、*プロパティ* または *props* と呼ばれます。

要素の場合と同様に、`name={name}` は `{name}` の短縮形に置き換えることができます。

```sv
<Widget foo={bar} answer={42} text="hello"/>
```

---

*スプレッド属性* は、多くの属性やプロパティを一度に要素やコンポーネントに渡すことを可能にします。

要素またはコンポーネントは、通常のものと混在させて、複数のスプレッド属性を持つことができます。

```sv
<Widget {...things}/>
```

---

*`$$props`* は、`export` で宣言されていないものも含めて、コンポーネントに渡されるすべての props を参照します。これは Svelte の最適化が難しいので、一般的には推奨されません。しかし、コンパイル時にどのような props がコンポーネントに渡されるかわからない場合など、稀なケースでは便利です。

```sv
<Widget {...$$props}/>
```

---

*`$$restProps`* には、`export` で宣言されて *いない* props のみが含まれます。これは他の未知の属性をコンポーネントの要素に渡すために使用できます。 *`$$props`* と同じ最適化の問題を共有しており、同様に推奨されません。

```html
<input {...$$restProps}>
```


> `input` 要素やその子要素である `option` 要素の `value` 属性は、`bind:group` や `bind:checked` を使用している場合、スプレッド属性で設定してはいけません。このような場合、バインドされる変数にリンクできるように、Svelteがその要素の`value`をマークアップの中で直接見ることができる必要があります。

---

### Text expressions

```sv
{expression}
```

---

テキストにもJavaScriptの式を含めることができます。

```sv
<h1>Hello {name}!</h1>
<p>{a} + {b} = {a + b}.</p>
```


### Comments

---

コンポーネント内でHTMLコメントを使用することができます。

```sv
<!-- this is a comment! -->
<h1>Hello world</h1>
```

---

`svelte-ignore` で始まるコメントは、マークアップの次のブロックに対する警告を無効にします。通常、これらはアクセシビリティの警告です。正当な理由で警告を無効にしていることを確認してください。

```sv
<!-- svelte-ignore a11y-autofocus -->
<input bind:value={name} autofocus>
```


### {#if ...}

```sv
{#if 式}...{/if}
```
```sv
{#if 式}...{:else if 式}...{/if}
```
```sv
{#if 式}...{:else}...{/if}
```

---

条件付きでレンダリングされるコンテンツは、if ブロックで囲むことができます。

```sv
{#if answer === 42}
	<p>what was the question?</p>
{/if}
```

---

追加の条件は `{:else if 式}` で付け足すことができ、`{:else}` 句で終わらせることもできます。

```sv
{#if porridge.temperature > 100}
	<p>too hot!</p>
{:else if 80 > porridge.temperature}
	<p>too cold!</p>
{:else}
	<p>just right!</p>
{/if}
```


### {#each ...}

```sv
{#each 式 as name}...{/each}
```
```sv
{#each 式 as name, index}...{/each}
```
```sv
{#each 式 as name (key)}...{/each}
```
```sv
{#each 式 as name, index (key)}...{/each}
```
```sv
{#each 式 as name}...{:else}...{/each}
```

---

each ブロックで値のリストの反復処理ができます。

```sv
<h1>Shopping list</h1>
<ul>
	{#each items as item}
		<li>{item.name} x {item.qty}</li>
	{/each}
</ul>
```

配列や配列のような値（つまり `length` プロパティを持つオブジェクト）を反復処理するのに each ブロックを使用できます。

---

each ブロックは `array.map(...)` のコールバックの第2数に相当する*インデックス*を指定することもできます。

```sv
{#each items as item, i}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

---

*key* の式（各リストアイテムを一意に識別できる必要があります）が与えられた場合、Svelte は、データが変化したときに（末尾にアイテムを追加したり削除するのではなく）キーを使用してリストの差分を取ります。key はどんなオブジェクトでもよいですが、そのオブジェクト自体が変更されたときに同一性を維持できるため、文字列か数値をお勧めします。

```sv
{#each items as item (item.id)}
	<li>{item.name} x {item.qty}</li>
{/each}

<!-- もしくはインデックスを追加 -->
{#each items as item, i (item.id)}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

---

each ブロックでは分割代入や残余構文のパターンを自由に使えます。

```sv
{#each items as { id, name, qty }, i (id)}
	<li>{i + 1}: {name} x {qty}</li>
{/each}

{#each objects as { id, ...rest }}
	<li><span>{id}</span><MyComponent {...rest}/></li>
{/each}

{#each items as [id, ...rest]}
	<li><span>{id}</span><MyComponent values={rest}/></li>
{/each}
```

---

each ブロックには `{:else}` 句を入れることもできます。これはリストが空の場合にレンダリングされます。

```sv
{#each todos as todo}
	<p>{todo.text}</p>
{:else}
	<p>No tasks today!</p>
{/each}
```


### {#await ...}

```sv
{#await 式}...{:then name}...{:catch name}...{/await}
```
```sv
{#await 式}...{:then name}...{/await}
```
```sv
{#await 式 then name}...{/await}
```
```sv
{#await 式 catch name}...{/await}
```

---

await ブロックを使用すると、Promise が取りうる 3 つの状態（保留中、成功、失敗）に分岐できます。

```sv
{#await promise}
	<!-- promise が保留中 -->
	<p>waiting for the promise to resolve...</p>
{:then value}
	<!-- promise が成功した -->
	<p>The value is {value}</p>
{:catch error}
	<!-- promise が失敗した -->
	<p>Something went wrong: {error.message}</p>
{/await}
```

---

promise が失敗した時に何もレンダリングする必要がない場合（もしくはエラーが発生しない場合）は `catch` ブロックを省略できます。

```sv
{#await promise}
	<!-- promise が保留中 -->
	<p>waiting for the promise to resolve...</p>
{:then value}
	<!-- promise が成功した -->
	<p>The value is {value}</p>
{/await}
```

---

保留中の状態を気にしない場合は、最初のブロックを省略することもできます。

```sv
{#await promise then value}
	<p>The value is {value}</p>
{/await}
```

---

逆にエラー状態のみを表示したい場合は `then` ブロックを省略できます。

```sv
{#await promise catch error}
	<p>The error is {error}</p>
{/await}
```

### {#key ...}

```sv
{#key 式}...{/key}
```

key ブロックは式の値が変更されたときに、その中身を破棄して再作成します。

---

これは、ある値が変更されるたびに要素のトランジションを再生したい場合に便利です。

```sv
{#key value}
	<div transition:fade>{value}</div>
{/key}
```

---

コンポーネントを囲んで使用した場合、コンポーネントの再インスタンス化と再初期化をもたらします。

```sv
{#key value}
	<Component />
{/key}
```

### {@html ...}

```sv
{@html 式}
```

---

テキスト式（`{式}` の構文）では、 `<` や `>` のような文字はエスケープされますが、HTML 式ではエスケープされません。

式は単独で正しい HTML になっている必要があります。`{@html "<div>"}content{@html "</div>"}` は `</div>` の部分が正しい HTML ではないため、動作*しません*。

> Svelte は HTML を挿入する前に式をサニタイズしません。データが信頼できないソースからのものである場合は自分でサニタイズする必要があります。そうしないと、ユーザーを XSS の脆弱性にさらしてしまいます。

```sv
<div class="blog-post">
	<h1>{post.title}</h1>
	{@html post.content}
</div>
```


### {@debug ...}

```sv
{@debug}
```
```sv
{@debug 変数1, 変数2, ..., 変数N}
```

---

`{@debug ...}` タグは `console.log(...)` の代わりになります。指定した変数の値が変更されるたびログに出力し、devtools が開いているとコードの実行を一時停止します。

```sv
<script>
	let user = {
		firstname: 'Ada',
		lastname: 'Lovelace'
	};
</script>

{@debug user}

<h1>Hello {user.firstname}!</h1>
```

---

`{@debug ...}` はカンマ区切りの（任意の式ではなく）変数名のリストを受け取ります。

```sv
<!-- コンパイルされる -->
{@debug user}
{@debug user1, user2, user3}

<!-- コンパイルできない -->
{@debug user.firstname}
{@debug myArray[0]}
{@debug !isReady}
{@debug typeof user === 'object'}
```

引数なしの `{@debug}` タグは、（変数を指定した場合とは逆に）状態の*どれか*が変化した時にトリガされる `debugger` 文を挿入します。



### Element directives

要素には、属性と同じように*ディレクティブ*を持たせることができます。これは何らかの方法で要素の動作を制御します。


#### [on:*eventname*](on_element_event)

```sv
on:eventname={handler}
```
```sv
on:eventname|modifiers={handler}
```

---

DOM イベントをリッスンするには `on:` ディレクティブを使用します。

```sv
<script>
	let count = 0;

	function handleClick(event) {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	count: {count}
</button>
```

---

ハンドラはパフォーマンスを低下させることなくインラインで宣言できます。 属性と同様、ディレクティブの値はシンタックスハイライトのために引用符で囲むことができます。

```sv
<button on:click="{() => count += 1}">
	count: {count}
</button>
```

---

`|` の文字を使って DOM イベントに*修飾子*を追加します。

```sv
<form on:submit|preventDefault={handleSubmit}>
	<!-- `submit` イベントの規定の動作が妨げられ
	     ページはリロードされません -->
</form>
```

次の修飾子を使用できます:

* `preventDefault` — ハンドラを実行する前に `event.preventDefault()` を呼び出します
* `stopPropagation` — `event.stopPropagation()` を呼び出し、イベントが次の要素に到達するのを防ぎます
* `passive` — タッチ/ホイールイベントのスクロールパフォーマンスを向上させます（Svelte は追加することが安全な箇所には自動的に追加します）
* `nonpassive` — 明示的に `passive: false` を設定します
* `capture` — *バブリング*フェーズではなく*キャプチャ*フェーズ中にハンドラを実行します
* `once` — ハンドラが最初に実行された後、削除します
* `self` — event.target がその要素自体だった場合のみハンドラをトリガします

修飾子は連鎖させることができます。例 `on:click|once|capture={...}`

---

`on:` ディレクティブが値なしで使用された場合、コンポーネントはイベントを*転送*します。つまりコンポーネントの使用者がイベントをリッスンできます。

```sv
<button on:click>
	コンポーネント自体がクリックイベントを発火します
</button>
```

---

同じイベントに対して複数のイベントリスナを持つことができます。

```sv
<script>
	let counter = 0;
	function increment() {
		counter = counter + 1;
	}

	function track(event) {
		trackEvent(event)
	}
</script>

<button on:click={increment} on:click={track}>Click me!</button>
```

#### [bind:*property*](bind_element_property)

```sv
bind:property={variable}
```

---

データは通常、親から子へと流れていきます。`bind:` ディレクティブにより、データを子から親へと逆方向に流すことができます。ほとんどのバインディングは個々の要素に特有です。

もっともシンプルなバインディングは、`input.value` のようなプロパティの値を示します。

```sv
<input bind:value={name}>
<textarea bind:value={text}></textarea>

<input type="checkbox" bind:checked={yes}>
```

---

名前が値と一致する場合は、省略形を使用できます。

```sv
<!-- These are equivalent -->
<input bind:value={value}>
<input bind:value>
```

---

数値の入力値は強制されます。つまり、DOM に関する限り `input.value` は文字列ですが、Svelte はそれを数値として扱います。入力が empty や 無効な値の場合 (`type="number"` であれば) 値は `undefined` になります。

```sv
<input type="number" bind:value={num}>
<input type="range" bind:value={num}>
```

---

`type="file"` である `<input>` 要素では、[選択ファイルの `FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList) を取得するために `bind:files` を使用できます。

```sv
<label for="avatar">Upload a picture:</label>
<input
	accept="image/png, image/jpeg"
	bind:files
	id="avatar"
	name="avatar"
	type="file"
/>
```


##### Binding `<select>` value

---

`<select>` 値のバインディングは、選択された `<option>` の `value` プロパティに対応しており、(通常の DOM のように文字列だけでなく)どんな値でも設定できます。

```sv
<select bind:value={selected}>
	<option value={a}>a</option>
	<option value={b}>b</option>
	<option value={c}>c</option>
</select>
```

---

`<select multiple>` 要素はチェックボックスのグループと同様の動作になります。

```sv
<select multiple bind:value={fillings}>
	<option value="Rice">Rice</option>
	<option value="Beans">Beans</option>
	<option value="Cheese">Cheese</option>
	<option value="Guac (extra)">Guac (extra)</option>
</select>
```

---

`<option>` の値がテキスト内容と一致する場合、`value` 属性は省略できます。

```sv
<select multiple bind:value={fillings}>
	<option>Rice</option>
	<option>Beans</option>
	<option>Cheese</option>
	<option>Guac (extra)</option>
</select>
```

---

`contenteditable` 属性を持つ要素は `innerHTML` と `textContent` のバインディングをサポートします。

```sv
<div contenteditable="true" bind:innerHTML={html}></div>
```

##### Media element bindings

---

メディア要素 (`<audio>` と `<video>`) には、独自のバインディングのセットがあります -- 6つの *readonly* と...

* `duration` (readonly) — 動画の総再生時間(秒単位)です。
* `buffered` (readonly) —  `{start, end}` オブジェクトの配列です。
* `played` (readonly) — 同上
* `seekable` (readonly) — 同上
* `seeking` (readonly) — Boolean
* `ended` (readonly) — Boolean

...そして5つの *双方向* バインディング。

* `currentTime` — 動画の現在の再生時間、秒単位です。
* `playbackRate` — どれぐらい早く、または遅く動画を再生するか、1 が '通常値' です。
* `paused` — これは自明のはずです。
* `volume` — 0 から 1 の間の値です。
* `muted` — Booleanの値で、`true` はミュートになります。

動画にはさらに、`videoWidth` と `videoHeight` という読み取り専用のバインディングがあります。

```sv
<video
	src={clip}
	bind:duration
	bind:buffered
	bind:played
	bind:seekable
	bind:seeking
	bind:ended
	bind:currentTime
	bind:playbackRate
	bind:paused
	bind:volume
	bind:muted
	bind:videoWidth
	bind:videoHeight
></video>
```

##### Block-level element bindings

---

ブロックレベル要素は、[これ](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/)と同様の手法で測定された4つの読み取り専用バインディングを持っています。

* `clientWidth`
* `clientHeight`
* `offsetWidth`
* `offsetHeight`

```sv
<div
	bind:offsetWidth={width}
	bind:offsetHeight={height}
>
	<Chart {width} {height}/>
</div>
```

#### bind:group

```sv
bind:group={variable}
```

---

グループ化させたい入力には`bind:group`を使用できます。

```sv
<script>
	let tortilla = 'Plain';
	let fillings = [];
</script>

<!-- こちらのグループ化されたラジオinputは相互に排他的です -->
<input type="radio" bind:group={tortilla} value="Plain">
<input type="radio" bind:group={tortilla} value="Whole wheat">
<input type="radio" bind:group={tortilla} value="Spinach">

<!-- こちらのグループ化されたチェックボックスinputは配列にデータを挿入します -->
<input type="checkbox" bind:group={fillings} value="Rice">
<input type="checkbox" bind:group={fillings} value="Beans">
<input type="checkbox" bind:group={fillings} value="Cheese">
<input type="checkbox" bind:group={fillings} value="Guac (extra)">
```

#### [bind:this](bind_element)

```sv
bind:this={dom_node}
```

---

DOM ノードを参照するには `bind:this` を使用します。

```sv
<script>
	import { onMount } from 'svelte';

	let canvasElement;

	onMount(() => {
		const ctx = canvasElement.getContext('2d');
		drawStuff(ctx);
	});
</script>

<canvas bind:this={canvasElement}></canvas>
```


#### class:*name*

```sv
class:name={value}
```
```sv
class:name
```

---

`class:`というディレクティブは要素のクラスを切り替えるための簡単な方法を提供してくれます。

```sv
<!-- この二つは同等です -->
<div class="{active ? 'active' : ''}">...</div>
<div class:active={active}>...</div>

<!-- 名前と値が一致する場合の省略形がこちらです -->
<div class:active>...</div>

<!-- 複数のクラスの切り替えを含めることができます -->
<div class:active class:inactive={!active} class:isAdmin>...</div>
```


#### use:*action*

```sv
use:action
```
```sv
use:action={parameters}
```

```js
action = (node: HTMLElement, parameters: any) => {
	update?: (parameters: any) => void,
	destroy?: () => void
}
```

---

アクションは、要素が作成されたときに呼び出される関数です。要素がアンマウントされたときに呼び出される `destroy` メソッドをもつオブジェクトを返すことができます。

```sv
<script>
	function foo(node) {
		// the node has been mounted in the DOM

		return {
			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<div use:foo></div>
```

---

アクションにはパラメータを含めることができます。戻り値に `update` 関数がある場合、Svelte がマークアップに更新を適用した直後、そのパラメータが変更されるたびに呼び出されます。

> すべてのコンポーネントインスタンスに対して `foo` 関数を再宣言しているという事実について心配する必要はありません。Svelte は、コンポーネント定義からローカル状態に依存しない関数を巻き上げます。

```sv
<script>
	export let bar;

	function foo(node, bar) {
		// the node has been mounted in the DOM

		return {
			update(bar) {
				// the value of `bar` has changed
			},

			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<div use:foo={bar}></div>
```


#### transition:*fn*

```sv
transition:fn
```
```sv
transition:fn={params}
```
```sv
transition:fn|local
```
```sv
transition:fn|local={params}
```


```js
transition = (node: HTMLElement, params: any) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

---

トランジションは、状態変化の結果として DOM に出入りする要素によってトリガーされます。

ブロックがトランジションしているとき、独自のトランジションを持たない要素を含む、ブロック内のすべての要素は、ブロック内のすべてのトランジジョンが完了するまで DOM に保持されます。

`transition:` ディレクティブは *双方向* トランジションを示しており、トランジションが進行している間、円滑に反転させることができることを意味しています。

```sv
{#if visible}
	<div transition:fade>
		fades in and out
	</div>
{/if}
```

> デフォルトでは、イントロトランジションは最初のレンダリングでは再生されません。この動作は、[コンポーネントを作成する](docs#Client-side_component_API) ときに `intro: true` を設定することで変更できます。

##### Transition parameters

---

アクションと同様に、トランジションはパラメータを持つことができます。

(ダブル `{{中括弧}}` は特殊な構文ではありません。これは式タグ内のオブジェクトリテラルです。)

```sv
{#if visible}
	<div transition:fade="{{ duration: 2000 }}">
		flies in, fades out over two seconds
	</div>
{/if}
```

##### Custom transition functions

---

トランジションはカスタム関数を使うことができます。返されたオブジェクトに `css` 関数があれば、Svelte は要素上で再生される CSS アニメーションを作成します。

`css` に渡される `t` 引数は `easing` 関数を適用した後の `0` から `1` の間の値です。 *In* トランジションは `0` から `1` まで、*out* トランジションは `1` から `0` までの間で実行されます。-- 言い換えれば、`1` はトランジションが適用されていないかのような要素の自然な状態です。 引数 `u` は `1 - t` と等しくなります。

この関数はトランジションが始まる *前に* 繰り返し呼び出され、異なる `t` と `u` の引数を持ちます。

```sv
<script>
	import { elasticOut } from 'svelte/easing';

	export let visible;

	function whoosh(node, params) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 0,
			duration: params.duration || 400,
			easing: params.easing || elasticOut,
			css: (t, u) => `transform: ${existingTransform} scale(${t})`
		};
	}
</script>

{#if visible}
	<div in:whoosh>
		whooshes in
	</div>
{/if}
```

---

カスタムのトランジション関数は `tick` 関数を返すこともでき、これは同じ `t` と `u` の引数を持つトランジションの *最中に* 呼び出されます。

> `tick` の代わりに `css` を使うことが可能ならば、そうしてください。-- CSS アニメーションはメインスレッドの外で実行することができるため、遅いデバイスでのジャンクを防ぐことができます。

```sv
<script>
	export let visible = false;

	function typewriter(node, { speed = 50 }) {
		const valid = (
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE
		);

		if (!valid) return {};

		const text = node.textContent;
		const duration = text.length * speed;

		return {
			duration,
			tick: (t, u) => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

{#if visible}
	<p in:typewriter="{{ speed: 20 }}">
		The quick brown fox jumps over the lazy dog
	</p>
{/if}
```

トランジションがトランジションオブジェクトではなく関数を返す場合、その関数は次のマイクロタスクで呼び出されます。これにより、複数のトランジションを調整することができ、[クロスフェード効果](tutorial/deferred-transitions) が可能になります。


##### Transition events

---

トランジションを持つ要素は、標準的なDOMイベントに加えて以下のイベントをディスパッチします。

* `introstart`
* `introend`
* `outrostart`
* `outroend`

```sv
{#if visible}
	<p
		transition:fly="{{ y: 200, duration: 2000 }}"
		on:introstart="{() => status = 'intro started'}"
		on:outrostart="{() => status = 'outro started'}"
		on:introend="{() => status = 'intro ended'}"
		on:outroend="{() => status = 'outro ended'}"
	>
		Flies in and out
	</p>
{/if}
```

---

ローカルトランジションは、親ブロックが作成または破棄されたときには再生されず、所属するブロックが作成または破棄されたときにのみ再生されます。

```sv
{#if x}
	{#if y}
		<p transition:fade>
			fades in and out when x or y change
		</p>

		<p transition:fade|local>
			fades in and out only when y changes
		</p>
	{/if}
{/if}
```


#### in:*fn*/out:*fn*

```sv
in:fn
```
```sv
in:fn={params}
```
```sv
in:fn|local
```
```sv
in:fn|local={params}
```

```sv
out:fn
```
```sv
out:fn={params}
```
```sv
out:fn|local
```
```sv
out:fn|local={params}
```

---

`transition:` に似ていますが、要素が DOM に入るときに(`in:`)、出るときに(`out:`)を適用します。

`transition:` とは違って、`in:` と `out:` を適用したトランジションは双方向ではありません。つまり、もしトランジションの最中にブロックがアウトロされた場合、逆転するのではなく、イントロトランジションはアウトロトランジションと一緒に「再生」し続けます。アウトロトランジションが中止された場合、トランジションは最初から再開されます。

```sv
{#if visible}
	<div in:fly out:fade>
		flies in, fades out
	</div>
{/if}
```



#### animate:*fn*

```sv
animate:name
```

```sv
animate:name={params}
```

```js
animation = (node: HTMLElement, { from: DOMRect, to: DOMRect } , params: any) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

```js
DOMRect {
	bottom: number,
	height: number,
	​​left: number,
	right: number,
	​top: number,
	width: number,
	x: number,
	y: number
}
```

---

アニメーションは、[keyed each block](docs#each) の内容が並び替えられたときに発生します。アニメーションは、要素が削除されたときには実行されず、各ブロックのデータが並べ替えられたときにのみ実行されます。animate ディレクティブは、キー付き各ブロックの *直接の* 子要素上になければなりません。

アニメーションは Svelte の[組み込みアニメーション関数](docs#svelte_animate) または [カスタムアニメーション関数](docs#Custom_animation_functions) を使用することができます。

```sv
<!-- When `list` is reordered the animation will run-->
{#each list as item, index (item)}
	<li animate:flip>{item}</li>
{/each}
```

##### Animation Parameters

---

アクションやトランジションと同様に、アニメーションはパラメータを持つことができます。

(ダブル `{{中括弧}}` は特殊な構文ではありません。これは式タグ内のオブジェクトリテラルです。)

```sv
{#each list as item, index (item)}
	<li animate:flip="{{ delay: 500 }}">{item}</li>
{/each}
```

##### Custom animation functions

---

アニメーションは、`node`、`animation` オブジェクト、および任意の `paramaters` を引数として指定するカスタム関数を使用することができます。`animation` パラメータは、`from` と `to` プロパティを含むオブジェクトで、それぞれ要素の `start` と `end` の位置におけるジオメトリを記述した [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect#Properties) を含みます。`from` プロパティは要素の開始位置の DOMRect であり、`to` プロパティはリストが並び替えられ DOM が更新された後の最終位置の DOMRect です。

返されたオブジェクトが `css` メソッドを持つ場合、Svelte は要素上で再生される CSS アニメーションを作成します。

`css` に渡される `t` 引数は `easing` 関数が適用された後の `0` と `1` の値です。引数 `u` は `1 - t` に等しい値です。

この関数はアニメーションが始まる *前に* 繰り返し呼ばれ、異なる `t` と `u` の引数を持ちます。


```sv
<script>
	import { cubicOut } from 'svelte/easing';

	function whizz(node, { from, to }, params) {

		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
			delay: 0,
			duration: Math.sqrt(d) * 120,
			easing: cubicOut,
			css: (t, u) =>
				`transform: translate(${u * dx}px, ${u * dy}px) rotate(${t*360}deg);`
		};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```

---


カスタムアニメーション関数は `tick` 関数を返すこともでき、これは同じ `t` と `u` の引数を持つアニメーションの *最中* に呼び出されます。

> `tick` の代わりに `css` を使うことが可能ならば、そうしてください。-- CSS アニメーションはメインスレッドの外で実行することができるため、遅いデバイスでのジャンクを防ぐことができます。

```sv
<script>
	import { cubicOut } from 'svelte/easing';

	function whizz(node, { from, to }, params) {

		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
		delay: 0,
		duration: Math.sqrt(d) * 120,
		easing: cubicOut,
		tick: (t, u) =>
			Object.assign(node.style, {
				color: t > 0.5 ? 'Pink' : 'Blue'
			});
	};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```

### Component directives

#### [on:*eventname*](on_component_event)

```sv
on:eventname={handler}
```

---

コンポーネントは [createEventDispatcher](docs#createEventDispatcher) を用いるか、または DOM イベントをフォワーディングすることでイベントを発火することができます。コンポーネントのイベントをリッスンすることは、DOM イベントをリッスンすることと同義です:

```sv
<SomeComponent on:whatever={handler}/>
```

---

DOM イベントと同様に、`on:` ディレクティブが値なしに使われる場合、コンポーネントはイベントを*フォワード*しますが、これはコンポーネントのユーザーがイベントをリッスンできることを意味します。

```sv
<SomeComponent on:whatever/>
```


#### [bind:*property*](bind_component_property)

```sv
bind:property={variable}
```

---

要素と同じ構文を用いてコンポーネントの props にバインドすることができます。

```sv
<Keypad bind:value={pin}/>
```

#### [bind:this](bind_component)

```sv
bind:this={component_instance}
```

---

またコンポーネントは `bind:this` をサポートしており、これを用いることでコンポーネントのインスタンスをプログラムで操作できるようになります。

> 注意 ボタンが最初にレンダリングされた際 `cart` は `undefined` となりエラーを投げるため、`{cart.empty}` は実行できません。

```sv
<ShoppingCart bind:this={cart}/>

<button on:click={() => cart.empty()}>
	Empty shopping cart
</button>
```



### `<slot>`

```sv
<slot><!-- optional fallback --></slot>
```
```sv
<slot name="x"><!-- optional fallback --></slot>
```
```sv
<slot prop={value}></slot>
```

---

コンポーネントは要素と同じ様に、子コンテンツを持つことができます。

コンテンツは `<slot>` 要素を用いて子コンポーネントに公開され、子が何も提供されない場合、レンダリングされるフォールバックのコンテンツを含みます。

```sv
<!-- Widget.svelte -->
<div>
	<slot>
		this fallback content will be rendered when no content is provided, like in the first example
	</slot>
</div>

<!-- App.svelte -->
<Widget></Widget> <!-- this component will render the default content -->

<Widget>
	<p>this is some child content that will overwrite the default slot content</p>
</Widget>
```

#### [`<slot name="`*name*`">`](slot_name)

---

名前付きスロットは、特定の場所をターゲットにすることを可能にします。 また、フォールバックのコンテンツを含むこともできます。

```sv
<!-- Widget.svelte -->
<div>
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer"></slot>
</div>

<!-- App.svelte -->
<Widget>
	<h1 slot="header">Hello</h1>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</Widget>
```

コンポーネントは、`<Component slot="name" />`という構文を使って、名前付きスロットに入れることができます。
ラッパー要素を使うことなくスロットに内容を入れるために、特殊な要素`<svelte:fragment>`を使うことができます。

```sv
<!-- Widget.svelte -->
<div>
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer"></slot>
</div>

<!-- App.svelte -->
<Widget>
	<HeaderComponent slot="header" />
	<svelte:fragment slot="footer">
		<p>All rights reserved.</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Widget>
```


#### [`$$slots`](slots_object)

---

`$$slots` は、親からコンポーネントに渡されたスロットの名前がキーとなるオブジェクトです。親が特定の名前のスロットを渡さなかった場合、その名前は `$$slots` には存在しません。これにより、親がスロットを指定した場合にのみコンポーネントがスロット (と他の要素、例えばスタイリング用のラッパーなど)をレンダリングすることができます。

注意してください、明示的に空の名前付きスロットを渡すと、そのスロットの名前が `$$slots` に追加されます。例えば、親が `<div slot="title" />` を子コンポーネントに渡した場合、`$$slots.title` は子コンポーネント内で有効になります。

```sv
<!-- Card.svelte -->
<div>
	<slot name="title"></slot>
	{#if $$slots.description}
		<!-- この<hr>とスロットは、"description"という名前のスロットが提供されている場合にのみレンダリングされます。 -->
		<hr>
		<slot name="description"></slot>
	{/if}
</div>

<!-- App.svelte -->
<Card>
	<h1 slot="title">Blog Post Title</h1>
	<!-- "description"という名前のスロットは提供されていないので、該当しないスロットはレンダリングされません。 -->
</Card>
```

#### [`<slot let:`*name*`={`*value*`}>`](slot_let)

---

スロットは０回以上レンダリングすることができ、props を使って親に値を *戻す* ことができます。親は `let:` ディレクティブを使ってスロットテンプレートに値を公開します。

通常の短縮ルールが適用されます -- `let:item` は `let:item={item}` と同等であり、`<slot {item}>` は `<slot item={item}>` と同等です。

```sv
<!-- FancyList.svelte -->
<ul>
	{#each items as item}
		<li class="fancy">
			<slot prop={item}></slot>
		</li>
	{/each}
</ul>

<!-- App.svelte -->
<FancyList {items} let:prop={thing}>
	<div>{thing.text}</div>
</FancyList>
```

---

名前付きスロットは値を公開することもできます。`let:` ディレクティブは `slot` 属性を持つ要素に適用されます。

```sv
<!-- FancyList.svelte -->
<ul>
	{#each items as item}
		<li class="fancy">
			<slot name="item" {item}></slot>
		</li>
	{/each}
</ul>

<slot name="footer"></slot>

<!-- App.svelte -->
<FancyList {items}>
	<div slot="item" let:item>{item.text}</div>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</FancyList>
```


### `<svelte:self>`

---

`<svelte:self>` 要素を使用すると、コンポーネントにそれ自体を再帰的に含めることができます。

マークアップのトップレベルに表示することはできません。また、無限ループを防ぐために、 `if` または `each` ブロック内にある必要があります。

```sv
<script>
	export let count;
</script>

{#if count > 0}
	<p>counting down... {count}</p>
	<svelte:self count="{count - 1}"/>
{:else}
	<p>lift-off!</p>
{/if}
```

### `<svelte:component>`

```sv
<svelte:component this={expression}/>
```

---

`<svelte:component>` 要素は、 `this` プロパティで指定されたコンポーネントのコンストラクタを用いて、コンポーネントを動的にレンダリングします。プロパティが変更されると、コンポーネントは破棄されて再生成されます。

`this` の値が falsy である場合、コンポーネントはレンダリングされません。

```sv
<svelte:component this={currentSelection.component} foo={bar}/>
```


### `<svelte:window>`

```sv
<svelte:window on:event={handler}/>
```
```sv
<svelte:window bind:prop={value}/>
```

---

`<svelte:window>` 要素を使うと、コンポーネントが破棄されたときにイベントリスナを削除したり、サーバサイドでレンダリングするときに `window` が存在するかどうかをチェックしたりすることなく、`window` オブジェクトにイベントリスナを追加することができます。

```sv
<script>
	function handleKeydown(event) {
		alert(`pressed the ${event.key} key`);
	}
</script>

<svelte:window on:keydown={handleKeydown}/>
```

---

また、以下のプロパティにバインドすることもできます。

* `innerWidth`
* `innerHeight`
* `outerWidth`
* `outerHeight`
* `scrollX`
* `scrollY`
* `online` — window.navigator.onLine の別名です

`scrollX` と `scrollY` 以外はすべて読み込み専用です。

```sv
<svelte:window bind:scrollY={y}/>
```


### `<svelte:body>`

```sv
<svelte:body on:event={handler}/>
```

---

`<svelte:window>` と同様に、この要素を使うことで `document.body` のイベント、例えば `window` では発生しない `mouseenter` や `mouseleave` などのリスナを追加することができます。

```sv
<svelte:body
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
/>
```


### `<svelte:head>`

```sv
<svelte:head>...</svelte:head>
```

---

この要素は `document.head` に要素を挿入します。サーバサイドのレンダリングでは、`head` の内容はメインの `html` の内容とは別に公開されます。

```sv
<svelte:head>
	<link rel="stylesheet" href="tutorial/dark-theme.css">
</svelte:head>
```


### `<svelte:options>`

```sv
<svelte:options option={value}/>
```

---

`<svelte:options>` 要素は、コンポーネントごとのコンパイラオプションを指定する場所を提供します。これらは [コンパイラセクション](docs#svelte_compile) で詳しく説明されています。使用できるオプションは以下の通りです。

* `immutable={true}` — 変異可能なデータは絶対に使いません。そのため、コンパイラは値が変更されたかどうかを判断するために単純な参照等価性チェックを行うことができます。
* `immutable={false}` — デフォルトです。Svelte は、変更可能なオブジェクトが変更されたかどうかについて、より保守的になります。
* `accessors={true}` — コンポーネントの props のゲッターとセッターを追加します。
* `accessors={false}` — 初期値です
* `namespace="..."` — このコンポーネントが使用される名前空間、最も一般的には "svg "です。大文字小文字を区別しない属性名とHTML固有の警告を除外するために "外部の" 名前空間を使用します。
* `tag="..."` — このコンポーネントをカスタム要素としてコンパイルする際に使用する名前。

```sv
<svelte:options tag="my-custom-element"/>
```

### `<svelte:fragment>`

`<svelte:fragment>`要素によって、コンテナとなるDOM要素でラップすることなく[名前付きスロット](docs#slot_name)に内容を入れることができます。

```sv
<!-- Widget.svelte -->
<div>
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer"></slot>
</div>

<!-- App.svelte -->
<Widget>
	<h1 slot="header">Hello</h1>
	<svelte:fragment slot="footer">
		<p>All rights reserved.</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Widget>
```
