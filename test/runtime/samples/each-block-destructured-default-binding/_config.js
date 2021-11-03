export default {
	html: `
		<input />
		<input />
	`,
	ssrHtml: `
		<input value="" />
		<input value="hello" />
	`,

	test({ assert, component, target, window }) {
		const [input1, input2] = target.querySelectorAll('input');
		assert.equal(input1.value, '');
		assert.equal(input2.value, 'hello');

		const inputEvent = new window.InputEvent('input');

		input2.value = 'world';
		input2.dispatchEvent(inputEvent);
		assert.equal(input2.value, 'world');
		assert.equal(component.array[1].value, 'world');
	}
};
