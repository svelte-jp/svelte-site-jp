export default {
	props: {
		raw: '<span>foo</span>'
	},

	test({ assert, component, target }) {
		const span = target.querySelector('span');
		assert.ok(!span.previousSibling);

		component.raw = '<span>bar</span>';
		assert.htmlEqual(target.innerHTML, '<div><span>bar</span></div>');
	}
};
