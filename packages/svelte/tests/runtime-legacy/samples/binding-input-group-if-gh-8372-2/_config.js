import { ok, test } from '../../test';

export default test({
	async test({ assert, target, component, window }) {
		const button = target.querySelector('button');
		ok(button);
		const clickEvent = new window.Event('click', { bubbles: true });
		const changeEvent = new window.Event('change');

		const [input1, input2] = /** @type {NodeListOf<HTMLInputElement>} */ (
			target.querySelectorAll('input[type="radio"]')
		);

		/**
		 * @param {boolean} v1
		 * @param {boolean} v2
		 */
		function validate_inputs(v1, v2) {
			assert.equal(input1.checked, v1);
			assert.equal(input2.checked, v2);
		}

		component.test = 'a';
		validate_inputs(true, false);

		component.test = 'b';
		validate_inputs(false, true);

		input1.checked = true;
		await input1.dispatchEvent(changeEvent);
		assert.deepEqual(component.test, 'a');

		input2.checked = true;
		await input2.dispatchEvent(changeEvent);
		assert.deepEqual(component.test, 'b');

		await button.dispatchEvent(clickEvent);
		assert.deepEqual(component.test, 'b'); // should it be undefined? valid arguments for both outcomes

		input1.checked = true;
		await input1.dispatchEvent(changeEvent);
		assert.deepEqual(component.test, 'a');
	}
});
