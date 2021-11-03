// this looks like another JSDOM quirk — svg.className = 'foo' behaves
// differently from browsers. So this test succeeds even when it should fail
export default {
	html: "<svg class='foo'></svg>",

	test({ assert, target }) {
		const svg = target.querySelector('svg');

		assert.equal(svg.namespaceURI, 'http://www.w3.org/2000/svg');
		assert.equal(svg.getAttribute('class'), 'foo');
	}
};
