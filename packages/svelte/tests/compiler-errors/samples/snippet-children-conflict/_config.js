import { test } from '../../test';

export default test({
	error: {
		code: 'snippet_conflict',
		message:
			'Cannot use explicit children snippet at the same time as implicit children content. Remove either the non-whitespace content or the children snippet block',
		position: [320, 353]
	}
});
