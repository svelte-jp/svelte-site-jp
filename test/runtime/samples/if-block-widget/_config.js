export default {
	props: {
		visible: true
	},

	html: `
		before
		<p>Widget</p>
		after
	`,

	test({ assert, component, target }) {
		component.visible = false;
		assert.htmlEqual( target.innerHTML, `
			before

			after
		` );

		component.visible = true;
		assert.htmlEqual( target.innerHTML, `
			before
			<p>Widget</p>
			after
		` );
	}
};
