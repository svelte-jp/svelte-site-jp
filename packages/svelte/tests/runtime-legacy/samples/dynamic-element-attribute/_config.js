import { test } from '../../test';

export default test({
	get props() {
		return { tag: 'div' };
	},
	html: '<div style="color: red;">Foo</div>',

	test({ assert, component, target }) {
		component.tag = 'h1';

		assert.htmlEqual(
			target.innerHTML,
			`
			<h1 style="color: red;">Foo</h1>
		`
		);
	}
});
