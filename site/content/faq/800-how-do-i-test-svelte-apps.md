---
question: Svelteアプリケーションをテストするにはどうすればよいですか？
---

アプリケーションの構造、ロジックの定義によって、適切にテストするための最適な方法が決まります。データ変換、コンポーネント間の状態管理、ロギングなど、すべてのロジックがコンポーネント内にあるわけではないことに注意することが重要です。Svelteライブラリは独自のテストスイートを持っているので、Svelteが提供する実装の詳細を検証するためにテストを書く必要はないことを忘れないでください。

Svelteアプリケーションには、通常3種類のテストがあります： ユニット、コンポーネント、エンドツーエンド（E2E）です。

*ユニット テスト*： ビジネスロジックを分離してテストすることに重点を置いています。多くの場合、これは個々の機能やエッジケースを検証するものです。また、Svelteコンポーネントから可能な限り多くのロジックを抽出することで、より多くのアプリケーションをこれらのテストでカバーすることができます。新しいSvelteKitプロジェクトを作成する際、ユニットテストのために[Vitest](https://vitest.dev/)をセットアップするかどうか尋ねられます。その他にも、使用可能なテストランナーが多数あります。

*コンポーネント テスト*： Svelteコンポーネントがマウントされ、そのライフサイクルを通じて期待されるように相互作用することを検証するには、ドキュメントオブジェクトモデル（DOM）を提供するツールが必要です。コンポーネントはコンパイルして（Svelteはコンパイラであり、通常のライブラリではないため）マウントし、要素構造、リスナー、ステート、およびSvelteコンポーネントが提供する他のすべての機能に対してアサートすることができます。コンポーネントテストのためのツールは、jsdomのようなインメモリ実装と[Vitest](https://vitest.dev/)のようなテストランナーの組み合わせから、[Playwright](https://playwright.dev/docs/test-components)、[Cypress](https://www.cypress.io/)など、実際のブラウザを活用して視覚的なテスト機能を提供するソリューションまで、さまざまです。

*エンド・ツー・エンド テスト*： ユーザーがアプリケーションを操作できることを確認するために、可能な限り本番に近い方法で全体としてテストすることが必要です。これは、ユーザーがアプリケーションをどのように操作するかをシミュレートするために、アプリケーションのデプロイされたバージョンをロードして操作するエンドツーエンド（E2E）テストを書くことによって行われます。新しいSvelteKitプロジェクトを作成する際、エンドツーエンドテスト用に[Playwright](https://playwright.dev/)を設定するかどうか尋ねられます。他にも多くのE2Eテストライブラリがありますので、ご利用ください。

テストを始めるためのリソースをいくつか紹介します：
- [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/example/)
- [Svelte Component Testing in Cypress](https://docs.cypress.io/guides/component-testing/svelte/overview)
- [Example using vitest](https://github.com/vitest-dev/vitest/tree/main/examples/svelte)
- [Example using uvu test runner with JSDOM](https://github.com/lukeed/uvu/tree/master/examples/svelte)
- [Test Svelte components using Vitest & Playwright](https://davipon.hashnode.dev/test-svelte-component-using-vitest-playwright)
- [Component testing with WebdriverIO](https://webdriver.io/docs/component-testing/svelte)
