---
title: Zero-effort type safety
description: ボイラープレートなしで、より便利に、より正しく
author: Simon Holthausen
authorURL: https://twitter.com/dummdidumm_
---
> 翻訳 : Svelte 日本コミュニティ  
> 原文 : https://svelte.dev/blog/zero-config-type-safety
>
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容については svelte.dev の原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
>
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte 日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

SvelteKit アプリに型アノテーションをたくさん書くと、ネットワークをまたいでも完全な型安全性が手に入ります — あなたのページの `data` には、その data を生成する `load` 関数の戻り値から推論された型があり、明示的に何かを宣言する必要はありません。これなしで今までどうやって生活してきたのだろう、と考えさせられるようなことの1つです。

でも、型アノテーションが不要になったとしたら？ `load` と `data` はフレームワークの一部ですし、フレームワークが私たちのために型付けできないものでしょうか？ これは結局、コンピューターが何のためにあるのか、ということです — 退屈なことをやってくれるから、私たちはクリエイティブなことに集中することができるのです。

そして今日現在、それができるようになりました。

<video src="https://sveltejs.github.io/assets/video/zero-config-types.mp4" controls muted playsinline></video>

VSCode をお使いでしたら、Svelte extension を最新バージョンにアップグレードするだけです。これでもう今後、`load` 関数や `data` プロパティにアノテーションを付ける必要はありません。他のエディタ向けの Extension でも、それが Language Server Protocol と TypeScript plugin をサポートしていればこの機能を使うことができます。CLI 診断ツール `svelte-check` の最新バージョンでも動作します！

詳細に入る前に、SvelteKit の型安全性の仕組みについておさらいしましょう。

## Generated types

SvelteKit では、`load` 関数でページの data を取得します。`@sveltejs/kit` から `ServerLoadEvent` をインポートして、この event に型を付けることができます:

```ts
const database = {
	getPost(slug: string | undefined): Promise<string> {
		return Promise.resolve('hello world');
	}
};
// ---cut---
// src/routes/blog/[slug]/+page.server.ts
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function load(event: ServerLoadEvent) {
	return {
		post: await database.getPost(event.params.post)
	};
}
```

動作しますが、もっと良くすることができます。このコード例では、パラメーターは `post` ではなく `slug` (ファイル名に `[slug]` とあるため) ですが、誤って `event.params.post` と書いてしまっていることにお気付きでしょうか。`ServerLoadEvent` にジェネリクスの型引数を追加して自分で `params` に型付けすることもできますが、柔軟性がなく壊れやすいです。

そこで、自動型生成の出番です。全てのルート(route)ディレクトリには、それぞれのルート固有(route-specific)の型を持つ `$types.d.ts` という隠しファイルがあります:

```diff
// src/routes/blog/[slug]/+page.server.ts
-import type { ServerLoadEvent } from '@sveltejs/kit';
+import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
    return {
-        post: await database.getPost(event.params.post)
+        post: await database.getPost(event.params.slug)
    };
}
```

これによって `params.post` プロパティにアクセスしようとするとエラーとなり、打ち間違い(typo)がわかるようになります。パラメーターの型を絞り込むだけでなく、`await event.parent()` の型や、server `load` 関数や universal `load` 関数から渡される `data` の型も絞り込むことができます。`LayoutServerLoadEvent` と区別するため、`PageServerLoadEvent` を使用していることにご注意ください。

data をロードしたあと、それを `+page.svelte` で表示したいと思います。同じ型生成メカニズムが、`data` の型が正しいことを保証します:

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{data.post.title}</h1>

<div>{@html data.post.content}</div>
```

## Virtual files

開発サーバー(dev server)、またはビルド(build)を実行しているときに、型が自動で生成されます。ファイルシステムベースルーティングのおかげで、SvelteKit はルートツリー(route tree)をトラバースし、正しいパラメーターや親の data を推論することができます。各ルート(route)ごとに1つの `$types.d.ts` ファイルが出力されますが、大体以下のようになります:

```ts
// @errors: 2344 2694 2307
// $types.d.ts
import type * as Kit from '@sveltejs/kit';

// types inferred from the routing tree
type RouteParams = { slug: string };
type RouteId = '/blog/[slug]';
type PageParentData = {};

// PageServerLoad type extends the generic Load type and fills its generics with the info we have
export type PageServerLoad = Kit.ServerLoad<RouteParams, PageParentData, RouteId>;

// The input parameter type of the load function
export type PageServerLoadEvent = Parameters<PageServerLoad>[0];

// The return type of the load function
export type PageData = Kit.ReturnType<
	typeof import('../src/routes/blog/[slug]/+page.server.js').load
>;
```

`$types.d.ts` を実際に `src` ディレクトリに書き込んでいるわけではありません — ちょっとごちゃごちゃしますし、ごちゃごちゃしたコードが好きな人はいません。代わりに、TypeScript の [`rootDirs`](https://www.typescriptlang.org/ja/tsconfig#rootDirs) という機能を使用し、‘virtual’ ディレクトリを実際のディレクトリにマップします。`rootDirs` に、プロジェクトの root (デフォルト) と、さらに `.svelte-kit/types` (全ての generated types の出力フォルダ) を設定し、その中でルート構造(route structure)をミラーリングすることで、この挙動を実現しています:

```
// on disk:
.svelte-kit/
├ types/
│ ├ src/
│ │ ├ routes/
│ │ │ ├ blog/
│ │ │ │ ├ [slug]/
│ │ │ │ │ └ $types.d.ts
src/
├ routes/
│ ├ blog/
│ │ ├ [slug]/
│ │ │ ├ +page.server.ts
│ │ │ └ +page.svelte


// what TypeScript sees:
src/
├ routes/
│ ├ blog/
│ │ ├ [slug]/
│ │ │ ├ $types.d.ts
│ │ │ ├ +page.server.ts
│ │ │ └ +page.svelte
```

## Type safety without types

自動型生成のおかげで、高度な型安全性を実現しています。ただ、もし型を書くのをすべて省略できるようになったとしたら素晴らしいと思いませんか？今日現在、まさにそれができるようになりました:

```diff
// src/routes/blog/[slug]/+page.server.ts
-import type { PageServerLoadEvent } from './$types';

-export async function load(event: PageServerLoadEvent) {
+export async function load(event) {
    return {
        post: await database.getPost(event.params.post)
    };
}
```

```diff
<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
-    import type { PageData } from './$types';
-    export let data: PageData;
+    export let data;
</script>
```

これはとても便利ですが、それだけではありません。より _正しい_ のです: コードをコピーペーストするときに、例えば `PageServerLoadEvent` と `LayoutServerLoadEvent` と `PageLoadEvent` のような、似ているが少し違う型を混同してしまうことがよくあります。Svelte の主な考え方は、コードを宣言的に書くことで、機械が私たちのためにほとんどの作業を、それも正しく効率的にやってくれる、というものでした。これも同じです — `+page` ファイルのような強いフレームワークの規約を活用すれば、間違いをするのが難しくなり、正しいことをするほうが簡単になるのです。

これは SvelteKit ファイル (`+page`、`+layout`、`+server`、`hooks`、`params` など) からのすべての export と、`+page/layout.svelte` ファイルの `data`、`form`、`snapshot` プロパティで動作します。

VS Code でこの機能を使用するには、Svelte for VS Code extension の最新バージョンをインストールしてください。他の IDE では、Svelte language server と Svelte TypeScript plugin の最新バージョンを使用してください。エディタ以外では、コマンドラインツール `svelte-check` でも、バージョン 3.1.1 以降であればこれらのアノテーションを追加する方法が組み込まれています。

## How does it work?

この機能を実現するには、(Svelte ファイルのインテリセンスを行ってくれる) language server と、(TypeScript に `.ts/js` ファイルの内部から Svelte ファイルを理解させる) TypeScript plugin の両方を変更する必要がありました。両方とも、正しい型を正しいポジションに自動挿入し、オリジナルの型付けされていないファイルではなく拡張された仮想ファイルを使用するよう TypeScript に指示します。生成されたファイルのポジションとオリジナルファイルのポジションを前後にマッピングして組み合わせることで、これを実現しています。`svelte-check` は language server の一部を再利用しているため、調整することなくこの機能が使えます。

この機能は Next.js チームから[インスパイア](https://twitter.com/shuding_/status/1625263297573400578)されました。Next.js チームに感謝します。

## What's next

将来的には、SvelteKit のさらに多くの領域を型安全にすることを検討したいと思っています — 例えばリンクは、HTML の中や、プログラム的に `goto` を呼び出していますよね。

TypeScript は JavaScript の世界を席巻しています — 私たちはそれに夢中です！ 私たちは SvelteKit のファーストクラスの型安全性に深く取り組んでおり、TypeScript を使用するか JSDoc で型付けされた JavaScript を使用するかに関わらず、より大規模な Svelte コードベースにも美しくスケールすることができる、できる限り開発体験をスムーズにするツールを提供します。
