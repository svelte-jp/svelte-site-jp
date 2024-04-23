import { test } from '../../test';

export default test({
	get props() {
		return { condition: false };
	},

	test({ assert, component, window }) {
		assert.equal(window.document.title, '');
		assert.equal(Boolean(window.document.getElementById('meta')), true);

		component.condition = true;
		assert.equal(window.document.title, 'woo!!!');
		assert.equal(window.document.getElementById('meta'), null);
	}
});
