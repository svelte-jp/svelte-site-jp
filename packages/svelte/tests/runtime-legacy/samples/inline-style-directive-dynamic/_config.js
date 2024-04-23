import { test } from '../../test';

export default test({
	html: `
		<p style="color: red;"></p>
	`,

	test({ assert, component, target }) {
		component.myColor = 'blue';
		assert.htmlEqual(target.innerHTML, '<p style="color: blue;"></p>');
	}
});
