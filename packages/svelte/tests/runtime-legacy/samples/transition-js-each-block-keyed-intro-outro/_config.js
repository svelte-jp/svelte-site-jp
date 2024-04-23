import { test } from '../../test';

export default test({
	get props() {
		return {
			things: [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
		};
	},

	intro: true,

	test({ assert, component, target, raf }) {
		let divs = /** @type {NodeListOf<HTMLDivElement & { foo: number, i: number }>} */ (
			target.querySelectorAll('div')
		);
		divs[0].i = 0; // for debugging
		divs[1].i = 1;
		divs[2].i = 2;

		raf.tick(0);
		assert.equal(divs[0].foo, 0);
		assert.equal(divs[1].foo, 0);
		assert.equal(divs[2].foo, 0);

		raf.tick(100);
		assert.equal(divs[0].foo, 1);
		assert.equal(divs[1].foo, 1);
		assert.equal(divs[2].foo, 1);

		component.things = [{ name: 'a' }, { name: 'c' }];

		const divs2 = target.querySelectorAll('div');
		assert.strictEqual(divs[0], divs2[0]);
		assert.strictEqual(divs[1], divs2[1]);
		assert.strictEqual(divs[2], divs2[2]);

		raf.tick(150);
		assert.equal(divs[0].foo, 1);
		assert.equal(divs[1].foo, 0.5);
		assert.equal(divs[2].foo, 1);

		component.things = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];

		raf.tick(175);
		assert.equal(divs[0].foo, 1);
		// Svelte 5, we no longer revert previous reconciled items
		// assert.equal(divs[1].foo, 0.75);
		assert.equal(divs[2].foo, 1);

		raf.tick(225);
		const divs3 = target.querySelectorAll('div');
		assert.strictEqual(divs[0], divs3[0]);
		// Svelte 5, we no longer revert previous reconciled items
		// assert.strictEqual(divs[1], divs3[1]);
		assert.strictEqual(divs[2], divs3[2]);

		assert.equal(divs[0].foo, 1);
		// Svelte 5, we no longer revert previous reconciled items
		// assert.equal(divs[1].foo, 1);
		assert.equal(divs[2].foo, 1);
	}
});
