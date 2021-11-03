import { transition_in, transition_out } from './transitions';

export function destroy_block(block, lookup) {
	block.d(1);
	lookup.delete(block.key);
}

export function outro_and_destroy_block(block, lookup) {
	transition_out(block, 1, 1, () => {
		lookup.delete(block.key);
	});
}

export function fix_and_destroy_block(block, lookup) {
	block.f();
	destroy_block(block, lookup);
}

export function fix_and_outro_and_destroy_block(block, lookup) {
	block.f();
	outro_and_destroy_block(block, lookup);
}

export function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
	let o = old_blocks.length;
	let n = list.length;

	let i = o;
	const old_indexes = {};
	while (i--) old_indexes[old_blocks[i].key] = i;

	const new_blocks = [];
	const new_lookup = new Map();
	const deltas = new Map();

	i = n;
	while (i--) {
		const child_ctx = get_context(ctx, list, i);
		const key = get_key(child_ctx);
		let block = lookup.get(key);

		if (!block) {
			block = create_each_block(key, child_ctx);
			block.c();
		} else if (dynamic) {
			block.p(child_ctx, dirty);
		}

		new_lookup.set(key, new_blocks[i] = block);

		if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
	}

	const will_move = new Set();
	const did_move = new Set();

	function insert(block) {
		transition_in(block, 1);
		block.m(node, next);
		lookup.set(block.key, block);
		next = block.first;
		n--;
	}

	while (o && n) {
		const new_block = new_blocks[n - 1];
		const old_block = old_blocks[o - 1];
		const new_key = new_block.key;
		const old_key = old_block.key;

		if (new_block === old_block) {
			// do nothing
			next = new_block.first;
			o--;
			n--;
		} else if (!new_lookup.has(old_key)) {
			// remove old block
			destroy(old_block, lookup);
			o--;
		} else if (!lookup.has(new_key) || will_move.has(new_key)) {
			insert(new_block);
		} else if (did_move.has(old_key)) {
			o--;

		} else if (deltas.get(new_key) > deltas.get(old_key)) {
			did_move.add(new_key);
			insert(new_block);

		} else {
			will_move.add(old_key);
			o--;
		}
	}

	while (o--) {
		const old_block = old_blocks[o];
		if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
	}

	while (n) insert(new_blocks[n - 1]);

	return new_blocks;
}

export function validate_each_keys(ctx, list, get_context, get_key) {
	const keys = new Set();
	for (let i = 0; i < list.length; i++) {
		const key = get_key(get_context(ctx, list, i));
		if (keys.has(key)) {
			throw new Error('Cannot have duplicate keys in a keyed each');
		}
		keys.add(key);
	}
}
