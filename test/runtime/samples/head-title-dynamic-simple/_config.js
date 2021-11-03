export default {
	props: {
		foo: 'A Title'
	},

	test({ assert, component, window }) {
		assert.equal(window.document.title, 'A Title');

		component.foo = 'Also A Title';
		assert.equal(window.document.title, 'Also A Title');
	}
};
