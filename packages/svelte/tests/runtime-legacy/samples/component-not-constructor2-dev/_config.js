import { test } from '../../test';

export default test({
	compileOptions: {
		dev: true
	},
	get props() {
		return { componentName: 'Sub' };
	},
	html: '<div>Sub</div>',
	test({ assert, component, target }) {
		component.componentName = 'Proxy';
		assert.htmlEqual(target.innerHTML, '<div>Sub</div>');
		try {
			component.componentName = 'banana';
			throw new Error('Expected an error');
		} catch (err) {
			assert.equal(
				/** @type {Error} */ (err).message,
				'this={...} of <svelte:component> should specify a Svelte component.'
			);
		}
	}
});
