import { test } from '../../test';

export default test({
	get props() {
		return { things: ['a', 'b', 'c'] };
	},

	intro: true,

	test({ assert, component, target, raf }) {
		let divs = /** @type {NodeListOf<HTMLDivElement & { foo: number }>} */ (
			target.querySelectorAll('div')
		);
		raf.tick(0);
		assert.equal(divs[0].foo, 0);
		assert.equal(divs[1].foo, 0);
		assert.equal(divs[2].foo, 0);

		raf.tick(50);
		assert.equal(divs[0].foo, 0.5);
		assert.equal(divs[1].foo, 0.5);
		assert.equal(divs[2].foo, 0.5);

		component.things = ['a', 'b', 'c', 'd'];
		divs = /** @type {NodeListOf<HTMLDivElement & { foo: number }>} */ (
			target.querySelectorAll('div')
		);
		raf.tick(50);
		assert.equal(divs[0].foo, 0.5);
		assert.equal(divs[1].foo, 0.5);
		assert.equal(divs[2].foo, 0.5);
		assert.equal(divs[3].foo, 0);

		raf.tick(75);
		assert.equal(divs[0].foo, 0.75);
		assert.equal(divs[1].foo, 0.75);
		assert.equal(divs[2].foo, 0.75);
		assert.equal(divs[3].foo, 0.25);
	}
});
