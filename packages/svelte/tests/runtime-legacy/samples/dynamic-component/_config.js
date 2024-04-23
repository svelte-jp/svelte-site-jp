import { test } from '../../test';

export default test({
	get props() {
		return { x: true };
	},

	html: `
		<p>true, therefore Foo</p>
	`,

	test({ assert, component, target }) {
		component.x = false;

		assert.htmlEqual(
			target.innerHTML,
			`
			<p>false, therefore Bar</p>
		`
		);
	}
});
