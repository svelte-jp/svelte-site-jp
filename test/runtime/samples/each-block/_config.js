export default {
	props: {
		animals: [ 'alpaca', 'baboon', 'capybara' ]
	},

	html: `
		<p>alpaca</p>
		<p>baboon</p>
		<p>capybara</p>
	`,

	test({ assert, component, target }) {
		component.animals = [ 'alpaca', 'baboon', 'caribou', 'dogfish' ];
		assert.htmlEqual( target.innerHTML, `
			<p>alpaca</p>
			<p>baboon</p>
			<p>caribou</p>
			<p>dogfish</p>
		` );

		component.animals = [];
		assert.htmlEqual( target.innerHTML, '' );
	}
};
