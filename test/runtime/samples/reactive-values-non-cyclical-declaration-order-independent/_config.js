export default {
	html: `
		<p>2+2=4</p>
	`,

	test({ assert, target }) {
		assert.htmlEqual(target.innerHTML, `
			<p>2+2=4</p>
		`);
	}
};
