---
title: コード量を減らす(Write less code)
description: 注意が払われていない最も重要な指標について
author: Rich Harris
authorURL: https://twitter.com/Rich_Harris
---
> 翻訳 : Svelte日本コミュニティ  
> 
> 日本語版はオリジナルをよりよく理解するための参考となることを目的としています。  
> 正確な内容についてはオリジナルである英語版を参照してください。  
> また、日本語訳に誤解を招く内容がある場合は下記のいずれかからお知らせください。  
> - [svelte-jp/svelte-site-jp(GitHub)](https://github.com/svelte-jp/svelte-site-jp)
> - [Svelte日本(Discord)](https://discord.com/invite/YTXq3ZtBbx)

全てのコードにはバグがあります(All code is buggy)。したがって、書かなければいけないコードが多ければ多いほど、アプリケーションがバグだらけになるのは理にかなっています。

多くのコードを書くには多くの時間がかかるので、他のこと(例えば最適化や、良い機能を開発すること、またはPCの前に座らずに外出することなど)に充てられる時間は少なくなります。

実際、[プロジェクトの開発時間](https://blog.codinghorror.com/diseconomies-of-scale-and-lines-of-code/) と [バグ件数](https://www.mayerdan.com/ruby/2012/11/11/bugs-per-line-of-code-ratio) はコードベースのサイズに対して直線的ではなく*二次関数的*に増加することが広く知られています。これは私たちの直感と一致しています : 10行のプルリクエストは、100行のプルリクエストだと有り得ないレベルで精査されるでしょう。また、モジュールが1つの画面に収まりきらないほど大きくなると、それを理解するために必要な認知的努力が著しく増大します。リファクタリングし、コメントを追加することでこの問題に対応しようとしますが、ほとんどの場合コードがもっと増加します。悪循環です。

しかし、私たちはパフォーマンスの数値やバンドルサイズ、その他計測できるものはなんでも気にかける一方で、書いているコードの量に気を配ることはほとんどありません。


## 重要なのは読みやすさ(Readability is important)

私は、巧妙なトリックを使って読みやすさを犠牲にしてでもできるだけコードをコンパクトにするべきだ、と主張しているわけではありません。また、コードの*行数*を減らすことこそが価値のある目標であると主張しているわけでもありません、このような主張は、例えば次のような読みやすいコードを...

```js
for (let i = 0; i <= 100; i += 1) {
	if (i % 2 === 0) {
		console.log(`${i} is even`);
	}
}
```

...次のように解析がより難しいものに変えるよう奨励してしまいます:

```js
for (let i = 0; i <= 100; i += 1) if (i % 2 === 0) console.log(`${i} is even`);
```

私たちは代わりに、自然とコードが少なくなるような言語とパターンを好むべきだと主張します。


## はい、Svelteについて話しています(Yes, I'm talking about Svelte)

書かなければいけないコードの量を減らすことは、Svelteの明確な目標です。説明のために、React、Vue、Svelteでそれぞれ実装されたシンプルなコンポーネントを見てみましょう。まずはSvelteのバージョンです:

<div class="max">
	<iframe
		title="Simple component example"
		src="/repl/embed?example=blog-write-less-code"
		scrolling="no"
	></iframe>
</div>

これをReactで構築するには? おそらく次のようになるでしょう:

```js
import React, { useState } from 'react';

export default () => {
	const [a, setA] = useState(1);
	const [b, setB] = useState(2);

	function handleChangeA(event) {
		setA(+event.target.value);
	}

	function handleChangeB(event) {
		setB(+event.target.value);
	}

	return (
		<div>
			<input type="number" value={a} onChange={handleChangeA}/>
			<input type="number" value={b} onChange={handleChangeB}/>

			<p>{a} + {b} = {a + b}</p>
		</div>
	);
};
```

Vueで同等のことをやると次のようになります:

```html
<template>
	<div>
		<input type="number" v-model.number="a">
		<input type="number" v-model.number="b">

		<p>{{a}} + {{b}} = {{a + b}}</p>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				a: 1,
				b: 2
			};
		}
	};
</script>
```

<aside>
	<p>コードをクリップボードにコピーし、ターミナルで `pbpaste | wc -c` を実行してカウントします</p>
</aside>

つまり、Svelteだと145文字でできることが、Reactだと442文字、Vueだと263文字かかります。Reactバージョンは文字通り3倍大きいです!

ここまで差がつくのは中々珍しいケースです - 私の経験では、ReactコンポーネントはSvelteの同等のコンポーネントより大体約40%ほど大きいです。では、アイデアを簡潔に表現することを可能にするSvelteの設計の特徴を見ていきましょう。


### トップレベル要素(Top-level elements)

Svelteでは、1つのコンポーネントに好きなだけトップレベル要素を含めることができます。ReactやVueは、1つのコンポーネントには単一のトップレベル要素しか含めることができません - Reactの場合、コンポーネント関数から2つのトップレベル要素を返そうとすると構文的に誤ったコードになります。(`<div>` の代わりに `<>`を使用できますが、基本的な考え方は同じで、インデントが余分に発生します)

Vueの場合、`<template>`要素でラップしなければなりません、これは冗長です。


### バインディング(Bindings)

Reactでは、自分で入力イベントに対応しなければなりません。

```js
function handleChangeA(event) {
	setA(+event.target.value);
}
```

これは退屈で画面上に余分なスペースを取るだけでなく、余分なバグを生みかねません。概念的には、入力の値は `a` の値と結びついており、その逆も同様ですが、この関係が綺麗に表現されていません - その代わり、緊密に結合しているものの物理的には分離しているコードのチャンク(イベントハンドラと `value={a}` prop) になります。それだけでなく、`+` 演算子で文字列の値が強制(coerce)されることも忘れないようにしないといけません。さもないと、`2 + 2` が `4` ではなく `22` になってしまいます。

Svelteと同様、Vueにはバインディングを表現する方法があります - `v-model`属性です。ただし、数値入力であっても `v-model.number` を使うように気をつけなければなりません。


### State

Svelteでは、ローカルコンポーネントのstateを代入演算子で更新します。

```js
let count = 0;

function increment() {
	count += 1;
}
```

Reactでは、`useState`フックを使用します。

```js
const [count, setCount] = useState(0);

function increment() {
	setCount(count + 1);
}
```

これは*かなりノイジー(much noisier)*です。全く同じ概念を表現していますが文字が60%も多いです。コードを読む際に、その意図を理解するためにより多くの労力をかける必要があります。

一方Vueでは、デフォルトのエクスポートに `data`関数があり、ローカルのstateに対応するプロパティを持つオブジェクトリテラルを返します。ヘルパー関数や子コンポーネントなどは単純にインポートしてテンプレートで使用することはできません、デフォルトのエクスポートの正しい部分にアタッチして'登録'する必要があります。


## ボイラープレートに終焉を(Death to boilerplate)

これらはSvelteが最小限の手間でユーザーインタフェースを構築するのに役立つ方法のうち、ほんの一部に過ぎません。他には、例えば[reactive declarations](tutorial/reactive-declarations) はReactの`useMemo`、`useCallback`、`useEffect`をボイラープレート(または各stateの変更ごとのインライン関数と配列の作成に伴うガベージコレクションのオーバーヘッド)なしで行います。

どうやって？ 別の制約セットを選択します。[Svelteはコンパイラ](blog/frameworks-without-the-framework)なので、JavaScriptの特性に縛られません : 言語のセマンティクスに合わせるのではなく、コンポーネントのオーサリングエクスペリエンスを設計できます。逆説的に言えば、結果としてよりイディオムなコードが可能になります - 例えば、プロキシやフックを経由するのではなく、自然に変数を使用することができます - しかも、よりパフォーマンスの高いアプリを提供することができます。
