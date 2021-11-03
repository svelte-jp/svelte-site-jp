export default {
	props: {
		// so it doesn't use innerHTML
		one: 'one',
		two: 'two',
		three: 'three'
	},

	html: `
		<ul>
			<li>one</li>
			<li>two</li>
			<li>three</li>
		</ul>
	`,

	test({ assert, target }) {
		const ul = target.querySelector('ul');

		assert.equal(ul.childNodes.length, 5);
	}
};
