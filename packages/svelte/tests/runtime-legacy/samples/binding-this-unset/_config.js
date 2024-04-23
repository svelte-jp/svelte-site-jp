import { ok, test } from '../../test';

export default test({
	get props() {
		return { x: true };
	},

	html: '<canvas data-x="true"></canvas>',

	test({ assert, component, target }) {
		let canvas = target.querySelector('canvas');
		ok(canvas);

		assert.equal(canvas, component.foo);
		assert.equal(canvas.getAttribute('data-x'), 'true');

		component.x = false;
		canvas = target.querySelector('canvas');
		ok(canvas);
		assert.equal(canvas, component.foo);
		assert.equal(canvas.getAttribute('data-x'), 'false');

		component.x = true;
		canvas = target.querySelector('canvas');
		ok(canvas);
		assert.equal(canvas, component.foo);
		assert.equal(canvas.getAttribute('data-x'), 'true');
	}
});
