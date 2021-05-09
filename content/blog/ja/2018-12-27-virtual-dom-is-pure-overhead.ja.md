---
title: 仮想DOMは純粋なオーバーヘッド(Virtual DOM is pure overhead)
description: '仮想DOMは速い'という神話を完全に終わりにしよう
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

ここ数年でJavaScriptフレームワークを使ったことがある人なら、'仮想DOMは速い' というフレーズを聞いたことがあるでしょう、これはしばしば、実際のDOMよりも速い、という意味で言われることがあります。これは驚くほどしぶといミームです — 例えば、どうやってSvelteは仮想DOMを使わずに高速にできるのかを尋ねられることがありました。

では、じっくり見ていきましょう。


## 仮想DOMとは？(What is the virtual DOM?)

多くのフレームワークで、`render()`関数を作ってアプリを構築します。例えばシンプルな [React](https://reactjs.org/) コンポーネントでは:

```js
function HelloMessage(props) {
	return (
		<div className="greeting">
			Hello {props.name}
		</div>
	);
}
```

JSXを使わずに同じことをするなら…

```js
function HelloMessage(props) {
	return React.createElement(
		'div',
		{ className: 'greeting' },
		'Hello ',
		props.name
	);
}
```

…しかし、結果は同じで — ページがどのように見えるかを表現するオブジェクトになります。このオブジェクトは仮想DOMです。アプリのstateが更新されるたびに(例えば `name` prop が変わったとき)、これが新たに作成されます。フレームワークの仕事は、新しいオブジェクトと古いオブジェクトを*調整*し、どのような変更が必要か把握して、実際のDOMにそれを適用することです。


## このミームはどう始まった？(How did the meme start?)

仮想DOMのパフォーマンスに関する誤解された主張は、Reactの立ち上げまで遡ります。元ReactコアチームメンバーのPete Hunt氏による2013年の発展的な講演 [Rethinking Best Practices](https://www.youtube.com/watch?v=x7cQ3mrcKaY)で、私たちは次のことを学びました。

> これは実際には非常に高速で、主な理由は、ほとんどのDOM操作は遅くなる傾向があるからです。DOMには多くのパフォーマンス作業がありますが、ほとんどのDOM操作はフレームをドロップする傾向があります。  
> ※原文 : This is actually extremely fast, primarily because most DOM operations tend to be slow. There's been a lot of performance work on the DOM, but most DOM operations tend to drop frames.

<figure>
	<img alt="Pete Hunt at JSConfEU 2013" src="media/rethinking-best-practices.jpg">
	<figcaption>Screenshot from <a href="https://www.youtube.com/watch?v=x7cQ3mrcKaY">Rethinking Best Practices</a> at JSConfEU 2013</figcaption>
</figure>

しかし、ちょっと待ってください！　仮想DOMの操作は、実際のDOMに対する最終的な操作に *加えて* 行われます。これを高速だと主張するには、より非効率なフレームワークと比較するか(2013年にはたくさんありました)、もしくは、実際には誰もやらないような架空の代替案に対して反論するしかありません。。

```js
onEveryStateChange(() => {
	document.body.innerHTML = renderMyApp();
});
```

Peteはすぐ後に明確にしました…

> Reactは魔法ではありません。C言語でアセンブラを使用してCコンパイラに勝つことができるのと同様に、必要に応じて生のDOMとDOM APIを使えばReactに勝つことができます。しかし、C や Java、JavaScript を使うと、プラットフォームの詳細について心配する必要がなくなるため、パフォーマンスが桁違いに向上します。Reactを使うことで、パフォーマンスを気にすることなくアプリケーションを構築することができますし、デフォルトの state は高速です。  
> ※原文 : React is not magic. Just like you can drop into assembler with C and beat the C compiler, you can drop into raw DOM operations and DOM API calls and beat React if you wanted to. However, using C or Java or JavaScript is an order of magnitude performance improvement because you don't have to worry...about the specifics of the platform. With React you can build applications without even thinking about performance and the default state is fast.

…しかし、それは行き詰まった部分ではありません。



## それで…仮想DOMは遅い？(So... is the virtual DOM *slow*?)

その表現は正しくありません。'仮想DOMは大抵、十分に速い'というほうがより近いですが、いくつかの注意点があります。

Reactの当初の約束は、パフォーマンスを心配することなく、state が1つ変更されるたびにアプリ全体を再レンダリングできる、というものでした。実際には、それは正確ではないと思います。もしそうなら、`shouldComponentUpdate` (コンポーネントを安全にスキップできるときにReactに伝える方法)のような最適化は必要ないはずです。

`shouldComponentUpdate` を使ったとしても、アプリ全体の仮想DOMを一度に更新するのは大変な作業です。しばらく前に、ReactチームはReact Fiberと呼ばれるものを導入し、更新をより小さなチャンクに分割できるようになりました。これは (とりわけ) 更新によってメインスレッドが長時間ブロックされないことを意味しますが、総作業量や更新にかかる時間が減るわけではありません。


## オーバーヘッドはどこから？(Where does the overhead come from?)

ほぼ間違いなく、[差分検出のコストはゼロではありません](https://twitter.com/pcwalton/status/1015694528857047040)(原文 : diffing isn't free)。まず仮想DOMとその直前のスナップショットの比較をしないと、変更を実際のDOMに適用できません。先ほどの `HelloMessage` の例で言えば、`name` propが 'world' から 'everybody' に変わったとします。

1. どちらのスナップショットにも単一の要素が含まれています。どちらの場合もそれは `<div>` であり、同じ DOM ノードを維持できることを意味します。
2. 古い `<div>` と新しい `<div>` のすべての属性を列挙して、変更、追加、削除する必要があるか調べます。どちらも、値が `"greeting"` の `className` 属性だけがあります。
3. 要素に降りていくと、テキストが変更されていることがわかるので、実際のDOMを更新する必要があります。

この3つのステップのうち、今回のケースでは3番目のステップだけが価値を持ちます、というのも — ほとんどの更新がそうであるように — アプリの基本構造は変わっていないからです。3番目のステップに直接進むことができれば、より効率的です:

```js
if (changed.name) {
	text.data = name;
}
```

(これはSvelteが生成する更新のコードとほぼ同じです。従来のUIフレームワークとは異なり、Svelteは、*実行時*にこの作業をするのを待つのではなく、どのように変更されるか*ビルド時*にわかるコンパイラです)


## 差分検出だけではありません(It's not just the diffing though)

Reactや他の仮想DOMフレームワークで使われている差分検出アルゴリズムは高速です。議論の余地はありますが、より大きなオーバーヘッドはコンポーネント自体にあります。こんなコードは普通書かないと思います…

```js
function StrawManComponent(props) {
	const value = expensivelyCalculateValue(props.foo);

	return (
		<p>the value is {value}</p>
	);
}
```

…なぜなら、`props.foo` が変更されたかどうかに関わらず、更新のたびに不注意に `value` を再計算してしまうからです。しかし、もっと無害に見える方法で、不必要な計算やアロケーションが行われてしまうことは非常に一般的です:

```js
function MoreRealisticComponent(props) {
	const [selected, setSelected] = useState(null);

	return (
		<div>
			<p>Selected {selected ? selected.name : 'nothing'}</p>

			<ul>
				{props.items.map(item =>
					<li>
						<button onClick={() => setSelected(item)}>
							{item.name}
						</button>
					</li>
				)}
			</ul>
		</div>
	);
}
```

ここでは、`props.items` が変化したかどうかに関わらず、仮想的な `<li>` 要素の新しい配列（それぞれがインラインのイベントハンドラを持つ）をそれぞれの状態が変化するたびに生成しています。よっぽどパフォーマンスにこだわっていない限り、これを最適化することはないでしょう。意味がありません。これで十分に速いのですから。しかし、さらに速い方法がわかりますか？ *こうしないことです*。

<aside><p><a href="https://reactjs.org/docs/hooks-intro.html">React Hooks</a>は不必要な作業をデフォルトにするという賭けに出て、<a href="https://twitter.com/thekitze/status/1078582382201131008">予想通りの結果</a>になりました。</p></aside>

デフォルトで不必要な作業を行うことは危険で、たとえその作業が些細なものであっても、最適化の際に明確なボトルネックがないためにアプリがやがて 'じわじわと破滅に向かう'(原文 : death by a thousand cuts)ことに屈してしまいます。

Svelteは、そのような状況に陥らないよう明示的に設計されています。


## では、なぜフレームワークは仮想DOMを使うのか？(Why do frameworks use the virtual DOM then?)

重要なのは、仮想DOMは*機能ではない*ということです。それは目的を達成するための手段であり、その目的とは宣言的で状態駆動型のUI開発です。仮想DOMは、状態遷移を考えることなくアプリケーションを開発できるようにし、*一般的には十分な*パフォーマンスを得られるという点で価値があります。つまり、バグを減らし、退屈な作業ではなく創造的な作業に多くの時間を費やすことができるようになります。

しかし、仮想DOMを使用せずに同様のプログラミングモデルを実現できることがわかりました — つまりSvelteの登場です。
