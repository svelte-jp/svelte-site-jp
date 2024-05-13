import { test } from '../../test';

export default test({
	error: {
		code: 'element_invalid_closing_tag',
		message: '`</div>` attempted to close an element that was not open',
		position: [0, 0]
	}
});
