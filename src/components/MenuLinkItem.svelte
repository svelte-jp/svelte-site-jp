<script>
	export let href;
</script>

<style>
	li.item {
		display: block;
		text-align: center;
	}

	li.item a.a {
		padding: 0.7rem 2.8rem 0.7rem 2.8rem;
		display: block;
	}

	li.item span {
		font-size: var(--h5);
		white-space: nowrap;
	}
</style>

<li class="item" style="text-align: center;">
	<a class="a" href={href} target="_blank" rel="noopener">
		<span>
			<slot />
		</span>
	</a>
</li>
