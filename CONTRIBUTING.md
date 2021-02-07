# Svelte Site JP への貢献について

Svelte Site JPはSvelte公式ドキュメントサイトの日本語化プロジェクトです。
Svelteは素晴らしいツールで、公式ドキュメント及びチュートリアルも非常に素晴らしいです。公式からは英語版のみ提供されていますが、日本語に翻訳されたドキュメントとチュートリアルがあれば日本語話者にとってはもっと学習しやすくなると考えています。  

このリポジトリは[sveltejs/svelteのsiteディレクトリ](https://github.com/sveltejs/svelte/tree/master/site)をフォークして作成されており、ライセンスやコミュニティ・コラボレーションの精神についてはSvelte本体のそれを引き継ぎます。

Svelte公式のCONTRIBUTING.mdはこちらです、是非ご一読ください。

* [CONTRIBUTING.md - sveltejs/svelte](https://github.com/sveltejs/svelte/blob/master/CONTRIBUTING.md)


## 貢献するには

Svelte Site JPに貢献する方法はたくさんあり、その多くはコードを書く必要もなければ、いきなり翻訳する必要もありません。

- [日本語化されたドキュメントサイト](https://svelte-jp.herokuapp.com/)を使ってみてください。気になるところや改善点があれば[Issueを開いて](#issueを作成する)お知らせください。
- 翻訳にはみなさんの協力が必要です。翻訳に興味があれば[翻訳作業について](#翻訳作業について)をチェックしてみてください。完璧な翻訳は望んでいません。誤訳があっても誤字・脱字があっても単語が統一できていなくても構いません、後からみんなで良くしていければと考えています。

貢献は大歓迎です。もし貢献を迷っていたり、貢献に助けが必要であれば[Svelte日本のDiscord](https://discord.com/invite/YTXq3ZtBbx)で知らせてください。


## 翻訳作業について


### ディレクトリ構成・翻訳の仕組み

チュートリアルの原文はcontent/tutorial配下のそれぞれの章ごとに`text.md`というファイルから読み取られています。日本語翻訳は、その`text.md`をコピーして`text.ja.md`というファイルを作成して文章を翻訳します。  
(`text.ja.md`はホットリロードだと変更が反映されないのでご注意ください！)

```
.
├── content
│   ├── blog
│   ├── docs
│   ├── examples
│   ├── faq
│   └── tutorial
│       ├── 01-introduction
│       │   ├── 01-basics
│       │   │   ├── app-a
│       │   │   ├── text.ja.md  # ←日本語翻訳 原文をコピーして作成
│       │   │   └── text.md     # ←原文
etc...
```

※チュートリアル以外の翻訳は準備中です。


### 翻訳の流れ


#### 1. 翻訳するドキュメントを選ぶ

翻訳が必要な文書は[Issue](https://github.com/tomoam/svelte-site-jp/issues?q=is%3Aopen+is%3Aissue+label%3Atranslation)が作成されています。

まだ誰も着手していないIssueには`翻訳者募集中`というLabelがついています。翻訳したいものがあれば、Issueのコメントで知らせてください(堅苦しい挨拶などは不要です。「この翻訳やりましょうか？」と言っていただけたらそれだけでとても嬉しいです！)。

運営側から依頼する旨をコメントで返信しますので、その後に作業を開始してください。


#### 2. 環境設定

このリポジトリをForkし、セットアップしてください。

```
git clone https://github.com/{USER}/svelte-site-jp.git
cd svelte-site-jp
npm ci
npm run update
npm run dev
```

このあと[localhost:3000](http://localhost:3000)にアクセスし、正常に表示されることを確認します。


#### 3. 翻訳作業

[ディレクトリ構成・翻訳の仕組み](#ディレクトリ構成翻訳の仕組み)を参考に、担当する文書の翻訳を行います。いきなり完璧な翻訳を目指さなくても大丈夫です。

翻訳ができたらcommitし、Fork先にpushします。


#### 4. Pull Request作成

Fork元にPull Requestを提出してください。Pull RequestのコメントにはIssueの番号を含めてください。レビュー後、問題がなければマージされます。


## Issueを作成する

申し訳ありません、まだIssueを作成するためのテンプレートやガイドラインを準備できておりません。  
何かお気づきの点などがあってIssueを作成される場合は、ご自由に記載頂いて大丈夫です。  
例えば翻訳で不自然なところがあれば「〇〇の翻訳が不自然です」だけでもいいですし、良い言い回しや正しい翻訳があれば「{良い言い回し・正しい翻訳}ではどうですか」くらいで構いません。


## 備考

翻訳の進め方やCONTRIBUTING.mdに記載する内容などはAngularの日本語化プロジェクトである[angular-ja](https://github.com/angular/angular-ja)を参考にさせて頂きました。


## ライセンス

Svelte Site JPは[sveltejs/svelteのsiteディレクトリ](https://github.com/sveltejs/svelte/tree/master/site)をフォークして作成されており、ライセンス(MIT)を引き継いでいます。

Svelte Site JPに貢献することにより, あなたはあなたの貢献が[MIT license](https://github.com/tomoam/svelte-site-jp/blob/master/LICENSE)の下でライセンスされることに同意するものとします。
