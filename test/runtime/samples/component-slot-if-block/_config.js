export default {
	html: `
		<div>
			<p>unconditional</p>
		</div>`,

	test({ assert, component, target }) {
		component.foo = true;
		assert.htmlEqual(target.innerHTML, `
			<div>
				<p>unconditional</p>
				<p>conditional</p>
			</div>
		`);
	}
};
