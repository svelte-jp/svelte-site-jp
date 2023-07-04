---
title: "What's new in Svelte: 2021年12月"
description: "Svelte Summit Fall 2021 の要約、Rich Harris が Vercel にジョイン、Kevin は Svelte Society でフルタイムに"
author: Dani Sandoval
authorURL: https://dreamindani.com
---
> 翻訳 : Svelte日本コミュニティ  
> 原文 : https://svelte.dev/blog/whats-new-in-svelte-december-2021
> 
> 日本語版は原文をよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはsvelte.devの原文を参照してください。  
> 日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

SvelteKit が日に日に stable に近づいてきて、バグフィックス以外のコード変更の観点では取り上げられることがなくなってきました… そのため、今月のニュースレターでは、Svelte Summit Fall 2021 を取り上げます！

もしこの1か月間のバグフィックスを深く知りたければ、[Svelte](https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md) と [SvelteKit](https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md) の changelogs をそれぞれチェックしてみてください。

## What happened at Svelte Summit?

もし Svelte Summit を見逃したなら、全ての配信を [YouTube](https://www.youtube.com/watch?v=1Df-9EKvZr0) で視聴できますし、[Discord の #svelte-summit チャンネル](https://discord.gg/YmHcdnhu) で要約をチェックできます。

ハイライトはこちら:

- [Rich Harris](https://twitter.com/rich_harris) は Svelte の歴史ツアーを案内し、[Vercel への入社](https://vercel.com/blog/vercel-welcomes-rich-harris-creator-of-svelte) を発表しました - 今後は Svelte のメンテナンスをフルタイムで行います！([20:00](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=1200s))
- [Steph Dietz](https://twitter.com/steph_dietz_) は、なぜSvelteのシンプルな抽象化が、初心者から上級者まで、JavaScriptを学び使うのを(それもボイラープレートなしで)簡単にできるのか説明しました ([29:00](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=1740s))
- [Kevin Bridges](https://twitter.com/kevinast) は、Svelte の リアクティビティロジックを `ReflectiveCounter` によって可視化し、必要に応じて "微調整" する方法を見せてくれました。プレゼンテーションの完全な "シラバス" [Kevin のサイト](https://wiibridges.com/presentations/ResponsiveSvelte/) で入手できます ([42:55](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=2575s))
- [Mateo Morris](https://twitter.com/_mateomorris) は [Primo](https://primo.af/) を立ち上げました。これは静的サイトを構築しビルドするのに役立つ all-in-one の SvelteKit CMS です ([1:12:34](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=4354s))
- [Guillermo Rauch](https://vercel.com/about/rauchg) は、Vercel の Svelte に対するコミットメント、Rich をチームに迎え入れたことが何を意味するか、今後の展望について説明しました… ([1:21:54](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=4914s))
- [Geoff Rich](https://twitter.com/geoffrich_) は、Svelte のモーションとトランジションを、Webの全てのユーザーにとってアクセシブルなものになるように改善する様々な方法を紹介しました。講演のスライドと文字起こしの全文は [Geoff のサイト](https://geoffrich.net/posts/svelte-summit-2021/) から入手できます。 ([1:32:30](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=5550s))
- [Dean Fogarty](https://df.id.au/) は、Svelteのメカニズムを使用し、データを storage に、または storage から変換するカスタムストアの様々なユースケースをデモしました。文字起こしとコードは [Dean の GitHub](https://github.com/angrytongan/svelte-summit-2021) から入手できます。 ([1:43:06](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=6186s))
- [Kellen Mace](https://twitter.com/kellenmace) は、コンテンツ制作者が WordPress を使い続けながら、フロントエンドで Svelte を活用し、素晴らしいユーザーエクスペリエンスを提供する方法についてシェアしました ([1:49:30](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=6570ss))
- [Ben Holmes](https://twitter.com/bholmesdev) は、"islands" アーキテクチャと、11ty + [Slinkity](https://slinkity.dev/) によってどんな HTML テンプレートにも islands をもたらすことができる方法について説明しました ([2:17:15](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=8235s))
- [Scott Tolinski](https://twitter.com/stolinski) は、React ベースの LevelUpTutorials を Svelte で書き換えて得た教訓と、"開発者の至福を発見" したことをシェアしました ([3:16:35](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=11795s))
- [Svelte Sirens](https://sveltesirens.dev) は、女性とノンバイナリーとその味方のための新しい Svelte コミュニティとして発表されました。最初のイベントは11月29日で、今後のイベントはすべて [Svelte Sirens の website](https://sveltesirens.dev/events) で見つけることができます ([3:50:45](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=13845s))
- [Rich Harris](https://twitter.com/rich_harris) は、SvelteKit を使ったライブラリ作成、開発時のパッケージへのリンクのより良い方法、SvelteKit が最新の JavaScript ライブラリ開発で役立つ方法について話しました ([3:56:00](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=14160s))
- [Ken Kunz](https://twitter.com/kennethkunz) は、有限状態機械(及び svelte-fsm ライブラリ) によって、Svelte コンポーネントの状態などをより管理しやすくする方法について説明しました。講演の例は [Ken の GitHub](https://github.com/kenkunz/svelte-fsm/wiki/Examples) で入手できます。 ([4:07:18](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=14838s))
- [Austin Crim](https://twitter.com/crim_codes) は、Webでコードを学ぶことを楽器の演奏方法を学ぶことになぞらえています。学習者に早く成功体験を与え、現実世界のアプリを通して基礎を紹介することで、Svelte (及びその下地となる基礎) を学ぶことが簡単になります ([4:21:50](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=15710s))
- [Jesse Skinner](https://twitter.com/JesseSkinner) は、React (さらには jQuery) プロジェクトで Svelte コンポーネントを使用(及び再利用)する方法について説明し、レガシーアプリを未来に導きました ([4:32:30](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=16350s))
- [Jim Fisk](https://twitter.com/jimafisk) と [Stephanie Luz](https://stephanie-luz.medium.com/) は、Svelte サイトをより早く構築するための [Plenti](https://plenti.co/) とそのテーマ設定ツールを紹介しました ([4:59:00](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=17940s))
- [Evyatar Alush](https://twitter.com/evyataral) は、[Vest](https://github.com/ealush/vest) というパワフルなバリデーションライブラリを使用することでよりよいフォームを作成(そして維持)することができると教えてくれました ([5:08:55](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=18535s))
- Dominik G. は、アイコンライブラリに関するフレッシュな見解をプレゼンしました - それはアプリケーションのバンドルサイズを減らし、Svelteアプリで Iconfy ライブラリ 全てが使用できる、というものです ([5:30:04](https://www.youtube.com/watch?v=1Df-9EKvZr0&t=19804s))

このような素晴らしいイベントを開催して頂き、[Kevin](https://twitter.com/kevmodrome) と Svelte Society のボランティアの皆様に感謝いたします！エキサイティングなことに、イベント終了後に [Kevin が今後 Svelte Society にフルタイムで取り組む](https://twitter.com/kevmodrome/status/1463151477174714373) ことが発表されました！ [この Svelte Society の YouTube Playlist](https://www.youtube.com/playlist?list=PL8bMgX1kyZTg2bI9IOMgfBc8lrU3v2itt) で、個々のビデオに分割された全ての講演をチェックすることができます。

Svelte Summit にフィードバックがあれば、Kev が [Svelte subreddit でフィードバックを募集しています](https://www.reddit.com/r/sveltejs/comments/qzgo3k/svelte_summit_feedback/) 👀

---

## Community Showcase

**Apps & Sites**

- [pixeldrain](https://github.com/Fornaxian/pixeldrain_web) は無料で使えるファイル共有プラットフォームです
- [LifeHash](http://lifehash.info/) は、Blockchain Commons から美しいビジュアルハッシュを生成します
- [simple-cloud-music](https://github.com/dufu1991/simple-cloud-music) は、モダンブラウザ向けの軽量なサードパーティーの NetEase cloud ミュージックプレーヤーです (Chrome でのみ動作するようです)
- [palette.rocks](https://palette.rocks/) はコントラストチェック機能を備えたカラーパレットジェネレーターです
- [Kadium](https://github.com/probablykasper/kadium) は、YouTubeチャンネルのアップロードを常に把握するためのアプリです
- [Multi-Monitor Calculator](https://multimonitorcalculator.com/) は、マルチモニターのセットアップを計画するためのツールです
- [Your Home](https://yourhome.fb.com/) は、Facebook のプライバシー設定のインタラクティブなオーバービューです
- [Svelte Crush](https://svelte-crush.netlify.app/) は、Candy Crush スタイルの match-3 ゲームです
- [100.000 Corona deaths in Germany](https://twitter.com/h_i_g_s_c_h/status/1463767113563353089?s=20) は、Spiegel Gesundheit のために作られたビジュアライゼーションです

**何か取り組める Svelte プロジェクトをお探しですか？ Web における Svelte のプレゼンスを高めることに興味がありますか？** もし Svelte Society を SvelteKit に置き換えることに貢献したいなら、[open issue のリスト](https://github.com/svelte-society/sveltesociety-2021/issues) をチェックしてみてください。

**Videos, Blogs and Podcasts**

- [How To Make and Publish a Svelte Library](https://www.youtube.com/watch?v=_TymiadmPrc)
- [SvelteKit is now fully supported in WebContainers](https://blog.stackblitz.com/posts/sveltekit-supported-in-webcontainers/)
- [Introducing Svelte, and Comparing Svelte with React and Vue](https://joshcollinsworth.com/blog/introducing-svelte-comparing-with-react-vue)
- [Testing a Svelte app with Jest](https://www.roboleary.net/2021/11/18/svelte-app-testing-jest.html)
- [How to create a toast notification library package with SvelteKit](https://www.sarcevic.dev/blog/toasting-in-svelte)
- [Svelte training: Here you can learn Svelte](https://sustainablewww.org/principles/svelte-training-here-you-can-learn-svelte)
- [Introduction to Svelte Actions](https://blog.logrocket.com/svelte-actions-introduction/)
- [Enjoy making DAPPs using SvelteWeb3](https://chiuzon.medium.com/enjoy-making-dapps-using-svelteweb3-b78dfea1d902)
- [Svelte creator: Web development should be more fun](https://www.infoworld.com/article/3639521/svelte-creator-web-development-should-be-more-fun.html)
- [Svelte Radio: Rich Harris is now working full-time on Svelte 🤯](https://share.transistor.fm/s/d9b04961)
- [Web Rush: Svelte and Elder.js with Nick Reese](https://webrush.io/episodes/episode-158-svelte-and-elderjs-with-nick-reese)
- [Building SvelteKit applications with Serverless Redis](https://blog.upstash.com/svelte-with-serverless-redis)

**Libraries, Tools & Components**

- [svelte-cubed](https://github.com/Rich-Harris/svelte-cubed) は Svelte 向けの Three.js コンポーネントライブラリです - Rich Harris によって開発され、Svelte Summit Fall 2021 の彼の講演でプレゼンされました
- [svelte-fsm](https://github.com/kenkunz/svelte-fsm) は、小さく、シンプルで、表現力があり、プラグマティックな有限状態機械(Finite State Machine (FSM))ライブラリで、Svelte に最適化されています
- [bromb](https://github.com/samuelstroschein/bromb) は、Web サイトや Web アプリ向けのフィードバックウィジェットで、小さく、インテグレーション/セルフホストが簡単です
- [Spaper](https://github.com/Oli8/spaper) は Svelte 向けの PaperCSS コンポーネントのセットです
- [svelte-intl-precompile](https://github.com/cibernox/svelte-intl-precompile) は Svelte 向けの i18n ライブラリで、ビルド時に翻訳を解析します
- [svelte-preprocess-svg](https://github.com/svitejs/svelte-preprocess-svg) は Svelte コンポーネントにある inline svg を自動的に最適化し、ファイルサイズを減らしより良いパフォーマンスをもたらします
- [svelte-subcomponent-preprocessor](https://github.com/srmullen/svelte-subcomponent-preprocessor) は、Svelte ファイルに1つ以上のコンポーネントを書くことができるようにしてくれます
- [svelte-pdfjs](https://github.com/gtm-nayan/svelte-pdfjs) は、Svelte の PDF viewer コンポーネントのおおまかな実装です
- [svelte-inview](https://github.com/maciekgrzybek/svelte-inview) は、viewport/親要素 への要素の出入りを監視する Svelte action です
- [sveltekit-adapter-wordpress-shortcode](https://github.com/tomatrow/sveltekit-adapter-wordpress-shortcode) は、アプリを wordpress shortcode にする SvelteKit の アダプター(adapter) です
- [svelte-websocket-store](https://github.com/arlac77/svelte-websocket-store) は、websocket をバックエンドにした Svelte ストアです
- [Svelte Auto Form](https://github.com/leveluptuts/auto-form) は、柔軟性よりも使いやすさを重視した、高速で楽しいフォームライブラリです
- [set-focus](https://www.npmjs.com/package/@svackages/set-focus) は、`<a>` や `<button>` 要素がマウントされるとすぐに focus をセットする Svelte action で、なんらかのケースやテストに便利です

SvelteKit に関するアイデアをお持ちですか？Svelte リポジトリの新しい [GitHub Discussions](https://github.com/sveltejs/kit/discussions) をチェックしてみてください。また、[Reddit](https://www.reddit.com/r/sveltejs/) や [Discord](https://discord.com/invite/yy75DKs) にもご参加いただけます。

また ~~来月~~ 来年お会いしましょう！
