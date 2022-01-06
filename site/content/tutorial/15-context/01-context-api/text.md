---
title: setContext and getContext
---

コンテキストAPIは、データや関数をプロパティとして渡したり、たくさんのイベントをディスパッチしたりすることなく、コンポーネント同士で'会話'するための仕組みを提供します。これは高度ですが、便利な機能です。

[Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/overview/)のマップを使ったこのアプリの例を見てみましょう。`<MapMarker>`を使用してマーカーを表示したいのですが、ベースとなるMapboxインスタンスへの参照を各コンポーネントのプロパティとして渡したくありません。

コンテキストAPIは`setContext`と`getContext`に分かれます。もしコンポーネントが`setContext(key, context)`を呼ぶと、どの*子*コンポーネントでも`const context = getContext(key)`でコンテキストを取得することができます。

まずはコンテキストを設定してみましょう。`Map.svelte`では、`svelte`から`setContext`をインポートし、`mapbox.js`から`key`をインポートして、`setContext`を呼び出します。

```js
import { onDestroy, setContext } from 'svelte';
import { mapbox, key } from './mapbox.js';

setContext(key, {
	getMap: () => map
});
```

コンテキストオブジェクトはなんでも構いません。[lifecycle functions](/tutorial/onmount)のように、`setContext`と`getContext`はコンポーネントの初期化時に呼び出されなければいけません。それより後 (例えば `onMount` の中) で呼び出すとエラーをスローします。この例では、コンポーネントがマウントされるまで`map`は作成されないので、このコンテキストオブジェクトには`map`自体ではなく`getMap`関数が含まれています。

一方、`MapMarker.svelte`では、Mapboxインスタンスへの参照を取得できるようになりました。

```js
import { getContext } from 'svelte';
import { mapbox, key } from './mapbox.js';

const { getMap } = getContext(key);
const map = getMap();
```

これでマーカーをマップに追加することができるようになりました。

> `<MapMarker>`のより完成度の高いバージョンでは削除やプロパティの変更も扱えますが、この場ではコンテキストのデモンストレーションに留めておきます。

## Context keys

`mapbox.js`にはこの一行が含まれています。

```js
const key = {};
```

どんなものでもキーとして使うことができます（例えば`setContext('mapbox', ...)`のように）。文字列を使用することの欠点は、異なるコンポーネントライブラリが誤って同じものを使ってしまう可能性があることです。オブジェクトリテラルを使えば、どんな状況でもキーが衝突しないことが保証されます(オブジェクトは自身に対する参照の等価性しか持ちません。すなわち`{} !== {}`に対し`"x" === "x"`となります)。たとえ複数の異なるコンテキストが多くのコンポーネントレイヤーを超えて動作している場合であっても、です。

## Contexts vs. stores

コンテキストとストアは似ているように見えます。ストアはアプリの*どの*部分でも使用できるのに対し、コンテキストは*コンポーネントとその子孫*のみが利用できるという点で異なります。これは、ある状態が他の状態に干渉することなく、コンポーネントの複数のインスタンスを使用したい場合に便利です。

実際には、この2つを一緒に使うこともあるかもしれません。コンテキストはリアクティブではないので、時間の経過とともに変化する値はストアとして表現する必要があります。


```js
const { these, are, stores } = getContext(...);
```
