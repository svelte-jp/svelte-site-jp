import { test } from '../../test';

export default test({
	async test({ assert, target }) {
		assert.htmlEqual(
			target.innerHTML,
			`
		<div id="target"><div></div>
			<p>
				Bound? true
			</p>
		</div>
	`
		);
	}
});
