---
question: Svelteアプリケーションをテストするにはどうすればよいですか？
---

ビューロジックとビジネスロジックを分離することをお勧めします。データ変換またはコンポーネント間の状態管理は、Svelteコンポーネントの外部に保管するのが最適です。このようにしてJavaScriptの機能をテストするのと同じように、これらの部分をテストすることができます。コンポーネントをテストする際には、コンポーネントのロジックをテストし、Svelteライブラリには独自のテストがあり、Svelteが提供する実装の詳細をテストする必要はないことを覚えておくのが最善です。

テストを行うときにはいくつかの方法がありますが、一般的にはコンポーネントをコンパイルして何かにマウントし、テストを実行します。基本的には、テストするコンポーネントごとにバンドルを作成し(なぜなら、svelteはコンパイラであり、通常のライブラリではないからです。)、それらをマウントする必要があります。JSDOMインスタンスにマウントできます。また、Playwright、Puppeteer、Cypressなどのライブラリを備えた本物のブラウザを使うこともできる。

単体テストを始めるためのリソース:
- [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/example/)
- [Example using uvu test runner with JSDOM](https://github.com/lukeed/uvu/tree/master/examples/svelte)
