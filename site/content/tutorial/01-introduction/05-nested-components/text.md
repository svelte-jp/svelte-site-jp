---
title: Nested components
---

It would be impractical to put your entire app in a single component. Instead, we can import components from other files and then use them as though we were including elements.

We now present you 2 files in the editor on the right (upper bar) to click on, `App.svelte` and `Nested.svelte`.

Each `.svelte` file holds a component that is a reusable self-contained block of code that encapsulates HTML, CSS, and JavaScript that belong together.

Let's add a `<script>` tag to `App.svelte` that imports the file (our component) `Nested.svelte` into our app...

```html
<script>
	import Nested from './Nested.svelte';
</script>
```

...then use component `Nested` in the app markup:

```html
<p>This is a paragraph.</p>
<Nested/>
```

`Nested.svelte`には`p`要素がありますが、`App.svelte`のスタイルが適用されていないことに注目してください。

またコンポーネント名`Nested`が大文字で始まっていることにも注目してください。この命名規則は、ユーザーが定義したコンポーネントと、通常のHTMLタグを区別するために採用されました。
