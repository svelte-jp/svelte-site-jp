---
title: Inline styles
---

style タグの内側にスタイルを追加するのとは別に、style 属性を使用して個々の要素にスタイルを追加することもできます。大抵、CSS を通してスタイリングをしたいと思いますが、動的なスタイルには、特に CSS カスタムプロパティと組み合わせるときはこのほうが便利です。

以下の style 属性を paragraph 要素に追加します:
`style="color: {color}; --opacity: {bgOpacity};"`

素晴らしい、可能な値全てに対しクラスを作成することなく input に基づいて変更される変数によって paragraph をスタイリングすることができます。
