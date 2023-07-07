---
title: svelte/action
---

action は、要素が作成されたときに呼び出される関数です。要素がアンマウントされたときに呼び出される `destroy` メソッドをもつオブジェクトを返すことができます。

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {import('svelte/action').Action}  */
	function foo(node) {
		// the node has been mounted in the DOM

		return {
			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<div use:foo />
```

action はパラメータを取ることができます。戻り値に `update` メソッドがあると、そのパラメータが変化するときはいつも、Svelte がマークアップに更新を適用した直後にそのメソッドが呼び出されます。

> すべてのコンポーネントインスタンスに対して `foo` 関数を再宣言しているという事実について心配する必要はありません。Svelte は、ローカル状態に依存しない関数をコンポーネント定義から巻き上げます。

```svelte
<!--- file: App.svelte --->
<script>
	/** @type {string} */
	export let bar;

	/** @type {import('svelte/action').Action<HTMLElement, string>}  */
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

<div use:foo={bar} />
```

## Attributes

action がカスタムイベントを発行し、適用する要素にカスタム属性を適用することがあります。これをサポートするために、`Action` 型または `ActionReturn` 型の action は最後のパラメータとして `Attributes` を持つことができます： `Attributes` は `ActionReturn` 型の action の最後のパラメータです：

```svelte
<!--- file: App.svelte --->
<script>
	/**
	 * @type {import('svelte/action').Action<HTMLDivElement, { prop: any }, { 'on:emit': (e: CustomEvent<string>) => void }>}
	 */
	function foo(node, { prop }) {
		// the node has been mounted in the DOM

		//...LOGIC
		node.dispatchEvent(new CustomEvent('emit', { detail: 'hello' }));

		return {
			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<div use:foo={{ prop: 'someValue' }} on:emit={handleEmit} />
```

## Types

> TYPES: svelte/action
