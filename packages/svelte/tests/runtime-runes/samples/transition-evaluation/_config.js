import { flushSync } from '../../../../src/index-client.js';
import { test } from '../../test';

export default test({
	test({ assert, component, target }) {
		const div = /** @type {HTMLDivElement & { foo?: number }} */ (target.querySelector('div'));

		assert.equal(div.foo, undefined);
		flushSync(() => {
			component.foo = 2;
			component.visible = false;
		});
		assert.equal(div.foo, 2);
	}
});
