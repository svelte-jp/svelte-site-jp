---
title: Fine-grained reactivity
---

In Svelte 4, reactivity centres on the _component_ and the top-level state declared therein. What this means is that in a situation like this...
Svelte 4 では、リアクティビティは _コンポーネント_ とそのトップレベルに宣言された state が中心でした。つまり、以下のような状況では…

```svelte
<script>
	let todos = [];

	function remaining(todos) {
		console.log('recalculating');
		return todos.filter((todo) => !todo.done).length;
	}

	function addTodo(event) {
		if (event.key !== 'Enter') return;

		todos = [
			...todos,
			{
				done: false,
				text: event.target.value
			}
		];

		event.target.value = '';
	}
</script>

<input on:keydown={addTodo} />

{#each todos as todo}
	<div>
		<input bind:value={todo.text} />
		<input type="checkbox" bind:checked={todo.done} />
	</div>
{/each}

<p>{remaining(todos)} remaining</p>
```

…個別の `todo` を編集するとリスト全体が無効化/最新化(invalidate)されます。この挙動を確認するには、[playground を開き](/#H4sIAAAAAAAAE2VSy27jMAz8FVV7cAIE8t21DfSwf7C3OgdVohOhCmXIdLaF4H9fPewE6N7I0ZAzpBj4aCzMvHkPHOUNeMPfpomfOH1PKZnvYAliPrvFq4S0s_Jmon7AgSwQI6fdzDr2fn6NUATHBRUZh8zDTRo0eDlkzpGF9DyQcjg7C8K6y6HyoKRVi5UUidXxtVA80OKx9BbRIYHPTVjXs5cUCO0QjsICXuiai9Yf6lLrP5F4gDsgPbTNyAoiPuGbvXQdq35j7F4dWdHchhjoMVdJBxJCZOy0A2EPBkpuGjZKO8PpiRJ8UcOKHEl_ARJ3aRfYGWsJzg_N_6nRQFXt87X1c_fYGpwWYg6bOIl2f7EL28grqzMj_AKprtsHyTkHWbLV5t4Xxa3Lh0HdZMEu5PUm61ufJyvdRDdwdQX1-eG-Bl7qcg56q0yr2CvbuiiFOjnJP9ROffh5GOvzVNp66uO13Zw2owHNG_ILrOf1H3DaaQeoAgAA)、todo を追加し、右下のコンソールを見てみてください。`remaining(todos)` は todo の `text` を編集するたびに再計算されます (結果には影響しないにも関わらず)。

さらに良くないことに、`each` ブロックの内側では全て更新をチェックする必要があります。リストがかなり大きくなると、この動作がパフォーマンスの頭痛の種になる可能性があります。

rune を使用すると、リアクティビティを _きめ細やか(fine-grained)_ にすることができます。つまり、必要なときに必要なものだけ更新されるようになります:

```diff
<script>
-	let todos = [];
+	let todos = $state([]);

	function remaining(todos) {
		console.log('recalculating');
		return todos.filter(todo => !todo.done).length;
	}

	function addTodo(event) {
		if (event.key !== 'Enter') return;

-		todos = [
-			...todos,
-			{
-				done: false,
-				text: event.target.value
-			}
-		];
+		todos.push({
+			done: false,
+			text: event.target.value
+		});

		event.target.value = '';
	}
</script>
```

[アプリのこのバージョン](/#H4sIAAAAAAAAE2VSy07EMAz8lRCQ2kqovZe2Egf-gBvlEBJ3N9qsUyXuAqr67-TRZSW4xfZ4xh5n5ZM24Hn7tnIUZ-Atf55n_sjpe46Bv4AhCLG3i5Mx03np9EzDiCMZIEZWWc969uBJEJRv79VTKIXitKAkbZE5OAuNGg9lwlZsjeWRpEVvDdTGHsrCgRRGLkZQABaJI0Ac0OIwa9RhUgKXSFg_sLv4qJVFqGoDeKBjatr-qAulXgOwhAsg_WrrieVMfYJvdtf3rHjBwF5ULGvuS4yUtefFH8u9d6Qo2rJJGA-P1xzBF7Usc5JwB6D6IswCub5Vv4T_IcG9orgO3zU3g7HTOC_ELLZhTGU_sV_3fTbWJMR6D0Ie9ysInx7RAuqUvgxZcWf50KjaJNivybs48s5zQ8XD9yOXR5CnD_s18tyXYlB7ZzTg2tk1WWlt4iTJ_m4e1r9X327_oGvmIXyps1V60qB4S26B7X37AXGd34ONAgAA)では、todo の `text` を編集しても関係ない部分は更新されません。
