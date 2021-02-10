<script>
	export let selected;
	export let item;
</script>

<style>
	.a.selected {
		color: var(--prime);
	}
	.a:hover {
		color: var(--flash);
	}

	li.item {
		display: block;
		text-align: center;
	}

	li.item span {
		font-size: var(--h5);
		padding: 0.7rem 3.7rem 0.7rem 3.7rem;
		display: block;
	}
</style>

<li class="item" style="text-align: center;">
	<span class="a" class:selected href={`#!${item}`} on:click>
		<slot />
	</span>
</li>
