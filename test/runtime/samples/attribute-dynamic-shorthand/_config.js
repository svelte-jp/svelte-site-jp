export default {
	html: '<div id="foo"></div>',

	test({ assert, component, target }) {
		component.id = 'bar';
		assert.equal( target.innerHTML, '<div id="bar"></div>' );
	}
};
