---
title: Old vs new
---

このページでは、新しい API で書かれたコードとそうでないコードを比べるとどのように見えるか、おおまかな概要を説明することを意図しています。コンポーネントが1つしかないようなもっともシンプルなタスクの場合、そこまで違いがないことがおわかりいただけると思います。より複雑なロジックの場合は、新しい API が物事をシンプルにすることをご覧いただけると思います。

## Counter

`$state`、`$derived`、`$effect` rune は、魔法の `let` 宣言、`$: x = ...`、`$: { ... }` を置き換えます。イベントハンドラはイベント属性として書くことができるようになりましたが、実質的にはコロンを取り除くだけです。

- [Before](/#H4sIAAAAAAAAE0VP0Q6CMAz8lbqYAGqC-jiBxH_wTXzQUWRxbgQ6E7Ps34VN40vbu8u1V8daqXBk_OyYvj6RcXbse7Zh9O5nML5QEU54NHYQM1OMYpA9VbWuSSGBMFYTlLA9zMySQ2PsTeHERGUF-6B8VRdmki2kUa9gt81-dE1XhQOlyckY6OS9WyRZdJOf21SK_B9AFzdLZDQYzYWS4lG6NIOyiqfXax9SuoA85OBitrAlOqvptadpZCuxYZwGi_7iP__ps0sVAQAA)
- [After](/#H4sIAAAAAAAAE0VPzW7CMAx-FRMhkQ4k2I6lrbR32I3uUBJnRAtJlThIKMq7jzSgHSzr-_FnOzGlDQbWnhKz0xVZyz7nme0Y3ecCwg0N4QMHF70oTBeE1zMNox3JIIFw0RL0sA40EfJDc3wp0sWzwSJJ9PqGklfvG3xUU6k1KoWCOG-gHyAtNGkFT-8A74fmRY80GfTEN1_OwUX_XFabZxDl0nJB3f7_QNudI5Gz4GwrjBa_fap7lvDtNi9fpAVl2EOqJ-eSUieHx-tXJ7XSKFlLPmL-zn8TVUg5NQEAAA==)

```diff
<script>
-	let count = 0;
-	$: double = count * 2;

-	$: {
+	let count = $state(0);
+	let double = $derived(count * 2);
+	$effect(() => {
		if (count > 10) {
			alert('Too high!');
		}
-	}
+	});
</script>

-<button on:click={() => count++}>
+<button onclick={() => count++}>
	{count} / {double}
</button>
```

## Tracking dependencies

非 rune モードでは、`$:` ステートメントの依存関係(dependencies)は _コンパイル時(compile time)_ に追跡されます。`a` と `b` の変更は `sum` の再計算だけを発生させます。なぜなら、その式である `add(a, b)` が `a` と `b` の値を参照しているからです。

rune モードでは、依存関係(dependencies)は _実行時(run time)_ に追跡されます。`a` か `b` が変更されるたびに (`add` 関数に渡された場合であろうとクロージャ経由でアクセスされた場合であろうと) `sum` は再計算されます。これにより、よりメンテナンスしやすい、リファクタリングしやすいコードになります。

- [Before](/#H4sIAAAAAAAAE3WPwarDIBBFf2WQLlpSSNfWCP2Opgs1BuQlRnQsFPHfO0lpSxdvMcK5c4YZCxvdZBPj18K8mi3j7BICOzJ8hBXS3U5oidOSo1kTkUx0AWXve5wsgoIOTuc36Q_tOKQ8E6ph2Ksj6MMWrzVmb9At_tuCsvUwWsyRcmhAb3rtvWi_G73QGZEmF8_N5MxfV_YH6CSopqmSHtG-BPm_qldV_6pBFlVpadGVLi50eBVtkPTveRnc6OzAOMZs660-AQKQKZYyAQAA)
- [After](/#H4sIAAAAAAAAE3WQ3WrDMAyFX8WYXqSkkF5njqHPsfTCPwqYJo6x5cIwfvfKKWMMthuBvnMkHVT44lZIfPws3KsN-MhvIfALx6_QmvSEFYH6tOdoGhHJRBdQzn7GFZApNrFTQoXQXc8f31T_SVPeGrcQ3RNsp6ztzodK-pK9Qbd7dlBWGpsxAuZIjPVMH2vq7MXwE8ELnRFpavejWZ15TIWGJ8lU31dJRQxvg_zfqptV_7YGWVSlo0VXSlwoeBVDkPSIbbducWD5iDFDvdcXqDJidUMBAAA=)

```diff
<script>
-	let a = 0;
-	let b = 0;
-	$: sum = add(a, b);
+	let a = $state(0);
+	let b = $state(0);
+	let sum = $derived(add());

-	function add(a, b) {
+	function add() {
		return a + b;
	}
</script>

-<button on:click={() => a++}>a++</button>
-<button on:click={() => b++}>b++</button>
+<button onclick={() => a++}>a++</button>
+<button onclick={() => b++}>b++</button>
<p>{a} + {b} = {sum}</p>
```

## Untracking dependencies

逆に、なにかしらの理由で、`a` が変更されたときに `sum` を再計算したいが、`b` が変更されたときには再計算したくないとします。

In non-runes mode, we 'hide' the dependency from the compiler by excluding it from the `$:` statement. In runes mode, we have a better and more explicit solution: [`untrack`](/docs/functions#untrack).
非 rune モードでは、`$:` ステートメントから外すことでコンパイラから依存を '隠し' ます。rune モードでは、より良い、より明示的なソリューションがあります: [`untrack`](/docs/functions#untrack) です。

- [Before](/#H4sIAAAAAAAAE3WPwYrDIBCGX2WQHhJSyJ6tEfocmz2oMSBNjOi4sIjvvpO0u6WHHhz4_vmGGQub3WIT45-FebVaxtk1BHZm-BN2SN92QUucthzNnohkogsoRz_iYhEUDPBx-SP9TycOKa-Eapoa1R7Z_ubsDbrNP3IoRwOjxRwphA704dbRi_65ywudEWls89wsztyG0rQwSFBdVyUV0d8F-V7Vu6pf1SCLqrS06Eq3Fjq5ij5I-vG6TW52dmIcY7b1q_4CeJwNvCwBAAA=)
- [After](/#H4sIAAAAAAAAE3WQ3WrEIBBGX2WQwiakkF5nE6HP0fTCv4BsoqLjQhHfvWPTpRTaG2GOx49vLGyzu0lseivMicOwib2GwJ4ZfoQ2pLvZ0dCcfI6qkTmpaAPy1a1oj-AjQoHsMAp1gwpb9AdczmeXK0mk7QZBwAJPCQWa7qW_Pqj8k6Z8NK5NtHejO6F11_ffWVt2Cq138EWhNLZiNJgjMRgeVTq6XDjIM7Wubh5_irtZZkQK8W5Su1W3pZy6GIbK6ZjHU-D_q7Kp8rcaeBGVOhRZaYFCe9R5DJy-7_DabtZoNmHMpr7XT7Bzqxt5AQAA)

```diff
<script>
+	import { untrack } from 'svelte';

-	let a = 0;
-	let b = 0;
-	$: sum = add(a);
+	let a = $state(0);
+	let b = $state(0);
+	let sum = $derived(add());

-	function add(a) {
-		return a + b;
+	function add() {
+		return a + untrack(() => b);
	}
</script>

-<button on:click={() => a++}>a++</button>
-<button on:click={() => b++}>b++</button>
+<button onclick={() => a++}>a++</button>
+<button onclick={() => b++}>b++</button>
<p>{a} + {b} = {sum}</p>
```

## Simple component props

```diff
<script>
-	export let count = 0;
+	let { count = 0 } = $props();
</script>

{count}
```

## Advanced component props

```diff
<script>
-	let classname = '';
-	export { classname as class };
+	let { class: classname, ...others } = $props();
</script>

<pre class={classname}>
-	{JSON.stringify($$restProps)}
+	{JSON.stringify(others)}
</pre>
```

## Autoscroll

チャットウィンドウを作るとき、新しいメッセージが来たときに画面の最下部まで自動スクロールする機能 (ただし元々最下部までスクロール済の場合のみ) を実装するには、更新前に DOM を計測する必要があります。

Svelte 4 では、`beforeUpdate` でこれに対応していましたが、これには欠点がありました。関連があろうとなかろうと、すべての更新の前に実行されてしまいます。以下の例では、`updatingMessages` のようなチェックを導入し、ダークモードに切り替えたときなどにスクロール位置が乱れないようにする必要があります。

rune の場合、`$effect.pre` (`$effect` と同じように動作するが DOM が更新される前に実行される) を使用することができます。effect の中で `messages` を明示的に参照している限り、`messages` が変更されるたびに実行されますが、`theme` が変更されるときは実行されません。

`beforeUpdate` と、その対の `afterUpdate` も同様に問題があるため、Svelte 5 では非推奨です。

- [Before](/#H4sIAAAAAAAAE31WXa_bNgz9K6yL1QmWOLlrC-w6H8MeBgwY9tY9NfdBtmlbiywZkpyPBfnvo2zLcZK28AWuRPGI5OGhkEuQc4EmiL9eAskqDOLg97oOZoE9125jDigs0t6oRqfOsjap5rXd7uTO8qpW2sIFEsyVxn_qjFmcAcstar-xPN3DFXKtKgi768IVgQku0ELj3Lgs_kZjWIEGNpAzYXDlHWyJFZI1zJjeh4O5uvl_DY8oUkVeVoFuJKYls-_CGYS25Aboj0EtWNqel0wWoBoLTGZgmdgDS9zW4Uz4NsrswPHoyutN4xInkylstnBxdmIhh8m7xzqmoNE2Wq46n1RJQzEbq4g-JQSl7e-HDx-GdaTy3KD9E3lRWvj5Zu9QX1QN20dj7zyHz8s-1S6lW7Cpz3RnXTcm04hIlfdFuO8p2mQ5-3a06cqjrn559bF_2NHOnRZ5I1PLlXQNyQT-hedMHeUEDyjtdMxsa4n2eIbNhlTwhyRthaOKOmYtniwF6pwt0wXa6MBEg0OibZec27gz_dk3UrZ6hB2LLYoiv521Yd8Gt-foTrfhiCDP0lC9VUUhcDLU49Xe_9943cNvEArHfAjxeBTovvXiNpFynfEDpIIZs9kFbg52QbeNHWZzebz32s7xHco3nJAJl1nshmhz8dYOQJDyZetnbb2gTWe-vEeWlrfpZMavr56ldb29eNt6UXvgwgFbp_WC0tl2RK25rGk6lYz3nUI2lzvBXGHhPZPGWmKUXFNBKqdaW259wl_aHbiqoVIZdpE60Nax6IOujT0LbFFxIVTCxCRR2XloUcYNvSbnGHKBp763jHoj59xiZWJI0Wm0P_m3MSS985xkasn-cFq20xTDy3J5KFcjgUTD69BHdcHIjz431z28IqlxGcPSfdFnrGDZn6gD6lyo45zyHAD-btczf-98nhQxHEvKfeUtOVkSejD3q-9X7JbzjGtsdUxlKdFU8qGsT78uaw848syWMXz85Waq2Gnem4mAn3prweq4q6Y3JEpnqMmnPoFRgmd3ySW0LLRqSKlwYHriCvJvUs2yjMaaoA-XzTXLeGMe45zmhv_XAno3Mj0xF7USuqNvnE9H343QHlq-eAgxpbTPNR9yzUkgLjwSR0NK4wKoxy-jDg-9vy8sUSToakzW-9fX13Em9Q8T6Z26uZhBN36XUYo5q7ggLXBZoub2Ofv7g6GCZfTxe034NCjiudXj7Omla0eTfo7QBPOcYxbE7qG-vl3_B1G-_i_JCAAA)
- [After](/#H4sIAAAAAAAAE31WXa-jNhD9K7PsdknUQJLurtRLPqo-VKrU1327uQ8GBnBjbGSb5KZR_nvHgMlXtyIS9njO-MyZGZRzUHCBJkhez4FkNQZJ8HvTBLPAnhq3MQcUFmlvVKszZ1mbTPPGbndyZ3ndKG3hDJZne7hAoVUNYY8JV-RBPgIt2AprhA18MpZZnIQ50_twuvLHNRrDSjRXj9fwiCJTBLIKdCsxq5j9EM4gtBU3QD8GjWBZd14xWYJqLTCZg2ViDyx1W4cz4dv0hsiB49FRHkyfsCgws3GjcTKZwmYLZ2feWc9o1W8zJQ2Fb62i5JUQRNRHgs-fx3WsisKg_RN5WVn4-WrvUd9VA9tH4-AcwbfFQIpkLWByvWzqSe2sk3kyjUlOec_XPU-3TRaz_75tuvKoi19e3OvipSpamVmupJM2F_gXnnJ1lBM8oLQjHceys8R7PMFms4HwD2lRhzeEe-EsvluSrHe2TJdo4wMTLY48XKwPzm0KGm2r5ajFtRYU4TWOY7-ddWHfxhDP0QkQhnf5PWRnVVkKnIx8fZsOb5dR16nwG4TCCRdCMphWQ7z1_DoOcp3zA2SCGbPZBa5jd0G_TRxmc36Me-mG6A7l60XIlMs8ce2-OXtrDyBItdz6qVjPadObzx-RZdV1nJjx64tXad1sz962njceOHfAzmk9JzrbXqg1lw3NkZL7vgE257t-uMDcO6attSSokpmgFqVMO2U93e_dDlzOUKsc-3t6zNZp6K9cG3sS2KGSUqiUiUmq8tNYoJwbmvpTAoXA96GyjCojI26xNglk6DpwOPm7NdRYp4ia0JL94bTqRiGB5WJxqFY37RGPoz3c6i4jP3rcUA7wmhqNywQW7om_YQ2L4UQdUBdCHSPiOQJ8bFcxHzeK0jKBY0XcV95SkCWlD9t-9eOM3TLKucauiyktJdpaPqT19ddF4wFHntsqgS-_XE01e48GMwnw02AtWZP02QyGVOkcNfk072CU4PkduZSWpVYt9SkcmJ64hPwHpWF5ziVls3wIFmmW89Y83vMeGf5PBxjcyPSkXNy10J18t3x6-a6CDtBq6SGklNKeazFyLahB3PVIGo2UbhOgGi9vKjzW_j6xVFFD17difXx5ebll0vwvkcGpn4sZ9MN3vqFYsJoL6gUuK9TcPrO_PxgzWMRfflSEr2NHPJf6lj1957rRpH8CNMG84JgHidUtXt4u_wK21LXERAgAAA==)

```diff
<script>
-	import { beforeUpdate, afterUpdate, tick } from 'svelte';
+	import { tick } from 'svelte';

-	let updatingMessages = false;
-	let theme = 'dark';
-	let messages = [];
+	let theme = $state('dark');
+	let messages = $state([]);

	let div;

-	beforeUpdate(() => {
+	$effect.pre(() => {
-		if (!updatingMessages) return;
+		messages;
		const autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 50;

		if (autoscroll) {
			tick().then(() => {
				div.scrollTo(0, div.scrollHeight);
			});
		}

-		updatingMessages = false;
	});

	function handleKeydown(event) {
		if (event.key === 'Enter') {
			const text = event.target.value;
			if (!text) return;

-			updatingMessages = true;
			messages = [...messages, text];
			event.target.value = '';
		}
	}

	function toggle() {
		toggleValue = !toggleValue;
	}
</script>

<div class:dark={theme === 'dark'}>
	<div bind:this={viewport}>
		{#each messages as message}
			<p>{message}</p>
		{/each}
	</div>

-	<input on:keydown={handleKeydown} />
+	<input onkeydown={handleKeydown} />

-	<button on:click={toggle}>
+	<button onclick={toggle}>
		Toggle dark mode
	</button>
</div>
```

## Forwarding events

[イベントハンドラ](event-handlers) が通常の属性になったため、"イベントをフォワードする(forwarding events)" コンセプトは、ただコールバック props を渡す、ということに置き換えられました。以前までは、フォワードしたイベントをすべて別々にマークする必要がありました。これもイベント属性で行えるようになりました…

```diff
<script>
+	let { onclick, onkeydown, ...attributes } = $props();
</script>

<button
-	{...$$props}
+	{...attributes}
-	on:click
-	on:keydown
+	{onclick}
+	{onkeydown}
>a button</button>
```

…しかし、実際にこの状況で本当にやりたかったことは、すべてのイベントをフォワードすることかと思います。以前は不可能でしたが、今は可能です:

```diff
<script>
+	let { ...props } = $props();
</script>

<button
-	{...$$props}
-	on:click
-	on:keydown
+	{...props}
>a button</button>
```

- [Before](https://svelte-5-preview.vercel.app/#H4sIAAAAAAAACn1Py2rDMBD8lWUJOIEg3xXb0P5G1YMjr4morBXSuhCM_z1xlLaXktMys8xrwdF5yqg_Fgz9RKjxLUY8olzjBvI3eaE7zjwnuzFNtslF6Uww4qbISeB9FuEAY-IJKlUXqIq0OpnQ1H-a0JT3Js9y9dQatOw5aUg0GNx4Dtp6Z7_aZX-AtoPeU5J99eBoALkQnB8m1WE1oe7u9SYe3OhoQC1ppvX4u6akvRxUvGBRSu12MXHMK_xU6PpnVFOX-0_Y53oDgvtVGEYBAAA=)
- [After](https://svelte-5-preview.vercel.app/#H4sIAAAAAAAACo1PQWrEMAz8ihCFJLA492wSaL9R95A6CjV1bGMrhcX4793Eu9tDe-hJmpFGmkm4aEMRu9eEdloJO3z2Hk_IF7-D-EWG6Yqj24LamT6qoD2P0krWq3eB4WVjdhaW4FaoRFugKNLqLG3f_mhsX8a7PPLF0CBROeNCB4FmiTvvrDJafQ6pbmAYYTIUuK4OjmbgD4L340bVZGnb8epudbNeNM3Ycdgonx5hyrP_5jHEkEAI4YPzETIM8HS0dfMrRrEA6b6dx-lmq29L_cPYW_4GVdmFa3EBAAA=)

## Passing UI content to a component

以前は、UI コンテンツをコンポーネントに渡すのに slot を使用していました。Svelte 5 ではこのためのより良いメカニズムとして [snippet](snippets) を提供します。デフォルトの slot に何かを渡すというシンプルなケースでは、コンポーネントを使用する側は何も変える必要はありません:

```svelte
<!-- same with both slots and snippets -->
<script>
	import Button from './Button.svelte';
</script>

<Button>click me</Button>
```

`Button.svelte` の中では、`<slot>` タグの代わりに `@render` を使用します。デフォルトのコンテンツは `children` prop として渡されます:

```diff
<script>
+	let { children } = $props();
</script>

<button>
-	<slot />
+	{@render children()}
</button>
```

コンポーネントの使用者側 (consumer) に props を渡すとき、snippet では物事を簡単に推論できるようになっており、`let:` ディレクティブの混乱しているセマンティクスを扱う必要がなくなります:

```diff
<!-- provider -->
<script>
+	let { children } = $props();
</script>

<button>
-	<slot prop="some value" />
+	{@render children("some value")}
</button>
```

```diff
<!-- consumer -->
<script>
	import Button from './Button.svelte';
</script>

- <Button let:prop>click {prop}</Button>
+ <Button>
+ 	{#snippet children(prop)}
+ 		click {prop}
+ 	{/snippet}
+ </Button>
```

イベント属性と併せて、学ぶべきコンセプトの数が減りました。コンポーネントの境界に関する全てのものが、props を通じて表現できるようになったのです。

- [Before](https://svelte-5-preview.vercel.app/#H4sIAAAAAAAACn2PzYrCQBCEX6XpSxTE3GeTgPoYzh5i0sHB-WOmIywh776ZjCgieOsqqvrrnnBQmiKK84S2NYQCD97jDvnPJxHvpJkWHd0YuuRUsQvKcyOtZGW8CwzHkdlZGIIzUOzLLPe5WvxIW5Wvjq0eaWdFp1V3q6fNFuoGWk2BN8UpedQDXwkua7LYzqCJhQ_Or1TJaxGm5MxpfV7ZLGca16tBUY-Cw0jz7vlVjnx97PJ-2MqqonYMCVTLJWoI7q0eSSKUTSLnzjJ-sn_nfxmfF-FdAQAA)
- [After](https://svelte-5-preview.vercel.app/#H4sIAAAAAAAACo2PzW6DMBCEX2XlVgIkBHcKUdo-RumBwqJYNbZlL5Eqy-9e_9DkkEtv3vHMzn6OrVygZd2HY3LakHXsVWtWM_rRcbBXFIRhtmo3c1R6Oxuu6TTKkfimlSF424mUhNWoDYqmzWOTo8XLKPv2npH94VZyFnz-HlxZwXCCSaChsniPGi5AF4SvZCwqn7rck5VcaySYL1wsBmWpjdKVj58jpWXgopQU1x52H_tz5ylwbGrhK8eFdWR29PUNO1v-Sy7CHe52SQ1N08RqCx4GeE7PsnpAz0Tg_twH2TmsWNDcwcZQuiFcJ7HjyKqEkLMh8Ajx6X8BPkQdmscBAAA=)
