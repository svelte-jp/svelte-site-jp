export default {
	async test({ assert, component, target }) {
		const input = target.querySelector('input');
		component.value = undefined;

		assert.equal(input.value, 'undefined');

		component.value = 'foobar';

		assert.equal(input.value, 'foobar');
	}
};
