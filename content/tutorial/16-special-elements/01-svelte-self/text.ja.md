---
title: <svelte:self>
---

Svelteは様々な組み込み要素を提供します。最初に `<svelte:self>` はコンポーネントがそれ自身を再帰的に含むことを可能にします。

これはこのフォルダツリービューのように、フォルダの中に *他の* フォルダを含むことができるようにするのに便利です。`Folder.svelte` で、このようなことができるようにしたい訳です。

```html
{#if file.type === 'folder'}
	<Folder {...file}/>
{:else}
	<File {...file}/>
{/if}
```

しかし、モジュールは自分自身をインポートすることができないので、それは不可能です。代わりに `<svelte:self>` を使います。

```html
{#if file.type === 'folder'}
	<svelte:self {...file}/>
{:else}
	<File {...file}/>
{/if}
```
