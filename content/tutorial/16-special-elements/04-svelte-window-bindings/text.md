---
title: <svelte:window> bindings
---

また、`window` の特定のプロパティ、例えば `scrollY` のようなプロパティにバインドすることもできます。7行目を更新してください。

```html
<svelte:window bind:scrollY={y}/>
```

バインドできるプロパティの一覧は以下の通りです。

* `innerWidth`
* `innerHeight`
* `outerWidth`
* `outerHeight`
* `scrollX`
* `scrollY`
* `online` — これは `window.navigator.onLine` の別名です

`scrollX` と `scrollY` 以外はすべて読み込み専用です。