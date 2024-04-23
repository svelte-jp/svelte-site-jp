import { test } from '../../test';

export default test({
	html: '<p style="--border-color: red;"></p>',

	test({ assert, component, target }) {
		component.myColor = 'blue';

		assert.htmlEqual(target.innerHTML, '<p style="--border-color: blue;"></p>');
	}
});
