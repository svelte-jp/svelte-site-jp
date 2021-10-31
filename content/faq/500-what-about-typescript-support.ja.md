---
question: TypeScriptのサポートはどうですか?
---

[svelte-preprocess](https://github.com/sveltejs/svelte-preprocess) などのプリプロセッサをインストールする必要があります。[svelte-check](https://www.npmjs.com/package/svelte-check) を使用すると、コマンドラインからタイプチェックを実行できます。

Svelteテンプレートでリアクティブ変数の型を宣言するには、次の構文を使用します。

```
let x: number;
$: x = count + 1;
```

タイプまたはインタフェースをインポートするには、[TypeScriptの`type`修飾子](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)を使用します:

```
import type { SomeInterface } from './SomeFile';
```

`svelte-preprocess` はインポートが型であるか値であるかを認識しないため、 `type` 修飾子を使用する必要があります。 `svelte-preprocess` は他のファイルを認識することなく一度に1つのファイルのみをトランスパイルするため、この修飾子が存在しない型のみを含むインポートを安全に消去することはできません。