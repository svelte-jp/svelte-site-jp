---
title: Frequently asked questions
---

## Svelte は初めてです。どこから始めればいいですか？ <!--i-m-new-to-svelte-where-should-i-start-->

始めるにあたって、ベストな方法はインタラクティブな[チュートリアル](https://learn.svelte.jp/) を一通りやってみることです。個々のステップでは1つの特定の側面にフォーカスしており、学習しやすくなっています。ブラウザで本物の Svelte コンポーネントを編集して実行することができます。

5分から10分あれば、すぐに始められます。1時間半でチュートリアル全体をこなせるでしょう。

## サポートはどこで受けられますか？ <!--where-can-i-get-support-->

特定の構文に関する質問がある場合は、最初は [API ページ](https://svelte.dev/docs) が参考になると思います。

Stack Overflow はコードレベルの質問やエラーで詰まった際に利用されている人気のフォーラムです。[Svelte](https://stackoverflow.com/questions/tagged/svelte+or+svelte-3) とタグづけられた既存の質問を読んだり、または[自分で質問](https://stackoverflow.com/questions/ask?tags=svelte)してみてください！

ベストプラクティスやアプリケーションアーキテクチャについて議論したり、他の Svelte ユーザーと交流する場所としてオンラインのフォーラムやチャットがあります。例えば [私たちの Discord](https://svelte.dev/chat) や、[Reddit のチャンネル](https://www.reddit.com/r/sveltejs/) などです。コードレベルの質問がある場合は、Stack Overflowの方が適切です。

## サードパーティのリソースはありますか？ <!--are-there-any-third-party-resources-->

Svelte Society が [本やビデオのリスト](https://sveltesociety.dev/resources) を管理しています。

## VS Code で .svelte ファイルにシンタックスハイライトをあてるにはどうすればよいですか? <!--how-can-i-get-vs-code-to-syntax-highlight-my-svelte-files-->

[公式の VS Code extension for Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) があります。

## .svelte ファイルを自動的にフォーマットするツールはありますか？ <!--is-there-a-tool-to-automatically-format-my-svelte-files-->

[prettier-plugin-svelte](https://www.npmjs.com/package/prettier-plugin-svelte) プラグインで prettier を使用できます。

## コンポーネントのドキュメントを作成する方法はありますか？ <!--how-do-i-document-my-components-->

Svelte Language Server を使用するエディターでは、特別なフォーマットのコメントを使用することで、コンポーネント、関数、およびエクスポートを文書化することができます。

````svelte
<script>
	/** What should we call the user? */
	export let name = 'world';
</script>

<!--
@component
Here's some documentation for this component.
It will show up on hover.

- You can use markdown here.
- You can also use code blocks here.
- Usage:
  ```tsx
  <main name="Arethra">
  ```
-->
<main>
	<h1>
		Hello, {name}
	</h1>
</main>
````

Note: コンポーネントについて記述する HTML コメントには `@component` が必要です。

## Svelte はスケールしますか？ <!--does-svelte-scale-->

これについてはそのうちブログに書く予定ですが、それまでは[こちらの issue](https://github.com/sveltejs/svelte/issues/2546) をご確認ください。

## UI コンポーネントライブラリはありますか？ <!--is-there-a-ui-component-library-->

単独のコンポーネントだけではなく、いくつかの UI コンポーネントライブラリがあります。Svelte Society Web サイトの [components ページの design systems section](https://sveltesociety.dev/components#design-systems) で探してみてください。

## Svelte アプリをテストするにはどうすればよいですか？ <!--how-do-i-test-svelte-apps-->

アプリケーションの構造がどうなっているか、ロジックがどこに定義されているかによって、適切にテストするための最適な方法が決まります。データ変換、コンポーネント間の状態管理、ロギングなど、すべてのロジックがコンポーネント内にあるわけではないことに注意することが重要です。Svelte ライブラリは独自のテストスイートを持っているので、Svelte が提供する実装の詳細を検証するためにテストを書く必要はないことを忘れないでください。

Svelte アプリケーションには、通常3種類のテストがあります： ユニット(Unit)、コンポーネント(Component)、End-to-End(E2E) です。

_ユニットテスト(Unit Tests)_： ビジネスロジックを単独でテストすることに重点を置いています。多くの場合、これは個々の機能やエッジケースを検証するものです。また、Svelte コンポーネントから可能な限り多くのロジックを抽出することで、よりアプリケーションの多くの部分をこれらのテストでカバーすることができます。新しい SvelteKit プロジェクトを作成する際、ユニットテストのために [Vitest](https://vitest.dev/) をセットアップするかどうか尋ねられます。その他にも、使用可能なテストランナーが多数あります。

_コンポーネントテスト(Component Tests)_: Svelteコンポーネントがマウントされ、そのライフサイクルを通じて期待通りに動作することを検証するには、ドキュメントオブジェクトモデル（DOM）を提供するツールが必要です。コンポーネントはコンパイルされ (Svelteはコンパイラであり、通常のライブラリではないため)、マウントし、要素の構造、リスナー、ステート、および Svelte コンポーネントが提供する他のすべての機能に対してアサートすることができます。コンポーネントテストのためのツールは、jsdom のようなインメモリ実装と [Vitest](https://vitest.dev/) のようなテストランナーの組み合わせから、[Playwright](https://playwright.dev/docs/test-components)、[Cypress](https://www.cypress.io/) など、実際のブラウザを活用して視覚的なテスト機能を提供するソリューションまで、さまざまです。

_End-to-End Tests_: ユーザーがアプリケーションを操作できることを確認するために、可能な限り本番に近い方法で全体としてテストすることが必要です。これは、ユーザーがアプリケーションをどのように操作するかをシミュレートするために、アプリケーションのデプロイされたバージョンをロードして操作する End-to-End (E2E) テストを書くことによって行われます。新しい SvelteKit プロジェクトを作成する際、End-to-End テスト用に [Playwright](https://playwright.dev/) をセットアップするかどうか尋ねられます。他にも多くの E2E テストライブラリがありますので、ご利用ください。

テストを始めるためのリソースをいくつか紹介します：

- [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/example/)
- [Svelte Component Testing in Cypress](https://docs.cypress.io/guides/component-testing/svelte/overview)
- [Example using vitest](https://github.com/vitest-dev/vitest/tree/main/examples/svelte)
- [Example using uvu test runner with JSDOM](https://github.com/lukeed/uvu/tree/master/examples/svelte)
- [Test Svelte components using Vitest & Playwright](https://davipon.hashnode.dev/test-svelte-component-using-vitest-playwright)
- [Component testing with WebdriverIO](https://webdriver.io/docs/component-testing/svelte)

## ルーターはありますか？ <!--is-there-a-router-->

公式のルーティングライブラリは [SvelteKit](https://kit.svelte.jp/) です。SvelteKit は、ファイルシステムルーター、サーバーサイドレンダリング(SSR)、ホットモジュールリローディング(HMR)を1つの使いやすいパッケージで提供します。React にとっての Next.js に相当するものです。

しかしながら、任意のルーターライブラリを使用することもできます。フレームワークに依存しないライブラリとしては [navaid](https://github.com/lukeed/navaid) があります。アイソモーフィックなものとしては [universal-router](https://github.com/kriasoft/universal-router) があります。[Hono](https://hono.dev/) なら、複数の JS ランタイムをサポートしています。[TanStack Router](https://github.com/TanStack/router/tree/beta-agnostic) なら、型安全でありキャッシュをサポートしています。

宣言的な HTML によるアプローチを好むなら、 アイソモーフィックな [svelte-routing](https://github.com/EmilTholin/svelte-routing) や [svelte-pilot](https://svelte-pilot.github.io/en/link#toc) というライブラリがあります。

クライアント側でハッシュ・ベースのルーティングが必要な場合は、[svelte-spa-router](https://github.com/ItalyPaleAle/svelte-spa-router)、または [abstract-state-router](https://github.com/TehShrike/abstract-state-router/) を確認してみてください。

[Routify](https://routify.dev) は SvelteKit のルーターによく似たファイルシステムベースのルーターです。Version 3 は Svelte のネイティブな SSR をサポートしています。

[Vike](https://vike.dev/svelte) は Vite ベースのルーターで、SvelteKit のルーターに似ていますが、まだ experimental です。

[コミュニティがメンテナンスしているルーターのリストが sveltesociety.dev にあります](https://sveltesociety.dev/components#routers)ので、ご覧ください。

## 未使用のスタイルを削除しないようにすることはできますか？ <!--can-i-tell-svelte-not-to-remove-my-unused-styles-->

いいえ。Svelte はコンポーネントから未使用のスタイルを削除しますし、未使用のスタイルがある場合は警告します。こうしないと発生してしまう問題を防ぐためです。

Svelte のコンポーネントスタイルのスコープは、そのコンポーネントに固有の class を生成し、それを Svelte の制御化にあるコンポーネント内の関連する要素に追加し、コンポーネントのスタイルにある各セレクタにもそれを追加することで機能しています。コンパイラが、スタイルセレクタがどの要素に適用されるかわからない場合に、そのスタイルを保持しておくと、2つの問題を引き起こす可能性があります:

- そういったセレクタを保持したままスコープ用の class を追加した場合、当然そのセレクタはコンポーネント内の要素にマッチしない可能性が高く、もちろん子コンポーネントや `{@html ...}` で生成された要素にもマッチしません。
- もしスコープ用の class を追加せずにそういったセレクタを保持した場合、そのスタイルはグローバルスタイルとなり、ページ全体に影響します。

Svelte がコンパイル時に特定できないスタイルを指定する必要がある場合は、`:global(...)` を使用して明示的にグローバルスタイルを選択する必要があります。しかし、セレクタの一部だけを `:global(...)` で囲むことができることを覚えておいてください。`.foo :global(.bar) { ... }` は、コンポーネントの `.foo` 要素の中に存在する `.bar` 要素にスタイルをあてます。コンポーネントに親要素がある限りにおいて、このように部分的にグローバルセレクタを使用することで、ほとんどの場合、ご希望のスタイルを実現することができます。

## Svelte v2 はまだ使えますか？ <!--is-svelte-v2-still-available-->

新しい機能は追加されていませんし、バグはおそらく、非常に悪質な場合や、何らかのセキュリティ脆弱性がある場合にのみ修正されるでしょう。

ドキュメントはまだ[こちら](https://v2.svelte.dev/guide) から入手できます。

## ホットモジュールリロードをするにはどうすればよいですか？ <!--how-do-i-do-hot-module-reloading-->

[SvelteKit](https://kit.svelte.jp/) の利用をお勧めします。SvelteKit は、すぐに利用可能な HMR をサポートし、[Vite](https://vitejs.dev/) と [svelte-hmr](https://github.com/sveltejs/svelte-hmr) をもとに構築されています。[rollup](https://github.com/rixo/rollup-plugin-svelte-hot) や [webpack](https://github.com/sveltejs/svelte-loader) のためのコミュニティプラグインもあります。
