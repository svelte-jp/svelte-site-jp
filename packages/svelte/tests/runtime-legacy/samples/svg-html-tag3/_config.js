import { ok, test } from '../../test';

export default test({
	html: `
			<svg>
				<foreignObject><!-- HTML_TAG_START --><circle cx="25" cy="30" r="24" fill="#FFD166"></circle><!-- HTML_TAG_END --></foreignObject>
			</svg>
		`,
	test({ assert, target, component }) {
		let svg = target.querySelector('svg');
		let circle = target.querySelector('circle');
		ok(svg);
		ok(circle);

		assert.equal(svg.namespaceURI, 'http://www.w3.org/2000/svg');
		assert.equal(circle.namespaceURI, 'http://www.w3.org/1999/xhtml');

		component.width = 200;
		component.height = 120;
		assert.htmlEqual(
			target.innerHTML,
			`
			<svg>
			  <foreignObject>
				  <circle cx="50" cy="60" r="24" fill="#FFD166"></circle>
				</foreignObject>
			</svg>
		`
		);

		svg = target.querySelector('svg');
		circle = target.querySelector('circle');
		ok(svg);
		ok(circle);
		assert.equal(svg.namespaceURI, 'http://www.w3.org/2000/svg');
		assert.equal(circle.namespaceURI, 'http://www.w3.org/1999/xhtml');
	}
});
