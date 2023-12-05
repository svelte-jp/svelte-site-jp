---
title: Snippets
---

Snippet、そして _render タグ_ は、コンポーネントの内側で再利用できるマークアップのチャンクを作成することができます。[このような](/#H4sIAAAAAAAAE5VUYW-kIBD9K8Tmsm2yXXRzvQ-s3eR-R-0HqqOQKhAZb9sz_vdDkV1t000vRmHewMx7w2AflbIGG7GnPlK8gYhFv42JthG-m9Gwf6BGcLbVXZuPSGrzVho8ZirDGpDIhldgySN5GpEMez9kaNuckY1ANJZRamRuu2ZnhEZt6a84pvs43mzD4pMsUDDi8DMkQFYCGdkvsJwblFq5uCik9bmJ4JZwUkv1eoknWigX2eGNN6aGXa6bjV8ybP-X7sM36T58SVcrIIV2xVIaA41xeD5kKqWXuqpUJEefOqVuOkL9DfBchGrzWfu0vb-RpTd3o-zBR045Ga3HfuE5BmJpKauuhbPtENlUF2sqR9jqpsPSxWsMrlngyj3VJiyYjJXb1-lMa7IWC-iSk2M5Zzh-SJjShe-siq5kpZRPs55BbSGU5YPyte4vVV_VfFXxVb10dSLf17pS2lM5HnpPxw4Zpv6x-F57p0jI3OKlVnhv5V9wPQrNYQQ9D_f6aGHlC89fq1Z3qmDkJCTCweOGF4VUFSPJvD_DhreVdA0eu8ehJJ5x91dBaBkpWm3ureCFPt3uzRv56d4kdp-2euG38XZ6dsnd3ZmPG9yRBCrzRUvi-MccOdwz3qE-fOZ7AwAhlrtTUx3c76vRhSwlFBHDtoPhefgHX3dM0PkEAAA=)重複するコードを書く代わりに…

```svelte
{#each images as image}
	{#if image.href}
		<a href={image.href}>
			<figure>
				<img
					src={image.src}
					alt={image.caption}
					width={image.width}
					height={image.height}
				/>
				<figcaption>{image.caption}</figcaption>
			</figure>
		</a>
	{:else}
		<figure>
			<img
				src={image.src}
				alt={image.caption}
				width={image.width}
				height={image.height}
			/>
			<figcaption>{image.caption}</figcaption>
		</figure>
	{/if}
{/each}
```

…[このように](/#H4sIAAAAAAAAE5VUYW-bMBD9KxbRlERKY4jWfSA02n5H6QcXDmwVbMs-lnaI_z6D7TTt1moTAnPvzvfenQ_GpBEd2CS_HxPJekjy5IfWyS7BFz0b9id0CM62ajDVjBS2MkLjqZQldoBE9KwFS-7I_YyUOPqlRGuqnKw5orY5pVpUduj3mitUln5LU3pI0_UuBp9FjTwnDr9AHETLMSeHK6xiGoWSLi9yYT034cwSRjohn17zcQPNFTs8s153sK9Uv_Yh0-5_5d7-o9zbD-UqCaRWrllSYZQxLw_HUhb0ta-y4NnJUxfUvc7QuLJSaO0a3oh2MLBZat8u-wsPnXzKQvTtVVF34xK5d69ThFmHEQ4SpzeVRediTG8rjD5vBSeN3E5JyHh6R1DQK9-iml5kjzQUN_lSgVU8DhYLx7wwjSvRkMDvTjiwF4zM1kXZ7DlF1eN3A7IG85e-zRrYEjjm0FkI4Cc7Ripm0pHOChexhcWXzreeZyRMU6Mk3ljxC9w4QH-cQZ_b3T5pjHxk1VNr1CDrnJy5QDh6XLO6FrLNSRb2l9gz0wo3S6m7HErSgLsPGMHkpDZK31jOanXeHPQz-eruLHUP0z6yTbpbrn223V70uMXNSpQSZjpL0y8hcxxpNqA6_ql3BQAxlxvfpQ_uT9GrWjQC6iRHM8D0MP0GQsIi92QEAAA=)書くことができます:

```diff
+{#snippet figure(image)}
	<figure>
		<img
			src={image.src}
			alt={image.caption}
			width={image.width}
			height={image.height}
		/>
		<figcaption>{image.caption}</figcaption>
	</figure>
+{/snippet}

{#each images as image}
	{#if image.href}
		<a href={image.href}>
+			{@render figure(image)}
		</a>
	{:else}
+		{@render figure(image)}
	{/if}
{/each}
```

snippet では最大で1つだけパラメータを受け取ることができます。関数の引数のように、分割することができます ([デモ](/#H4sIAAAAAAAAE5VTYW-bMBD9KyeiKYlEY4jWfSAk2n5H6QcXDmwVbMs2SzuL_z6DTRqp2rQJ2Ycfd_ced2eXtLxHkxRPLhF0wKRIfiiVpIl9V_PB_MTeoj8bOep6RkpTa67spRKV7dECH2iHBs7wNCOVdcFU1ui6gC2zVpmCEMVrMw4HxaSVhnzLMnLMsm26Ol95Y1kBHr9BDHnHbAHHO6ymynIpfF7LuAncwKgBCj0Xrx_5mMb2jh3f6KB6PNRy2AaXKf1fuY__KPfxj3KlQGikL5aQdpUxm-dTJUryUVdRsvwSqEviX2fIbYzgSvmCt7wbNe4ceMUpRIoUFkkpBBkw7ZfMZXC-BLKSDx3Q3p5djJrA-SR-X4K9DdHT6u-jo-flFlKSO3ThIDcSR6LIKUhGWrN1QGhs16LLbXgbjoe5U1PkozCfzu7uy2WtpfuuUTSo1_9ffPZrJKGLoyuwNxjBv0Q4wmdSR2aFi9jS2Pc-FIrlEKeilcI-GP4LfVtxOM1gyO1XSLp6vtD6tdNyFE0BV8YtngKuaNNw0RWQx_jKDlR33M9E5h-PQhZxfxEt6gIaLdWDYbSR191RvcFXv_LMb7p7obssXZ5Dvt_f9HgzdzZKibOZZ9mXmHkdTTpaefqsd4OIay4_hksd_I0fZMNbjk1SWD3i9Dz9BpdEPu8sBAAA)):

```svelte
{#snippet figure({ src, caption, width, height })}
	<figure>
		<img alt={caption} {src} {width} {height} />
		<figcaption>{caption}</figcaption>
	</figure>
{/snippet}
```

## Snippet scope

snippet はコンポーネントの内側ならどこでも宣言することができます。snippet は、その外側で宣言された値、例えば、`<script>` タグや `{#each ...}` ブロックで宣言された値を参照することができます ([デモ](/#H4sIAAAAAAAAE12P0QrCMAxFfyWrwhSEvc8p-h1OcG5RC10bmkyQ0n-3HQPBx3vCPUmCemiDrOpLULYbUdXqTKR2Sj6UA7_RCKbMbvJ9Jg33XpMcW9uKQYEAIzJ3T4QD3LSUDE-PnYA4YET4uOkGMc3W5B3xZrtvbVP9HDas2GqiZHqhMW6Tr9jGbG_oOCMImcUCwrIpFk1FqRyqpRpn0cmjHdAvnrIzuscyq_4nd3dPPD01ukE_NA6qFj9hvMYvGjJADw8BAAA=))…

```svelte
<script>
	let { message = `it's great to see you!` } = $props();
</script>

{#snippet hello(name)}
	<p>hello {name}! {message}!</p>
{/snippet}

{@render hello('alice')}
{@render hello('bob')}
```

…そして snippet は同じレキシカルスコープ (lexical scope) にある全てのもの (つまり、兄弟とその兄弟の子(siblings and children of those siblings)) から '見える(visible)' ようになっています:

```svelte
<div>
	{#snippet x()}
		{#snippet y()}...{/snippet}

		<!-- これは動作します -->
		{@render y()}
	{/snippet}

	<!-- これはエラーになります。`y` はスコープ外だからです -->
	{@render y()}
</div>

<!-- これもまたエラーになります。`x` はスコープ外だからです -->
{@render x()}
```

snippet は自分自身を参照することができますし、別の snippet を参照することもできます ([demo](/#H4sIAAAAAAAAE2WPTQqDMBCFrxLiRqH1Zysi7TlqF1YnENBJSGJLCYGeo5tesUeosfYH3c2bee_jjaWMd6BpfrAU6x5oTvdS0g01V-mFPkNnYNRaDKrxGxto5FKCIaeu1kYwFkauwsoUWtZYPh_3W5FMY4U2mb3egL9kIwY0rbhgiO-sDTgjSEqSTvIDs-jiOP7i_MHuFGAL6p9BtiSbOTl0GtzCuihqE87cqtyam6WRGz_vRcsZh5bmRg3gju4Fptq_kzQBAAA=)):

```svelte
{#snippet blastoff()}
	<span>🚀</span>
{/snippet}

{#snippet countdown(n)}
	{#if n > 0}
		<span>{n}...</span>
		{@render countdown(n - 1)}
	{:else}
		{@render blastoff()}
	{/if}
{/snippet}

{@render countdown(10)}
```

## Passing snippets to components

テンプレートの中では、snippet は他と同じように値として扱うことができます。そのため、props としてコンポーネントにわたすことができます ([デモ](/#H4sIAAAAAAAAE41SwY6bMBD9lRGplKQlYRMpF5ZF7T_0ttmDwSZYJbZrT9pGlv-9g4Fkk-xhxYV5vHlvhjc-aWQnXJK_-kSxo0jy5IcxSZrg2fSF-yM6FFQ7fbJ1jxSuttJguVd7lEejLcJPVnUCGquPMF9nsVoPjfNnohGx1sohMU4SHbzAa4_t0UNvmcOcGUNDzFP4jeccdikYK2v6sIWQ3lErpui5cDdPF_LmkVy3wlp5Vd5e2U_rHYSe_kYjFtl1KeVnTkljBEIrGBd2sYy8AtsyLlBk9DYhJHtTR_UbBDWybkR8NkqHWyOr_y74ZMNLz9f9AoG6ePkOJLMHLBp-xISvcPf11r0YUuMM2Ysfkgngh5XphUYKkJWU_FFz2UjBkxztSYT0cihR4LOn0tGaPrql439N-7Uh0Dl8MVYbt1jeJ1Fg7xDb_Uw2Y18YQqZ_S2U5FH1pS__dCkWMa3C0uR0pfQRTg89kE4bLLLDS_Dxy_Eywuo1TAnPAw4fqY1rvtH3W9w35ZZMgvU3jq8LhedwkguCHRhT_cMU6eVA5dKLB5wGutCWjlTOslupAxxrxceKoD2hzhe2qbmXHF1v1bbOcNCtW_zpYfVI8h5kQ4qY3mueHTlesW2C7TOEO4hcdwzgf3Nc7cZxUKKC4yuNhvIX_MlV_Xk0EAAA=)):

```svelte
<script>
	import Table from './Table.svelte';

	const fruits = [
		{ name: 'apples', qty: 5, price: 2 },
		{ name: 'bananas', qty: 10, price: 1 },
		{ name: 'cherries', qty: 20, price: 0.5 }
	];
</script>

{#snippet header()}
	<th>fruit</th>
	<th>qty</th>
	<th>price</th>
	<th>total</th>
{/snippet}

{#snippet row(d)}
	<td>{d.name}</td>
	<td>{d.qty}</td>
	<td>{d.price}</td>
	<td>{d.qty * d.price}</td>
{/snippet}

<Table data={fruits} {header} {row} />
```

オーサリングの都合上、snippet が直接コンポーネントの _内側で_ 宣言された場合、暗黙的にそのコンポーネントの props になります ([デモ](/#H4sIAAAAAAAAE41Sy27bMBD8lYVcwHYrW4kBXxRFaP-htzgHSqQsojLJkuu2BqF_74qUrfhxCHQRh7MzO9z1SSM74ZL8zSeKHUSSJz-MSdIET2Y4uD-iQ0Fnp4-2HpDC1VYaLHdqh_JgtEX4yapOQGP1AebrLJzWsXD-QjQi1lo5JMZRooNXeBuwHXoYLHOYM2OoiXkKv_GUwzYFY2VNFxvo0xtqxRR9F-7z04X8fE-uW2GtnJQ3E_tpvYV-oL9Ti0U2hVJFjMMZslcfW-5DWj9zShojEFrBuLCLZR_9CmzLQCwy-psw8rxBgvkNhhpZd8F8NppE7Stbq_8u-GTKS8_XQ9Keqnl5BZP1AzTYP2bDV7i7_9hLEeda0iocNJeNFDzJ0R5Fn142JzA-uzsdBfLhldPxPdMhIPS0H1-M1cYtlnejwdBDfBXZjHXTFOg4BhuOtvTfrVDEmAZG2ew5ezYV-Ew2fVzVAivNTyPHzwSr29AlMAe8f6g-zuWDts-GusAmdBSkv3P7qnB4GpMEEHwsRPEPV6yTe5VDJxp8iXClLRmtnGG1VHva3oCPHQd9QJsrbFd1Kzu-2Khvz8uzZsXqX3urj4rnMBNCXNUG83zf6Yp1C2yXKdxA_KJjGOfRfb0Vh7MKDShEuV-M9_4_nq6svF4EAAA=)):

```svelte
<!-- セマンティクス上、これは上記の例と同じです -->
<Table data={fruits}>
	{#snippet header()}
		<th>fruit</th>
		<th>qty</th>
		<th>price</th>
		<th>total</th>
	{/snippet}

	{#snippet row(d)}
		<td>{d.name}</td>
		<td>{d.qty}</td>
		<td>{d.price}</td>
		<td>{d.qty * d.price}</td>
	{/snippet}
</Table>
```

コンポーネントタグの内側にある、snippet 宣言ではないコンテンツは、暗黙的に `children` snippet の一部になります ([デモ](/#H4sIAAAAAAAAE41S247aMBD9lVFYCegGsiDxks1G7T_0bdkHJ3aI1cR27aEtsvzvtZ0LZeGhiiJ5js-cmTMemzS8YybJ320iSM-SPPmmVJImeFEhML9Yh8zHRp51HZDC1JorLI_iiLxXUiN8J1XHoNGyh-U2i9F2SFy-epon1lIY9IwzRwNv8B6wI1oIJXNYEqV8E8sUfuIlh0MKSvPaX-zBpZ-oFRH-m7m7l5m8uyfXLdOaX5X3V_bL9gAu0D98i0V2NSWKwQ4lSN7s0LKLbgtsyxgXmT9NiBe-iaP-DYISSTcj4bcLI7hSDEHL3yu6dkPfBdLS0m1o3nk-LW9gX-gBGss9ZsMXuLu32VjZBdfRaelft5eUN5zRJEd9Zi6dlyEy_ncdOm_IxsGlULe8o5qJNFgE5x_9SWmpzGp9N2-MXQxz4c2cOQ-lZWQyF0Jd2q_-mjI9U1fr4FBPE8iuKTbjjRt2sMBK0svIsQtG6jb2CsQAdQ_1x9f5R9tmIS-yPToK-tNkQRQGL6ObCIIdEpH9wQ3p-Enk0LEGXwe4ktoX2hhFai5Ofi0jPnYc9QF1LrDdRK-rvXjerSfNitQ_TlqeBc1hwRi7yY3F81MnK9KtsF2n8Amis44ilA7VtwfWTyr-kaKV-_X4cH8BTOhfRzcEAAA=)):

```diff
<Table data={fruits}>
-	{#snippet header()}
-		<th>fruit</th>
-		<th>qty</th>
-		<th>price</th>
-		<th>total</th>
-	{/snippet}
+	<th>fruit</th>
+	<th>qty</th>
+	<th>price</th>
+	<th>total</th>

	<!-- ... -->
</Table>
```

```diff
<script>
-	let { data, header, row } = $props();
+	let { data, children, row } = $props();
</script>

<table>
-	{#if header}
+	{#if children}
		<thead>
-			<tr>{@render header()}</tr>
+			<tr>{@render children()}</tr>
		</thead>
	{/if}

	<!-- ... -->
</table>
```

> コンポーネントの内側にコンテンツがある場合、`children` という名前の props を持つことはできません。このため、`children` という名前の props は避けるべきです。

## Snippets and slots

Svelte 4 では、コンポーネントにコンテンツを渡すのに [slot](https://svelte.jp/docs/special-elements#slot) を使用します。snippet はよりパワフルで柔軟であるため、slot は Svelte 5 では非推奨です。

しかし、まだ slot を使用することはでき、コンポーネントで snippet と slot を組み合わせることができます。

## Typing snippets

現時点では、snippet とそのパラメータに型を付けることはできません。Svelte 5 をリリースする前に取り組みたいと考えています。
