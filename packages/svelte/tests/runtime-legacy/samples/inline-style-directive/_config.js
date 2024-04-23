import { ok, test } from '../../test';

export default test({
	html: `
		<div>
			<p style="color: red;"></p>
		</div>
	`,

	test({ assert, target, window }) {
		const p = target.querySelector('p');
		ok(p);

		const styles = window.getComputedStyle(p);
		assert.equal(styles.color, 'red');
	}
});
